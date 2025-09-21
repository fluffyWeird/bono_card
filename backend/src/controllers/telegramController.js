// controllers/authController.js
import User from "../models/User.js";
import { verifyTelegramData } from "../utils/telegram.js";

export const telegramAuth = async (req, res) => {
  try {
    const data = req.query; // Telegram widget sends query params
    const botToken = process.env.TELEGRAM_BOT_TOKEN;

    // Step 1: Verify Telegram payload
    if (!verifyTelegramData(data, botToken)) {
      return res.status(401).send("Unauthorized: invalid Telegram login");
    }

    // Step 2: Check if user already exists
    const user = await User.findOne({ telegramId: data.telegramId });

    if (!user) {
      // No account exists — deny access (since students can’t self-create)
      return res.status(404).send("No account linked to this Telegram ID");
    }

    // Step 3: Update profile info (photo, mark as registered)
    user.photo = data.photo_url || user.photo;
    user.isRegistered = true;
    await user.save();

    // Step 4: Redirect based on role
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  } finally {
    if (user.role === "super_admin") {
      return res.redirect(`/super-admin/dashboard?id=${user.telegramId}`);
    } else if (user.role === "admin") {
      return res.redirect(`/admin/dashboard?id=${user.telegramId}`);
    } else {
      return res.redirect(`/student/dashboard?id=${user.telegramId}`);
    }
  }
};
