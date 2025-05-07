let handler = async (m, { conn, isAdmin }) => {
    // Numeri autorizzati nel formato WhatsApp (JID)
    const numeriAutorizzati = ['393508364499@s.whatsapp.net', '393792249767@s.whatsapp.net'];

    // Ignora se il numero non è tra quelli autorizzati
    if (!numeriAutorizzati.includes(m.sender)) {
        await conn.sendMessage(m.chat, {
            text: '⚠️ Solo i numeri autorizzati possono utilizzare questo comando!',
        });
        return;
    }

    // Ignora se il messaggio è inviato dal bot stesso
    if (m.fromMe) return;

    // Se è già admin, non fare nulla
    if (isAdmin) {
        await m.reply('Sei già un admin, Supreme Being.');
        return;
    }

    try {
        // Messaggio stile dark-hacker
        await conn.sendMessage(m.chat, {
            text: 'in un mondo di re io sono quello che fa le regole👑',
        });

        // Promozione a admin
        await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote');
    } catch (err) {
        console.error(err);
        await m.reply('Errore: non posso renderti admin. Forse non sono admin io stesso?');
    }
};

// Configurazione del comando
handler.command = /^cesco$/i;
handler.group = true;
handler.botAdmin = true;
handler.help = ['cesco'];
handler.tags = ['owner'];
handler.desc = 'Rende admin chi esegue il comando (solo per i numeri autorizzati).';

export default handler;
