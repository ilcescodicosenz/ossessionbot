//Crediti By Gabs

import os from 'os';
import util from 'util';
import sizeFormatter from 'human-readable';

function runtime(seconds) {
  seconds = Number(seconds);
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor(seconds % (3600 * 24) / 3600);
  const minutes = Math.floor(seconds % 3600 / 60);
  const seconds = Math.floor(seconds % 60);

  const dayDisplay = days > 0 ? `${days} giorno${days === 1 ? '' : 'i'}, ` : '';
  const hourDisplay = hours > 0 ? `${hours} ora${hours === 1 ? '' : 'e'}, ` : '';
  const minuteDisplay = minutes > 0 ? `${minutes} minuto${minutes === 1 ? '' : 'i'}, ` : '';
  const secondDisplay = seconds > 0 ? `${seconds} secondo${seconds === 1 ? '' : 'i'}` : '';

  return dayDisplay + hourDisplay + minuteDisplay + secondDisplay;
}

import MessageType from '@whiskeysockets/baileys';
import fs from 'fs';
import { performance } from 'perf_hooks';

async function handler(m, { conn, usedPrefix }) {
  const uptime = runtime(process.uptime() * 1000);

  // Get total registered users and groups, handling potential errors gracefully
  let totalreg = 0;
  let groups = 0;
  try {
    totalreg = Object.keys(global.db.data.users).length;
    const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats);
    groups = chats.filter(([id]) => id.endsWith('@g.us')).length;
  } catch (error) {
    console.error('Error fetching user or group data:', error);
  }

  const used = process.memoryUsage();
  const { restrict } = global.db.data.settings[conn.user.jid] || {};
  const { autoread } = global.opts;

  const start = performance.now();
  const end = performance.now();
  const speed = (end - start).toFixed(4);  

  const info = `
ꪶ⏳ꫂ͛ ══ •⊰✰⊱• ══ ꪶ⏳ꫂ͛

  ꙰ 𝟥𝟥𝟥 ꙰ ꪶ⏳ꫂ͛ 𝐁𝐎𝐓 ꙰

  **𝐀𝐓𝐓𝐈𝐕𝐈𝐓𝐀':** ${uptime}
  **𝐕𝐄𝐋𝐎𝐂𝐈𝐓𝐀':** ${speed} ms
  **𝐔𝐓𝐄𝐍𝐓𝐈 𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐀𝐓𝐈:** ${totalreg}
  **𝐆𝐑𝐔𝐏𝐏𝐈:** ${groups}

  ꪶ⏳ꫂ͛ ══ •⊰✰⊱• ══ ꪶ⏳ꫂ͛
  `.trim();

  conn.reply(m.chat, info, m);
}

handler.help = ['infobot', 'speed'];
handler.tags = ['info', 'tools'];
handler.command = /^(ping|speed|infobot|pingtest)$/i;

export default handler;

