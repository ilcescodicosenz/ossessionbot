let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    if (!text) throw `🍟 Inserisci il numero a cui vuoi inviare un invito al gruppo

🚩 Esempio:
*${usedPrefix + command}* 3912345678 [messaggio opzionale]`
    
    let [numero, ...messaggioArray] = text.split(' ');
    let messaggio = messaggioArray.join(' ') || `Un utente ti ha invitato a unirti a questo gruppo!`;
    
    if (numero.includes('+')) throw `🚩 Inserisci il numero tutto attaccato senza il *+*`;
    if (isNaN(numero)) throw '🍟 Inserisci solo numeri con il prefisso internazionale senza spazi';
    if (numero.length < 10) throw '🚩 Il numero inserito sembra non essere valido!';
    
    let group = m.chat;
    let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group);
    
    let messaggioFinale = `🍟 *INVITO AL GRUPPO*

${messaggio}

🔗 ${link}`;
    
    await conn.reply(numero + '@s.whatsapp.net', messaggioFinale, m, { mentions: [m.sender] });
    
    m.reply(`🍟 È stato inviato un link di invito all'utente *${numero}*.`);
};

handler.help = ['invite *<numero> [messaggio opzionale]*'];
handler.tags = ['gruppo'];
handler.command = ['invite', 'invita'];
handler.group = true;
handler.botAdmin = true;

export default handler;
