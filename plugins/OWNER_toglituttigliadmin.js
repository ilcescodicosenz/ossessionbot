let handler = async (m, { conn, participants }) => {
  let adminsToRemove = participants.filter(p => p.admin && p.id !== conn.user.jid).map(u => u.id);

  if (adminsToRemove.length === 0) {
    return conn.reply(m.chat, 'Non ci sono altri amministratori a cui togliere i poteri!', m);
  }

  try {
    await conn.groupParticipantsUpdate(m.chat, adminsToRemove, 'demote');
    conn.reply(m.chat, `Ok! 👋 Ho tolto i poteri di amministratore a: ${adminsToRemove.map(u => '@' + u.split('@')[0]).join(', ')}`, m, {
      mentions: adminsToRemove
    });
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, 'Ops! ⚠️ C\'è stato un problema nel togliere i poteri di amministratore.', m);
  }
};

handler.help = ['toglituttiadmin'];
handler.tags = ['group'];
handler.command = /^(toglituttiadmin)$/i;
handler.group = true;
handler.owner = true;
handler.botAdmin = true;
handler.fail = null;
export default handler;
