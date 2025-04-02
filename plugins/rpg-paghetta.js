import fetch from 'node-fetch';

let handler = async (m, { isPrems, conn }) => {
  let user = global.db.data.users[m.sender] || { bank: 0, lastclaim: 0 };

  let fkontak = {
    "key": {
      "participants": "0@s.whatsapp.net",
      "remoteJid": "status@broadcast",
      "fromMe": false,
      "id": "Halo"
    },
    "message": {
      "contactMessage": {
        displayName: '𝐏𝚲𝐆𝐇𝚵𝐓𝐓𝚲',
        "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    },
    "participant": "0@s.whatsapp.net"
  };

  let currentTime = new Date();
  let timePassed = currentTime - user.lastclaim;

  if (timePassed < 24 * 60 * 60 * 1000) { // Less than 24 hours have passed
    let remainingTime = 24 * 60 * 60 * 1000 - timePassed;
    let remainingTimeString = msToTime(remainingTime);
    return await conn.reply(m.chat, `𝐃𝐞𝐯𝐢 𝐚𝐬𝐩𝐞𝐭𝐭𝐚𝐫𝐞 𝐚𝐧𝐜𝐨𝐫𝐚 *${remainingTimeString}* 𝐩𝐫𝐢𝐦𝐚 𝐝𝐢 𝐩𝐨𝐭𝐞𝐫 𝐫𝐞𝐜𝐥𝐚𝐦𝐚𝐫𝐞 𝐧𝐮𝐨𝐯𝐚𝐦𝐞𝐧𝐭𝐞.`, fkontak);
  }

  let moneyToAdd = 1000;
  user.bank += moneyToAdd;
  user.lastclaim = currentTime;

  let text = `𝐇𝐚𝐢 𝐟𝐚𝐭𝐭𝐨 𝐮𝐧 𝐛𝐮𝐨𝐧 𝐥𝐚𝐯𝐨𝐫𝐨 𝐞𝐜𝐜𝐨 𝐚 𝐭𝐞 *${moneyToAdd}* € 𝐯𝐞𝐫𝐫𝐚𝐧𝐧𝐨 𝐝𝐞𝐩𝐨𝐬𝐢𝐭𝐚𝐭𝐢 𝐝𝐢𝐫𝐞𝐭𝐭𝐚𝐦𝐞𝐧𝐭𝐞 𝐬𝐮𝐥 𝐭𝐮𝐨 𝐜𝐨𝐧𝐭𝐨 𝐛𝐚𝐧𝐜𝐚𝐫𝐢𝐨.`;
  await conn.reply(m.chat, text, fkontak);
}

function msToTime(duration) {
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let seconds = Math.floor((duration / 1000) % 60);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + " 𝐨𝐫𝐞 " + minutes + " 𝐦𝐢𝐧𝐮𝐭𝐢 " + seconds + " 𝐬𝐞𝐜𝐨𝐧𝐝𝐢";
}

handler.command = /^(paghetta)$/i;
handler.isBotAdmin = true;
handler.group = true;
export default handler;
