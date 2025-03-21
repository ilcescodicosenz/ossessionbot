let handler = async (m, { conn, command, text }) => {
    // Calcolo della percentuale di rincoglionimento
    let percentage = Math.floor(Math.random() * 101);

    // Frase finale basata sulla percentuale
    let finalPhrase = percentage >= 50 
        ? "🤔 *Wow, la situazione è grave! Potrebbe essere troppo tardi...*" 
        : "😅 *C'è ancora speranza, ma attenzione!*";

    // Messaggio completo
    let message = `
━━━━━━━━━━━━━━━━━━━━━━━
🤪 *CALCOLATORE DI RINCOGLIONIMENTO* 🤪
━━━━━━━━━━━━━━━━━━━━━━━
😵 *${text} è rincoglionito al:*  
💥 *${percentage}%* di livello! 💥
━━━━━━━━━━━━━━━━━━━━━━━
${finalPhrase}
`.trim();

    m.reply(message, null, { mentions: conn.parseMention(message) });
};

handler.command = /^(rincoglionito)$/i;
export default handler;
