import moment from 'moment-timezone'

let handler = async (m, { conn }) => {
  const zonas = [
    { name: 'Peru', tz: 'America/Lima' },
    { name: 'Mexico', tz: 'America/Mexico_City' },
    { name: 'Bolivia', tz: 'America/La_Paz' },
    { name: 'Chile', tz: 'America/Santiago' },
    { name: 'Argentina', tz: 'America/Argentina/Buenos_Aires' },
    { name: 'Colombia', tz: 'America/Bogota' },
    { name: 'Ecuador', tz: 'America/Guayaquil' },
    { name: 'Costa Rica', tz: 'America/Costa_Rica' },
    { name: 'Cuba', tz: 'America/Havana' },
    { name: 'Guatemala', tz: 'America/Guatemala' },
    { name: 'Honduras', tz: 'America/Tegucigalpa' },
    { name: 'Nicaragua', tz: 'America/Managua' },
    { name: 'Panama', tz: 'America/Panama' },
    { name: 'Uruguay', tz: 'America/Montevideo' },
    { name: 'Venezuela', tz: 'America/Caracas' },
    { name: 'Paraguay', tz: 'America/Asuncion' },
    { name: 'New York', tz: 'America/New_York' },
    { name: 'Asia', tz: 'Asia/Jakarta' },
    { name: 'Brasil', tz: 'America/Sao_Paulo' },
    { name: 'G.N.Q', tz: 'Africa/Malabo' }
  ];

  // Creazione della stringa con orari formattati
  const horarios = zonas.map(zone => {
    const time = moment().tz(zone.tz).format('DD/MM HH:mm');
    return `⏱️${zone.name.padEnd(12)}: ${time}`;
  }).join('\n');

  // Formattazione del messaggio
  const currentTime = moment().tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('DD/MM/YY HH:mm:ss');
  const zonaAttuale = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Invio del messaggio con orari e zona attuale
  await conn.sendMessage(m.chat, {
    text: `*Orari attuali in diverse zone del mondo:*\n\`\`\`\n${horarios}\n\`\`\`\n*Zona attuale:* ${zonaAttuale}\n*Orario attuale:* ${currentTime}`
  }, { quoted: m });
}

handler.help = ['horario']
handler.tags = ['info']
handler.command = /^(orario|zona|horario)$/i

export default handler
