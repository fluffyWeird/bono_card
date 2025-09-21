import { connectDB } from "./src/config/db.js";
import "dotenv/config";
import express from "express";
import User from "./src/models/User.js";
import router from "./src/routers/userRoutes.js";
import telegramRouter from "./src/routers/telegramRoutes.js";

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
//web/api/user
app.use("/api/user/", router);
app.use("/api/auth", telegramRouter);

app.get("/health", async (req, res) => {
  // const mockTelegramUser = new User({
  //   schoolId: "44444",
  //   telegramId: "433391911",
  //   first_name: "eyuel",
  //   username: "Fluffyweird",
  //   photo_url:
  //     "https://t.me/i/userpic/320/xuUtS6OiIrZMyQJ2U8GW6up47hT9js-btd7P_i-cyhk.jpg",
  //   auth_date: 1758395490,
  //   hash: "cac066c365c51c89ac7a5ec27f315ddcde588d4e71f476e0158d3b436eaf2443",
  //   role: "student",
  //   phoneNumber: "+251954956260",
  // });
  // await mockTelegramUser.save().then(() => {
  //   try {
  //     res.json({ message: "yea I work" });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });
  res.json({ message: "yea I work" });
});

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`yay it works on http://localhost:${PORT}`);
  } catch (error) {
    console.log(error);
  }
});

export default app;
