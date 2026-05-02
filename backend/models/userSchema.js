import mongoose from "mongoose";
import bcryptjs from "bcryptjs"

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
        type: String,
        required: true
    },
    username: {
      type: String,
      unique: true,
      trim: true,
      required: true
    },
    profileImage: {
      type: String,
      default: "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png",
      trim: true
    },
  },
  { timestamps: true },
);

// Hash password with bcrypt
export const hashPassword = async (plainPassword) => {
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(plainPassword, salt);
  return hashedPassword;
};

// Compare plain password with hashed password
export const comparePassword = async (plainPassword, hashedPassword) => {
  const isPasswordCorrect = await bcryptjs.compare(
    plainPassword,
    hashedPassword
  );
  return isPasswordCorrect;
};
 
const User = mongoose.model("User", userSchema);
export default User;