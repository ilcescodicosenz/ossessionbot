import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'

let handler = async (m, { conn, args }) => {
  let stiker = false
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''

    if (/webp|image|video/.test(mime)) {
      if (/video/.test(mime) && (q.msg || q).seconds > 9) return m.reply('🎥 Il video non può superare i 9 secondi!')
      m.reply('ⓘ 𝐂𝐚𝐫𝐢𝐜𝐚𝐦𝐞𝐧𝐭𝐨 ...')

      let img = await q.download?.()
      if (!img) return m.reply('❌ Non sono riuscito a scaricare il file.')

      try {
        stiker = await sticker(img, false, global.packname, global.author)
      } catch (e) {
        console.error('[STICKER FAIL FISICO]', e)
        let out
        if (/webp/.test(mime)) out = await webp2png(img)
        else if (/image/.test(mime)) out = await uploadImage(img)
        else if (/video/.test(mime)) out = await uploadFile(img)
        if (typeof out !== 'string') out = await uploadImage(img)
        stiker = await sticker(false, out, global.packname, global.author)
      }

    } else if (args[0] && isUrl(args[0])) {
      stiker = await sticker(false, args[0], global.packname, global.author)
    } else {
      return m.reply('❌ Invia un\'immagine/video (massimo 9s) o un link diretto a un\'immagine valida.')
    }
  } catch (e) {
    console.error('[STICKER FINAL FAIL]', e)
    if (!stiker) stiker = e
  } finally {
    if (stiker) {
      await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    } else {
      m.reply('❌ Impossibile creare lo sticker.')
    }
  }
}

handler.help = ['sticker', 'sticker <url>', 'stikergif', 'stikergif <url>']
handler.tags = ['sticker']
handler.command = /^s(tic?ker)?(gif)?(wm)?$/i
export default handler

const isUrl = (text = '') => {
  return /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(text)
}
