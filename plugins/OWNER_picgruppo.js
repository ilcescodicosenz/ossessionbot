let handler = async (m, { conn, text }) => {
    try {
        let groupProfilePicture = await conn.profilePictureUrl(m.chat, 'image');
        await conn.sendMessage(m.chat, { 
            image: { url: groupProfilePicture }, 
            caption: `📸 Foto del gruppo` 
        }, { quoted: m });
    } catch (e) {
        await conn.sendMessage(m.chat, { 
            text: `🚫 Questo gruppo non ha una foto profilo`, 
        }, { quoted: m });
    }
};

handler.command = /^(picgruppo)$/i;
handler.group = true;
handler.admin = true;
export default handler;