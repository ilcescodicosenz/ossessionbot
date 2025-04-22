let { downloadContentFromMessage } = (await import('@whiskeysockets/baileys'));

let handler = async (m, { conn }) => {
    try {
        if (!m.quoted) throw '⚠️ Rispondi a un messaggio con una foto o video "Visualizza una sola volta".';

        let viewOnce = m.quoted.message?.viewOnceMessageV2?.message;
        if (!viewOnce) throw '⚠️ Il messaggio non è "Visualizza una sola volta".';

        let type = Object.keys(viewOnce)[0];
        let media = viewOnce[type];

        console.log('Tipo:', type);
        console.log('Media:', media);

        let mediaStream = await downloadContentFromMessage(media, type.includes('image') ? 'image' : 'video');
        let buffer = Buffer.from([]);

        for await (const chunk of mediaStream) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        if (buffer.length === 0) throw '❌ Errore nel download del file.';

        let fileType = /video/.test(type) ? 'media.mp4' : 'media.jpg';
        return conn.sendFile(m.chat, buffer, fileType, media.caption || '', m);
    } catch (err) {
        console.error('Errore:', err);
        m.reply('⚠️ Errore durante il recupero del file. Assicurati che sia una foto/video "Visualizza una sola volta".');
    }
};

handler.help = ['readvo'];
handler.tags = ['tools'];
handler.command = ['readviewonce', 'nocap', 'rivela', 'readvo'];
handler.group = true;

export default handler;

