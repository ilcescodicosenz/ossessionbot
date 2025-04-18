let handler = async (m, { conn, usedPrefix, command }) => {
    // Lista di tutti i gusti di Red Bull e Monster disponibili in Italia
    const energyDrinks = [
        // 🥤 Red Bull
        "🔵 Red Bull Original",
        "🔴 Red Bull Sugarfree",
        "⚪ Red Bull Zero",
        "🍉 Red Bull Summer Edition Anguria",
        "🍑 Red Bull White Edition Pesca",
        "🍐 Red Bull Winter Edition Pera",
        "🥝 Red Bull Green Edition Fico d’India",
        "🍊 Red Bull Orange Edition Albicocca e Fragola",
        "🫐 Red Bull Purple Edition Mirtillo",

        // ⚡ Monster Energy
        "🖤 Monster Energy Original",
        "⚪ Monster Ultra White (Senza Zucchero)",
        "🔵 Monster Ultra Blue",
        "💜 Monster Ultra Violet",
        "🟢 Monster Ultra Paradise",
        "🟡 Monster Ultra Gold (Ananas)",
        "🟠 Monster Ultra Sunrise (Arancia)",
        "🧡 Monster Ultra Fiesta Mango",
        "🍉 Monster Watermelon (Anguria)",
        "🍑 Monster Peachy Keen (Pesca)",
        "🍓 Monster Pipeline Punch (Frutti Tropicali)",
        "🥭 Monster Mango Loco",
        "🍏 Monster Juiced Ripper (Mela e Mango)",
        "🍇 Monster Khaos (Arancia, Mela, Uva)",
        "🧃 Monster Rehab Lemonade (Tè e Limone)",
        "🍋 Monster Reserve White Pineapple (Ananas Bianco)",
        "🥥 Monster Reserve Watermelon (Anguria e Cocco)",
        "🔥 Monster Nitro (Effetto Extra Boost)"
    ];

    // Sceglie un energy drink casualmente
    let energyCasuale = energyDrinks[Math.floor(Math.random() * energyDrinks.length)];

    // Messaggio da inviare
    let messaggio = `⚡ *Consiglio Energy Drink!* ⚡\n\n🥤 Oggi dovresti provare: *${energyCasuale}*!\n\n🚀 Preparati per un boost di energia!`;

    // Invia il messaggio
    await conn.sendMessage(m.chat, { text: messaggio }, { quoted: m });
};

// Definizione del comando per Gab
handler.command = ["energy", "redbull", "monster"];
handler.help = ["energy", "redbull", "monster"];
handler.tags = ["fun"];
handler.desc = "Ti consiglia un Energy Drink tra Red Bull e Monster disponibili in Italia! ⚡🥤";

export default handler;
