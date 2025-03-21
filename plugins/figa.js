let handler = async (m, { conn, command, text }) => {
    // Calcolo in base alla volontà di Youns
    let width = Math.floor(Math.random() * 31);

    // Frase finale basata sulla misura
    let finalPhrase = width >= 8 
        ? "🔥 *Direi che stiamo raggiungendo livelli epici!*"
        : "😅 *Sembra essere ancora nella media, ma niente paura!*";

    // Messaggio 🥵
    let message = `
━━━━━━━━━━━━━━━━━━━━━━━
*CALCOLATORE DELL'APERTURA* 😈
━━━━━━━━━━━━━━━━━━━━━━━
🍑 *${text} ha la figa spalancata di:*  
⚡ *${width} cm!* ⚡
━━━━━━━━━━━━━━━━━━━━━━━
${finalPhrase}
`.trim();

    m.reply(message, null, { mentions: conn.parseMention(message) });
};

handler.command = /^(figa)$/i;

export default handler;
