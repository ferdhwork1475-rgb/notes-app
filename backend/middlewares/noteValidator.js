import { validationResult, body } from "express-validator";

export const validateNote = [
  body("title")
    .trim()
    .escape(),
  body("content").trim().escape(),
];

export const checkNoteValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = errors.errors.map((err) => err.msg);
  return res.status(422).json({ error: extractedErrors });
};