import User from "../models/User.js";
import { verifyTelegramData } from "../utils/telegram.js";

export const telegramAuth = async (req, res) => {
  const data = req.query;

  if (!verifyTelegramData(data, process.env.BOT_TOKEN)) {
    return res.status(401).send("Unauthorized: invalid Telegram login");
  }

  const user = await User.findOneAndUpdate(
    { telegramId: data.id },
    { telegramId: data.id, photo: data.photo_url, role: "student" },
    { upsert: true, new: true }
  );

  console.log(`Updated student ${data.id}`);
  res.redirect(`/student/dashboard?id=${data.id}`);
};
