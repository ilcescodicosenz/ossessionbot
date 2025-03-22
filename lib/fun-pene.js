let handler = async (m, { conn, command, text }) => {
    let message = `
*📏 CALCOLATORE DI MISURA 📏*

━━━━━━━━━━━━━━━━━━━━━
🔍 *${text}* ha una lunghezza stimata di:
👉 *${Math.floor(Math.random() * 101)} cm*
━━━━━━━━━━━━━━━━━━━━━
`.trim();

    m.reply(message, null, { mentions: conn.parseMention(message) });
};

handler.help = ['calcolatore'];
handler.tags = ['divertimento'];
handler.command = /^(pene)$/i;

export default handler;