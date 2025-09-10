let handler = async (m, { conn, text, participants }) => {
  try {
    const delay = (time) => new Promise((res) => setTimeout(res, time));

    let customMessage = (text || '').trim();
    if (!customMessage) return m.reply("Devi scrivere un messaggio dopo il comando!");

    // Ottieni tutti gli ID dei partecipanti
    let users = participants.map(u => u.id || u.jid || conn.decodeJid(u));

    // Limita la lunghezza del messaggio a 200 caratteri (WhatsApp)
    const maxMessageLength = 200;
    let messageChunks = [];
    let tempMsg = customMessage;

    while (tempMsg.length > maxMessageLength) {
      messageChunks.push(tempMsg.slice(0, maxMessageLength));
      tempMsg = tempMsg.slice(maxMessageLength);
    }
    if (tempMsg.length) messageChunks.push(tempMsg);

    // Invia per 10 volte ogni chunk, flood con ritardo
    for (let i = 0; i < 10; i++) {
      for (let chunk of messageChunks) {
        await conn.sendMessage(m.chat, { text: chunk, mentions: users });
        await delay(2000);
      }
    }
  } catch (e) {
    console.error(e);
    m.reply('Errore nell\'invio del bigtag.');
  }
};

handler.command = /^(bigtag)$/i;
handler.group = true;
handler.owner = true; // Solo owner bot, togli se vuoi admin
// handler.admin = true; // Se vuoi admin di gruppo

export default handler;
