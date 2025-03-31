const handler = async (m, { conn, text, usedPrefix }) => {
  let mention = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : null);
  let who = mention || m.sender;

  // Assicurati che gli utenti esistano nel database
  global.db.data.users[m.sender] = global.db.data.users[m.sender] || {};
  global.db.data.users[who] = global.db.data.users[who] || {};

  let sender = global.db.data.users[m.sender];
  let target = global.db.data.users[who];

  if (!text) {
    return m.reply("𝐈𝐧𝐬𝐞𝐫𝐢𝐬𝐜𝐢 𝐥'𝐮𝐬𝐞𝐫𝐧𝐚𝐦𝐞 𝐧𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨");
  }

  const usernameMatch = text.match(/instagram\.com\/([^/?]+)/i);
  const instagramUsername = usernameMatch ? usernameMatch[1] : text.trim();

  if (instagramUsername) {
    if (who === m.sender) {
      sender.instagram = instagramUsername;
    } else {
      target.instagram = instagramUsername;
    }

    conn.reply(
      m.chat,
      `ⓘ 𝐇𝐚𝐢 𝐢𝐦𝐩𝐨𝐬𝐭𝐚𝐭𝐨 𝐜𝐨𝐧 𝐬𝐮𝐜𝐜𝐞𝐬𝐬𝐨 𝐢𝐥 𝐭𝐮𝐨 𝐧𝐨𝐦𝐞 𝐢𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦 𝐜𝐨𝐦𝐞 ${instagramUsername}\n` +
      `> 𝐓𝐢 𝐬𝐞𝐢 𝐩𝐞𝐧𝐭𝐢𝐭𝐨 𝐝𝐢 𝐪𝐮𝐞𝐬𝐭𝐚 𝐬𝐜𝐞𝐥𝐭𝐚 𝐞 𝐯𝐮𝐨𝐢 𝐫𝐢𝐦𝐞𝐝𝐢𝐚𝐫𝐞? 𝐔𝐬𝐚 𝐢𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 ${usedPrefix}rimuoviig 𝐩𝐞𝐫 𝐟𝐚𝐫𝐞 𝐮𝐧 𝐩𝐚𝐬𝐬𝐨 𝐢𝐧𝐝𝐢𝐞𝐭
