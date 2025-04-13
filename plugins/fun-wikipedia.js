import axios from "axios"
import fetch from "node-fetch"
import cheerio from "cheerio"

async function wikipedia(query) {
  try {
    const link = await axios.get(`https://it.wikipedia.org/wiki/${query}`)
    const $ = cheerio.load(link.data)
    let titolo = $('#firstHeading').text().trim()
    let immagine = $('#mw-content-text').find('div.mw-parser-output > div:nth-child(1) > table > tbody > tr:nth-child(2) > td > a > img').attr('src') || `//i.ibb.co/nzqPBpC/http-error-404-not-found.png`
    
    let descrizione = []
    $('#mw-content-text > div.mw-parser-output').each((index, elemento) => {
      let testo = $(elemento).find('p').text().trim()
      if (testo) descrizione.push(testo)
    })

    return {
      status: link.status,
      risultato: {
        titolo,
        immagine: 'https:' + immagine,
        descrizione: descrizione.join("\n\n")
      }
    }
  } catch (err) {
    return {
      status: 404,
      messaggio: "Errore durante la ricerca. Verifica il termine inserito."
    }
  }
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    throw `⚠️ Inserisci una parola chiave per cercare su Wikipedia.\n\n📌 Esempio:\n*${usedPrefix + command} Luna*\n`
  }

  wikipedia(text).then(res => {
    if (res.status !== 200) {
      return m.reply(`❌ Nessun risultato trovato per "${text}". Prova con un'altra parola chiave.`)
    }

    let messaggio = `📚 *Risultati di Wikipedia*\n\n📌 *Titolo:* ${res.risultato.titolo}\n\n📝 *Descrizione:* ${res.risultato.descrizione}\n\n🔗 *Link:* [Clicca qui](https://it.wikipedia.org/wiki/${encodeURIComponent(text)})`

    conn.sendMessage(m.chat, {
      image: { url: res.risultato.immagine },
      caption: messaggio
    }, { quoted: m })
  }).catch(() => {
    m.reply("❌ Errore durante la ricerca. Riprova più tardi.")
  })
}

handler.help = ['wikipedia'].map(v => v + ' <argomento>')
handler.tags = ['internet']
handler.command = /^(wiki|wikipedia)$/i
handler.exp = 40
handler.level = 2

export default handler
