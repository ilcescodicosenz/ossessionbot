const { makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');

// Funzione per inizializzare il client Baileys
const startClient = async () => {
    const { state, saveCreds } = await useMultiFileAuthState('./auth_info'); // Percorso dove salviamo lo stato di autenticazione
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true, // Mostra il QR Code per accedere
    });

    // Funzione per inviare il tag di un utente
    const tagUser = async (groupId, number) => {
        const userId = `${number}@s.whatsapp.net`; // Format del numero WhatsApp
        try {
            await sock.sendMessage(groupId, {
                text: `@${number}`,
                mentions: [userId], // Menzione dell'utente nel messaggio
            });
            console.log(`Utente taggato con successo: ${number}`);
        } catch (error) {
            console.error(`Errore durante il tagging dell'utente: ${error}`);
        }
    };

    // Funzione per gestire i comandi
    const handleCommand = async (message, from) => {
        const command = message.trim().split(' ')[0]; // Estrai il comando
        const args = message.trim().split(' ').slice(1).join(' '); // Estrai gli argomenti

        console.log(`Comando ricevuto: ${command}`); // Debug per verificare se il comando è correttamente letto

        if (command === '.tagga') {
            const number = args.trim();
            if (!number) {
                await sock.sendMessage(from, { text: 'Errore: Devi fornire un numero. Usa `.tagga <numero>`.' });
                return;
            }
            await tagUser(from, number);
        } else {
            await sock.sendMessage(from, { text: 'Comando non riconosciuto.' });
        }
    };

    // Ascolta i messaggi in arrivo
    sock.ev.on('messages.upsert', async (messageUpdate) => {
        const message = messageUpdate.messages[0];
        if (!message.message || message.key.fromMe) return; // Ignora i messaggi inviati dal bot stesso

        const from = message.key.remoteJid; // ID del gruppo o chat privata
        const messageText = message.message.conversation;

        console.log(`Messaggio ricevuto: ${messageText}`); // Debug per vedere il messaggio

        // Gestisci i comandi
        if (messageText) {
            await handleCommand(messageText, from);
        }
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Connessione chiusa, riconnettere:', shouldReconnect);
            if (shouldReconnect) startClient();
        } else if (connection === 'open') {
            console.log('Connessione stabilita!');
        }
    });

    sock.authState = { creds: state.creds, keys: state.keys };
};

// Avvia il client
startClient();
