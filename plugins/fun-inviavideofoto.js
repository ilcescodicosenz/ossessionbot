import fetch from 'node-fetch';
import axios from 'axios';
//import instagramGetUrl from 'instagram-url-direct';
//import {instagram} from '@xct007/frieren-scraper';
//import {instagramdl} from '@bochilteam/scraper';

const handler = async (m, { conn, args, command, usedPrefix }) => {
    if (!args[0]) throw `⚠️ Per favore, inserisci un link di Instagram!\nUsa il comando: *${usedPrefix + command} Link Instagram foto o video*`;

    const { key } = await conn.sendMessage(m.chat, { text: "⏳ Attendere..." }, { quoted: m });
    
    try {
        const res = await fetch(`https://api.siputzx.my.id/api/d/igdl?url=${args[0]}`);
        const data = await res.json();
        const fileType = data.data[0].url.includes('.webp') ? 'image' : 'video'; 
        const downloadUrl = data.data[0].url;

        if (fileType === 'image') {
            await conn.sendFile(m.chat, downloadUrl, 'instagram.jpg', "📷 Ecco la tua immagine!", m);
        } else if (fileType === 'video') {
            await conn.sendFile(m.chat, downloadUrl, 'instagram.mp4', "🎥 Ecco il tuo video!", m);
        }
    } catch {
        try {
            const apiUrl = `https://api.betabotz.org/api/download/igdowloader?url=${encodeURIComponent(args[0])}&apikey=bot-secx3`;
            const response = await axios.get(apiUrl);
            const result = response.data;

            for (const item of result.message) {
                const shortUrl = await (await fetch(`https://tinyurl.com/api-create.php?url=${item.thumbnail}`)).text();
                let text = `🔗 *Link:* ${shortUrl}\n\n📥 Download in corso...`;
                await conn.sendFile(m.chat, item._url, null, text, m);
            }
        } catch {
            try {
                const instagramData = await fetch(`https://api.lolhuman.xyz/api/instagram?apikey=${lolkeysapi}&url=${args[0]}`);
                const json = await instagramData.json();
                const videoUrl = json.result;
                await conn.sendFile(m.chat, videoUrl, 'instagram.mp4', "🎥 Ecco il tuo video!", m);
            } catch (e) {
                conn.sendMessage(m.chat, { text: `❌ Errore nel download. Riprova più tardi!`, edit: key });
                console.log(`❗ Errore durante il download di Instagram ❗`);
                console.log(e);
            }
        }
    }
};

handler.help = ['instagram <link ig>'];
handler.tags = ['downloader'];
handler.command = /^(instagram|ig(dl)?)$/i;
handler.limit = 2;

export default handler;
