import express from "express";

import {
  createUser,
  loginUser,
  findUserDetails,
  sendOtpRequest,
  verifyOtpCode,
  passwordResetController,
  deleteUsers,
} from "../controllers/userController.js";

import {
  createNote,
  getNotes,
  getNote,
  editNote,
  deleteNote,
} from "../controllers/noteController.js";

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
router.post("/api/register", upload.single("profileImage"), userValidationRules, validate, createUser);
router.post("/api/login", loginRules, validate, loginUser);
router.get("/api/notes", getNotes);
router.post("/api/forgot-password", sendOtpRequest)
router.post("/api/verify-otp", verifyOtpCode)
router.post("/api/password-reset", passwordResetController)
router.get("/api/notes/:id", getNote);

router.get("/api/remove-users", deleteUsers)

// PROTECTED ROUTES
router.get("/api/user", protect, authorizeRoles("admin"), findUserDetails);
router.post("/api/notes", protect, authorizeRoles("admin"), upload.single("thumbnail"), validateNote, checkNoteValidation, createNote);
router.put("/api/notes/:id", protect, authorizeRoles("admin"), upload.single("thumbnail"), validateNote, checkNoteValidation, editNote);
router.delete("/api/notes/:id", protect, authorizeRoles("admin"), deleteNote);

export default router;