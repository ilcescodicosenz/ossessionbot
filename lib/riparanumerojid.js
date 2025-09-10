#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import PhoneValidator from './PhoneValidator.js';

/**
 * Script per analizzare e correggere i numeri di telefono nel file lidsresolve.json
 */
class PhoneAnalyzer {
  constructor() {
    this.phoneValidator = new PhoneValidator();
    this.cacheFile = path.join(process.cwd(), 'lidsresolve.json');
    this.backupFile = path.join(process.cwd(), 'lidsresolve.backup.json');
  }

  /**
   * Carica i dati dal file JSON
   */
  loadData() {
    try {
      if (!fs.existsSync(this.cacheFile)) {
        console.error(`❌ File non trovato: ${this.cacheFile}`);
        return null;
      }

      const data = fs.readFileSync(this.cacheFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('❌ Errore durante il caricamento dei dati:', error.message);
      return null;
    }
  }

  /**
   * Salva i dati nel file JSON
   */
  saveData(data) {
    try {
      fs.writeFileSync(this.cacheFile, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
      console.error('❌ Errore durante il salvataggio dei dati:', error.message);
    }
  }

  /**
   * Crea un backup del file originale
   */
  createBackup(data) {
    try {
      fs.writeFileSync(this.backupFile, JSON.stringify(data, null, 2), 'utf8');
    } catch (error)
      {
      console.error('❌ Errore durante la creazione del backup:', error.message);
    }
  }

  /**
   * Analizza tutte le voci nel file
   */
  analyzeEntries(data) {
    const analysis = {
      phoneNumbers: [],
      realLids: [],
      problematic: [],
      correctable: []
    };

    for (const [lidKey, entry] of Object.entries(data)) {
      const phoneDetection = this.phoneValidator.detectPhoneInLid(lidKey);

      if (phoneDetection.isPhone) {
        const countryInfo = this.phoneValidator.getCountryInfo(phoneDetection.phoneNumber);
        const isProblematic = entry.notFound || entry.error || entry.jid.includes('@lid');

        const phoneEntry = {
          lidKey,
          phoneNumber: phoneDetection.phoneNumber,
          correctJid: phoneDetection.jid,
          currentJid: entry.jid,
          country: countryInfo?.country || 'Sconosciuto',
          countryCode: countryInfo?.code,
          isProblematic,
          entry
        };

        analysis.phoneNumbers.push(phoneEntry);

        if (isProblematic) {
          analysis.correctable.push(phoneEntry);
        }
      } else {
        analysis.realLids.push({
          lidKey,
          entry
        });
      }

      // Rileva altri problemi
      if (entry.jid && entry.jid.includes('@lid')) {
        analysis.problematic.push({
          lidKey,
          issue: 'Il JID contiene @lid',
          entry
        });
      }
    }

    return analysis;
  }

  /**
   * Genera un report dettagliato (solo in modalità verbose)
   */
  generateReport(analysis, verbose = false) {
    if (!verbose) return;

    console.log('\n📊 === REPORT DI ANALISI ===\n');

    console.log(`Totale voci: ${analysis.phoneNumbers.length + analysis.realLids.length}`);
    console.log(`📞 Numeri di telefono rilevati: ${analysis.phoneNumbers.length}`);
    console.log(`🔗 LID reali: ${analysis.realLids.length}`);
    console.log(`⚠️  Voci problematiche: ${analysis.problematic.length}`);
    console.log(`🔧 Voci correggibili: ${analysis.correctable.length}`);

    if (analysis.phoneNumbers.length > 0) {
      console.log('\n📍 === NUMERI PER PAESE ===');
      const countries = {};

      for (const phone of analysis.phoneNumbers) {
        if (!countries[phone.country]) {
          countries[phone.country] = { total: 0, problematic: 0 };
        }
        countries[phone.country].total++;
        if (phone.isProblematic) {
          countries[phone.country].problematic++;
        }
      }

      for (const [country, stats] of Object.entries(countries)) {
        console.log(`  ${country}: ${stats.total} numeri (${stats.problematic} problematici)`);
      }
    }

    if (analysis.correctable.length > 0) {
      console.log('\n🔧 === VOCI CORREGGIBILI ===');
      for (const correctable of analysis.correctable.slice(0, 10)) { // Mostra solo le prime 10
        console.log(`  ${correctable.lidKey} (${correctable.country})`);
        console.log(`    Attuale: ${correctable.currentJid}`);
        console.log(`    Corretto: ${correctable.correctJid}`);
      }

      if (analysis.correctable.length > 10) {
        console.log(`  ... e altri ${analysis.correctable.length - 10}`);
      }
    }
  }

  /**
   * Applica correzioni automatiche
   */
  applyCorrections(data, analysis) {
    if (analysis.correctable.length === 0) {
      return data;
    }

    const correctedData = { ...data };

    for (const correction of analysis.correctable) {
      const { lidKey, correctJid, phoneNumber, country } = correction;

      correctedData[lidKey] = {
        jid: correctJid,
        lid: `${lidKey}@lid`,
        name: phoneNumber,
        timestamp: Date.now(),
        corrected: true,
        country: country,
        phoneNumber: phoneNumber,
        originalEntry: correction.entry
      };
    }

    return correctedData;
  }

  /**
   * Esegui analisi completa
   */
  run(options = {}) {
    // Carica i dati
    const data = this.loadData();
    if (!data) return;

    // Crea un backup se si devono applicare correzioni
    if (options.fix) {
      this.createBackup(data);
    }

    // Analizza le voci
    const analysis = this.analyzeEntries(data);

    // Genera il report solo se in modalità verbose
    this.generateReport(analysis, options.verbose);

    // Applica le correzioni se richiesto
    if (options.fix) {
      const correctedData = this.applyCorrections(data, analysis);
      this.saveData(correctedData);

      // Mostra il risultato solo se non è in modalità silenziosa (silent)
      if (options.verbose) {
        console.log(`\n✅ Sono state applicate ${analysis.correctable.length} correzioni`);
      }
    } else if (analysis.correctable.length > 0 && options.verbose) {
      console.log(`\n💡 Per applicare le correzioni, esegui con il flag --fix:`);
      console.log(`   node analyze-phones.js --fix`);
    }

    return analysis;
  }
}

// Esegui se chiamato direttamente
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const options = {
    fix: args.includes('--fix') || args.includes('-f'),
    silent: args.includes('--silent') || args.includes('-s')
  };

  if (!options.silent) {
    console.log('📱 === ANALIZZATORE DI NUMERI DI TELEFONO ===');
  }

  const analyzer = new PhoneAnalyzer();
  analyzer.run(options);
}

export default PhoneAnalyzer;
