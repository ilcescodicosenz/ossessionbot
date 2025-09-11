
/**
 * Modulo di validazione per numeri di telefono di WhatsApp
 * Rileva se un LID è realmente un numero di telefono valido
 */
class PhoneValidator {
  constructor() {
    // Pattern dei numeri di telefono per paese/regione più comuni
    this.phonePatterns = {
      // Messico (52)
      mexico: /^52(1)?\d{10}$/,
      // Argentina (54)
      argentina: /^54(9)?\d{8,10}$/,
      // Colombia (57)
      colombia: /^57\d{7,10}$/,
      // Cile (56)
      chile: /^56\d{8,9}$/,
      // Perù (51)
      peru: /^51\d{8,9}$/,
      // Venezuela (58)
      venezuela: /^58\d{7,10}$/,
      // Ecuador (593)
      ecuador: /^593\d{8,9}$/,
      // Uruguay (598)
      uruguay: /^598\d{7,8}$/,
      // Paraguay (595)
      paraguay: /^595\d{7,9}$/,
      // Bolivia (591)
      bolivia: /^591\d{7,8}$/,
      // Brasile (55)
      brasil: /^55\d{10,11}$/,
      // Stati Uniti/Canada (1)
      northamerica: /^1\d{10}$/,
      // Spagna (34)
      spain: /^34\d{9}$/,
      // Regno Unito (44)
      uk: /^44\d{10,11}$/,
      // Francia (33)
      france: /^33\d{9,10}$/,
      // Germania (49)
      germany: /^49\d{10,12}$/,
      // Italia (39)
      italy: /^39\d{9,11}$/,
      // Paesi Bassi (31)
      netherlands: /^31\d{8,9}$/,
      // India (91)
      india: /^91\d{10}$/,
      // Pakistan (92)
      pakistan: /^92\d{9,10}$/,
      // Cina (86)
      china: /^86\d{11}$/,
      // Giappone (81)
      japan: /^81\d{9,11}$/,
      // Corea del Sud (82)
      southkorea: /^82\d{9,10}$/,
      // Australia (61)
      australia: /^61\d{9}$/,
      // Sudafrica (27)
      southafrica: /^27\d{9}$/,
      // Egitto (20)
      egypt: /^20\d{9,10}$/,
      // Nigeria (234)
      nigeria: /^234\d{7,10}$/,
      // Kenya (254)
      kenya: /^254\d{9}$/,
      // Marocco (212)
      morocco: /^212\d{9}$/,
      // Tunisia (216)
      tunisia: /^216\d{8}$/,
      // Algeria (213)
      algeria: /^213\d{8,9}$/,
      // Turchia (90)
      turkey: /^90\d{10}$/,
      // Russia (7)
      russia: /^7\d{10}$/,
      // Ucraina (380)
      ukraine: /^380\d{9}$/,
      // Polonia (48)
      poland: /^48\d{9}$/,
      // Repubblica Ceca (420)
      czech: /^420\d{9}$/,
      // Ungheria (36)
      hungary: /^36\d{8,9}$/,
      // Romania (40)
      romania: /^40\d{9}$/,
      // Grecia (30)
      greece: /^30\d{10}$/,
      // Portogallo (351)
      portugal: /^351\d{9}$/,
      // Svezia (46)
      sweden: /^46\d{8,9}$/,
      // Norvegia (47)
      norway: /^47\d{8}$/,
      // Danimarca (45)
      denmark: /^45\d{8}$/,
      // Finlandia (358)
      finland: /^358\d{8,9}$/,
      // Belgio (32)
      belgium: /^32\d{8,9}$/,
      // Svizzera (41)
      switzerland: /^41\d{9}$/,
      // Austria (43)
      austria: /^43\d{10,11}$/,
      // Israele (972)
      israel: /^972\d{8,9}$/,
      // Emirati Arabi Uniti (971)
      uae: /^971\d{8,9}$/,
      // Arabia Saudita (966)
      saudiarabia: /^966\d{8,9}$/,
      // Tailandia (66)
      thailand: /^66\d{8,9}$/,
      // Vietnam (84)
      vietnam: /^84\d{9,10}$/,
      // Malesia (60)
      malaysia: /^60\d{8,10}$/,
      // Singapore (65)
      singapore: /^65\d{8}$/,
      // Filippine (63)
      philippines: /^63\d{9,10}$/,
      // Indonesia (62)
      indonesia: /^62\d{8,12}$/
    };

    // Prefissi internazionali più comuni (per una validazione aggiuntiva)
    this.countryCodes = [
      '1', '7', '20', '27', '30', '31', '32', '33', '34', '36', '39', '40', '41', '43', '44', '45', '46', '47', '48', '49',
      '51', '52', '53', '54', '55', '56', '57', '58', '60', '61', '62', '63', '64', '65', '66', '81', '82', '84', '86',
      '90', '91', '92', '93', '94', '95', '98', '212', '213', '216', '218', '220', '221', '222', '223', '224', '225',
      '226', '227', '228', '229', '230', '231', '232', '233', '234', '235', '236', '237', '238', '239', '240', '241',
      '242', '243', '244', '245', '246', '247', '248', '249', '250', '251', '252', '253', '254', '255', '256', '257',
      '258', '260', '261', '262', '263', '264', '265', '266', '267', '268', '269', '290', '291', '297', '298', '299',
      '350', '351', '352', '353', '354', '355', '356', '357', '358', '359', '370', '371', '372', '373', '374', '375',
      '376', '377', '378', '380', '381', '382', '383', '385', '386', '387', '389', '420', '421', '423', '500', '501',
      '502', '503', '504', '505', '506', '507', '508', '509', '590', '591', '592', '593', '594', '595', '596', '597',
      '598', '599', '670', '672', '673', '674', '675', '676', '677', '678', '679', '680', '681', '682', '683', '684',
      '685', '686', '687', '688', '689', '690', '691', '692', '850', '852', '853', '855', '856', '880', '882', '883',
      '886', '888', '960', '961', '962', '963', '964', '965', '966', '967', '968', '970', '971', '972', '973', '974',
      '975', '976', '977', '992', '993', '994', '995', '996', '998'
    ];
  }

  /**
   * Valida se una stringa è un numero di telefono valido
   * @param {string} phoneNumber - Il numero da validare
   * @returns {boolean} - True se è un numero valido
   */
  isValidPhoneNumber(phoneNumber) {
    if (!phoneNumber || typeof phoneNumber !== 'string') {
      return false;
    }

    // Pulisce il numero da spazi, trattini, ecc.
    const cleanNumber = phoneNumber.replace(/[\s\-\(\)\+]/g, '');

    // Deve contenere solo cifre
    if (!/^\d+$/.test(cleanNumber)) {
      return false;
    }

    // Lunghezza minima e massima ragionevole
    if (cleanNumber.length < 7 || cleanNumber.length > 15) {
      return false;
    }

    // Verifica rispetto ai pattern specifici
    for (const pattern of Object.values(this.phonePatterns)) {
      if (pattern.test(cleanNumber)) {
        return true;
      }
    }

    // Verifica aggiuntiva: deve iniziare con un prefisso internazionale valido
    return this.hasValidCountryCode(cleanNumber);
  }

  /**
   * Verifica se il numero ha un prefisso internazionale valido
   * @param {string} phoneNumber - Numero pulito
   * @returns {boolean}
   */
  hasValidCountryCode(phoneNumber) {
    for (const code of this.countryCodes) {
      if (phoneNumber.startsWith(code)) {
        // Verifica che dopo il prefisso internazionale ci siano abbastanza cifre
        const remainingDigits = phoneNumber.slice(code.length);
        if (remainingDigits.length >= 6 && remainingDigits.length <= 12) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Converte un numero di telefono in formato JID di WhatsApp
   * @param {string} phoneNumber - Il numero di telefono
   * @returns {string} - JID formattato
   */
  toWhatsAppJID(phoneNumber) {
    if (!this.isValidPhoneNumber(phoneNumber)) {
      return null;
    }

    const cleanNumber = phoneNumber.replace(/[\s\-\(\)\+]/g, '');
    return `${cleanNumber}@s.whatsapp.net`;
  }

  /**
   * Rileva se un LID è realmente un numero di telefono
   * @param {string} lidString - Stringa che potrebbe essere un LID o un numero
   * @returns {object} - {isPhone: boolean, jid: string|null, originalLid: string}
   */
  detectPhoneInLid(lidString) {
    if (!lidString || typeof lidString !== 'string') {
      return { isPhone: false, jid: null, originalLid: lidString };
    }

    // Rimuove @lid se presente
    const cleanLid = lidString.replace('@lid', '');

    // Verifica se è un numero di telefono valido
    if (this.isValidPhoneNumber(cleanLid)) {
      return {
        isPhone: true,
        jid: this.toWhatsAppJID(cleanLid),
        originalLid: lidString,
        phoneNumber: cleanLid
      };
    }

    return { isPhone: false, jid: null, originalLid: lidString };
  }

  /**
   * Ottiene informazioni sul paese in base al numero
   * @param {string} phoneNumber - Numero di telefono
   * @returns {object|null} - Informazioni sul paese
   */
  getCountryInfo(phoneNumber) {
    const cleanNumber = phoneNumber.replace(/[\s\-\(\)\+@lid]/g, '');

    const countryMap = {
      '52': { country: 'Messico', code: 'MX', pattern: this.phonePatterns.mexico },
      '54': { country: 'Argentina', code: 'AR', pattern: this.phonePatterns.argentina },
      '57': { country: 'Colombia', code: 'CO', pattern: this.phonePatterns.colombia },
      '56': { country: 'Cile', code: 'CL', pattern: this.phonePatterns.chile },
      '51': { country: 'Perù', code: 'PE', pattern: this.phonePatterns.peru },
      '58': { country: 'Venezuela', code: 'VE', pattern: this.phonePatterns.venezuela },
      '593': { country: 'Ecuador', code: 'EC', pattern: this.phonePatterns.ecuador },
      '598': { country: 'Uruguay', code: 'UY', pattern: this.phonePatterns.uruguay },
      '595': { country: 'Paraguay', code: 'PY', pattern: this.phonePatterns.paraguay },
      '591': { country: 'Bolivia', code: 'BO', pattern: this.phonePatterns.bolivia },
      '55': { country: 'Brasile', code: 'BR', pattern: this.phonePatterns.brasil },
      '1': { country: 'Stati Uniti/Canada', code: 'US/CA', pattern: this.phonePatterns.northamerica },
      '34': { country: 'Spagna', code: 'ES', pattern: this.phonePatterns.spain },
      '33': { country: 'Francia', code: 'FR', pattern: this.phonePatterns.france },
      '49': { country: 'Germania', code: 'DE', pattern: this.phonePatterns.germany },
      '44': { country: 'Regno Unito', code: 'GB', pattern: this.phonePatterns.uk },
      '91': { country: 'India', code: 'IN', pattern: this.phonePatterns.india },
      '92': { country: 'Pakistan', code: 'PK', pattern: this.phonePatterns.pakistan }
    };

    // Cerca il prefisso internazionale più lungo che corrisponde
    let bestMatch = null;
    let longestMatch = 0;

    for (const [code, info] of Object.entries(countryMap)) {
      if (cleanNumber.startsWith(code) && code.length > longestMatch) {
        if (info.pattern.test(cleanNumber)) {
          bestMatch = info;
          longestMatch = code.length;
        }
      }
    }

    return bestMatch;
  }

  /**
   * Pulisce e corregge un numero di telefono
   * @param {string} phoneNumber - Numero originale
   * @returns {string} - Numero pulito
   */
  cleanPhoneNumber(phoneNumber) {
    if (!phoneNumber) return phoneNumber;

    return phoneNumber
      .replace(/[\s\-\(\)\+]/g, '') // Rimuove spazi, trattini, parentesi, +
      .replace(/^00/, '') // Rimuove 00 all'inizio (prefisso internazionale)
      .replace(/^0+/, ''); // Rimuove zeri all'inizio
  }

  /**
   * Valida un elenco di numeri e restituisce le statistiche
   * @param {Array} phoneNumbers - Array di numeri da validare
   * @returns {object} - Statistiche della validazione
   */
  validateBatch(phoneNumbers) {
    const results = {
      valid: [],
      invalid: [],
      phoneDetected: [],
      stats: {
        total: phoneNumbers.length,
        validCount: 0,
        invalidCount: 0,
        phoneDetectedCount: 0
      }
    };

    for (const phone of phoneNumbers) {
      const detection = this.detectPhoneInLid(phone);

      if (detection.isPhone) {
        results.phoneDetected.push({
          original: phone,
          jid: detection.jid,
          phoneNumber: detection.phoneNumber,
          country: this.getCountryInfo(detection.phoneNumber)
        });
        results.stats.phoneDetectedCount++;
      } else if (this.isValidPhoneNumber(phone)) {
        results.valid.push(phone);
        results.stats.validCount++;
      } else {
        results.invalid.push(phone);
        results.stats.invalidCount++;
      }
    }

    return results;
  }
}

export default PhoneValidator;

