let war = 5  // Cambiato a 5 per coerenza con il messaggio

let handler = async (m, { conn, text, args, groupMetadata, usedPrefix, command }) => {      
    let who;
    if (m.isGroup) {
        who = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : null);
    } else {
        who = m.chat;
    }
    if (!who) return;
    if (!(who in global.db.data.users)) return;

    let user = global.db.data.users[who];
    
    if (user.warn < war - 1) {  // -1 perché vogliamo rimuoverlo al 5° avviso, non al 4°
        user.warn += 1;
        m.reply(`⚠️ 𝐀𝐕𝐕𝐄𝐑𝐓𝐈𝐌𝐄𝐍𝐓𝐎 ${user.warn}`);
    } else if (user.warn == war - 1) {
        user.warn = 0;
        m.reply(`⛔ 𝐔𝐓𝐄𝐍𝐓𝐄 𝐑𝐈𝐌𝐎𝐒𝐒𝐎 𝐃𝐎𝐏𝐎 ${war} 𝐀𝐕𝐕𝐄𝐑𝐓𝐈𝐌𝐄𝐍𝐓𝐈`);
        await time(1000);
        await conn.groupParticipantsUpdate(m.chat, [who], 'remove');
    }
};

handler.help = ['warn @user'];
handler.tags = ['group'];
handler.command = /^(ammonisci|avvertimento|warn|warning)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;

const time = async (ms) => new Promise(resolve => setTimeout(resolve, ms));
