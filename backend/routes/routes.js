import express from "express";

import {
  createUser,
  loginUser,
  findUserDetails,
  sendOtpRequest,
  verifyOtpCode,
  passwordResetController,
  deleteUsers,
  contactMsg,
} from "../controllers/userController.js";

import {
  createArticle,
  fetchArticles,
  fetchArticle,
  updateArticle,
  deleteArticle,
  deleteArticles,
} from "../controllers/articleController.js";

import {
  checkNoteValidation,
  validateNote,
} from "../middlewares/noteValidator.js";

import {
  userValidationRules,
  loginRules,
  validate,
} from "../middlewares/userValidator.js";

import protect from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";
import User from "../models/userSchema.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";
const router = express.Router();

// PUBLIC ROUTES
router.post(
  "/api/register",
  upload.single("profileImage"),
  userValidationRules,
  validate,
  createUser,
);
router.post("/api/login", loginRules, validate, loginUser);
router.get("/api/articles", fetchArticles);
router.post("/api/forgot-password", sendOtpRequest);
router.post("/api/verify-otp", verifyOtpCode);
router.post("/api/password-reset", passwordResetController);
router.get("/api/articles/:slug", fetchArticle);
router.post("/api/contact", contactMsg);
router.get("/api/remove-users", deleteUsers);
router.get("/api/remove-all-data", deleteArticles);
router.get("/", (req, res) => res.send("Hello"));

// PROTECTED ROUTES
router.get("/api/user", protect, authorizeRoles("admin"), findUserDetails);
router.post(
  "/api/articles",
  protect,
  authorizeRoles("admin"),
  upload.single("thumbnail"),
  validateNote,
  checkNoteValidation,
  createArticle,
);
router.put(
  "/api/articles/:slug",
  protect,
  authorizeRoles("admin"),
  upload.single("thumbnail"),
  validateNote,
  checkNoteValidation,
  updateArticle,
);
router.delete(
  "/api/articles/:id",
  protect,
  authorizeRoles("admin"),
  deleteArticle,
);

export default router;
