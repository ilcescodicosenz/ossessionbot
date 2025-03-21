import 'os';
import 'util';
import 'human-readable';
import '@whiskeysockets/baileys';
import 'fs';
import 'perf_hooks';

let handler = async (_0x1ece27, { conn: _0x4d8805, usedPrefix: _0x2b0a49 }) => {
  
  let _0x2d215f = {
    'key': {
      'participants': "0@s.whatsapp.net",
      'fromMe': false,
      'id': 'Halo'
    },
    'message': {
      'locationMessage': {
        'name': "𝐌𝐞𝐧𝐮 𝐎𝐰𝐧𝐞𝐫",
        'jpegThumbnail': await (await fetch("https://qu.ax/cSqEs.jpg")).buffer(),
        'vcard': `BEGIN:VCARD
VERSION:3.0
N:;Unlimited;;;
FN:Unlimited
ORG:Unlimited
TITLE:
item1.TEL;waid=19709001746:+1 (970) 900-1746
item1.X-ABLabel:Unlimited
X-WA-BIZ-DESCRIPTION:ofc
X-WA-BIZ-NAME:Unlimited
END:VCARD`
      }
    },
    'participant': "0@s.whatsapp.net"
  };

  // Menu owner (miglior owner = Youns 😜)
  let _0x3f08c2 = `
────────────────
> *𝐏𝐚𝐧𝐞𝐥𝐥𝐨 𝐝𝐢 𝐜𝐨𝐧𝐭𝐫𝐨𝐥𝐥𝐨 𝐎𝐰𝐧𝐞𝐫*
────────────────
⤷ *Comandi disponibili:*

> ${_0x2b0a49}𝐢𝐦𝐩𝐨𝐬𝐭𝐚𝐧𝐨𝐦𝐞
> ${_0x2b0a49}𝐫𝐞𝐬𝐞𝐭𝐭𝐚𝐧𝐨𝐦𝐞
> ${_0x2b0a49}𝐠𝐞𝐬𝐭𝐢𝐬𝐜𝐢 @
> ${_0x2b0a49}𝐬𝐞𝐭𝐠𝐫𝐮𝐩𝐩𝐢
> ${_0x2b0a49}𝐚𝐠𝐠𝐢𝐮𝐧𝐠𝐢𝐠𝐫𝐮𝐩𝐩𝐢 @
> ${_0x2b0a49}𝐫𝐞𝐬𝐞𝐭𝐠𝐫𝐮𝐩𝐩𝐢 @
> ${_0x2b0a49}𝐬𝐞𝐭𝐩𝐩 (𝐢𝐦𝐦𝐚𝐠𝐢𝐧𝐞)
> ${_0x2b0a49}𝐛𝐚𝐧𝐮𝐬𝐞𝐫 @
> ${_0x2b0a49}𝐮𝐧𝐛𝐚𝐧𝐮𝐬𝐞𝐫 @
> ${_0x2b0a49}𝐛𝐥𝐨𝐜𝐤𝐮𝐬𝐞𝐫 @
> ${_0x2b0a49}𝐮𝐧𝐛𝐥𝐨𝐜𝐤𝐮𝐬𝐞𝐫 @
> ${_0x2b0a49}𝐩𝐮𝐥𝐢𝐳𝐢𝐚 (+)
> ${_0x2b0a49}𝐨𝐮𝐭
> ${_0x2b0a49}𝐩𝐫𝐞𝐟𝐢𝐬𝐬𝐨 (?)
> ${_0x2b0a49}𝐫𝐞𝐬𝐞𝐭𝐭𝐚𝐩𝐫𝐞𝐟𝐢𝐬𝐬𝐨
> ${_0x2b0a49}𝐠𝐨𝐝𝐦𝐨𝐝𝐞 {𝐚𝐮𝐭𝐨𝐚𝐝𝐦𝐢𝐧}
> ${_0x2b0a49}𝐚𝐳𝐳𝐞𝐫𝐚 @
> ${_0x2b0a49}𝐚𝐠𝐠𝐢𝐮𝐧𝐠𝐢 (𝐧𝐮𝐦. 𝐦𝐞𝐬𝐬𝐚𝐠𝐠𝐢) @
> ${_0x2b0a49}𝐫𝐢𝐦𝐮𝐨𝐯𝐢 (𝐧𝐮𝐦. 𝐦𝐞𝐬𝐬𝐚𝐠𝐠𝐢) @
> ${_0x2b0a49}𝐧𝐮𝐤𝐞
> ${_0x2b0a49}𝐚𝐝𝐝𝐨𝐰𝐧𝐞𝐫 @
> ${_0x2b0a49}𝐝𝐞𝐥𝐨𝐰𝐧𝐞𝐫 @
> ${_0x2b0a49}𝐝𝐨𝐰𝐧𝐚𝐥𝐥
> ${_0x2b0a49}𝐮𝐩𝐚𝐥𝐥
> ${_0x2b0a49}𝐛𝐥𝐨𝐜𝐤𝐥𝐢𝐬𝐭
> ${_0x2b0a49}𝐛𝐚𝐧𝐥𝐢𝐬𝐭
> ${_0x2b0a49}𝐛𝐢𝐠𝐭𝐚𝐠
> ${_0x2b0a49}𝐥𝐨𝐜𝐤
> ${_0x2b0a49}𝐬𝐚𝐟𝐞
> ${_0x2b0a49}𝐬𝐩𝐨𝐧𝐬𝐨𝐫
> ${_0x2b0a49}𝐠𝐞𝐭𝐩𝐥𝐮𝐠𝐢𝐧
> ${_0x2b0a49}𝐠𝐞𝐭𝐟𝐢𝐥𝐞
> ${_0x2b0a49}𝐬𝐚𝐯𝐞𝐩𝐥𝐮𝐠𝐢𝐧 
> ${_0x2b0a49}𝐝𝐞𝐥𝐞𝐭𝐞𝐩𝐥𝐮𝐠𝐢𝐧
> ${_0x2b0a49}𝐛𝐚𝐧𝐠𝐡𝐨𝐬𝐭
> ${_0x2b0a49}𝐨𝐟𝐟𝐮𝐬𝐜𝐚 <𝐭𝐞𝐬𝐭𝐨>
────────────────
 ꙰ 𝟥𝟥𝟥 ꙰ 𝔹𝕆𝕋 ꙰ 
`;

  let _0x575cba = global.db.data.nomedelbot || " ꙰ 𝟥𝟥𝟥 ꙰ 𝔹𝕆𝕋 ꙰ ";
  
  await _0x4d8805.sendMessage(_0x1ece27.chat, {
    text: _0x3f08c2,
    contextInfo: {
      mentionedJid: _0x4d8805.parseMention(wm),
      forwardingScore: 1,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363341274693350@newsletter",
        serverMessageId: '',
        newsletterName: _0x575cba
      }
    }
  }, {
    quoted: _0x2d215f
  });
};

handler.help = ["menu"];
handler.tags = ['menu'];
handler.command = /^(owner|menuowner|pannello)$/i;

export default handler;

// Formattazione del tempo (il tempo non esiste per Youns perche lui è immortale)
function clockString(_0xd0d91e) {
  let _0x27c45a = Math.floor(_0xd0d91e / 3600000);
  let _0x42617d = Math.floor(_0xd0d91e / 60000) % 60;
  let _0x1bf8dc = Math.floor(_0xd0d91e / 1000) % 60;
  return [_0x27c45a, _0x42617d, _0x1bf8dc].map(_0x2d1849 => _0x2d1849.toString().padStart(2, '0')).join(':');
}