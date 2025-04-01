import { Client, LocalAuth, MessageMedia } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const stickersPath = path.join(process.cwd(), 'stickers');

// Crea la cartella stickers se non esiste
if (!fs.existsSync(stickersPath)) {
    fs.mkdirSync(stickersPath);
}

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Scansiona il QR Code con WhatsApp per connetterti.');
});

client.on('ready', () => {
    console.log('Bot connesso e pronto all\'uso!');
});

const handler = async (msg) => {
    try {
        if (msg.body.startsWith('.s/sticker') && msg.hasMedia) {
            const media = await msg.downloadMedia();

            if (media.mimetype.startsWith('image/')) {
                const buffer = Buffer.from(media.data, 'base64');
                const fileName = `sticker_${Date.now()}.webp`;
                const outputPath = path.join(stickersPath, fileName);

                // Conversione dell'immagine in sticker formato webp
                await sharp(buffer)
                    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
                    .webp({ quality: 100 })
                    .toFile(outputPath);

                const stickerMedia = MessageMedia.fromFilePath(outputPath);
                await msg.reply(stickerMedia, msg.from, { sendMediaAsSticker: true });

                // Elimina il file temporaneo dopo l'invio
                fs.unlinkSync(outputPath);
                console.log(`Sticker creato e inviato con successo a ${msg.from}.`);
            } else {
                msg.reply('❌ Invia un\'immagine con il comando `.s/sticker`.');
            }
        }
    } catch (error) {
        console.error('Errore durante la creazione dello sticker:', error);
        msg.reply('❌ Si è verificato un errore durante la creazione dello sticker.');
    }
};

client.on('message', handler);

client.initialize();

export default handler;
