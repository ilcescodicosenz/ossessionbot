//Crediti: Onix, di Riad
let handler = async (m, { conn }) => {
    // Recupera le informazioni del gruppo
    let groupMetadata = await conn.groupMetadata(m.chat);
    let groupName = groupMetadata.subject; // Nome del gruppo
    let groupDescription = groupMetadata.desc || '𝐃𝐞𝐬𝐜𝐫𝐢𝐳𝐢𝐨𝐧𝐞 𝐢𝐧𝐞𝐬𝐢𝐬𝐭𝐞𝐧𝐭𝐞 ⁉️'; // Descrizione del gruppo

    // Messaggio di risposta con il nome del gruppo e la descrizione
    let infoMessage = `
🟠 *𝐍𝐨𝐦𝐞 𝐝𝐞𝐥 𝐠𝐫𝐮𝐩𝐩𝐨:*
 ➪  ${groupName} \n
🟡 *𝐃𝐞𝐬𝐜𝐫𝐢𝐳𝐢𝐨𝐧𝐞 𝐝𝐞𝐥 𝐠𝐫𝐮𝐩𝐩𝐨:*
 ➪  ${groupDescription}
    `;

    // Invia il messaggio con le informazioni
    await conn.sendMessage(m.chat, { text: infoMessage }, { quoted: m });
};

handler.command = /^(rules)$/i; // Comando
handler.group = true; //solo nei gruppi
handler.admin = true; //solo per admin

export default handler;