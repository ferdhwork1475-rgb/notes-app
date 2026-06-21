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
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
      type: String,
      required: false,
    },
    otpCode: {
      type: Number,
      required: false,
    }
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