import fetch from 'node-fetch';
import { Configuration, OpenAIApi } from 'openai';
import translate from '@vitalets/google-translate-api';

const configuration = new Configuration({
  organization: global.openai_org_id,
  apiKey: global.openai_key,
});
const openai = new OpenAIApi(configuration);

const handler = async (m, { conn, text, usedPrefix }) => {
  const chat = global.db.data.chats[m.chat];
  if (!chat.gpt || !text) {
    return m.reply("𝐅𝐚𝐢 𝐮𝐧𝐚 𝐝𝐨𝐦𝐚𝐧𝐝𝐚 𝐚𝐥 𝐛𝐨𝐭 :)");
  }
  
  try {
    conn.sendPresenceUpdate('composing', m.chat);
    const systemMessage = "Actuaras como un Bot de WhatsApp creado por BrunoSobrino, tu seras The Mystic - Bot.";
    
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: systemMessage }, { role: "user", content: text }],
    });
    
    const replyText = response.data.choices[0]?.message?.content.trim();
    if (replyText) return m.reply(replyText);
  } catch (error) {
    console.error("Errore con OpenAI:", error);
  }
  
  // Tentativo con API alternative
  const alternativeApis = [
    `https://api-fgmods.ddns.net/api/info/openai?text=${text}&apikey=XlwAnX8d`,
    `https://vihangayt.me/tools/chatgpt?q=${text}`,
    `https://api.lolhuman.xyz/api/openai?apikey=${global.lolkeysapi}&text=${text}&user=${m.sender}`
  ];
  
  for (const url of alternativeApis) {
    try {
      conn.sendPresenceUpdate('composing', m.chat);
      const response = await fetch(url);
      const data = await response.json();
      const result = data.result || data.data;
      if (result) {
        const translated = await translate(result, { to: 'es', autoCorrect: true });
        return m.reply(translated.text.trim());
      }
    } catch (error) {
      console.warn("Errore con API alternativa:", error);
    }
  }
  
  return m.reply("❌ Non ho capito la tua richiesta.");
};

handler.command = ['chatgpt', 'gpt'];
export default handler;
