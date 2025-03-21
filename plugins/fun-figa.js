let handler = async (m, { conn, command, text }) => {
    let width = Math.floor(Math.random() * 31);
    let finalPhrase = width >= 8 
        ? "🔥 *Complimenti, siamo su livelli impressionanti!*"
        : "😅 *Un risultato discreto, c'è sempre margine di miglioramento!*";

    let message = `
━━━━━━━━━━━━━━━━━━━━━━━
📏 *CALCOLATORE DI APERTURA* 📏
━━━━━━━━━━━━━━━━━━━━━━━
🔍 *${text}* ha un'apertura stimata di:  
👉 *${width} cm!*  
━━━━━━━━━━━━━━━━━━━━━━━
${finalPhrase}
`.trim();

    m.reply(message, null, { mentions: conn.parseMention(message) });
};

handler.command = /^(figa)$/i;

export default handler;