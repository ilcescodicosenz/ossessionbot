import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

let handler = async (m, { conn }) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    let settingsImagePath = path.join(__dirname, 'icone', 'settings.png');
    let adminImagePath = path.join(__dirname, 'icone', 'admin.jpg');

    let settingsImageBuffer = fs.existsSync(settingsImagePath) ? fs.readFileSync(settingsImagePath) : null;
    let adminImageBuffer = fs.existsSync(adminImagePath) ? fs.readFileSync(adminImagePath) : null;

    let quotedMsg = {
        key: { 
            fromMe: false,
            participant: "0@s.whatsapp.net",
            id: 'Halo'
        },
        message: {
            locationMessage: {
                name: "𝐌𝐞𝐧𝐮 𝐎𝐰𝐧𝐞𝐫",
                jpegThumbnail: settingsImageBuffer || adminImageBuffer // Usa settings.png, se non esiste usa admin.png
            }
        }
    };

    let menuText = `
╔════════════════════════════════════╗
║ ⚡ *𝐏𝐀𝐍𝐄𝐋𝐋𝐎 𝐃𝐄𝐋𝐋'𝐎𝐖𝐍𝐄𝐑* ⚡
╚════════════════════════════════════╝

📌 *𝐂𝐨𝐦𝐚𝐧𝐝𝐢 𝐝𝐢𝐬𝐩𝐨𝐧𝐢𝐛𝐢𝐥𝐢:*  

🛠️ *Gestione Nome & Gruppi:*  
➤ .impostanome  
➤ .resettanome  
➤ .setgruppi  
➤ .aggiungigruppi @  
➤ .resetgruppi @  
➤ .setpp (immagine)  

🔒 *Gestione Utenti:*  
➤ .gestisci @  
➤ .banuser @  
➤ .unbanuser @  
➤ .blockuser @  
➤ .unblockuser @  

⚙️ *Strumenti di Controllo:*  
➤ .pulizia (+)  
➤ .out  
➤ .prefisso (?)  
➤ .resettaprefisso  
➤ .godmode {autoadmin}  
➤ .azzera @  
➤ .aggiungi (num. messaggi) @  
➤ .rimuovi (num. messaggi) @  
➤ .nuke  
➤ .nukeall  

👑 *Gestione Owner:*  
➤ .addowner @  
➤ .delowner @  
➤ .downall  
➤ .upall  

🚧 *Blacklist & Protezioni:*  
➤ .blocklist  
➤ .banlist  
➤ .banghost  
➤ .lock  
➤ .safe  

📂 *File & Plugin Management:*  
➤ .getplugin  
➤ .getfile  
➤ .saveplugin  
➤ .deleteplugin  

🔰 *Altri Comandi:*  
➤ .sponsor  
➤ .bigtag  
➤ .enc <testo>  

❌𝗡𝘂𝗺𝗲𝗿𝗶 𝗔𝘂𝘁𝗼𝗿𝗶𝘇𝘇𝗮𝘁𝗶:
➤.menucrash

╔════════════════════════════════════╗
║ ⟆ 𝑶𝑺𝑺𝑬𝑺𝑺𝑰𝑶𝑵𝑩𝑶𝑻 ⟇ ✦
╚════════════════════════════════════╝
`;

    let botName = global.db.data.nomedelbot || " ⟆ 𝑶𝑺𝑺𝑬𝑺𝑺𝑰𝑶𝑵𝑩𝑶𝑻 ⟇ ✦ ";

    await conn.sendMessage(m.chat, { 
        text: menuText, 
        contextInfo: {
            mentionedJid: conn.parseMention(menuText),
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363341274693350@newsletter",
                serverMessageId: '',
                newsletterName: botName
            }
        } 
    }, { quoted: quotedMsg });
};

handler.help = ["menu"];
handler.tags = ['menu'];
handler.command = /^(owner|menuowner|pannello)$/i;

export default handler;
