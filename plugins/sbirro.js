let handler = async (m, { conn, usedPrefix, command, text }) => {
    let who;

    // Determina chi "misurare", se è un gruppo o una chat privata
    if (m.isGroup) {
        who = m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.quoted ? m.quoted.sender
            : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
            : false;
    } else {
        who = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat;
    }

    // Controlla se la persona da "misurare" è valida
    if (!who) return m.reply(`Menziona qualcuno per misurare il suo livello di "sbirro" 👮‍♂️`);

    // Genera una percentuale casuale tra 0 e 100
    const percent = Math.floor(Math.random() * 101);

    const response = `👮‍♂️ Il livello di "sbirro" di @${who.split('@')[0]} è: *${percent}%* 🚔`;

    // Invia il messaggio con la percentuale
    let sbirroMsg = await conn.sendMessage(m.chat, { text: response, mentions: [who] }, { quoted: m });

    // Aggiungi una reazione (opzionale)
    conn.sendMessage(m.chat, { react: { text: '📊', key: sbirroMsg.key } });
};

handler.command = ['sbirro', 'quantosbirro'];
handler.help = ['sbirro @utente', 'quantosbirro @utente'];
handler.tags = ['fun'];
handler.desc = 'Scopri quanto è "sbirro" un utente 🚓';

export default handler;
