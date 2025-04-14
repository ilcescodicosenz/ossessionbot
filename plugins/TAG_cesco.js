import fs from 'fs';
import { buttonsMessage } from '@adiwajshing/baileys'; // Assicurati di aver installato questa dipendenza
import path from 'path';

const toMathematicalAlphanumericSymbols = text => {
  const map = {
    'A': '𝑨', 'B': '𝑩', 'C': '𝑪', 'D': '𝑫', 'E': '𝑬', 'F': '𝑭', 'G': '𝑮', 'H': '𝑯', 'I': '𝑰', 'J': '𝑱',
    'K': '𝑲', 'L': '𝑳', 'M': '𝑴', 'N': '𝑵', 'O': '𝑶', 'P': '𝑷', 'Q': '𝑸', 'R': '𝑹', 'S': '𝑺', 'T': '𝑻',
    'U': '𝑼', 'V': '𝑽', 'W': '𝑾', 'X': '𝑿', 'Y': '𝒀', 'Z': '𝒁'
  };
  return text.split('').map(char => map[char] || char).join('');
};

const cooldown = new Map();
const cooldownTime = 10 * 1000; // 10 secondi

const randomMessages = [
  "Ciao! Hai menzionato l'owner, ecco i suoi contatti:",
  "Ehi! Qualcuno ha chiamato l'owner? Ecco le info:",
  "Salve! Hai taggato l'admin, qui trovi i link utili:",
  "Oh, hai bisogno dell'owner? Ecco qui:",
  "Notifica ricevuta! Ecco i dettagli dell'owner:",
];

// ID del gruppo specifico (lascia vuoto se non vuoi limitare a uno specifico gruppo)
const allowedGroupId = ''; // Es: '1234567890-123456789@g.us'

let handler = m => m;

handler.all = async function (m) {
  // Verifica se il messaggio contiene del testo e se è un gruppo (se serve)
  if (!m.text) return;

  const isGroup = m.chat.endsWith('@g.us');
  if (allowedGroupId && isGroup && m.chat !== allowedGroupId) return;

  // Utilizza una regex semplificata per trovare la stringa "@393755853799"
  const ownerRegex = /@393755853799/i;
  if (!ownerRegex.test(m.text)) return;
  
  // Non rispondere se il messaggio è stato inviato dal bot stesso
  if (m.sender === global.conn.user.jid) return;

  // Gestione del cooldown per evitare spam
  if (cooldown.has(m.sender)) {
    const timeLeft = (cooldown.get(m.sender) - Date.now()) / 1000;
    if (timeLeft > 0) {
      return global.conn.sendMessage(
        m.chat,
        { text: `⏳ Attendi ancora *${timeLeft.toFixed(1)} secondi* prima di menzionare di nuovo l'owner.` },
        { quoted: m }
      );
    }
  }

  // Invia un messaggio di attesa
  await global.conn.sendMessage(m.chat, { text: '⏳ Un momento...' }, { quoted: m });

  // Carica l’immagine dal file system; controlla se il file esiste
  const imagePath = path.resolve('./icone/instagram.png');
  let image;
  try {
    image = fs.readFileSync(imagePath);
  } catch (err) {
    console.error("Errore nel caricamento dell'immagine:", err);
    // Se non esiste l'immagine, invia un messaggio di errore
    return global.conn.sendMessage(
      m.chat,
      { text: "❌ Errore nel caricamento dell'immagine dell'owner." },
      { quoted: m }
    );
  }

  // Imposta il link del gruppo WhatsApp e seleziona un messaggio casuale
  const whatsappGroupLink = "https://chat.whatsapp.com/FTHuRX16IVXDv0WQvDNxqw";
  const randomMessage = pickRandom(randomMessages);
  const name = global.conn.getName ? global.conn.getName(m.sender) : m.sender;

  // Costruisci la vCard per il contatto
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Sy;Bot;;;",
    "FN:y",
    `item1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}`,
    "item1.X-ABLabel:Ponsel",
    "END:VCARD"
  ].join("\n");

  // Costruisci il messaggio con il thumbnail "virtuale" (locationMessage)
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

  // Opzioni interattive (pulsanti) per la risposta principale
  let buttons = [
    { buttonId: 'instagram_owner', buttonText: { displayText: '📸 Instagram' }, type: 1 },
    { buttonId: 'whatsapp_group', buttonText: { displayText: '👥 Gruppo WhatsApp' }, type: 1 },
    { buttonId: 'supporto_command', buttonText: { displayText: '💬 Richiedi Supporto' }, type: 1 },
  ];

  let buttonMessage = {
    text: `👋 Ciao *${name}*! ${randomMessage}\n\n📩 Se hai bisogno di supporto o vuoi richiedere il bot, usa il comando \`.supporto\`.`,
    footer: 'INSTAGRAM OWNER',
    buttons: buttons,
    // Puoi includere il contesto della vCard come "locationMessage" se necessario:
    contextInfo: { quoted: quotedContact }
  };

  try {
    await global.conn.sendMessage(m.chat, buttonMessage, { quoted: m });
  } catch (e) {
    console.error("Errore nell'invio del messaggio con pulsanti:", e);
  }

  // Aggiorna il cooldown
  cooldown.set(m.sender, Date.now() + cooldownTime);
};

// Gestione delle risposte ai pulsanti
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
