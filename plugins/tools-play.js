import axios from 'axios';
import crypto from 'crypto';
import yts from 'yt-search';
import fetch from "node-fetch";

const formatAudio = ['mp3', 'm4a', 'webm', 'acc', 'flac', 'opus', 'ogg', 'wav'];
const formatVideo = ['360', '480', '720', '1080', '1440', '4k'];

const ddownr = {
    download: async (url, format) => {
        if (!formatAudio.includes(format) && !formatVideo.includes(format)) {
            throw new Error('Formato non supportato.');
        }

        try {
            const { data } = await axios.get(`https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`, {
                headers: { 'User-Agent': 'Mozilla/5.0' }
            });

            if (data?.success) {
                return {
                    id: data.id,
                    image: data.info.image,
                    title: data.title,
                    downloadUrl: await ddownr.cekProgress(data.id)
                };
            } else {
                throw new Error('Errore nel recupero dei dettagli del video.');
            }
        } catch (error) {
            console.error('Errore:', error.message);
            throw error;
        }
    },

    cekProgress: async (id) => {
        try {
            while (true) {
                const { data } = await axios.get(`https://p.oceansaver.in/ajax/progress.php?id=${id}`, {
                    headers: { 'User-Agent': 'Mozilla/5.0' }
                });

                if (data?.success && data.progress === 1000) {
                    return data.download_url;
                }
                await new Promise(resolve => setTimeout(resolve, 3000)); // Ridotto da 5000 a 3000 ms
            }
        } catch (error) {
            console.error('Errore:', error.message);
            throw error;
        }
    }
};

const savetube = {
    api: {
        base: "https://media.savetube.me/api",
        cdn: "/random-cdn",
        info: "/v2/info",
        download: "/download"
    },
    headers: {
        'accept': '*/*',
        'content-type': 'application/json',
        'origin': 'https://yt.savetube.me',
        'referer': 'https://yt.savetube.me/',
        'user-agent': 'Postify/1.0.0'
    },
    formats: ['144', '240', '360', '480', '720', '1080', 'mp3'],

    crypto: {
        hexToBuffer: (hexString) => {
            const matches = hexString.match(/.{1,2}/g);
            return Buffer.from(matches.join(''), 'hex');
        },

        decrypt: async (enc) => {
            try {
                const secretKey = 'C5D58EF67A7584E4A29F6C35BBC4EB12';
                const data = Buffer.from(enc, 'base64');
                const iv = data.slice(0, 16);
                const content = data.slice(16);
                const key = savetube.crypto.hexToBuffer(secretKey);

                const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
                let decrypted = decipher.update(content);
                decrypted = Buffer.concat([decrypted, decipher.final()]);

                return JSON.parse(decrypted.toString());
            } catch (error) {
                throw new Error(`${error.message}`);
            }
        }
    },

    isUrl: str => {
        try {
            new URL(str);
            return true;
        } catch (_) {
            return false;
        }
    },

    youtube: url => {
        if (!url) return null;
        const a = [
            /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
            /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
            /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
            /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
            /youtu\.be\/([a-zA-Z0-9_-]{11})/
        ];
        for (let b of a) {
            if (b.test(url)) return url.match(b)[1];
        }
        return null;
    },

    request: async (endpoint, data = {}, method = 'post') => {
        try {
            const { data: response } = await axios({
                method,
                url: `${endpoint.startsWith('http') ? '' : savetube.api.base}${endpoint}`,
                data: method === 'post' ? data : undefined,
                params: method === 'get' ? data : undefined,
                headers: savetube.headers
            });
            return {
                status: true,
                code: 200,
                data: response
            };
        } catch (error) {
            return {
                status: false,
                code: error.response?.status || 500,
                error: error.message
            };
        }
    },

    getCDN: async () => {
        const response = await savetube.request(savetube.api.cdn, {}, 'get');
        if (!response.status) return response;
        return {
            status: true,
            code: 200,
            data: response.data.cdn
        };
    },

    download: async (link, format) => {
        if (!link) {
            return {
                status: false,
                code: 400,
                error: "No se proporcionó un enlace válido."
            };
        }

        if (!savetube.isUrl(link)) {
            return {
                status: false,
                code: 400,
                error: "Debes proporcionar un enlace de YouTube válido."
            };
        }

        if (!format || !savetube.formats.includes(format)) {
            return {
                status: false,
                code: 400,
                error: "Formato no válido. Usa uno de los disponibles.",
                available_fmt: savetube.formats
            };
        }

        const id = savetube.youtube(link);
        if (!id) {
            return {
                status: false,
                code: 400,
                error: "No se pudo extraer el ID del video de YouTube."
            };
        }

        try {
            const cdnx = await savetube.getCDN();
            if (!cdnx.status) return cdnx;
            const cdn = cdnx.data;

            const result = await savetube.request(`https://${cdn}${savetube.api.info}`, {
                url: `https://www.youtube.com/watch?v=${id}`
            });
            if (!result.status) return result;
            const decrypted = await savetube.crypto.decrypt(result.data.data);

            const dl = await savetube.request(`https://${cdn}${savetube.api.download}`, {
                id: id,
                downloadType: format === 'mp3' ? 'audio' : 'video',
                quality: format === 'mp3' ? '128' : format,
                key: decrypted.key
            });

            return {
                status: true,
                code: 200,
                result: {
                    title: decrypted.title || "Desconocido",
                    type: format === 'mp3' ? 'audio' : 'video',
                    format: format,
                    thumbnail: decrypted.thumbnail || `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
                    download: dl.data.data.downloadUrl,
                    id: id,
                    key: decrypted.key,
                    duration: decrypted.duration,
                    quality: format === 'mp3' ? '128' : format,
                    downloaded: dl.data.data.downloaded || false
                }
            };

        } catch (error) {
            return {
                status: false,
                code: 500,
                error: error.message
            };
        }
    }
};

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

        conn.sendMessage(m.chat, {
            text: infoMessage,
            contextInfo: {
                externalAdReply: {
                    title: '  Ossession Downloader',
                    body: 'Scarica facilmente audio/video By Cesco ',
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
            await conn.sendMessage(m.chat, {
                audio: { url: api.downloadUrl },
                mimetype: "audio/mpeg"
            }, { quoted: m });

        } else if (command === 'play2' || command === 'ytmp4') {
            let sources = [
                `https://api.siputzx.my.id/api/d/ytmp4?url=${url}`,
                `https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${url}`,
                `https://axeel.my.id/api/download/video?url=${encodeURIComponent(url)}`,
                `https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`
            ];

            const results = await Promise.allSettled(sources.map(src => fetch(src).then(res => res.json())));

            for (const result of results) {
                if (result.status === "fulfilled") {
                    const { data, result: resResult, downloads } = result.value;
                    const downloadUrl = data?.dl || resResult?.download?.url || downloads?.url || data?.download?.url;
                    if (downloadUrl) {
                        return conn.sendMessage(m.chat, {
                            video: { url: downloadUrl },
                            fileName: `${title}.mp4`,
                            mimetype: 'video/mp4',
                            caption: 'Scaricato con successo!',
                            thumbnail: thumb
                        }, { quoted: m });
                    }
                }
            }

            return m.reply(`⚠︎ Nessun link valido trovato.`);
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
handler.help = ['play', 'play2'];
handler.command = ['play', 'play2'];
handler.tags = ['downloader'];

export default handler;
