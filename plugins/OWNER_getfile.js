import fs from 'fs'
import fs from 'fs'
import syntaxError from 'syntax-error'
import path from 'path'

const _fs = fs.promises

let handler = async (m, { text, usedPrefix, command, __dirname }) => {
    let nomeFile = text.split(' ')[0] // Prende solo la prima parte come nome del file
    if (!nomeFile) throw `
> Utilizzo : ${usedPrefix + command} <nome file>

📌 Esempio:
        ${usedPrefix}getfile main.js
        ${usedPrefix}getplugin owner
`.trim()

    if (/p(lugin)?/i.test(command)) {
        nomeFile = nomeFile.replace(/plugin(s)\//i, '') + (/\.js$/i.test(nomeFile) ? '' : '.js')
        const pathFile = path.join(__dirname, nomeFile)
        try {
            const file = await _fs.readFile(pathFile, 'utf8')
            m.reply(`File: ${nomeFile}\n\n${file}`)
            const error = syntaxError(file, nomeFile, {
                sourceType: 'module',
                allowReturnOutsideFunction: true,
                allowAwaitOutsideFunction: true
            })
            if (error) {
                await m.reply(`
⛔️ Errore in *${nomeFile}*:

${error}

`.trim())
            }
        } catch (e) {
            m.reply(`⚠️ File non trovato o impossibile da leggere.`)
        }

    } else {
        const isJavascript = /\.js/.test(nomeFile)
        try {
            if (isJavascript) {
                const file = await _fs.readFile(nomeFile, 'utf8')
                m.reply(`File: ${nomeFile}\n\n${file}`)
                const error = syntaxError(file, nomeFile, {
                    sourceType: 'module',
                    allowReturnOutsideFunction: true,
                    allowAwaitOutsideFunction: true
                })
                if (error) {
                    await m.reply(`
⛔️ Errore in *${nomeFile}*:

${error}

`.trim())
                }
            } else {
                const file = await _fs.readFile(nomeFile, 'base64')
                await m.reply(Buffer.from(file, 'base64'))
            }
        } catch (e) {
            m.reply(`⚠️ File non trovato o impossibile da leggere.`)
        }
    }
}
handler.help = ['plugin', 'file'].map(v => `get${v} <nome file>`)
handler.tags = ['owner']
handler.command = /^g(et)?(p(lugin)?|f(ile)?)$/i

handler.owner = true

export default handler
