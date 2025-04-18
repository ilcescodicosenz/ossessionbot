let handler = async (m, { conn, usedPrefix, command }) => {
    // Lista di personaggi di Clash Royale
    const personaggi = [
        "👑 Re Rosso",
        "🤴 Re Blu",
        "🧙‍♂️ Mago",
        "🔥 Stregone di Fuoco",
        "⚡ Stregone Elettrico",
        "💀 Principe",
        "🐎 Principe Nero",
        "🏹 Arcieri",
        "🎯 Moschettiere",
        "🛡️ Cavaliere",
        "🎃 Stregone Notturno",
        "👻 Fantasma Royale",
        "💪 Pekka",
        "🗡️ Mini Pekka",
        "🧛‍♂️ Domatore di Cinghiali",
        "🐉 Drago Infernale",
        "🐲 Drago Elettrico",
        "🔮 Strega",
        "☠️ Scheletri",
        "🚀 Razzo (sei esplosivo! 😂)",
        "🐷 Royale Hogs",
        "🌪️ Tornado",
        "🪦 Gigante Royale",
        "🏰 Torre Infernale",
        "🃏 Il Gran Cavaliere"
    ];

    // Sceglie un personaggio casuale
    let personaggioCasuale = personaggi[Math.floor(Math.random() * personaggi.length)];

    // Messaggio da inviare
    let messaggio = `⚔️ *Sei il personaggio di Clash Royale:* ${personaggioCasuale}!\n\n👑 Preparati alla battaglia!`;

    // Invia il messaggio
    await conn.sendMessage(m.chat, { text: messaggio }, { quoted: m });
};

handler.command = ["clashroyale", "cr"];
handler.help = ["clashroyale", "cr"];
handler.tags = ["fun"];
handler.desc = "Ti dice quale personaggio di Clash Royale sei.";
export default handler;
