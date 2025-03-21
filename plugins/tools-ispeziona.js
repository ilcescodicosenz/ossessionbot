import * as baileys from '@whiskeysockets/baileys';

let handler = async (m, { conn, text }) => {
  // Estrazione del codice dall'invito
  let [, code] = text.match(/chat\.whatsapp\.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i) || [];
  if (!code) throw '𝐈𝐍𝐒𝐄𝐑𝐈𝐑𝐄 𝐈𝐋 𝐋𝐈𝐍𝐊 𝐃𝐄𝐋 𝐆𝐑𝐔𝐏𝐏𝐎';
  
  // Richiesta di informazioni sul gruppo
  let res = await conn.query({ 
    tag: 'iq', 
    attrs: { type: 'get', xmlns: 'w:g2', to: '@g.us' }, 
    content: [{ tag: 'invite', attrs: { code } }] 
  });

  // Estrazione dei metadati del gruppo
  let data = extractGroupMetadata(res);
  
  // Composizione del messaggio
  let txt = `*INFORMAZIONI GRUPPO*\n`;
  txt += `➣ *ID*: ${data.id}\n`;
  txt += `➣ *Nome*: ${data.subject}\n`;
  txt += `➣ *Creato il*: ${data.creation}\n`;
  txt += `➣ *Creatore*: ${data.owner}\n`;
  txt += `➣ *Numero membri*: ${data.size}\n`;
  txt += `➣ *Amministratori*: ${data.admins.join(', ')}\n`;
  txt += `➣ *Descrizione*: ${data.desc || 'Nessuna descrizione'}\n`;

  // Tentativo di scaricare l'immagine del gruppo
  let pp = await conn.profilePictureUrl(data.id, 'image').catch(() => null);
  if (pp) {
    return conn.sendMessage(m.chat, { image: { url: pp }, caption: txt }, { quoted: m });
  }

  // Invio del messaggio senza immagine
  await conn.reply(m.chat, txt, m);
};

handler.command = /^(ispeziona)$/i;
handler.rowner = true;
export default handler;

// Funzione per estrarre i metadati del gruppo
const extractGroupMetadata = (result) => {
  const group = baileys.getBinaryNodeChild(result, 'group');
  const descChild = baileys.getBinaryNodeChild(group, 'description');
  let desc = descChild ? baileys.getBinaryNodeChild(descChild, 'body')?.content : null;

  // Estrazione dei membri e degli amministratori
  const participants = baileys.getBinaryNodeChildren(group, 'participant');
  const admins = participants.filter(p => p.attrs.type === 'admin' || p.attrs.type === 'superadmin')
    .map(p => 'wa.me/' + baileys.jidNormalizedUser(p.attrs.jid).split('@')[0]);

  const metadata = {
    id: group.attrs.id.includes('@') ? group.attrs.id : baileys.jidEncode(group.attrs.id, 'g.us'),
    subject: group.attrs.subject,
    creation: new Date(+group.attrs.creation * 1000).toLocaleString('it-IT', { timeZone: 'Europe/Rome' }),
    owner: group.attrs.creator ? 'wa.me/' + baileys.jidNormalizedUser(group.attrs.creator).split('@')[0] : '',
    desc,
    size: participants.length,
    admins
  };
  
  return metadata;
};