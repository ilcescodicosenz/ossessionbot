let handler = async (m, { conn, command, participants, isOwner }) => {
    // Controlla che venga menzionato un utente
    if (!m.mentionedJid[0]) {
        return m.reply("❌ *Per favore, menziona un utente per il teletrasporto!*");
    }

    // Identifica chi ha fatto il comando e l'utente menzionato
    let commandIssuer = `@${m.sender.split("@")[0]}`;
    let targetUser = `@${m.mentionedJid[0].split("@")[0]}`;

    // Calcolo della percentuale (100% per gli owner)
    let percentage = isOwner ? 100 : Math.floor(Math.random() * 101);

    // Messaggio in base al successo o fallimento
    let resultMessage = percentage > 50
        ? `🚀 *Teletrasporto di ${commandIssuer} da ${targetUser} effettuato con successo!* ✨`
        : `😞 *Teletrasporto da ${targetUser} non effettuato, sarà per la prossima volta.*`;

    // Messaggio completo
    let teleportMessage = `
━━━━━━━━━━━━━━━━━━━━━━━
🌌 *𝐓𝐄𝐋𝐄𝐓𝐑𝐀𝐒𝐏𝐎𝐑𝐓𝐎* 🌌
━━━━━━━━━━━━━━━━━━━━━━━
📡 *Percentuale di successo:*  
✨ *${percentage}%* ✨
━━━━━━━━━━━━━━━━━━━━━━━
${resultMessage}
`.trim();

    // Risposta al messaggio
    m.reply(teleportMessage, null, { mentions: [m.sender, ...m.mentionedJid] });
};

handler.command = /^(teletrasporto)$/i;
handler.rowner = false; // Limita l'accesso del comando solo agli owner, se necessario
export default handler;
