import { canLevelUp, xpRange } from '../lib/levelling.js'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
    // Carica l'immagine di background
    let img = await (await fetch(`https://telegra.ph/file/b97148e2154508f63d909.jpg`)).buffer()
    let name = conn.getName(m.sender)
    let user = global.db.data.users[m.sender]
    
    // Controlla se può salire di livello
    if (!canLevelUp(user.level, user.exp, global.multiplier)) {
        let { min, xp, max } = xpRange(user.level, global.multiplier)
        let txt = ` –  *L I V E L L O  -  U T E N T E*\n\n`
            txt += `┌  ✩  *Nome* : ${name}\n`
            txt += `│  ✩  *Livello* : ${user.level}\n`
            txt += `└  ✩  *XP* : ${user.exp - min}/${xp}\n\n`
            txt += `Ti mancano *${max - user.exp}* *💫 XP* per salire di livello`
        
        await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m)
        return
    }
    
    // Salita di livello
    let livelloPrecedente = user.level * 1
    while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
    
    if (livelloPrecedente !== user.level) {
        let txt = ` –  *P R O M O Z I O N E  -  L I V E L L O*\n\n`
            txt += `┌  ✩  *Nome* : ${conn.getName(m.sender)}\n`
            txt += `│  ✩  *Livello precedente* : ${livelloPrecedente}\n`
            txt += `└  ✩  *Nuovo livello* : ${user.level}\n\n`
            txt += `🚩 Più interagisci con *Ai Hoshino*, più il tuo livello aumenterà!`
        
        await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m)
    }
}

handler.help = ['livello']
handler.tags = ['rpg']
handler.command = ['livello', 'lvl', 'levelup', 'level'] 
handler.register = true 
export default handler
