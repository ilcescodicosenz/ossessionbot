import 'os';
import 'util';
import 'human-readable';
import '@whiskeysockets/baileys';
import 'fs';
import 'perf_hooks';

let handler = async (message, { conn, usedPrefix }) => {
  const senderName = await conn.getName(message.sender);
  const targetJid = message.quoted
    ? message.quoted.sender
    : message.mentionedJid && message.mentionedJid[0]
    ? message.mentionedJid[0]
    : message.fromMe
    ? conn.user.jid
    : message.sender;

  // Immagine del profilo di chi usa il comando
  const profilePicUrl = (await conn.profilePictureUrl(targetJid, "image").catch(() => null)) || "./src/avatar_contact.png";
  let profilePicBuffer;
  if (profilePicUrl !== "./src/avatar_contact.png") {
    profilePicBuffer = await (await fetch(profilePicUrl)).buffer();
  } else {
    profilePicBuffer = await (await fetch("https://telegra.ph/file/22b3e3d2a7b9f346e21b3.png")).buffer();
  }

  const botName = global.db.data.nomedelbot || "⟆ 𝑶𝑺𝑺𝑬𝑺𝑺𝑰𝑶𝑵𝑩𝑶𝑻 ⟇ ✦";

  // Ottieni il tempo di attività del bot in un formato carino
  let uptime = format(process.uptime() * 1000);

  // Formattazione speciale dei comandi
  const commandList = `
╭━━━〔 *⚡ 𝑴𝑬𝑵𝑼 𝑫𝑬𝑳 𝑩𝑶𝑻 ⚡* 〕━━━╮
┃
┃ Ciao ${senderName}! 👋 Ecco cosa posso fare:
┃
┃ 🛠 *𝑪𝑶𝑴𝑨𝑵𝑫𝑰 𝑮𝑬𝑵𝑬𝑹𝑨𝑳𝑰* 🛠
┃ ━━━━━━━━━━━
┃ ✨ ${usedPrefix}ciao -  Saluta il bot!
┃ ❓ ${usedPrefix}info -  Scopri di più su di me!
┃ 🖼️ ${usedPrefix}immagine <testo> - Crea un'immagine con quello che scrivi!
┃ 🤣 ${usedPrefix}battuta -  Ti racconto una barzelletta!
┃ 🎶 ${usedPrefix}musica <nome canzone> - Cerca e manda una canzone!
┃
┃ ⚙️ *ALTRI COMANDI* ⚙️
┃ ✦ ${usedPrefix}PROPRIETARIO
┃ ✦ ${usedPrefix}FUNZIONI
┃ ✦ ${usedPrefix}ADMIN
┃ ✦ ${usedPrefix}GRUPPO
┃ ✦ ${usedPrefix}OWNER
┃ ✦ ${usedPrefix}CREDITI
┃ ✦ ${usedPrefix}SUPPORTO
┃ ✦ ${usedPrefix}BOT
┃
╰━━━━━━━━━━━━━━━━━━╯
🚀 *Sono attivo da:* ${uptime}
🌟 *Versione:* ${vs}
`.trim();

  // Invio del menu con immagine e stile migliorato
  await conn.sendMessage(message.chat, {
    text: commandList,
    contextInfo: {
      mentionedJid: conn.parseMention(wm),
      forwardingScore: 1,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363387378860419@newsletter',
        serverMessageId: '',
        newsletterName: botName
      },
      externalAdReply: {
        title: senderName,
        body: `⚙️ Versione Bot: ${vs}`,
        mediaType: 1,
        renderLargerThumbnail: false,
        previewType: "PHOTO",
        thumbnail: profilePicBuffer,
        sourceUrl: 'ok'
      }
    }
  });
};

handler.help = ["menu"];
handler.tags = ['menu'];
handler.command = /^(menu|comandi)$/i;

export default handler;

function clockString(milliseconds) {
  let hours = Math.floor(milliseconds / 3600000);
  let minutes = Math.floor(milliseconds / 60000) % 60;
  let seconds = Math.floor(milliseconds / 1000) % 60;

  console.log({ ms: milliseconds, h: hours, m: minutes, s: seconds });

  return [hours, minutes, seconds].map(timeUnit => timeUnit.toString().padStart(2, '0')).join(':');
}

// Funzione di supporto per formattare il tempo di attività (potrebbe essere necessario installare 'human-readable' se non l'hai già fatto)
function format(seconds) {
  let days = Math.floor(seconds / (24 * 60 * 60));
  seconds %= (24 * 60 * 60);
  let hours = Math.floor(seconds / (60 * 60));
  seconds %= (60 * 60);
  let minutes = Math.floor(seconds / 60);
  seconds %= 60;
  return `${days}g ${hours}h ${minutes}m ${seconds}s`;
}
