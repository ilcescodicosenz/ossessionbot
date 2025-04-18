let altezzeCelebs = {
    'cristiano ronaldo': '1.87m',
    'messi': '1.70m',
    'lebron james': '2.06m',
    'the rock': '1.96m',
    'tom cruise': '1.70m',
    'zendaya': '1.78m',
    'dua lipa': '1.73m'
};

let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) {
        return m.reply(`📏 Devi specificare un nome! Esempio: ${usedPrefix}${command} Cristiano Ronaldo`);
    }

    const nomeRicercato = text.trim().toLowerCase();

    if (altezzeCelebs[nomeRicercato]) {
        const response = `📏 *${nomeRicercato.toUpperCase()}* è alto *${altezzeCelebs[nomeRicercato]}*`;
        await conn.sendMessage(m.chat, { text: response }, { quoted: m });
    } else {
        await m.reply(`❌ Altezza non trovata per *${text}*! Prova con nomi famosi come: ${Object.keys(altezzeCelebs).join(', ')}`);
    }
};

handler.command = ['altezza', 'height'];
handler.help = ['altezza <nome>', 'height <nome>'];
handler.tags = ['info'];
handler.desc = 'Mostra l\'altezza di una persona famosa.';

export default handler;
