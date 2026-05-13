import authenticateToken from "../middlewares/authMiddleware.js";
import {
  createNote,
  getNotes,
  editNote,
  deleteNote,
} from "../controllers/noteController.js";
import {
  checkNoteValidation,
  validateNote,
} from "../middlewares/noteValidator.js";
import express from "express";
const router = express.Router();

router.post("/notes", validateNote, checkNoteValidation, createNote);
router.get("/notes", getNotes);
router.put("/notes/:id", validateNote, checkNoteValidation, editNote);
router.delete("/notes/:id", validateNote, checkNoteValidation, deleteNote);
router.get("/login", authenticateToken, (req, res) => {
  console.log(req.user)
})

export default router;
