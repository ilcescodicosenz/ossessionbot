import 'os';
import 'util';
import 'human-readable';
import '@whiskeysockets/baileys';
import 'fs';
import 'perf_hooks';

let handler = async (_0x4955de, { conn: _0x4b9a49, usedPrefix: _0xeb2cc9 }) => {
  let ownerNumber = "46737807114"; // Numero dell'owner aggiornato

  let _0x414c2d = {
    'key': {
      'participants': "0@s.whatsapp.net",
      'fromMe': false,
      'id': 'Halo'
    },
    'message': {
      'locationMessage': {
        'name': "Supporto bot",
        'jpegThumbnail': await (await fetch("https://qu.ax/cSqEs.jpg")).buffer(),
        'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=${ownerNumber}:+${ownerNumber}\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD`
      }
    },
    'participant': "0@s.whatsapp.net"
  };

  let _0x259d4e = `
════════════════════
👑 *Supporto Bot* 👑

 ➤ 𝐒𝐞 𝐡𝐚𝐢 𝐪𝐮𝐚𝐥𝐜𝐡𝐞 𝐝𝐢𝐟𝐟𝐢𝐜𝐨𝐥𝐭à 𝐚 𝐬𝐜𝐚𝐫𝐢𝐜𝐚𝐫𝐞 𝐢𝐥 𝐛𝐨𝐭, 𝐜𝐥𝐢𝐜𝐜𝐚 𝐢𝐥 𝐩𝐮𝐥𝐬𝐚𝐧𝐭𝐞 𝐪𝐮𝐚 𝐬𝐨𝐭𝐭𝐨 (𝐌𝐨𝐬𝐭𝐫𝐚 𝐜𝐚𝐧𝐚𝐥𝐞) 𝐜𝐡𝐞 𝐭𝐢 𝐩𝐨𝐫𝐭𝐞𝐫à 𝐚𝐥 𝐭𝐮𝐭𝐨𝐫𝐢𝐚𝐥! 𝐒𝐞 𝐧𝐨𝐧 𝐩𝐮𝐨𝐢 𝐞𝐧𝐭𝐫𝐚𝐫𝐞 𝐧𝐞𝐥 𝐜𝐚𝐧𝐚𝐥𝐞, 𝐬𝐜𝐫𝐢𝐯𝐢 𝐚𝐥 𝐧𝐮𝐦𝐞𝐫𝐨:
 
+46 73 780 71 14
𝐋𝐢𝐧𝐤 𝐠𝐫𝐮𝐩𝐩𝐨 𝐬𝐮𝐩𝐩𝐨𝐫𝐭𝐨 𝐝𝐞𝐥 𝐛𝐨𝐭:
https://chat.whatsapp.com/JhrcigFtXpW4OzdhE9Jdq3
 ꙰ 𝟥𝟥𝟥 ꙰ 𝔹𝕆𝕋 ꙰ 
════════════════════
`.trim();

  let _0xf5c7c0 = global.db.data.nomedelbot || " ꙰ 𝟥𝟥𝟥 ꙰ 𝔹𝕆𝕋 ꙰ ";

  // Invia il messaggio con una grafica migliorata
  _0x4b9a49.sendMessage(_0x4955de.chat, {
    'text': _0x259d4e,
    'contextInfo': {
      'mentionedJid': _0x4b9a49.parseMention(wm),
      'forwardingScore': 0x1,
      'isForwarded': true,
      'forwardedNewsletterMessageInfo': {
        'newsletterJid': "120363341274693350@newsletter",
        'serverMessageId': '',
        'newsletterName': ' ꙰ 𝟥𝟥𝟥 ꙰ 𝔹𝕆𝕋 ꙰ ✦'
      }
    }
  }, {
    'quoted': _0x414c2d
  });
};

handler.help = ["menu"];
handler.tags = ["menu"];
handler.command = /^(supporto)$/i;
export default handler;

// Funzione per calcolare il tempo di attività
function clockString(_0x5dad08) {
  let _0x233c78 = Math.floor(_0x5dad08 / 3600000);
  let _0x2b10bc = Math.floor(_0x5dad08 / 60000) % 60;
  let _0x2c7d73 = Math.floor(_0x5dad08 / 1000) % 60;
  console.log({
    'ms': _0x5dad08,
    'h': _0x233c78,
    'm': _0x2b10bc,
    's': _0x2c7d73
  });
  return [_0x233c78, _0x2b10bc, _0x2c7d73].map(_0x4bd0ef => _0x4bd0ef.toString().padStart(2, 0)).join(':');
}