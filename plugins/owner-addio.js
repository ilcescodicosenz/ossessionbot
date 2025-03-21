//Hey hey, ti piace il mio c9mando? Ovvio che si haha, se ti serve aiuto scrivimi su ig: il_mulatto07 🤓
let handler = async (m, { conn, args, groupMetadata, participants, usedPrefix, command, isBotAdmin, isSuperAdmin }) => {
  let ps = participants.map(u => u.id).filter(v => v !== conn.user.jid);
  let bot = global.db.data.settings[conn.user.jid] || {};
  if (ps.length === 0) return; // Aggiunto controllo per evitare errori

  const delay = time => new Promise(res => setTimeout(res, time));

  switch (command) {
    case "addio":
      if (!bot.restrict) return;
      if (!isBotAdmin) return;
      let ownerGroup = m.chat.split`-`[0] + '@s.whatsapp.net';
      let users = participants.map(u => u.id).filter(v => v !== conn.user.jid);

      if (isBotAdmin && bot.restrict) {
        for (let user of users) {
          // Rimuove un membro alla volta con una pausa
          await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
          await delay(400); // Pausa di 400 millisecondi 
        }
      } else return;
      break;
  }
};

handler.command = /^(addio)$/i;
handler.group = handler.owner = true;
handler.fail = null;

export default handler;
