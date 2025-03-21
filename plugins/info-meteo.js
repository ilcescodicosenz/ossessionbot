import axios from 'axios';

let handler = async (msg, { args }) => {
  // Controlla se l'utente ha fornito il nome della città
  if (!args[0]) {
    throw '⚠️ *Inserisci il nome di una città o di un paese per ottenere le condizioni meteo.*';
  }

  try {
    // Effettua una richiesta all'API di OpenWeatherMap
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${args[0]}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273`
    );

    const data = response.data;
    const {
      name: cityName,
      sys: { country },
      weather,
      main: { temp, temp_min, temp_max, humidity },
      wind: { speed: windSpeed }
    } = data;

    const weatherDescription = weather[0].description;

    // Formatta il messaggio di risposta
    const replyMessage = `⬣━❰🌍*Informazioni Meteo*🌍❱━⬣

📍 *Città*: ${cityName}  
🗺️ *Nazione*: ${country}  

🌤️ *Condizioni Meteo*:  
   ${weatherDescription}  

🌡️ *Temperatura*:  
   - Attuale: ${temp}°C  
   - Minima: ${temp_min}°C  
   - Massima: ${temp_max}°C  

💦 *Umidità*: ${humidity}%  
🌬️ *Vento*: ${windSpeed} km/h  

⬣━━━━━━━━━❰🌦️❱━━━━━━━━━⬣`;

    // Invia la risposta all'utente
    msg.reply(replyMessage);

  } catch (error) {
    // Gestione degli errori
    msg.reply(
      '⚠️ *Errore: non è stato possibile trovare risultati per la città o il paese specificati. Assicurati che esistano e riprova.*'
    );
  }
};

// Configura il comando per il bot
handler.command = ['meteo', 'clima'];
handler.help = ['meteo <città/paese>'];
handler.tags = ['info'];

export default handler;
