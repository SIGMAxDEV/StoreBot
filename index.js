// == Rare Sigma Portfolio Bot (Stable Webhook + Animated Effects) ==

const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

const TOKEN = process.env.BOT_TOKEN;
const URL = process.env.RENDER_EXTERNAL_URL || "https://storebot-3q8w.onrender.com";
const PORT = process.env.PORT || 3000;

// ─── Initialize Bot (no port here!)
const bot = new TelegramBot(TOKEN);
bot.setWebHook(`${URL}/bot${TOKEN}`);

// ─── Express webhook endpoint
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
    // 1️⃣ Random reaction + random message effect
    const emojis = ["❤️", "🔥", "👍", "💥", "😎", "🚀"];
    const effects = [
      "5046589136895476101",
      "5104841245755180586",
      "5044134455711629726",
      "5046509860389126442",
      "5107584321108051014",
      "5104858069142078462",
    ];

    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const effect = effects[Math.floor(Math.random() * effects.length)];

    await bot.sendMessage(chatId, "🚀 Booting portfolio...", {
      message_effect_id: effect,
    });

    await bot.setMessageReaction(chatId, msgId, [{ type: "emoji", emoji }]).catch(() => {});
    await new Promise((r) => setTimeout(r, 5000));
    await bot.deleteMessage(chatId, msgId).catch(() => {});

    // 2️⃣ Sticker animation (auto delete)
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

    // 3️⃣ Progress animation
    const steps = [
      "🌙 Booting up night systems... ▱▱▱▱▱▱▱▱▱▱ 0%",
      "💫 Linking neural modules... ▰▱▱▱▱▱▱▱▱▱ 15%",
      "⚙️ Powering dark-core engine... ▰▰▱▱▱▱▱▱▱▱ 30%",
      "🌌 Syncing data through quantum waves... ▰▰▰▱▱▱▱▱▱▱ 50%",
      "🔥 Stabilizing reactors... ▰▰▰▰▱▱▱▱▱▱ 65%",
      "🧩 Merging Sigma protocols... ▰▰▰▰▰▱▱▱▱▱ 80%",
      "🌃 Final glow calibration... ▰▰▰▰▰▰▰▱▱▱ 90%",
      "💎 Nightcore ready! ▰▰▰▰▰▰▰▰▰▰ 100%",
    ];

    const progress = await bot.sendMessage(chatId, steps[0], { parse_mode: "Markdown" });
    for (let i = 1; i < steps.length; i++) {
      await new Promise((r) => setTimeout(r, 900));
      await bot
        .editMessageText(steps[i], {
          chat_id: chatId,
          message_id: progress.message_id,
          parse_mode: "Markdown",
        })
        .catch(() => {});
    }

    // 4️⃣ Final Portfolio Video + Caption
    const caption = `
<b>╔══════════════════════╗</b>

👋 Hey ${user}

<b>⚠️ Tʜɪꜱ ᴄᴏᴍᴍᴜɴɪᴛʏ ɪꜱ ꜰᴏʀ ᴇᴅᴜᴄᴀᴛɪᴏɴᴀʟ ᴀɴᴅ ᴇxᴘᴇʀɪᴍᴇɴᴛᴀʟ ᴘᴜʀᴘᴏꜱᴇꜱ ᴏɴʟʏ 🧑‍💻
Cᴏᴘʏʀɪɢʜᴛ ᴅɪꜱᴄʟᴀɪᴍᴇʀ ᴜɴᴅᴇʀ ꜱᴇᴄᴛɪᴏɴ 107 ᴏꜰ ᴛʜᴇ ᴄᴏᴘʏʀɪɢʜᴛ ᴀᴄᴛ 1976 🫧
🧑‍💻Cᴏɴᴛᴀᴄᴛ ꜰᴏʀ ᴀᴅᴠᴇʀᴛɪꜱᴇᴍᴇɴᴛ</b>

<b>╚══════════════════════╝</b>

<b>🦋 Mᴀɪɴ Cʜᴀɴɴᴇʟ</b>    <b>🦋 Pʀᴇᴍɪᴜᴍ Gᴡʏs</b>
👉 <a href="https://t.me/+7OoCk9Y1x_s5YjJl">Jᴏɪɴ</a>      👉 <a href="https://t.me/PiDoxz">Jᴏɪɴ</a>

<b>❤‍🩹 <a href="https://t.me/SIGMADOX7">⏤͟͟͞͞⛦ 𓆩 𝗢ᴡɴᴇʀ 𓆪 </a></b>
<b>⚡<a href="https://t.me/ClassySigma">⏤͟͟͞͞⛦ 𓆩 𝗖ᴏᴡɴᴇʀ 𓆪 </a></b>
`;

    await bot.sendVideo(chatId, "https://files.catbox.moe/p8v7n7.mp4", {
      caption,
      parse_mode: "HTML",
      disable_web_page_preview: true,
      reply_markup: {
        inline_keyboard: [
          [{ text: "┇「 ✮ 𝗝ᴏɪɴ 𝗔ʟʟ 𝗧ᴏɢᴇᴛʜᴇʀ ✦ 」┇", url: "https://t.me/addlist/YL8wc0hfre5iMjg9" }],
        ],
      },
    });

    await bot.deleteMessage(chatId, progress.message_id).catch(() => {});
  } catch (err) {
    console.error("❌ Error in animation sequence:", err.message);
    await bot.sendMessage(chatId, "⚠️ Something went wrong but recovered!");
  }
});

// ─── Health Check
app.get("/", (req, res) => res.send("✅ Bot is running fine 😏."));

// ─── Start Express server only once
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
