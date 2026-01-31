import { Client, GatewayIntentBits } from "discord.js";
import cron from "node-cron";
import http from "http";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

const TOKEN = process.env.TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;
const PORT = process.env.PORT || 3000;

// 🌐 Fake Webserver für Render Free
http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Bot läuft ✅");
}).listen(PORT, () => {
  console.log(`🌐 Webserver läuft auf Port ${PORT}`);
});

// 🤖 Discord Bot ready
client.once("ready", () => {
  console.log(`✅ Bot online als ${client.user.tag}`);
});

// ⏰ Restart Schedule (alle 6 Stunden)
cron.schedule("0 0,6,12,18 * * *", async () => {
  const channel = await client.channels.fetch(CHANNEL_ID);

  channel.send("🔁 **Server Restart in 15 Minuten!**");
  setTimeout(() => channel.send("⏰ **Server Restart in 10 Minuten!**"), 5 * 60 * 1000);
  setTimeout(() => channel.send("⚠️ **Server Restart in 5 Minuten!**"), 10 * 60 * 1000);
  setTimeout(() => channel.send("🚨 **Server Restart in 1 Minute!**"), 14 * 60 * 1000);
  setTimeout(() => channel.send("🔴 **Server wird jetzt neugestartet!**"), 15 * 60 * 1000);
});

client.login(TOKEN);
