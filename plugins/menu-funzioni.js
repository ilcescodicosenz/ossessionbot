import 'os';
import 'util';
import 'human-readable';
import '@whiskeysockets/baileys';
import 'fs';
import 'perf_hooks';
let handler = async (_0x512ed3, {
  conn: _0x542b94,
  usedPrefix: _0x3f73c1
}) => {
  const {
    antiToxic: _0x335a3d,
    antilinkhard: _0x43883e,
    antiPrivate: _0x25448d,
    antitraba: _0x7ca884,
    antiArab: _0x17a77a,
    antiviewonce: _0x49dd3d,
    isBanned: _0xf22dbc,
    welcome: _0x16d809,
    detect: _0x4c3a9f,
    sWelcome: _0x5282a4,
    sBye: _0xc22b07,
    sPromote: _0x3ed8d1,
    sDemote: _0x567cbe,
    antiLink: _0x54e7f7,
    antilinkbase: _0x2045a1,
    antitiktok: _0x1ada34,
    sologruppo: _0x2db392,
    soloprivato: _0x19b996,
    antiCall: _0xe348e8,
    modohorny: _0xc91cf2,
    gpt: _0x203d53,
    antiinsta: _0x2dc78c,
    antielimina: _0x45cbee,
    antitelegram: _0x17aa1e,
    antiSpam: _0x50dc87,
    antiPorno: _0x1fa650,
    jadibot: _0x4d2095,
    autosticker: _0x4843dc,
    modoadmin: _0xe6402c,
    audios: _0x6ec887
  } = global.db.data.chats[_0x512ed3.chat];
  let _0x5bfb0b = _0x512ed3.quoted ? _0x512ed3.quoted.sender : _0x512ed3.mentionedJid && _0x512ed3.mentionedJid[0] ? _0x512ed3.mentionedJid[0] : _0x512ed3.fromMe ? _0x542b94.user.jid : _0x512ed3.sender;
  const _0x197a8a = (await _0x542b94.profilePictureUrl(_0x5bfb0b, "image")["catch"](_0x2cb040 => null)) || "./src/avatar_contact.png";
  let _0x53e6f1;
  if (_0x197a8a !== "./src/avatar_contact.png") {
    _0x53e6f1 = await (await fetch(_0x197a8a)).buffer();
  } else {
    _0x53e6f1 = await (await fetch("https://qu.ax/cSqEs.jpg")).buffer();
  }
  let _0x6bd16e = {
    'key': {
      'participants': "0@s.whatsapp.net",
      'fromMe': false,
      'id': "Halo"
    },
    'message': {
      'locationMessage': {
        'name': "𝐌𝐞𝐧𝐮 𝐝𝐞𝐥𝐥𝐞 𝐟𝐮𝐧𝐳𝐢𝐨𝐧𝐚𝐥𝐢𝐭𝐚'",
        'jpegThumbnail': await (await fetch("https://qu.ax/cSqEs.jpg")).buffer()
      }
    },
    'participant': "0@s.whatsapp.net"
  };
  let _0x2aa101 = ("\n──────────────\n " + (_0x4c3a9f ? '🟢' : '🔴') + " » " + _0x3f73c1 + "𝐝𝐞𝐭𝐞𝐜𝐭\n " + (_0x203d53 ? '🟢' : '🔴') + " » " + _0x3f73c1 + "𝐠𝐩𝐭\n " + (_0x4d2095 ? '🟢' : '🔴') + " » " + _0x3f73c1 + "𝐣𝐚𝐝𝐢𝐛𝐨𝐭\n " + (_0x16d809 ? '🟢' : '🔴') + " » " + _0x3f73c1 + "𝐛𝐞𝐧𝐯𝐞𝐧𝐮𝐭𝐨\n " + (_0x2db392 ? '🟢' : '🔴') + " » " + _0x3f73c1 + "𝐬𝐨𝐥𝐨𝐠𝐫𝐮𝐩𝐩𝐨\n " + (_0x19b996 ? '🟢' : '🔴') + " » " + _0x3f73c1 + "𝐬𝐨𝐥𝐨𝐩𝐫𝐢𝐯𝐚𝐭𝐨\n " + (_0xe6402c ? '🟢' : '🔴') + " » " + _0x3f73c1 + "𝐦𝐨𝐝𝐨𝐚𝐝𝐦𝐢𝐧\n " + (_0xf22dbc ? '🟢' : '🔴') + " » " + _0x3f73c1 + "𝐛𝐚𝐧𝐠𝐩\n " + (_0x1fa650 ? '🟢' : '🔴') + " » " + _0x3f73c1 + "𝐚𝐧𝐭𝐢𝐩𝐨𝐫𝐧𝐨\n " + (_0xe348e8 ? '🟢' : '🔴') + " » " + _0x3f73c1 + "𝐚𝐧𝐭𝐢𝐜𝐚𝐥𝐥\n " + (_0x7ca884 ? '🟢' : '🔴') + " » " + _0x3f73c1 + "𝐚𝐧𝐭𝐢𝐭𝐫𝐚𝐯𝐚\n " + (_0x17a77a ? '🟢' : '🔴') + " » " + _0x3f73c1 + "𝐚𝐧𝐭𝐢𝐩𝐚𝐤𝐢\n " + (_0x54e7f7 ? '🟢' : '🔴') + " » " + _0x3f73c1 + "𝐚𝐧𝐭𝐢𝐥𝐢𝐧𝐤\n " + (_0x2dc78c ? '🟢' : '🔴') + " » " + _0x3f73c1 + "𝐚𝐧𝐭𝐢𝐢𝐧𝐬𝐭𝐚\n " + (_0x1ada34 ? '🟢' : '🔴') + " » " + _0x3f73c1 + "𝐚𝐧𝐭𝐢𝐭𝐢𝐤𝐭𝐨𝐤\n " + (_0x45cbee ? '🟢' : '🔴') + " » " + _0x3f73c1 + "𝐚𝐧𝐭𝐢𝐞𝐥𝐢𝐦𝐢𝐧𝐚\n────────────\n> ⓘ 𝐈𝐧𝐟𝐨 𝐬𝐮𝐥𝐥𝐞 𝐟𝐮𝐧𝐳𝐢𝐨𝐧𝐢\n> 🟢 » 𝐅𝐮𝐧𝐳𝐢𝐨𝐧𝐞 𝐚𝐭𝐭𝐢𝐯𝐚𝐭𝐚 \n> 🔴 » 𝐅𝐮𝐧𝐳𝐢𝐨𝐧𝐞 𝐝𝐢𝐬𝐚𝐛𝐢𝐥𝐢𝐭𝐚𝐭𝐚 \n────────────\n> ⓘ 𝐔𝐬𝐨 𝐝𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨\n> " + _0x3f73c1 + "𝐚𝐭𝐭𝐢𝐯𝐚 𝐚𝐧𝐭𝐢𝐥𝐢𝐧𝐤\n> " + _0x3f73c1 + "𝐝𝐢𝐬𝐚𝐛𝐢𝐥𝐢𝐭𝐚 𝐚𝐧𝐭𝐢𝐥𝐢𝐧𝐤\n> ⓘ 𝐈𝐧𝐟𝐨 𝐬𝐮𝐥𝐥𝐨 𝐬𝐭𝐚𝐭𝐨\n> " + _0x3f73c1 + "𝐢𝐧𝐟𝐨𝐬𝐭𝐚𝐭𝐨\n──────────────").trim();
  let _0x238ca2 = global.db.data.nomedelbot || " ꙰ 𝟥𝟥𝟥 ꙰ 𝔹𝕆𝕋 ꙰ ";
  _0x542b94.sendMessage(_0x512ed3.chat, {
    'text': _0x2aa101,
    'contextInfo': {
      'mentionedJid': _0x542b94.parseMention(wm),
      'forwardingScore': 0x1,
      'isForwarded': true,
      'forwardedNewsletterMessageInfo': {
        'newsletterJid': "120363341274693350@newsletter",
        'serverMessageId': '',
        'newsletterName': ' ꙰ 𝟥𝟥𝟥 ꙰ 𝔹𝕆𝕋 ꙰ '
      }
    }
  }, {
    'quoted': _0x6bd16e
  });
};
handler.help = ["menu"];
handler.tags = ["menu"];
handler.command = /^(funzioni)$/i;
export default handler;
function clockString(_0x5a16ee) {
  let _0x275dc8 = Math.floor(_0x5a16ee / 3600000);
  let _0x440496 = Math.floor(_0x5a16ee / 60000) % 60;
  let _0xc6485c = Math.floor(_0x5a16ee / 1000) % 60;
  console.log({
    'ms': _0x5a16ee,
    'h': _0x275dc8,
    'm': _0x440496,
    's': _0xc6485c
  });
  return [_0x275dc8, _0x440496, _0xc6485c].map(_0xc31c1 => _0xc31c1.toString().padStart(2, 0)).join(':');
}
