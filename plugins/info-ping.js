import 'os';
import 'util';
import 'human-readable';
import '@whiskeysockets/baileys';
import 'fs';
import fetch from 'node-fetch';
import { performance } from 'perf_hooks';

let handler = async (m, { conn, usedPrefix }) => {
  try {
    const uptimeMs = process.uptime() * 1000;
    const uptimeStr = clockString(uptimeMs);
    const startTime = performance.now();
    const endTime = performance.now();
    const speed = (endTime - startTime).toFixed(4);

    const botName = global.db?.data?.nomedelbot || "꙰ BOT STATUS ꙰";
    const imageResponse = await fetch('https://telegra.ph/file/2f38b3fd9cfba5935b496.jpg');

    if (!imageResponse.ok) {
      throw new Error(`Errore durante la richiesta immagine: ${imageResponse.status}`);
    }

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

    const message = `
ꪶ⏳ꫂ͛ ══ •⊰✰⊱• ══ ꪶ⏳ꫂ͛

*Uptime*: ${uptimeStr}  
 *Attivato il*: ${activationTime}
 *Velocità di risposta*: ${speed} secondi  
ꪶ⏳ꫂ͛ ══ •⊰✰⊱• ══ ꪶ⏳ꫂ͛
   ${botName}
 *Versione*: ${vs}
ꪶ⏳ꫂ͛ ══ •⊰✰⊱• ══ ꪶ⏳ꫂ͛
`.trim();

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

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor((ms % 3600000) / 60000);
  let s = Math.floor((ms % 60000) / 1000);
  return [h, m, s]
    .map(v => v.toString().padStart(2, '0'))
    .join(':');
}

handler.help = ['ping'];
handler.tags = ['info'];
handler.command = /^(ping|stato|info)$/i;

export default handler;