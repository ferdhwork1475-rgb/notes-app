import jwt from "jsonwebtoken";

const authenticateToken = async (req, res, next) => {
  const authHeader = req.header("Authorization") || req.header("authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};
export default authenticateToken;