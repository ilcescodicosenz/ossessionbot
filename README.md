# Ossession Bot - Il Tuo Bot WhatsApp Coinvolgente

[![Stato del Progetto](https://img.shields.io/badge/status-stable-brightgreen)](https://www.repostatus.org/#stable)
[![Licenza](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Piattaforma](https://img.shields.io/badge/Platform-WhatsApp-success)](https://www.whatsapp.com/)
[![Linguaggio](https://img.shields.io/badge/Language-JavaScript-yellow)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
> Ossession Bot è un bot WhatsApp potente e ricco di funzionalità, progettato per portare un'esperienza coinvolgente direttamente nelle tue chat. Offre una vasta gamma di strumenti per la gestione dei gruppi, l'intrattenimento e l'interazione.

![Anteprima del Bot (se hai un'immagine, sostituisci questo link)](./anteprima_bot.png)

---

## Indice

- [Introduzione](#introduzione)
- [Caratteristiche Principali](#caratteristiche-principali)
- [Come Iniziare](#come-iniziare)
  - [Prova il Bot](#prova-il-bot)
  - [Installazione Manuale (Termux)](#installazione-manuale-termux)
  - [Distribuzione su SkyUltraPlus Host](#distribuzione-su-skyultraplus-host)
  - [Distribuzione su Heroku](#distribuzione-su-heroku)
  - [Distribuzione su Codespaces](#distribuzione-su-codespaces)
  - [Distribuzione su Replit](#distribuzione-su-replit)
  - [Distribuzione su Render](#distribuzione-su-render)
- [Utilizzo](#utilizzo)
  - [Comandi](#comandi)
  - [Configurazione del Gruppo](#configurazione-del-gruppo)
- [Aggiornamento](#aggiornamento)
- [Supporto](#supporto)
- [Licenza](#licenza)
- [Autori](#autori)
- [Ringraziamenti](#ringraziamenti)

---

## Introduzione

Ossession Bot è stato creato per essere un bot WhatsApp versatile e intuitivo. Che tu voglia animare le tue conversazioni di gruppo, automatizzare compiti o semplicemente esplorare nuove interazioni, Ossession Bot è qui per offrirti un'esperienza ricca e coinvolgente.

## Caratteristiche Principali

Ossession Bot offre una vasta gamma di funzionalità, tra cui:

- **Interazione Voce e Testo:** Comunica con il bot tramite comandi testuali o vocali.
- **Configurazione del Gruppo:** Strumenti di moderazione e gestione per amministrare i tuoi gruppi WhatsApp.
- **Funzionalità Anti-Disturbo:** Opzioni antidelete, antilink e antispam per mantenere le tue chat pulite.
- **Benvenuto Personalizzato:** Messaggi di benvenuto configurabili per i nuovi membri del gruppo.
- **Giochi Interattivi:** Divertiti con giochi come tictactoe e indovinelli matematici direttamente in chat.
- **Chatbot (Simsimi):** Interagisci con un chatbot per conversazioni informali.
- **Creazione di Sticker:** Trasforma immagini, video, GIF e URL in sticker di WhatsApp.
- **SubBot (Jadibot):** Possibilità di creare un bot secondario all'interno della chat.
- **Download Multimediale:** Scarica musica e video da YouTube direttamente su WhatsApp.
- **Altre Funzionalità in Arrivo:** Il progetto è in continuo sviluppo con nuove funzionalità in programma.

## Come Iniziare

Ci sono diversi modi per iniziare a usare Ossession Bot:

### Prova il Bot

Se vuoi provare Ossession Bot prima di installarlo, unisciti al gruppo di prova:

[![Gruppo Sumi](https://img.shields.io/badge/Gruppo-Sumi-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/D9hmosKv0924sPqyXeu1CU)

> **Nota:** Il bot nel gruppo di prova potrebbe non avere tutte le funzionalità dell'ultima versione o potrebbe essere riavviato periodicamente.

### Installazione Manuale (Termux)

Se hai un dispositivo Android e desideri eseguire il bot localmente, puoi utilizzare Termux:

1. **Installa Termux:**
   [![Installa Termux](https://img.shields.io/badge/Installa-Termux-blueviolet?style=for-the-badge)](https://www.google.com/search?q=termux+download)

2. **Esegui i comandi di installazione:**
   ```bash
   termux-setup-storage
   ```
   ```bash
   apt update && apt upgrade && pkg install -y git nodejs ffmpeg imagemagick yarn
   ```
   ```bash
   git clone [https://github.com/Leoneloficial/sumi-zakurazawa.git](https://github.com/Leoneloficial/sumi-zakurazawa.git) && cd sumi-zakurazawa
   ```
   ```bash
   yarn install && npm update && npm i
   ```
   ```bash
   npm start
   ```

3. **Attivare in caso di interruzione:**
   ```bash
   cd
   cd Sumi
   npm start
   ```

4. **Ottenere un nuovo codice QR:**
   ```bash
   cd Sumi
   rm -rf Seccion-activas
   npm start
   ```

5. **Esecuzione continua (24/7 con Termux):**
   ```bash
   termux-wake-lock && npm i -g pm2 && pm2 start index.js && pm2 save && pm2 logs
   ```

### Distribuzione su SkyUltraPlus Host

Puoi distribuire facilmente Ossession Bot su SkyUltraPlus Host:

[![SkyUltraPlus Host](https://qu.ax/zFzXF.png)](https://dash.corinplus.com)

Consulta i seguenti link per ulteriori informazioni:

- **Tutorial:** [`Qui`](https://youtu.be/fZbcCLpSH6Y?si=1sDen7Bzmb7jVpAI)
- **Dashboard:** [`Qui`](https://dash.skyultraplus.com)
- **Pannello:** [`Qui`](https://panel.skyultraplus.com)
- **Stato dei servizi:** [`Qui`](https://estado.skyultraplus.com)
- **Canale WhatsApp:** [`Qui`](https://whatsapp.com/channel/0029VakUvreFHWpyWUr4Jr0g)
- **Comunità:** [`Qui`](https://chat.whatsapp.com/JPwcXvPEUwlEOyjI3BpYys)
- **Contatto(i):** [`Gata Dios`](https://wa.me/message/B3KTM5XN2JMRD1) / [`Russell`](https://api.whatsapp.com/send/?phone=15167096032&text&type=phone_number&app_absent=0) / [`elrebelde21`](https://facebook.com/elrebelde21)
- **Discord:** [`SkyUltraPlus`](https://discord.gg/Ph4eWsZ8)

### Distribuzione su Heroku

Puoi anche distribuire Ossession Bot su Heroku:

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://)

**Buildpack Heroku consigliati:**

| BuildPack     | Link                                                         |
|---------------|--------------------------------------------------------------|
| **FFMPEG** | [clicca](https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest) |
| **IMAGEMAGICK** | [clicca](https://github.com/DuckyTeam/heroku-buildpack-imagemagick) |

### Distribuzione su Codespaces

[![Crea Server Codespaces](https://img.shields.io/badge/Crea%20Server-Codespaces-blue?style=for-the-badge&logo=github)](https://github.com/codespaces)

> Segui la documentazione di GitHub Codespaces per configurare un ambiente ed eseguire il bot.

### Distribuzione su Replit

[![Crea Server Replit](https://img.shields.io/badge/Crea%20Server-Replit-brightgreen?style=for-the-badge&logo=replit)](https://replit.com/~)

> Importa il repository su Replit e segui le istruzioni per l'esecuzione di un bot Node.js.

### Distribuzione su Render

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/)

> Segui la documentazione di Render per distribuire un'applicazione Node.js.

## Utilizzo

Dopo aver avviato il bot, puoi interagire con lui tramite comandi inviati nelle chat di WhatsApp.

### Comandi

I comandi disponibili includono (ma non sono limitati a):

- `/menu`: Mostra l'elenco dei comandi disponibili.
- `/sticker <immagine/video/gif/url>`: Crea uno sticker dal media fornito.
- `/play <nome della canzone/link YouTube>`: Riproduci musica da YouTube.
- `/yt <link YouTube>`: Scarica video da YouTube.
- `/jadibot`: Attiva la modalità sub-bot.
- `/tictactoe`: Inizia una partita a tris.
- `/math <operazione>`: Risolvi un'operazione matematica.
- `/simi <testo>`: Parla con il chatbot Simsimi.
- Comandi di amministrazione gruppo (es. `/add`, `/kick`, `/promote`, `/demote`).
- Comandi anti-disturbo (se abilitati).
- Comandi di benvenuto (se configurati).

> Digita `/menu` nel bot per vedere l'elenco completo e aggiornato dei comandi.

### Configurazione del Gruppo

Gli amministratori del gruppo possono utilizzare comandi specifici per configurare il bot e gestire il gruppo, come impostare messaggi di benvenuto, attivare/disattivare funzionalità anti-disturbo e altro ancora.

## Aggiornamento

### Aggiornamento Automatico (Solo Termux, Replit, Linux)

Puoi aggiornare Ossession Bot all'ultima versione utilizzando questo comando (esegui nella directory del bot):

```bash
grep -q 'bash\|wget' <(dpkg -l) || apt install -y bash wget && wget -O - [https://raw.githubusercontent.com/CheirZ/HuTao-Proyect/master/update.sh](https://raw.githubusercontent.com/CheirZ/HuTao-Proyect/master/update.sh) | bash
```

> Questo comando esegue un backup del tuo `database.json` prima di aggiornare.

### Aggiornamento Manuale

1. Fermare il bot in esecuzione.
2. Eseguire `git pull` nella directory del bot per scaricare gli ultimi aggiornamenti dal repository.
3. Eseguire `yarn install` o `npm install` per aggiornare le dipendenze se necessario.
4. Riavviare il bot con `npm start`.

## Supporto

Se hai bisogno di aiuto o hai riscontrato un problema, puoi:

- Aprire una [Issue](https://github.com/Leoneloficial/sumi-zakurazawa/issues) su GitHub.
- Contattare gli sviluppatori tramite i link forniti nella sezione [Distribuzione su SkyUltraPlus Host](#distribuzione-su-skyultraplus-host).

## Licenza

Questo progetto è distribuito sotto la licenza [MIT](LICENSE).

## Autori

- [Leoneloficial](https://github.com/leoneloficial) (Proprietario)
- [EnderJs-CreatorGL](https://github.com/EnderJs-CreatorGL) (Staff Zahpkiel)
- Altri contributori (vedi [CONTRIBUTORS.md](CONTRIBUTORS.md) se presente).

## Ringraziamenti

Un ringraziamento speciale a tutti coloro che hanno contribuito con idee, segnalazioni di bug e supporto per questo progetto. Grazie per aver scelto Ossession Bot\! ❤️
