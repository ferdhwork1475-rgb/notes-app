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
  body("password")
    .trim()
    .isLength({ min: 10, max: 20 })
    .withMessage("Password must be between 10 and 20 characters"),
  body("adminkey")
    .trim()
    .escape()
];

export const loginRules = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (!user) throw new Error("Invalid email or password")
    }),
  body("password")
    .trim()
    .isLength({ min: 10, max: 20 })
    .withMessage("Password must be between 10 and 20 characters"),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = errors.errors.map((err) => err.msg);
  return res.status(422).json({ error: extractedErrors });
};
