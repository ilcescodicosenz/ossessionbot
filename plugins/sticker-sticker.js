import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let stiker = false
  const utente = conn.getName(m.sender) // Ottiene il nome dell'utente
  const h = ``;
  const i = `Offerto da Cesco`

  try {     
    let q = m.quoted ? m.quoted : m // Verifica se il messaggio è una risposta
    let mime = (q.msg || q).mimetype || q.mediaType || '' // Ottiene il tipo MIME

    if (/webp|image|video/g.test(mime)) { // Controlla se è un'immagine, webp o video
      if (/video/g.test(mime)) if ((q.msg || q).seconds > 11) return m.reply('Massimo 10 secondi')

      let img = await q.download?.() // Scarica il file multimediale
      if (!img) throw `✳️ Rispondi a un'immagine o un video con *${usedPrefix + command}*`

      let out
      try {
        stiker = await sticker(img, false, h, i) // Converte in sticker
      } catch (e) {
        console.error(e)
      } finally {
        if (!stiker) { // Se la conversione non riesce, tenta altri metodi
          if (/webp/g.test(mime)) out = await webp2png(img)
          else if (/image/g.test(mime)) out = await uploadImage(img)
          else if (/video/g.test(mime)) out = await uploadFile(img)

          if (typeof out !== 'string') out = await uploadImage(img)
          stiker = await sticker(false, out, h, i)
        }
      }
    } else if (args[0]) { // Se l'utente fornisce un URL
      if (isUrl(args[0])) stiker = await sticker(false, args[0], global.packname, global.author)
      else return m.reply('URL non valido')
    }
  } catch (e) {
    console.error(e)
    if (!stiker) stiker = e
  } finally {
    if (stiker) conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    else throw `${mssg.stickError}`
  }
}

// Comandi per il bot
handler.help = ['sticker']
handler.tags = ['sticker']
handler.command = ['s', 'sticker'] 

export default handler

// Funzione per verificare se un testo è un URL valido di immagine
const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}

