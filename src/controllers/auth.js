import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signUp = async (req, res, next) => {
  User.findOne({ email: req.body.email }).then(async (user) => {
    if (user) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    const { email, userName, password } = req.body;
    const userData = new User({
      userName,
      email,
      password: bcrypt.hashSync(password, 10),
    });

    try {
      await userData.save();
      res.status(201).json({
        message: "User created successfully",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  });
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser=await User.findOne({email});
    if(!validUser) return next(errorHandler(404, "User not found"));
    const ifPasswordIsValid=bcrypt.compareSync(password, validUser.password);
    if(!ifPasswordIsValid) return next(errorHandler(401, "Invalid credentials"));
    
  } catch (error) {
    
  }
};
