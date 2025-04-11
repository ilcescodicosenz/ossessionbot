let handler = async (m, { conn, text, usedPrefix }) => {
  if (!text || !text.includes('@')) {
    m.reply('⚠️ Formato del comando non valido! Utilizzo corretto: tempadmin <durata> @user *(durata in m/h)*');
    return;
  }

  let durationText = "";
  let duration = 0;
  let menzione = m.mentionedJid[0] || "";

  if (!menzione) {
    m.reply('⚠️ Non hai menzionato un utente da promuovere ad admin');
    return;
  }

  let timeInput = text.split(' ')[0].toLowerCase();
  let timeValue = parseInt(timeInput.slice(0, -1));
  let timeUnit = timeInput.slice(-1);

  if (timeUnit === 'm') {
    duration = timeValue * 60 * 1000; // Millisecondi
    durationText = `✅ *@${menzione.split`@`[0]}* è stato promosso ad **admin** per *${timeValue}* minuto${timeValue === 1 ? '' : 'i'}. 🏆`;
  } else if (timeUnit === 'h') {
    duration = timeValue * 60 * 60 * 1000; // Millisecondi
    durationText = `✅ *@${menzione.split`@`[0]}* è stato promosso ad **admin** per *${timeValue}* ora${timeValue === 1 ? '' : 'e'}. 🔥`;
  } else {
    m.reply('⛔ Formato della durata non valido! Usa un numero seguito da *m* (minuti) o *h* (ore), ad esempio *5m* o *2h*.');
    return;
  }

  if (duration < 60000) {
    m.reply('⛔ Durata troppo breve! Specifica un tempo di almeno *1m*.');
    return;
  } else if (duration > 86400000) {
    m.reply('⛔ Durata troppo lunga! Il tempo massimo è di *24h*.');
    return;
  }

  try {
    await conn.groupParticipantsUpdate(m.chat, [menzione], "promote");
    m.reply(durationText);

    setTimeout(async () => {
      await conn.groupParticipantsUpdate(m.chat, [menzione], "demote");
      m.reply(`⚠️ Il tempo da admin di *@${menzione.split`@`[0]}* è terminato. È stato retrocesso. 😬`);
    }, duration);
  } catch (e) {
    m.reply("❌ Errore durante l'assegnazione/rimozione del ruolo di admin.");
    console.error(e);
  }
};

handler.command = /^tempadmin$/i;
handler.admin = true;
export default handler;
