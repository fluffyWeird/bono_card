import express from "express";
import { telegramAuth } from "../controllers/authController.js";

const router = express.Router();

// Telegram login endpoint
router.get("/telegram", telegramAuth);

export default router;
