import 'os';
import 'util';
import 'human-readable';
import '@whiskeysockets/baileys';
import 'fs';
import 'perf_hooks';

let handler = async (m, { conn, usedPrefix, isOwner, isAdmin }) => { // Aggiungiamo isAdmin
  let pp = './src/admins.jpg'; // Immagine predefinita
  try {
    pp = await conn.profilePictureUrl(m.sender, 'image');
  } catch (e) {
    // Ignora se non trova l'immagine del profilo
  }

  let menuAdmin = `
╔══════════════════════════╗
║  🚀    𝐌 𝐄 𝐍 𝐔     𝐀 𝐃 𝐌 𝐈 𝐍    🚀  ║
╚══════════════════════════╝

        𝗖𝗢𝗠𝗔𝗡𝗗𝗜 𝗔𝗗𝗠𝗜𝗡
╭━━━━━━━━━━━━━━━━━━━╮
┃ ⚡ ${usedPrefix}𝗣𝗥𝗢𝗠𝗨𝗢𝗩𝗜 / 𝗣
┃ ⚡ ${usedPrefix}𝗥𝗘𝗧𝗥𝗢𝗖𝗘𝗗𝗜 / 𝗥
┃ ⚡ ${usedPrefix}𝗪𝗔𝗥𝗡 / 𝗨𝗡𝗪𝗔𝗥𝗡
┃ ⚡ ${usedPrefix}𝗠𝗨𝗧𝗔 / 𝗦𝗠𝗨𝗧𝗔
┃ ⚡ ${usedPrefix}𝗠𝗨𝗧𝗘𝗟𝗜𝗦𝗧
┃ ⚡ ${usedPrefix}𝗛𝗜𝗗𝗘𝗧𝗔𝗚
┃ ⚡ ${usedPrefix}𝗧𝗔𝗚𝗔𝗟𝗟
┃ ⚡ ${usedPrefix}𝗔𝗣𝗘𝗥𝗧𝗢 / 𝗖𝗛𝗜𝗨𝗦𝗢
┃ ⚡ ${usedPrefix}𝗦𝗘𝗧𝗪𝗘𝗟𝗖𝗢𝗠𝗘
┃ ⚡ ${usedPrefix}𝗦𝗘𝗧𝗕𝗬𝗘
┃ ⚡ ${usedPrefix}𝗜𝗡𝗔𝗧𝗧𝗜𝗩𝗜
┃ ⚡ ${usedPrefix}𝗟𝗜𝗦𝗧𝗔𝗡𝗨𝗠 + 𝗣𝗥𝗘𝗙𝗜𝗦𝗦𝗢
┃ ⚡ ${usedPrefix}𝗣𝗨𝗟𝗜𝗭𝗜𝗔 + 𝗣𝗥𝗘𝗙𝗜𝗦𝗦𝗢
┃ ⚡ ${usedPrefix}𝗥𝗜𝗠𝗢𝗭𝗜𝗢𝗡𝗘 𝗜𝗡𝗔𝗧𝗧𝗜𝗩𝗜
┃ ⚡ ${usedPrefix}𝗦𝗜𝗠
┃ ⚡ ${usedPrefix}𝗔𝗗𝗠𝗜𝗡𝗦
┃ ⚡ ${usedPrefix}𝗙𝗥𝗘𝗘𝗭𝗘 @
┃ ⚡ ${usedPrefix}𝗜𝗦𝗣𝗘𝗭𝗜𝗢𝗡𝗔 (𝗟𝗜𝗡𝗞)
┃ ⚡ ${usedPrefix}𝗧𝗢𝗣 (10,50,100)
┃ ⚡ ${usedPrefix}𝗧𝗢𝗣𝗦𝗘𝗫𝗬
┃ ⚡ ${usedPrefix}𝗣𝗜𝗖 @
┃ ⚡ ${usedPrefix}𝗣𝗜𝗖𝗚𝗥𝗨𝗣𝗣𝗢
┃ ⚡ ${usedPrefix}𝗡𝗢𝗠𝗘 <𝗧𝗘𝗦𝗧𝗢>
┃ ⚡ ${usedPrefix}𝗕𝗜𝗢 <𝗧𝗘𝗦𝗧𝗢>
┃ ⚡ ${usedPrefix}𝗟𝗜𝗡𝗞𝗤𝗥
╰━━━━━━━━━━━━━━━━━━━╯

🔥 *⟆ 𝑶𝑺𝑺𝑬𝑺𝑺𝑰𝑶𝑵𝑩𝑶𝑻 ⟇ ✦* 🔥
`.trim();

  let infoBot = global.db.data.nomedelbot || " ⟆ 𝑶𝑺𝑺𝑬𝑺𝑺𝑰𝑶𝑵𝑩𝑶𝑻 ⟇ ✦ ";

  conn.sendMessage(m.chat, {
    image: { url: pp },
    caption: menuAdmin,
    footer: infoBot,
    contextInfo: {
      mentionedJid: conn.parseMention(menuAdmin),
      forwardingScore: 1,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363387378860419@newsletter",
        serverMessageId: '',
        newsletterName: infoBot
      }
    }
  }, { quoted: m });
};

handler.help = ["menu"];
handler.tags = ["menu"];
handler.command = /^(menuadm|admin)$/i;
handler.owner = false; // Cambiamo a false
handler.groupAdmin = true; // Aggiungiamo questa linea

export default handler;

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  console.log({ ms, h, m, s });
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}
