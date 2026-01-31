import { Client, GatewayIntentBits } from "discord.js";
import cron from "node-cron";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

const CHANNEL_ID = process.env.CHANNEL_ID;
const TOKEN = process.env.TOKEN;

client.once("ready", () => {
  console.log(`✅ Bot online als ${client.user.tag}`);
});

// 🔁 Restart Zeiten: alle 6 Stunden
// 00:00, 06:00, 12:00, 18:00
cron.schedule("0 0,6,12,18 * * *", async () => {
  const channel = await client.channels.fetch(CHANNEL_ID);

  channel.send("🔁 **Server Restart in 15 Minuten!**");
  setTimeout(() => channel.send("⏰ **Server Restart in 10 Minuten!**"), 5 * 60 * 1000);
  setTimeout(() => channel.send("⚠️ **Server Restart in 5 Minuten!**"), 10 * 60 * 1000);
  setTimeout(() => channel.send("🚨 **Server Restart in 1 Minute!**"), 14 * 60 * 1000);
  setTimeout(() => channel.send("🔴 **Server wird jetzt neugestartet!**"), 15 * 60 * 1000);
});

client.login(TOKEN);
