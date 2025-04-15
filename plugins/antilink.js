let linkRegex = /chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i;

// Funzione per estrarre il testo, considerando anche sondaggi e altri formati
function extractTextFromMsg(msg) {
  // Testo semplice presente in msg.text
  if (msg.text) return msg.text;

  // Verifica se il messaggio contiene la proprietà 'conversation'
  if (msg.message?.conversation) return msg.message.conversation;

  // Estrae il testo dai messaggi estesi (ad esempio forward o reply)
  if (msg.message?.extendedTextMessage?.text) return msg.message.extendedTextMessage.text;

  // Estrae il testo dalla didascalia di un'immagine, video, ecc.
  if (msg.message?.imageMessage?.caption) return msg.message.imageMessage.caption;

  // Se si tratta di un sondaggio, unisci il titolo e le opzioni
  if (msg.message?.pollCreation) {
    let poll = msg.message.pollCreation;
    let text = poll.name || "";
    if (poll.options && Array.isArray(poll.options))
      text += " " + poll.options.map(o => o.optionName).join(" ");
    return text;
  }
  return "";
}

export async function before(msg, { isAdmin, isBotAdmin }) {
  // Escludi i messaggi dal bot o inviati dallo stesso bot
  if (msg.isBaileys && msg.fromMe) return true;
  // Se non siamo in un gruppo, non fare nulla
  if (!msg.isGroup) return false;

  let chatData = global.db.data.chats[msg.chat];
  let sender = msg.key.participant;
  let messageId = msg.key.id;
  let botSettings = global.db.data.settings[this.user.jid] || {};

  // Estrae il contenuto testuale del messaggio (anche sondaggi)
  const contentText = extractTextFromMsg(msg);
  // Cerca link dal formato "chat.whatsapp.com/..."
  const foundLink = linkRegex.exec(contentText);

  // Se l'admin invia un link, lo lascia passare
  if (isAdmin && chatData.antiLink && contentText.includes("https://chat.whatsapp.com") && foundLink)
    return;

  // Se il controllo antiLink è attivo, è stato rilevato un link e l'utente NON è admin...
  if (chatData.antiLink && foundLink && !isAdmin) {
    // Evita l'intervento se il link corrisponde a quello del gruppo
    if (isBotAdmin) {
      const groupLink = "https://chat.whatsapp.com/" + (await this.groupInviteCode(msg.chat));
      if (contentText.includes(groupLink)) return true;
    }

    // Se il bot è admin e la modalità restrict è attiva, invia il warning, elimina il messaggio e rimuove l'utente
    if (isBotAdmin && botSettings.restrict) {
      let warningMessage = {
        'key': {
          'participants': "0@s.whatsapp.net",
          'fromMe': false,
          'id': "Halo"
        },
        'message': {
          'locationMessage': {
            'name': "𝐀𝐧𝐭𝐢 - 𝐋𝐢𝐧𝐤",
            // Recupera la miniatura dal link indicato
            'jpegThumbnail': await (await fetch("https://telegra.ph/file/a3b727e38149464863380.png")).buffer(),
            'vcard': "BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD"
          }
        },
        'participant': "0@s.whatsapp.net"
      };

      conn.reply(msg.chat, "⚠ 𝐋𝐈𝐍𝐊 𝐃𝐈 𝐀𝐋𝐓𝐑𝐈 𝐆𝐑𝐔𝐏𝐏𝐈 𝐍𝐎𝐍 𝐒𝐎𝐍𝐎 𝐂𝐎𝐍𝐒𝐄𝐍𝐓𝐈", warningMessage);

      await conn.sendMessage(msg.chat, {
        'delete': {
          'remoteJid': msg.chat,
          'fromMe': false,
          'id': messageId,
          'participant': sender
        }
      });

      let removeUser = await conn.groupParticipantsUpdate(msg.chat, [msg.sender], 'remove');
      if (removeUser[0]?.status === "404") return;
    } else if (!botSettings.restrict) {
      return;
    }
  }

  return true;
}
