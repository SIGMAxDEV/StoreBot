// == @SigmaDox7 Portfolio Bot (Stable Webhook + Animated Effects) ==
// 👑 Author: SIGMAxOWNER
// 🌐 Version: 2.0 (Render Stable)
// 🧠 Description: Animated Telegram Portfolio Bot with emoji reactions, message effects, 
// auto-sticker animation, dynamic loading progress, and random final video post.

// ─── Import Required Modules ─────────────────────────────────────
const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const bodyParser = require("body-parser");

// ─── Express Setup ───────────────────────────────────────────────
const app = express();
app.use(bodyParser.json());

// ─── Configuration ──────────────────────────────────────────────
const TOKEN = process.env.BOT_TOKEN; // Set your bot token in Render environment variables
const URL = process.env.RENDER_EXTERNAL_URL || "https://storebot-3q8w.onrender.com";
const PORT = process.env.PORT || 10000;

// ─── Initialize Bot in Webhook Mode ─────────────────────────────
const bot = new TelegramBot(TOKEN, { webHook: { port: PORT } });
bot.setWebHook(`${URL}/bot${TOKEN}`);

// ─── Express Route to Handle Webhook Updates ────────────────────
app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// ─── Handle /start Command ──────────────────────────────────────
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const msgId = msg.message_id;
  const user = msg.from.first_name || "User";

  try {
    // 1️⃣ Reaction + Message Effect Setup
    const emojis = ["❤️", "🔥", "👍", "💥", "😎", "🚀"]; // Random emoji reactions
    const effects = [
      "5046589136895476101", // fire-burst
      "5104841245755180586", // success-like
      "5044134455711629726", // heart
      "5046509860389126442", // confetti
      "5107584321108051014", // thumbs up
      "5104858069142078462", // thumbs down
    ];

    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const effect = effects[Math.floor(Math.random() * effects.length)];

    // Send visual boot message with cool effect
    await bot.sendMessage(chatId, "🚀 Booting Rare Sigma Portfolio...", {
      message_effect_id: effect,
    });

    // React to the user’s /start command
    await bot.setMessageReaction(chatId, msgId, [{ type: "emoji", emoji }]).catch(() => {});
    await new Promise((r) => setTimeout(r, 5000)); // Wait for 5 seconds

    // Delete the /start command after short delay
    await bot.deleteMessage(chatId, msgId).catch(() => {});

    // 2️⃣ Animated Sticker Sequence
    const stickers = [
      "https://t.me/PIROxSIGMA/170",
      "https://t.me/PIROxSIGMA/169",
      "https://t.me/PIROxSIGMA/171",
    ];

    for (const url of stickers) {
      try {
        const sent = await bot.sendSticker(chatId, url);
        await new Promise((r) => setTimeout(r, 2500)); // Wait 2.5s
        await bot.deleteMessage(chatId, sent.message_id).catch(() => {});
      } catch (e) {
        console.log("⚠️ Sticker send failed:", e.message);
      }
    }

    // 3️⃣ Progress Bar Animation
    const steps = [
      "💾 Initializing... ▱▱▱▱▱▱▱▱▱▱ 0%",
      "🧠 Loading modules... ▰▱▱▱▱▱▱▱▱▱ 10%",
      "💻 Activating protocols... ▰▰▱▱▱▱▱▱▱▱ 25%",
      "⚡ Optimizing engine... ▰▰▰▱▱▱▱▱▱▱ 45%",
      "🚀 Building interface... ▰▰▰▰▱▱▱▱▱▱ 60%",
      "💎 Finalizing setup... ▰▰▰▰▰▰▱▱▱▱ 80%",
      "✅ Finalizing personal portfolio... ▰▰▰▰▰▰▰▰▰▰ 100%",
    ];

    const progress = await bot.sendMessage(chatId, steps[0], { parse_mode: "Markdown" });
    for (let i = 1; i < steps.length; i++) {
      await new Promise((r) => setTimeout(r, 900)); // Animation delay
      await bot
        .editMessageText(steps[i], {
          chat_id: chatId,
          message_id: progress.message_id,
          parse_mode: "Markdown",
        })
        .catch(() => {});
    }

    // 4️⃣ Random Portfolio Video + Final Post
    const videos = [
      "https://t.me/PIROxSIGMA/76",
      "https://t.me/PIROxSIGMA/77",
      "https://t.me/PIROxSIGMA/69",
      "https://t.me/PIROxSIGMA/70",
      "https://t.me/PIROxSIGMA/52",
      "https://t.me/PIROxSIGMA/6",
      "https://t.me/PIROxSIGMA/157",
    ];
    const selectedVideo = videos[Math.floor(Math.random() * videos.length)];

    const caption = `
<b>╔══════════════════════╗</b>

👋 Hey ${user}

<b>⚠️ Tʜɪꜱ ᴄᴏᴍᴍᴜɴɪᴛʏ ɪꜱ ꜰᴏʀ ᴇᴅᴜᴄᴀᴛɪᴏɴᴀʟ ᴀɴᴅ ᴇxᴘᴇʀɪᴍᴇɴᴛᴀʟ ᴘᴜʀᴘᴏꜱᴇꜱ ᴏɴʟʏ 🧑‍💻
Cᴏᴘʏʀɪɢʜᴛ ᴅɪꜱᴄʟᴀɪᴍᴇʀ ᴜɴᴅᴇʀ ꜱᴇᴄᴛɪᴏɴ 107 ᴏꜰ ᴛʜᴇ ᴄᴏᴘʏʀɪɢʜᴛ ᴀᴄᴛ 1976 🫧
🧑‍💻Cᴏɴᴛᴀᴄᴛ ꜰᴏʀ ᴀᴅᴠᴇʀᴛɪꜱᴇᴍᴇɴᴛ</b>

<b>╚══════════════════════╝</b>

<b>🦋 Mᴀɪɴ Cʜᴀɴɴᴇʟ</b>    <b>🦋 Pʀᴇᴍɪᴜᴍ Gᴡʏs</b>
👉 <a href="https://t.me/+7OoCk9Y1x_s5YjJl">Jᴏɪɴ</a>      👉 <a href="https://t.me/PiDoxz">Jᴏɪɴ</a>

<b>🦋 Pᴀɪᴅ Mᴇᴛʜᴏᴅs</b>    <b>🦋 Hᴀᴄᴋɪɴɢ Fɪʟᴇs</b>
👉 <a href="https://t.me/+dXSBTNIDhTFkNDU9">Jᴏɪɴ</a>      👉 <a href="https://t.me/+DMwFcoGnkR04YWJl">Jᴏɪɴ</a>

<b>🦋 Pᴀɪᴅ Cᴏᴜʀsᴇs</b>     <b>🦋 Cʏʙᴇʀ Cʜᴀɴɴᴇʟ</b>
👉 <a href="https://t.me/+yOFEAk19m-gzNjY9">Jᴏɪɴ</a>      👉 <a href="https://t.me/+k1dW4uaTemQzYTVl">Jᴏɪɴ</a>

<b>🦋 Nᴇᴛғʟɪx Gᴡʏs</b>      <b>🦋 Pʀɪᴠᴀᴛᴇ Fɪʟᴇs</b>
👉 <a href="https://t.me/+JDkyCDQY37w0MzU1">Jᴏɪɴ</a>      👉 <a href="https://t.me/+L0yDlpjz1Gw5NzM1">Jᴏɪɴ</a>

<b>🦋 Cʀᴀᴄᴋɪɴɢ Zᴏɴᴇ</b>   <b>🦋 Fʀᴇᴇ Gᴡʏs</b>
👉 <a href="https://t.me/+wG4Mn0HIOTo0ODQ1">Jᴏɪɴ</a>      👉 <a href="https://t.me/+_4vpfsysB584Yjdl">Jᴏɪɴ</a>

━━━━━━━━━━━━━━━━━━━━━━━━
<b>❤‍🩹 <a href="https://t.me/SIGMADOX7">⏤͟͟͞͞⛦ 𓆩 𝗢ᴡɴᴇʀ 𓆪 </a></b>
<b>⚡<a href="https://t.me/ClassySigma">⏤͟͟͞͞⛦ 𓆩 𝗖ᴏᴡɴᴇʀ 𓆪 </a></b>
━━━━━━━━━━━━━━━━━━━━━━━━
`;

    // Send the video as final main content
    await bot.sendVideo(chatId, selectedVideo, {
      caption,
      parse_mode: "HTML",
      disable_web_page_preview: true,
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "┇「 ✮ 𝗝ᴏɪɴ 𝗔ʟʟ 𝗧ᴏɢᴇᴛʜᴇʀ ✦ 」┇",
              url: "https://t.me/addlist/YL8wc0hfre5iMjg9",
            },
          ],
        ],
      },
    });

    // Delete the progress message after completion
    await bot.deleteMessage(chatId, progress.message_id).catch(() => {});
  } catch (err) {
    console.error("❌ Error in animation sequence:", err.message);
    await bot.sendMessage(chatId, "⚠️ Something went wrong but recovered!");
  }
});

// ─── Health Check Endpoint ─────────────────────────────────────
app.get("/", (req, res) => res.send("✅ Bot is running fine."));
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
