import fs from 'fs';
import { buttonsMessage } from '@adiwajshing/baileys';
import path from 'path';

const toMathematicalAlphanumericSymbols = text => {
  const map = {
    'A': '𝑨', 'B': '𝑩', 'C': '𝑪', 'D': '𝑫', 'E': '𝑬', 'F': '𝑭', 'G': '𝑮', 'H': '𝑯', 'I': '𝑰', 'J': '𝑱',
    'K': '𝑲', 'L': '𝑳', 'M': '𝑴', 'N': '𝑵', 'O': '𝑶', 'P': '𝑷', 'Q': '𝑸', 'R': '𝑹', 'S': '𝑺', 'T': '𝑻',
    'U': '𝑼', 'V': '𝑽', 'W': '𝑾', 'X': '𝑿', 'Y': '𝒀', 'Z': '𝒁'
  };
  return text.split('').map(char => map[char] || char).join('');
};

const groupCooldown = new Map(); // Cooldown globale per chat
const cooldownTime = 10 * 1000;

const randomMessages = [
  "Ciao! Hai menzionato l'owner, ecco i suoi contatti:",
  "Ehi! Qualcuno ha chiamato l'owner? Ecco le info:",
  "Salve! Hai taggato l'admin, qui trovi i link utili:",
  "Oh, hai bisogno dell'owner? Ecco qui:",
  "Notifica ricevuta! Ecco i dettagli dell'owner:",
];

const allowedGroupId = ''; // Es: '1234567890-123456789@g.us'

let handler = m => m;

handler.all = async function (m) {
  if (!m.text) return;

  const isGroup = m.chat.endsWith('@g.us');
  if (allowedGroupId && isGroup && m.chat !== allowedGroupId) return;

  const ownerRegex = /@393755853799/i;
  if (!ownerRegex.test(m.text)) return;

  if (m.sender === global.conn.user.jid) return;

  // Cooldown globale per tutta la chat
  if (groupCooldown.has(m.chat)) {
    const timeLeft = (groupCooldown.get(m.chat) - Date.now()) / 1000;
    if (timeLeft > 0) {
      return global.conn.sendMessage(
        m.chat,
        { text: `⏳ Attendi ancora *${timeLeft.toFixed(1)} secondi* prima di menzionare di nuovo l'owner.` },
        { quoted: m }
      );
    }
  }

  // Reazione emoji alla menzione
  await global.conn.sendMessage(m.chat, { react: { text: '⚠️', key: m.key } });

  // Log nel file owner_mentions.txt
  fs.appendFileSync('./logs/owner_mentions.txt', `[${new Date().toISOString()}] ${m.sender} - ${m.chat}\n`);

  await global.conn.sendMessage(m.chat, { text: '⏳ Un momento...' }, { quoted: m });

  const imagePath = path.resolve('./icone/instagram.png');
  let image;
  try {
    image = fs.readFileSync(imagePath);
  } catch (err) {
    console.error("Errore nel caricamento dell'immagine:", err);
    return global.conn.sendMessage(
      m.chat,
      { text: "❌ Errore nel caricamento dell'immagine dell'owner." },
      { quoted: m }
    );
  }

  const whatsappGroupLink = "https://chat.whatsapp.com/FTHuRX16IVXDv0WQvDNxqw";
  const randomMessage = pickRandom(randomMessages);
  const name = global.conn.getName ? global.conn.getName(m.sender) : m.sender;

  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Sy;Bot;;;",
    "FN:y",
    `item1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}`,
    "item1.X-ABLabel:Ponsel",
    "END:VCARD"
  ].join("\n");

  const quotedContact = {
    key: { participants: "0@s.whatsapp.net", fromMe: false, id: "Halo" },
    message: {
      locationMessage: {
        name: toMathematicalAlphanumericSymbols("INSTAGRAM OWNER"),
        jpegThumbnail: image,
        vcard: vcard,
      },
    },
    participant: "0@s.whatsapp.net"
  };

  let buttons = [
    { buttonId: 'instagram_owner', buttonText: { displayText: '📸 Instagram' }, type: 1 },
    { buttonId: 'whatsapp_group', buttonText: { displayText: '👥 Gruppo WhatsApp' }, type: 1 },
    { buttonId: 'supporto_command', buttonText: { displayText: '💬 Richiedi Supporto' }, type: 1 },
  ];

  let buttonMessage = {
    text: `👋 Ciao *${name}*! ${randomMessage}\n\n📩 Se hai bisogno di supporto o vuoi richiedere il bot, usa il comando \`.supporto\`.`,
    footer: 'INSTAGRAM OWNER',
    buttons: buttons,
    contextInfo: { quoted: quotedContact }
  };

  try {
    await global.conn.sendMessage(m.chat, buttonMessage, { quoted: m });
  } catch (e) {
    console.error("Errore nell'invio del messaggio con pulsanti:", e);
  }

  // Imposta cooldown globale per la chat
  groupCooldown.set(m.chat, Date.now() + cooldownTime);
};

handler.on('button-response', async (m) => {
  const buttonId = m.buttonId;
  if (buttonId === 'instagram_owner') {
    await global.conn.sendMessage(
      m.chat,
      { text: 'Ecco il link a Instagram: https://instagram.com/f.cesco_' },
      { quoted: m }
    );
  } else if (buttonId === 'whatsapp_group') {
    await global.conn.sendMessage(
      m.chat,
      { text: 'Ecco il link al gruppo WhatsApp: https://chat.whatsapp.com/FTHuRX16IVXDv0WQvDNxqw' },
      { quoted: m }
    );
  } else if (buttonId === 'supporto_command') {
    await global.conn.sendMessage(
      m.chat,
      { text: 'Per richiedere supporto, usa il comando: `.supporto`' },
      { quoted: m }
    );
  }
});

export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}
