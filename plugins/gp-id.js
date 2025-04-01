var handler = async (m, { conn, groupMetadata, isGroup }) => {
    let groupId = isGroup ? await groupMetadata.id : "Non applicabile";
    let channelId = !isGroup ? m.chat : (groupMetadata.announce ? await groupMetadata.id.replace("-", "-announce") : "Nessun canale associato");

    conn.reply(m.chat, `ⓘ 𝐋' 𝐢𝐝 𝐝𝐢 𝐪𝐮𝐞𝐬𝐭𝐨 𝐠𝐫𝐮𝐩𝐩𝐨 è: ${groupId}\nⓘ 𝐋' 𝐢𝐝 𝐝𝐞𝐥 𝐜𝐚𝐧𝐚𝐥𝐞 è: ${channelId}`, m);
}

handler.command = /^(id|gpid|gcid)$/i;

export default handler;
