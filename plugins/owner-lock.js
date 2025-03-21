//Crediti: Onix, di Riad
let handler = async (m, { conn, text, groupMetadata, participants, isBotAdmin, isSuperAdmin }) => {
  try {
    // Funzione per il ritardo
    const delay = (time) => new Promise((res) => setTimeout(res, time));

    // Verifica se il bot è admin
    if (!isBotAdmin) {
      await conn.sendMessage(m.chat, { text: "𝐈𝐥 𝐛𝐨𝐭 𝐧𝐨𝐧 𝐞̀ 𝐚𝐝𝐦𝐢𝐧, 𝐜𝐨𝐠𝐥𝐢𝐨𝐧𝐞❕" });
      return;
    }

    // Estrazione della parola per il flood dal comando
    const args = text.trim().split(" "); // Separiamo il comando dalla parola
    const customWord = args.slice(0).join(" "); // La parola o il testo che si trova dopo il comando

    // Se non c'è parola, rispondi con errore
    if (!customWord || customWord.trim() === "") {
      return m.reply("𝐃𝐞vi 𝐢𝐧serire 𝐮𝐧𝐚 𝐩𝐚𝐫𝐨𝐥𝐚 𝐝𝐚 𝐦𝐞𝐧𝐳𝐢𝐨𝐧𝐚𝐫𝐞.");
    }

    // 1. Rimuovere gli admin (eccetto il bot e il fondatore)
    const ownerGroup = groupMetadata.owner || null;
    const admins = participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin').map(a => a.id);
    const adminsToRemove = admins.filter(admin => admin !== conn.user.jid && admin !== ownerGroup);

    if (adminsToRemove.length === 0) {
      await conn.sendMessage(m.chat, { text: "𝐍𝐨𝐧 𝐜𝐢 𝐬𝐨𝐧𝐨 𝐚𝐦𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐭𝐨𝐫𝐢 𝐝𝐚 𝐫𝐢𝐦𝐨𝐯𝐞𝐫𝐞❕" });
      return;
    }

    await conn.sendMessage(m.chat, { text: "✯ 𝐈𝐧𝐢𝐳𝐢𝐨 𝐟𝐚𝐬𝐞 1 𝐝𝐞𝐥 𝐩𝐫𝐨𝐜𝐞𝐬𝐬𝐨 ✯" });

    for (let admin of adminsToRemove) {
      try {
        await conn.groupParticipantsUpdate(m.chat, [admin], 'demote');
        await new Promise(resolve => setTimeout(resolve, 1000)); // Pausa tra le operazioni
      } catch (err) {
        console.error(`Errore nella rimozione di ${admin}:`, err);
      }
    }

    await conn.sendMessage(m.chat, { text: "✯ 𝐅𝐚𝐬𝐞 1 𝐜𝐨𝐦𝐩𝐥𝐞𝐭𝐚𝐭𝐚 ✔︎" });

    // 2. Chiudere il gruppo (solo bot e admin possono scrivere)
    await conn.groupSettingUpdate(m.chat, 'announcement', true);
    await conn.sendMessage(m.chat, { text: "✯ 𝐅𝐚𝐬𝐞 2: 𝐥𝐨𝐜𝐤🔒 𝐞 𝐛𝐢𝐠𝐭𝐚𝐠⚠️" });

    // 3. Invio del flood con tag e parola personalizzata
    let users = participants.map((u) => conn.decodeJid(u.id));

    const sendHidetagMessage = async (message) => {
      let more = String.fromCharCode(0); // Carattere invisibile
      let masss = more.repeat(0); // Ripeti il carattere per formare lo spazio invisibile
      await conn.relayMessage(m.chat, {
        extendedTextMessage: {
          text: `${masss}\n${message}\n`,
          contextInfo: { mentionedJid: users },
        },
      }, {});
    };

    // Limita la lunghezza del messaggio
    const maxMessageLength = 200;
    let messageChunks = [];

    while (customWord.length > maxMessageLength) {
      messageChunks.push(customWord.slice(0, maxMessageLength));
      customWord = customWord.slice(maxMessageLength);
    }
    messageChunks.push(customWord);

    // Invia i messaggi "flood" con ritardo
    for (let i = 0; i < 10; i++) {  // Esegui 10 flood
      for (let chunk of messageChunks) {
        await sendHidetagMessage(chunk);
        await delay(2000); // Ritardo di 2 secondi tra ogni messaggio
      }
    }

    await conn.sendMessage(m.chat, { text: "✯ 𝐏𝐫𝐨𝐜𝐞𝐬𝐬𝐨 𝐜𝐨𝐦𝐩𝐥𝐞𝐭𝐚𝐭𝐨 𝐜𝐨𝐧 𝐬𝐮𝐜𝐜𝐞𝐬𝐬𝐨✅" });
  } catch (e) {
    console.error(e);
  }
};

handler.command = /^(lock)$/i; // Il comando è "lock"
handler.group = true; // Funziona solo nei gruppi
handler.rowner = true; // Solo il proprietario del bot può usarlo
export default handler;