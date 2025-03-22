let handler = async (m, { conn, command, text }) => {
    let love = `🏳️‍🌈 *CALCOLATORE DI FROCI* 🏳️‍🌈
━━━━━━━━━━━━━━━━━━━━━
👤 *Persona analizzata:* ${text}
🌈 *Percentuale di frocio:* *${Math.floor(Math.random() * 101)}%* su *100%*
━━━━━━━━━━━━━━━━━━━━━
😂 *La tua autenticità è unica!*
`.trim()
    m.reply(love, null, { mentions: conn.parseMention(love) })
}
handler.help = ['frocio']
handler.tags = ['fun']
handler.command = /^(frocio)$/i
export default handler
