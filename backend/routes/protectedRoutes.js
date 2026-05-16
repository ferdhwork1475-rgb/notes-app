import authenticateToken from "../middlewares/authMiddleware.js";
import {
  createNote,
  getNotes,
  editNote,
  deleteNote,
} from "../controllers/noteController.js";
import { findUserDetails } from "../controllers/userController.js";
import {
  checkNoteValidation,
  validateNote,
} from "../middlewares/noteValidator.js";
import express from "express";
const router = express.Router();

router.post("/notes", authenticateToken ,validateNote, checkNoteValidation, createNote);
router.get("/notes", getNotes);
router.put("/notes/:id", validateNote, checkNoteValidation, editNote);
router.delete("/notes/:id", validateNote, checkNoteValidation, deleteNote);
router.get("/login", authenticateToken, findUserDetails);

export default router;
