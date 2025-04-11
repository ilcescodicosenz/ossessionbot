const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { pipeline } = require('stream');
const streamPipeline = promisify(pipeline);

const handler = async (msg, { conn, text, usedPrefix }) => {
  if (!text) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: `✳️ Usa correttamente il comando:\n\n📌 Esempio: *${usedPrefix}play2doc* Baby gang - Mentalitè`
    }, { quoted: msg });
  }

  await conn.sendMessage(msg.key.remoteJid, {
    react: { text: '⏳', key: msg.key }
  });

  try {
    const searchUrl = `https://api.neoxr.eu/api/video?q=${encodeURIComponent(text)}&apikey=russellxz`;
    const searchRes = await axios.get(searchUrl);
    const videoInfo = searchRes.data;

    if (!videoInfo || !videoInfo.data?.url) throw new Error('Impossibile trovare il video');

    const title = videoInfo.title || 'video';
    const thumbnail = videoInfo.thumbnail;
    const duration = videoInfo.fduration || '0:00';
    const views = videoInfo.views || 'N/A';
    const author = videoInfo.channel || 'Sconosciuto';
    const videoLink = `https://www.youtube.com/watch?v=${videoInfo.id}`;

    const captionPreview = `
╔═════════════════╗
║ ⟆ 𝑶𝑺𝑺𝑬𝑺𝑺𝑰𝑶𝑵𝑩𝑶𝑻 ⟇ ✦
╚═════════════════╝

📀 *Info del video:*
├ 🎼 *Titolo:* ${title}
├ ⏱️ *Durata:* ${duration}
├ 👁️ *Visualizzazioni:* ${views}
├ 👤 *Autore:* ${author}
└ 🔗 *Link:* ${videoLink}

📥 *Opzioni:*
┣ 🎵 _${usedPrefix}play1 ${text}_
┣ 🎥 _${usedPrefix}play6 ${text}_
┗ ⚠️ *Non si riproduce?* Usa _${usedPrefix}ff_

⏳ Elaborazione video in corso...
═════════════════════`;

    await conn.sendMessage(msg.key.remoteJid, {
      image: { url: thumbnail },
      caption: captionPreview
    }, { quoted: msg });

    const qualities = ['720p', '480p', '360p'];
    let videoData = null;

    for (let quality of qualities) {
      try {
        const apiUrl = `https://api.neoxr.eu/api/youtube?url=${encodeURIComponent(videoLink)}&apikey=russellxz&type=video&quality=${quality}`;
        const response = await axios.get(apiUrl);
        if (response.data?.status && response.data?.data?.url) {
          videoData = {
            url: response.data.data.url,
            title: response.data.title || title,
            id: response.data.id || videoInfo.id
          };
          break;
        }
      } catch { continue; }
    }

    if (!videoData) throw new Error('Impossibile ottenere il video');

    const tmpDir = path.join(__dirname, '../tmp');
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);
    const filePath = path.join(tmpDir, `${Date.now()}_video.mp4`);

    const resDownload = await axios.get(videoData.url, {
      responseType: 'stream',
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    await streamPipeline(resDownload.data, fs.createWriteStream(filePath));

    const stats = fs.statSync(filePath);
    if (!stats || stats.size < 100000) {
      fs.unlinkSync(filePath);
      throw new Error('Il video scaricato è vuoto o incompleto');
    }

    const finalText = `🎬 Ecco il tuo video in formato documento.\n\n© Azura Ultra 2.0 Bot`;

    await conn.sendMessage(msg.key.remoteJid, {
      document: fs.readFileSync(filePath),
      mimetype: 'video/mp4',
      fileName: `${videoData.title}.mp4`,
      caption: finalText
    }, { quoted: msg });

    fs.unlinkSync(filePath);

    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: '✅', key: msg.key }
    });

  } catch (err) {
    console.error(err);
    await conn.sendMessage(msg.key.remoteJid, {
      text: `❌ *Errore:* ${err.message}`
    }, { quoted: msg });
    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: '❌', key: msg.key }
    });
  }
};

handler.command = ['play2'];
module.exports = handler;
