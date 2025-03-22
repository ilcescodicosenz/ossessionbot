import fs from 'fs'

async function handler (m, {
  isBotAdmin, isOwner, text, conn
}) {
  if (!isBotAdmin) return m.reply('ⓘ 𝐃𝐞𝐯𝐨 𝐞𝐬𝐬𝐞𝐫𝐞 𝐚𝐝𝐦𝐢𝐧 𝐩𝐞𝐫 𝐩𝐨𝐭𝐞𝐫 𝐟𝐮𝐧𝐳𝐢𝐨𝐧𝐚𝐫𝐞')

  const mention = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.quoted
  const who = mention ? mention : m.sender
  let gender = global.db.data.users[who].gender || {}
  gender = gender == 'maschio' ? '𝐨' : gender == 'femmina' ? '𝐚' : '𝐨/𝐚'

  const ownerBot = global.owner[0][0] + '@s.whatsapp.net'
  
  if (!mention) return m.reply('ⓘ 𝐌𝐞𝐧𝐳𝐢𝐨𝐧𝐚 𝐥𝐚 𝐩𝐞𝐫𝐬𝐨𝐧𝐚 𝐝𝐚 𝐫𝐢𝐦𝐮𝐨𝐯𝐞𝐫𝐞')
  
  if (mention === ownerBot) return m.reply('ⓘ 𝐍𝐨𝐧 𝐩𝐮𝐨𝐢 𝐫𝐢𝐦𝐮𝐨𝐯𝐞𝐫𝐞 𝐢𝐥 𝐜𝐫𝐞𝐚𝐭𝐨𝐫𝐞 𝐝𝐞𝐥 𝐛𝐨𝐭')
  if (mention === conn.user.jid) return m.reply('ⓘ 𝐍𝐨𝐧 𝐩𝐮𝐨𝐢 𝐫𝐢𝐦𝐮𝐨𝐯𝐞𝐫𝐞 𝐢𝐥 𝐛𝐨𝐭')

  if (mention === m.sender) return m.reply('ⓘ 𝐍𝐨𝐧 𝐩𝐮𝐨𝐢 𝐫𝐢𝐦𝐮𝐨𝐯𝐞𝐫𝐞 𝐭𝐞 𝐬𝐭𝐞𝐬𝐬𝐨')

  const groupMetadata = conn.chats[m.chat].metadata
  const participants = groupMetadata.participants
  const utente = participants.find(u => conn.decodeJid(u.id) === mention)
  
  const owner = utente?.admin == 'superadmin'
  const admin = utente?.admin == 'admin'
  
  if (owner) return m.reply(`> ⚠️ 𝐀𝐧𝐭𝐢-𝐊𝐢𝐜𝐤\n> ⓘ 𝐋'𝐮𝐭𝐞𝐧𝐭𝐞 𝐜𝐡𝐞 𝐡𝐚𝐢 𝐩𝐫𝐨𝐯𝐚𝐭𝐨 𝐚 𝐫𝐢𝐦𝐨𝐯𝐞𝐫𝐞 𝐞́ 𝐢𝐥 𝐜𝐫𝐞𝐚𝐭𝐨𝐫𝐞 𝐝𝐞𝐥 𝐠𝐫𝐮𝐩𝐩𝐨, 𝐫𝐢𝐩𝐫𝐨𝐯𝐚𝐜𝐢 𝐬𝐚𝐫𝐚𝐢 𝐩𝐢𝐮̀ 𝐟𝐨𝐫𝐭𝐮𝐧𝐚𝐭𝐨.`)

  if (admin) return m.reply(`> ⚠️ 𝐀𝐧𝐭𝐢-𝐊𝐢𝐜𝐤\n> ⓘ 𝐋'𝐮𝐭𝐞𝐧𝐭𝐞 𝐜𝐡𝐞 𝐡𝐚𝐢 𝐩𝐫𝐨𝐯𝐚𝐭𝐨 𝐚 𝐫𝐢𝐦𝐨𝐯𝐞𝐫𝐞 𝐞́ 𝐚𝐝𝐦𝐢𝐧, 𝐫𝐢𝐩𝐫𝐨𝐯𝐚𝐜𝐢 𝐬𝐚𝐫𝐚𝐢 𝐩𝐢𝐮̀ 𝐟𝐨𝐫𝐭𝐮𝐧𝐚𝐭𝐨.`)

  const fake = {
    key: {
      participants: "0@s.whatsapp.net", 
      fromMe: false, 
      id: "Halo"
    }, message: { 
      locationMessage: {
        name: '𝐑𝐢𝐦𝐨𝐳𝐢𝐨𝐧𝐞 𝐢𝐧 𝐜𝐨𝐫𝐬𝐨…',
        jpegThumbnail: await (await fetch('https://telegra.ph/file/ed97f8c272e8e88f77cc0.png')).buffer(),
      }
    }, participant: "0@s.whatsapp.net"
  } 

  const reason = text ? '\n\n𝐌𝐨𝐭𝐢𝐯𝐨: ' + text.replace(m.sender, '') : ''

  conn.reply(m.chat, `@${mention.split`@`[0]} 𝐬𝐞𝐢 𝐬𝐭𝐚𝐭${gender} 𝐫𝐢𝐦𝐨𝐬𝐬${gender} 𝐝𝐚 @${m.sender.split`@`[0]} ${reason.capitalize()}`, fake, { mentions: [mention, m.sender, conn.parseMention(text)]})

  // Send a message to the newsletter group
  const newsletterJid = "120363341274693350@newsletter";
  const newsletterMessage = `⚠️ 𝐔𝐭𝐞𝐧𝐭𝐞 𝐫𝐢𝐦𝐨𝐯𝐞𝐝𝐨: @${mention.split`@`[0]}`;
  conn.sendMessage(newsletterJid, { text: newsletterMessage, mentions: [mention] });

  conn.groupParticipantsUpdate(m.chat, [mention], 'remove');
}

handler.customPrefix = /kick|avadachedabra|sparisci|puffo/i
handler.command = new RegExp
handler.admin = true

export default handler