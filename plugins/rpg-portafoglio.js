const handler = async (m, { conn, command, text, args }) => {
  const mention = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : m.quoted);
  const who = mention || m.sender;
  const users = global.db.data.users;
  const user = users[who];

  let nfurti = user.furti;
  let data_furto = user.datafurto;

  let prova = {
    "key": {
      "participants": "0@s.whatsapp.net",
      "fromMe": false,
      "id": "Halo"
    },
    "message": {
      "contactMessage": {
        displayName: `𝐁𝕀𝐋𝚲𝐍𝐂𝕀Ꮻ`,
        "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${who.split`@`[0]}:${who.split`@`[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    },
    "participant": "0@s.whatsapp.net"
  };

  let testo = `═════ ೋೋ═════\n𝐏𝐎𝐑𝐓𝐀𝐅𝐎𝐆𝐋𝐈𝐎 👛\n𝐂𝐨𝐧𝐭𝐚𝐧𝐭𝐢: ${user.money !== undefined ? `${user.money} €` : 'Sei povero'}\n𝐁𝐚𝐧𝐜𝐚: ${user.bank} €\n═════ ೋೋ═════\n𝐅𝐔𝐑𝐓𝐈 🥷\n𝐅𝐮𝐫𝐭𝐢 𝐭𝐨𝐭𝐚𝐥𝐢: ${nfurti}\n𝐔𝐥𝐭𝐢𝐦𝐨 𝐟𝐮𝐫𝐭𝐨: ${data_furto}\n𝐓𝐨𝐭𝐚𝐥𝐞: ${user.rubati} €\n═════ ೋೋ═════`;

  conn.reply(m.chat, testo, prova);
};

handler.command = /^portafoglio|budget|soldi|tasca|cash$/i;

export default handler;
