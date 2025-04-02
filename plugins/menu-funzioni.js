import 'os';
import 'util';
import 'human-readable';
import '@whiskeysockets/baileys';
import 'fs';
import 'perf_hooks';

let handler = async (message, { conn, usedPrefix }) => {
  const chatSettings = global.db.data.chats[message.chat];

  const {
    antiToxic,
    antilinkhard,
    antiPrivate,
    anticanale,
    antitraba,
    antiArab,
    antiviewonce,
    isBanned,
    welcome,
    detect,
    sWelcome,
    sBye,
    sPromote,
    sDemote,
    antiLink,
    antilinkbase,
    antitiktok,
    sologruppo,
    soloprivato,
    antiCall,
    modohorny,
    gpt,
    antiinsta,
    antielimina,
    antitelegram,
    antiSpam,
    antiPorno,
    jadibot,
    autosticker,
    modoadmin,
    audios
  } = chatSettings;

  const statusEmoji = flag => flag ? '🟢' : '🔴';

  let userId = message.quoted 
    ? message.quoted.sender 
    : (message.mentionedJid && message.mentionedJid[0] 
        ? message.mentionedJid[0] 
        : (message.fromMe ? conn.user.jid : message.sender));

  const profilePicUrl = (await conn.profilePictureUrl(userId, "image").catch(() => null))
    || "./src/avatar_contact.png";

  let profilePicBuffer;
  if (profilePicUrl !== "./src/avatar_contact.png") {
    profilePicBuffer = await (await fetch(profilePicUrl)).buffer();
  } else {
    profilePicBuffer = await (await fetch("https://qu.ax/cSqEs.jpg")).buffer();
  }

  let quotedMessageContext = {
    key: {
      participants: "0@s.whatsapp.net",
      fromMe: false,
      id: "Halo"
    },
    message: {
      locationMessage: {
        name: "𝐌𝐞𝐧𝐮 𝐝𝐞𝐥𝐥𝐞 𝐟𝐮𝐧𝐳𝐢𝐨𝐧𝐚𝐥𝐢𝐭𝐚'",
        jpegThumbnail: await (await fetch("https://qu.ax/cSqEs.jpg")).buffer()
      }
    },
    participant: "0@s.whatsapp.net"
  };

  const functionsList = [
    { flag: detect,      command: `${usedPrefix}detect`,      label: "𝐝𝐞𝐭𝐞𝐜𝐭" },
    { flag: gpt,         command: `${usedPrefix}gpt`,         label: "𝐠𝐩𝐭" },
    { flag: jadibot,     command: `${usedPrefix}jadibot`,     label: "𝐣𝐚𝐝𝐢𝐛𝐨𝐭" },
    { flag: welcome,     command: `${usedPrefix}benvenuto`,   label: "𝐛𝐞𝐧𝐯𝐞𝐧𝐮𝐭𝐨" },
    { flag: sologruppo,  command: `${usedPrefix}sologruppo`,  label: "𝐬𝐨𝐥𝐨𝐠𝐫𝐮𝐩𝐩𝐨" },
    { flag: soloprivato, command: `${usedPrefix}soloprivato`, label: "𝐬𝐨𝐥𝐨𝐩𝐫𝐢𝐯𝐚𝐭𝐨" },
    { flag: modoadmin,   command: `${usedPrefix}modoadmin`,   label: "𝐦𝐨𝐝𝐨𝐚𝐝𝐦𝐢𝐧" },
    { flag: isBanned,    command: `${usedPrefix}bangp`,       label: "𝐛𝐚𝐧𝐠𝐩" },
    { flag: antiPorno,   command: `${usedPrefix}antiporno`,   label: "𝐚𝐧𝐭𝐢𝐩𝐨𝐫𝐧𝐨" },
    { flag: antiCall,    command: `${usedPrefix}anticall`,    label: "𝐚𝐧𝐭𝐢𝐜𝐚𝐥𝐥" },
    { flag: antitraba,   command: `${usedPrefix}antitrava`,   label: "𝐚𝐧𝐭𝐢𝐭𝐫𝐚𝐯𝐚" },
    { flag: antiArab,    command: `${usedPrefix}antipaki`,    label: "𝐚𝐧𝐭𝐢𝐩𝐚𝐤𝐢" },
    { flag: antiLink,    command: `${usedPrefix}antilink`,    label: "𝐚𝐧𝐭𝐢𝐥𝐢𝐧𝐤" },
    { flag: antiinsta,   command: `${usedPrefix}antiinsta`,   label: "𝐚𝐧𝐭𝐢𝐢𝐧𝐬𝐭𝐚" },
    { flag: antitiktok,  command: `${usedPrefix}antitiktok`,  label: "𝐚𝐧𝐭𝐢𝐭𝐢𝐤𝐭𝐨𝐤" },
    { flag: antielimina, command: `${usedPrefix}antielimina`, label: "𝐚𝐧𝐭𝐢𝐞𝐥𝐢𝐦𝐢𝐧𝐚" }
  ];

  let menuText = "\n──────────────\n";
  functionsList.forEach(func => {
    menuText += ` ${statusEmoji(func.flag)} » ${func.command}\n`;
  });
  menuText += "────────────\n";
  menuText += "> ⓘ 𝐈𝐧𝐟𝐨 𝐬𝐮𝐥𝐥𝐞 𝐟𝐮𝐧𝐳𝐢𝐨𝐧𝐢\n";
  menuText += "> 🟢 » 𝐅𝐮𝐧𝐳𝐢𝐨𝐧𝐞 𝐚𝐭𝐭𝐢𝐯𝐚𝐭𝐚 \n";
  menuText += "> 🔴 » 𝐅𝐮𝐧𝐳𝐢𝐨𝐧𝐞 𝐝𝐢𝐬𝐚𝐛𝐢𝐥𝐢𝐭𝐚𝐭𝐚 \n";
  menuText += " ⟆ 𝑶𝑺𝑺𝑬𝑺𝑺𝑰𝑶𝑵𝑩𝑶𝑻 ⟇ ✦\n────────────\n";
  menuText += "> ⓘ 𝐔𝐬𝐨 𝐝𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨\n";
  menuText += `> ${usedPrefix}attiva antilink\n`;
  menuText += `> ${usedPrefix}disabilita antilink\n`;
  menuText += "> ⓘ 𝐈𝐧𝐟𝐨 𝐬𝐮𝐥𝐥𝐨 𝐬𝐭𝐚𝐭𝐨\n";
  menuText += `> ${usedPrefix}infostato\n`;
  menuText += "──────────────";

  let botName = global.db.data.nomedelbot || " ⟆ 𝑶𝑺𝑺𝑬𝑺𝑺𝑰𝑶𝑵𝑩𝑶𝑻 ⟇ ✦ ";

  conn.sendMessage(message.chat, {
    text: menuText,
    contextInfo: {
      mentionedJid: conn.parseMention(botName),
      forwardingScore: 1,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363387378860419@newsletter",
        serverMessageId: '',
        newsletterName: botName
      }
    }
  }, { quoted: quotedMessageContext });
};

handler.help = ["menu"];
handler.tags = ["menu"];
handler.command = /^(funzioni)$/i;
export default handler;

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  console.log({ ms, h, m, s });
  return [h, m, s].map(unit => unit.toString().padStart(2, '0')).join(':');
}
