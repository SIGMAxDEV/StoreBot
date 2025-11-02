// index.js
const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const app = express();

const TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  // send first message
  const sent = await bot.sendMessage(chatId, "⚙️ *Booting profile systems...*\n_▱▱▱▱▱▱▱▱▱▱ 0%_", {
    parse_mode: "Markdown",
  });

  const steps = [
    "💾 *Initializing About Me core...*\n_▰▱▱▱▱▱▱▱▱▱ 10%_",
    "🧠 *Loading creativity modules...*\n_▰▰▱▱▱▱▱▱▱▱ 20%_",
    "💻 *Activating Web Developer protocols...*\n_▰▰▰▱▱▱▱▱▱▱ 35%_",
    "⚡ *Powering up Tech Enthusiasm...*\n_▰▰▰▰▱▱▱▱▱▱ 50%_",
    "🚀 *Building futuristic UI mindset...*\n_▰▰▰▰▰▱▱▱▱▱ 65%_",
    "🔧 *Optimizing problem-solving engine...*\n_▰▰▰▰▰▰▱▱▱▱ 78%_",
    "🌐 *Connecting digital dimensions...*\n_▰▰▰▰▰▰▰▱▱▱ 89%_",
    "💎 *Refining passion & precision...*\n_▰▰▰▰▰▰▰▰▱▱ 95%_",
    "✅ *Finalizing personal portfolio...*\n_▰▰▰▰▰▰▰▰▰▰ 100%_",
    "🎯 *Profile Boot Complete!*\n✨ *Meet Ayu — Web Developer & Tech Enthusiast 🚀*",
  ];

  for (const step of steps) {
    await new Promise((r) => setTimeout(r, 1000)); // delay 1 sec
    await bot.editMessageText(step, {
      chat_id: chatId,
      message_id: sent.message_id,
      parse_mode: "Markdown",
    });
  }
});

// keep Render alive
const PORT = process.env.PORT || 10000;
app.get("/", (req, res) => res.send("Bot is running!"));
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
