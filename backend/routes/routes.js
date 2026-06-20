import express from "express";

import {
  createUser,
  loginUser,
  findUserDetails,
  passwordResetController
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

import authenticateToken from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";
import User from "../models/userSchema.js";
const router = express.Router();

// PUBLIC ROUTES
router.post("/api/register", upload.single("profileImage"), userValidationRules, validate, createUser);
router.post("/api/login", loginRules, validate, loginUser);
router.get("/api/notes", getNotes);
router.post("/api/forgot-password", (req, res) => { console.log(req.body.email)})

// PROTECTED ROUTES
router.get("/api/user", authenticateToken, findUserDetails);
router.post("/api/notes", authenticateToken, upload.single("thumbnail"), validateNote, checkNoteValidation, createNote);
router.get("/api/notes/:id", getNote);
router.put("/api/notes/:id", authenticateToken, upload.single("thumbnail"), validateNote, checkNoteValidation, editNote);
router.delete("/api/notes/:id", authenticateToken, deleteNote);

export default router;