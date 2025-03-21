let handler = async (m, { conn, text }) => {
  try {
    // Controllo preliminare per il testo del comando
    if (!text || text.trim() === "") {
      return m.reply("⚠️ Devi inserire un messaggio da riscrivere dopo il comando.");
    }
    const messageToRewrite = text.trim();

    await conn.sendMessage(m.chat, { text: messageToRewrite });
  } catch (err) {
    console.error("Errore durante l'esecuzione del comando .riscrivi:", err);
    await m.reply("❌ Si è verificato un errore. Riprova più tardi.");
  }
};
handler.command = /^riscrivi$/i; // Il comando è ".riscrivi"
handler.group = true;
export default handler;
