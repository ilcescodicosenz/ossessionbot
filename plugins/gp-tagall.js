let handler = async (m, { isOwner, isAdmin, conn, text, participants, args, usedPrefix, command, groupMetadata }) => {
    if (command === 'tagall' || command === 'marcar') {
        if (!(isAdmin || isOwner)) {
            global.dfail('admin', m, conn);
            throw false;
        }

        let pesan = args.join` ` || 'Non ci sono messaggi specifici.';
        let oi = `${pesan}`;
        let prova = {
            key: {
                participants: "0@s.whatsapp.net",
                fromMe: false,
                id: "Halo"
            },
            message: {
                locationMessage: {
                    name: '𝐍𝐎𝐍 𝐒𝐈 𝐃𝐎𝐑𝐌𝐄!!!',
                    jpegThumbnail: await (await fetch('https://telegra.ph/file/92576d96e97bb7e3939e2.png')).buffer(),
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            },
            participant: "0@s.whatsapp.net"
        };

        let teks = `══════•⊰✦⊱•══════\n➣ 𝐆𝐫𝐮𝐩𝐩𝐨 » ${groupMetadata.subject !== undefined ? `${groupMetadata.subject}` : `Non sei in un gruppo`}\n➣ 𝐌𝐞𝐦𝐛𝐫𝐢 » ${participants.length}\n➣ 𝐌𝐞𝐬𝐬𝐚𝐠𝐠𝐢𝐨 » ${oi}\n══════•⊰✦⊱•══════\n`;
        for (let mem of participants) {
            teks += `➣ @${mem.id.split('@')[0]}\n`;
        }
        teks += `══════•⊰✦⊱•══════`;

        conn.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted: prova });
    }
};

handler.help = ['tagall'];
handler.tags = ['group'];
handler.command = /^(tagall|marcar)$/i;
handler.group = true;

export default handler;