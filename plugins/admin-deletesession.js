import { readdirSync, unlinkSync, existsSync } from 'fs';
import path from 'path';

/**
 * Gestisce la cancellazione delle sessioni del bot.
 * @param {Object} m - Messaggio ricevuto
 * @param {Object} context - Contesto con le info della connessione
 */
const handler = async (m, { conn, usedPrefix }) => {
    const sessionDir = './ossessionbotSession/';
    const botOwner = global.owner?.user?.jid || '';

    // 🔒 Controllo se l'utente è autorizzato
    if (m.sender !== botOwner) {
        return conn.sendMessage(m.chat, { text: '❌ *Accesso negato! Solo il proprietario del bot può eseguire questo comando.*' }, { quoted: m });
    }

    await conn.sendMessage(m.chat, { text: '🔄 *Ripristino delle sessioni in corso...*' }, { quoted: m });

    try {
        if (!existsSync(sessionDir)) {
            return conn.sendMessage(m.chat, { text: '⚠️ *La cartella delle sessioni non esiste o è vuota.*' }, { quoted: m });
        }

        const files = readdirSync(sessionDir);
        let deletedFiles = 0;

        for (const file of files) {
            if (file !== 'creds.json') { // 🔒 Non cancelliamo il file delle credenziali
                unlinkSync(path.join(sessionDir, file));
                deletedFiles++;
            }
        }

        if (deletedFiles === 0) {
            await conn.sendMessage(m.chat, { text: '📂 *Le sessioni erano già vuote.*' }, { quoted: m });
        } else {
            await conn.sendMessage(m.chat, { text: `✅ *Eliminate ${deletedFiles} sessioni salvate.*` }, { quoted: m });
        }

    } catch (err) {
        console.error('Errore durante l\'eliminazione delle sessioni:', err);
        await conn.sendMessage(m.chat, { text: '⚠️ *Errore durante la pulizia delle sessioni.*' }, { quoted: m });
    }

    // 📡 Messaggio di conferma con un'immagine
    const botName = global.db?.data?.nomedelbot || 'OssessionBot';
    const imageUrl = 'https://qu.ax/cSqEs.jpg';
    
    await conn.sendMessage(m.chat, {
        text: '✅ *Ora sarai in grado di leggere i messaggi del bot!*',
        quoted: {
            key: { fromMe: false, id: 'SessionReset', participant: '0@s.whatsapp.net' },
            message: {
                imageMessage: { caption: botName, jpegThumbnail: await (await fetch(imageUrl)).buffer() }
            }
        }
    });
};

// 🔧 Metadati del comando
handler.help = ['del_reg_in_session_owner'];
handler.command = /^(deletession|ds|clearallsession)$/i;
handler.admin = true;

export default handler;
