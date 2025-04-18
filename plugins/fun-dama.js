import { Checkers } from '../lib/checkers.js'; // Assicurati di avere una libreria per la Dama

let handler = async (m, { conn, usedPrefix, command, text }) => {
    conn.game = conn.game ? conn.game : {};

    if (Object.values(conn.game).find(room => room.id.startsWith('checkers') && [room.game.white, room.game.black].includes(m.sender))) {
        return m.reply('*[❗] _STAI GIA GIOCANDO UNA PARTITA DI DAMA_*');
    }

    if (!text) {
        return m.reply(`*[❗] _DEVI DARE UN NOME ALLA PARTITA_*\n\n*—◉ _ESEMPIO_*\n*◉ ${usedPrefix + command} partita1*`);
    }

    let room = Object.values(conn.game).find(room => room.state === 'WAITING' && room.name === text);

    if (room) {
        await m.reply('♟️ *UN GIOCATORE SI È UNITO, INIZIO DELLA PARTITA DI DAMA!*');
        room.black = m.chat;
        room.game.black = m.sender;
        room.state = 'PLAYING';

        let str = `
♟️ *DAMA* ♟️

⚪ Bianco = @${room.game.white.split('@')[0]}
⚫ Nero = @${room.game.black.split('@')[0]}

📜 _Mossa corrente_: ${room.game.turn() === 'w' ? '⚪ Bianco' : '⚫ Nero'}

🔢 _Digita il comando_ *${usedPrefix}mossa [mossa]* _per giocare!_

⛔ _Per abbandonare la partita, digita_ *${usedPrefix}esci*
`.trim();

        await conn.sendMessage(room.white, { text: str, mentions: conn.parseMention(str) }, { quoted: m });
        await conn.sendMessage(room.black, { text: str, mentions: conn.parseMention(str) }, { quoted: m });

    } else {
        room = {
            id: 'checkers-' + (+new Date),
            white: m.chat,
            black: '',
            game: new Checkers(),
            state: 'WAITING',
            name: text
        };

        conn.reply(m.chat, `♟️ *PARTITA DI DAMA CREATA!* ♟️

📢 _Aspettando un avversario..._
🕹️ _Per partecipare, digita:_ *${usedPrefix}entra ${text}*
⛔ _Per abbandonare, digita:_ *${usedPrefix}esci*`, null, m);

        conn.game[room.id] = room;
    }
};

handler.command = /^(dama|checkers)$/i;
handler.help = ['dama <nome partita>', 'checkers <nome partita>'];
handler.tags = ['game'];
handler.desc = 'Crea o entra in una partita di dama.';

export default handler;
