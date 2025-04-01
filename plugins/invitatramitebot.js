let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  if (!text) throw `🍟 Inserisci il numero a cui vuoi inviare un invito al gruppo${textPersonalizzato ? ' e un messaggio (opzionale)' : ''}\n\n🚩 Esempio:\n*${usedPrefix + command}* 3912345678${textPersonalizzato ? ' Ciao, unisciti al nostro gruppo!' : ''}`;
  if (text.includes('+')) throw `🚩 Inserisci il numero tutto attaccato senza il *+*`;
  if (isNaN(text.split(' ')[0])) throw '🍟 Inserisci solo numeri con il prefisso internazionale senza spazi';

  let number = text.split(' ')[0];
  let customMessage = text.split(' ').slice(1).join(' ');
  let group = m.chat;
  let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group);
  let groupName = await conn.groupMetadata(group).then(metadata => metadata.subject);

  let inviteMessage = `🍟 *INVITO AL GRUPPO*\n\nTi ho invitato a unirti a questo gruppo *${groupName}* \n\n${link}`;
  if (customMessage) {
    inviteMessage += `\n\nMessaggio: ${customMessage}`;
  }

  try {
    await conn.reply(number + '@s.whatsapp.net', inviteMessage, m, { mentions: [m.sender] });
    m.reply(`🍟 L'invito al gruppo *${groupName}* è stato inviato con successo a ${number}.`);
  } catch (error) {
    console.error("Errore nell'invio dell'invito:", error);
    m.reply(`⚠️ Ops! Non sono riuscito a inviare l'invito. Controlla che il numero sia corretto e che l'utente possa ricevere messaggi da numeri sconosciuti.`);
  }
};

handler.help = ['invite *<numero>* [messaggio]'];
handler.tags = ['gruppo'];
handler.command = ['invite', 'invita'];
handler.group = true;
//handler.admin = true
handler.botAdmin = true;

// Opzione per abilitare/disabilitare il messaggio personalizzato
const textPersonalizzato = true;

export default handler;
handler.botAdmin = true;

export default handler;
