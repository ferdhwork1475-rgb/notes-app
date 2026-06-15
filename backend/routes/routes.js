import express from "express";

import {
  createUser,
  loginUser,
  getSuggestedUsernames,
  findUserDetails,
} from "../controllers/userController.js";

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

import {
  userValidationRules,
  loginRules,
  suggestUsernameRules,
  validate,
} from "../middlewares/userValidator.js";

import authenticateToken from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";
import User from "../models/userSchema.js";
const router = express.Router();


// PUBLIC ROUTES
router.post("/api/register", upload.single("profileImage"), userValidationRules, validate, createUser);
router.post("/api/login", loginRules, validate, loginUser);
router.post( "/api/suggest-usernames", suggestUsernameRules, validate, getSuggestedUsernames);
router.get("/api/notes", getNotes);
router.get("/api/login", findUserDetails);


// PROTECTED ROUTES
router.post("/api/notes", upload.single("thumbnail"), validateNote, checkNoteValidation, createNote);

router.put("/api/notes/:id", authenticateToken, validateNote, checkNoteValidation, editNote);
router.delete("/api/notes/:id", authenticateToken, validateNote, checkNoteValidation, deleteNote);






// router.delete("/users", async (req, res) => {
//   const users = await User.deleteMany({});
//   res.json({ users });
// });


export default router;
