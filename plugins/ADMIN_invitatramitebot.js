let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    if (!text) throw '🍟 Inserisci il numero a cui vuoi inviare un invito al gruppo\n\n🚩 Esempio:\n*' + usedPrefix + command + '* 3456987541';
    if (text.includes('+')) throw '🚩 Inserisci il numero tutto attaccato senza il *+*';
    if (isNaN(text)) throw '🍟 Inserisci solo numeri con il prefisso internazionale senza spazi';
    
    let group = m.chat;
    let botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net';
    let groupMetadata = await conn.groupMetadata(group);
    let botIsAdmin = groupMetadata.participants.some(p => p.id === botNumber && p.admin);
    
    if (!botIsAdmin) throw '🚨 Il bot deve essere amministratore per generare l\'invito!';
    
    let link;
    try {
        link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group);
    } catch (e) {
        link = null; // Se c'è un errore, non inviare il link
    }

    if (link) {
        // Invia il messaggio di invito solo se il link è valido
        await conn.reply(text + '@s.whatsapp.net', `🍟 *INVITO AL GRUPPO*\n\nUn utente ti ha invitato a unirti a questo gruppo \n\n${link}`, m, {mentions: [m.sender]});
        m.reply('🍟 È stato inviato un link di invito all\'utente.');
    } else {
        // Se non è possibile generare il link, invia un messaggio alternativo
        m.reply('⚠️ Non è possibile generare il link di invito al momento.');
    }
    
    // Aggiunge un messaggio di benvenuto personalizzato per i nuovi membri
    conn.sendMessage(group, `🎉 Benvenuto nel gruppo! ${text} 🎊\nSegui le regole e divertiti!`, { mentions: [text + '@s.whatsapp.net'] });
    
    // Invia un messaggio agli amministratori con il nuovo invito
    let admins = groupMetadata.participants.filter(p => p.admin);
    let adminMentions = admins.map(admin => admin.id);
    conn.sendMessage(group, `🔔 Un invito è stato inviato a ${text}.`, { mentions: adminMentions });
};

handler.help = ['invite *<numero>*'];
handler.tags = ['gruppo'];
handler.command = ['invite', 'invita']; 
handler.group = true;
//handler.admin = true;
handler.botAdmin = true;

export default handler;
