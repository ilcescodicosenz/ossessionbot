import { generateWAMessageFromContent } from '@whiskeysockets/baileys'

let handler = async (m, { conn, text, participants }) => {
  try {
    let users = participants.map(u => conn.decodeJid(u.id))
    let q = m.quoted ? m.quoted : m
    let c = m.quoted ? await m.getQuotedObj() : m
    let tagger = '@' + m.sender.split('@')[0]

    let tagText = text?.trim()
      ? `${text.trim()}\n\nTag by ${tagger}`
      : q.text
        ? `${q.text}\n\nTag by ${tagger}`
        : `Tag by ${tagger}`

    let mime = (q.msg || q).mimetype || ''
    let isMedia = /image|video|sticker|audio/.test(mime)

    let replyTarget = q.quoted ? q.quoted : m  

    if (isMedia) {
      let media = await q.download?.()
      if (q.mtype === 'imageMessage') {
        return await conn.sendMessage(m.chat, { image: media, caption: tagText, mentions: users }, { quoted: replyTarget })
      } else if (q.mtype === 'videoMessage') {
        return await conn.sendMessage(m.chat, { video: media, caption: tagText, mimetype: 'video/mp4', mentions: users }, { quoted: replyTarget })
      } else if (q.mtype === 'audioMessage') {
        return await conn.sendMessage(m.chat, { audio: media, mimetype: 'audio/mp4', fileName: `hidetag.mp3`, mentions: users }, { quoted: replyTarget })
      } else if (q.mtype === 'stickerMessage') {
        return await conn.sendMessage(m.chat, { sticker: media, mentions: users }, { quoted: replyTarget })
      }
    }

    let msg = conn.cMod(
      m.chat,
      generateWAMessageFromContent(
        m.chat,
        {
          extendedTextMessage: {
            text: tagText,
            contextInfo: { mentionedJid: users }
          }
        },
        {}
      ),
      tagText,
      conn.user.jid
    )

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
  } catch (e) {
    console.error('Errore .tag:', e)
  }
}

handler.command = /^(hidetagown|tagown)$/i
handler.group = true
handler.rowner = true
handler.botAdmin = true

export default handler
