let handler = async (msg, { client }) => {
  // Genera una percentuale casuale tra 0 e 100
  let percent = Math.floor(Math.random() * 101);
  
  let response = 👮‍♂️ Il tuo livello di sbirro è: *${percent}%* 🚔;
  
  await client.sendMessage(msg.chat, { text: response }, { quoted: msg });
};

// Configurazione del comando
handler.command = ['sbirro', 'quantosbirro'];
handler.category = 'fun';
handler.desc = 'Scopri quanto sei uno sbirro 🚓';

export default handler;
