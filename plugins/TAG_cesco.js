import fs from 'fs'
import { buttonsMessage } from '@adiwajshing/baileys' // Assicurati di aver installato questa dipendenza: npm install @adiwajshing/baileys

const toMathematicalAlphanumericSymbols = text => {
  const map = {
    'A': '𝑨', 'B': '𝑩', 'C': '𝑪', 'D': '𝑫', 'E': '𝑬', 'F': '𝑭', 'G': '𝑮', 'H': '𝑯', 'I': '𝑰', 'J': '𝑱',
    'K': '𝑲', 'L': '𝑳', 'M': '𝑴', 'N': '𝑵', 'O': '𝑶', 'P': '𝑷', 'Q': '𝑸', 'R': '𝑹', 'S': '𝑺', 'T': '𝑻',
    'U': '𝑼', 'V': '𝑽', 'W': '𝑾', 'X': '𝑿', 'Y': '𝒀', 'Z': '𝒁'
  };
  return text.split('').map(char => map[char] || char).join('');
};

const cooldown = new Map();
const cooldownTime = 10 * 1000;

const randomMessages = [
  "Ciao! Hai menzionato l'owner, ecco i suoi contatti:",
  "Ehi! Qualcuno ha chiamato l'owner? Ecco le info:",
  "Salve! Hai taggato l'admin, qui trovi i link utili:",
  "Oh, hai bisogno dell'owner? Ecco qui:",
  "Notifica ricevuta! Ecco i dettagli dell'owner:",
];

// Percorso del file audio per la risposta vocale (commentato per ora)
// const voiceResponsePath = './icone/audio_risposta.mp3';

// ID del gruppo specifico in cui la risposta è attiva (lascia vuoto o commenta per tutti i gruppi)
const allowedGroupId = ''; // Inserisci l'ID del gruppo se vuoi limitare la funzionalità

let handler = m => m;
handler.all = async function (m) {
  let chat = global.db.data.chats[m.chat];
  let name = conn.getName(m.sender);
  const isGroup = m.chat.endsWith('@g.us');

  // Restrizione per gruppo specifico (se configurata)
  if (allowedGroupId && isGroup && m.chat !== allowedGroupId) {
    return;
  }

  if (/^@+393755853799|@393755853799/i.test(m.text)) {
    if (m.sender === conn.user.jid) return;

    if (cooldown.has(m.sender)) {
      const timeLeft = (cooldown.get(m.sender) - Date.now()) / 1000;
      if (timeLeft > 0) {
        return conn.reply(m.chat, `⏳ Attendi ancora *${timeLeft.toFixed(1)} secondi* prima di menzionare di nuovo l'owner.`, m);
      }
    }

    await conn.reply(m.chat, '⏳ Un momento...', m); // Messaggio di attesa

    const image = fs.readFileSync('./icone/instagram.png');

    const whatsappGroupLink = "https://chat.whatsapp.com/FTHuRX16IVXDv0WQvDNxqw";

    let prova = {
      key: { participants: "0@s.whatsapp.net", fromMe: false, id: "Halo" },
      message: {
        locationMessage: {
          name: `${toMathematicalAlphanumericSymbols("INSTAGRAM OWNER")}`,
          jpegThumbnail: image,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
        }
      },
      participant: "0@s.whatsapp.net"
    };

    const randomMessage = pickRandom(randomMessages);

    // Opzioni interattive (Pulsanti) per la risposta principale
    let buttons = [
      { buttonId: 'instagram_owner', buttonText: { displayText: '📸 Instagram' }, type: 1 },
      { buttonId: 'whatsapp_group', buttonText: { displayText: '👥 Gruppo WhatsApp' }, type: 1 },
      { buttonId: 'supporto_command', buttonText: { displayText: '💬 Richiedi Supporto' }, type: 1 },
    ];

    let buttonMessage = {
      text: `👋 Ciao *${name}*! ${randomMessage}\n\n📩 Se hai bisogno di supporto o vuoi richiedere il bot, usa il comando \`.supporto\`.`,
      buttons: buttons,
      footer: 'INSTAGRAM OWNER',
      location: { jpegThumbnail: image } // Potrebbe non essere necessario se usi buttonsMessage
    };

    await conn.sendMessage(m.chat, { ...buttonMessage, contextInfo: { quoted: m } });

    // Risposta vocale (commentato temporaneamente)
    // if (fs.existsSync(voiceResponsePath)) {
    //   const audio = fs.readFileSync(voiceResponsePath);
    //   await conn.sendMessage(m.chat, { audio: audio, mimetype: 'audio/mpeg', ptt: true }, { quoted: m });
    // }

    // Richiesta del motivo della menzione (con pulsanti)
    let reasonButtons = [
      { buttonId: 'reason_question', buttonText: { displayText: '❓ Domanda' }, type: 1 },
      { buttonId: 'reason_suggestion', buttonText: { displayText: '💡 Suggerimento' }, type: 1 },
      { buttonId: 'reason_report', buttonText: { displayText: '🚨 Segnalazione' }, type: 1 },
      { buttonId: 'reason_other', buttonText: { displayText: 'Altro' }, type: 1 },
    ];

    let reasonMessage = {
      text: 'Potresti dirmi brevemente il motivo per cui hai menzionato l\'owner?',
      buttons: reasonButtons,
      footer: 'Motivo della Menzone (Opzionale)'
    };

    await conn.sendMessage(m.chat, reasonMessage, { quoted: m });

    cooldown.set(m.sender, Date.now() + cooldownTime);
  }
  return !0;
};

// Gestione delle risposte ai pulsanti
handler.on('button-response', async (m) => {
  const buttonId = m.buttonId;
  if (buttonId === 'instagram_owner') {
    await conn.sendMessage(m.chat, { text: 'Ecco il link a Instagram: https://instagram.com/f.cesco_' }, { quoted: m });
  } else if (buttonId === 'whatsapp_group') {
    await conn.sendMessage(m.chat, { text: 'Ecco il link al gruppo WhatsApp: https://chat.whatsapp.com/FTHuRX16IVXDv0WQvDNxqw' }, { quoted: m });
  } else if (buttonId === 'supporto_command') {
    await conn.sendMessage(m.chat, { text: 'Per richiedere supporto, usa il comando: `.supporto`' }, { quoted: m });
  } else if (buttonId.startsWith('reason_')) {
    const reason = buttonId.split('_')[1];
    await conn.sendMessage(m.chat, { text: `Hai indicato il motivo: *${reason}*. Grazie per l'informazione!` }, { quoted: m });
    // Qui potresti aggiungere logica per gestire il motivo fornito dall'utente
  }
});

export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
