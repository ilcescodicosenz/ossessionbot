let linkRegex = /chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i;

export async function before(msg, { isAdmin, isBotAdmin }) {
  if (msg.isBaileys && msg.fromMe) return true;
  if (!msg.isGroup) return false;

  let chatData = global.db.data.chats[msg.chat];
  let sender = msg.key.participant;
  let messageId = msg.key.id;
  let botSettings = global.db.data.settings[this.user.jid] || {};

  let foundLink = null;

  // Analizza messaggi di tipo testo
  if (msg.text && linkRegex.test(msg.text)) {
    foundLink = msg.text.match(linkRegex);
  }

  // Analizza anche sondaggi
  if (msg.message?.pollCreation) {
    const poll = msg.message.pollCreation;
    const title = poll.name || "";
    const options = poll.options?.map(o => o.optionName) || [];

    // Controlla il titolo del sondaggio
    if (linkRegex.test(title)) {
      foundLink = title.match(linkRegex);
    }

    // Controlla ogni opzione del sondaggio
    for (let option of options) {
      if (linkRegex.test(option)) {
        foundLink = option.match(linkRegex);
        break;
      }
    }
  }

  // Se l'utente è admin e ha postato un link (consentito)
  if (isAdmin && chatData.antiLink && foundLink) return;

  // Se è stato trovato un link e non è admin
  if (chatData.antiLink && foundLink && !isAdmin) {
    // Evita di bannare per il link del gruppo stesso
    if (isBotAdmin) {
      const groupLink = "https://chat.whatsapp.com/" + (await this.groupInviteCode(msg.chat));
      if (msg.text?.includes(groupLink) || foundLink[0] === groupLink) return true;
    }

    if (isBotAdmin && botSettings.restrict) {
      const warning = "⚠ *ANTI-LINK*: Link non autorizzato rilevato nel messaggio. L'utente sarà rimosso.";
      await conn.reply(msg.chat, warning, msg);

      await conn.sendMessage(msg.chat, {
        delete: {
          remoteJid: msg.chat,
          fromMe: false,
          id: messageId,
          participant: sender
        }
      });

      let remove = await conn.groupParticipantsUpdate(msg.chat, [msg.sender], 'remove');
      if (remove[0]?.status === "404") return;
    }
  }

  return true;
}
