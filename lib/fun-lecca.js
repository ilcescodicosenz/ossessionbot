let handler = async (m, { conn, usedPrefix, command, text }) => {
    let who;

    // Determina chi abbracciare, se è un gruppo o una chat privata
    if (m.isGroup) {
        who = m.mentionedJid[0] 
            ? m.mentionedJid[0] 
            : m.quoted ? m.quoted.sender 
            : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' 
            : false;
    } else {
        who = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat;
    }

    // Controlla se la persona da abbracciare è valida
    let user = global.db.data.users[who];
    if (!who) return m.reply(`Menziona chi vuoi leccare 😅`);

    // Invia il messaggio dell'abbraccio
    let abrazo = await conn.reply(m.chat, `@${m.sender.split('@')[0]} 𝐬𝐭𝐚 𝐥𝐞𝐜𝐜𝐚𝐧𝐝𝐨 𝐥𝐚 𝐟𝐢𝐠𝐚 𝐝𝐢  @${who.split('@')[0]} 👅`, m, { mentions: [who, m.sender] });

    // Aggiungi la reazione all'abbraccio
    conn.sendMessage(m.chat, { react: { text: '😛', key: abrazo.key } });
};

handler.command = ['lecca'];
export default handler;