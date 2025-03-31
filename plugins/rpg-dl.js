let handler = async (m, { conn, args, participants }) => {
    let users = Object.entries(global.db.data.users).map(([key, value]) => {
      return {...value, jid: key}
    })
    
    // Ordina gli utenti per EXP, Unitycoins e Livello
    let sortedExp = users.map(toNumber('exp')).sort(sort('exp'))
    let sortedLim = users.map(toNumber('limit')).sort(sort('limit'))
    let sortedLevel = users.map(toNumber('level')).sort(sort('level'))
    
    let usersExp = sortedExp.map(enumGetKey)
    let usersLim = sortedLim.map(enumGetKey)
    let usersLevel = sortedLevel.map(enumGetKey)
    
    // Numero di utenti da mostrare (default 5, max 10)
    let len = args[0] && args[0].length > 0 ? Math.min(10, Math.max(parseInt(args[0]), 5)) : Math.min(5, sortedExp.length)
    
    let text = `
  ╭───═[ *Top ${len} Ossessioncoins 💶* ]═────⋆
  │╭───────────────···
  ✩│ La tua posizione: *${usersLim.indexOf(m.sender) + 1}* su *${usersLim.length}*
  ✩│ ${sortedLim.slice(0, len).map(({ jid, limit }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} *${limit} 💶*`).join`\n✩│ `}
  │╰────────────────···
  ╰───────────═┅═──────────
  
  ╭───═[ *TOP ${len} XP 💫* ]═────⋆
  │╭───────────────···
  ✩│ La tua posizione: *${usersExp.indexOf(m.sender) + 1}* su *${usersExp.length}*
  ✩│ ${sortedExp.slice(0, len).map(({ jid, exp }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} *${exp} 💫*`).join`\n✩│ `}
  │╰────────────────···
  ╰───────────═┅═──────────
  `.trim()
  
    await conn.sendMessage(m.chat, { 
      text, 
      mentions: conn.parseMention(text) 
    }, { quoted: m })
  }
  
  handler.help = ['classifica']
  handler.tags = ['rpg']
  handler.command = ['classifica', 'lb', 'leaderboard'] 
  handler.register = true
  
  // Funzioni di utilità
  function sort(property, ascending = true) {
    if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
    else return (...args) => args[ascending & 1] - args[!ascending & 1]
  }
  
  function toNumber(property, _default = 0) {
    if (property) return (a, i, b) => {
      return {...b[i], [property]: a[property] === undefined ? _default : a[property]}
    }
    else return a => a === undefined ? _default : a
  }
  
  function enumGetKey(a) {
    return a.jid
  }
  
  export default handler
