import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import { hashPassword, comparePassword } from "../models/userSchema.js";
import { sendOTPVerificationEmail } from "../services/emailService.js";

let otpCode;
function generateOtpCode() {
  otpCode = Math.floor(100000 + Math.random() * 900000);
}

export const createUser = async (req, res, next) => {
  try {
    const { email, fullname, password, profileImage } = req.body;
    const adminKey = process.env.ADMIN_REGISTRATION_SECRET;
    if (adminKey !== req.body.adminKey) {
      res.status(401);
      throw new Error("Invalid admin key");
      return next(error);
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      email,
      fullname,
      password: hashedPassword,
      profileImage,
    });
    await newUser.save();
    res.status(201).json({ success: "Registration successfully" });
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("This email is already registered")
    }
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    const isMatched = await comparePassword(password, user.password);
    if (!isMatched) {
      throw new Error("Invalid email or password");
      return next(error);
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res
      .cookie("token", token, {
        maxAge: 3600000,
        httpOnly: true,
      })
      .status(200)
      .json(token);
  } catch (error) {
    next(error);
  }
};

export const findUserDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      throw new Error("Invalid user");
      return next(error);
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const sendOtpRequest = async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log(email)
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid user");
      return next(error);
    }
    generateOtpCode();
    user.otpCode = otpCode;
    await sendOTPVerificationEmail(email, otpCode);
    console.log(otpCode);
    res.status(200).send("success");
  } catch (error) {
    next(error);
  }
};

export const verifyOtpCode = async (req, res, next) => {
  try {
    const { email, fullOtpString } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid user");
      return next(error);
    }
    console.log(user.otpCode);
    if (fullOtpString !== user.otpCode) {
      throw new Error("Invalid otp code");
      return next(error);
    }
    res.status(200).send("success");
  } catch (error) {
    next(error);
  }
};

export const passwordResetController = async (req, res, next) => {
  try {
    const { email, token, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user, req.body);
    if (!user) {
      throw new Error("Invalid user");
      return next(error);
    }
    if (token !== user.otpCode) {
      throw new Error("Otp code");
      return next(error);
    }
    await User.findOneAndUpdate(
      { email },
      {
        password: password,
      },
      { returnDocument: "after" },
    );
    res.status(200).send("success");
  } catch (error) {
    next(error);
  }
};
