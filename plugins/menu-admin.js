import { performance } from 'perf_hooks';
import fetch from 'node-fetch'; // Assicurati di avere node-fetch installato

const handler = async (message, { conn, usedPrefix }) => {
    const userCount = Object.keys(global.db.data.users).length;
    const botName = global.db.data.nomedelbot || '⟆ 𝑶𝑺𝑺𝑬𝑺𝑺𝑰𝑶𝑵𝑩𝑶𝑻 ⟇ ✦';

    const menuText = generateMenuText(usedPrefix, botName, userCount);
    
    const messageOptions = {
        contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                serverMessageId: '',
                newsletterName: `${botName}`
            },
        }
    };

    // Invia la foto con il menu
    const imagePath = './menu/menuadmin.jpeg';
    await conn.sendMessage(message.chat, { image: { url: imagePath }, caption: menuText, ...messageOptions }, { quoted: message });
};

async function fetchThumbnail(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        return new Uint8Array(arrayBuffer);
    } catch (error) {
        console.error('Errore durante il fetch della thumbnail:', error);
        return 'default-thumbnail'; // Fallback thumbnail in caso di errore
    }
}

handler.help = ['menuadmin'];
handler.tags = ['menuadmin'];
handler.command = /^(menuadmin|comandi)$/i;

export default handler;

function generateMenuText(prefix, botName, userCount) {
    return `
╔══════════════════════════╗  
║  🚀  𝐌 𝐄 𝐍 𝐔   𝐀 𝐃 𝐌 𝐈 𝐍  🚀  ║  
╚══════════════════════════╝  

           𝗖𝗢𝗠𝗔𝗡𝗗𝗜 𝗔𝗗𝗠𝗜𝗡  
╭━━━━━━━━━━━━━━━━━━━╮  
┃ ⚡ ${_0xeb2cc9}𝗣𝗥𝗢𝗠𝗨𝗢𝗩𝗜 / 𝗣  
┃ ⚡ ${_0xeb2cc9}𝗥𝗘𝗧𝗥𝗢𝗖𝗘𝗗𝗜 / 𝗥  
┃ ⚡ ${_0xeb2cc9}𝗪𝗔𝗥𝗡 / 𝗨𝗡𝗪𝗔𝗥𝗡  
┃ ⚡ ${_0xeb2cc9}𝗠𝗨𝗧𝗔 / 𝗦𝗠𝗨𝗧𝗔  
┃ ⚡ ${_0xeb2cc9}𝗠𝗨𝗧𝗘𝗟𝗜𝗦𝗧  
┃ ⚡ ${_0xeb2cc9}𝗛𝗜𝗗𝗘𝗧𝗔𝗚  
┃ ⚡ ${_0xeb2cc9}𝗧𝗔𝗚𝗔𝗟𝗟  
┃ ⚡ ${_0xeb2cc9}𝗔𝗣𝗘𝗥𝗧𝗢 / 𝗖𝗛𝗜𝗨𝗦𝗢  
┃ ⚡ ${_0xeb2cc9}𝗦𝗘𝗧𝗪𝗘𝗟𝗖𝗢𝗠𝗘  
┃ ⚡ ${_0xeb2cc9}𝗦𝗘𝗧𝗕𝗬𝗘  
┃ ⚡ ${_0xeb2cc9}𝗜𝗡𝗔𝗧𝗧𝗜𝗩𝗜  
┃ ⚡ ${_0xeb2cc9}𝗟𝗜𝗦𝗧𝗔𝗡𝗨𝗠 + 𝗣𝗥𝗘𝗙𝗜𝗦𝗦𝗢  
┃ ⚡ ${_0xeb2cc9}𝗣𝗨𝗟𝗜𝗭𝗜𝗔 + 𝗣𝗥𝗘𝗙𝗜𝗦𝗦𝗢  
┃ ⚡ ${_0xeb2cc9}𝗥𝗜𝗠𝗢𝗭𝗜𝗢𝗡𝗘 𝗜𝗡𝗔𝗧𝗧𝗜𝗩𝗜  
┃ ⚡ ${_0xeb2cc9}𝗦𝗜𝗠  
┃ ⚡ ${_0xeb2cc9}𝗔𝗗𝗠𝗜𝗡𝗦  
┃ ⚡ ${_0xeb2cc9}𝗙𝗥𝗘𝗘𝗭𝗘 @  
┃ ⚡ ${_0xeb2cc9}𝗜𝗦𝗣𝗘𝗭𝗜𝗢𝗡𝗔 (𝗟𝗜𝗡𝗞)  
┃ ⚡ ${_0xeb2cc9}𝗧𝗢𝗣 (10,50,100)  
┃ ⚡ ${_0xeb2cc9}𝗧𝗢𝗣𝗦𝗘𝗫𝗬  
┃ ⚡ ${_0xeb2cc9}𝗣𝗜𝗖 @  
┃ ⚡ ${_0xeb2cc9}𝗣𝗜𝗖𝗚𝗥𝗨𝗣𝗣𝗢  
┃ ⚡ ${_0xeb2cc9}𝗡𝗢𝗠𝗘 <𝗧𝗘𝗦𝗧𝗢>  
┃ ⚡ ${_0xeb2cc9}𝗕𝗜𝗢 <𝗧𝗘𝗦𝗧𝗢>  
┃ ⚡ ${_0xeb2cc9}𝗟𝗜𝗡𝗞𝗤𝗥  
╰━━━━━━━━━━━━━━━━━━━╯  
}
> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ${botName}
*•────────────•⟢*
`.trim();
}
