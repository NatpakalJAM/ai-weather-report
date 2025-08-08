require('dotenv').config(); // 👈 Load .env

const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// ใช้ค่าจาก .env
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const payload = {
        user: message.author.username,
        content: message.content
    };

    console.log(payload);

    try {
        await axios.post(N8N_WEBHOOK_URL, payload);
        message.reply('ฉันหาข้อมูลให้ซักครู่น้า~~ XD');
    } catch (error) {
        message.reply('ฉันเชื่อมต่อระบบ n8n ไม่ได้อ่ะ :( => ' + error);
    }
});

client.login(DISCORD_BOT_TOKEN);
console.log('BOT START!!');