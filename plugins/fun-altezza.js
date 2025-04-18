let etaCelebs = {
    'cristiano ronaldo': 39, // Anno 2025
    'messi': 37,        // Anno 2025
    'lebron james': 40,    // Anno 2025
    'the rock': 53,      // Anno 2025
    'tom cruise': 62,    // Anno 2025
    'zendaya': 28,       // Anno 2025
    'dua lipa': 29       // Anno 2025
};

let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) {
        return m.reply(`❌ Devi specificare un nome! Esempio: ${usedPrefix}${command} Cristiano Ronaldo`);
    }

    const nomeRicercato = text.trim().toLowerCase();

    if (etaCelebs[nomeRicercato]) {
        const response = `🎂 *${nomeRicercato.toUpperCase()}* ha *${etaCelebs[nomeRicercato]}* anni (nel 2025)`;
        await conn.sendMessage(m.chat, { text: response }, { quoted: m });
    } else {
        await m.reply(`❌ Età non trovata per *${text}*! Prova con nomi famosi come: ${Object.keys(etaCelebs).join(', ')}`);
    }
};

handler.command = ['eta', 'age'];
handler.help = ['eta <nome>', 'age <nome>'];
handler.tags = ['info'];
handler.desc = 'Mostra l\'età (nel 2025) di una persona famosa.';

export default handler;
