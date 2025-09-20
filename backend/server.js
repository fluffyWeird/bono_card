import { connectDB } from "./src/config/db.js";
import "dotenv/config";
import express from "express";
import User from "./src/models/User.js";
import router from "./src/routers/userRoutes.js";
import telegramRouter from "./src/routers/telegramRoutes.js";
import { telegramAuth } from "./src/controllers/authController.js";

connectDB();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use("/api/user/", router);
app.use("/api/telegram", telegramRouter);

app.get("/health", (req, res) => {
  res.json({ message: "yea I work" });
});

app.use("/api/auth", telegramAuth);

app.listen(PORT, () => {
  try {
    console.log(`yay it works on http://localhost:${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
