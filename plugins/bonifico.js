let db = {}; // Simulazione database soldi, collegalo al tuo sistema

let handler = async (m, { conn, args, text, mentionedJid }) => {
    let mittente = m.sender;
    
    // Controllo se l'utente ha menzionato qualcuno o ha risposto a un messaggio
    let destinatario = mentionedJid && mentionedJid.length > 0 ? mentionedJid[0] : m.quoted ? m.quoted.sender : null;

    if (!destinatario) {
        return m.reply("❌ Devi menzionare qualcuno o rispondere a un messaggio per inviare soldi!\n📌 Esempio: .bonifico @utente 500");
    }

    // Estrai l'importo dal messaggio, escludendo menzioni
    let importo = parseInt(args.find(arg => !arg.includes("@")));

    if (!importo || importo <= 0) {
        return m.reply("❌ Inserisci un importo valido! \n📌 Esempio: .bonifico @utente 500");
    }

    // Inizializza il database se gli utenti non esistono
    if (!db[mittente]) db[mittente] = 1000; // Saldo iniziale
    if (!db[destinatario]) db[destinatario] = 1000;

    // Controlla se il mittente ha abbastanza soldi
    if (db[mittente] < importo) {
        return m.reply("💰 Non hai abbastanza soldi per effettuare il bonifico!");
    }

    // Effettua il bonifico
    db[mittente] -= importo;
    db[destinatario] += importo;

    let messaggio = 🏦 *Bonifico effettuato con successo!*\n\n💸 *Mittente:* @${mittente.split('@')[0]}\n💰 *Destinatario:* @${destinatario.split('@')[0]}\n💲 *Importo:* ${importo}$\n\n📊 *Nuovo saldo di @${mittente.split('@')[0]}:* ${db[mittente]}$\n📊 *Nuovo saldo di @${destinatario.split('@')[0]}:* ${db[destinatario]}$;

    await conn.sendMessage(m.chat, { text: messaggio, mentions: [mittente, destinatario] }, { quoted: m });
};

handler.command = ["bonifico"];
handler.category = "economia";
handler.desc = "Invia soldi virtuali a un altro utente 💸";

export default handler;
