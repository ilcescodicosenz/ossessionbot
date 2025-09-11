import fs from 'fs';
import path from 'path';
import PhoneValidator from './PhoneValidator.js';

/**
 * Intercettore globale per risolvere i LID nei messaggi con archiviazione locale
 * Include la validazione dei numeri di telefono per rilevare LID che sono numeri validi
 */
class LidResolver {
  constructor(conn) {
    this.conn = conn;
    this.processingQueue = new Map();
    this.cacheFile = path.join(process.cwd(), 'lidsresolve.json');
    this.cache = new Map(); // Ora memorizza direttamente per LID
    this.jidToLidMap = new Map(); // Mappatura inversa JID -> LID per ricerche rapide
    this.isDirty = false;
    this.saveTimeout = null;
    this.maxCacheSize = 1000; // Massimo numero di voci in cache

    // Inizializza il validatore dei numeri di telefono
    this.phoneValidator = new PhoneValidator();

    // Assicura che la directory esista
    this.ensureDirectoryExists();

    // Carica la cache dal file
    this.loadCache();

    // Configura il salvataggio automatico
    this.setupAutoSave();

    // Pulisce le voci problematiche all'inizializzazione
    this.cleanupPhoneNumbers();
  }

  /**
   * Assicura che la directory esista
   */
  ensureDirectoryExists() {
    const srcDir = path.dirname(this.cacheFile);
    if (!fs.existsSync(srcDir)) {
      fs.mkdirSync(srcDir, { recursive: true });
    }
  }

  /**
   * Carica la cache dal file JSON
   */
  loadCache() {
    try {
      if (fs.existsSync(this.cacheFile)) {
        const data = fs.readFileSync(this.cacheFile, 'utf8');
        const parsed = JSON.parse(data);

        // Verifica la struttura
        let validEntries = 0;

        for (const [key, entry] of Object.entries(parsed)) {
          if (entry && typeof entry === 'object' && entry.jid && entry.lid && entry.timestamp) {
            this.cache.set(key, entry);
            // Crea mappatura inversa
            if (entry.jid && entry.jid.includes('@s.whatsapp.net')) {
              this.jidToLidMap.set(entry.jid, entry.lid);
            }
            validEntries++;
          }
        }

        // Salva la cache se ci sono cambiamenti nella struttura
      } else {
        this.saveCache();
      }
    } catch (error) {
      console.error('❌ Errore nel caricamento della cache LID:', error.message);
      this.cache = new Map();
      this.jidToLidMap = new Map();
      this.saveCache();
    }
  }

  /**
   * Pulisce numeri di telefono classificati erroneamente come LID
   */
  cleanupPhoneNumbers() {
    let cleanupCount = 0;
    const toCleanup = [];

    for (const [lidKey, entry] of this.cache.entries()) {
      // Rileva se il lidKey è realmente un numero di telefono
      const phoneDetection = this.phoneValidator.detectPhoneInLid(lidKey);

      if (phoneDetection.isPhone) {
        // Se è un numero di telefono ed è segnato come "non trovato"
        if (entry.notFound) {
          const correctJid = phoneDetection.jid;
          const countryInfo = this.phoneValidator.getCountryInfo(phoneDetection.phoneNumber);

          // Crea nuova voce corretta
          const correctedEntry = {
            jid: correctJid,
            lid: `${lidKey}@lid`, // Mantieni il LID originale per compatibilità
            name: phoneDetection.phoneNumber,
            timestamp: Date.now(),
            corrected: true,
            country: countryInfo?.country,
            phoneNumber: phoneDetection.phoneNumber
          };

          toCleanup.push({
            oldKey: lidKey,
            newEntry: correctedEntry,
            correctJid: correctJid
          });

          cleanupCount++;
        }
      }
    }

    // Applica le correzioni
    for (const cleanup of toCleanup) {
      // Rimuovi la vecchia voce
      this.cache.delete(cleanup.oldKey);

      // Aggiungi la voce corretta
      this.cache.set(cleanup.oldKey, cleanup.newEntry);
      this.jidToLidMap.set(cleanup.correctJid, `${cleanup.oldKey}@lid`);
    }

    if (cleanupCount > 0) {
      this.markDirty();
    }
  }

  /**
   * Salva la cache su file JSON
   */
  saveCache() {
    try {
      const data = {};
      for (const [key, value] of this.cache.entries()) {
        data[key] = value;
      }

      fs.writeFileSync(this.cacheFile, JSON.stringify(data, null, 2), 'utf8');
      this.isDirty = false;
    } catch (error) {
      console.error('❌ Errore nel salvataggio della cache LID:', error.message);
    }
  }

  /**
   * Configura il salvataggio automatico quando ci sono cambiamenti
   */
  setupAutoSave() {
    // Salva ogni 30 secondi se ci sono cambiamenti
    setInterval(() => {
      if (this.isDirty) {
        this.saveCache();
      }
    }, 30000);

    // Salva all'uscita del processo
    process.on('SIGINT', () => {
      if (this.isDirty) {
        this.saveCache();
      }
    });

    process.on('SIGTERM', () => {
      if (this.isDirty) {
        this.saveCache();
      }
    });
  }

  /**
   * Segnala per il salvataggio immediato
   */
  markDirty() {
    this.isDirty = true;

    // Salvataggio immediato
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }

    // Salva immediatamente
    this.saveCache();
  }

  /**
   * Verifica se esiste già un JID o LID in cache per evitare duplicati
   */
  isDuplicate(lidKey, jid) {
    // Verifica se esiste già il LID
    if (this.cache.has(lidKey)) {
      return true;
    }

    // Verifica se esiste già il JID
    if (this.jidToLidMap.has(jid)) {
      return true;
    }

    return false;
  }

  /**
   * Ottieni il nome utente usando onWhatsApp
   */
  async getUserName(jid) {
    try {
      const contactDetails = await this.conn?.onWhatsApp(jid);
      if (contactDetails?.[0]?.name) {
        return contactDetails[0].name;
      }

      // Alternativa: prova a ottenere da pushName se disponibile
      const cleanJid = jid.replace('@s.whatsapp.net', '');
      return cleanJid; // Se non c'è nome, usa il numero
    } catch (error) {
      console.error('Errore nell\'ottenimento del nome utente:', error);
      return jid.replace('@s.whatsapp.net', ''); // Alternativa al numero
    }
  }

  /**
   * Risolve LID in JID reale con validazione dei numeri di telefono
   */
  async resolveLid(lidJid, groupChatId, maxRetries = 3) {
    if (!lidJid.endsWith('@lid')) {
      return lidJid.includes('@') ? lidJid : `${lidJid}@s.whatsapp.net`;
    }

    if (!groupChatId?.endsWith('@g.us')) {
      return lidJid;
    }

    const lidKey = lidJid.split('@')[0];

    // NUOVA FUNZIONALITÀ: Verifica se il LID è realmente un numero di telefono
    const phoneDetection = this.phoneValidator.detectPhoneInLid(lidKey);
    if (phoneDetection.isPhone) {
      const countryInfo = this.phoneValidator.getCountryInfo(phoneDetection.phoneNumber);

      // Aggiorna la cache con le informazioni corrette
      const phoneEntry = {
        jid: phoneDetection.jid,
        lid: lidJid,
        name: phoneDetection.phoneNumber,
        timestamp: Date.now(),
        phoneDetected: true,
        country: countryInfo?.country,
        phoneNumber: phoneDetection.phoneNumber
      };

      this.cache.set(lidKey, phoneEntry);
      this.jidToLidMap.set(phoneDetection.jid, lidJid);
      this.markDirty();

      return phoneDetection.jid;
    }

    // Verifica la cache locale per LID
    if (this.cache.has(lidKey)) {
      const entry = this.cache.get(lidKey);
      return entry.jid;
    }

    // Verifica se è già in elaborazione
    if (this.processingQueue.has(lidKey)) {
      return await this.processingQueue.get(lidKey);
    }

    const resolvePromise = (async () => {
      let attempts = 0;
      while (attempts < maxRetries) {
        try {
          const metadata = await this.conn?.groupMetadata(groupChatId);
          if (!metadata?.participants) throw new Error('Non sono stati ottenuti partecipanti');

          for (const participant of metadata.participants) {
            try {
              if (!participant?.jid) continue;

              const contactDetails = await this.conn?.onWhatsApp(participant.jid);
              if (!contactDetails?.[0]?.lid) continue;

              const participantLid = contactDetails[0].lid.split('@')[0];
              if (participantLid === lidKey) {
                // Verifica duplicati prima di salvare
                if (this.isDuplicate(lidKey, participant.jid)) {
                  this.processingQueue.delete(lidKey);
                  return this.cache.get(lidKey)?.jid || participant.jid;
                }

                // Ottieni il nome utente
                const userName = await this.getUserName(participant.jid);

                // Salva nella cache globale
                const cacheEntry = {
                  jid: participant.jid,
                  lid: lidJid,
                  name: userName,
                  timestamp: Date.now()
                };

                this.cache.set(lidKey, cacheEntry);
                this.jidToLidMap.set(participant.jid, lidJid);
                this.markDirty(); // Salvataggio immediato

                // Pulisci la coda di elaborazione
                this.processingQueue.delete(lidKey);

                return participant.jid;
              }
            } catch (e) {
              continue;
            }
          }

          // Non trovato, salva risultato negativo per meno tempo
          const notFoundEntry = {
            jid: lidJid,
            lid: lidJid,
            name: 'Utente non trovato',
            timestamp: Date.now(),
            notFound: true
          };

          this.cache.set(lidKey, notFoundEntry);
          this.markDirty();
          this.processingQueue.delete(lidKey);

          return lidJid;

        } catch (e) {
          if (++attempts >= maxRetries) {
            const errorEntry = {
              jid: lidJid,
              lid: lidJid,
              name: 'Errore nella risoluzione',
              timestamp: Date.now(),
              error: true
            };

            this.cache.set(lidKey, errorEntry);
            this.markDirty();
            this.processingQueue.delete(lidKey);

            console.error(`❌ Errore nella risoluzione del LID ${lidKey}:`, e.message);
            return lidJid;
          }
          await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
        }
      }
      return lidJid;
    })();

    this.processingQueue.set(lidKey, resolvePromise);
    return await resolvePromise;
  }

  /**
   * Cerca LID tramite JID (ricerca inversa)
   */
  findLidByJid(jid) {
    return this.jidToLidMap.get(jid) || null;
  }

  /**
   * Ottieni informazioni complete su un utente tramite LID
   */
  getUserInfo(lidKey) {
    return this.cache.get(lidKey) || null;
  }

  /**
   * Ottieni informazioni complete su un utente tramite JID
   */
  getUserInfoByJid(jid) {
    const lid = this.findLidByJid(jid);
    if (lid) {
      const lidKey = lid.split('@')[0];
      return this.cache.get(lidKey) || null;
    }
    return null;
  }

  /**
   * Analizza e segnala numeri di telefono classificati erroneamente
   */
  analyzePhoneNumbers() {
    const phoneNumbers = [];
    const realLids = [];
    const problematic = [];

    for (const [lidKey, entry] of this.cache.entries()) {
      const phoneDetection = this.phoneValidator.detectPhoneInLid(lidKey);

      if (phoneDetection.isPhone) {
        const countryInfo = this.phoneValidator.getCountryInfo(phoneDetection.phoneNumber);
        phoneNumbers.push({
          lidKey,
          phoneNumber: phoneDetection.phoneNumber,
          correctJid: phoneDetection.jid,
          currentJid: entry.jid,
          country: countryInfo?.country,
          isProblematic: entry.notFound || entry.error || entry.jid.includes('@lid'),
          entry
        });
      } else {
        realLids.push({
          lidKey,
          entry
        });
      }

      // Rileva ulteriori voci problematiche
      if (entry.jid && entry.jid.includes('@lid')) {
        problematic.push({
          lidKey,
          issue: 'JID contiene @lid',
          entry
        });
      }
    }

    return {
      phoneNumbers,
      realLids,
      problematic,
      stats: {
        totalEntries: this.cache.size,
        phoneNumbersDetected: phoneNumbers.length,
        realLids: realLids.length,
        problematicEntries: problematic.length,
        phoneNumbersProblematic: phoneNumbers.filter(p => p.isProblematic).length
      }
    };
  }

  /**
   * Correggi automaticamente numeri di telefono classificati erroneamente
   */
  autoCorrectPhoneNumbers() {
    const analysis = this.analyzePhoneNumbers();
    let correctionCount = 0;

    for (const phoneEntry of analysis.phoneNumbers) {
      if (phoneEntry.isProblematic) {
        // Crea voce corretta
        const correctedEntry = {
          jid: phoneEntry.correctJid,
          lid: `${phoneEntry.lidKey}@lid`,
          name: phoneEntry.phoneNumber,
          timestamp: Date.now(),
          corrected: true,
          country: phoneEntry.country,
          phoneNumber: phoneEntry.phoneNumber,
          originalEntry: phoneEntry.entry
        };

        // Aggiorna la cache
        this.cache.set(phoneEntry.lidKey, correctedEntry);

        // Aggiorna la mappatura inversa
        if (phoneEntry.entry.jid && this.jidToLidMap.has(phoneEntry.entry.jid)) {
          this.jidToLidMap.delete(phoneEntry.entry.jid);
        }
        this.jidToLidMap.set(phoneEntry.correctJid, `${phoneEntry.lidKey}@lid`);

        correctionCount++;
      }
    }

    if (correctionCount > 0) {
      this.markDirty();
    }

    return {
      corrected: correctionCount,
      analysis
    };
  }

  async processObject(obj, groupChatId) {
    if (!obj || typeof obj !== 'object') return obj;

    if (Array.isArray(obj)) {
      const results = [];
      for (const item of obj) {
        results.push(await this.processObject(item, groupChatId));
      }
      return results;
    }

    const processed = {};
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string' && value.endsWith('@lid') && groupChatId) {
        processed[key] = await this.resolveLid(value, groupChatId);
      } else if (typeof value === 'object' && value !== null) {
        processed[key] = await this.processObject(value, groupChatId);
      } else {
        processed[key] = value;
      }
    }
    return processed;
  }

  async processMessage(message) {
    try {
      if (!message || !message.key) return message;

      const groupChatId = message.key.remoteJid?.endsWith('@g.us') ? message.key.remoteJid : null;
      if (!groupChatId) return message;

      const processedMessage = JSON.parse(JSON.stringify(message));

      if (processedMessage.key?.participant?.endsWith('@lid')) {
        processedMessage.key.participant = await this.resolveLid(
          processedMessage.key.participant, 
          groupChatId
        );
      }

      if (processedMessage.participant?.endsWith('@lid')) {
        processedMessage.participant = await this.resolveLid(
          processedMessage.participant, 
          groupChatId
        );
      }

      if (processedMessage.message) {
        const messageTypes = Object.keys(processedMessage.message);
        for (const msgType of messageTypes) {
          const msgContent = processedMessage.message[msgType];
          if (msgContent?.contextInfo?.mentionedJid) {
            const resolvedMentions = [];
            for (const jid of msgContent.contextInfo.mentionedJid) {
              if (typeof jid === 'string' && jid.endsWith('@lid')) {
                resolvedMentions.push(await this.resolveLid(jid, groupChatId));
              } else {
                resolvedMentions.push(jid);
              }
            }
            msgContent.contextInfo.mentionedJid = resolvedMentions;
          }

          if (msgContent?.contextInfo?.quotedMessage) {
            if (msgContent.contextInfo.participant?.endsWith('@lid')) {
              msgContent.contextInfo.participant = await this.resolveLid(
                msgContent.contextInfo.participant, 
                groupChatId
              );
            }
          }
        }
      }

      return processedMessage;
    } catch (error) {
      console.error('Errore nell\'elaborazione del messaggio per risolvere LID:', error);
      return message;
    }
  }

  /**
   * Mantiene la compatibilità con l'interfaccia precedente
   * Simula una Map per accesso esterno
   */
  get lidCache() {
    return {
      size: this.cache.size,
      has: (key) => {
        // Supporto per vecchia chiave (lidJid_groupChatId) e nuova (lidKey)
        const lidKey = key.includes('_') ? key.split('_')[0].replace('@lid', '') : key.replace('@lid', '');
        return this.cache.has(lidKey);
      },
      get: (key) => {
        // Supporto per vecchia chiave (lidJid_groupChatId) e nuova (lidKey)
        const lidKey = key.includes('_') ? key.split('_')[0].replace('@lid', '') : key.replace('@lid', '');
        const entry = this.cache.get(lidKey);
        return entry ? entry.jid : undefined;
      },
      set: (key, value) => {
        // Supporto per chiave vecchia
        const lidKey = key.includes('_') ? key.split('_')[0].replace('@lid', '') : key.replace('@lid', '');

        if (typeof value === 'string') {
          // Verifica duplicati prima di aggiungere
          const existingLid = this.findLidByJid(value);

          if (existingLid) {
            return; // Non aggiungere duplicato
          }

          if (this.cache.has(lidKey)) {
            return; // Non aggiungere duplicato
          }

          // Se viene passato solo il JID, crea voce completa
          this.cache.set(lidKey, {
            jid: value,
            lid: `${lidKey}@lid`,
            name: 'Nome in attesa',
            timestamp: Date.now()
          });
          this.jidToLidMap.set(value, `${lidKey}@lid`);
        } else {
          // Verifica duplicati per oggetti completi

          if (value.jid) {
            const existingLid = this.findLidByJid(value.jid);
            if (existingLid && existingLid !== value.lid) {
              return; // Non aggiungere duplicato
            }
          }

          if (this.cache.has(lidKey)) {
            const existing = this.cache.get(lidKey);
            if (existing.jid !== value.jid) {
              return; // Non aggiungere duplicato
            }
          }

          this.cache.set(lidKey, value);
          if (value.jid) {
            this.jidToLidMap.set(value.jid, value.lid);
          }
        }
        this.markDirty();
      },
      delete: (key) => {
        const lidKey = key.includes('_') ? key.split('_')[0].replace('@lid', '') : key.replace('@lid', '');
        const entry = this.cache.get(lidKey);
        if (entry && entry.jid && this.jidToLidMap.has(entry.jid)) {
          this.jidToLidMap.delete(entry.jid);
        }
        const result = this.cache.delete(lidKey);
        if (result) this.markDirty();
        return result;
      },
      clear: () => {
        this.cache.clear();
        this.jidToLidMap.clear();
        this.markDirty();
      },
      entries: () => {
        const entries = [];
        for (const [key, entry] of this.cache.entries()) {
          entries.push([`${key}@lid`, entry.jid]);
        }
        return entries;
      },
      forEach: (callback) => {
        for (const [key, entry] of this.cache.entries()) {
          callback(entry.jid, `${key}@lid`, this);
        }
      }
    };
  }

  /**
   * Ottieni statistiche dalla cache con informazioni sui numeri di telefono
   */
  getStats() {
    let notFound = 0;
    let errors = 0;
    let valid = 0;
    let phoneNumbers = 0;
    let corrected = 0;

    for (const [key, entry] of this.cache.entries()) {
      if (entry.phoneDetected || entry.corrected) {
        phoneNumbers++;
      }
      if (entry.corrected) {
        corrected++;
      }
      if (entry.notFound) {
        notFound++;
      } else if (entry.error) {
        errors++;
      } else {
        valid++;
      }
    }

    return {
      total: this.cache.size,
      valid,
      notFound,
      errors,
      phoneNumbers,
      corrected,
      processing: this.processingQueue.size,
      cacheFile: this.cacheFile,
      fileExists: fs.existsSync(this.cacheFile),
      isDirty: this.isDirty,
      jidMappings: this.jidToLidMap.size
    };
  }

  /**
   * Elenca tutti gli utenti in cache con informazioni aggiuntive
   */
  getAllUsers() {
    const users = [];
    for (const [lidKey, entry] of this.cache.entries()) {
      if (!entry.notFound && !entry.error) {
        users.push({
          lid: entry.lid,
          jid: entry.jid,
          name: entry.name,
          country: entry.country,
          phoneNumber: entry.phoneNumber,
          isPhoneDetected: entry.phoneDetected || entry.corrected,
          timestamp: new Date(entry.timestamp).toLocaleString()
        });
      }
    }
    return users.sort((a, b) => a.name.localeCompare(b.name));
  }

  /**
   * Ottieni utenti per paese
   */
  getUsersByCountry() {
    const countries = {};

    for (const [lidKey, entry] of this.cache.entries()) {
      if (!entry.notFound && !entry.error && entry.country) {
        if (!countries[entry.country]) {
          countries[entry.country] = [];
        }

        countries[entry.country].push({
          lid: entry.lid,
          jid: entry.jid,
          name: entry.name,
          phoneNumber: entry.phoneNumber
        });
      }
    }

    // Ordina gli utenti all'interno di ogni paese
    for (const country of Object.keys(countries)) {
      countries[country].sort((a, b) => a.name.localeCompare(b.name));
    }

    return countries;
  }

  /**
   * Forza il salvataggio immediato
   */
  forceSave() {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
      this.saveTimeout = null;
    }
    this.saveCache();
  }
}

export default LidResolver;
