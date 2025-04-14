let cooldowns = {}

let handler = async (m, { conn, text, command, usedPrefix }) => {
  let users = global.db.data.users
  let senderId = m.sender
  let senderName = conn.getName(senderId)
  
  // Cooldown di 5 minuti tra un crimine e l'altro
  let cooldownTime = 5 * 60
  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < cooldownTime * 1000) {
    let tempoRimanente = formattaTempo(Math.ceil((cooldowns[m.sender] + cooldownTime * 1000 - Date.now()) / 1000))
    return m.reply(`🚩 Hai già commesso un crimine di recente. Aspetta *⏱ ${tempoRimanente}* prima del prossimo crimine per evitare di essere catturato.`)
  }
  
  cooldowns[m.sender] = Date.now()
  
  // Seleziona un utente specifico se taggato, altrimenti casuale
  let targetId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : Object.keys(users).filter(id => id !== senderId)[Math.floor(Math.random() * (Object.keys(users).length - 1))]
  let targetName = conn.getName(targetId)

  // Quantità rubabile (15-50 Ossessioncoins)
  let minRubare = 50
  let maxRubare = 100
  let quantita = Math.floor(Math.random() * (maxRubare - minRubare + 1)) + minRubare

  // Possibili esiti (0=successo, 1=catturato, 2=successo parziale)
  let esito = Math.floor(Math.random() * 3)

  switch (esito) {
    case 0: // Successo completo
      users[senderId].limit += quantita
      users[targetId].limit -= quantita
      await conn.sendMessage(m.chat, {
        text: `🚩 Crimine riuscito! Hai rubato *${quantita} 💶 Ossessioncoins* a @${targetId.split("@")[0]}\n\n*+${quantita} 💶* aggiunte al tuo saldo.`,
        mentions: [targetId]
      }, { quoted: m })
      break

    case 1: // Catturato
      let multa = Math.min(Math.floor(Math.random() * (users[senderId].limit - minRubare + 1)) + minRubare, maxRubare)
      users[senderId].limit -= multa
      await conn.reply(m.chat, `🚩 Sei stato catturato dagli sbirri! Multa di *-${multa} 💶 Unitycoins* per ${senderName}.`, m)
      break

    case 2: // Successo parziale
      let parziale = Math.min(Math.floor(Math.random() * (users[targetId].limit / 2 - minRubare + 1)) + minRubare, maxRubare)
      users[senderId].limit += parziale
      users[targetId].limit -= parziale
      await conn.sendMessage(m.chat, {
        text: `🚩 Crimine riuscito a metà! Hai rubato solo *${parziale} 💶 Ossessioncoins* da @${targetId.split("@")[0]}\n\n*+${parziale} 💶* aggiunte al tuo saldo.`,
        mentions: [targetId]
      }, { quoted: m })
      break
  }
  
  global.db.write()
}

handler.tags = ['rpg']
handler.help = ['crimine']
handler.command = [ 'ruba', 'rapina']
handler.register = true
handler.group = true

function formattaTempo(secondi) {
  let minuti = Math.floor(secondi / 60)
  let secondiRimanenti = Math.floor(secondi % 60)
  return `${minuti} minuti e ${secondiRimanenti} secondi`
}

export default handler
