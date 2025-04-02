const handler = async (m, { conn, participants }) => {
  const users = global.db.data.users;
  
  let lista_utenti = participants.map(u => {
    let user = users[u.id] || { money: 0, bank: 0, truffe: 0 };
    return {
      id: u.id,
      money: user.money || 0,
      bank: user.bank || 0,
      truffe: user.truffe || 0
    };
  });

  let testo = "═════ ೋೋ═════\n𝐒𝐀𝐋𝐃𝐈 𝐆𝐑𝐔𝐏𝐏𝐎 💰\n";
  lista_utenti.forEach(user => {
    let numero = user.id.split`@`[0];
    testo += `👤 *${numero}*\n💵 Contanti: ${user.money} €\n🏦 Banca: ${user.bank} €\n⚠️ Truffe: ${user.truffe}\n═════ ೋೋ═════\n`;
  });

  let messaggio = {
    "key": {
      "participants": "0@s.whatsapp.net",
      "fromMe": false,
      "id": "Halo"
    },
    "message": {
      "contactMessage": {
        displayName: `𝐁𝕀𝐋𝚲𝐍𝐂𝕀Ꮻ 𝐆𝐑𝐔𝐏𝐏𝕆`,
        "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nEND:VCARD`
      }
    },
    "participant": "0@s.whatsapp.net"
  };

  conn.reply(m.chat, testo, messaggio);
};

handler.command = /^soldigruppo|bilancio|truffe$/i;

export default handler;
