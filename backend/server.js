import app from "./app.js";
import "./bot.js"; // <-- starts Telegram bot

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
