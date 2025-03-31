let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender] || { money: 0, stars: 0 };
  let saldo = user.money || 0; // Legge il saldo dal portafoglio dell'utente
  await conn.reply(m.chat, `💰 Il tuo saldo attuale è: *${saldo}* 💶`, m);
};

handler.help = ['portafoglio'];
handler.tags = ['rpg'];
handler.command = ['portafoglio', 'saldo', 'wallet'];

export default handler;
