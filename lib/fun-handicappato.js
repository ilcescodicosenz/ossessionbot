let handler = async (m, { conn, command, text }) => {
    // Determina il genere in base al comando
    let genere = command === "handicappato" ? "handicappato" : "handicappata";

    // Genera il messaggio stilizzato
    let love = `
━━━━━━━━━━━━━━━━━━━━━━
*🌀 CALCOLATORE DI HANDICAP🌀*
━━━━━━━━━━━━━━━━━━━━━━
🤔 *${text} è ${genere} al ${Math.floor(Math.random() * 101)}%!*
━━━━━━━━━━━━━━━━━━━━━━
*Ecco perché fai così* 🤣 
`.trim();

    m.reply(love, null, { mentions: conn.parseMention(love) });
};

handler.command = /^(handicappato|handicappata)$/i;
export default handler;
