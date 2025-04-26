/*
📌 Nama Fitur: Search Spotify [ corousel ]
🏷️ Type : Plugin ESM
🔗 Sumber :  https://whatsapp.com/channel/0029Vb91Rbi2phHGLOfyPd3N
🔗 api : https://api.siputzx.my.id
✍️ Convert By ZenzXD
*/

import axios from 'axios';
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@adiwajshing/baileys')).default;

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`Masukkan kata kunci pencarian!\nContoh: ${usedPrefix + command} serana`);
  }

  await conn.sendMessage(m.chat, { text: '⏳ Cari lagu dulu di Spotify...' }, { quoted: m });

  async function createImage(url) {
    const { imageMessage } = await generateWAMessageContent({ image: { url } }, {
      upload: conn.waUploadToServer
    });
    return imageMessage;
  }

  try {
    const api = `https://api.siputzx.my.id/api/s/spotify?query=${encodeURIComponent(text)}`;
    const { data: json } = await axios.get(api);
    const hasil = json?.data || [];

    if (!hasil.length) return m.reply('❌ Tidak ada lagu ditemukan.');

    const tracks = hasil.slice(0, 5); 
    const cards = [];

    for (let i = 0; i < tracks.length; i++) {
      const track = tracks[i];
      const imageMsg = await createImage(track.thumbnail);

      cards.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: `🎵 ${track.title}\n👤 ${track.artist}`
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: `Album: ${track.album} | Rilis: ${track.release_date}`
        }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          hasMediaAttachment: true,
          imageMessage: imageMsg
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: [
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "Dengar di Spotify",
                url: track.track_url
              })
            }
          ]
        })
      });
    }

    const carousel = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({
              text: "*Berikut hasil pencarian Spotify kamu:*"
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({ text: 'Powered by Zenzz AI - MD' }),
            header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              cards: cards
            })
          })
        }
      }
    }, {});

    await conn.relayMessage(m.chat, carousel.message, { messageId: carousel.key.id });

  } catch (err) {
    console.error(err);
    m.reply(`❌ Error mengambil data\nLogs error: ${err.message}`);
  }
};

handler.help = ['searchspotify <query>'];
handler.tags = ['search'];
handler.command = /^spotifysearch$/i;
handler.premium = false;
handler.limit = true;

export default handler;
