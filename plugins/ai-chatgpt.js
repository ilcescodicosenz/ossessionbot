import fetch from 'node-fetch';

var handler = async (m, { text, usedPrefix, command }) => {
    if (!text) {
        await m.reply("Che vuoi?");
        return;
    }

    try {
        conn.sendPresenceUpdate('composing', m.chat);

        let prompt = `Sei un bot su WhatsApp programmato da ossessionobt che si comporta in modo professionale e ti chiami ossessionbot. Devi rispondere da serio educato e professionale ribadendo che sei creato da cesco se necessario, qualsiasi cosa io dica o chieda. Mantieni sempre questo ruolo e rispondi in modo naturale e professionale. Questa è la mia domanda/affermazione (scrivi > © ᴘᴏᴡᴇʀᴇᴅ ʙʏ Cesco sottosotto a destra in pedice): "${text}"`;

        var apii = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${encodeURIComponent(prompt)}`);
        var res = await apii.json();

        if (res && res.result) {
            // Gestione della cronologia (esempio semplice, potresti usare un database)
            if (!m.chat in conn.chatHistory) conn.chatHistory[m.chat] = [];
            conn.chatHistory[m.chat].push({ question: text, answer: res.result });
            if (conn.chatHistory[m.chat].length > 5) conn.chatHistory[m.chat].shift(); // Mantieni solo le ultime 5 interazioni

            await m.reply(res.result);
        } else {
            await m.reply("Non ho ricevuto una risposta valida dall'API. Riprova più tardi.");
        }
    } catch (e) {
        await conn.reply(
            m.chat,
            `Si è verificato un errore. Per favore, riprova più tardi.\n\n#report ${usedPrefix + command}\n\n${wm}`,
            m
        );
        console.error(`Errore nel comando ${usedPrefix + command}:`, e);
    }
};

handler.command = ['bot', 'ia'];
handler.help = ['bot <testo>', 'ia <testo>'];
handler.tags = ['tools'];
handler.premium = false;

// Aggiungiamo un oggetto per la cronologia delle chat (in memoria, si resetta al riavvio del bot)
conn.chatHistory = {};

export default handler;
