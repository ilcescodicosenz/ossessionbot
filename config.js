import { watchFile, unwatchFile } from 'fs';
import chalk from 'chalk';
import fs from 'fs';
import { fileURLToPath } from 'url';
import moment from 'moment-timezone';

global.botnumber = "";
global.confirmCode = "";

// Cambiar a true si el Bot responde a sus comandos con otros comandos.
// Cambiar a false para usar el Bot desde el mismo numero del Bot.
// Error de m.isBaileys marcado como false fix temporal
global.isBaileysFail = false; // Aggiunto da config2.js

global.defaultLenguaje = 'it'; // Aggiunto da config2.js

global.owner = [
  ['393755853799', 'ossessionbot', true],
  ['xxxxxxxxxx'],

global.suittag = ['393755853799']; // Aggiunto da config2.js
global.prems = ['xxxxxxxxxx', 'xxxxxxxxxx', '393755853799']; // Aggiunto 51995386439 da config2.js

// API (INTERFAZ DE PROGRAMACIÓN DE APLICACIONES)
global.BASE_API_DELIRIUS = "https://delirius-apiofc.vercel.app"; // Aggiunto da config2.js
global.BASE_API_SKYNEX = "https://skynex.boxmine.xyz"; // Aggiunto da config2.js

global.mods = ['xxxxxxxxxx']; // Mantenuto da config.js
global.mods = []; // Sovrascritto da config2.js (vuoto)

global.keysZens = ['c2459db922', '37CC845916', '6fb0eff124'];
global.keysxxx = keysZens[Math.floor(keysZens.length * Math.random())];
global.keysxteammm = ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63'];
global.keysxteam = keysxteammm[Math.floor(keysxteammm.length * Math.random())];
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5'];
global.keysneoxr = keysneoxrrr[Math.floor(keysneoxrrr.length * Math.random())];
global.lolkeysapi = ['BrunoSobrino'];

global.APIs = {
  xteam: 'https://api.xteam.xyz',
  nrtm: 'https://fg-nrtm-nhie.onrender.com',
  bg: 'http://bochil.ddns.net',
  fgmods: 'https://api-fgmods.ddns.net',
  dzx: 'https://api.dhamzxploit.my.id',
  lol: 'https://api.lolhuman.xyz',
  violetics: 'https://violetics.pw',
  neoxr: 'https://api.neoxr.my.id',
  zenzapis: 'https://zenzapis.xyz',
  akuari: 'https://api.akuari.my.id',
  akuari2: 'https://apimu.my.id',
  fgmods: 'https://api-fgmods.ddns.net'
};
global.APIKeys = {
  'https://api.xteam.xyz': `${keysxteam}`,
  'https://api.lolhuman.xyz': '85faf717d0545d14074659ad',
  'https://api.neoxr.my.id': `${keysneoxr}`,
  'https://violetics.pw': 'beta',
};

global.imagen1 = ['./media/menu1.jpg'];
global.imagen4 = fs.readFileSync('./ossessionbot.png');

global.packname = 'ossessionbot'; // Mantenuto da config.js
global.packname = 'Sticker'; // Sovrascritto da config2.js.
global.author = 'cesco'; // Mantenuto da config.js
global.author = 'ilcescodicosenz'; // Sovrascritto da config2.js.

global.vs = '1.0';

global.nomebot = 'ossessionbot';

global.multiplier = 69;
global.maxwarn = '5';

global.wm = 'ossessionbot'; // Mantenuto da config.js
