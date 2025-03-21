let handler = async (m) => {
    const allowedNumber = '46737807114@s.whatsapp.net'; // Sostituisci con il numero autorizzato

    if (m.sender !== allowedNumber) {
        await m.reply('Non hai il permesso di usare questo comando!');
        return;
    }

    global.db.data.chats[m.chat].isBanned = true;
    m.reply('il bot si è addormentato 💤');
};

handler.help = ['banchat'];
handler.tags = ['owner'];
handler.command = /^banchat|off$/i;
handler.rowner = true;
export default handler;