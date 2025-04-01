const time = async (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let handler = async (m, { conn, text, args, groupMetadata, usedPrefix, command }) => {
  if (command === 'warn' || command === 'ammonisci') {
    let war = '2'; // Numero di avvertimenti prima del ban
    let who;
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : true;
    else who = m.chat;
    if (!who) return;
    if (!(who in global.db.data.users)) {
      global.db.data.users[who] = { warn: 0, warnedBy: {} }; // Aggiungiamo un oggetto per chi ha dato l'avvertimento
    }
    let warn = global.db.data.users[who].warn;
    let user = global.db.data.users[who];
    const reason = text ? '❓ » ' + text.replace(m.sender, '') : 'Nessuna motivazione fornita'; // Motivazione obbligatoria

    if (warn < war) {
      global.db.data.users[who].warn += 1;
      global.db.data.users[who].warnedBy[m.sender] = reason; // Registra chi ha dato l'avvertimento e perché
      conn.reply(m.chat, `👤 » @${who.split('@')[0]}\n⚠️ » *${user.warn} / 3*\n${reason.capitalize()}`, m, { mentions: [who] });
      // Messaggio privato all'utente avvertito (opzionale)
      conn.sendMessage(who, { text: `Hai ricevuto un avvertimento nel gruppo *${groupMetadata.subject}*.\nMotivazione: ${reason.capitalize()}\nHai *${user.warn}* avvertimenti su 3.` });
    } else if (warn === war) {
      global.db.data.users[who].warn = 0;
      conn.reply(m.chat, `👤 » @${who.split('@')[0]}\n⚠️ » Rimosso dal gruppo per aver raggiunto il limite di avvertimenti.`, m, { mentions: [who] });
      await time(1000);
      await conn.groupParticipantsUpdate(m.chat, [who], 'remove');
      // Messaggio privato all'utente bannato (opzionale)
      conn.sendMessage(who, { text: `Sei stato rimosso dal gruppo *${groupMetadata.subject}* per aver raggiunto il limite di 3 avvertimenti.` });
    }
  }

  if (command === 'unwarn' || command === 'delwarn') {
    let who;
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
    else who = m.chat;
    if (!who) return;
    if (!(who in global.db.data.users)) {
      global.db.data.users[who] = { warn: 0, warnedBy: {} };
    }
    let warn = global.db.data.users[who].warn;
    if (warn > 0) {
      global.db.data.users[who].warn -= 1;
      // Resetta l'avvertimento dato da chi lo ha rimosso (opzionale)
      delete global.db.data.users[who].warnedBy[m.sender];
      let user = global.db.data.users[who];
      conn.reply(m.chat, `👤 » @${who.split('@')[0]}\n⚠️ » *${user.warn} / 3*`, m, { mentions: [who] });
    } else if (warn === 0) {
      m.reply("L’utente menzionato non ha avvertimenti.");
    }
  }

  if (command === 'warns' || command === 'avvertimenti') {
    let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
    if (!(who in global.db.data.users)) {
      global.db.data.users[who] = { warn: 0, warnedBy: {} };
    }
    let warn = global.db.data.users[who].warn;
    let warnedByList = Object.entries(global.db.data.users[who].warnedBy)
      .map(([admin, reason]) => `• Admin: @${admin.split('@')[0]} (${reason})`)
      .join('\n') || 'Nessun avvertimento precedente';
    conn.reply(m.chat, `👤 » @${who.split('@')[0]}\n⚠️ » Ha *${warn}* avvertimenti su 3.\n\n*Dettagli avvertimenti precedenti:*\n${warnedByList}`, m, { mentions: [who] });
  }

  if (command === 'setwarnlimit' && m.isGroup && m.isBotAdmin) {
    if (!args[0] || isNaN(args[0])) {
      return m.reply(`Inserisci un numero valido per impostare il limite di avvertimenti.\nEsempio: ${usedPrefix + command} 5`);
    }
    war = parseInt(args[0]);
    m.reply(`Il limite di avvertimenti in questo gruppo è stato impostato a ${war}.`);
  }
}

handler.help = ['warn @user [motivo]', 'unwarn @user', 'warns @user', 'setwarnlimit <numero>'];
handler.tags = ['gruppo', 'admin'];
handler.command = ['warn', 'ammonisci', 'unwarn', 'delwarn', 'warns', 'avvertimenti', 'setwarnlimit'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
