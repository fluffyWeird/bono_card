// src/routes/telegramRoutes.js
import express from "express";
import { telegramAuth } from "../controllers/telegramController.js";

const telegramRouter = express.Router();

telegramRouter.post("/auth", telegramAuth);

export default telegramRouter;
