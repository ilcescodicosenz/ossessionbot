let handler = async (m, { conn, args, command, usedPrefix }) => {
    if (command == 'slot') {
        let users = global.db.data.users[m.sender]; // Otteniamo i dati dell'utente
        let scommessa = parseInt(args[0]); // Convertiamo l'argomento in un numero intero

        // Controllo input
        if (!args[0]) 
            throw `══════ •⊰✦⊱• ══════\n𝐐𝐮𝐚𝐧𝐭𝐢 𝐬𝐨𝐥𝐝𝐢 𝐯𝐮𝐨𝐢 𝐬𝐜𝐨𝐦𝐦𝐞𝐭𝐭𝐞𝐫𝐞?\n𝐄𝐬𝐞𝐦𝐩𝐢𝐨: ${usedPrefix}slot 30\n══════ •⊰✦⊱• ══════\n𝐕𝐢𝐧𝐜𝐢𝐭𝐚: +150\n𝐏𝐞𝐫𝐝𝐢𝐭𝐚: -30\n══════ •⊰✦⊱• ══════`;

        if (isNaN(scommessa) || scommessa <= 0) 
            throw '𝐋𝐚 𝐬𝐜𝐨𝐦𝐦𝐞𝐬𝐬𝐚 𝐝𝐞𝐯𝐞 𝐞𝐬𝐬𝐞𝐫𝐞 𝐮𝐧 𝐯𝐚𝐥𝐨𝐫𝐞 𝐧𝐮𝐦𝐞𝐫𝐢𝐜𝐨 𝐩𝐨𝐬𝐢𝐭𝐢𝐯𝐨!';
        
        if (scommessa > users.money) 
            throw `𝐒𝐞𝐢 𝐭𝐫𝐨𝐩𝐩𝐨 𝐩𝐨𝐯𝐞𝐫𝐨 𝐩𝐞𝐫 𝐢 𝐠𝐢𝐨𝐜𝐡𝐢 𝐝'𝐚𝐳𝐳𝐚𝐫𝐝𝐨.\n𝐓𝐢 𝐦𝐚𝐧𝐜𝐚𝐧𝐨 ${scommessa - users.money}€.`;

        // Simboli della slot machine
        let emojis = ["💎", "💰", "👑"];
        let x = [], y = [], z = [];
        
        // Generazione casuale delle linee
        for (let i = 0; i < 3; i++) x[i] = emojis[Math.floor(Math.random() * emojis.length)];
        for (let i = 0; i < 3; i++) y[i] = emojis[Math.floor(Math.random() * emojis.length)];
        for (let i = 0; i < 3; i++) z[i] = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Risultati
        let end;
        if (x[1] === y[1] && y[1] === z[1]) {
            end = `🎉 𝐇𝐀𝐈 𝐕𝐈𝐍𝐓𝐎\n💸 𝐇𝐚𝐢 𝐯𝐢𝐧𝐭𝐨: +${scommessa * 5}€`;
            users.money += scommessa * 5;
        } else if (x[1] === y[1] || x[1] === z[1] || y[1] === z[1]) {
            end = `𝐂𝐨𝐧𝐭𝐢𝐧𝐮𝐚 𝐚 𝐭𝐞𝐧𝐭𝐚𝐫𝐞!\n💸 𝐇𝐚𝐢 𝐩𝐞𝐫𝐬𝐨: -${scommessa}€`;
            users.money -= scommessa;
        } else {
            end = `😢 𝐇𝐀𝐈 𝐏𝐄𝐑𝐒𝐎\n💸 𝐇𝐚𝐢 𝐩𝐞𝐫𝐬𝐨: -${scommessa}€`;
            users.money -= scommessa;
        }
        
        // Formattazione del risultato
        return await m.reply(`\t🎰 𝐒𝐋𝐎𝐓 𝐌𝐀𝐂𝐇𝐈𝐍𝐄 🎰
        
        \t\t${x[0]} ┃ ${y[0]} ┃ ${z[0]}
        \t\t${x[1]} ┃ ${y[1]} ┃ ${z[1]}
        \t\t${x[2]} ┃ ${y[2]} ┃ ${z[2]}
        
${end}`);
    }
};

handler.help = ['slot <importo>'];
handler.tags = ['game'];
handler.command = /^(slot)$/i;
export default handler;