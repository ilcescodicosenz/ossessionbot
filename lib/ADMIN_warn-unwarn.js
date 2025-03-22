const time = async (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  if (command === 'warn' || command === 'ammonisci') {
    let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
    if (!who) return m.reply(`Menziona l'utente da avvertire.`);

    if (!(who in global.db.data.users)) {
      global.db.data.users[who] = { warn: 0, warnReasons: [] };
    }

    let user = global.db.data.users[who];
    const reason = text ? text.replace(m.sender, '').trim() : 'Nessun motivo specificato';

    if (user.warn < 4) {
      user.warn += 1;
      user.warnReasons.push(reason); // Salva il motivo
      conn.reply(m.chat, `👤 @${who.split('@')[0]}\n⚠️ ${user.warn} / 5\nMotivo: ${reason}`, null, { mentions: [who] });
    } else if (user.warn === 4) {
      user.warn = 0;
      user.warnReasons = []; // Resetta i motivi
      conn.reply(m.chat, `👤 @${who.split('@')[0]}\nL'utente è stato rimosso dopo 5 avvertimenti.`, null, { mentions: [who] });
      await time(1000);
      await conn.groupParticipantsUpdate(m.chat, [who], 'remove');
    }
  }

  if (command === 'unwarn' || command === 'delwarn') {
    let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
    if (!who) return m.reply(`Menziona l'utente a cui rimuovere l'avvertimento.`);

    if (global.db.data.users[who] && global.db.data.users[who].warn > 0) {
      global.db.data.users[who].warn -= 1;
      global.db.data.users[who].warnReasons.pop(); // Rimuovi l'ultimo motivo
      conn.reply(m.chat, `👤 @${who.split('@')[0]}\n⚠️ ${global.db.data.users[who].warn} / 5`, null, { mentions: [who] });
    } else {
      m.reply(`L'utente menzionato non ha avvertimenti.`);
    }
  }

  if (command === 'warnlist' || command === 'listawarn') {
    let users = Object.entries(global.db.data.users).filter(([jid, user]) => user.warn > 0 && m.chat.endsWith(jid.split('@')[1]));
    if (users.length === 0) return m.reply(`Nessun utente avvertito in questo gruppo.`);

    let text = `⚠️ Lista Avvertimenti ⚠️\n\n`;
    for (let [jid, user] of users) {
      text += `👤 @${jid.split('@')[0]} (${user.warn} / 5)\nMotivi:\n`;
      for (let reason of user.warnReasons) {
        text += `- ${reason}\n`;
      }
      text += `\n`;
    }
    conn.reply(m.chat, text.trim(), null, { mentions: users.map(([jid]) => jid) });
  }

  if (command === 'warncount') {
    let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
    if (!(who in global.db.data.users) || global.db.data.users[who].warn === 0) {
      return m.reply(`L'utente @${who.split('@')[0]} non ha avvertimenti.`, null, { mentions: [who] });
    }
    m.reply(`L'utente @${who.split('@')[0]} ha ${global.db.data.users[who].warn} avvertimenti.`, null, { mentions: [who] });
  }
};

handler.help = ['warn @utente [motivo]', 'unwarn @utente', 'warnlist', 'warncount @utente'];
handler.command = ['warn', 'ammonisci', 'unwarn', 'delwarn', 'warnlist', 'listawarn', 'warncount'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
