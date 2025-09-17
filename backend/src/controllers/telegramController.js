// src/controllers/telegramController.js
import crypto from "crypto";
import User from "../models/User.js";

export const telegramAuth = async (req, res) => {
  try {
    const data = req.body; // Telegram sends payload here
    const botToken = process.env.TELEGRAM_BOT_TOKEN;

    // Step 1: verify hash
    const secret = crypto.createHash("sha256").update(botToken).digest();
    const checkString = Object.keys(data)
      .filter((k) => k !== "hash")
      .sort()
      .map((k) => `${k}=${data[k]}`)
      .join("\n");

    const hash = crypto
      .createHmac("sha256", secret)
      .update(checkString)
      .digest("hex");

    if (hash !== data.hash) {
      return res.status(400).json({ message: "Invalid Telegram data" });
    }

    // Step 2: Find user by schoolId or phoneNumber
    const user = await User.findOne({ phoneNumber: data.phone_number });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Step 3: Update user profile
    user.telegramId = data.id;
    user.photo = data.photo_url || user.photo;
    user.isRegistered = true;

    await user.save();

    res
      .status(200)
      .json({ message: "Telegram authentication successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
