const handler = (m) => m;

handler.before = async (m) => {
  let Prefisso = false;
  const prefixRegex = global.prefix;
  if (prefixRegex.test(m.text)) Prefisso = true;
  const bot = global.db.data.settings[mconn.conn.user.jid];   
  if (bot.modoia && !m.isGroup && !Prefisso && !m.fromMe && m.text !== '') {
     if (/^.*false|disnable|(turn)?off|0/i.test(m.text)) return;
        let testo = m.text;
        const nome = conn.getName(m.sender);
       //m.react('🤖')
       let chgptdb = global.chatgpt.data.users[m.sender];
        chgptdb.push({ role: 'user', content: testo });
await conn.sendPresenceUpdate('composing', m.chat);

const syms1 = `Ti comporterai come un bot di WhatsApp creato da I'm Fz, il tuo nome è Sylph. Rispondi in modo gentile e intelligente, aggiungendo un tono leggermente ironico alle tue risposte, ma senza esagerare per evitare di risultare fastidioso. Non devi rivelare che sei Sylph a meno che non ti venga chiesto direttamente il tuo nome o il nome del tuo creatore. Rispondi adeguatamente alle domande e aggiungi una nota se lo ritieni necessario. Puoi usare emoji quando lo trovi opportuno.`
const opzioni = {
			messages: [
			{
				role: "system",
				content: syms1
			},
			...global.chatgpt.data.users[m.sender],
			{
				role: "user",
				content: m.text
			}
			],
			temperature: 0.8,
			top_p: 0.7,
			top_k: 40
		}
		
		const res = await gemini(opzioni);
		const { answer } = res;
global.chatgpt.data.users[m.sender].push({ role: "system", content: answer });
     await m.reply(answer);
        return;    
      
   }
  return true;
};
export default handler;

async function gemini(opzioni) {
  try {
    return await new Promise(async(resolve, reject) => {
      opzioni = {
        model: "gemini-pro",
        messages: opzioni?.messages,
        temperature: opzioni?.temperature || 0.9,
        top_p: opzioni?.top_p || 0.7,
        top_k: opzioni?.top_p || 40,
      }
      if(!opzioni?.messages) return reject("Manca il payload dei messaggi in input!");
      if(!Array.isArray(opzioni?.messages)) return reject("Array non valido nei messaggi in input!");
      if(isNaN(opzioni?.top_p)) return reject("Numero non valido nel payload di top_p!");
      if(isNaN(opzioni?.top_k)) return reject("Numero non valido nel payload di top_k!");
      axios.post("https://api.acloudapp.com/v1/completions", opzioni, {
        headers: {
          authorization: "sk-9jL26pavtzAHk9mdF0A5AeAfFcE1480b9b06737d9eC62c1e"
        }
      }).then(res => {
        const data = res.data;
        if(!data.choices[0].message.content) return reject("Errore nel recupero della risposta!");
        resolve({
          success: true,
          answer: data.choices[0].message.content
        })
      }).catch(reject)
    })
  } catch (e) {
    return {
      success: false,
      errors: [e]
    }
  }
}
