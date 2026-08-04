import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODBURL)
    console.log("Backend is connected to database")
  } catch (error) {
    console.log("Mongodb error", error);
  }
};