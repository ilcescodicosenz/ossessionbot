let handler = async (m, { conn, command, groupMetadata }) => {
    if (command === 'trovafid') {
        // Funzione per formattare il nome dell'utente
        let toM = a => '@' + a.split('@')[0];
        
        // Otteniamo la lista dei partecipanti
        let ps = groupMetadata.participants.map(v => v.id);

        // Verifica che ci siano almeno due persone nel gruppo
        if (ps.length < 2) {
            return m.reply('Non ci sono abbastanza partecipanti nel gruppo per trovare una coppia.');
        }

        // Seleziona casualmente il primo utente
        let a = ps[Math.floor(Math.random() * ps.length)];
        
        // Seleziona casualmente un secondo utente diverso dal primo
        let b;
        do {
            b = ps[Math.floor(Math.random() * ps.length)];
        } while (b === a);
        
        // Invia il messaggio con le menzioni
        m.reply(`══════ •⊰✦⊱• ══════\n𝐓𝐮 ${toM(a)} 𝐞 ${toM(b)} 𝐨𝐫𝐚 𝐬𝐢𝐞𝐭𝐞 𝐟𝐢𝐝𝐚𝐧𝐳𝐚𝐭𝐢\n══════ •⊰✦⊱• ══════`, null, {
            mentions: [a, b]
        });
    }
};

handler.help = ['trovafid']
handler.tags = ['fun']
handler.command = /^(trovafid)$/i
handler.group = true
handler.admin = false
export default handler;