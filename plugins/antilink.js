let linkRegex = /chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i;

function extractTextFromMsg(msg) {
  if (!msg.message) return "";

  // Cerca testo normale
  if (msg.message.conversation) return msg.message.conversation;

  // Cerca testo da extendedTextMessage (forwarded, replied, etc.)
  if (msg.message.extendedTextMessage?.text) return msg.message.extendedTextMessage.text;

  // Cerca testo da image/caption
  if (msg.message.imageMessage?.caption) return msg.message.imageMessage.caption;

  // Cerca nei sondaggi
  if (msg.message.pollCreation) {
    let poll = msg.message.pollCreation;
    let text = poll.name || "";
    if (poll.options && Array.isArray(poll.options)) {
      text += " " + poll.options.map(o => o.optionName).join(" ");
    }
    return text;
  }

  return "";
}

export async function before(msg, { isAdmin, isBotAdmin }) {
  if (msg.isBaileys && msg.fromMe) return true;
  if (!msg.isGroup) return false;

  let chatData = global.db.data.chats[msg.chat];
  let sender = msg.key.participant;
  let messageId = msg.key.id;
  let botSettings = global.db.data.settings[this.user.jid] || {};

  const contentText = extractTextFromMsg(msg);
  const foundLink = linkRegex.exec(contentText);

  if (isAdmin && chatData.antiLink && foundLink) return;

  if (chatData.antiLink && foundLink && !isAdmin) {
    if (isBotAdmin) {
      const groupLink = "https://chat.whatsapp.com/" + (await this.groupInviteCode(msg.chat));
      if (contentText.includes(groupLink)) return true;
    }

    if (isBotAdmin && botSettings.restrict) {
      await conn.reply(msg.chat, "⚠ *ANTI-LINK:* Link non consentito rilevato. L'utente sarà rimosso.", msg);

      await conn.sendMessage(msg.chat, {
        delete: {
          remoteJid: msg.chat,
          fromMe: false,
          id: messageId,
          participant: sender
        }
      });

      await conn.groupParticipantsUpdate(msg.chat, [msg.sender], 'remove');
    }
  }

  return true;
}
