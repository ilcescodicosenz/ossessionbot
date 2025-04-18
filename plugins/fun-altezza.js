let handler = async (m, { conn, usedPrefix, command, text }) => {
    let who;

    // Determina chi chiedere l'età, se è un gruppo o una chat privata
    if (m.isGroup) {
        who = m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.quoted ? m.quoted.sender
            : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
            : false;
    } else {
        who = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat;
    }

    // Controlla se la persona da chiedere l'età è valida
    if (!who) return m.reply(`❌ Devi specificare un nome o menzionare qualcuno! Esempio: ${usedPrefix}${command} Cristiano Ronaldo oppure menziona qualcuno.`);

    let etaCelebs = {
        'cristiano ronaldo': 39, // Anno 2025
        'messi': 37,        // Anno 2025
        'lebron james': 40,    // Anno 2025
        'the rock': 53,      // Anno 2025
        'tom cruise': 62,    // Anno 2025
        'zendaya': 28,       // Anno 2025
        'dua lipa': 29       // Anno 2025
    };

    const nomeRicercato = text.toLowerCase();

    if (etaCelebs[nomeRicercato]) {
        const response = `🎂 *${nomeRicercato.toUpperCase()}* ha *${etaCelebs[nomeRicercato]}* anni (nel 2025)`;
        await conn.sendMessage(m.chat, { text: response, mentions: [who] }, { quoted: m });
    } else if (m.isGroup && who) {
        const nomeMentionato = (await conn.getName(who)).toLowerCase();
        if (etaCelebs[nomeMentionato]) {
            const response = `🎂 *@${who.split('@')[0]}* (probabilmente) ha *${etaCelebs[nomeMentionato]}* anni (nel 2025)`;
            await conn.sendMessage(m.chat, { text: response, mentions: [who] }, { quoted: m });
        } else {
            await m.reply(`❌ Età non trovata per *${nomeMentionato}*! Prova con nomi famosi come: ${Object.keys(etaCelebs).join(', ')}`);
        }
    }
     else {
        await m.reply(`❌ Età non trovata per *${nomeRicercato}*! Prova con nomi famosi come: ${Object.keys(etaCelebs).join(', ')}`);
    }
};

handler.command = ['eta'];
handler.help = ['eta <nome>', 'eta @utente'];
handler.tags = ['info'];
handler.desc = 'Mostra l\'età (nel 2025) di una persona famosa o (circa) di un utente menzionato.';

export default handler;
