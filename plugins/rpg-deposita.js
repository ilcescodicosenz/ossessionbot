let handler = async (m, { conn, command, text, args }) => {
  if (!text) throw '𝐐𝐮𝐚𝐧𝐭𝐢 𝐬𝐨𝐥𝐝𝐢 𝐯𝐮𝐨𝐢 𝐝𝐞𝐩𝐨𝐬𝐢𝐭𝐚𝐫𝐞 𝐢𝐧 𝐛𝐚𝐧𝐜𝐚?'
  let users = global.db.data.users
  const mention = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.quoted
  const who = m.sender
  const deposito = text.split(' ')[0].toLowerCase();
  if (isNaN(deposito)) throw `𝐍𝐨𝐧 𝐡𝐚𝐢 𝐢𝐧𝐬𝐞𝐫𝐢𝐭𝐨 𝐮𝐧 𝐧𝐮𝐦𝐞𝐫𝐨`
  if ((deposito*1)<0) throw `𝐍𝐨𝐧 𝐩𝐮𝐨𝐢 𝐝𝐞𝐩𝐨𝐬𝐢𝐭𝐚𝐫𝐞 ${deposito} €`
  if(deposito>users[who].money) throw `𝐍𝐨𝐧 𝐡𝐚𝐢 𝐚𝐛𝐛𝐚𝐬𝐭𝐚𝐧𝐳𝐚 𝐬𝐨𝐥𝐝𝐢 𝐧𝐞𝐥 𝐩𝐨𝐫𝐭𝐚𝐟𝐨𝐠𝐥𝐢𝐨👛`
  users[who].bank += deposito * 1
  users[who].money -= deposito * 1
  users[who].ultimodeposito = deposito*1
  let testo = `══════ •⊰✦⊱• ══════\n𝐇𝐨 𝐝𝐞𝐩𝐨𝐬𝐢𝐭𝐚𝐭𝐨 *${deposito}* € 𝐬𝐮𝐥 𝐭𝐮𝐨 𝐜𝐨𝐧𝐭𝐨\n\n🏦 𝐁𝐚𝐧𝐜𝐚: ${users[who].bank} €\n\n💰𝐂𝐨𝐧𝐭𝐚𝐧𝐭𝐢: ${users[who].money} €\n══════ •⊰✦⊱• ══════`
  conn.reply(m.chat, testo, m)
}
handler.command = /^deposita|deposit$/i
export default handler
