import fs from 'fs';

const toMathematicalAlphanumericSymbols = text => {
  const map = {
    'A': '𝑨', 'B': '𝑩', 'C': '𝑪', 'D': '𝑫', 'E': '𝑬', 'F': '𝑭', 'G': '𝑮', 'H': '𝑯', 'I': '𝑰', 'J': '𝑱',
    'K': '𝑲', 'L': '𝑳', 'M': '𝑴', 'N': '𝑵', 'O': '𝑶', 'P': '𝑷', 'Q': '𝑸', 'R': '𝑹', 'S': '𝑺', 'T': '𝑻',
    'U': '𝑼', 'V': '𝑽', 'W': '𝑾', 'X': '𝑿', 'Y': '𝒀', 'Z': '𝒁'
  };
  return text.split('').map(char => map[char] || char).join('');
};

let handler = m => m;

handler.all = async function (m) {
  if (!m.text) return;

  // Verifica se è una delle menzioni previste
  if (/^@393755853799$/i.test(m.text)) {
    if (m.sender === global.conn.user.jid) return;

    // Caricamento immagine
    let image;
    try {
      image = fs.readFileSync('./icone/instagram.png');
    } catch (err) {
      console.error("Errore nel caricamento dell'immagine:", err);
      return global.conn.sendMessage(
        m.chat,
        { text: "❌ Errore nel caricamento dell'immagine." },
        { quoted: m }
      );
    }

    // Messaggio con vCard e immagine thumbnail
    let quotedContact = {
      key: { participants: "0@s.whatsapp.net", fromMe: false, id: "Halo" },
      message: {
        locationMessage: {
          name: toMathematicalAlphanumericSymbols("INSTAGRAM OWNER"),
          jpegThumbnail: image,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
        }
      },
      participant: "0@s.whatsapp.net"
    };

    // Risposta principale
    await global.conn.sendMessage(
      m.chat,
      {
        text: `🔗 *Instagram:* https://instagram.com/f.cesco_\n\n📩 *al momento cesco non c'è appena torna forse ti risponde*
      },
      { quoted: quotedContact }
    );
  }
  return !0;
};

export default handler;
