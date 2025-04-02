let handler = async (m, { conn, command, text, args }) => {
  if (!text) throw '𝐐𝐮𝐚𝐧𝐭𝐢 𝐬𝐨𝐥𝐝𝐢 𝐯𝐮𝐨𝐢 𝐩𝐫𝐞𝐥𝐞𝐯𝐚𝐫𝐞 𝐝𝐚𝐥𝐥𝐚 𝐛𝐚𝐧𝐜𝐚?'
  let users = global.db.data.users
  const mention = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.quoted
  const who = m.sender
  const prelievo = text.split(' ')[0].toLowerCase();
  if (isNaN(prelievo)) throw `𝐍𝐨𝐧 𝐡𝐚𝐢 𝐢𝐧𝐬𝐞𝐫𝐢𝐭𝐨 𝐮𝐧 𝐧𝐮𝐦𝐞𝐫𝐨`
  if ((prelievo*1)<0) throw `𝐍𝐨𝐧 𝐩𝐮𝐨𝐢 𝐩𝐫𝐞𝐥𝐞𝐯𝐚𝐫𝐞 ${prelievo} € `
  if(prelievo>users[who].bank) throw `𝐍𝐨𝐧 𝐡𝐚𝐢 𝐚𝐛𝐛𝐚𝐬𝐭𝐚𝐧𝐳𝐚 𝐬𝐨𝐥𝐝𝐢 𝐬𝐮𝐥 𝐜𝐨𝐧𝐭𝐨 🏦`
  users[who].bank -= prelievo * 1
  users[who].money += prelievo * 1
  users[who].ultimoprelievo = prelievo*1
  let testo = `══════ •⊰✦⊱• ══════\𝐇𝐚𝐢 𝐩𝐫𝐞𝐥𝐞𝐯𝐚𝐭𝐨 ${prelievo} € 𝐝𝐚𝐥 𝐭𝐮𝐨 𝐜𝐨𝐧𝐭𝐨.\n\n💰𝐂𝐨𝐧𝐭𝐚𝐧𝐭𝐢: ${users[who].money} €\n\n🏦 𝐁𝐚𝐧𝐜𝐚: ${users[who].bank} €\n══════ •⊰✦⊱• ══════`
conn.reply(m.chat, testo, m)
}
handler.command = /^preleva|prelievo|ritira$/i
export default handler

