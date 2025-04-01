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
        console.log('Sto cercando di generare il link...');
        link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group);
        console.log('Link generato:', link);
    } catch (e) {
        console.error('Errore nel generare il link di invito:', e);
        link = '⚠️ Errore nel generare il link di invito. Contatta un amministratore.';
    }
    
    // Invia il messaggio di invito
    await conn.reply(text + '@s.whatsapp.net', `🍟 *INVITO AL GRUPPO*\n\nUn utente ti ha invitato a unirti a questo gruppo \n\n${link}`, m, {mentions: [m.sender]});
    
    m.reply('🍟 È stato inviato un link di invito all\'utente.');
    
    // Mostra il canale del gruppo in alto
    if (groupMetadata.announce) {
        let groupSubject = groupMetadata.subject;
        let groupDesc = groupMetadata.desc || 'Nessuna descrizione disponibile';
        m.reply(`📢 *Canale del Gruppo:* ${groupSubject}\n📜 *Descrizione:* ${groupDesc}`);
    }
    
    // Mostra il canale ufficiale sotto il numero di telefono
    let officialChannel = '120363387378860419@newsletter';
    await conn.reply(text + '@s.whatsapp.net', `📢 *Canale Ufficiale:* [Clicca qui per il canale ufficiale](https://wa.me/${officialChannel})`, m, { mentions: [text + '@s.whatsapp.net'] });

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
