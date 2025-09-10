//Codice di fun-dox.js

import { performance } from 'perf_hooks';

const nomiMaschili = ['Luca', 'Mario', 'Alessandro', 'Matteo', 'Davide', 'Simone', 'Andrea', 'Giovanni', 'Francesco', 'Stefano', 'Nicola', 'Marco', 'Gabriele', 'Riccardo', 'Emanuele', 'Filippo', 'Daniele', 'Vincenzo', 'Paolo', 'Antonio'];
const nomiFemminili = ['Giulia', 'Sara', 'Martina', 'Francesca', 'Elisa', 'Laura', 'Valentina', 'Chiara', 'Federica', 'Silvia', 'Alice', 'Veronica', 'Eleonora', 'Marta', 'Anna', 'Ilaria', 'Roberta', 'Monica', 'Elena', 'Caterina'];
const cognomi = ['Bianchi', 'Rossi', 'Neri', 'Ferrari', 'Moretti', 'Greco', 'Romano', 'Conti', 'Galli', 'De Luca', 'Vitale', 'Rizzi', 'Lombardi', 'Costa', 'Marino', 'Ricci', 'Bruno', 'Fontana', 'Santoro', 'Esposito'];

const lavori = ['Studente', 'Ingegnere', 'Impiegato', 'Medico', 'Avvocato', 'Artista', 'Programmatore', 'Libero professionista', 'Designer', 'Insegnante', 'Commesso', 'Autista', 'Imprenditore', 'Giornalista', 'Architetto', 'Musicista', 'Fisioterapista', 'Fotografo', 'Chef', 'Psicologo'];

const hobby = ['Calcio', 'Videogiochi', 'Musica', 'Cinema', 'Lettura', 'Fotografia', 'Viaggi', 'Cucina', 'Pittura', 'Fitness', 'Tecnologia', 'Moda', 'Escursionismo', 'Basket', 'Scrittura', 'Danza', 'Yoga', 'Pesca', 'Giardinaggio', 'Bici'];

const usernamesBase = ['xReaper', 'zero_day', 'darkghost', 'ex0r', 'rootkit99', 'ghost_it', 'phantom', 'silentkiller', 'shadow', 'nightmare', 'cyber', 'hacker', 'neon', 'viper', 'dragon', 'storm'];

const discordTags = ['reaper#9999', 'h4ck3r#4040', 'ghost_it#1337', 'anon#0001', 'shadow#2025', 'nightmare#7777', 'darkweb#2024', 'phantom#4242', 'vortex#8822', 'cryptic#3141', 'neon#5500', 'ghostly#1234'];

const devices = ['Android 14', 'iPhone 15 Pro', 'Windows 11 Pro', 'MacOS Sonoma', 'Linux Ubuntu 22.04', 'Chrome OS', 'Samsung Galaxy S23', 'Google Pixel 8', 'iPad Pro', 'OnePlus 11', 'Surface Pro 8'];

const ispList = ['TIM S.p.A.', 'Vodafone Italia', 'WINDTRE S.p.A.', 'Fastweb S.p.A.', 'Tiscali S.p.A.', 'Iliad Italia', 'PosteMobile'];

const routers = ['Huawei', 'TP-Link', 'Zyxel', 'FRITZ!Box', 'Asus', 'Netgear', 'D-Link', 'Linksys', 'MikroTik', 'Ubiquiti'];

const breaches = ['Facebook 2019', 'TikTok Italy 2022', 'Telegram Dump', 'Instagram 2023', 'LinkedIn 2020', 'Adobe 2013', 'Dropbox 2016', 'MyFitnessPal 2018', 'Steam 2015', 'Yahoo 2014', 'Sony 2011', 'Adobe 2013'];

const cities = ['Roma', 'Milano', 'Napoli', 'Torino', 'Palermo', 'Genova', 'Bologna', 'Firenze', 'Venezia', 'Verona', 'Padova', 'Trieste', 'Catania', 'Monza', 'Bari', 'Messina', 'Reggio Calabria', 'Parma', 'Modena', 'Livorno'];

const streets = ['Via Verdi', 'Piazza Dante', 'Corso Italia', 'Viale Europa', 'Via Garibaldi', 'Via Roma', 'Largo Garibaldi', 'Via Torino', 'Via San Marco', 'Piazza San Giovanni', 'Via Matteotti', 'Corso Vittorio Emanuele'];

const postalCodes = ['00185', '10121', '80133', '20100', '90133', '16121', '40121', '50123', '30121', '37121', '35121', '34121', '89121', '20821', '70121', '98121', '89122', '43121', '41121', '57121'];

const socialMedias = ['Twitter', 'Instagram', 'Facebook', 'TikTok', 'Snapchat', 'LinkedIn', 'Reddit', 'Discord'];

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function generateMac() {
  return [...Array(6)].map(() =>
    Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
  ).join(':').toUpperCase();
}

function randHex() {
  return Math.floor(Math.random() * 65535).toString(16).padStart(4, '0');
}

function randomDate(age) {
  const now = new Date();
  const birthYear = now.getFullYear() - age;
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1;
  return `${birthYear}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function generateUsername(name, surname) {
  const base = (name[0] + surname).toLowerCase().replace(/[^a-z0-9]/g, '');
  return base + Math.floor(Math.random() * 999);
}

function generateEmail(name, surname) {
  const base = (name + '.' + surname).toLowerCase().replace(/[^a-z0-9]/g, '');
  const providers = ['protonmail.com', 'gmail.com', 'yahoo.it', 'outlook.com'];
  return base + '@' + pickRandom(providers);
}

function generatePhone() {
  return `+39 ${pickRandom(['388','351','347','320','333'])}-${Math.floor(1000000 + Math.random() * 8999999)}`;
}

function generateSocialProfiles(username) {
  let profiles = [];
  socialMedias.forEach(site => {
    if (Math.random() < 0.5) { // 50% probabilità di avere profilo su quel social
      profiles.push(`${site}: ${username}${Math.floor(Math.random() * 99)}`);
    }
  });
  return profiles.length ? profiles.join(' | ') : 'None';
}

let handler = async (m, { conn, text }) => {
  if (!text && !m.mentionedJid?.length) return m.reply('Usage: .dox <nome o @tag>');

  let mentionedJid = m.mentionedJid?.[0];
  let rawId = '', tagClean = '', nomeTaggato = '';
  if (mentionedJid) {
    rawId = mentionedJid.split('@')[0];
    tagClean = `@${rawId}`;
    nomeTaggato = await conn.getName(mentionedJid);
  } else {
    rawId = text.replace(/[^0-9]/g, '').slice(-10);
    tagClean = text.trim();
    nomeTaggato = text.trim();
  }

  const startTime = performance.now();

  await m.reply(`Accessing private indexes for *"${nomeTaggato}"*...`);
  await sleep(900);
  await m.reply('Retrieving public breach data...');
  await sleep(900);
  await m.reply('Compiling full digital footprint...');
  await sleep(1300);

  const isMale = Math.random() < 0.5;
  const nome = isMale ? pickRandom(nomiMaschili) : pickRandom(nomiFemminili);
  const cognome = pickRandom(cognomi);
  const age = Math.floor(Math.random() * 50) + 18;
  const dob = randomDate(age);
  const username = generateUsername(nome, cognome);
  const email = generateEmail(nome, cognome);
  const phone = generatePhone();
  const ipv4 = pickRandom(['151.12.89.201', '95.233.104.17', '88.53.127.8', '93.49.76.200', '45.55.22.11', '172.217.12.14']);
  const ipv6 = `2a00:${randHex()}:${randHex()}::${randHex()}`;
  const mac = generateMac();
  const device = pickRandom(devices);
  const isp = pickRandom(ispList);
  const router = pickRandom(routers);
  const breach = pickRandom(breaches);
  const city = pickRandom(cities);
  const street = `${pickRandom(streets)} ${Math.floor(Math.random() * 100) + 1}`;
  const postal = pickRandom(postalCodes);
  const lavoro = pickRandom(lavori);
  const hobbysel = pickRandom(hobby);
  const socials = generateSocialProfiles(username);

  const discord = pickRandom(discordTags);

  const endTime = performance.now();
  const speed = (endTime - startTime).toFixed(2);

  const report = `
-------- BEGIN DOX REPORT --------
Target: ${nomeTaggato} (${tagClean})
Name: ${nome} ${cognome}
Age: ${age}
DOB: ${dob}
Occupation: ${lavoro}
Hobby: ${hobbysel}
Username: ${username}
Email: ${email}
Phone: ${phone}
Discord: ${discord}
Socials: ${socials}

Address: ${street}, ${city}, IT
Postal Code: ${postal}

IPv4: ${ipv4}
IPv6: ${ipv6}
MAC: ${mac}
Device: ${device}
ISP: ${isp}
Router: ${router}

Breaches: ${breach}
Exposure Level: HIGH
Execution Time: ${speed} ms
-------- END OF REPORT --------`.trim();

  m.reply('```' + report + '```', null, {
    mentions: mentionedJid ? [mentionedJid] : []
  });
};

handler.help = ['dox <nome|@tag>'];
handler.tags = ['hacking', 'simulator', 'fun'];
handler.command = /^dox$/i;
export default handler;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
