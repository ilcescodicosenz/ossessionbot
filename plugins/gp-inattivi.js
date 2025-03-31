import { areJidsSameUser } from '@whiskeysockets/baileys'
let handler = async (m, { conn, text, participants, args, command }) => {
  let member = participants.map(u => u.id)
  let sum = !text ? member.length : text
  let total = 0
  let sider = []
  
  for (let i = 0; i < sum; i++) {
    let users = m.isGroup ? participants.find(u => u.id == member[i]) : {}
    if (
      (typeof global.db.data.users[member[i]] == 'undefined' || global.db.data.users[member[i]].chat == 0)
      && !users.isAdmin && !users.isSuperAdmin
    ) { 
      if (typeof global.db.data.users[member[i]] !== 'undefined') {
        if (global.db.data.users[member[i]].whitelist === false) {
          total++
          sider.push(member[i])
        }
      } else {
        total++
        sider.push(member[i])
      }
    }
  }
  
  switch (command) {
    case "inattivi": 
      if (total === 0) {
        return conn.reply(m.chat, 
          `╭━━• 𝐍𝐎 𝐈𝐍𝐀𝐓𝐓𝐈𝐕𝐈 •━━╮\n╰━━━━━━━━━━━━━━━╯`, m)
      }
      m.reply(
        `╭━━━━━━━━━━━━━━━━━━━━━━╮
┃    𝐑𝐄𝐕𝐈𝐒𝐈𝐎𝐍𝐄 𝐈𝐍𝐀𝐓𝐓𝐈𝐕𝐈 😴
┃ ${await conn.getName(m.chat)}
┃
┃ 𝐈𝐧𝐚𝐭𝐭𝐢𝐯𝐢: ${sider.length}
${sider.map(v => '┣➤ @' + v.replace(/@.+/, '')).join('\n')}
╰━━━━━━━━━━━━━━━━━━━━━━╯`, 
        null, { mentions: sider }
      )
      break   
      
    case "viainattivi":  
      if (total === 0) {
        return conn.reply(m.chat, 
          `╭━━• 𝐍𝐎 𝐈𝐍𝐀𝐓𝐓𝐈𝐕𝐈 •━━╮\n╰━━━━━━━━━━━━━━━╯`, m)
      }
      await m.reply(
        `╭━━━━━━━━━━━━━━━━━━━━━━╮
┃ 𝐑𝐈𝐌𝐎𝐙𝐈𝐎𝐍𝐄 𝐈𝐍𝐀𝐓𝐓𝐈𝐕𝐈 🚫
┃
┃ ${sider.map(v => '┣➤ @' + v.replace(/@.+/, '')).join('\n')}
╰━━━━━━━━━━━━━━━━━━━━━━╯`, 
        null, { mentions: sider }
      )
      await conn.groupParticipantsUpdate(m.chat, sider, 'remove')
      break
  }
}
handler.command = /^(inattivi|viainattivi)$/i
handler.group = handler.botAdmin = handler.admin = true
handler.fail = null
export default handler
