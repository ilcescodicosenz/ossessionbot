const handler = async (_message, { conn, usedPrefix }) => {
    const startTime = performance.now();
    const uptime = process.uptime() * 1000;
    const formattedUptime = formatTime(uptime);
    const chatDetails = Object.entries(conn.chats)
        .filter(([id, chat]) => id && chat.isChats);
    const groupChats = chatDetails.filter(([id]) => id.endsWith("@g.us"));
    const individualChats = chatDetails.filter(([id]) => !id.endsWith("@g.us"));
    const memoryUsage = process.memoryUsage();

    // Global settings
    const { restrict } = global.db.data.settings[conn.user.jid] || {};
    const { autoread } = global.opts || {};
    const botStatus = "ONLINE";

    // Prepare a sample response message
    const messageContent = `
════════════════════
   ✧ 𝐌𝚵𝐍𝐔 𝚲𝐔𝐃𝕀Ꮻ ✧  
════════════════════

*Rispondi a un audio con i comandi:*

➤ ${usedPrefix}blown
➤ ${usedPrefix}reverse
➤ ${usedPrefix}chipmunk
➤ ${usedPrefix}deep
➤ ${usedPrefix}fast
➤ ${usedPrefix}slow
➤ ${usedPrefix}squirrel
➤ ${usedPrefix}bass
➤ ${usedPrefix}robot
➤ ${usedPrefix}nightcore
➤ ${usedPrefix}earrape
════════════════════`;

    conn.reply(_message.chat, messageContent.trim(), _message);
};

// Command properties
handler.help = ["menuaudio", "audio"];
handler.tags = ["audio"];
handler.command = /^(menuaudio|audio)$/i;

export default handler;

// Helper function to format uptime
function formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);

    return [hours, minutes, seconds]
        .map((value) => String(value).padStart(2, "0"))
        .join(":");
}

// Helper function to format memory usage
function formatMemory(memory) {
    return Object.entries(memory)
        .map(([key, value]) => `${key}: ${(value / 1024 / 1024).toFixed(2)} MB`)
        .join(", ");
}
