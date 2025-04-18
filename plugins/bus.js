import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
    if (!text) {
        return m.reply("❌ Devi specificare una città! \nEsempio: .bus Milano");
    }

    let query = encodeURIComponent(orari bus ${text});
    let url = https://www.google.com/search?q=${query};

    let messaggio = 🚌 *Orari dei bus per* _${text}_:\n🔎 *Cerca qui:* ${url};

    await conn.sendMessage(m.chat, { text: messaggio }, { quoted: m });
};

handler.command = ["bus"];
export default handler;
