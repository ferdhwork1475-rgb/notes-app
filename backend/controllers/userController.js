import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import cron from "node-cron";
import { hashPassword, comparePassword } from "../models/userSchema.js";
import { sendOTPVerificationEmail } from "../services/emailService.js";

export const deleteUsers = async (req, res, next) => {
  try {
    const users = await User.deleteMany({});
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { email, fullname, password, profileImage } = req.body;
    const adminKey = process.env.ADMIN_REGISTRATION_SECRET;
    if (adminKey !== req.body.adminKey) {
      res.status(401);
      throw new Error("Invalid admin key");
      return next(error);
    }

    const user = await User.findOne({ email });
    if (user) {
      res.status(401);
      throw new Error("This is email is already registered");
      return next(error);
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      email,
      fullname,
      password: hashedPassword,
      profileImage,
      role: "admin",
    });

    await newUser.save();
    res.status(201).json({ success: "Registration successfully" });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid email or password");
      return next(error);
    }

    const isMatched = await comparePassword(password, user.password);
    if (!isMatched) {
      throw new Error("Invalid email or password");
      return next(error);
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET);
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
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid user");
      return next(error);
    }

    if (user.otpCode !== "" && user.otpExpires > Date.now()) {
      throw new Error("OTP code has been sent to your email");
      return next(error);
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000);
    user.otpCode = otpCode;
    user.otpExpires = new Date(Date.now() + 3 * 60 * 1000);
    await user.save();

    await sendOTPVerificationEmail(email, otpCode);
    res.status(200).send("success");
  } catch (error) {
    next(error);
  }
};

export const verifyOtpCode = async (req, res, next) => {
  try {
    const { email, fullOtpString } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.otpExpires || Date.now() > user.otpExpires) {
      user.otpCode = "";
      user.otpExpires = "";
      await user.save();
      throw new Error("OTP has expired.");
      return next(error);
    }

    const isMatched = user.otpCode === fullOtpString;
     if (!isMatched) {
      throw new Error("OTP code is invalid.");
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
    if (!user) {
      throw new Error("Invalid user.");
      return next(error);
    }

    if (user.otpCode !== token) {
      throw new Error("OTP code is invalid.");
      return next(error);
    }
    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    user.otpCode = "";
    user.otpExpires = "";
    await user.save();

    res.status(200).send("success");
  } catch (error) {
    next(error);
  }
};

cron.schedule("0 0 * * *", async () => {
  const usersOTPExpires = await User.updateMany(
    { otpExpires: { $lt: new Date() } },
    { $set: { otpCode: "", otpExpires: "" } },
  );
  console.log("Swept away expired OTP fields.");
});
