import { existsSync, promises as fsPromises } from 'fs';
import path from 'path';

const handler = async (message, { conn, usedPrefix }) => {
  // Controlla che il comando sia eseguito direttamente dal numero principale del bot
  if (global.conn.user.jid !== conn.user.jid) {
    return conn.sendMessage(
      message.chat,
      {
        text: "*🚨 Utilizza questo comando direttamente nel numero principale del Bot.*"
      },
      { quoted: message }
    );
  }

  // Invia messaggio di avvio della procedura di eliminazione sessioni
  await conn.sendMessage(
    message.chat,
    {
      text: "ⓘ Ripristino delle sessioni in corso..."
    },
    { quoted: message }
  );

  try {
    const sessionFolder = "./Sessioni/";

    if (!existsSync(sessionFolder)) {
      return await conn.sendMessage(
        message.chat,
        {
          text: "*La cartella Sessioni non esiste o è vuota.*"
        },
        { quoted: message }
      );
    }

    const sessionFiles = await fsPromises.readdir(sessionFolder);
    let deletedCount = 0;

    for (const file of sessionFiles) {
      // Non eliminare il file di credenziali
      if (file !== "creds.json") {
        await fsPromises.unlink(path.join(sessionFolder, file));
        deletedCount++;
      }
    }

    const responseText =
      deletedCount === 0
        ? "❗ Le sessioni sono vuote ‼️"
        : `ⓘ Sono stati eliminati ${deletedCount} archivi nelle sessioni`;

    await conn.sendMessage(
      message.chat,
      { text: responseText },
      { quoted: message }
    );
  } catch (error) {
    console.error('⚠️ Errore:', error);
    await conn.sendMessage(
      message.chat,
      { text: "❌ Errore di eliminazione!" },
      { quoted: message }
    );
  }

  // Componi e invia il messaggio finale con il "livello di lettura"
  const botName = global.db.data.nomedelbot || "⟆ 𝑶𝑺𝑺𝑬𝑺𝑺𝑰𝑶𝑵𝑩𝑶𝑻 ⟇ ✦";
  const quotedMessage = {
    key: {
      participants: "0@s.whatsapp.net",
      fromMe: false,
      id: 'Halo'
    },
    message: {
      locationMessage: {
        name: botName,
        // Scarica la miniatura da URL e convertila in buffer
        jpegThumbnail: await (await fetch("https://i.ibb.co/JRc3WH15/chatunity-jpg.jpg")).buffer(),
        vcard: 
          "BEGIN:VCARD\n" +
          "VERSION:3.0\n" +
          "N:;Unlimited;;;\n" +
          "FN:Unlimited\n" +
          "ORG:Unlimited\n" +
          "TITLE:\n" +
          "item1.TEL;waid=19709001746:+1 (970) 900-1746\n" +
          "item1.X-ABLabel:Unlimited\n" +
          "X-WA-BIZ-DESCRIPTION:ofc\n" +
          "X-WA-BIZ-NAME:Unlimited\n" +
          "END:VCARD"
      }
    },
    participant: '0@s.whatsapp.net'
  };

  await conn.sendMessage(
    message.chat,
    {
      text: "ⓘ Ora sara in grado di leggere i messaggi del bot"
    },
    { quoted: quotedMessage }
  );
};

handler.help = ['del_reg_in_session_owner'];
handler.tags = ["owner"];
handler.command = /^(deletession|ds|clearallsession)$/i;
handler.admin = true;

export default handler;
