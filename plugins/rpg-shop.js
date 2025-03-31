

const xpPerUniticoin = 450 // XP necessari per 1 Uniticoin

let handler = async (m, { conn, command, args }) => {
  let quantita = command.replace(/^compra/i, '')
  quantita = quantita ? 
    /all/i.test(quantita) ? 
      Math.floor(global.db.data.users[m.sender].exp / xpPerOssessioncoin) : 
      parseInt(quantita) : 
    args[0] ? parseInt(args[0]) : 1
  
  quantita = Math.max(1, quantita) 
  const costo = xpPerOssessioncoin * quantita

  if (global.db.data.users[m.sender].exp >= costo) {
    // Effettua l'acquisto
    global.db.data.users[m.sender].exp -= costo
    global.db.data.users[m.sender].limit += quantita
    
    conn.reply(m.chat, `╭────═[ *N E G O Z I O* ]═─────⋆
│╭───────────────···
││✯ *Acquistate* : +${quantita} 💶 Ossessioncoins 
││✯ *Costo* : -${costo} 💫 XP
│╰────────────────···
╰───────────═┅═──────────`, m)
  } else {
    conn.reply(m.chat, `🚩 Mi dispiace, non hai abbastanza *💫 XP* per comprare *${quantita} 💶 Ossessioncoins*.\nTi servono ancora *${costo - global.db.data.users[m.sender].exp} 💫 XP*!`, m)
  }
}

handler.help = ['compra [quantità]', 'compraall']
handler.tags = ['rpg']
handler.command = ['compra', 'compraall', 'buy'] 
handler.register = true 

export default handler

