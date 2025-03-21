import { performance } from 'perf_hooks';

let handler = async (m, { conn, text }) => {
    let start = `⏳ *Inizio processo di TRASFORMAZIONE...*`;
    await m.reply(start);

    // Progressione del "boost" con simulazione
    await m.reply(`🔍 *Progresso:* ${pickRandom(['10', '20', '30', '40', '50'])}%`);
    await m.reply(`🔍 *Progresso:* ${pickRandom(['60', '70', '80'])}%`);
    await m.reply(`🔍 *Progresso:* ${pickRandom(['90', '100'])}%`);

    // Simulazione di velocità
    let old = performance.now();
    let neww = performance.now();
    let speed = `${(neww - old).toFixed(2)} ms`;

    // Risultati finali
    let doxeo = `
*✔️ TRASFORMAZIONE COMPLETATO CON SUCCESSO*
━━━━━━━━━━━━━━━━━━━━━
👤 *Persona:* ${text}
🪐 *Trasformazione:* ${pickRandom([
        'grande scimmia ',
        'falso sayan',
        'kaioken',
        'Sayan di primo livello',
        'Sayan di secondo livello',
        'Sayan di terzo livello',
        'Sayan God',
        'Sayan Blue',
        'Ultra Istinto',
        
        
      
    ])}
    ꙰ 𝟥𝟥𝟥 ꙰ 𝔹𝕆𝕋 ꙰
━━━━━━━━━━━━━━━━━━━━━

🕒 *Tempo di esecuzione:* ${speed}
`.trim();

    m.reply(doxeo, null, { mentions: conn.parseMention(doxeo) });
};

handler.help = ['doxear <nome> | <@tag>'];
handler.tags = ['fun'];
handler.command = /^sayan$/i;
export default handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}
