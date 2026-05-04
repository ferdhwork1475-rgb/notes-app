import express from "express";
import { createUser, loginUser, getSuggestedUsernames } from "../controllers/userController.js";
import { userValidationRules, loginRules, suggestUsernameRules, validate } from "../middlewares/userValidator.js"
const router = express.Router();

router.post("/api/register", userValidationRules, validate, createUser);
router.post("/api/login", loginRules, validate, loginUser);
router.post("/api/suggest-usernames", suggestUsernameRules, validate, getSuggestedUsernames);
export default router;
