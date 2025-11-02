const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const app = express();

const TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(TOKEN, { polling: true });

// Helper delay function
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name;

  try {
    // 1️⃣ First Sticker – Boot Start
    const s1 = await bot.sendSticker(chatId, "https://t.me/PIROxSIGMA/168");
    await delay(3000);
    await bot.deleteMessage(chatId, s1.message_id);

    // 2️⃣ Second Sticker – System Preparing
    const s2 = await bot.sendSticker(chatId, "https://t.me/PIROxSIGMA/170");
    await delay(3000);
    await bot.deleteMessage(chatId, s2.message_id);

    // 3️⃣ Boot Animation Loading Sequence
    const sent = await bot.sendMessage(
      chatId,
      "⚙️ *Booting Sigma Systems...*\n_▱▱▱▱▱▱▱▱▱▱ 0%_",
      { parse_mode: "Markdown" }
    );

    const steps = [
      "💾 *Initializing Digital Core...*\n_▰▱▱▱▱▱▱▱▱▱ 10%_",
      "🧠 *Loading Mindset Protocols...*\n_▰▰▱▱▱▱▱▱▱▱ 25%_",
      "💻 *Activating Developer Mode...*\n_▰▰▰▱▱▱▱▱▱▱ 40%_",
      "⚡ *Boosting Attitude Circuits...*\n_▰▰▰▰▱▱▱▱▱▱ 55%_",
      "🚀 *Launching Legendary Aura...*\n_▰▰▰▰▰▱▱▱▱▱ 70%_",
      "🔧 *Optimizing Commands...*\n_▰▰▰▰▰▰▱▱▱▱ 85%_",
      "🌐 *Connecting Neural Network...*\n_▰▰▰▰▰▰▰▰▱▱ 95%_",
      "✅ *Boot Complete — Welcome Legend!* \n_▰▰▰▰▰▰▰▰▰▰ 100%_",
    ];

    for (let i = 0; i < steps.length; i++) {
      await delay(600);
      await bot.editMessageText(steps[i], {
        chat_id: chatId,
        message_id: sent.message_id,
        parse_mode: "Markdown",
      });
    }

    await delay(800);
    await bot.deleteMessage(chatId, sent.message_id);

    // 4️⃣ Third Sticker – System Activated
    const s3 = await bot.sendSticker(chatId, "https://t.me/PIROxSIGMA/169");
    await delay(2500);
    await bot.deleteMessage(chatId, s3.message_id);

    // 5️⃣ Final Main Message + Video Menu
    const caption = `
<b>╔════════════════════════╗</b>

👋 Hey ${firstName}

<b>⚠️ Tʜɪꜱ ɪꜱ ᴀ ᴅɪɢɪᴛᴀʟ ꜱʏꜱᴛᴇᴍ ʀᴇʙᴏᴏᴛ ʙʏ ꜱɪɢᴍᴀ 🤖</b>
<b>Rᴇꜱᴘᴇᴄᴛ ɪꜱ ᴇᴀʀɴᴇᴅ, ʟᴏʏᴀʟᴛʏ ɪꜱ ʀᴇᴛᴜʀɴᴇᴅ, ᴀɴᴅ ꜱɪʟᴇɴᴄᴇ ɪꜱ ᴅᴀɴɢᴇʀᴏᴜꜱ ⚡</b>

<b>╚════════════════════════╝</b>

<b>🦋 Mᴀɪɴ Cʜᴀɴɴᴇʟ</b>    <b>🦋 Pʀᴇᴍɪᴜᴍ Gᴡʏs</b>
👉 <a href="https://t.me/+7OoCk9Y1x_s5YjJl">Jᴏɪɴ Cʜᴀɴɴᴇʟ</a>      👉 <a href="https://t.me/PiDoxz">Jᴏɪɴ Cʜᴀɴɴᴇʟ</a>

<b>🦋 Pᴀɪᴅ Mᴇᴛʜᴏᴅs</b>    <b>🦋 Hᴀᴄᴋɪɴɢ Fɪʟᴇs</b>
👉 <a href="https://t.me/+dXSBTNIDhTFkNDU9">Jᴏɪɴ</a>      👉 <a href="https://t.me/+DMwFcoGnkR04YWJl">Jᴏɪɴ</a>

<b>🦋 Nᴇᴛғʟɪx Gᴡʏs</b>      <b>🦋 Pʀɪᴠᴀᴛᴇ Fɪʟᴇs</b>
👉 <a href="https://t.me/+JDkyCDQY37w0MzU1">Jᴏɪɴ</a>      👉 <a href="https://t.me/+L0yDlpjz1Gw5NzM1">Jᴏɪɴ</a>

<b>🦋 Cʀᴀᴄᴋɪɴɢ Zᴏɴᴇ</b>   <b>🦋 Fʀᴇᴇ Gɪᴠᴇᴀᴡᴀʏꜱ</b>
👉 <a href="https://t.me/+wG4Mn0HIOTo0ODQ1">Jᴏɪɴ</a>      👉 <a href="https://t.me/+_4vpfsysB584Yjdl">Jᴏɪɴ</a>

━━━━━━━━━━━━━━━━━━━━━━━━━━
<b>❤‍🔥 <a href="https://t.me/SIGMADOX7">⏤͟͟͞͞⛦ 𓆩 𝗢ᴡɴᴇʀ 𓆪</a></b>
<b>⚡<a href="https://t.me/ClassySigma">⏤͟͟͞͞⛦ 𓆩 𝗖ᴏᴡɴᴇʀ 𓆪</a></b>
━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

    await bot.sendVideo(chatId, "https://t.me/PIROxSIGMA/6", {
      caption,
      parse_mode: "HTML",
      disable_web_page_preview: true,
      reply_markup: {
        inline_keyboard: [
          [{ text: "🌐 𝗝ᴏɪɴ 𝗔ʟʟ 𝗖ʜᴀɴɴᴇʟꜱ", url: "https://t.me/addlist/YL8wc0hfre5iMjg9" }],
          [{ text: "💬 Legendary Quote ⚡", callback_data: "quote" }],
          [{ text: "🧠 About Sigma", url: "https://t.me/SIGMADOX7" }],
        ],
      },
    });
  } catch (e) {
    console.error("Error in /start sequence:", e);
  }
});

// 🧠 Legendary Quote Generator
const quotes = [
  "⚡ *Legends don’t talk, they show.*",
  "🧠 *Focus so hard that they think you disappeared.*",
  "🔥 *Don’t chase — attract.*",
  "💎 *Calm mind, loud results.*",
  "🦅 *Work in silence, rule in dominance.*",
];
bot.on("callback_query", async (q) => {
  if (q.data === "quote") {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    bot.answerCallbackQuery(q.id, { text: "💭 Generating quote..." });
    await bot.sendMessage(q.message.chat.id, randomQuote, { parse_mode: "Markdown" });
  }
});

// 🌐 Express server for Render
const PORT = process.env.PORT || 10000;
app.get("/", (req, res) => res.send("Bot is running perfectly ⚡"));
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
