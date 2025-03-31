import 'os';
import 'util';
import 'human-readable';
import '@whiskeysockets/baileys';
import 'fs';
import 'perf_hooks';

let handler = async (_0x4955de, { conn: _0x4b9a49, usedPrefix: _0xeb2cc9 }) => {
  let _0x414c2d = {
    'key': {
      'participants': "0@s.whatsapp.net",
      'fromMe': false,
      'id': 'Halo'
    },
    'message': {
      'locationMessage': {
        'name': "𝐌𝐞𝐧𝐮 𝐀𝐝𝐦𝐢𝐧",
        'jpegThumbnail': fs.readFileSync('./icone/admin.png'), // Immagine dalla cartella Icone
        'vcard': "BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD"
      }
    },
    'participant': "0@s.whatsapp.net"
  };

  let _0x259d4e = `
╔══════════════════════════╗  
║  🚀  𝐌 𝐄 𝐍 𝐔   𝐀 𝐃 𝐌 𝐈 𝐍  🚀  ║  
╚══════════════════════════╝  

           𝗖𝗢𝗠𝗔𝗡𝗗𝗜 𝗔𝗗𝗠𝗜𝗡  
╭━━━━━━━━━━━━━━━━━━━╮  
┃ ⚡ ${_0xeb2cc9}𝗣𝗥𝗢𝗠𝗨𝗢𝗩𝗜 / 𝗣  
┃ ⚡ ${_0xeb2cc9}𝗥𝗘𝗧𝗥𝗢𝗖𝗘𝗗𝗜 / 𝗥  
┃ ⚡ ${_0xeb2cc9}𝗪𝗔𝗥𝗡 / 𝗨𝗡𝗪𝗔𝗥𝗡  
┃ ⚡ ${_0xeb2cc9}𝗠𝗨𝗧𝗔 / 𝗦𝗠𝗨𝗧𝗔  
┃ ⚡ ${_0xeb2cc9}𝗠𝗨𝗧𝗘𝗟𝗜𝗦𝗧  
┃ ⚡ ${_0xeb2cc9}𝗛𝗜𝗗𝗘𝗧𝗔𝗚  
┃ ⚡ ${_0xeb2cc9}𝗧𝗔𝗚𝗔𝗟𝗟  
┃ ⚡ ${_0xeb2cc9}𝗔𝗣𝗘𝗥𝗧𝗢 / 𝗖𝗛𝗜𝗨𝗦𝗢  
┃ ⚡ ${_0xeb2cc9}𝗦𝗘𝗧𝗪𝗘𝗟𝗖𝗢𝗠𝗘  
┃ ⚡ ${_0xeb2cc9}𝗦𝗘𝗧𝗕𝗬𝗘  
┃ ⚡ ${_0xeb2cc9}𝗜𝗡𝗔𝗧𝗧𝗜𝗩𝗜  
┃ ⚡ ${_0xeb2cc9}𝗟𝗜𝗦𝗧𝗔𝗡𝗨𝗠 + 𝗣𝗥𝗘𝗙𝗜𝗦𝗦𝗢  
┃ ⚡ ${_0xeb2cc9}𝗣𝗨𝗟𝗜𝗭𝗜𝗔 + 𝗣𝗥𝗘𝗙𝗜𝗦𝗦𝗢  
┃ ⚡ ${_0xeb2cc9}𝗥𝗜𝗠𝗢𝗭𝗜𝗢𝗡𝗘 𝗜𝗡𝗔𝗧𝗧𝗜𝗩𝗜  
┃ ⚡ ${_0xeb2cc9}𝗦𝗜𝗠  
┃ ⚡ ${_0xeb2cc9}𝗔𝗗𝗠𝗜𝗡𝗦  
┃ ⚡ ${_0xeb2cc9}𝗙𝗥𝗘𝗘𝗭𝗘 @  
┃ ⚡ ${_0xeb2cc9}𝗜𝗦𝗣𝗘𝗭𝗜𝗢𝗡𝗔 (𝗟𝗜𝗡𝗞)  
┃ ⚡ ${_0xeb2cc9}𝗧𝗢𝗣 (10,50,100)  
┃ ⚡ ${_0xeb2cc9}𝗧𝗢𝗣𝗦𝗘𝗫𝗬  
┃ ⚡ ${_0xeb2cc9}𝗣𝗜𝗖 @  
┃ ⚡ ${_0xeb2cc9}𝗣𝗜𝗖𝗚𝗥𝗨𝗣𝗣𝗢  
┃ ⚡ ${_0xeb2cc9}𝗡𝗢𝗠𝗘 <𝗧𝗘𝗦𝗧𝗢>  
┃ ⚡ ${_0xeb2cc9}𝗕𝗜𝗢 <𝗧𝗘𝗦𝗧𝗢>  
┃ ⚡ ${_0xeb2cc9}𝗟𝗜𝗡𝗞𝗤𝗥  
╰━━━━━━━━━━━━━━━━━━━╯  

🔥 *꙰ 𝟥𝟥𝟥 ꙰ 𝔹𝕆𝕋 ꙰* 🔥
`.trim();

  let _0xf5c7c0 = global.db.data.nomedelbot || " ꙰ 𝟥𝟥𝟥 ꙰ 𝔹𝕆𝕋 ꙰ ";

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
handler.command = /^(menuadm|admin)$/i;
export default handler;

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
