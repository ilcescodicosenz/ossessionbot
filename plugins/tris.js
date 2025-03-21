import TicTacToe from '../lib/tictactoe.js'

let handler = async (m, { conn, usedPrefix, command, text }) => {
    conn.game = conn.game ? conn.game : {}
    if (Object.values(conn.game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))) throw '*[❗] _STAI GIA GIOCANDO CON QUALCUNO_*'
    if (!text) throw `*[❗] _DEVI DARE UN NOME ALLA SALA_*\n\n*—◉ _ESEMPIO_*\n*◉ ${usedPrefix + command} fabri vince*`

    let room = Object.values(conn.game).find(room => room.state === 'WAITING' && (text ? room.name === text : true))

    if (room) {
        await m.reply('[🕹️] 𝐋𝐀 𝐏𝐀𝐑𝐓𝐈𝐓𝐀 𝐒𝐓𝐀 𝐈𝐍𝐈𝐙𝐈𝐀𝐍𝐃𝐎, 𝐔𝐍 𝐆𝐈𝐎𝐂𝐀𝐓𝐎𝐑𝐄 𝐒𝐈 𝐄̀ 𝐔𝐍𝐈𝐓𝐎')
        room.o = m.chat
        room.game.playerO = m.sender
        room.state = 'PLAYING'

        // conta vittorie by youns 😉😎
        let users = global.db.data.users
        let victoriesX = users[room.game.playerX].wins || 0
        let victoriesO = users[room.game.playerO].wins || 0

        let arr = room.game.render().map(v => {
            return {
                X: '❎',
                O: '⭕',
                1: '1️⃣',
                2: '2️⃣',
                3: '3️⃣',
                4: '4️⃣',
                5: '5️⃣',
                6: '6️⃣',
                7: '7️⃣',
                8: '8️⃣',
                9: '9️⃣',
            }[v]
        })

        let str = `
❎ = @${room.game.playerX.split('@')[0]} 🏆 ${victoriesX}
⭕ = @${room.game.playerO.split('@')[0]} 🏆 ${victoriesO}

        ${arr.slice(0, 3).join('')}
        ${arr.slice(3, 6).join('')}
        ${arr.slice(6).join('')}

𝐓𝐮𝐫𝐧𝐨 𝐝𝐢 @${room.game.currentTurn.split('@')[0]}
`.trim()

        if (room.x !== room.o) await conn.sendMessage(room.x, { text: str, mentions: this.parseMention(str)}, { quoted: m })
        await conn.sendMessage(room.o, { text: str, mentions: conn.parseMention(str)}, { quoted: m })

    } else {
        room = {
            id: 'tictactoe-' + (+new Date),
            x: m.chat,
            o: '',
            game: new TicTacToe(m.sender, 'o'),
            state: 'WAITING'
        }
        if (text) room.name = text     

        conn.reply(m.chat, `══════ •⊰✧⊱• ══════
*𝐀𝐭𝐭𝐞𝐧𝐝𝐞𝐧𝐝𝐨 𝐠𝐢𝐨𝐜𝐚𝐭𝐨𝐫𝐢 ...*
══════════════
🕹️ 𝐏𝐞𝐫 𝐩𝐚𝐫𝐭𝐞𝐜𝐢𝐩𝐚𝐫𝐞 𝐝𝐢𝐠𝐢𝐭𝐚
.𝐞𝐧𝐭𝐫𝐚 ${text}
══════════════
⛔ 𝐏𝐞𝐫 𝐮𝐬𝐜𝐢𝐫𝐞 𝐝𝐚𝐥𝐥𝐚 𝐩𝐚𝐫𝐭𝐢𝐭𝐚
𝐢𝐧 𝐜𝐨𝐫𝐬𝐨 𝐝𝐢𝐠𝐢𝐭𝐚 .𝐞𝐬𝐜𝐢\n══════ •⊰✧⊱• ══════`, null, m)
        
        conn.game[room.id] = room
    }
}
handler.command = /^(entra|tris|ttt|xo)$/i
export default handler
