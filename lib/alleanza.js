let handler = async function (m, { conn, text, usedPrefix }) {
    
    let alleanza = global.db.data.alleanze[m.chat]; // Modificato per lavorare con "alleanze"
    if (!alleanza || alleanza.rules === '') {
        throw `ⓘ l'owner non ha impostato nessun tipo di alleanza`;
    }
    m.reply(`Alleanza*\n\n${alleanza.rules}`); // Testo personalizzato
};
handler.help = ['rules'];
handler.tags = ['alleanza'];
handler.command = ['alleanza'];
handler.admin = true;

export default handler;