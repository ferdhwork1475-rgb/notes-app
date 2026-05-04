import { setServers } from "node:dns";
setServers(["8.8.8.8", "1.1.1.1"]);
import dotenv from "dotenv/config";
import express from "express";
import cors from "cors"
import router from "./routes/routes.js";
import { connectDB } from "./config/connectDB.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import authenticateToken from "./middlewares/authMiddleware.js";

const app = express();
const corsOptions = {
  origin: `${process.env.FRONTEND_API_URL}`,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"], 
}
app.use(cors(corsOptions));

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));



app.use("/api/protected", authenticateToken, protectedRoutes);
app.use(router);

// Global error handler catches any error that is passed into next()
app.use(function (err, req, res, next) {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log("Backend server is running");
});
