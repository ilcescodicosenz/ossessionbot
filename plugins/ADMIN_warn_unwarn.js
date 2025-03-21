const time = async (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

let handler = async (m, { conn, text, args, groupMetadata, usedPrefix, command }) => {
  if (command == 'warn' || command == "ammonisci") {
    let maxWarnings = 5;
    let who;

    if (m.isGroup) {
      who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : true;
    } else {
      who = m.chat;
    }

    if (!who) return;

    if (!(who in global.db.data.users)) {
      global.db.data.users[who] = { warn: 0, warnLog: [] }; // Inizializza warnLog
    }

    let warn = global.db.data.users[who].warn;
    let user = global.db.data.users[who];
    const reason = text ? '❓ » ' + text.replace(m.sender, '') : 'Nessun motivo specificato';
    const now = new Date();

    if (warn < maxWarnings) {
      global.db.data.users[who].warn += 1;
      global.db.data.users[who].warnLog.push({
        timestamp: now.toISOString(),
        reason: reason,
        issuedBy: m.sender,
      });

      let prova = {
        "key": {
          "participants": "0@s.whatsapp.net",
          "fromMe": false,
          "id": "Halo"
        },
        "message": {
          "locationMessage": {
            name: 'Warning',
            "jpegThumbnail": await (await fetch('https://qu.ax/fmHdc.png')).buffer(),
            vcard: `BEGIN:VCARD\nVERSION:1.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
          }
        },
        "participant": "0@s.whatsapp.net"
      };

      conn.reply(m.chat, `⚠️ » @${who.split('@')[0]}\n⚠️ » *${user.warn} / 5*\n${reason.capitalize()}`, prova, { mentions: [who] });
    } else if (warn == maxWarnings) {
      global.db.data.users[who].warn = 0;
      global.db.data.users[who].warnLog = []; //reset log
      conn.reply(m.chat, `Warning limit reached. User removed from the group.`, prova);
      await time(1000);
      await conn.groupParticipantsUpdate(m.chat, [who], 'remove');
    }
  }

    if (command == 'warnlog') {
    let who;
    if (m.isGroup) {
      who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
    } else {
      who = m.chat;
    }
    if (!who) return;

    if (!(who in global.db.data.users)) {
      m.reply('User has no warnings.');
      return;
    }

    const warnLog = global.db.data.users[who].warnLog;
    if (!warnLog || warnLog.length === 0) {
      m.reply('User has no warning logs.');
      return;
    }

    let logMessage = `Warning Log for @${who.split('@')[0]}:\n\n`;
    warnLog.forEach((log, index) => {
      logMessage += `${index + 1}. Date: ${log.timestamp}\nReason: ${log.reason}\nIssued By: @${log.issuedBy.split('@')[0]}\n\n`;
    });
    conn.reply(m.chat, logMessage, null, { mentions: [who, ...warnLog.map(log => log.issuedBy)] });
  }

  if (command == 'unwarn' || command == "delwarn") {
    // ... (your unwarn code)
      if (warn > 0) {
      global.db.data.users[who].warn -= 1;
      global.db.data.users[who].warnLog.pop(); //remove last warning log.
      let user = global.db.data.users[who];

      let prova = {
        "key": {
          "participants": "0@s.whatsapp.net",
          "fromMe": false,
          "id": "Halo"
        },
        "message": {
          "locationMessage": {
            name: 'Warning',
            "jpegThumbnail": await (await fetch('https://qu.ax/fmHdc.png')).buffer(),
            vcard: `BEGIN:VCARD\nVERSION:1.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
          }
        },
        "participant": "0@s.whatsapp.net"
      };

      conn.reply(m.chat, `⚠️ » @${who.split('@')[0]}\n⚠️ » *${user.warn} / 5*`, prova, { mentions: [who] });
    } else if (warn == 0) {
      m.reply("The user has no warnings to remove.");
    }
  }
};

handler.help = handler.command = ['warn', 'ammonisci', 'unwarn', 'delwarn', 'warnlog'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
