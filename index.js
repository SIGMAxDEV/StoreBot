// index.js
const TelegramBot = require("node-telegram-bot-api");
const express = require("express");

const app = express();
const TOKEN = process.env.BOT_TOKEN;
if (!TOKEN) {
  console.error("ERROR: BOT_TOKEN not set in environment variables.");
  process.exit(1);
}

const bot = new TelegramBot(TOKEN, { polling: true });

// small helper
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

// Safe sendSticker: tries to send sticker; if it fails, sends the sticker link as a message fallback
async function sendStickerSafe(chatId, stickerLinkOrId, options = {}) {
  try {
    // Primary attempt: Telegram accepts file_id or http(s) direct to webp/gif/telegram CDN.
    // t.me page links are not direct file links — they often fail. We'll try and fall back.
    return await bot.sendSticker(chatId, stickerLinkOrId, options);
  } catch (err) {
    console.warn("sendSticker failed — falling back to sending a message link:", err.message || err);
    try {
      return await bot.sendMessage(
        chatId,
        `🔖 Sticker (link): ${stickerLinkOrId}`,
        { disable_web_page_preview: true }
      );
    } catch (err2) {
      console.error("Fallback sendMessage also failed:", err2.message || err2);
      throw err2;
    }
  }
}

// Safe sendVideo: tries to send video; if failed, fallbacks to sending a message with the link
async function sendVideoSafe(chatId, videoLink, opts = {}) {
  try {
    return await bot.sendVideo(chatId, videoLink, opts);
  } catch (err) {
    console.warn("sendVideo failed, falling back to link message:", err.message || err);
    return bot.sendMessage(chatId, `▶️ Video: ${videoLink}`, { disable_web_page_preview: false });
  }
}

// quotes
const quotes = [
  "⚡ *Legends don’t talk, they show.*",
  "🧠 *Focus so hard that they think you disappeared.*",
  "🔥 *Don’t chase — attract.*",
  "💎 *Calm mind, loud results.*",
  "🦅 *Work in silence, rule in dominance.*",
];

// /start handler (safe, with try/catch around each step)
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const firstName = (msg.from && msg.from.first_name) ? msg.from.first_name : "there";

  try {
    // 1) First sticker (boot start) — your provided link (may be t.me link)
    // NOTE: t.me/.. links are page links (not direct file). sendSticker may fail for those.
    const s1 = await sendStickerSafe(chatId, "https://t.me/PIROxSIGMA/168");
    // If the returned object is a message object, use its id for deletion
    await delay(3000);
    try { await bot.deleteMessage(chatId, s1.message_id); } catch (e) { /* ignore delete errors */ }

    // 2) Second sticker
    const s2 = await sendStickerSafe(chatId, "https://t.me/PIROxSIGMA/170");
    await delay(3000);
    try { await bot.deleteMessage(chatId, s2.message_id); } catch (e) { /* ignore delete errors */ }

    // 3) Boot animation message
    const initial = await bot.sendMessage(
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
      try {
        await bot.editMessageText(steps[i], {
          chat_id: chatId,
          message_id: initial.message_id,
          parse_mode: "Markdown",
        });
      } catch (e) {
        // If edit fails (message removed or too old), try to send a new message instead
        console.warn("editMessageText failed — sending message instead:", e.message || e);
        await bot.sendMessage(chatId, steps[i], { parse_mode: "Markdown" });
      }
    }

    // remove animation message if possible
    try { await bot.deleteMessage(chatId, initial.message_id); } catch (e) { /* ignore */ }

    // 4) Third sticker (system activated)
    const s3 = await sendStickerSafe(chatId, "https://t.me/PIROxSIGMA/169");
    await delay(2500);
    try { await bot.deleteMessage(chatId, s3.message_id); } catch (e) { /* ignore */ }

    // 5) final caption + menu (send video safely)
    const caption = `
<b>╔════════════════════════╗</b>

👋 Hey ${firstName}

<b>⚠️ Tʜɪꜱ ɪꜱ ᴀ ᴅɪɢɪᴛᴀʟ ꜱʏꜱᴛᴇᴍ ʀᴇʙᴏᴏᴛ ʙʏ ꜱɪɢᴍᴀ 🤖</b>
<b>Rᴇꜱᴘᴇᴄᴛ ɪꜱ ᴇᴀʀɴᴇᴅ, ʟᴏʏᴀʟᴛʏ ɪꜱ ʀᴇᴛᴜʀɴᴇᴅ, ᴀɴᴅ ꜱɪʟᴇɴᴄᴇ ɪꜱ ᴅᴀɴɢᴇʀᴏᴜꜱ ⚡</b>

<b>╚════════════════════════╝</b>

🦋 <a href="https://t.me/+7OoCk9Y1x_s5YjJl">Main Channel</a>
🦋 <a href="https://t.me/PiDoxz">Premium Giveaways</a>

━━━━━━━━━━━━━━━━━━━━━━━━━━
<b>❤‍🔥 <a href="https://t.me/SIGMADOX7">Owner</a></b>
━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

    await sendVideoSafe(chatId, "https://t.me/PIROxSIGMA/6", {
      caption,
      parse_mode: "HTML",
      disable_web_page_preview: true,
      reply_markup: {
        inline_keyboard: [
          [{ text: "🌐 Join All Channels", url: "https://t.me/addlist/YL8wc0hfre5iMjg9" }],
          [{ text: "💬 Legendary Quote ⚡", callback_data: "quote" }],
          [{ text: "🧠 About Sigma", url: "https://t.me/SIGMADOX7" }],
        ],
      },
    });
  } catch (err) {
    console.error("Error during /start sequence:", err && err.stack ? err.stack : err);
    // Inform user politely if something broke
    try { await bot.sendMessage(chatId, "⚠️ Oops — something went wrong while starting. Try again."); } catch (e) {}
  }
});

// single callback handler
bot.on("callback_query", async (q) => {
  try {
    const data = q.data;
    const chatId = q.message.chat.id;
    if (data === "quote") {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      // show as alert and send as message
      await bot.answerCallbackQuery(q.id, { text: "Quote generated!" });
      await bot.sendMessage(chatId, randomQuote, { parse_mode: "Markdown" });
      return;
    }
    // Unknown callback -> acknowledge
    await bot.answerCallbackQuery(q.id, { text: "Clicked!" });
  } catch (err) {
    console.error("Error in callback_query:", err);
  }
});

// Express health route (Render)
const PORT = process.env.PORT || 10000;
app.get("/", (req, res) => res.send("Bot is running ✓"));
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
