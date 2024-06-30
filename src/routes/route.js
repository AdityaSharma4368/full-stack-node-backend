import express from "express";
import {
  logoutUser,
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from "../controllers/auth.js";
import { protectRoutes } from "../middleware/auth.js";
import { getUserFakeData } from "../controllers/user.js";

const router = express.Router();

router.post("/user/auth", authUser);
router.post("/user/register", registerUser);
router.post("/user/logout", logoutUser);
router
  .route("/user/profile")
  .get(protectRoutes, getUserProfile)
  .put(protectRoutes, updateUserProfile);
// router.get("/user/profile", getUserProfile);
// router.put("/user/profile", updateUserProfile);
router.get("/user/fake-data", getUserFakeData);

export default router;
