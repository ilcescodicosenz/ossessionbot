const handler = async (m, { conn, text, command }) => {
    const menuPiatti = {
        "primi": ["Spaghetti alla Carbonara", "Lasagna alla Bolognese", "Risotto alla Milanese", "Pasta al Pesto"],
        "secondi": ["Ossobuco alla Milanese", "Saltimbocca alla Romana", "Cotoletta alla Milanese"],
        "dolci": ["Tiramisù", "Panna Cotta", "Biscotti Cantucci", "Pastiera Napoletana"]
    };

    const ricette = {
        carbonara: {
            nome: "Spaghetti alla Carbonara",
            ingredienti: ["200g Spaghetti", "2 Uova", "100g Guanciale", "50g Pecorino Romano", "Pepe Nero q.b.", "Sale q.b."],
            preparazione: "1️⃣ Rosola il guanciale senza olio. 2️⃣ Sbatti le uova con pecorino e pepe. 3️⃣ Cuoci la pasta, scolala e mescola con il guanciale. 4️⃣ Aggiungi il mix di uova e mescola velocemente per ottenere la crema.",
            immagine: "https://www.example.com/carbonara.jpg"
        },
        tiramisu: {
            nome: "Tiramisù",
            ingredienti: ["250g Mascarpone", "2 Uova", "50g Zucchero", "200ml Caffè", "100g Savoiardi", "Cacao amaro"],
            preparazione: "1️⃣ Sbatti i tuorli con lo zucchero, aggiungi il mascarpone. 2️⃣ Monta gli albumi a neve e unisci alla crema. 3️⃣ Inzuppa i savoiardi nel caffè, alterna strati con la crema. 4️⃣ Spolvera con cacao e lascia in frigo per 4 ore.",
            immagine: "https://www.example.com/tiramisu.jpg"
        }
    };

    // 📂 MENU CATEGORIZZATO
    if (command === 'menuricetta') {
        let menuTesto = "🍽️ *Menù Italiano* 🇮🇹\n\n";
        for (const categoria in menuPiatti) {
            menuTesto += `📌 *${categoria.toUpperCase()}*\n`;
            menuPiatti[categoria].forEach((piatto, index) => {
                menuTesto += `${index + 1}. ${piatto}\n`;
            });
            menuTesto += "\n";
        }
        menuTesto += "ℹ️ Per ricevere la ricetta, digita: *!ricetta [nome_piatto]*\nEsempio: *!ricetta carbonara*";
        return await conn.sendMessage(m.chat, { text: menuTesto }, { quoted: m });
    }

    // 🎲 RICETTA CASUALE
    if (command === 'ricetta' && text === "random") {
        const keys = Object.keys(ricette);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        text = randomKey; // Imposta la ricerca sulla ricetta casuale
    }

    // 🔍 RICERCA PARZIALE
    if (command === 'ricetta') {
        if (!text) {
            return await conn.sendMessage(m.chat, { text: "❌ Devi scrivere il nome del piatto! Esempio: *!ricetta carbonara* oppure *!ricetta random* per una ricetta casuale." }, { quoted: m });
        }

        const [piatto, lingua, persone] = text.toLowerCase().trim().split(" ");

        // Trova una ricetta che contenga il testo
        let piattoScelto = Object.keys(ricette).find(key => key.includes(piatto));
        if (!piattoScelto) {
            return await conn.sendMessage(m.chat, { text: "❌ Ricetta non trovata! Controlla il nome oppure prova *!ricetta random*." }, { quoted: m });
        }

        let ricetta = ricette[piattoScelto];

        // 📸 INVIO IMMAGINE SE DISPONIBILE
        let immagineMsg = ricetta.immagine ? { image: { url: ricetta.immagine }, caption: ricetta.nome } : {};

        // 👥 MODIFICA DOSI PER PIÙ PERSONE
        let moltiplicatore = persone && !isNaN(persone) ? parseInt(persone) / 2 : 1;
        let ingredientiModificati = ricetta.ingredienti.map(ing => ing.replace(/\d+/g, num => Math.round(parseInt(num) * moltiplicatore)));

        // 🌍 SUPPORTO MULTILINGUA (solo esempio, richiede database traduzioni)
        let traduzioni = {
            "en": {
                "Spaghetti alla Carbonara": "Carbonara Spaghetti",
                "Tiramisù": "Tiramisu"
            }
        };
        let nomeTradotto = (lingua && traduzioni[lingua] && traduzioni[lingua][ricetta.nome]) || ricetta.nome;

        // 📝 COSTRUZIONE RISPOSTA
        let risposta = `🍽️ *${nomeTradotto}*\n\n🛒 *Ingredienti per ${persone || 2} persone:*\n`;
        ingredientiModificati.forEach(ingrediente => risposta += `- ${ingrediente}\n`);
        risposta += `\n👨‍🍳 *Preparazione:*\n${ricetta.preparazione}`;

        // 📩 INVIO MESSAGGIO
        await conn.sendMessage(m.chat, { text: risposta }, { quoted: m });
        if (ricetta.immagine) await conn.sendMessage(m.chat, immagineMsg, { quoted: m });
    }
};

handler.command = ['menuricetta', 'ricetta'];
export default handler;
