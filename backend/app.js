import { setServers } from "node:dns";
setServers(["8.8.8.8", "1.1.1.1"]);
import dotenv from "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import router from "./routes/routes.js";
import { connectDB } from "./config/connectDB.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import authenticateToken from "./middlewares/authMiddleware.js";

const app = express();
const corsOptions = {
  origin: `${process.env.FRONTEND_API_URL}`,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

connectDB();

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/protected", authenticateToken, protectedRoutes);
app.use(router);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  
  res.status(statusCode).json({
    success: false,
    message: message,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
});

// app.use("*", (req, res) => {
//   res.status(404).json({
//     message: "No such directory on the backend",
//   });
// });

const port = process.env.PORT;

app.listen(port, () => {
  console.log("Backend server is running");
});
