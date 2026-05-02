import authenticateToken from "../middlewares/authMiddleware.js";
import { createNote, getNotes } from "../controllers/noteController.js";
import {
  checkNoteValidation,
  validateNote,
} from "../middlewares/noteValidator.js";
import express from "express";
const router = express.Router();

router.post("/notes", validateNote, checkNoteValidation, createNote);
router.get("/notes", getNotes);

export default router;