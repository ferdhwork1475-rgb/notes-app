import express from "express";
import {
  createUser,
  loginUser,
  getSuggestedUsernames,
} from "../controllers/userController.js";
import {
  userValidationRules,
  loginRules,
  suggestUsernameRules,
  validate,
} from "../middlewares/userValidator.js";
import upload from "../middlewares/multer.js";
import User from "../models/userSchema.js"
const router = express.Router();

router.post(
  "/api/register",
  upload.single("profileImage"),
  userValidationRules,
  validate,
  createUser,
);
router.post("/api/login", loginRules, validate, loginUser);
router.post(
  "/api/suggest-usernames",
  suggestUsernameRules,
  validate,
  getSuggestedUsernames,
);

router.get("/users", async (req, res) => {
  const users = await User.find()
  res.json({ users })
})
export default router;
