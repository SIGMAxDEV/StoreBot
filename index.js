const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const app = express();

const TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(TOKEN, { polling: true });

// /start command
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name;

  // 1️⃣ Start animation
  const sent = await bot.sendMessage(
    chatId,
    "⚙️ *Booting profile systems...*\n_▱▱▱▱▱▱▱▱▱▱ 0%_",
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

  // 2️⃣ Animate progress bar
  for (let i = 0; i < steps.length; i++) {
    await new Promise((r) => setTimeout(r, 500)); // delay
    await bot.editMessageText(steps[i], {
      chat_id: chatId,
      message_id: sent.message_id,
      parse_mode: "Markdown",
    });
  }

  // 3️⃣ After animation, send your main video post
  const caption = `
<b>╔════════════════════════╗</b>

👋 Hey ${firstName}

<b>⚠️ Tʜɪꜱ ᴄᴏᴍᴍᴜɴɪᴛʏ ɪꜱ ꜰᴏʀ ᴇᴅᴜᴄᴀᴛɪᴏɴᴀʟ ᴀɴᴅ ᴇxᴘᴇʀɪᴍᴇɴᴛᴀʟ ᴘᴜʀᴘᴏꜱᴇꜱ ᴏɴʟʏ 🧑‍💻
Cᴏᴘʏʀɪɢʜᴛ ᴅɪꜱᴄʟᴀɪᴍᴇʀ ᴜɴᴅᴇʀ ꜱᴇᴄᴛɪᴏɴ 107 ᴏꜰ ᴛʜᴇ ᴄᴏᴘʏʀɪɢʜᴛ ᴀᴄᴛ 1976 🫧
🧑‍💻Cᴏɴᴛᴀᴄᴛ ꜰᴏʀ ᴀᴅᴠᴇʀᴛɪꜱᴇᴍᴇɴᴛ</b>

<b>╚════════════════════════╝</b>

<b>🦋 Mᴀɪɴ Cʜᴀɴɴᴇʟ</b>    <b>🦋 Pʀᴇᴍɪᴜᴍ Gᴡʏs</b>
👉 <a href="https://t.me/+7OoCk9Y1x_s5YjJl">Jᴏɪɴ Cʜᴀɴɴᴇʟ</a>      👉 <a href="https://t.me/PiDoxz">Jᴏɪɴ Cʜᴀɴɴᴇʟ</a>

<b>🦋 Pᴀɪᴅ Mᴇᴛʜᴏᴅs</b>    <b>🦋 Hᴀᴄᴋɪɴɢ Fɪʟᴇs</b>
👉 <a href="https://t.me/+dXSBTNIDhTFkNDU9">Jᴏɪɴ Cʜᴀɴɴᴇʟ</a>      👉 <a href="https://t.me/+DMwFcoGnkR04YWJl">Jᴏɪɴ Cʜᴀɴɴᴇʟ</a>

<b>🦋 Pᴀɪᴅ Cᴏᴜʀsᴇs</b>     <b>🦋 Cʏʙᴇʀ Cʜᴀɴɴᴇʟ</b>
👉 <a href="https://t.me/+yOFEAk19m-gzNjY9">Jᴏɪɴ Cʜᴀɴɴᴇʟ</a>      👉 <a href="https://t.me/+k1dW4uaTemQzYTVl">Jᴏɪɴ Cʜᴀɴɴᴇʟ</a>

<b>🦋 Nᴇᴛғʟɪx Gᴡʏs</b>      <b>🦋 Pʀɪᴠᴀᴛᴇ Fɪʟᴇs</b>
👉 <a href="https://t.me/+JDkyCDQY37w0MzU1">Jᴏɪɴ Cʜᴀɴɴᴇʟ</a>      👉 <a href="https://t.me/+L0yDlpjz1Gw5NzM1">Jᴏɪɴ Cʜᴀɴɴᴇʟ</a>

<b>🦋 Cʀᴀᴄᴋɪɴɢ Zᴏɴᴇ</b>   <b>🦋 𝗙ʀᴇᴇ 𝗚ɪᴠᴇ𝗮𝘄𝗮𝘆𝘀</b>
👉 <a href="https://t.me/+wG4Mn0HIOTo0ODQ1">Jᴏɪɴ Cʜᴀɴɴᴇʟ</a>      👉 <a href="https://t.me/+_4vpfsysB584Yjdl">Jᴏɪɴ Cʜᴀɴɴᴇʟ</a>

━━━━━━━━━━━━━━━━━━━━━━━━━━
<b>❤‍🩹 <a href="https://t.me/SIGMADOX7">⏤͟͟͞͞⛦ 𓆩 𝗢ᴡɴᴇʀ 𓆪 </a></b>
<b>⚡<a href="https://t.me/ClassySigma">⏤͟͟͞͞⛦ 𓆩 𝗖ᴏᴡɴᴇʀ 𓆪 </a></b>
━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

  // Replace with your video
  await bot.sendVideo(chatId, "https://t.me/PIROxSIGMA/6", {
    caption,
    parse_mode: "HTML",
    disable_web_page_preview: true,
    reply_markup: {
      inline_keyboard: [
        [{ text: "┇「 ✮ 𝗝ᴏɪɴ 𝗔ʟʟ 𝗧ᴏɢᴇᴛʜᴇʀ ✦ 」┇", url: "https://t.me/addlist/YL8wc0hfre5iMjg9" }],
      ],
    },
  });
});

// For Render
const PORT = process.env.PORT || 10000;
app.get("/", (req, res) => res.send("Bot is running!"));
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
