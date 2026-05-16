import { validationResult, body } from "express-validator";

export const validateNote = [
  body("title")
    .trim()
    .escape()
    .isLength({ max: 100 }).withMessage("Title must be less than 100 characters"),
  body("content").trim().escape(),
  body("tags").optional().isArray(),
];

export const checkNoteValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = errors.errors.map((err) => err.msg);
  return res.status(422).json({ error: extractedErrors });
};