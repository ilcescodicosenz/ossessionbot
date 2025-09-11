let handler = async (m, { conn, text, isROwner, isOwner, isAdmin }) => {
    // Controllo: solo in gruppo
    if (!m.isGroup) return m.reply('❌ Questo comando funziona solo nei gruppi!')
    // Controllo: solo admin o owner
    if (!isAdmin && !isOwner && !isROwner) return m.reply('❌ Solo gli admin possono usare questo comando!')

    // Controllo: serve un testo
    if (!text) {
        throw `> ⓘ Inserisci il messaggio di benvenuto che desideri aggiungere, usa:
> - @user (menzione)
> - @group (nome del gruppo)
> - @desc (descrizione del gruppo)
Esempio: .setwelcome Benvenuto @user in @group!`
    }

    // Imposta il messaggio di benvenuto personalizzato
    global.db.data.chats[m.chat].sWelcome = text
    m.reply(`ⓘ Il messaggio di benvenuto è stato impostato correttamente!`)
}

handler.help = ['setwelcome <testo>']
handler.tags = ['group']
handler.command = ['setwelcome']
handler.group = true     // Solo nei gruppi
handler.admin = true     // Solo admin

export default handler
