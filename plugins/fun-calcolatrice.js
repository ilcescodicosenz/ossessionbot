import jimp from "jimp"
import { generateWAMessageFromContent } from "@whiskeysockets/baileys"
import fs from "fs"
let handler = async (m, { conn, command, text, usedPrefix }) => {
if (!text) 
if (!m.mentionedJid[0] && !m.quoted) return 
  const mention = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.quoted
if (command == 'gay') {

      let image
      try {
          const background = await jimp.read("./icone/lgbt.png")
          const picture = await jimp.read(await conn.profilePictureUrl(mention ? mention : m.sender, 'image'))
          image = 
          await background.composite(picture.resize(518, 518), 0, 0, {
              mode: 'dstOver', 
              opacitySource: 1, 
              opacityDest: 1
          }).getBufferAsync('image/png')
      } catch { 
          image = fs.readFileSync("./icone/lgbt.jpg")
      }

      const format = generateWAMessageFromContent(m.chat, {
          extendedTextMessage: {
              text: ("@") + (mention ? mention : m.sender).split("@")[0] + (mention ? " é " : " 𝐬𝐞𝐢 ") + ("𝐠𝐚𝐲 𝐚𝐥 ") + Math.floor(Math.random() * 100) + ("%"), 
              contextInfo: { 
                  externalAdReply: { 
                      title: await conn.getName(mention ? mention : m.sender), 
                      thumbnail: image, 
                      sourceUrl: "https://wa.me/" + (mention ? mention.split("@")[0] : m.sender.split("@")[0])
                  }, mentionedJid: [mention, m.sender] 
              }
          }
      }, { quoted: null })

      conn.relayMessage(m.chat, format.message, { messageId: format.key.id })

  }

  //════════════ ೋೋ ════════════

if (command == 'terrone') {
conn.reply(m.chat, `
${text} è 𝐭𝐞𝐫𝐫𝐨𝐧𝐞 𝐚𝐥 ${(100).getRandom()}% 🦍`.trim(), m, m.mentionedJid ? {
mentions: m.mentionedJid
} : {})}

  //════════════ ೋೋ ════════════


if (command == 'nerd') {
conn.reply(m.chat, `
${text} è 𝐧𝐞𝐫𝐝 𝐚𝐥 ${(100).getRandom()}% 🤓
`.trim(), m, m.mentionedJid ? {
mentions: m.mentionedJid
} : {})}

  //════════════ ೋೋ ════════════


if (command == 'frocio') {
  let image
      try {
          const background = await jimp.read("./icone/lgbt.png")
          const picture = await jimp.read(await conn.profilePictureUrl(mention ? mention : m.sender, 'image'))
          image = 
          await background.composite(picture.resize(518, 518), 0, 0, {
              mode: 'dstOver', 
              opacitySource: 1, 
              opacityDest: 1
          }).getBufferAsync('image/png')
      } catch { 
          image = fs.readFileSync("./icone/lgbt.jpg")
      }

      const format = generateWAMessageFromContent(m.chat, {
          extendedTextMessage: {
              text: ("@") + (mention ? mention : m.sender).split("@")[0] + (mention ? " é " : " 𝐬𝐞𝐢 ") + ("𝐟𝐫𝐨𝐜𝐢𝐨 𝐚𝐥 ") + Math.floor(Math.random() * 100) + ("%"), 
              contextInfo: { 
                  externalAdReply: { 
                      title: await conn.getName(mention ? mention : m.sender), 
                      thumbnail: image, 
                      sourceUrl: "https://wa.me/" + (mention ? mention.split("@")[0] : m.sender.split("@")[0])
                  }, mentionedJid: [mention, m.sender] 
              }
          }
      }, { quoted: null })

      conn.relayMessage(m.chat, format.message, { messageId: format.key.id })

  } 


  //════════════ ೋೋ ════════════

if (command == 'lesbica') {
  let image
  try {
      const background = await jimp.read("./icone/lgbt.png")
      const picture = await jimp.read(await conn.profilePictureUrl(mention ? mention : m.sender, 'image'))
      image = 
      await background.composite(picture.resize(518, 518), 0, 0, {
          mode: 'dstOver', 
          opacitySource: 1, 
          opacityDest: 1
      }).getBufferAsync('image/png')
  } catch { 
      image = fs.readFileSync("./icone/lgbt.jpg")
  }

  const format = generateWAMessageFromContent(m.chat, {
      extendedTextMessage: {
          text: ("@") + (mention ? mention : m.sender).split("@")[0] + (mention ? " é " : " 𝐬𝐞𝐢 ") + ("𝐥𝐞𝐬𝐛𝐢𝐜𝐚 𝐚𝐥 ") + Math.floor(Math.random() * 100) + ("%"), 
          contextInfo: { 
              externalAdReply: { 
                  title: await conn.getName(mention ? mention : m.sender), 
                  thumbnail: image, 
                  sourceUrl: "https://wa.me/" + (mention ? mention.split("@")[0] : m.sender.split("@")[0])
              }, mentionedJid: [mention, m.sender] 
          }
      }
  }, { quoted: null })

  conn.relayMessage(m.chat, format.message, { messageId: format.key.id })

  }

  //════════════ ೋೋ ════════════


if (command == 'nero') {
conn.reply(m.chat, `
${text} è 𝐧𝐞𝐫𝐨 𝐚𝐥 ${(100).getRandom()}% ⚫
`.trim(), m, m.mentionedJid ? {
mentions: m.mentionedJid
} : {})} 

  //════════════ ೋೋ ════════════


if (command == 'nera') {
conn.reply(m.chat, `
${text} è 𝐧𝐞𝐫𝐚 𝐚𝐥 ${(100).getRandom()}% ⚫
`.trim(), m, m.mentionedJid ? {
mentions: m.mentionedJid
} : {})}


  //════════════ ೋೋ ════════════

if (command == 'anoressica') {
conn.reply(m.chat, `
${text} è 𝐚𝐧𝐨𝐫𝐞𝐬𝐬𝐢𝐜𝐚 𝐚𝐥 ${(100).getRandom()}%
`.trim(), m, m.mentionedJid ? {
mentions: m.mentionedJid
} : {})}


  //════════════ ೋೋ ════════════

  if (command == 'anoressico') {
  conn.reply(m.chat, `
  ${text} è 𝐚𝐧𝐨𝐫𝐞𝐬𝐬𝐢𝐜𝐨 𝐚𝐥 ${(100).getRandom()}%
  `.trim(), m, m.mentionedJid ? {
  mentions: m.mentionedJid
  } : {})}


    //════════════ ೋೋ ════════════

if (command == 'puttana') {
conn.reply(m.chat, `
${text} è 𝐩𝐮𝐭𝐭𝐚𝐧𝐚 𝐚𝐥 ${(100).getRandom()}% 🔞
`.trim(), m, m.mentionedJid ? {
mentions: m.mentionedJid
} : {})}   


  //════════════ ೋೋ ════════════

if (command == 'random') {
conn.reply(m.chat, `
${text} è 𝐫𝐚𝐧𝐝𝐨𝐦 𝐚𝐥 ${(100).getRandom()}%  
`.trim(), m, m.mentionedJid ? {
mentions: m.mentionedJid
} : {})}   

//════════════ ೋೋ ════════════

  if (command == 'criminale') {
  conn.reply(m.chat, `
  ${text} è 𝐜𝐫𝐢𝐦𝐢𝐧𝐚𝐥𝐞 𝐚𝐥 ${(100).getRandom()}% 🦹🏻‍♀️ 
  `.trim(), m, m.mentionedJid ? {
  mentions: m.mentionedJid
  } : {})}   

  //════════════ ೋೋ ════════════

  if (command == 'snitch') {
  conn.reply(m.chat, `
  ${text} è 𝐬𝐧𝐢𝐭𝐜𝐡 𝐚𝐥 ${(100).getRandom()}% 🤢
  `.trim(), m, m.mentionedJid ? {
  mentions: m.mentionedJid
  } : {})}   

  //════════════ ೋೋ ════════════

  if (command == 'andicappato'|| command == "andicappata") {
  conn.reply(m.chat, `
  ${text} è 𝐚𝐧𝐝𝐢𝐜𝐚𝐩𝐩𝐚𝐭𝐨/𝐚 𝐚𝐥 ${(100).getRandom()}% ♿
  `.trim(), m, m.mentionedJid ? {
  mentions: m.mentionedJid
  } : {})}   

  //════════════ ೋೋ ════════════

  if (command == 'frustrato'|| command == "frustrata") {
  conn.reply(m.chat, `
  ${text} è 𝐟𝐫𝐮𝐬𝐭𝐫𝐚𝐭𝐨/𝐚 𝐚𝐥 ${(100).getRandom()}%  
  `.trim(), m, m.mentionedJid ? {
  mentions: m.mentionedJid
  } : {})}   

  //════════════ ೋೋ ════════════

  if (command == 'arrapato'|| command == "arrapata") {
  conn.reply(m.chat, `
  ${text} è 𝐚𝐫𝐫𝐚𝐩𝐚𝐭𝐨/𝐚 𝐚𝐥 ${(100).getRandom()}%  
  `.trim(), m, m.mentionedJid ? {
  mentions: m.mentionedJid
  } : {})}   

  //════════════ ೋೋ ════════════

  if (command == 'drogato'|| command == "drogata") {
  conn.reply(m.chat, `
  ${text} è 𝐝𝐫𝐨𝐠𝐚𝐭𝐨/𝐚 𝐚𝐥 ${(100).getRandom()}% 💊
  `.trim(), m, m.mentionedJid ? {
  mentions: m.mentionedJid
  } : {})}   

  //════════════ ೋೋ ════════════
  
 if (command == 'albanese') {
  conn.reply(m.chat, `
  ${text} è 𝐚𝐥𝐛𝐚𝐧𝐞𝐬𝐞 𝐚𝐥 ${(100).getRandom()}% 🇦🇱 
  `.trim(), m, m.mentionedJid ? {
  mentions: m.mentionedJid
  } : {})}  

  //════════════ ೋೋ ════════════

   if (command == 'rumeno'|| command == "rumena") {
    conn.reply(m.chat, `
    ${text} è 𝐫𝐮𝐦𝐞𝐧𝐨/𝐚 𝐚𝐥 ${(100).getRandom()}% 🇷🇴
    `.trim(), m, m.mentionedJid ? {
    mentions: m.mentionedJid
    } : {})} 

  //════════════ ೋೋ ════════════

   if (command == 'terrone'|| command == "terrona") {
    conn.reply(m.chat, `
    ${text} è 𝐭𝐞𝐫𝐫𝐨𝐧𝐞/𝐚 𝐚𝐥 ${(100).getRandom()}% 🦍
    `.trim(), m, m.mentionedJid ? {
    mentions: m.mentionedJid
    } : {})} 

   //════════════ ೋೋ ════════════
  
   if (command == 'nazista') {
    conn.reply(m.chat, `
    ${text} è 𝐧𝐚𝐳𝐢𝐬𝐭𝐚 𝐚𝐥 ${(100).getRandom()}% 卐
    `.trim(), m, m.mentionedJid ? {
    mentions: m.mentionedJid
    } : {})}  

    //════════════ ೋೋ ════════════

   if (command == 'comunista') {
    conn.reply(m.chat, `
    ${text} è 𝐜𝐨𝐦𝐮𝐧𝐢𝐬𝐭𝐚 𝐚𝐥 ${(100).getRandom()}% 
    `.trim(), m, m.mentionedJid ? {
    mentions: m.mentionedJid
    } : {})}  

    //════════════ ೋೋ ════════════

   if (command == 'clown') {
    conn.reply(m.chat, `
    ${text} è 𝐜𝐥𝐨𝐰𝐧 𝐚𝐥 ${(100).getRandom()}% 🤡
    `.trim(), m, m.mentionedJid ? {
    mentions: m.mentionedJid
    } : {})}  

  //════════════ ೋೋ ════════════

   if (command == 'puzza') {
    conn.reply(m.chat, `
    ${text} 𝐩𝐮𝐳𝐳𝐚 𝐚𝐥 ${(100).getRandom()}% ☢
    `.trim(), m, m.mentionedJid ? {
    mentions: m.mentionedJid
    } : {})}  

    //════════════ ೋೋ ════════════

if (command == 'puttaniere') {
conn.reply(m.chat, `
${text} è 𝐩𝐮𝐭𝐭𝐚𝐧𝐢𝐞𝐫𝐞 𝐚𝐥 ${(100).getRandom()}% 🔞
`.trim(), m, m.mentionedJid ? {
mentions: m.mentionedJid
} : {})}   
}
handler.help = ['gay', 'lesbica', 'pajero', 'pajera', 'puto', 'puttana', 'manco', 'manca', 'rata', 'prostituta', 'puttaniere', 'terrone', 'nerd'].map(v => v + ' @tag | nombre')
handler.tags = ['calculator']
handler.command = /^gay|lesbica|frocio|random|puto|puttana|nero|nera|rata|prostituta|puttaniere|terrone|nerd|anoressica|anoressico|criminale|snitch|andicappato|andicappata|frustrato|frustrata|arrapato|arrapata|drogato|drogata|albanese|rumeno|terrone|terrona|nazista|comunista|clown|puzza/i
export default handler