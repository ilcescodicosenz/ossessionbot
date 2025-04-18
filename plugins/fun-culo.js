let handler = async (m, { conn, usedPrefix }) => {
    let grandezze = [
        "🟢 Piccolo come una formica 🐜",
        "🔵 Normale, niente di speciale 😌",
        "🟠 Medio, ci passa un dito 🤏",
        "🔴 Grande! Ci passa una bottiglia d'acqua 🧴",
        "⚫ Molto grande!",
        "✨ Inesistente"
    ];

    let grandezzaCasuale = grandezze[Math.floor(Math.random() * grandezze.length)];
    let messaggio = "*Analizzando la situazione...*\n\n📏 *Risultato:* " + grandezzaCasuale;

    let opzioniInoltro = inoltra("NomeDelTuoBot"); // Sostituisci "NomeDelTuoBot"
    await conn.sendMessage(m.chat, { text: messaggio, ...opzioniInoltro }, { quoted: m });
};

const inoltra = (nomeDelBot) => {
    let messageOptions = {
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363387378860419@newsletter',
                serverMessageId: '',
                newsletterName: `${nomeDelBot}`
            }
        }
    };
    return messageOptions;
};

handler.command = ["analizza", "misura"];
handler.help = ["analizza", "misura"];
handler.tags = ["fun"];
handler.desc = "Analizza in modo casuale una 'grandezza'.";
export default handler;
