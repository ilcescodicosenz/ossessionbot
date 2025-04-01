let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  if (!text) throw `🍟 Inserisci il numero a cui vuoi inviare un invito al gruppo\n\n🚩 Esempio:\n*${usedPrefix + command}* 3912345678`;
  if (text.includes('+')) throw `🚩 Inserisci il numero tutto attaccato senza il *+*`;
  if (isNaN(text)) throw '🍟 Inserisci solo numeri con il prefisso internazionale senza spazi';

  let group = m.chat;
  let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group);

  try {
    await conn.reply(text + '@s.whatsapp.net', `🍟 *INVITO AL GRUPPO*\n\nUn utente ti ha invitato a unirti a questo gruppo \n\n${link}`, m, { mentions: [m.sender] });
    m.reply(`🍟 È stato inviato un link di invito all'utente.`);
  } catch (error) {
    console.error("Errore nell'invio dell'invito:", error);
    m.reply(`⚠️ Errore nell'invio dell'invito. Assicurati che il numero sia valido e possa ricevere messaggi.`);
  }
};

handler.help = ['invite *<numero>*'];
handler.tags = ['gruppo'];
handler.command = ['invite', 'invita'];
handler.group = true;
//handler.admin = true
handler.botAdmin = true;

export default handler;
