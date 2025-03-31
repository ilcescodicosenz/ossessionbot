

import MessageType from '@whiskeysockets/baileys'

let tassa = 0.02 // 2% di tassa sulle transazioni

let handler = async (m, { conn, text }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] // Se in gruppo, prende l'utente menzionato
    else who = m.chat // Se in privato, usa l'utente corrente
    
    if (!who) throw '🚩 Devi menzionare un utente con *@user*'
    
    let txt = text.replace('@' + who.split`@`[0], '').trim()
    if (!txt) throw '🚩 Inserisci la quantità di *💶 Ossessioncoins* da trasferire'
    if (isNaN(txt)) throw 'Solo numeri sono accettati'
    
    let Ossessioncoins = parseInt(txt)
    let costo = Unitycoins
    let tassaImporto = Math.ceil(Unitycoins * tassa)
    costo += tassaImporto
    
    if (costo < 1) throw '🚩 Il minimo trasferibile è *1 💶 Ossessioncoin*'
    
    let users = global.db.data.users
    if (costo > users[m.sender].limit) throw 'Non hai abbastanza *💶 Ossessioncoins* per questo trasferimento'
    
    // Esegui la transazione
    users[m.sender].limit -= costo
    users[who].limit += Unitycoins
    
    await m.reply(`*${-Unitycoins}* 💶 Ossessioncoins 
Tassa 2% : *${-tassaImporto}* 💶 Ossessioncoins
Totale addebitato: *${-costo}* 💶 Ossessioncoins`)
    
    // Notifica il destinatario
    conn.fakeReply(m.chat, `*+${Ossessioncoins}* 💶 Ossessioncoins ricevute!`, who, m.text)
}

handler.help = ['daiOssessioncoins *@user <quantità>*']
handler.tags = ['rpg']
handler.command = ['daiOssessioncoins', 'bonifico', 'trasferisci','dona']
handler.register = true 

export default handler
