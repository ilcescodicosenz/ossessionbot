let handler = async(m, { conn }) => {
m.reply(`𝐥𝐢𝐧𝐤 𝐫𝐞𝐢𝐦𝐩𝐨𝐬𝐭𝐚𝐭𝐨\n\n➣ 𝐍𝐮𝐨𝐯𝐨 𝐥𝐢𝐧𝐤: ${'https://chat.whatsapp.com/' + await conn.groupRevokeInvite(m.chat)}`)}
handler.command = ['reimposta', 'revoke']
handler.botAdmin = true
handler.admin = true
handler.group = true
export default handler
