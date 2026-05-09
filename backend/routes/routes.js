import express from "express";
import { createUser, loginUser, getSuggestedUsernames } from "../controllers/userController.js";
import { userValidationRules, loginRules, suggestUsernameRules, validate } from "../middlewares/userValidator.js"
import upload from "../middlewares/multer.js"
const router = express.Router();

router.post("/api/register", upload.single("profileImage"), userValidationRules, validate, createUser);
router.post("/api/login", loginRules, validate, loginUser);
router.post("/api/suggest-usernames", suggestUsernameRules, validate, getSuggestedUsernames);
router.get("/clear", async (req, res) => {
    await User.deleteMany({});
    res.status(200).json({ success: "All users cleared successfully" });
});
export default router;
