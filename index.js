import TelegramBot from "node-telegram-bot-api";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
const app = express();
app.use(express.json());

// In-memory storage (for now)
let fileStore = {};

// 📦 Save any file user sends
bot.on("message", async (msg) => {
  if (msg.document || msg.video || msg.photo) {
    const file =
      msg.document || msg.video || (msg.photo && msg.photo.pop());
    const fileId = file.file_id;
    const uniqueId = Math.random().toString(36).substring(2, 10);
    fileStore[uniqueId] = fileId;

    await bot.sendMessage(
      msg.chat.id,
      `✅ File saved!\n\n🔗 Share link:\nhttps://${process.env.RENDER_URL}/file/${uniqueId}`
    );
  }
});

// 🌐 Web endpoint to send file
app.get("/file/:id", async (req, res) => {
  const id = req.params.id;
  const fileId = fileStore[id];
  if (!fileId) return res.send("❌ File not found");

  // Send the file via bot to the user (you can change chat_id)
  await bot.sendMessage(process.env.OWNER_ID, "📤 Someone opened the link!");
  await bot.sendDocument(process.env.OWNER_ID, fileId);
  res.send("✅ File sent via bot!");
});

// Keep server alive
app.get("/", (req, res) => {
  res.send("File Storage Bot by Ayu is running 🚀");
});

app.listen(10000, () => console.log("Server started"));
