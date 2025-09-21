import User from "../models/User.js";
import { verifyTelegramData } from "../utils/telegram.js";

export const telegramAuth = async (req, res) => {
  try {
    const data = req.query; // Telegram widget sends query params
    const botToken = process.env.TELEGRAM_BOT_TOKEN;

    console.log("➡️ Incoming Telegram login:", data);

    // Step 1: Verify Telegram payload
    if (!verifyTelegramData(data, botToken)) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Telegram login" });
    }

    // Step 2: Find existing user by Telegram ID
    const user = await User.findOne({ telegramId: data.id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account linked to this Telegram ID",
      });
    }

    // Step 3: Update user profile with Telegram info
    user.photo = data.photo_url || user.photo;
    user.username = data.username || user.username;
    user.firstName = data.first_name || user.firstName;
    user.isRegistered = true;

    await user.save();

    console.log(`✅ Telegram login successful for user ${user.telegramId}`);

    // Step 4: Redirect to student dashboard
    res.redirect(`/student/dashboard?id=${user.telegramId}`);
  } catch (error) {
    console.error("❌ Telegram Auth Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
