import cp from 'child_process';
import { promisify } from 'util';
import translate from '@vitalets/google-translate-api';
// import { buttonsMessage } from '@whiskeysockets/baileys'; // Commenta questa linea

const exec = promisify(cp.exec).bind(cp);

const handler = async (m) => {
  await conn.reply(m.chat, '🚀 Esecuzione del test di velocità...', m); // Messaggio di attesa migliorato
  let o;
  try {
    o = await exec('python3 speed.py --secure --share');
  } catch (e) {
    o = e;
  } finally {
    const { stdout, stderr } = o;
    if (stdout.trim()) {
      const translated = await translate(stdout, { to: 'it' });
      const text = translated.text
        .replace(/(Scarica)/g, '- 🔵 𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝')
        .replace(/(Carica)/g, '- 🟣 𝐔𝐩𝐥𝐨𝐚𝐝')
        .replace(/(Ospitato)/g, 'Hostato');

      const formattedText = text.replace(/^[.\s]+/gm, '');
      const resultsText = formattedText.replace(/(Risultati delle azioni)/g, "Risultati");

      const finalText = resultsText.replace(/Test di velocità di download\s+-\s+/g, "──────────────\n- ")
                                    .replace(/Test di velocità di caricamento\s+-\s+/g, "\n- ")
                                    .replace(/Test da/g, "> • Test da")
                                    .replace(/Recupero elenco di server Speedtest.net/g, "> • Recupero elenco di server Speedtest.net")
                                    .replace(/Selezionando il miglior server in base al ping/g, "> • Selezionando il miglior server in base al ping")
                                    .replace(/Hostato da/g, "> • Hostato da")
                                    .replace(/MS/g, "MS\n");

      const finalReply = finalText.replace(/(𝐔𝐩𝐥𝐨𝐚𝐝: [\d.,]+ Mbit\/s)/g, "$1\n──────────────\n- 🟢 𝐑𝐢𝐬𝐮𝐥𝐭𝐚𝐭𝐢 : ");
      const finalReplyNoDuplicate = finalReply.replace(/(Risultati:)/g, "");

      const finalReplyMb = finalReplyNoDuplicate.replace(/Mbit\/s/g, " 𝐌𝐛𝐩𝐬");

      m.reply(finalReplyMb); // Invia solo il testo per ora
    }
    if (stderr.trim()) {
      const translated = await translate(stderr, { to: 'it' });
      m.reply(`⚠️ Errore durante l'esecuzione del test di velocità:\n\n${translated.text}`); // Messaggio di errore migliorato
    }
  }
};

handler.help = ['speedtest'];
handler.tags = ['info'];
handler.command = /^(speedtest?|test?|speed)$/i;
handler.owner = true;

// handler.on('button-response', async (m) => { // Commenta anche questa parte
//   const buttonId = m.buttonId;
//   if (buttonId === 'share_speedtest') {
//     const originalMessage = m.message?.buttonsResponseMessage?.displayText || m.message?.listResponseMessage?.title || '';
//     if (originalMessage) {
//       await conn.reply(m.chat, `Ecco i miei risultati del test di velocità:\n\n${originalMessage}`, m.quoted ? m.quoted : m);
//     } else {
//       await conn.reply(m.chat, 'Non sono riuscito a recuperare i risultati del test.', m);
//     }
//   }
// });

export default handler;
