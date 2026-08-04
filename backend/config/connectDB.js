import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("MONGODBURL:", process.env.MONGODBURL);
    await mongoose.connect(process.env.MONGODBURL)
    console.log("Backend is connected to database")
  } catch (error) {
    console.log("Mongodb error", error);
  }
};