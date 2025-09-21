import { Telegraf } from "telegraf";
import User from "./src/models/User.js";

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start(async (ctx) => {
  const telegramId = ctx.from.id;
  const user = await User.findOne({ telegramId });

  if (!user || !user.phoneNumber) {
    // Ask for phone if not saved
    ctx.reply("Hi! Please share your phone number:", {
      reply_markup: {
        keyboard: [
          [{ text: "📱 Share my phone number", request_contact: true }],
        ],
        one_time_keyboard: true,
        resize_keyboard: true,
      },
    });
  } else {
    ctx.reply(`Welcome back, ${user.schoolId}! ✅`);
  }
});

bot.on("contact", async (ctx) => {
  const phone = ctx.message.contact.phone_number;
  const telegramId = ctx.from.id;

  const user = await User.findOneAndUpdate(
    { telegramId },
    { phoneNumber: phone, phoneVerified: true },
    { new: true }
  );

  if (user) {
    ctx.reply(`Thanks, ${user.schoolId}. Your phone number is saved ✅`, {
      reply_markup: {
        remove_keyboard: true, // <-- clears ONLY this phone button
      },
    });
  } else {
    ctx.reply("No user found with this Telegram ID", {
      reply_markup: {
        remove_keyboard: true,
      },
    });
  }
});
bot.launch();
