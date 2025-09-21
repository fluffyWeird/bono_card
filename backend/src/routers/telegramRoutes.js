// src/routes/telegramRoutes.js
import express from "express";
import { telegramAuth } from "../controllers/telegramController.js";

const telegramRouter = express.Router();

telegramRouter.post("/telegram", telegramAuth);

export default telegramRouter;
