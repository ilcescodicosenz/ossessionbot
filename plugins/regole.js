let handler = async (m, { conn, command, text }) => {
  let groupName = m.chat.split('@')[0]; // Ottieni il nome del gruppo
  let ownerNumber = m.chat.jid ? m.chat.jid.split('@')[0] : "Unknown"; // Numero del fondatore
  let groupLink = await conn.groupInviteCode(m.chat); // Ottieni il link del gruppo

  // Estrai i metadati del gruppo, incluso il creatore
  let groupMetadata = await conn.groupMetadata(m.chat);
  let owner = groupMetadata.owner.split('@')[0]; // Estrai il numero del creatore

  let love = `
⎛⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺𝚁𝚄𝙻𝙴𝚂⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎞
⎜✿︎☯︎ 𝙿𝚛𝚎𝚜𝚎𝚗𝚝𝚊𝚝𝚒 𝚌𝚘𝚗 𝚗𝚘𝚖𝚎, 𝚊𝚗𝚗𝚒, 𝚎 𝚌𝚒𝚝𝚝𝚊̀ ☯︎✿︎
⎜🎂 𝙴𝚝𝚊̀: 𝙼𝚒𝚗𝚒𝚖𝚘 𝟷𝟸 𝚊𝚗𝚗𝚒 🎂  
⎜❌ 𝙽𝙾 𝚒𝚗𝚜𝚞𝚕𝚝𝚒 𝚎 𝚋𝚞𝚕𝚕𝚒𝚜𝚖𝚘❌   
⎜❌ 𝙽𝙾 𝚕𝚒𝚗𝚔 𝚎 𝚜𝚙𝚊𝚖 ❌ 
⎜❌ 𝙽𝙾 𝚙𝚘𝚛𝚗𝚘/𝚐𝚘𝚛𝚎 ❌   
⎜❌ 𝙽𝙾 𝚙𝚛𝚒𝚟𝚊𝚝𝚒 𝚜𝚎𝚗𝚣𝚊 𝚌𝚘𝚗𝚜𝚎𝚗𝚜𝚘 ❌ 
⎜❌ 𝙽𝙾 𝙲𝙷𝙸𝙴𝙳𝙴𝚁𝙴 𝙰𝙳𝙼𝙸𝙽 ❌ 
⎜❌ 𝙽𝙾 𝚕𝚐𝚋𝚝 ❌ 
⎜(1-2 𝚆𝙰𝚁𝙽) 
⎜
⎜✔︎ 𝚂𝙸  𝚏𝚕𝚊𝚖𝚎🖤
⎜✔︎ 𝚂𝙸 𝙰𝙼𝙸𝙲𝙸𝚉𝙸𝙴 🖤 
⎜✔︎ 𝙽𝙸𝙲𝙺 𝚒𝚗𝚜𝚝𝚊/𝚝𝚒𝚔𝚝𝚘𝚔 🖤
⎜✔︎ 𝙲𝙰𝙻𝙻 (𝚂𝙾𝙻𝙾 𝙲𝙾𝙽 𝙲𝙾𝙽𝚂𝙴𝙽𝚂𝙾) 🖤  
⎜
⎜⚠️ IN CASO DI BISOGNO, CONTATTA ⎜GLI ADMIN.
⎜
⎜BOT ATTIVO 🤓
⎜
⎝⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽
 

Owner : wa.me/${owner}

𝐋𝐈𝐍𝐊 𝐆𝐑𝐔𝐏𝐏𝐎: chat.whatsapp.com/${groupLink}
────────────────`.trim();

  m.reply(love, null, { mentions: conn.parseMention(love) });
}

handler.command = /^(regole)$/i
export default handler;
