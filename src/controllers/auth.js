import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/token.js";

// Description:- Auth User/ Set Token/
// Route:- POST /user/auth
// @access:- PUBLIC
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    const ifPasswordIsValid = await bcrypt.compareSync(password, user.password);
    if (!ifPasswordIsValid) {
      res.status(401);
      throw new Error("Invalid password");
    }
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials!");
  }
});

// Description:- Register User
// Route:- POST /user/register
// @access:- PUBLIC
const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists!");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    email,
    userName,
    password: hashedPassword,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Description:- Logout User
// Route:- POST /user/logout
// @access:- PUBLIC
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged Out!" });
});

// Description:- Get User
// Route:- GET /user/profile
// @access:- PRIVATE
const getUserProfile = asyncHandler(async (req, res) => {
  const userData = {
    _id: req.user._id,
    userName: req.user.userName,
    email: req.user.email,
  };
  res.status(200).json(userData);
});

// Description:- Update User Profile
// Route:- PUT /user/profile
// @access:- PRIVATE
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};

// export const signUp = async (req, res, next) => {
//   User.findOne({ email: req.body.email }).then(async (user) => {
//     if (user) {
//       return res.status(400).json({
//         message: "User already exists",
//         success: false,
//       });
//     }

//     const { email, userName, password } = req.body;
//     const userData = new User({
//       userName,
//       email,
//       password: bcrypt.hashSync(password, 10),
//     });

//     try {
//       await userData.save();
//       res.status(201).json({
//         message: "User created successfully",
//         success: true,
//       });
//     } catch (error) {
//       return res.status(400).json({
//         message: "Error Came",
//         success: false,
//       });
//       // next(error);
//     }
//   });
// };

// export const signIn = async (req, res, next) => {
//   const { email, password } = req.body;
//   try {
//     const validUser = await User.findOne({ email });
//     if (!validUser) return next(errorHandler(404, "User not found"));
//   const ifPasswordIsValid = bcrypt.compareSync(password, validUser.password);
//   if (!ifPasswordIsValid)
//     return next(errorHandler(401, "Invalid credentials"));
// } catch (error) {}
// };
