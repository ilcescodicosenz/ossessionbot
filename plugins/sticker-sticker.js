import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let stiker = false;
    try {
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || q.mediaType || '';

        if (/webp|image|video/g.test(mime)) {
            if (/video/g.test(mime) && (q.msg || q).seconds > 9) {
                return m.reply('❌ Il video deve essere massimo 9 secondi!');
            }

            m.reply('⏳ *Sto creando lo sticker...*');

            let img = await q.download?.();
            if (!img) return m.reply('❌ Errore nel download del file.');

            let out;
            try {
                stiker = await sticker(img, false, global.packname, global.author);
            } catch (e) {
                console.error(e);
            }

            if (!stiker) {
                try {
                    if (/webp/g.test(mime)) out = await webp2png(img);
                    else if (/image/g.test(mime)) out = await uploadImage(img);
                    else if (/video/g.test(mime)) out = await uploadFile(img);
                    
                    if (typeof out !== 'string') out = await uploadImage(img);

                    // ❗️ Qui era sbagliato! Manca `await`
                    stiker = await sticker(false, out, global.packname, global.author);
                } catch (e) {
                    console.error(e);
                }
            }
        } else if (args[0]) {
            if (isUrl(args[0])) {
                stiker = await sticker(false, args[0], global.packname, global.author);
            } else {
                return m.reply('❌ URL non valido.');
            }
        }
    } catch (e) {
        console.error(e);
        stiker = false;
    } finally {
        if (stiker) {
            await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m);
        } else {
            return m.reply('❌ Errore nella creazione dello sticker.');
        }
    }
}

handler.help = ['sticker (caption|reply media)', 'sticker <url>', 'stikergif (caption|reply media)', 'stikergif <url>'];
handler.tags = ['sticker'];
handler.command = /^s(tic?ker)?(gif)?(wm)?$/i;

export default handler;

const isUrl = (text) => {
    return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'));
}
