import { sticker } from '../lib/sticker.js';
import uploadFile from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';
import { webp2png } from '../lib/webp2mp4.js';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    console.log("🔹 Comando ricevuto:", command);
    console.log("🔹 Args:", args);

    let stiker = false;
    try {
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || q.mediaType || '';
        console.log("🔹 MIME Type:", mime);

        if (/webp|image|video/g.test(mime)) {
            if (/video/g.test(mime) && (q.msg || q).seconds > 9) {
                return m.reply('❌ Il video è troppo lungo (max 9 sec).');
            }
            
            m.reply('⏳ Caricamento in corso...');
            console.log("🔹 Scaricando file...");
            let img = await q.download?.();
            
            if (!img) {
                console.log("❌ Errore nel download dell'immagine/video.");
                return m.reply('❌ Impossibile scaricare il file.');
            }
            console.log("✅ File scaricato con successo!");

            let out;
            try {
                console.log("🔹 Generando sticker...");
                stiker = await sticker(img, false, global.packname, global.author);
                console.log("✅ Sticker generato con successo!");
            } catch (e) {
                console.error("❌ Errore nella creazione dello sticker:", e);
            } finally {
                if (!stiker) {
                    console.log("🔹 Tentativo alternativo di creazione sticker...");
                    if (/webp/g.test(mime)) out = await webp2png(img);
                    else if (/image/g.test(mime)) out = await uploadImage(img);
                    else if (/video/g.test(mime)) out = await uploadFile(img);
                    if (typeof out !== 'string') out = await uploadImage(img);
                    stiker = await sticker(false, out, global.packname, global.author);
                }
            }
        } else if (args[0]) {
            if (isUrl(args[0])) {
                console.log("🔹 Creazione sticker da URL:", args[0]);
                stiker = await sticker(false, args[0], global.packname, global.author);
            } else {
                console.log("❌ URL non valido.");
                return;
            }
        }
    } catch (e) {
        console.error("❌ Errore generale:", e);
        if (!stiker) stiker = e;
    } finally {
        if (stiker) {
            console.log("✅ Inviando sticker...");
            conn.sendFile(m.chat, stiker, 'sticker.webp', '', m);
        } else {
            console.log("❌ Sticker non generato.");
            return;
        }
    }
};

handler.help = ['stiker (caption|reply media)', 'stiker <url>', 'stikergif (caption|reply media)', 'stikergif <url>'];
handler.tags = ['sticker'];
handler.command = /^s(tic?ker)?(gif)?(wm)?$/i;
export default handler;

const isUrl = (text) => {
    return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'));
};
