//plugin creato da cesco
let channelRegex = /chat.whatsapp.com\/channel\/([0-9A-Za-z]{20,24})/i;

export async function before(msg, { isAdmin, isBotAdmin }) {
  if (msg.isBaileys && msg.fromMe) return true;
  if (!msg.isGroup) return false;

  let chatData = global.db.data.chats[msg.chat];
  let sender = msg.key.participant;
  let messageId = msg.key.id;
  let botSettings = global.db.data.settings[this.user.jid] || {};
  const foundLink = channelRegex.exec(msg.text);

  if (isAdmin && chatData.antiChannel && msg.text.includes("https://chat.whatsapp.com/channel/")) return;

  if (chatData.antiChannel && foundLink && !isAdmin) {
    if (isBotAdmin && botSettings.restrict) {
      let warningMessage = {
        'key': {
          'participants': "0@s.whatsapp.net",
          'fromMe': false,
          'id': "Halo"
        },
        'message': {
          'locationMessage': {
            'name': "𝐀𝐧𝐭𝐢 - 𝐂𝐚𝐧𝐚𝐥𝐞",
            'jpegThumbnail': await (await fetch("https://telegra.ph/file/a3b727e38149464863380.png")).buffer(),
            'vcard': "BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD"
          }
        },
        'participant': "0@s.whatsapp.net"
      };

      conn.reply(msg.chat, "⚠ 𝐋𝐈𝐍𝐊 𝐃𝐈 𝐂𝐀𝐍𝐀𝐋𝐈 𝐖𝐇𝐀𝐓𝐒𝐀𝐏𝐏 𝐍𝐎𝐍 𝐒𝐎𝐍𝐎 𝐂𝐎𝐍𝐒𝐄𝐍𝐓𝐈𝐓𝐈", warningMessage);

      await conn.sendMessage(msg.chat, {
        'delete': {
          'remoteJid': msg.chat,
          'fromMe': false,
          'id': messageId,
          'participant': sender
        }
      });

      let removeUser = await conn.groupParticipantsUpdate(msg.chat, [msg.sender], 'remove');
      if (removeUser[0].status === "404") return;
    } else if (!botSettings.restrict) {
      return;
    }
  }

  return true;
}
