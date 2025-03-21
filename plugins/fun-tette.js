let handler = async (m, { conn, command, text }) => {
    // Lista di dimensioni casuali
    let boobsSizes = ['prima', 'seconda', 'terza', 'quarta', 'quinta', 'sesta', 'settima', 'ottava', 'nona', 'decima'];

    // Scegli una dimensione casuale dalla lista
    let size = pickRandom(boobsSizes);

    // Crea il messaggio con la dimensione scelta
    let boobs = `*🍑 CALCOLATORE DI TETTE 🍑*\n
━━━━━━━━━━━━━━━━━━━━━
${text} tiene una   ${size}
━━━━━━━━━━━━━━━━━━━━━`.trim()

    // Rispondi con il messaggio e la menzione
    m.reply(boobs, null, { mentions: conn.parseMention(boobs) })
}

// Funzione per scegliere un elemento casuale dalla lista
function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

handler.help = ['tette']
handler.tags = ['fun']
handler.command = /^(tette)$/i

export default handler;