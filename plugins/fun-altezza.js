let altezzeCelebs = {
    'cristiano ronaldo': '1.87m',
    'messi': '1.70m',
    'neymar': '1.75m',
    'kylian mbappé': '1.82m',
    'erling haaland': '1.94m',
    'zlatan ibrahimović': '1.95m',
    'lionel messi': '1.70m', // Alias
    'cr7': '1.87m', // Alias
    'lebron james': '2.06m',
    'michael jordan': '1.98m',
    'stephen curry': '1.91m',
    'kevin durant': '2.08m',
    'serena williams': '1.75m',
    'venus williams': '1.85m',
    'rafael nadal': '1.85m',
    'roger federer': '1.85m',
    'novak djokovic': '1.88m',
    'the rock': '1.96m',
    'dwayne johnson': '1.96m', // Alias
    'tom cruise': '1.70m',
    'zendaya': '1.78m',
    'dua lipa': '1.73m',
    'harry styles': '1.83m',
    'billie eilish': '1.61m',
    'taylor swift': '1.80m',
    'adele': '1.73m',
    // Celebrità italiane
    'jannik sinner': '1.91m',
    'matteo berrettini': '1.97m',
    'federica pellegrini': '1.78m',
    'alessandro del piero': '1.73m',
    'francesco totti': '1.80m',
    'roberto baggio': '1.74m',
    'sofia goggia': '1.68m',
    'paola egonu': '1.93m',
    'elodie': '1.65m',
    'chiara ferragni': '1.60m',
    'fedez': '1.78m',
    'maneskin': 'damiano david': '1.90m',
    'maneskin': 'victoria de angelis': '1.63m',
    'maneskin': 'thomas raggi': '1.75m',
    'maneskin': 'ethan torchio': '1.80m',
    'luca argentero': '1.86m',
    'raoul bova': '1.82m',
    'sabrina ferilli': '1.70m',
    'monica bellucci': '1.71m',
    // Altre celebrità internazionali
    'lionel richie': '1.85m',
    'oprah winfrey': '1.69m',
    'brad pitt': '1.80m',
    'angelina jolie': '1.69m',
    'scarlett johansson': '1.60m',
    'chris hemsworth': '1.90m',
    'margot robbie': '1.68m',
    'idris elba': '1.89m',
    'rihanna': '1.73m',
    'justin bieber': '1.75m',
    'selena gomez': '1.65m',
    'drake': '1.82m',
    'beyoncé': '1.68m',
    'jay-z': '1.87m',
    'eminem': '1.73m',
    'arian grande': '1.53m',
    'shakira': '1.57m',
    'maluma': '1.74m',
    'bad bunny': '1.83m',
    'rosalía': '1.63m',
    'lewis hamilton': '1.74m',
    'max verstappen': '1.81m',
    'simone biles': '1.42m',
    'usain bolt': '1.95m',
    'michael phelps': '1.93m',
    'cristiano ronaldo jr': '1.80m', // Curiosità
    'greta thunberg': '1.52m', // Figura pubblica
    'elon musk': '1.88m',
    'jeff bezos': '1.88m',
    'bill gates': '1.77m',
    'mark zuckerberg': '1.71m'
};

let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) {
        return m.reply(`📏 Devi specificare un nome! Esempio: ${usedPrefix}${command} Usain Bolt`);
    }

    const nomeRicercato = text.trim().toLowerCase(); // Converti l'input in minuscolo

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
