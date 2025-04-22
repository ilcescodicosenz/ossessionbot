let { downloadContentFromMessage } = (await import('@whiskeysockets/baileys'));

let handler = async (m, { conn, isOwner, isAdmin }) => {
    try {
        if (!m.quoted) throw '⚠️ Rispondi a un messaggio con una foto o un video "Visualizza una sola volta".';
        if (m.quoted.mtype !== 'viewOnceMessageV2') throw '⚠️ Il messaggio non è "Visualizza una sola volta".';

        // Verifica se l'utente è l'owner o un admin del bot
        const canRead = isOwner || isAdmin;
        if (!canRead) {
            throw '⚠️ Solo l\'owner o gli amministratori del bot possono usare questo comando.';
        }

        let msg = m.quoted.message;
        let type = Object.keys(msg)[0];

        console.log('Messaggio ricevuto:', msg);

        let mediaStream = await downloadContentFromMessage(msg[type], type === 'imageMessage' ? 'image' : 'video');
        let buffer = Buffer.from([]);

        for await (const chunk of mediaStream) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        console.log('Lunghezza buffer:', buffer.length);

        if (buffer.length === 0) throw '❌ Errore nel download del file.';

        let fileType = /video/.test(type) ? 'media.mp4' : 'media.jpg';
        return conn.sendFile(m.chat, buffer, fileType, msg[type].caption || '', m);
    } catch (err) {
        console.error('Errore:', err);
        m.reply('⚠️ Errore durante il recupero del file. Assicurati che sia una foto/video "Visualizza una sola volta".');
    }
};

handler.help = ['readvo'];
handler.tags = ['tools'];
handler.command = ['readviewonce', 'nocap', 'rivela', 'readvo'];

export default handler;
