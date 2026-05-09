import { body, validationResult } from "express-validator";
import User from "../models/userSchema.js";

export const userValidationRules = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) throw new Error("This email is already registered");
    }),
  body("fullname")
    .trim() // Added trim
    .escape()
    .isLength({ min: 2, max: 30 })
    .withMessage("Full name must be 2-30 characters"),
  body("username")
    .trim()
    .escape()
    .isLength({ min: 2, max: 30 })
    .withMessage("Username must be 2-30 characters")
    .custom(async (value) => {
      const user = await User.findOne({ username: value });
      if (user) throw new Error("Username is already taken");
    }),
  body("password")
    .trim()
    .isLength({ min: 10, max: 20 })
    .withMessage("Password must be between 10 and 20 characters")
    // Senior tip: Add a regex to ensure a mix of letters/numbers
    .matches(/\d/)
    .withMessage("Password must contain at least one number"),
];

export const loginRules = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (!user) throw new Error("Invalid email or password");
    }),
  body("password")
    .trim()
    .isLength({ min: 10, max: 20 })
    .withMessage("Password must be between 10 and 20 characters"),
];

export const suggestUsernameRules = [
  body("fullname")
    .trim()
    .escape()
    .isLength({ min: 2, max: 30 })
    .withMessage("Please provide a valid name to generate suggestions"),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = errors.errors.map((err) => err.msg);
  return res.status(422).json({ error: extractedErrors });
};
