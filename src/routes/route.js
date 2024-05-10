import express from "express";
import { userController } from "../controllers/user.js";
import { signUp } from "../controllers/auth.js";

const router = express.Router();

router.get("/user", userController);
router.post("/signup", signUp);

export default router;
