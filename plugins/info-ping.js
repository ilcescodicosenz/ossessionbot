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
    const botVersion = global.db?.data?.versione || "2.0.0";
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

    const message = `🌐 *${⟆ 𝑶𝑺𝑺𝑬𝑺𝑺𝑰𝑶𝑵𝑩𝑶𝑻 ⟇ ✦}* 🌐\n\n` +
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
