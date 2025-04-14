import 'os'; import 'util'; import 'human-readable'; import '@whiskeysockets/baileys'; import 'fs'; import 'perf_hooks';

let handler = async (m, { conn, usedPrefix }) => { const ownerNumber = "393755853799";

const contactCard = { key: { participants: "0@s.whatsapp.net", fromMe: false, id: 'Halo' }, message: { locationMessage: { name: "Supporto bot", jpegThumbnail: await (await fetch("https://qu.ax/cSqEs.jpg")).buffer(), vcard: BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=${ownerNumber}:+${ownerNumber}\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD } }, participant: "0@s.whatsapp.net" };

const supportText = ` ════════════════════ 👑 Supporto Bot 👑

➤ Hai problemi con il bot? Ecco cosa puoi fare:

1. Guarda il tutorial sul canale: clicca il pulsante qui sotto.


2. Scrivi al numero: +${ownerNumber}


3. Unisciti al gruppo supporto: https://chat.whatsapp.com/BWEz1ymSkoaLFu8FtZ0Q3h



📅 Data: ${new Date().toLocaleDateString()} 🕒 Ora: ${new Date().toLocaleTimeString()}

⟆ 𝑶𝑺𝑺𝑬𝑺𝑺𝑰𝑶𝑵𝑩𝑶𝑻 ⟇ ✦ ════════════════════`.trim();

const botName = global.db.data?.nomedelbot || "⟆ 𝑶𝑺𝑺𝑬𝑺𝑺𝑰𝑶𝑵𝑩𝑶𝑻 ⟇ ✦";

const buttons = [ { buttonId: 'canale_tutorial', buttonText: { displayText: '📺 Mostra Canale' }, type: 1 }, { buttonId: 'scrivi_owner', buttonText: { displayText: '✉️ Scrivi all'Owner' }, type: 1 }, { buttonId: 'gruppo_supporto', buttonText: { displayText: '👥 Gruppo Supporto' }, type: 1 } ];

const buttonMessage = { text: supportText, footer: botName, buttons, contextInfo: { mentionedJid: [ownerNumber + "@s.whatsapp.net"], forwardingScore: 1, isForwarded: true } };

await conn.sendMessage(m.chat, buttonMessage, { quoted: contactCard }); };

handler.help = ["supporto"]; handler.tags = ["info"]; handler.command = /^(supporto)$/i; export default handler;

function clockString(ms) { let h = Math.floor(ms / 3600000); let m = Math.floor(ms / 60000) % 60; let s = Math.floor(ms / 1000) % 60; return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':'); }

