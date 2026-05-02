import { validationResult, body } from "express-validator";
import Note from "../models/noteSchema.js";

export const validateNote = async () => [
  body("title")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 100 })
    .withMessage("Title must be less than 100 characters"),
  body("content").trim().escape().notEmpty().withMessage("Content is required"),
  body("tags").optional().isArray(),
];

export const checkNoteValidation = (req, res, next) => {
  const errMsgs = [];
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    errors.errors.map((err) => errMsgs.push(err.msg));
  }
  return res.status(400).json({ errors: errMsgs });
};
