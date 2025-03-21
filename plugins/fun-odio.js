let handler = async (m, { conn, command, text }) => {
    // Calcolo della percentuale di odio
    let percentage = Math.floor(Math.random() * 101);

    // Frase finale basata sulla percentuale
    let finalPhrase = percentage >= 50 
        ? "😡 *Wow, sembra che tra voi due ci sia davvero tensione!*" 
        : "😌 *Forse non è così grave come pensi.*";

    // Messaggio completo
    let hate = `
━━━━━━━━━━━━━━━━━━━━━━━
🔥 *𝐂𝐀𝐋𝐂𝐎𝐋𝐀𝐓𝐎𝐑𝐄 𝐃𝐈 𝐎𝐃𝐈𝐎* 🔥
━━━━━━━━━━━━━━━━━━━━━━━
👿 *L'odio tra te e* ${text}:  
💢 *${percentage}%* di intensità! 💢
━━━━━━━━━━━━━━━━━━━━━━━
${finalPhrase}
`.trim();

    m.reply(hate, null, { mentions: conn.parseMention(hate) });
};

handler.command = /^(odio)$/i;
export default handler;
