import os from 'os'
import util from 'util'
import sizeFormatter from 'human-readable'
import MessageType from '@whiskeysockets/baileys'
import fs from 'fs'
import { performance } from 'perf_hooks'

let handler = async (m, { conn, text, usedPrefix }) => {
  if (!text || !text.includes('@')) {
    m.reply('⚠️ 𝐅𝐨𝐫𝐦𝐚𝐭𝐨 𝐝𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐧𝐨𝐧 𝐯𝐚𝐥𝐢𝐝𝐨! 𝐔𝐭𝐢𝐥𝐢𝐳𝐳𝐨 𝐜𝐨𝐫𝐫𝐞𝐭𝐭𝐨: tempadmin <durata> @user *(durata in m/h)*');
    return;
  }

  let durationText = "⛔ 𝐃𝐮𝐫𝐚𝐭𝐚 𝐧𝐨𝐧 𝐯𝐚𝐥𝐢𝐝𝐚, 𝐬𝐩𝐞𝐜𝐢𝐟𝐢𝐜𝐚 𝐮𝐧 𝐭𝐞𝐦𝐩𝐨 𝐭𝐫𝐚 *1𝐦* 𝐞 *24𝐡*";
  let duration = 0;
  let menzione = m.mentionedJid[0] || "";

  if (!menzione) {
    m.reply('⚠️ 𝐍𝐨𝐧 𝐡𝐚𝐢 𝐦𝐞𝐧𝐳𝐢𝐨𝐧𝐚𝐭𝐨 𝐮𝐧 𝐮𝐭𝐞𝐧𝐭𝐞 𝐝𝐚 𝐩𝐫𝐨𝐦𝐮𝐨𝐯𝐞𝐫𝐞 𝐚𝐝 𝐚𝐝𝐦𝐢𝐧');
    return;
  }

  let timeInput = text.split(' ')[0].toLowerCase();
  if (timeInput.endsWith('m')) {
    duration = parseInt(timeInput) * 60 * 1000; // Minuti
    let minuteText = parseInt(timeInput) === 1 ? 'minuto' : 'minuti';
    durationText = `✅ *@${menzione.split`@`[0]}* è stato promosso a **admin** per *${parseInt(timeInput)}* ${minuteText}. 🏆`;
  } else if (timeInput.endsWith('h')) {
    duration = parseInt(timeInput) * 60 * 60 * 1000; // Ore
    let hourText = parseInt(timeInput) === 1 ? 'ora' : 'ore';
    durationText = `✅ *@${menzione.split`@`[0]}* è stato promosso a **admin** per *${parseInt(timeInput)}* ${hourText}. 🔥`;
  }

  if (duration >= 60000 && duration <= 86400000) {
    try {
      await conn.groupParticipantsUpdate(m.chat, [menzione], "promote");
      m.reply(durationText);

      setTimeout(async () => {
        await conn.groupParticipantsUpdate(m.chat, [menzione], "demote");
        m.reply(`⚠️ Il tempo da admin di *@${menzione.split`@`[0]}* è terminato. È stato retrocesso. 😬`);
      }, duration);
    } catch (e) {
      m.reply("❌ Errore durante l'assegnazione/rimozione del ruolo di admin.");
      console.error(e);
    }
  } else {
    m.reply(durationText);
  }
};

handler.command = /^tempadmin$/i;
handler.admin = true;
export default handler;
