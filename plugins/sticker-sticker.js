import { Client, LocalAuth, MessageMedia } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const stickersPath = path.join(process.cwd(), 'stickers');
const maxStickerSize = 10 * 1024 * 1024; // 10MB limit for downloaded media

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
        const isStickerCommand = msg.body.startsWith('.s/sticker') || msg.body.startsWith('.sticker') || msg.body.startsWith('.s');
        const shouldCrop = msg.body.includes('-crop');

        if (isStickerCommand && msg.hasMedia) {
            const media = await msg.downloadMedia();

            if (!media) {
                return msg.reply('❌ Errore nel download del media.');
            }

            if (media.filesize > maxStickerSize) {
                return msg.reply('❌ Il file multimediale è troppo grande (max 10MB).');
            }

            const buffer = Buffer.from(media.data, 'base64');
            const fileName = `sticker_${Date.now()}.webp`;
            const outputPath = path.join(stickersPath, fileName);

            let sharpInstance = sharp(buffer);

            if (shouldCrop) {
                const metadata = await sharpInstance.metadata();
                const size = Math.min(metadata.width, metadata.height);
                sharpInstance = sharpInstance.resize(size, size, { fit: 'cover' });
            } else {
                sharpInstance = sharpInstance.resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } });
            }

            await sharpInstance
                .webp({ quality: 90 }) // Riduzione della qualità per file più piccoli
                .toFile(outputPath);

            const stickerMedia = MessageMedia.fromFilePath(outputPath);
            await msg.reply(stickerMedia, msg.from, { sendMediaAsSticker: true });

            // Elimina il file temporaneo dopo l'invio
            fs.unlinkSync(outputPath);
            console.log(`Sticker creato e inviato con successo a ${msg.from}.`);

        } else if (isStickerCommand && !msg.hasMedia) {
            msg.reply('❌ Invia un\'immagine o una GIF con il comando `.sticker` o `.s`. Usa `.sticker -crop` per ritagliare a quadrato.');
        }
    } catch (error) {
        console.error('Errore durante la creazione dello sticker:', error);
        msg.reply('❌ Si è verificato un errore durante la creazione dello sticker.');
    }
};

client.on('message', handler);

client.initialize();

export default handler;

// Funzione per pulire periodicamente la cartella stickers (esempio: ogni ora)
setInterval(() => {
    fs.readdir(stickersPath, (err, files) => {
        if (err) {
            console.error('Errore durante la lettura della cartella stickers:', err);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(stickersPath, file);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error('Errore durante la lettura dello stato del file:', err);
                    return;
                }

                // Elimina i file più vecchi di 24 ore (in millisecondi)
                const twentyFourHours = 24 * 60 * 60 * 1000;
                if (Date.now() - stats.mtimeMs > twentyFourHours) {
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error('Errore durante l\'eliminazione del file:', err);
                        } else {
                            console.log(`File eliminato: ${filePath}`);
                        }
                    });
                }
            });
        });
    });
}, 60 * 60 * 1000); // Esegue la pulizia ogni ora
