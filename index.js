// == Rare Sigma Portfolio Bot FINAL (Render Webhook Safe) ==
// Reacts to /start, deletes it, plays sticker animation, progress bar, and shows final video

const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

const TOKEN = process.env.BOT_TOKEN;
const URL = process.env.RENDER_EXTERNAL_URL || "https://storebot-3q8w.onrender.com";
const PORT = process.env.PORT || 10000;

// Initialize bot in webhook mode
const bot = new TelegramBot(TOKEN, { webHook: { port: PORT } });
bot.setWebHook(`${URL}/bot${TOKEN}`);

// Handle Telegram updates
app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// ───────────────────────────────
// Main /start Command
// ───────────────────────────────
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const userMsgId = msg.message_id;
  const firstName = msg.from.first_name || "User";

  try {
    // 1️⃣ Random Reaction on /start
    const reactions = ["❤️", "🔥", "👍", "💥", "😎", "🚀"];
    const emoji = reactions[Math.floor(Math.random() * reactions.length)];
    await bot
      .setMessageReaction({
        chat_id: chatId,
        message_id: userMsgId,
        reaction: [{ type: "emoji", emoji }],
      })
      .catch(() => {});

    // Wait 5 seconds, then delete the /start message
    await new Promise((res) => setTimeout(res, 5000));
    await bot.deleteMessage(chatId, userMsgId).catch(() => {});

    // 2️⃣ Sticker Animation
    const stickers = [
      { file: "CAACAgUAAxkBAAIB12aC4r8WgUAAAAFzqC6R6D12WBB0JgACSwIAAhsiqFXPrl5eNcgfQzYE", time: 3000 },
      { file: "CAACAgUAAxkBAAIB2WaC4sZu0NOjAAAAAARq0VG0v1UnO7AAAj4BAAIbIqgVMTdEU3G-sws2BA", time: 3000 },
      { file: "CAACAgUAAxkBAAIB3maC4tF6hCpjAAAAAADkOt41p0chj4MAAoEBAAIbIqgVRFCSnBVG5rY2BA", time: 3000 },
    ];

    for (const s of stickers) {
      const sentSticker = await bot.sendSticker(chatId, s.file).catch(() => {});
      await new Promise((r) => setTimeout(r, s.time));
      if (sentSticker) await bot.deleteMessage(chatId, sentSticker.message_id).catch(() => {});
    }

    // 3️⃣ Loading Animation (Progress Bar)
    const sent = await bot.sendMessage(
      chatId,
      "✅ *Finalizing personal portfolio...*\n_▱▱▱▱▱▱▱▱▱▱ 0%_",
      { parse_mode: "Markdown" }
    );

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
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise((r) => setTimeout(r, 700));
      await bot
        .editMessageText(steps[i], {
          chat_id: chatId,
          message_id: sent.message_id,
          parse_mode: "Markdown",
        })
        .catch(() => {});
    }

    // 4️⃣ Final Portfolio Video + Caption
    const caption = `
<b>╔══════════════════════╗</b>

👋 Hey ${firstName}

<b>⚠️ Tʜɪꜱ ᴄᴏᴍᴍᴜɴɪᴛʏ ɪꜱ ꜰᴏʀ ᴇᴅᴜᴄᴀᴛɪᴏɴᴀʟ ᴀɴᴅ ᴇxᴘᴇʀɪᴍᴇɴᴛᴀʟ ᴘᴜʀᴘᴏꜱᴇꜱ ᴏɴʟʏ 🧑‍💻
Cᴏᴘʏʀɪɢʜᴛ ᴅɪꜱᴄʟᴀɪᴍᴇʀ ᴜɴᴅᴇʀ ꜱᴇᴄᴛɪᴏɴ 107 ᴏꜰ ᴛʜᴇ ᴄᴏᴘʏʀɪɢʜᴛ ᴀᴄᴛ 1976 🫧
🧑‍💻Cᴏɴᴛᴀᴄᴛ ꜰᴏʀ ᴀᴅᴠᴇʀᴛɪꜱᴇᴍᴇɴᴛ</b>

<b>╚══════════════════════╝</b>

<b>🦋 Mᴀɪɴ Cʜᴀɴɴᴇʟ</b>    <b>🦋 Pʀᴇᴍɪᴜᴍ Gᴡʏs</b>
👉 <a href="https://t.me/+7OoCk9Y1x_s5YjJl">Jᴏɪɴ Cʜᴀɴɴᴇʟ</a>      👉 <a href="https://t.me/PiDoxz">Jᴏɪɴ Cʜᴀɴɴᴇʟ</a>

<b>🦋 Pᴀɪᴅ Mᴇᴛʜᴏᴅs</b>    <b>🦋 Hᴀᴄᴋɪɴɢ Fɪʟᴇs</b>
👉 <a href="https://t.me/+dXSBTNIDhTFkNDU9">Jᴏɪɴ Cʜᴀɴɴᴇʟ</a>      👉 <a href="https://t.me/+DMwFcoGnkR04YWJl">Jᴏɪɴ Cʜᴀɴɴᴇʟ</a>

<b>🦋 Pᴀɪᴅ Cᴏᴜʀsᴇs</b>     <b>🦋 Cʏʙᴇʀ Cʜᴀɴɴᴇʟ</b>
👉 <a href="https://t.me/+yOFEAk19m-gzNjY9">Jᴏɪɴ Cʜᴀɴɴᴇʟ</a>      👉 <a href="https://t.me/+k1dW4uaTemQzYTVl">Jᴏɪɴ Cʜᴀɴɴᴇʟ</a>

<b>🦋 Nᴇᴛғʟɪx Gᴡʏs</b>      <b>🦋 Pʀɪᴠᴀᴛᴇ Fɪʟᴇs</b>
👉 <a href="https://t.me/+JDkyCDQY37w0MzU1">Jᴏɪɴ Cʜᴀɴɴᴇʟ</a>      👉 <a href="https://t.me/+L0yDlpjz1Gw5NzM1">Jᴏɪɴ Cʜᴀɴɴᴇʟ</a>

<b>🦋 Cʀᴀᴄᴋɪɴɢ Zᴏɴᴇ</b>   <b>🦋 Fʀᴇᴇ Gᴡʏs</b>
👉 <a href="https://t.me/+wG4Mn0HIOTo0ODQ1">Jᴏɪɴ Cʜᴀɴɴᴇʟ</a>      👉 <a href="https://t.me/+_4vpfsysB584Yjdl">Jᴏɪɴ Cʜᴀɴɴᴇʟ</a>

━━━━━━━━━━━━━━━━━━━━━━━━
<b>❤‍🩹 <a href="https://t.me/SIGMADOX7">⏤͟͟͞͞⛦ 𓆩 𝗢ᴡɴᴇʀ 𓆪 </a></b>
<b>⚡<a href="https://t.me/ClassySigma">⏤͟͟͞͞⛦ 𓆩 𝗖ᴏᴡɴᴇʀ 𓆪 </a></b>
━━━━━━━━━━━━━━━━━━━━━━━━
`;

    await bot
      .editMessageText("🎯 *Profile Boot Complete!*", {
        chat_id: chatId,
        message_id: sent.message_id,
        parse_mode: "Markdown",
      })
      .catch(() => {});

    await bot
      .sendVideo(chatId, "https://files.catbox.moe/p8v7n7.mp4", {
        caption,
        parse_mode: "HTML",
        disable_web_page_preview: true,
        reply_markup: {
          inline_keyboard: [
            [{ text: "┇「 ✮ 𝗝ᴏɪɴ 𝗔ʟʟ 𝗧ᴏɢᴇᴛʜᴇʀ ✦ 」┇", url: "https://t.me/addlist/YL8wc0hfre5iMjg9" }],
          ],
        },
      })
      .catch(() => {});

    await bot.deleteMessage(chatId, sent.message_id).catch(() => {});
  } catch (err) {
    console.error("❌ Error in animation sequence:", err);
    await bot.sendMessage(chatId, "⚠️ Something went wrong but you are BSDK!");
  }
});

// ───────────────────────────────
// Render Health Check
// ───────────────────────────────
app.get("/", (req, res) => res.send("Bot is running successfully bitchh 👅"));
console.log(`💋 Server running onyour fucking port ${PORT}`);
