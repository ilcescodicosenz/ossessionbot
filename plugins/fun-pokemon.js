import fs from 'fs'

let handler = async (m, { conn }) => {
  let mention = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender
  const who = mention ? mention : m.sender

  let prova = { "key": { "participants": "0@s.whatsapp.net", "fromMe": false, "id": "Halo"
  }, "message": { 
  "locationMessage": { name: '𝐏𝚵𝐑𝐒Ꮻ𝐍𝚲𝐋𝕀𝐓𝚲 𝐏𝐨𝐤𝐞𝐦𝐨𝐧',
  "jpegThumbnail": fs.readFileSync('./icone/pokeball.png'),
  "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
  }}, "participant": "0@s.whatsapp.net"
  }

  let pokemonInfo = `══════ ೋೋ ═════
🔹 *Allenatore*: @${m.sender.split('@')[0]}
🔹 *Pokémon Assegnato*: ${pickRandom(['Pikachu', 'Charizard', 'Bulbasaur', 'Squirtle', 'Gengar', 'Eevee', 'Snorlax', 'Mewtwo', 'Jigglypuff', 'Lucario'])}
🔹 *Tipo*: ${pickRandom(['Fuoco', 'Acqua', 'Erba', 'Elettrico', 'Psico', 'Ghiaccio', 'Drago', 'Spettro', 'Lotta', 'Buio'])}
🔹 *Livello*: ${pickRandom(['5', '10', '20', '35', '50', '65', '80', '100'])}
🔹 *Attacco*: ${pickRandom(['45', '60', '75', '90', '105', '120', '135', '150'])}
🔹 *Difesa*: ${pickRandom(['30', '50', '70', '90', '110', '130', '150'])}
🔹 *Velocità*: ${pickRandom(['20', '40', '60', '80', '100', '120', '140'])}
🔹 *Abilità*: ${pickRandom(['Fuocardore', 'Assorbivolt', 'Levitazione', 'Intimidazione', 'Rigenergia', 'Muta', 'Pressione'])}
🔹 *Natura*: ${pickRandom(['Audace', 'Vivace', 'Timida', 'Docile', 'Risoluta', 'Furba', 'Testarda', 'Sicura'])}
🔹 *Oggetto Tenuto*: ${pickRandom(['Baccaprugna', 'Baccavena', 'Fune di Fuga', 'MT casuale', 'Pokéball', 'Pietralunare', 'Master Ball'])}
══════ ೋೋ ═════`

  conn.reply(m.chat, pokemonInfo, prova, { mentions: [mention, m.sender] })
}

handler.help = ['pokemoninfo']
handler.tags = ['fun']
handler.command = /^pokemoninfo$/i

export default handler 

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
