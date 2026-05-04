import { body, validationResult } from "express-validator";
import User from "../models/userSchema.js";

export const userValidationRules = [
  body("email")
    .isEmail()
    .trim()
    .escape()
    .normalizeEmail()
    .withMessage("Email is invalid")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) throw new Error("Email already in use");
    }),
  body("firstname").trim().escape().isLength({ min: 2, max: 30 }),
  body("lastname").trim().escape().isLength({ min: 2, max: 30 }),
  body("username")
    .trim()
    .escape()
    .isLength({ min: 2, max: 30 })
    .custom(async (value) => {
      const user = await User.findOne({ username: value });
      if (user) throw new Error("Username taken.");
    }),
  body("password")
    .trim()
    .isLength({ min: 10, max: 20 })
    .withMessage("Please password should contain more than 10 characters"),
];

export const loginRules = [
  body("email")
    .isEmail()
    .trim()
    .escape()
    .normalizeEmail()
    .withMessage("Email is invalid")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (!user) throw new Error("Invalid email or password");
    }),
  body("password")
    .trim()
    .isLength({ min: 10, max: 20 })
    .withMessage("Please password should contain more than 10 characters"),
];

export const suggestUsernameRules = [
  body("fullname")
    .trim()
    .escape()
    .isLength({ min: 2, max: 30 })
    .withMessage("Fullname should be between 2 and 30 characters"),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next(); //move on to the controller
  }
  const errMsgs = []
  errors.errors.map((err) => {
    errMsgs.push(err.msg)
  });
  return res.status(400).json({ errors: errMsgs });

};
