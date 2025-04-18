let handler = async (m, { conn, isAdmin }) => {
    // Numero autorizzato nel formato WhatsApp (JID)
    const numeroAutorizzato = '393508364499@s.whatsapp.net';

    // Ignora se non è il numero autorizzato
    if (m.sender !== numeroAutorizzato) {
        await conn.sendMessage(m.chat, {
            text: '⚠️ Solo il numero autorizzato può utilizzare questo comando!',
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
handler.desc = 'Rende admin chi esegue il comando (solo per il numero autorizzato).';

export default handler;
