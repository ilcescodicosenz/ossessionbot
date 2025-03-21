import fs from 'fs'

async function handler(m, { isBotAdmin, isOwner, text, conn }) {
  if (!isBotAdmin) return m.reply('ⓘ Devo essere admin per poter funzionare.');

  if (!text) return m.reply('ⓘ Devi specificare un numero. Esempio: .numero +393792004334');

  const number = text.replace(/[^\d+]/g, ''); // Estrai il numero rimuovendo caratteri non numerici
  if (!number.startsWith('+')) return m.reply('ⓘ Il numero deve iniziare con "+".');

  const jid = number + '@s.whatsapp.net'; // Formatta il numero per WhatsApp
  const groupMetadata = conn.chats[m.chat]?.metadata;
  if (!groupMetadata) return m.reply('ⓘ Questo comando può essere usato solo nei gruppi.');

  try {
    // Messaggio "Aggiunta in corso..."
    const fake = {
      key: {
        participants: "0@s.whatsapp.net",
        fromMe: false,
        id: "Halo",
      },
      message: {
        locationMessage: {
          name: 'Aggiunta in corso...',
          jpegThumbnail: await (await fetch('https://telegra.ph/file/ed97f8c272e8e88f77cc0.png')).buffer(),
        },
      },
      participant: "0@s.whatsapp.net",
    };

    conn.reply(m.chat, `Tentativo di aggiungere ${number} al gruppo...`, fake);

    // Aggiunge il numero al gruppo
    await conn.groupParticipantsUpdate(m.chat, [jid], 'add');
    conn.reply(
      m.chat,
      `✅ @${m.sender.split`@`[0]} ha aggiunto ${number} al gruppo!`,
      null,
      { mentions: [m.sender] }
    );
  } catch (error) {
    console.error("Errore durante l'aggiunta:", error);
    m.reply(
      '❌ Non sono riuscito ad aggiungere il numero. Assicurati che il numero sia valido, che io sia admin e che il gruppo non abbia restrizioni.'
    );
  }
}

handler.command = ['numero']; // Comando attivabile con ".numero"
handler.admin = true;

export default handler;