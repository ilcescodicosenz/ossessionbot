import 'os';
import 'util';
import 'human-readable';
import '@whiskeysockets/baileys';
import 'fs';
import 'perf_hooks';

let cooldown = new Map();

let handler = async (_0x316f52, { conn: _0x4a2566, usedPrefix: _0x238280 }) => {
  let sender = _0x316f52.sender;
  let now = Date.now();
  let cooldownTime = 5000; // Tempo di attesa di 5 secondi

  if (cooldown.has(sender)) {
    let lastUsed = cooldown.get(sender);
    let timePassed = now - lastUsed;

    if (timePassed < cooldownTime) {
      let timeLeft = (cooldownTime - timePassed) / 1000;
      return _0x4a2566.sendMessage(_0x316f52.chat, { text: `⏳ Attendi ${timeLeft.toFixed(1)} secondi prima di usare di nuovo il comando.` }, { quoted: _0x316f52 });
    }
  }

  cooldown.set(sender, now);

  let _0x12abbd = {
    'key': {
      'participants': "0@s.whatsapp.net",
      'fromMe': false,
      'id': 'Halo'
    },
    'message': {
      'locationMessage': {
        'name': "𝑴𝑬𝑵𝑼 𝑮𝑹𝑼𝑷𝑷𝑶",
        'jpegThumbnail': await (await fetch("https://qu.ax/cSqEs.jpg")).buffer(),
        'vcard': `
          BEGIN:VCARD
          VERSION:3.0
          N:;Unlimited;;;
          FN:Unlimited
          ORG:Unlimited
          TITLE:
          item1.TEL;waid=19709001746:+1 (970) 900-1746
          item1.X-ABLabel:Unlimited
          X-WA-BIZ-DESCRIPTION:ofc
          X-WA-BIZ-NAME:Unlimited
          END:VCARD
        `.trim()
      }
    },
    'participant': "0@s.whatsapp.net"
  };

  let _0x52ca99 = `
════════╗
║ ✨ *𝐆𝐫𝐮𝐩𝐩𝐨 𝐌𝐞𝐧𝐮* ✨
╚══════════════════════════════════════╝

彡 . 𝐚𝐛𝐛𝐫𝐚𝐜𝐜𝐢𝐚 @  
彡 . 𝐥𝐞𝐜𝐜𝐨/𝐚 @  
彡 . 𝐦𝐨𝐫𝐝𝐢 @  
彡 . 𝐚𝐥𝐜𝐨𝐥𝐢𝐳𝐳𝐚𝐭𝐨 @  
彡 . 𝐫𝐢𝐬𝐜𝐫𝐢𝐯𝐢 (𝐦𝐞𝐬𝐬𝐚𝐠𝐠𝐢𝐨)  
彡 . 𝐦𝐞𝐭𝐞𝐨 ( 𝐜𝐢𝐭𝐭𝐚' )  
彡 . 𝐡𝐝( 𝐟𝐨𝐭𝐨 )  
彡 . 𝐥𝐞𝐠𝐠𝐢( 𝐟𝐨𝐭𝐨 )  
彡 . 𝐫𝐢𝐦𝐮𝐨𝐯𝐢𝐬𝐟𝐨𝐧𝐝𝐨 ( 𝐟𝐨𝐭𝐨 )  
彡 . 𝐬𝐞𝐠𝐚( 𝐧𝐨𝐦𝐞 )  
彡 . 𝐝𝐢𝐭𝐚𝐥𝐢𝐧𝐨 ( 𝐧𝐨𝐦𝐞 )  
彡 . 𝐢𝐧𝐬𝐮𝐥𝐭𝐚 ( 𝐧𝐨𝐦𝐞 )  
彡 . 𝐪𝐫𝐜𝐨𝐝𝐞( 𝐭𝐞𝐬𝐭𝐨 )  
彡 . 𝐫𝐢𝐯𝐞𝐥𝐚 ( 𝐟𝐨𝐭𝐨¹ )  
彡 . 𝐬𝐭𝐲𝐥𝐞𝐭𝐞𝐱𝐭  
彡 . 𝐜𝐚𝐥𝐜( 𝟏+𝟏 )  
彡 . 𝐦𝐬𝐠' @  
彡 . 𝐛𝐞𝐥𝐥𝐨/𝐚 @  
彡 . 𝐠𝐚𝐲 @  
彡 . 𝐩𝐮𝐭𝐭𝐚𝐧𝐚@  
彡 . 𝐥𝐞𝐬𝐛𝐢𝐜𝐚@  
彡 . 𝐢𝐧𝐬𝐮𝐥𝐭𝐚 @  
彡 . 𝐬𝐭𝐮𝐩𝐫𝐚 @  
彡 . 𝐟𝐫𝐨𝐜𝐢𝐨@  
彡 . 𝐨𝐝𝐢𝐨@  
彡 . 𝐚𝐦𝐨𝐫𝐞@  
彡 . 𝐝𝐨𝐱 @  
彡 . 𝐢𝐝(𝐠𝐫𝐮𝐩𝐩𝐨)  
彡 . 𝐡𝐚𝐧𝐝𝐢𝐜𝐚𝐩𝐩𝐚𝐭𝐨 @  
彡 . 𝐬𝐞𝐭𝐢𝐠  
彡 . 𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐢𝐠  
彡 . 𝐭𝐫𝐢𝐬  
彡 . 𝐜𝐫𝐮𝐬𝐡 @  
彡 . 𝐭𝐨𝐩𝐠𝐚𝐲𝐬  
彡 . 𝐭𝐨𝐩𝐧𝐚𝐳𝐢  
彡 . 𝐭𝐭𝐩  
彡 . 𝐝𝐚𝐝𝐨  
彡 . 𝐬𝐭𝐢𝐜𝐤𝐞𝐫/ 𝐬  
彡 . 𝐭𝐨𝐯𝐢𝐝𝐞𝐨  
彡 . 𝐭𝐨𝐠𝐢𝐟  
彡 . 𝐚𝐮𝐭𝐨𝐚𝐝𝐦𝐢𝐧  
彡 . 𝐤𝐞𝐛𝐚𝐛 @  
彡 . 𝐬𝐚𝐲𝐚𝐧 @  
彡 . 𝐦𝐨𝐫𝐝𝐢 @  
彡 . 𝐦𝐢𝐫𝐚 @  
彡 . 𝐜𝐫𝐞𝐚𝐜𝐨𝐩𝐩𝐢𝐚  
彡 . 𝐚𝐦𝐢𝐜𝐢𝐳𝐢𝐚 @  
彡 . 𝐥𝐢𝐬𝐭𝐚𝐦𝐢𝐜𝐢  
彡 . 𝐫𝐞𝐠𝐨𝐥𝐞  
彡 . 𝐧𝐞𝐫𝐚 @  
彡 . 𝐜𝐥𝐨𝐰𝐧 @  
彡 . 𝐫𝐚𝐧𝐝𝐨𝐦 @  
彡 . 𝐜𝐫𝐢𝐦𝐢𝐧𝐚𝐥𝐞 @  
彡 . 𝐝𝐫𝐨𝐠𝐚𝐭𝐨 @  
彡 . 𝐜𝐨𝐦𝐮𝐧𝐢𝐬𝐭𝐚 @  
彡 . 𝐩𝐫𝐨𝐬𝐭𝐢𝐭𝐮𝐭𝐚 @  
彡 . 𝐩𝐮𝐭𝐭𝐚𝐧𝐢𝐞𝐫𝐞 @  
彡 . 𝐩𝐨𝐫𝐭𝐚𝐟𝐨𝐠𝐥𝐢𝐨  
彡 . 𝐩𝐚𝐠𝐡𝐞𝐭𝐭𝐚  
彡 . 𝐝𝐞𝐩𝐨𝐬𝐢𝐭𝐚  
彡 . 𝐥𝐚𝐝𝐫𝐨  
彡 . 𝐟𝐚𝐦𝐢𝐠𝐥𝐢𝐚  
彡 . 𝐬𝐨𝐫𝐭𝐞  
彡 . 𝐛𝐨𝐭𝐭𝐢𝐠𝐥𝐢𝐚  
彡 . 𝐯𝐞𝐫𝐢𝐭𝐚  
彡 . 𝐨𝐛𝐛𝐥𝐢𝐠𝐨  
彡 . 𝐚𝐝𝐨𝐭𝐭𝐚 @  
彡 . 𝐬𝐮𝐬𝐡𝐢 @  
彡 . 𝐩𝐨𝐤𝐞𝐦𝐨𝐧𝐢𝐧𝐟𝐨  
彡 . 𝐞𝐦𝐨𝐣𝐢𝐦𝐢𝐱  
彡 . 𝐚𝐢  
彡 . 𝐫𝐢𝐜𝐞𝐭𝐭𝐚  
彡 . 𝐰𝐢𝐤𝐢𝐩𝐞𝐝𝐢𝐚  
彡 . 𝐜𝐚𝐥𝐜𝐢𝐨
彡 .𝐬𝐲𝐬𝐭𝐞𝐦
彡 .𝐢𝐧𝐯𝐢𝐭𝐚 
════════════════════
⟆ 𝑶𝑺𝑺𝑬𝑺𝑺𝑰𝑶𝑵𝑩𝑶𝑻 ⟇ ✦`.trim();

  let _0x18f634 = global.db.data.nomedelbot || "⟆ 𝑶𝑺𝑺𝑬𝑺𝑺𝑰𝑶𝑵𝑩𝑶𝑻 ⟇ ✦ ";

  _0x4a2566.sendMessage(_0x316f52.chat, {
    'text': _0x52ca99,
    'contextInfo': {
      'mentionedJid': _0x4a2566.parseMention(wm),
      'forwardingScore': 1,
      'isForwarded': true,
      'forwardedNewsletterMessageInfo': {
        'newsletterJid': "0029Vb2xynG9MF8tPyNWoE350@newsletter",
        'serverMessageId': '',
        'newsletterName': '' + _0x18f634
      }
    }
  }, { 'quoted': _0x12abbd });
};

handler.help = ["menu"];
handler.tags = ['menu'];
handler.command = /^(menugruppo|gruppo)$/i;
export default handler;

function clockString(_0x5376bb) {
  let _0x14ce08 = Math.floor(_0x5376bb / 3600000);
  let _0x11e6bc = Math.floor(_0x5376bb / 60000) % 60;
  let _0xaff805 = Math.floor(_0x5376bb / 1000) % 60;

  console.log({
    'ms': _0x5376bb,
    'h': _0x14ce08,
    'm': _0x11e6bc,
    's': _0xaff805
  });

  return [_0x14ce08, _0x11e6bc, _0xaff805]
    .map(_0x421c43 => _0x421c43.toString().padStart(2, 0))
    .join(':');
}
