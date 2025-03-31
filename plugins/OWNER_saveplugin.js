import fs from 'fs'

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `Uhm... Che nome devo dare al plugin?`
    if (!m.quoted.text) throw `Rispondi al messaggio!`
    let path = `plugins/${text}.js`
    await fs.writeFileSync(path, m.quoted.text)
    m.reply(`Salvato in ${path}`)
}

handler.help = ['saveplugin'].map(v => v + ' *<nome>*')
handler.tags = ['owner']
handler.command = ["salva", "plugin"]

handler.private = true
export default handler
