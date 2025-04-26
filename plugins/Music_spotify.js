import axios from 'axios';
import fetch from 'node-fetch';
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@adiwajshing/baileys')).default;

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `╰⊱❗️⊱ *AZIONE UTILIZZATA IN MODO ERRATO* ⊱❗️⊱╮\n\n🍟 *DEVI USARE IL COMANDO COME NELL'ESEMPIO SEGUENTE:*\n${usedPrefix + command} *titolo musica*`;

    try {
        m.react('⌛️');

        // Ricerca delle tracce Spotify con la nuova API per ottenere il link diretto
        const res = await fetch(`https://api.siputzx.my.id/api/s/spotify?query=${encodeURIComponent(text)}`);
        const json = await res.json();
        const trackData = json?.data?.[0]; // Assumendo che la prima traccia sia la più rilevante
        if (!trackData?.track_url) throw "Impossibile ottenere il link della traccia.";

        // Ricerca delle informazioni sulla traccia con la vecchia funzione per i dettagli
        let songInfo = await spotifyxv(text);
        if (!songInfo.length) throw `Non è stata trovata la canzone.`;
        let song = songInfo[0];

        async function createImage(url) {
            const { imageMessage } = await generateWAMessageContent({ image: { url } }, {
                upload: conn.waUploadToServer
            });
            return imageMessage;
        }

        const imageMsg = await createImage(song.imagen);

        const info = `🪼 *Titolo:*\n${song.name}\n\n🪩 *Artista:*\n${song.artista.join(', ')}\n\n🦋 *Album:*\n${song.album}\n\n⏳ *Durata:*\n${song.duracion}\n\n🔗 *Link Spotify:*\n${song.url}\n\n🎧 *Ascolta qui:*\n${trackData.track_url}\n\n${wm}`;

        const audioMessage = {
            audio: { url: trackData.track_url },
            mimetype: 'audio/mpeg',
            fileName: `${song.name}.mp3`,
            caption: info,
            contextInfo: {
                forwardingScore: 9999999,
                isForwarded: true,
                externalAdReply: {
                    showAdAttribution: true,
                    containsAutoReply: true,
                    renderLargerThumbnail: true,
                    title: 'Musica Spotify',
                    mediaType: 2, // Ho cambiato il mediaType a 2 per l'audio
                    thumbnailUrl: song.imagen,
                    mediaUrl: trackData.track_url,
                    sourceUrl: trackData.track_url
                }
            }
        };

        await conn.sendMessage(m.chat, audioMessage, { quoted: m });
        m.react('✅');

    } catch (e1) {
        m.react('❌');
        m.reply(`❌ Si è verificato un errore imprevisto: ${e1.message || e1}`);
    }
};

handler.command = ['spotify', 'music', 'spot'];
handler.help = ['spotify <nome canzone>', 'music <nome canzone>', 'spot <nome canzone>'];
handler.tags = ['downloader'];
export default handler;

async function spotifyxv(query) {
    let token = await tokens();
    let response = await axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/search' + encodeURIComponent(query) + '&type=track&limit=1',
        headers: {
            Authorization: 'Bearer ' + token,
        },
    });
    const tracks = response.data?.tracks?.items;
    if (!tracks || tracks.length === 0) return [];
    const results = tracks.map((track) => ({
        name: track.name,
        artista: track.artists.map((artist) => artist.name),
        album: track.album.name,
        duracion: timestamp(track.duration_ms),
        url: track.external_urls.spotify,
        imagen: track.album.images.length ? track.album.images[0].url : '',
    }));
    return results;
}

async function tokens() {
    const response = await axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + Buffer.from('acc6302297e040aeb6e4ac1fbdfd62c3:0e8439a1280a43aba9a5bc0a16f3f009').toString('base64'),
        },
        data: 'grant_type=client_credentials',
    });
    return response.data.access_token;
}

function timestamp(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

async function getBuffer(url, options) {
    try {
        options = options || {};
        const res = await axios({
            method: 'get',
            url,
            headers: {
                DNT: 1,
                'Upgrade-Insecure-Request': 1,
            },
            ...options,
            responseType: 'arraybuffer',
        });
        return res.data;
    } catch (err) {
        return err;
    }
}

async function getTinyURL(text) {
    try {
        let response = await axios.get(`https://tinyurl.com/api-create.php?url=${text}`);
        return response.data;
    } catch (error) {
        return text;
    }
}
