import { execSync } from 'child_process'

let handler = async (m, { conn, text }) => {
    m.react(done)
    
    if (conn.user.jid == conn.user.jid) {
        let stdout = execSync('git pull' + (m.fromMe && text ? ' ' + text : ''))
        //require('fs').readdirSync('plugins').map(v => global.reload('', v))
        conn.reply(m.chat, stdout.toString(), m)
    }
}

handler.help = ['aggiornabot']
handler.tags = ['owner']
handler.command = ['update', 'aggiorna', 'fix', 'correggi']
handler.rowner = true

export default handler
