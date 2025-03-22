let handler = async (m, { conn, command, text }) => {
    let love = `⛏️*CALCOLATORE DI TERRONE*⛏️\n
━━━━━━━━━━━━━━━━━━━━━
 ${text} è terrone al *${Math.floor(Math.random() * 101)}%
━━━━━━━━━━━━━━━━━━━━━
`.trim()
    m.reply(love, null, { mentions: conn.parseMention(love) })
}
handler.help = ['love']
handler.tags = ['fun']
handler.command = ['terrone']
export default handler