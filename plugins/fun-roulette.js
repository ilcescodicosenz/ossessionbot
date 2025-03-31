import * as baileys from '@whiskeysockets/baileys';

let handler = async (m, { conn, text, command, usedPrefix, args }) => {
    let users = global.db.data.users[m.sender];
    let colori = ["rosso", "nero"];

    let sceltaUtente = args[0]?.toLowerCase();
    let scommessa = parseInt(args[1]);

    if (!sceltaUtente || !colori.includes(sceltaUtente)) {
        return await conn.reply(m.chat, `🎰 *ROULETTE* 🎰\n\n❌ *Colore non valido!*\n✅ Scegli tra: *${colori.join(" / ")}*\n📌 *Esempio:* \`${usedPrefix}roulette rosso 150\``, m);
    }

    if (isNaN(scommessa) || scommessa <= 0) {
        return await conn.reply(m.chat, `🎰 *ROULETTE* 🎰\n\n❌ *Inserisci un importo valido da scommettere!*\n📌 *Esempio:* \`${usedPrefix}roulette rosso 150\``, m);
    }

    if (scommessa > 500) {
        return await conn.reply(m.chat, "⚠️ *Il limite massimo di scommessa è 500 €!*", m);
    }

    if (scommessa > users.money) {
        let deficit = scommessa - users.money;
        return await conn.reply(m.chat, `💸 *Saldo insufficiente!*\n❌ Ti mancano *${deficit}* € per giocare.`, m);
    }

    let risultato = colori[Math.floor(Math.random() * colori.length)];
    let vincita = scommessa * 2;

    let messaggioRisultato = `🎲 *La pallina si è fermata su:* *${risultato.toUpperCase()}*`;

    if (sceltaUtente === risultato) {
        users.money += vincita;
        messaggioRisultato += `\n\n🎉 *Hai vinto!* +${vincita} € 💰\n💵 *Saldo attuale:* ${users.money} €`;
    } else {
        users.money -= scommessa;
        messaggioRisultato += `\n\n😢 *Hai perso!* -${scommessa} €\n💵 *Saldo attuale:* ${users.money} €`;
    }

    return await conn.reply(m.chat, messaggioRisultato, m);
};

handler.command = /^(roulette)$/i;
export default handler;
