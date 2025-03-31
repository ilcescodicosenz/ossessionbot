const handler = async (m, { conn, text, command }) => {
    const menuPiatti = [
        "Spaghetti alla Carbonara", "Lasagna alla Bolognese", "Pizza Margherita", "Risotto alla Milanese",
        "Ossobuco alla Milanese", "Parmigiana di Melanzane", "Tiramisù", "Panna Cotta", "Zuppa di Pesce", "Frittata di Zucchine",
        "Gnocchi alla Sorrentina", "Tagliatelle al Ragù", "Cannelloni Ricotta e Spinaci", "Bruschetta al Pomodoro", "Arancini Siciliani",
        "Frittura di Calamari", "Polenta e Funghi", "Caponata Siciliana", "Pasta e Fagioli", "Minestrone",
        "Saltimbocca alla Romana", "Vitello Tonnato", "Cotoletta alla Milanese", "Sformato di Patate", "Cacciucco alla Livornese",
        "Pasta alla Norma", "Bucatini all'Amatriciana", "Risotto ai Frutti di Mare", "Carciofi alla Romana", "Pasta con le Sarde",
        "Involtini di Melanzane", "Scaloppine al Vino Bianco", "Seppie con Piselli", "Insalata Caprese", "Mozzarella in Carrozza",
        "Pasta al Pesto", "Trofie al Pesto", "Frittelle di Zucchine", "Zabaione", "Cassata Siciliana",
        "Biscotti Cantucci", "Sfogliatelle Napoletane", "Torta della Nonna", "Struffoli", "Crostata di Marmellata",
        "Pastiera Napoletana", "Amaretti", "Baba al Rum", "Gelato Artigianale", "Ciambellone"
    ];

    const ricette = {
        carbonara: {
            nome: "Spaghetti alla Carbonara",
            ingredienti: ["200g Spaghetti", "2 Uova", "100g Guanciale", "50g Pecorino Romano", "Pepe Nero q.b.", "Sale q.b."],
            preparazione: "1️⃣ Rosola il guanciale senza olio. 2️⃣ Sbatti le uova con pecorino e pepe. 3️⃣ Cuoci la pasta, scolala e mescola con il guanciale. 4️⃣ Aggiungi il mix di uova e mescola velocemente per ottenere la crema."
        },
        lasagna: {
            nome: "Lasagna alla Bolognese",
            ingredienti: ["250g Lasagne", "300g Ragù alla Bolognese", "200ml Besciamella", "100g Parmigiano", "Olio d'oliva q.b."],
            preparazione: "1️⃣ Prepara il ragù e la besciamella. 2️⃣ Alterna strati di lasagne, ragù, besciamella e parmigiano. 3️⃣ Cuoci in forno a 180°C per 30 minuti."
        },
        pizza: {
            nome: "Pizza Margherita",
            ingredienti: ["500g Farina", "300ml Acqua", "5g Lievito", "10g Sale", "300g Passata di Pomodoro", "200g Mozzarella", "Basilico fresco"],
            preparazione: "1️⃣ Impasta farina, lievito, acqua e sale. 2️⃣ Lascia lievitare 2 ore. 3️⃣ Stendi l'impasto, aggiungi pomodoro e mozzarella. 4️⃣ Cuoci a 250°C per 10-15 minuti."
        },
        tiramisu: {
            nome: "Tiramisù",
            ingredienti: ["250g Mascarpone", "2 Uova", "50g Zucchero", "200ml Caffè", "100g Savoiardi", "Cacao amaro"],
            preparazione: "1️⃣ Sbatti i tuorli con lo zucchero, aggiungi il mascarpone. 2️⃣ Monta gli albumi a neve e unisci alla crema. 3️⃣ Inzuppa i savoiardi nel caffè, alterna strati con la crema. 4️⃣ Spolvera con cacao e lascia in frigo per 4 ore."
        }
    };

    if (command === 'menuricetta') {
        let menuTesto = "🍽️ *Menù Italiano* 🇮🇹\n";
        menuPiatti.forEach((piatto, index) => {
            menuTesto += `${index + 1}. ${piatto}\n`;
        });
        menuTesto += "\nℹ️ Per ricevere la ricetta, digita: *!ricetta [nome_piatto]*\nEsempio: *!ricetta carbonara* oppure .menugiapponese";
        return await conn.sendMessage(m.chat, { text: menuTesto }, { quoted: m });
    }

    if (command === 'ricetta') {
        if (!text) {
            return await conn.sendMessage(m.chat, { text: "❌ Devi scrivere il nome del piatto! Esempio: *!ricetta carbonara*" }, { quoted: m });
        }

        const piatto = text.toLowerCase().trim();
        if (ricette[piatto]) {
            const ricetta = ricette[piatto];
            let risposta = `🍽️ *${ricetta.nome}*\n\n🛒 *Ingredienti per 2 persone:*\n`;
            ricetta.ingredienti.forEach(ingrediente => risposta += `- ${ingrediente}\n`);
            risposta += `\n👨‍🍳 *Preparazione:*\n${ricetta.preparazione}`;

            return await conn.sendMessage(m.chat, { text: risposta }, { quoted: m });
        } else {
            return await conn.sendMessage(m.chat, { text: "❌ Ricetta non trovata! Assicurati di aver scritto il nome correttamente." }, { quoted: m });
        }
    }
};

handler.command = ['menuricetta', 'ricetta'];
export default handler;
