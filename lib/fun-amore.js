let handler = async (m, { conn, command, text }) => {
    let love = `*💘 CALCOLATORE DI AMORE 💘*\n
━━━━━━━━━━━━━━━━━━━━━
🌹 *Amore dei tuoi sogni:* ${text}
💌 *Livello di amore:* *${Math.floor(Math.random() * 101)}%* su *100%*
━━━━━━━━━━━━━━━━━━━━━
❓ *Perché non ti dichiari?*
🤔 *L'amore potrebbe sorprenderti!*
`.trim()
    m.reply(love, null, { mentions: conn.parseMention(love) })
}
handler.help = ['love']
handler.tags = ['fun']
handler.command = /^(crush)$/i
export default handler
