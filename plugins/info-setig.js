const handler = async (m, { conn, text, usedPrefix }) => {
  try {
    // Verifica se c'è una menzione o un messaggio citato
    let mention = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : null);
    let who = mention || m.sender;

    // Inizializza il database degli utenti se non esiste
    global.db.data.users = global.db.data.users || {};
    global.db.data.users[m.sender] = global.db.data.users[m.sender] || {};
    global.db.data.users[who] = global.db.data.users[who] || {};

    let sender = global.db.data.users[m.sender];
    let target = global.db.data.users[who];

    // Controllo se è stato inserito un valore valido
    if (!text) {
      return conn.reply(m.chat, "⚠️ *Devi inserire un nome utente Instagram valido!*\n\n📌 *Esempio:* \n`" + usedPrefix + "setig instagram.com/tuonome`", m);
    }

    // Estrai il nome utente da un link di Instagram
    const usernameMatch = text.match(/instagram\.com\/([^/?]+)/i);
    const instagramUsername = usernameMatch ? usernameMatch[1] : text.trim();

    // Salva il nome utente nel database
    if (instagramUsername) {
      if (who === m.sender) {
        sender.instagram = instagramUsername;
      } else {
        target.instagram = instagramUsername;
      }

      return conn.reply(
        m.chat,
        `✅ *Nome Instagram salvato con successo!*\n📲 Il tuo nuovo username è: *${instagramUsername}*.\n\n❌ Vuoi rimuoverlo? Usa il comando *${usedPrefix}rimuoviig* per eliminarlo.`,
        m
      );
    }
  } catch (e) {
    console.error(e);
    conn.reply(m.chat, "❌ *Errore nel salvataggio del nome Instagram! Riprova più tardi.*", m);
  }
};

handler.command = /^(setig|setinstagram)$/i; // Comando per impostare Instagram
export default handler;
