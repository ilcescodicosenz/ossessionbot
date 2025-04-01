let handler = async (m, { conn, args, text, usedPrefix, command, participants }) => {
    if (!text) throw `🍟 Inserisci il numero a cui vuoi inviare un invito al gruppo\n\n🚩 Esempio:\n*${usedPrefix + command}* 3912345678`
    if (text.includes('+')) throw `🚩 Inserisci il numero tutto attaccato senza il *+*`
    if (isNaN(text)) throw '🍟 Inserisci solo numeri con il prefisso internazionale senza spazi'
    if (text.length < 9 || text.length > 15) throw '🚩 Numero non valido! Assicurati di inserire un numero corretto.'

    let number = text + '@s.whatsapp.net'

    // Controlla se il numero è già nel gruppo
    let isMember = participants.some(member => member.id === number)
    if (isMember) throw '🚩 Questo numero è già nel gruppo!'

    let group = m.chat
    let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group)

    // Invio del messaggio di invito con menzione al mittente
    await conn.reply(number, `🍟 *INVITO AL GRUPPO*\n\nUn utente ti ha invitato a unirti a questo gruppo! \n\n🔗 *Link:* ${link}`, m, { mentions: [m.sender] })

    m.reply(`🍟 Il link di invito è stato inviato con successo a ${text}!`)
}

handler.help = ['invite *<numero>*']
handler.tags = ['gruppo']
handler.command = ['invite', 'invita'] 
handler.group = true
handler.botAdmin = true
// handler.admin = true // Sblocca se vuoi che solo gli admin possano usare il comando

export default handler
