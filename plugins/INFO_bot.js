import os from 'os';
import { execSync } from 'child_process';

const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const getDiskSpace = () => {
    try {
        const stdout = execSync('df -h | grep -E "^/dev/root|^/dev/sda1"').toString();
        const [ , size, used, available, usePercent ] = stdout.split(/\s+/);
        return { size, used, available, usePercent };
    } catch (error) {
        console.error('❌ Errore nel recupero dello spazio su disco:', error);
        return null;
    }
};

const getCpuUsage = () => {
    try {
        const cpus = os.cpus();
        let totalIdle = 0;
        let totalTick = 0;
        cpus.forEach(cpu => {
            for (const type in cpu.times) {
                totalTick += cpu.times[type];
            }
            totalIdle += cpu.times.idle;
        });
        return Math.round(((totalTick - totalIdle) / totalTick) * 100);
    } catch (error) {
        console.error('❌ Errore nel recupero dell\'utilizzo della CPU:', error);
        return null;
    }
};

const getRunningProcesses = () => {
    try {
        const stdout = execSync('ps aux --sort=-pcpu,--sort=-rss | head -n 6').toString();
        const lines = stdout.trim().split('\n');
        const header = lines[0].split(/\s+/).filter(Boolean);
        const processes = lines.slice(1).map(line => {
            const values = line.split(/\s+/).filter(Boolean);
            return header.reduce((obj, key, index) => ({ ...obj, [key]: values[index] }), {});
        });
        return processes;
    } catch (error) {
        console.error('❌ Errore nel recupero dei processi in esecuzione:', error);
        return null;
    }
};

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}

const handler = async (m, { conn }) => {
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const _muptime = process.uptime() * 1000;
    const muptime = clockString(_muptime);
    const hostname = os.hostname();
    const platform = os.platform();
    const arch = os.arch();
    const nodeUsage = process.memoryUsage();
    const diskSpace = getDiskSpace();
    const cpuUsage = getCpuUsage();
    const runningProcesses = getRunningProcesses();

    let message = `✅ *STATO DEL SISTEMA*

🚩 *Host ⪼* ${hostname}
🏆 *Sistema Operativo ⪼* ${platform}
💫 *Architettura ⪼* ${arch}
🥷 *RAM Totale ⪼* ${formatBytes(totalMem)}
🚀 *RAM Libera ⪼* ${formatBytes(freeMem)}
⌛ *RAM Usata ⪼* ${formatBytes(usedMem)}
🕒 *Uptime ⪼* ${muptime}
${cpuUsage !== null ? `🧠 *Utilizzo CPU ⪼* ${cpuUsage}%` : '❌ Errore nel recupero dell\'utilizzo della CPU.'}

🪴 *Memoria Node.js:* → RSS: ${formatBytes(nodeUsage.rss)}
→ Heap Totale: ${formatBytes(nodeUsage.heapTotal)}
→ Heap Usata: ${formatBytes(nodeUsage.heapUsed)}
→ Externa: ${formatBytes(nodeUsage.external)}
→ ArrayBuffer: ${formatBytes(nodeUsage.arrayBuffers)}
${diskSpace ? `

☁️ *Spazio su Disco:*
→ Totale: ${diskSpace.size}
→ Usato: ${diskSpace.used}
→ Disponibile: ${diskSpace.available}
→ Percentuale di Uso: ${diskSpace.usePercent}` : '❌ Errore nel recupero dello spazio su disco.'}
${runningProcesses ? `

<0xF0><0x9F><0xAA><0xB6> *Processi in esecuzione (Top 5 per CPU/RAM):*
${runningProcesses.map(p => `→ ${p.USER} ${p.PID} ${p.CPU}% ${p.MEM}% ${p.COMMAND}`).join('\n')}` : '❌ Errore nel recupero dei processi in esecuzione.'}
`;

    await conn.reply(m.chat, message.trim(), m);
};

handler.help = ['sistema'];
handler.tags = ['info'];
handler.command = ['system', 'sistema'];

export default handler;
