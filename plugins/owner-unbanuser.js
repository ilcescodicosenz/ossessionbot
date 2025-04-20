let handler = async (_0x59be26, { conn: _0x5e300e }) => {
  const mentionedJid = _0x59be26.mentionedJid?.[0];
  const quotedSender = _0x59be26.quoted?.sender;
  const senderToUnban = mentionedJid || quotedSender;

  if (!senderToUnban) return;

  let bannedUsers = global.db.data.users;
  if (bannedUsers[senderToUnban]) {
    bannedUsers[senderToUnban].banned = false;
  }

  const unbanMessage = {
    key: {
      participants: "0@s.whatsapp.net",
      fromMe: false,
      id: "Halo",
    },
    message: {
      locationMessage: {
        name: "𝐔𝐭𝐞𝐧𝐭𝐞 𝐬𝐛𝐥𝐨𝐜𝐜𝐚𝐭𝐨",
        jpegThumbnail: await (await fetch("https://telegra.ph/file/710185c7e0247662d8ca6.png")).buffer(),
      },
    },
    participant: "0@s.whatsapp.net",
  };

  _0x5e300e.reply(_0x59be26.chat, "𝐐𝐮𝐞𝐬𝐭𝐨 𝐮𝐭𝐞𝐧𝐭𝐞 𝐩𝐮𝐨' 𝐝𝐢 𝐧𝐮𝐨𝐯𝐨 𝐞𝐬𝐞𝐠𝐮𝐢𝐫𝐞 𝐢 𝐜𝐨𝐦𝐚𝐧𝐝𝐢", unbanMessage);
};

handler.command = /^unbanuser$/i;
handler.rowner = true;

export default handler;
