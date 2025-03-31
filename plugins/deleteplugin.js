import { tmpdir } from 'os'
import path, { join } from 'path'
import {
  readdirSync,
  statSync,
  unlinkSync,
  existsSync,
  readFileSync,
  watch
} from 'fs'

let handler = async (m, { conn, usedPrefix: _p, __dirname, args, text }) => {

    let ar = Object.keys(plugins)
    let ar1 = ar.map(v => v.replace('.js', ''))
    if (!text) throw `📌 *_Esempio di utilizzo:_*\n*#deleteplugin nome-plugin*`
    if (!ar1.includes(args[0])) 
        return m.reply(`*🗃️ NON TROVATO!*\n•••••••••••••••••••••••••••••••••••••••••••••••••••••••\n\n${ar1.map(v => ' ' + v).join`\n`}`)

    const file = join(__dirname, '../plugins/' + args[0] + '.js')
    unlinkSync(file)
    conn.reply(m.chat, `⚠️ *_Il plugin "plugins/${args[0]}.js" è stato eliminato con successo._*`, m)

}

handler.help = ['deleteplugin *<nome>*']
handler.tags = ['owner']
handler.command = /^(deleteplugin|dp|deleteplu)$/i
handler.rowner = true
handler.private = true

export default handler
