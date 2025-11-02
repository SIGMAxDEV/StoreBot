// == Rare Sigma Portfolio Bot (Webhook Stable + Full Animation) ==
// Reacts on /start → adds random reaction → deletes → plays sticker animation → progress → final video

const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

const TOKEN = process.env.BOT_TOKEN;
const URL = process.env.RENDER_EXTERNAL_URL || "https://storebot-3q8w.onrender.com";
const PORT = process.env.PORT || 10000;

// ─── Initialize Bot (Webhook Mode)
const bot = new TelegramBot(TOKEN, { webHook: { port: PORT } });
bot.setWebHook(`${URL}/bot${TOKEN}`);

app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// ─── /start Command ──────────────────────────────
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const msgId = msg.message_id;
  const user = msg.from.first_name || "User";

  try {
    // 1️⃣ Add random reaction to /start
    const reactions = ["❤️", "🔥", "👍", "💥", "😎", "🚀"];
    const emoji = reactions[Math.floor(Math.random() * reactions.length)];

    await bot.setMessageReaction(chatId, msgId, [{ type: "emoji", emoji }]).catch(() => {});

    // Wait 5s, then delete /start message
    await new Promise((r) => setTimeout(r, 5000));
    await bot.deleteMessage(chatId, msgId).catch(() => {});

    // 2️⃣ Sticker Animation (Telegram File URLs work only if file_id extracted)
    const stickers = [
      "https://t.me/PIROxSIGMA/168",
      "https://t.me/PIROxSIGMA/170",
      "https://t.me/PIROxSIGMA/169",
    ];

    for (const url of stickers) {
      try {
        const sent = await bot.sendSticker(chatId, url);
        await new Promise((r) => setTimeout(r, 2500));
        await bot.deleteMessage(chatId, sent.message_id).catch(() => {});
      } catch (e) {
        console.log("⚠️ Sticker send failed:", e.message);
      }
    }

    // 3️⃣ Progress Animation
    const progressSteps = [
      "💾 Initializing... ▱▱▱▱▱▱▱▱▱▱ 0%",
      "🧠 Loading modules... ▰▱▱▱▱▱▱▱▱▱ 10%",
      "💻 Activating protocols... ▰▰▱▱▱▱▱▱▱▱ 25%",
      "⚡ Optimizing engine... ▰▰▰▱▱▱▱▱▱▱ 45%",
      "🚀 Building interface... ▰▰▰▰▱▱▱▱▱▱ 60%",
      "💎 Finalizing setup... ▰▰▰▰▰▰▱▱▱▱ 80%",
      "✅ Done! ▰▰▰▰▰▰▰▰▰▰ 100%",
    ];

    const progMsg = await bot.sendMessage(chatId, progressSteps[0], { parse_mode: "Markdown" });
    for (let i = 1; i < progressSteps.length; i++) {
      await new Promise((r) => setTimeout(r, 900));
      await bot.editMessageText(progressSteps[i], {
        chat_id: chatId,
        message_id: progMsg.message_id,
        parse_mode: "Markdown",
      }).catch(() => {});
    }

    // 4️⃣ Final Video Message
    const caption = `
<b>╔══════════════════════╗</b>

👋 Hey ${user}

<b>⚠️ Educational Purpose Only 🧑‍💻
Copyright Disclaimer Under Section 107 of the Copyright Act 1976
🧑‍💻 Contact for advertisement</b>

<b>╚══════════════════════╝</b>

<b>🦋 Mᴀɪɴ Cʜᴀɴɴᴇʟ</b>    <b>🦋 Pʀᴇᴍɪᴜᴍ Gᴡʏs</b>
👉 <a href="https://t.me/+7OoCk9Y1x_s5YjJl">Join</a>      👉 <a href="https://t.me/PiDoxz">Join</a>

<b>🦋 Pᴀɪᴅ Mᴇᴛʜᴏᴅs</b>    <b>🦋 Hᴀᴄᴋɪɴɢ Fɪʟᴇs</b>
👉 <a href="https://t.me/+dXSBTNIDhTFkNDU9">Join</a>      👉 <a href="https://t.me/+DMwFcoGnkR04YWJl">Join</a>

<b>🦋 Pᴀɪᴅ Cᴏᴜʀsᴇs</b>     <b>🦋 Cʏʙᴇʀ Cʜᴀɴɴᴇʟ</b>
👉 <a href="https://t.me/+yOFEAk19m-gzNjY9">Join</a>      👉 <a href="https://t.me/+k1dW4uaTemQzYTVl">Join</a>

<b>🦋 Nᴇᴛғʟɪx Gᴡʏs</b>      <b>🦋 Pʀɪᴠᴀᴛᴇ Fɪʟᴇs</b>
👉 <a href="https://t.me/+JDkyCDQY37w0MzU1">Join</a>      👉 <a href="https://t.me/+L0yDlpjz1Gw5NzM1">Join</a>

<b>🦋 Cʀᴀᴄᴋɪɴɢ Zᴏɴᴇ</b>   <b>🦋 Fʀᴇᴇ Gᴡʏs</b>
👉 <a href="https://t.me/+wG4Mn0HIOTo0ODQ1">Join</a>      👉 <a href="https://t.me/+_4vpfsysB584Yjdl">Join</a>

━━━━━━━━━━━━━━━━━━━━━━━━
<b>❤‍🩹 <a href="https://t.me/SIGMADOX7">⏤͟͟͞͞⛦ 𓆩 Owner 𓆪</a></b>
<b>⚡ <a href="https://t.me/ClassySigma">⏤͟͟͞͞⛦ 𓆩 Cowner 𓆪</a></b>
━━━━━━━━━━━━━━━━━━━━━━━━
`;

    // Direct video file URL required (t.me links will fail)
    await bot.sendVideo(chatId, "https://t.me/PIROxSIGMA/6", {
      caption,
      parse_mode: "HTML",
      disable_web_page_preview: true,
      reply_markup: {
        inline_keyboard: [
          [{ text: "┇「 ✮ 𝗝ᴏɪɴ 𝗔ʟʟ 𝗧ᴏɢᴇᴛʜᴇʀ ✦ 」┇", url: "https://t.me/addlist/YL8wc0hfre5iMjg9" }],
        ],
      },
    }).catch((e) => console.log("⚠️ Video send failed:", e.message));

    await bot.deleteMessage(chatId, progMsg.message_id).catch(() => {});
  } catch (err) {
    console.error("❌ Error in animation sequence:", err);
    await bot.sendMessage(chatId, "⚠️ Something went wrong but you are BSDK!");
  }
});

// ─── Render Health Check
app.get("/", (req, res) => res.send("Bot is running successfully bitchh 👅"));
console.log(`💋 Server running on your fucking port ${PORT}`);
