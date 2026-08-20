// import { setServers } from "node:dns";
// setServers(["8.8.8.8", "1.1.1.1"]);
import dotenv from "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/routes.js";
import { connectDB } from "./config/connectDB.js";

const app = express();
const corsOptions = {
  origin: `${process.env.NODE_ENV}` === "production" ? `${process.env.FRONTEND_API_URL}` : "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Backend is running");
});
app.use(router);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message: message,
    stack: process.env.NODE_ENV === "production" ? err.stack : {},
  });
});

try {
  await connectDB();

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log("Backend server is running");
  });
} catch (error) {
  console.error("Failed to connect to MongoDB", error);
  process.exit(1);
}
