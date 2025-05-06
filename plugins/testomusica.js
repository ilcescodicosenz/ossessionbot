import axios from 'axios';
import cheerio from 'cheerio';

const handler = async (m, { conn, text }) => {
  if (!text) return m.reply('· · ──ID── ·𖥸· ──NA── · ·\nInserisci il nome della canzone.');

  let artistRaw, titleRaw;

  if (text.includes('-')) {
    [artistRaw, titleRaw] = text.split('-').map(s => s.trim());
  } else {
    const parts = text.trim().split(/\s+/);
    if (parts.length < 2) {
      return m.reply('· · ──ID── ·𖥸· ──04── · ·\nFormato non valido. Usa: artista - titolo oppure artista titolo');
    }

    let found = false;
    for (let i = 1; i < parts.length; i++) {
      artistRaw = parts.slice(0, i).join('');
      titleRaw = parts.slice(i).join('');
      const artist = artistRaw.toLowerCase().replace(/[^a-z0-9]/gi, '');
      const title = titleRaw.toLowerCase().replace(/[^a-z0-9]/gi, '');
      const url = `https://www.azlyrics.com/lyrics/${artist}/${title}.html`;

      try {
        const { data: html } = await axios.get(url);
        const $ = cheerio.load(html);
        const lyricsDiv = $('div:not([class]):not([id])')
          .filter(function () {
            return $(this).text().trim().length > 0;
          })
          .first();
        const lyrics = lyricsDiv.text().trim();
        if (lyrics) {
          await conn.sendMessage(m.chat, { text: lyrics }, { quoted: m });
          return;
        }
      } catch (e) {
        continue;
      }
    }

    return m.reply('· · ──ID── ·𖥸· ──03── · ·\nTesto non trovato.\n\nProva a scrivere: artista - titolo');
  }

  const artist = artistRaw.toLowerCase().replace(/[^a-z0-9]/gi, '');
  const title = titleRaw.toLowerCase().replace(/[^a-z0-9]/gi, '');
  const url = `https://www.azlyrics.com/lyrics/${artist}/${title}.html`;

  try {
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);

    const lyricsDiv = $('div:not([class]):not([id])')
      .filter(function () {
        return $(this).text().trim().length > 0;
      })
      .first();

    const lyrics = lyricsDiv.text().trim();

    if (!lyrics) throw new Error();

    await conn.sendMessage(m.chat, { text: lyrics }, { quoted: m });
  } catch (err) {
    await m.reply('· · ──ID── ·𖥸· ──03── · ·\nTesto non trovato.\n\nProva a invertire i due nomi o usare il formato: artista - titolo');
  }
};

handler.help = ['lyrics <artista> - <titolo>', 'lyrics <artista> <titolo>'];
handler.tags = ['tools'];
handler.command = ['testo'];

export default handler;
