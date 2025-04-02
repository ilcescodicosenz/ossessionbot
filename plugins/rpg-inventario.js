import {createHash} from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
const handler = async (m, {
conn,
usedPrefix,
command
}) => {
const mention = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.quoted
const who = mention ? mention : m.sender
const user = global.db.data.users[who]
  let prova = { "key": {"participants":"0@s.whatsapp.net", "fromMe": false, "id": "Halo"
}, "message": { 
"locationMessage": { name: '𝐙𝚲𝕀𝐍Ꮻ',
"jpegThumbnail": fs.readFileSync('./icone/bal.png'),
"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
}}, "participant": "0@s.whatsapp.net"
}
conn.reply(m.chat,  `══════•⊰✰⊱•══════
👤 𝐔𝐭𝐞𝐧𝐭𝐞: @${who.split`@`[0]}
══════•⊰✰⊱•══════
📦 𝐂𝐚𝐬𝐬𝐞 𝐜𝐨𝐦𝐮𝐧𝐢: ${user.casse[0]*1}
📦 𝐂𝐚𝐬𝐬𝐞 𝐧𝐨𝐧-𝐜𝐨𝐦𝐮𝐧𝐢: ${user.casse[1]*1}  
📦 𝐂𝐚𝐬𝐬𝐞 𝐫𝐚𝐫𝐞: ${user.casse[2]*1}
📦 𝐂𝐚𝐬𝐬𝐞 𝐞𝐩𝐢𝐜𝐡𝐞: ${user.casse[3]*1}
📦 𝐂𝐚𝐬𝐬𝐞 𝐥𝐞𝐠𝐠𝐞𝐧𝐝𝐚𝐫𝐢𝐞: ${user.casse[4]*1}
══════•⊰✰⊱•══════
⚠️ 𝐔𝐧𝐰𝐚𝐫𝐧: ${user.comandi[0]*1}
══════•⊰✰⊱•══════
💷 𝐆𝐫𝐚𝐭𝐭𝐚&𝐯𝐢𝐧𝐜𝐢: ${user.grattaevinci}  
🗝️ 𝐂𝐡𝐢𝐚𝐯𝐢: ${user.chiavi} 
══════•⊰✰⊱•══════`, prova, {mentions: [mention, m.sender]})}
handler.command = /^inventario|inventory|zaino|inv$/i
export default handlerimport {createHash} from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
const handler = async (m, {
conn,
usedPrefix,
command
}) => {
const mention = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.quoted
const who = mention ? mention : m.sender
const user = global.db.data.users[who]
  let prova = { "key": {"participants":"0@s.whatsapp.net", "fromMe": false, "id": "Halo"
}, "message": { 
"locationMessage": { name: '𝐙𝚲𝕀𝐍Ꮻ',
"jpegThumbnail": fs.readFileSync('./icone/bal.png'),
"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
}}, "participant": "0@s.whatsapp.net"
}
conn.reply(m.chat,  `══════•⊰✰⊱•══════
👤 𝐔𝐭𝐞𝐧𝐭𝐞: @${who.split`@`[0]}
══════•⊰✰⊱•══════
📦 𝐂𝐚𝐬𝐬𝐞 𝐜𝐨𝐦𝐮𝐧𝐢: ${user.casse[0]*1}
📦 𝐂𝐚𝐬𝐬𝐞 𝐧𝐨𝐧-𝐜𝐨𝐦𝐮𝐧𝐢: ${user.casse[1]*1}  
📦 𝐂𝐚𝐬𝐬𝐞 𝐫𝐚𝐫𝐞: ${user.casse[2]*1}
📦 𝐂𝐚𝐬𝐬𝐞 𝐞𝐩𝐢𝐜𝐡𝐞: ${user.casse[3]*1}
📦 𝐂𝐚𝐬𝐬𝐞 𝐥𝐞𝐠𝐠𝐞𝐧𝐝𝐚𝐫𝐢𝐞: ${user.casse[4]*1}
══════•⊰✰⊱•══════
⚠️ 𝐔𝐧𝐰𝐚𝐫𝐧: ${user.comandi[0]*1}
══════•⊰✰⊱•══════
💷 𝐆𝐫𝐚𝐭𝐭𝐚&𝐯𝐢𝐧𝐜𝐢: ${user.grattaevinci}  
🗝️ 𝐂𝐡𝐢𝐚𝐯𝐢: ${user.chiavi} 
══════•⊰✰⊱•══════`, prova, {mentions: [mention, m.sender]})}
handler.command = /^inventario|inventory|zaino|inv$/i
export default handler
