function parseTime(time) {
    let match = time.match(/^(\d+)(s|m|h)$/); // Regex per trovare numero + unità (s, m, h)
    if (!match) return null;

    let value = parseInt(match[1]);
    let unit = match[2];

    if (unit === 's') return value * 1000; // Secondi -> millisecondi
    if (unit === 'm') return value * 60 * 1000; // Minuti -> millisecondi
    if (unit === 'h') return value * 60 * 60 * 1000; // Ore -> millisecondi

    return null;
}

let handler = async (m, { conn, text, isAdmin, isBotAdmin }) => {
    if (!isAdmin) return conn.reply(m.chat, "⚠️ Solo gli amministratori possono usare questo comando.", m);
    if (!isBotAdmin) return conn.reply(m.chat, "⚠️ Ho bisogno dei permessi di amministratore per impostare la modalità lenta.", m);

    if (!text) return conn.reply(m.chat, "⚠️ Usa il comando così: `.slowmode <tempo>`\nEsempio: `.slowmode 10s` per 10 secondi.", m);

    let durata = parseTime(text);
    if (!durata) return conn.reply(m.chat, "⚠️ Tempo non valido. Usa un formato come `10s`, `1m`, o `30s`.", m);

    await conn.groupSettingUpdate(m.chat, 'slowmode', durata / 1000);
    conn.reply(m.chat, `🕐 *Modalità lenta attivata!* Ogni partecipante potrà inviare un messaggio ogni ${text}.`, m);
};

handler.command = ['slowmode'];
handler.tags = ['group'];
handler.help = ['.slowmode <tempo>'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
