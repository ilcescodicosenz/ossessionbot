let handler = async (m, { conn, isAdmin, text, usedPrefix, command }) => {
    let groupMetadata = await conn.groupMetadata(m.chat);
    let groupMembers = groupMetadata.participants.map(participant => participant.id);

    // Comando per aggiungere un warn (solo per admin)
    if (command === 'warn' && isAdmin) {
        if (!text) return m.reply(`Usa: ${usedPrefix}warn @utente [motivo]`);
        let [mentionedJid, ...reason] = text.split(' ');
        mentionedJid = mentionedJid.replace(/[^0-9]/g, '') + '@s.whatsapp.net'; // Pulisci il numero

        if (!groupMembers.includes(mentionedJid)) return m.reply('L\'utente non è nel gruppo.');

        let user = global.db.data.users[mentionedJid] || {};
        user.warn = (user.warn || 0) + 1;
        user.warnReasons = (user.warnReasons ||).concat(reason.join(' '));

        global.db.data.users[mentionedJid] = user; // Aggiorna il database

        return m.reply(`Warn aggiunto a @${mentionedJid.split('@')[0]} (${user.warn}/5)\nMotivo: ${reason.join(' ')}`, null, { mentions: [mentionedJid] });
    }


    // Comando per visualizzare la lista (modificato per mostrare i motivi a tutti)
    if (['listawarn', 'listadv', 'adv', 'advlist', 'advlista'].includes(command)) {
        let adv = Object.entries(global.db.data.users)
            .filter(([jid, user]) => user.warn && groupMembers.includes(jid));

        let caption = `⚠️ *LISTA WARN*
    *╭•·–––––––––––––––––––·•*
    │ *Tot : ${adv.length} User* ${adv.length ? '\n' + adv.map(([jid, user], i) => `
    │
    │ *${i + 1}.* ${conn.getName(jid) == undefined ? 'Senza utenti' : conn.getName(jid)} *(${user.warn}/5)*
    │ Motivi:
    ${user.warnReasons ? user.warnReasons.map((reason, idx) => `│  ${idx + 1}. ${reason}`).join('\n') : '│  Nessun motivo specificato'}
    │ - - - - - - - - -`.trim()).join('\n') : ''}
    *╰•·–––––––––––––––––––·•*`;

        m.reply(caption, null, { mentions: conn.parseMention(caption) });
    }
}

handler.help = ['warn @utente [motivo]', 'listawarn']; // Aggiungi 'warn' all'help
handler.command = /^(listawarn|listadv|adv|advlist|advlista|warn)$/i; // Aggiungi 'warn' ai comandi
handler.group = true; // Funziona solo nei gruppi
handler.admin = false; // `listawarn` può essere usato da tutti, `warn` solo dagli admin

export default handler;
