let handler = async (m, { conn, text, command, usedPrefix, args }) => {
  let users = global.db.data.users[m.sender];

  if (args.length < 4) {
    return await conn.reply(
      m.chat,
      `⚽ *Scommesse sul Calcio* ⚽\n\n` +
      `📌 *Uso corretto:*\n${usedPrefix}calcio Squadra1 - Squadra2 <scommessa>\n` +
      `✅ *Esempio:*\n${usedPrefix}calcio Juventus - Milan 150\n\n` +
      `💡 *Scommetti sulla tua squadra e prova a vincere!*`,
      m
    );
  }

  let team1 = args[0];
  let dash = args[1];
  let team2 = args[2];
  let bet = parseInt(args[3]);

  if (dash !== '-') {
    return await conn.reply(
      m.chat,
      `❌ *Errore! Devi usare il trattino "-" tra le squadre.*\n` +
      `Esempio: ${usedPrefix}calcio Juventus - Milan 150`,
      m
    );
  }

  if (isNaN(bet) || bet <= 0) {
    return await conn.reply(
      m.chat,
      `💰 *Inserisci un importo valido per la scommessa!*\n` +
      `Esempio: ${usedPrefix}calcio Juventus - Milan 150`,
      m
    );
  }

  if (bet > users.money) {
    return await conn.reply(
      m.chat,
      `❌ *Non hai abbastanza denaro!*\n` +
      `Ti mancano *${bet - users.money} €*.`,
      m
    );
  }

  let score1 = Math.floor(Math.random() * 4);
  let score2 = Math.floor(Math.random() * 4);

  let resultMessage = `🏆 *RISULTATO FINALE* 🏆\n\n` +
                      `⚽ ${team1} *${score1} - ${score2}* ${team2} ⚽\n\n`;

  if (score1 === score2) {
    resultMessage += `🤝 *È un pareggio!* Nessuna scommessa viene aggiornata.`;
  } else if (score1 > score2) {
    let winAmount = bet * 2;
    users.money += winAmount;
    resultMessage += `🎉 *Hai vinto!* La tua squadra *${team1}* ha trionfato! 🎊\n` +
                     `💰 Guadagni *${winAmount} €*!\n` +
                     `💳 Saldo attuale: *${users.money} €*`;
  } else {
    users.money -= bet;
    resultMessage += `😢 *Hai perso...* La tua squadra *${team1}* ha subito la sconfitta. 💔\n` +
                     `💸 Perdi *${bet} €*.\n` +
                     `💳 Saldo attuale: *${users.money} €*`;
  }

  return m.reply(resultMessage);
};

handler.command = /^(calcio)$/i;
export default handler;
