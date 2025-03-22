let handler = m => m,
handler.all = async function (m) {
    let chat = global.db.data.chats[m.chat]
    let name = conn.getName(m.sender)

    // Messaggio per il tag di un numero specifico (es. owner)
    if (/^@+393755853799|@393755853799$/i.test(m.text)) { // Senza prefisso
        conn.reply(m.chat, `*[ IG ] https://instagram.com/f.cesco_ se volete il bot, fate .supporto*`, m)
    }

    return !0 
}
export default handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}
