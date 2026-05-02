import authenticateToken from "../middlewares/authMiddleware.js";
import { createNote } from "../controllers/noteController.js";
import {
  checkNoteValidation,
  validateNote,
} from "../middlewares/noteValidator.js";
import express from "express";
const router = express.Router();

router.post("/notes", createNote);

export default router;