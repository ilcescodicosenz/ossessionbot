import 'os';
import 'util';
import '@whiskeysockets/baileys';
import 'fs';
import fetch from 'node-fetch';
import { performance } from 'perf_hooks';

let handler = async (m, { conn, usedPrefix }) => {
  try {
    const uptimeMs = process.uptime() * 1000;
    const uptimeStr = formatTime(uptimeMs);
    const startTime = performance.now();
    const endTime = performance.now();
    const speed = (endTime - startTime).toFixed(4);

    const botName = global.db?.data?.nomedelbot || "BOT STATUS";
    const botVersion = global.db?.data?.versione || "1.0.0";
    const ossessionBot = global.db?.data?.ossessionbot || "Nessuna descrizione disponibile";

    const botStartTime = new Date(Date.now() - uptimeMs);
    const activationTime = botStartTime.toLocaleString('it-IT', {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    const message = `🌐 *${botName}* 🌐\n\n` +
      `⏳ *Tempo di attività:* ${uptimeStr}\n` +
      `🕒 *Attivato il:* ${activationTime}\n` +
      `⚡ *Tempo di risposta:* ${speed} secondi\n` +
      `📌 *Descrizione:* ${ossessionBot}\n` +
      `🛠 *Versione:* ${botVersion}`;

    await conn.sendMessage(m.chat, {
      text: message,
      contextInfo: {
        mentionedJid: conn.parseMention(botName),
        forwardingScore: 1,
        isForwarded: true,
      },
    });
  } catch (err) {
    console.error("Errore nell'handler:", err);
  }
};

function formatTime(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor((ms % 3600000) / 60000);
  let s = Math.floor((ms % 60000) / 1000);
  return `${h}h ${m}m ${s}s`;
}

handler.help = ['ping'];
handler.tags = ['info'];
handler.command = /^(ping|stato|info)$/i;

export default handler;

// Nuovo handler per "ei ossession" con ChatGPT
let talkHandler = async (m, { conn, text }) => {
  if (!text) {
    await conn.sendMessage(m.chat, {
      text: "Ciao! Sono qui per parlare con te. Dimmi pure cosa hai in mente! 😊"
    });
    return;
  }

  try {
    const apiKey = 'TUO_OPENAI_API_KEY';
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: text }],
        max_tokens: 150
      })
    });
    
    const data = await response.json();
    const reply = data.choices[0]?.message?.content || "Non ho capito, puoi ripetere?";

    await conn.sendMessage(m.chat, { text: reply });
  } catch (error) {
    console.error("Errore con ChatGPT:", error);
    await conn.sendMessage(m.chat, { text: "❌ Errore nel generare la risposta." });
  }
};

talkHandler.command = /^(ei ossession)$/i;
export { talkHandler };
