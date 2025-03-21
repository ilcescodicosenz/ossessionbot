let handler = async (m, { conn, text, isAdmin, isBotAdmin }) => {
    if (!isAdmin) return conn.reply(m.chat, "⚠️ Solo gli amministratori possono usare questo comando.", m);
    if (!isBotAdmin) return conn.reply(m.chat, "⚠️ Ho bisogno dei permessi di amministratore per chiudere il gruppo.", m);

    let [tempo] = text.split(' ');
    if (!tempo) return conn.reply(m.chat, "⚠️ Usa il comando così: `.closetime <tempo>`\nEsempio: `.closetime 10m` per 10 minuti.", m);

    // Converti il tempo in millisecondi
    let durata = parseTime(tempo);
    if (!durata) return conn.reply(m.chat, "⚠️ Tempo non valido. Usa un formato come `10m`, `1h` o `30s`.", m);

    await conn.groupSettingUpdate(m.chat, 'announcement'); // Chiudi il gruppo
    conn.reply(m.chat, `🔒 *𝐂𝐇𝚲𝐓 𝐏𝚵𝐑 𝐆𝐋𝕀 𝐃𝚵𝕀*\n*𝐂𝐇𝚲𝐓 𝐏𝚵𝐑 𝕀𝐋 𝐏Ꮻ𝐏Ꮻ𝐋Ꮻ 𝐓𝐑𝚲* ${tempo}.`, m);

    // Riapre il gruppo dopo il tempo specificato
    setTimeout(async () => {
        await conn.groupSettingUpdate(m.chat, 'not_announcement'); // Riapri il gruppo
        conn.reply(m.chat, "🔓 *𝐂𝐇𝚲𝐓 𝚲𝐏𝚵𝐑𝐓𝚲*\n *𝐏𝚲𝐑𝐋𝚲𝐓𝚵 𝐏Ꮻ𝐏Ꮻ𝐋Ꮻ*.", m);
    }, durata);
};

// Funzione per convertire il tempo in millisecondi
function parseTime(time) {
    let match = time.match(/^(\d+)([smhd])$/); // Esempio: 10m, 1h
    if (!match) return null;

    let value = parseInt(match[1]);
    let unit = match[2];

    switch (unit) {
        case 's': return value * 1000;         // secondi
        case 'm': return value * 60 * 1000;   // minuti
        case 'h': return value * 60 * 60 * 1000; // ore
        case 'd': return value * 24 * 60 * 60 * 1000; // giorni
        default: return null;
    }
}

handler.command = ['closetime'];
handler.tags = ['group'];
handler.help = ['.closetime <tempo>'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;