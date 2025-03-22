//questo comando è stato fatto per la mia ragazza 💗
import { performance } from "perf_hooks";

// Funzione per ritardo (delay)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let handler = async (message, { conn, text }) => {
    // Messaggi personalizzati per il comando Kebab
    let messages = [
        `🍢 Inizio a preparare un Kebab per *${text || "te"}*...`,
        `🍖 Sto affettando la carne!`,
        `🥗 Aggiungo le verdure fresche...`,
        `🫓 Prendo il pane caldo.`,
        `🌶️ Un tocco di salsa segreta!`,
        `🔥 Il Kebab è quasi pronto...`,
        `🥙 Voilà! Kebab servito per *${text || "te"}*!`
    ];

    // Sequenza dei messaggi con ritardo
    for (let msg of messages) {
        await conn.reply(message.chat, msg, message);
        await delay(2000); // Ritardo di 2 secondi tra i messaggi
    }

    // Calcolo del tempo di preparazione
    let start = performance.now();
    let end = performance.now();
    let time = (end - start).toFixed(3); // Limitato a 3 cifre decimali

    let finalMessage = `🍢 Kebab preparato in *${time}ms*! Buon appetito, *${text || "belo/a"}*!`;
    await conn.reply(message.chat, finalMessage, message);
};

// Configurazione del comando
handler.command = ['kebab'];
handler.tags = ['fun'];
handler.help = ['.kebab <nome>'];

export default handler;
