import axios from 'axios';
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@adiwajshing/baileys')).default;

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`Inserisci una parola chiave di ricerca!\nEsempio: ${usedPrefix + command} serana`);
  }

  await conn.sendMessage(m.chat, { text: '⏳ Cerco prima la canzone su Spotify...' }, { quoted: m });

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

    if (!hasil.length) return m.reply('❌ Nessuna canzone trovata.');

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
          text: `Album: ${track.album} | Uscita: ${track.release_date}`
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
                display_text: "Ascolta su Spotify",
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
              text: "*Ecco i risultati della tua ricerca su Spotify:*"
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({ text: 'Fornito da Zenzz AI - MD' }),
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
    m.reply(`❌ Errore durante il recupero dei dati\nLog degli errori: ${err.message}`);
  }
};

handler.help = ['searchspotify <query>'];
handler.tags = ['search'];
handler.command = /^spotifysearch$/i;
handler.premium = false;
handler.limit = true;

export default handler;
