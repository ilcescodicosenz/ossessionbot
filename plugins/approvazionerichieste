let handler = async (m, { conn, isAdmin, isBotAdmin }) => {
  if (!m.isGroup) return m.reply("Questo comando si usa solo nei gruppi.")
  if (!isBotAdmin) return m.reply("Devo essere admin per modificare le impostazioni del gruppo.")
  if (!isAdmin) return m.reply("Solo gli admin del gruppo possono usare questo comando.")

  try {
    await conn.groupRequestParticipantsModeUpdate(m.chat, 'none')
    m.reply('✅ Da ora l\'ingresso nel gruppo è libero, senza richieste di approvazione!')
  } catch (err) {
    console.error('[ERRORE DISATTIVA APPROVAZIONE]', err)
    m.reply('❌ Errore durante la disattivazione delle richieste di approvazione.')
  }
}

handler.command = ['disabilitaapprovazione', 'approvazionelibera', 'noapprovazione']
handler.tags = ['gruppo']
handler.help = ['disabilitaapprovazione - disabilita la richiesta di approvazione per entrare']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
