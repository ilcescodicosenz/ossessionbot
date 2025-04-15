let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;

export async function before(msg, { isAdmin, isBotAdmin }) {
  // Se il messaggio è stato inviato dal bot o se non è in un gruppo, esce dalla funzione
  if (msg.isBaileys && msg.fromMe) return true;
  if (!msg.isGroup) return false;
  
  // Verifica se il messaggio è un sondaggio e, in tal caso, ignora l’antilink
  // Modifica questo controllo in base alla struttura dei messaggi sondaggio che ricevi
  if (msg.message && msg.message.pollCreation) return true;
  
  let chatData = global.db.data.chats[msg.chat];
  let sender = msg.key.participant;
  let messageId = msg.key.id;
  let botSettings = global.db.data.settings[this.user.jid] || {};
  const foundLink = linkRegex.exec(msg.text);

  // Se l’amministratore invia un link e l’antilink è attivo, non interveniamo
  if (isAdmin && chatData.antiLink && msg.text.includes("https://chat.whatsapp.com")) return;

  // Se è rilevato un link e chi lo ha inviato non è amministratore
  if (chatData.antiLink && foundLink && !isAdmin) {
    // Se il link appartiene al gruppo corrente, non interveniamo
    if (isBotAdmin) {
      const groupLink = "https://chat.whatsapp.com/" + (await this.groupInviteCode(msg.chat));
      if (msg.text.includes(groupLink)) return true;
    }

    // Se il bot è admin e in modalità "restrict"
    if (isBotAdmin && botSettings.restrict) {
      // Invia un avviso semplificato in formato testo per evitare interpretazioni errate
      let warningText = "⚠ *ANTI-LINK*: Il link inviato non è consentito in questo gruppo.";
      conn.reply(msg.chat, warningText, msg);

      // Procedi ad eliminare il messaggio offensivo
      await conn.sendMessage(msg.chat, {
        delete: {
          remoteJid: msg.chat,
          fromMe: false,
          id: messageId,
          participant: sender
        }
      });

      // Rimuove l'utente dal gruppo; se la risposta contiene un errore 404, interrompe
      let removeUser = await conn.groupParticipantsUpdate(msg.chat, [msg.sender], 'remove');
      if (removeUser[0].status === "404") return;
    } else if (!botSettings.restrict) {
      // Se il bot non è in modalità "restrict", non fare nulla
      return;
    }
  }

  return true;
}
