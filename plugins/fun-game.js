let handler = async (m, { conn, text, command, usedPrefix, args }) => {
  let users = global.db.data.users[m.sender];
  let opzioni = ["sasso", "carta", "forbice"];

  let sceltaUtente = args[0]?.toLowerCase();

  if (!sceltaUtente || !opzioni.includes(sceltaUtente)) {
    return await conn.reply(m.chat, `══════•⊰✦⊱•══════\n𝐒𝐜𝐞𝐥𝐭𝐚 𝐧𝐨𝐧 𝐯𝐚𝐥𝐢𝐝𝐚.\n𝐄𝐬𝐞𝐦𝐩𝐢𝐨: !game sasso 150\n𝐒𝐜𝐞𝐠𝐥𝐢 𝐭𝐫𝐚: *${opzioni.join(', ')}*\n══════•⊰✦⊱•══════`, m);
  }

  let scommessa = parseInt(args[1]);

  if (isNaN(scommessa) || scommessa <= 0) {
    return await conn.reply(m.chat, `𝐈𝐧𝐬𝐞𝐫𝐢𝐬𝐜𝐢 𝐮𝐧 𝐢𝐦𝐩𝐨𝐫𝐭𝐨 𝐯𝐚𝐥𝐢𝐝𝐨 𝐝𝐚 𝐬𝐜𝐨𝐦𝐦𝐞𝐭𝐭𝐞𝐫𝐞.\n𝐄𝐬𝐞𝐦𝐩𝐢𝐨: !game sasso 150`, m);
  }

  if (scommessa > users.money) {
    throw `𝐍𝐨𝐧 𝐡𝐚𝐢 𝐚𝐛𝐛𝐚𝐬𝐭𝐚𝐧𝐳𝐚 𝐝𝐞𝐧𝐚𝐫𝐨.\n𝐓𝐢 𝐦𝐚𝐧𝐜𝐚𝐧𝐨 *${scommessa - users.money}* €.`;
  }

  let sceltaBot = opzioni[Math.floor(Math.random() * opzioni.length)];
  let risultato;

  if (sceltaUtente === sceltaBot) {
    risultato = "𝐏𝐚𝐫𝐢! 𝐍𝐞𝐬𝐬𝐮𝐧𝐚 𝐬𝐜𝐨𝐦𝐦𝐞𝐬𝐬𝐚 𝐚𝐠𝐠𝐢𝐨𝐫𝐧𝐚𝐭𝐚.";
  } else if (
    (sceltaUtente === "sasso" && sceltaBot === "forbice") ||
    (sceltaUtente === "carta" && sceltaBot === "sasso") ||
    (sceltaUtente === "forbice" && sceltaBot === "carta")
  ) {
    let vincita = scommessa * 2;
    users.money += vincita;
    risultato = `𝐇𝐚𝐢 𝐯𝐢𝐧𝐭𝐨! 🥳\n𝐒𝐜𝐞𝐥𝐭𝐚 𝐝𝐞𝐥 𝐛𝐨𝐭: *${sceltaBot}*\n𝐇𝐚𝐢 𝐯𝐢𝐧𝐭𝐨 *${vincita}* €.\n𝐈𝐥 𝐭𝐮𝐨 𝐬𝐚𝐥𝐝𝐨 𝐚𝐭𝐭𝐮𝐚𝐥𝐞 è 𝐝𝐢 *${users.money}* €.`;
  } else {
    users.money -= scommessa;
    risultato = `𝐇𝐚𝐢 𝐩𝐞𝐫𝐬𝐨... 😢\n𝐒𝐜𝐞𝐥𝐭𝐚 𝐝𝐞𝐥 𝐛𝐨𝐭: *${sceltaBot}*\n𝐇𝐚𝐢 𝐩𝐞𝐫𝐬𝐨 *${scommessa}* €.\n𝐈𝐥 𝐭𝐮𝐨 𝐬𝐚𝐥𝐝𝐨 𝐚𝐭𝐭𝐮𝐚𝐥𝐞 è 𝐝𝐢 *${users.money}* €.`;
  }

  return m.reply(risultato);
};

handler.command = /^(game)$/i;
export default handler;
