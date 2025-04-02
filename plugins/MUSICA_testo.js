import yts from 'yt-search';
import axios from "axios";

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text.trim()) return conn.reply(m.chat, `💣 Inserisci il nome della musica.`, m);
    const search = await yts(text);
    if (!search.all.length) return m.reply('Nessun risultato trovato.');
    const videoInfo = search.all[0];
    const { title, thumbnail, timestamp, views, ago, url, author } = videoInfo;
    const formattedViews = new Intl.NumberFormat().format(views);
    const infoMessage = `
⭐ *Titolo:* ${title}
⏳ *Durata:* ${timestamp}
👁️ *Visualizzazioni:* ${formattedViews}
📺 *Canale:* ${author?.name || 'Sconosciuto'}
📅 *Pubblicato:* ${ago}
🔗 *Link:* ${url}`;
    const thumb = (await conn.getFile(thumbnail))?.data;
    await conn.sendMessage(m.chat, {
      text: infoMessage,
      contextInfo: {
        externalAdReply: {
          title: 'YouTube Downloader',
          body: 'Scarica facilmente audio/video',
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
        }
      }
    });
    let artist = author?.name || "";
    if (!artist) {
      return m.reply("Artista non trovato per cercare il testo della canzone.");
    }
    let lyrics;
    try {
      const lyricsResponse = await axios.get(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`);
      lyrics = lyricsResponse.data.lyrics;
      if (!lyrics) {
        const cleanedTitle = title.split(" - ")[0].split("(")[0].trim();
        const fallbackResponse = await axios.get(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(cleanedTitle)}`);
        lyrics = fallbackResponse.data.lyrics;
      }
      if (!lyrics) return m.reply("Testo non trovato.");
      await conn.sendMessage(m.chat, { text: lyrics }, { quoted: m });
    } catch (error) {
      return m.reply(`Errore nel recupero del testo: ${error.response?.data?.error || error.message}`);
    }
  } catch (error) {
    return m.reply(`⚠︎ *Errore:* ${error.message}`);
  }
};

handler.command = handler.help = ['testo', 'music'];
handler.tags = ['downloader'];

export default handler;