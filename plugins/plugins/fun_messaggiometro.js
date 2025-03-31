export async function before(m) {
  const user = global.db.data.users[m.sender];
  if (user.messaggi > 0 && user.messaggi % 500 === 0) {
    const reward = user.messaggi / 2;

    user.money += reward;
    user.lvl += 1;

    let milestoneMessage = {
      "key": {
        "participants": "0@s.whatsapp.net",
        "fromMe": false,
        "id": "Halo"
      },
      "message": {
        "locationMessage": {
          name: `𝐍𝐮𝐨𝐯𝐨 𝐨𝐛𝐛𝐢𝐞𝐭𝐭𝐢𝐯𝐨🎉`,
          jpegThumbnail: await (await fetch('https://telegra.ph/file/f3e3e70536f03e09282b5.png')).buffer(),
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
        }
      },
      "participant": "0@s.whatsapp.net"
    };

    // Invia un messaggio di raggiungimento del traguardo
    conn.reply(m.chat, `𝐂𝐨𝐦𝐩𝐥𝐢𝐦𝐞𝐧𝐭𝐢 @${m.sender.split('@')[0]} !\n𝐇𝐚𝐢 𝐫𝐚𝐠𝐠𝐢𝐮𝐧𝐭𝐨 *${user.messaggi}* 𝐦𝐞𝐬𝐬𝐚𝐠𝐠𝐢.\n𝐇𝐚𝐢 𝐨𝐭𝐭𝐞𝐧𝐮𝐭𝐨 𝐮𝐧𝐚 𝐫𝐢𝐜𝐨𝐦𝐩𝐞𝐧𝐬𝐚 𝐝𝐢 *${reward}* € 𝐝𝐞𝐩𝐨𝐬𝐢𝐭𝐚𝐥𝐢 𝐚𝐥 𝐩𝐢𝐮' 𝐩𝐫𝐞𝐬𝐭𝐨.\n𝐀𝐭𝐭𝐮𝐚𝐥𝐦𝐞𝐧𝐭𝐞 𝐬𝐞𝐢 𝐬𝐚𝐥𝐢𝐭𝐨 𝐚𝐥 𝐥𝐢𝐯𝐞𝐥𝐥𝐨 *${user.lvl}*.`, milestoneMessage, { mentions: [m.sender] });
  }
}
