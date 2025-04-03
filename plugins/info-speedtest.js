import cp from 'child_process';
import { promisify } from 'util';
import { buttonsMessage } from '@whiskeysockets/baileys'; // Importa buttonsMessage

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
      let text = stdout;

      text = text
        .replace(/(Download)/g, '- 🔵 𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝')
        .replace(/(Upload)/g, '- 🟣 𝐔𝐩𝐥𝐨𝐚𝐝')
        .replace(/(Hosted)/g, 'Hostato');

      const formattedText = text.replace(/^[.\s]+/gm, '');
      const resultsText = formattedText.replace(/(Results of actions)/g, "Risultati");

      let finalText = resultsText.replace(/Download Speed Test\s+-\s+/g, "──────────────\n- ")
                                    .replace(/Upload Speed Test\s+-\s+/g, "\n- ")
                                    .replace(/Test from/g, "> • Test da")
                                    .replace(/Retrieving Speedtest.net server list/g, "> • Recupero elenco di server Speedtest.net")
                                    .replace(/Selecting best server based on ping/g, "> • Selezionando il miglior server in base al ping")
                                    .replace(/Hosted by/g, "> • Hostato da")
                                    .replace(/MS/g, "MS\n");

      const finalReply = finalText.replace(/(Upload: [\d.,]+ Mbit\/s)/g, "$1\n──────────────\n- 🟢 𝐑𝐢𝐬𝐮𝐥𝐭𝐚𝐭𝐢 : ");
      const finalReplyNoDuplicate = finalReply.replace(/(Risultati:)/g, "");
      const finalReplyMb = finalReplyNoDuplicate.replace(/Mbit\/s/g, " 𝐌𝐛𝐩𝐬");

      // Estrai Ping e Jitter (assumendo un formato simile a "Ping: 10 ms\nJitter: 2 ms")
      const pingMatch = stdout.match(/Ping:\s*(\d+\.?\d*)\s*ms/i);
      const jitterMatch = stdout.match(/Jitter:\s*(\d+\.?\d*)\s*ms/i);
      const ping = pingMatch ? `- ⏱️ Ping: ${pingMatch[1]} ms` : '';
      const jitter = jitterMatch ? `- 📶 Jitter: ${jitterMatch[1]} ms` : '';

      // Estrai il link di condivisione di Speedtest.net (assumendo un formato simile a "Share: https://www.speedtest.net/result/...")
      const shareLinkMatch = stdout.match(/Share:\s*(https?:\/\/www\.speedtest\.net\/result\/[\w-]+)/i);
      const shareLink = shareLinkMatch ? `🔗 Link Condivisione: ${shareLinkMatch[1]}` : '';

      const messageText = `${finalReplyMb}\n${ping}\n${jitter}\n\n${shareLink}`.trim();

      // Aggiungi un pulsante per condividere i risultati
      const buttons = [
        { buttonId: 'share_speedtest', buttonText: { displayText: 'Condividi Risultati' }, type: 1 },
      ];

      const buttonMessage = {
        text: messageText,
        buttons: buttons,
        footer: 'Speedtest by @fcesco_' // Aggiungi il tuo tag o nome
      };

      await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
    }
    if (stderr.trim()) {
      m.reply(`⚠️ Errore durante l'esecuzione del test di velocità:\n\n${stderr}`);
    }
  }
};

handler.help = ['speedtest'];
handler.tags = ['info'];
handler.command = /^(speedtest?|test?|speed)$/i;
handler.owner = true;

handler.on('button-response', async (m) => {
  const buttonId = m.buttonId;
  if (buttonId === 'share_speedtest') {
    const originalMessage = m.message?.buttonsResponseMessage?.displayText || m.message?.listResponseMessage?.title || '';
    if (originalMessage) {
      await conn.reply(m.chat, `Ecco i miei risultati del test di velocità:\n\n${originalMessage}`, m.quoted ? m.quoted : m);
    } else {
      await conn.reply(m.chat, 'Non sono riuscito a recuperare i risultati del test.', m);
    }
  }
});

export default handler;
