import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import { hashPassword, comparePassword } from "../models/userSchema.js";
import { generateUsernames } from "../services/aiService.mjs";

export const createUser = async (req, res, next) => {
  try {
    const { email, fullname, password, username, profileImage } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      email,
      fullname,
      password: hashedPassword,
      username,
      profileImage,
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
      .json({ success: "User logged in successfully" });
  } catch (error) {
    next(error);
  }
};

export const findUserDetails = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    console.log(userId);

    const user = await User.findOne({ userId });
    if (!user) {
      throw new Error("Invalid user id");
      return next(error);
    }

    res.status(200).json({ user });
    console.log(user)
  } catch (error) {
    next(error);
  }
};

export const getSuggestedUsernames = async (req, res, next) => {
  try {
    const { fullname } = req.body;
    const rawSuggestions = await generateUsernames(fullname);
    // used to select documents where a specific field contains any value from a provided array
    const existingUsers = await User.find({
      username: { $in: rawSuggestions },
    });
    const existingUsernames = existingUsers.map((user) => user.username);
    const filteredSuggestions = rawSuggestions.filter(
      (username) => !existingUsernames.includes(username),
    );
    res.status(200).send(filteredSuggestions);
  } catch (error) {
    throw new Error("Error generating usernames");
    next(error);
  }
};
