import authenticateToken from "../middlewares/authMiddleware.js";
import { createNote, getNotes, editNote } from "../controllers/noteController.js";
import {
  checkNoteValidation,
  validateNote,
} from "../middlewares/noteValidator.js";
import express from "express";
const router = express.Router();

router.post("/notes", validateNote, checkNoteValidation, createNote);
router.get("/notes", getNotes);
router.put("/notes/:id", validateNote, checkNoteValidation, editNote);
// router.delete("/notes", validateNote, checkNoteValidation, createNote);

export default router;