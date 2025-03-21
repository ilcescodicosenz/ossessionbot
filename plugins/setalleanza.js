let handler = async function (m, { conn, text, usedPrefix }) {
    
    let alleanza = global.db.data.alleanze[m.chat]; // Modificato per lavorare con "alleanze"
    if (!alleanza) {
        global.db.data.alleanze[m.chat] = {}; // Inizializza l'oggetto se non esiste
        alleanza = global.db.data.alleanze[m.chat];
    }
    if (text) {
        alleanza.rules = text; // Salva le regole dell'Alleanza
        m.reply(`ⓘ Alleanza impostate con successo:\n\n${text}`);
    } else {
        throw `ⓘ Nessuna Alleanza settata.`;
    }
};
handler.help = ['setalleanza <text>'];
handler.tags = ['alleanza'];
handler.command = ['setalleanza'];
handler.group = true;
handler.admin = true;
handler.rowner = true;

export default handler;