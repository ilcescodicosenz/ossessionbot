let etaCelebs = {
    'cristiano ronaldo': 39, // Anno 2025
    'messi': 37,        // Anno 2025
    'lebron james': 40,    // Anno 2025
    'the rock': 53,      // Anno 2025
    'tom cruise': 62,    // Anno 2025
    'zendaya': 28,       // Anno 2025
    'dua lipa': 29       // Anno 2025
};

async function handleCommand(sock, sender, text) {
    const args = text.trim().toLowerCase().split(' ');
    const command = args.shift();

    if (command === '!ping') {
        await sock.sendMessage(sender, { text: 'Pong!' });
    } else if (command === '!eta') {
        if (args.length === 0) {
            await sock.sendMessage(sender, { text: '❌ Devi specificare un nome! Esempio: *!eta Cristiano Ronaldo*' });
            return;
        }

        const nome = args.join(' ');
        if (etaCelebs[nome]) {
            await sock.sendMessage(sender, { text: `🎂 *${nome.toUpperCase()}* ha *${etaCelebs[nome]}* anni (nel 2025)` });
        } else {
            await sock.sendMessage(sender, { text: `❌ Età non trovata! Prova con: *${Object.keys(etaCelebs).join(', ')}*` });
        }
    }
}

module.exports = { handleCommand };
