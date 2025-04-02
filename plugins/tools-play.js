import fetch from "node-fetch";
import yts from 'yt-search';
import axios from "axios";

const formatAudio = ['mp3', 'm4a', 'webm', 'acc', 'flac', 'opus', 'ogg', 'wav'];
const formatVideo = ['360', '480', '720', '1080', '1440', '4k']; // Aggiunte più opzioni di qualità video

const ddownr = {
    download: async (url, format) => {
        if (!formatAudio.includes(format) && !formatVideo.includes(format)) {
            throw new Error('Formato non supportato, verifica la lista di formati disponibili.');
        }

        const config = {
            method: 'GET',
            url: `https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        };

        try {
            const response = await axios.request(config);

            if (response.data && response.data.success) {
                const { id, title, info } = response.data;
                const { image } = info;
                const downloadUrl = await ddownr.cekProgress(id);

                return {
                    id: id,
                    image: image,
                    title: title,
                    downloadUrl: downloadUrl
                };
            } else {
                throw new Error('Fallo al obtener los detalles del video.');
            }
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },
    cekProgress: async (id) => {
        const config = {
            method: 'GET',
            url: `https://p.oceansaver.in/ajax/progress.php?id=${id}`,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        };

        try {
            while (true) {
                const response = await axios.request(config);

                if (response.data && response.data.success && response.data.progress === 1000) {
                    return response.data.download_url;
                }
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
};

const handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        if (!text.trim()) {
            return conn.reply(m.chat, `💣 Inserisci il nome della musica o del video da ascoltare/scaricare.`, m);
        }

        const search = await yts(text);
        if (!search.all || search.all.length === 0) {
            return m.reply('Non ho trovato risultati per la tua ricerca.');
        }

        const videoInfo = search.all[0];
        const { title, thumbnail, timestamp, views, ago, url } = videoInfo;
        const vistas = formatViews(views);
        const infoMessage = `
⭐ *Titolo:* ${title}
⏳ *Durata:* ${timestamp}
👁️ *Visualizzazioni:* ${vistas}
📺 *Canale:* ${videoInfo.author.name || 'Sconosciuto'}
📅 *Pubblicato:* ${ago}
🔗 *Link:* ${url}`;
        const thumb = (await conn.getFile(thumbnail))?.data;


        conn.sendMessage(m.chat, {
            text: infoMessage,
            contextInfo: {
                externalAdReply: {
                    title: packname,
                    body: packname,
                    mediaType: 1,
                    previewType: 0,
                    mediaUrl: url,
                    sourceUrl: url,
                    thumbnail: thumb,
                }
            }
        });

        if (command === 'play') {
            const api = await ddownr.download(url, 'mp3');
            const result = api.downloadUrl;
            await conn.sendMessage(m.chat, { audio: { url: result }, mimetype: "audio/mpeg" }, { quoted: m });

        } else if (command === 'play2' || command === 'ytmp4') {
            // Aggiungiamo la possibilità di scegliere la qualità
            let qualityOptions = formatVideo.map((q, index) => ({
                text: q,
                value: q
            }));

            conn.sendMessage(m.chat, {
                text: 'Scegli la qualità del video che vuoi scaricare:',
                footer: 'Rispondi a questo messaggio con il numero della qualità scelta.',
                buttons: qualityOptions.map((option, index) => ({ buttonId: `${index + 1}`, buttonText: { displayText: option.text }, type: 1 })),
                headerType: 1
            }, { quoted: m }).then(async (sentMessage) => {
                conn.awaitMessages(m.chat, (response) => {
                    const selectedIndex = parseInt(response.body) - 1;
                    return !isNaN(selectedIndex) && selectedIndex >= 0 && selectedIndex < formatVideo.length;
                }, { maxTries: 1, time: 30000, ...m.msg }).then(async (answer) => {
                    if (answer && answer.lastMessage) {
                        const selectedQuality = formatVideo[parseInt(answer.lastMessage.body) - 1];
                        console.log(`Qualità selezionata: ${selectedQuality}`);

                        let sources = [
                            `https://api.siputzx.my.id/api/d/ytmp4?url=${url}`,
                            `https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${url}`,
                            `https://axeel.my.id/api/download/video?url=${encodeURIComponent(url)}`,
                            `https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`
                        ];

                        let success = false;
                        for (let source of sources) {
                            try {
                                const res = await fetch(source);
                                const json = await res.json();
                                let downloadUrl = json?.data?.link || json?.result?.url || json?.url || json?.download;

                                if (downloadUrl) {
                                    success = true;
                                    await conn.sendMessage(m.chat, {
                                        video: { url: downloadUrl },
                                        fileName: `${title}.${selectedQuality}.mp4`,
                                        mimetype: 'video/mp4',
                                        caption: `${dev}`,
                                        thumbnail: thumb
                                    }, { quoted: m });
                                    break;
                                }
                            } catch (e) {
                                console.error(`Errore ${source}:`, e.message);
                            }
                        }

                        if (!success) {
                            return m.reply(`⚠︎ *Impossibile scaricare il video in qualità ${selectedQuality}:* Non è stato trovato alcun link valido per il download.`);
                        }
                    } else {
                        conn.reply(m.chat, 'Tempo scaduto o scelta non valida.', m);
                    }
                });
            });
        } else {
            throw "Comando non riconosciuto.";
        }
    } catch (error) {
        return m.reply(`⚠︎ *Errore:* ${error.message}`);
    }
};

handler.command = handler.help = ['play', 'ytmp4', 'play2'];
handler.tags = ['downloader'];

export default handler;

function formatViews(views) {
    if (views >= 1000) {
        return (views / 1000).toFixed(1) + 'k (' + views.toLocaleString() + ')';
    } else {
        return views.toString();
    }
}
