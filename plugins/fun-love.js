let handler = async (m, { conn, command, text, isOwner }) => {
    // Controlla se il messaggio è inviato da un owner
    let percentage = isOwner ? 100 : Math.floor(Math.random() * 101);

    // Frase finale basata sulla percentuale
    let finalPhrase = percentage === 100 
        ? "💘 *È destino! Il vero amore esiste.*" 
        : percentage >= 50 
        ? "💌 *Ora che aspetti, dichiarati subito!*" 
        : "😕 *Magari non è la persona giusta.*";

    // Messaggio completo
    let love = `
━━━━━━━━━━━━━━━━━━━━━━━
💖 *CALCOLATORE DI AMORE* 💖
━━━━━━━━━━━━━━━━━━━━━━━
💕 *Affinità tra te e* ${text}:    
✨ *${percentage}%* di compatibilità! ✨
━━━━━━━━━━━━━━━━━━━━━━━
${finalPhrase}
`.trim();

    m.reply(love, null, { mentions: conn.parseMention(love) });
};

handler.help = ['love'];
handler.tags = ['fun'];
handler.command = /^(love|amore)$/i;

export default handler;
