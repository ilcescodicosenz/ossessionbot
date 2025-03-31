import fs from 'fs'

let handler = async (m, { conn }) => {
    let user1 = m.sender
    let user2 = m.mentionedJid[0] ? m.mentionedJid[0] : 'bot' 

    let username1 = `@${user1.split('@')[0]}`
    let username2 = user2 === 'bot' ? '🤖 Il Bot' : `@${user2.split('@')[0]}`

    let pokemon1 = pickRandom(['Pikachu', 'Charizard', 'Bulbasaur', 'Squirtle', 'Gengar', 'Eevee', 'Snorlax', 'Mewtwo', 'Jigglypuff', 'Lucario'])
    let pokemon2 = pickRandom(['Pikachu', 'Charizard', 'Bulbasaur', 'Squirtle', 'Gengar', 'Eevee', 'Snorlax', 'Mewtwo', 'Jigglypuff', 'Lucario'])

    let attacco1 = Math.floor(Math.random() * 101)
    let attacco2 = Math.floor(Math.random() * 101)

    let vincitore = attacco1 > attacco2 ? username1 : username2

    let sfida = `🔥 *SFIDA FRA POKÉMON!* 🔥\n\n🎮 ${username1} lancia *${pokemon1}*\n🆚\n🎮 ${username2} lancia *${pokemon2}*\n\n⚔️ *Attacco di ${pokemon1}:* ${attacco1}\n⚔️ *Attacco di ${pokemon2}:* ${attacco2}\n\n🏆 *Vincitore:* ${vincitore}`

    let battleImage = { 
        "key": { "participants": "0@s.whatsapp.net", "fromMe": false, "id": "Battle" },
        "message": { 
            "locationMessage": { 
                name: '𝐒𝐟𝐢𝐝𝐚 𝐟𝐫𝐚 𝐏𝐨𝐤𝐞𝐦𝐨𝐧!',
                "jpegThumbnail": fs.readFileSync('./icone/pokemon_battle.png') 
            }
        }, 
        "participant": "0@s.whatsapp.net"
    }

    conn.reply(m.chat, sfida, battleImage, { mentions: [user1, user2].filter(u => u !== 'bot') })
}

handler.help = ['sfida @utente']
handler.tags = ['pokemon']
handler.command = /^sfida$/i

export default handler 

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}
