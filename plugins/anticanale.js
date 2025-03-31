//plugin creato da #Cesco
let handler = async (m, { conn, isAdmin, isBotAdmin }) => {
  // Regex to detect WhatsApp Channel Links
  let whatsappChannelRegex = /https?:\/\/chat\.whatsapp\.com\/channel\//i;

  if (whatsappChannelRegex.test(m.text)) {
    if (!isBotAdmin) return conn.reply(m.chat, "⚠️ Il bot non è admin, impossibile rimuovere l'utente.", m);

    if (isAdmin) return conn.reply(m.chat, "🔹 Un admin ha inviato un link di canale, non verrà rimosso.", m);

    // Rimuove l'utente che ha inviato il link
    await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove")
      .then(() => {
        conn.reply(m.chat, `🚫 *${m.sender.split('@')[0]}* è stato rimosso per aver inviato un link di canale WhatsApp!`, m);
      })
      .catch(err => {
        console.error(err);
        conn.reply(m.chat, "❌ Errore nella rimozione dell'utente.", m);
      });
  }
};

handler.all = true;

export default handler;
