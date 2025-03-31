const entertainment = [
  // FILM
  {
    title: "Inception",
    description: "Un film di fantascienza diretto da Christopher Nolan che esplora il mondo dei sogni.",
    genre: "Fantascienza/Thriller",
    type: "Film",
    year: 2010,
    imdb: "https://www.imdb.com/title/tt1375666/",
    cover: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxOV5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg"
  },
  {
    title: "Il Padrino",
    description: "La storia della famiglia mafiosa Corleone, un classico assoluto del cinema.",
    genre: "Crimine/Drama",
    type: "Film",
    year: 1972,
    imdb: "https://www.imdb.com/title/tt0068646/",
    cover: "https://m.media-amazon.com/images/I/41+eK8zBwQL._AC_.jpg"
  },
  {
    title: "Interstellar",
    description: "Un'epica avventura spaziale diretta da Christopher Nolan.",
    genre: "Fantascienza/Drama",
    type: "Film",
    year: 2014,
    imdb: "https://www.imdb.com/title/tt0816692/",
    cover: "https://m.media-amazon.com/images/I/91kFYg4fX3L._SL1500_.jpg"
  },
  {
    title: "Avengers: Endgame",
    description: "La conclusione epica della saga degli Avengers con una battaglia finale indimenticabile.",
    genre: "Azione/Fantascienza",
    type: "Film",
    year: 2019,
    imdb: "https://www.imdb.com/title/tt4154796/",
    cover: "https://m.media-amazon.com/images/I/81ExhpBEbHL._SL1500_.jpg"
  },
  {
    title: "Joker",
    description: "Un viaggio nella psiche del celebre villain di Batman, interpretato da Joaquin Phoenix.",
    genre: "Thriller/Drama",
    type: "Film",
    year: 2019,
    imdb: "https://www.imdb.com/title/tt7286456/",
    cover: "https://m.media-amazon.com/images/I/71Q9dNx2f+L._AC_SL1000_.jpg"
  },
  {
    title: "Spider-Man: No Way Home",
    description: "Spider-Man affronta il multiverso in una delle avventure più spettacolari della saga.",
    genre: "Azione/Fantascienza",
    type: "Film",
    year: 2021,
    imdb: "https://www.imdb.com/title/tt10872600/",
    cover: "https://m.media-amazon.com/images/M/MV5BY2U2OTczMjAtOGYxMC00ZjFlLTk2MWQtZDRjMWNkMTk4MjM5XkEyXkFqcGdeQXVyMTA3ODEwNTk@._V1_.jpg"
  },
  {
    title: "Fast & Furious 9",
    description: "L'ultimo capitolo della saga con corse sfrenate e azione spettacolare.",
    genre: "Azione/Avventura",
    type: "Film",
    year: 2021,
    imdb: "https://www.imdb.com/title/tt5433138/",
    cover: "https://m.media-amazon.com/images/M/MV5BMGU2MjhhNmYtMTRhZS00ZmU4LWJlYWYtNjBkMzM5N2I4N2JhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg"
  },
  {
    title: "Deadpool",
    description: "Un eroe fuori dagli schemi con tanto sarcasmo e azione esplosiva.",
    genre: "Azione/Commedia",
    type: "Film",
    year: 2016,
    imdb: "https://www.imdb.com/title/tt1431045/",
    cover: "https://m.media-amazon.com/images/I/51kT3xv2QeL._AC_.jpg"
  },
  {
    title: "The Shawshank Redemption",
    description: "La storia di speranza e amicizia in un carcere che ha ispirato milioni.",
    genre: "Drama",
    type: "Film",
    year: 1994,
    imdb: "https://www.imdb.com/title/tt0111161/",
    cover: "https://m.media-amazon.com/images/I/519NBNHX5BL._AC_.jpg"
  },
  {
    title: "The Dark Knight",
    description: "Batman combatte il Joker in un'epica lotta per salvare Gotham City.",
    genre: "Azione/Crimine",
    type: "Film",
    year: 2008,
    imdb: "https://www.imdb.com/title/tt0468569/",
    cover: "https://m.media-amazon.com/images/I/71pV+qT1mOL._AC_SL1188_.jpg"
  },
  {
    title: "Pulp Fiction",
    description: "Storie intrecciate di criminalità e redenzione in un film iconico di Quentin Tarantino.",
    genre: "Crimine/Drama",
    type: "Film",
    year: 1994,
    imdb: "https://www.imdb.com/title/tt0110912/",
    cover: "https://m.media-amazon.com/images/I/51oDsLrTRRL._AC_.jpg"
  },
  {
    title: "Fight Club",
    description: "Una critica alla società consumistica con una svolta psicologica inaspettata.",
    genre: "Drama/Thriller",
    type: "Film",
    year: 1999,
    imdb: "https://www.imdb.com/title/tt0137523/",
    cover: "https://m.media-amazon.com/images/I/81D+KJkO7FL._AC_SL1500_.jpg"
  },
  {
    title: "Forrest Gump",
    description: "La storia di un uomo semplice che ha vissuto eventi storici straordinari.",
    genre: "Drama/Commedia",
    type: "Film",
    year: 1994,
    imdb: "https://www.imdb.com/title/tt0109830/",
    cover: "https://m.media-amazon.com/images/I/61+chpT9GjL._AC_SL1024_.jpg"
  },
  {
    title: "The Matrix",
    description: "Un hacker scopre la verità dietro un mondo simulato in questo film rivoluzionario.",
    genre: "Fantascienza/Azione",
    type: "Film",
    year: 1999,
    imdb: "https://www.imdb.com/title/tt0133093/",
    cover: "https://m.media-amazon.com/images/I/51EG732BV3L.jpg"
  },
  {
    title: "Goodfellas",
    description: "Un'immersione profonda nel mondo della mafia italo-americana.",
    genre: "Crimine/Drama",
    type: "Film",
    year: 1990,
    imdb: "https://www.imdb.com/title/tt0099685/",
    cover: "https://m.media-amazon.com/images/I/51MCMR2hmzL._AC_.jpg"
  },
  {
    title: "Schindler's List",
    description: "Una storia toccante sull'Olocausto e il potere della redenzione.",
    genre: "Biografico/Drama",
    type: "Film",
    year: 1993,
    imdb: "https://www.imdb.com/title/tt0108052/",
    cover: "https://m.media-amazon.com/images/I/51sBr4IWDwL._AC_.jpg"
  },
  {
    title: "Se7en",
    description: "Due detective seguono un serial killer ispirato ai sette peccati capitali.",
    genre: "Thriller/Crimine",
    type: "Film",
    year: 1995,
    imdb: "https://www.imdb.com/title/tt0114369/",
    cover: "https://m.media-amazon.com/images/I/81A-mvlo+QL._AC_SL1500_.jpg"
  },
  {
    title: "Saving Private Ryan",
    description: "Una missione disperata durante la Seconda Guerra Mondiale per salvare un soldato.",
    genre: "Guerra/Drama",
    type: "Film",
    year: 1998,
    imdb: "https://www.imdb.com/title/tt0120815/",
    cover: "https://m.media-amazon.com/images/I/51rGG3sdfSL._AC_.jpg"
  },
  {
    title: "Gladiator",
    description: "Un generale romano diventa gladiatore per vendicare la sua famiglia e onorare il suo orgoglio.",
    genre: "Azione/Drama",
    type: "Film",
    year: 2000,
    imdb: "https://www.imdb.com/title/tt0172495/",
    cover: "https://m.media-amazon.com/images/I/51A4JbUXpsL._AC_.jpg"
  },
  {
    title: "Titanic",
    description: "Una storia d'amore epica ambientata durante il tragico naufragio del Titanic.",
    genre: "Romantico/Drama",
    type: "Film",
    year: 1997,
    imdb: "https://www.imdb.com/title/tt0120338/",
    cover: "https://m.media-amazon.com/images/I/41fT3XoZf4L._AC_.jpg"
  },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    description: "L'inizio dell'epica avventura nella Terra di Mezzo contro il male.",
    genre: "Fantasy/Avventura",
    type: "Film",
    year: 2001,
    imdb: "https://www.imdb.com/title/tt0120737/",
    cover: "https://m.media-amazon.com/images/I/51Qvs9i5a%2BL._AC_.jpg"
  },
  {
    title: "Star Wars: Episode IV - A New Hope",
    description: "Il film che ha dato inizio alla saga epica di Star Wars.",
    genre: "Fantascienza/Avventura",
    type: "Film",
    year: 1977,
    imdb: "https://www.imdb.com/title/tt0076759/",
    cover: "https://m.media-amazon.com/images/I/81aA7hEEykL._AC_SL1500_.jpg"
  },
  {
    title: "The Godfather: Part II",
    description: "Il seguito del classico che approfondisce le radici della famiglia Corleone.",
    genre: "Crimine/Drama",
    type: "Film",
    year: 1974,
    imdb: "https://www.imdb.com/title/tt0071562/",
    cover: "https://m.media-amazon.com/images/I/51xWs2m6ojL._AC_.jpg"
  },
  {
    title: "Jurassic Park",
    description: "Un parco a tema rivoluzionario popolato da dinosauri clonati prende vita in maniera inaspettata.",
    genre: "Avventura/Fantascienza",
    type: "Film",
    year: 1993,
    imdb: "https://www.imdb.com/title/tt0107290/",
    cover: "https://m.media-amazon.com/images/I/51zUbui+gbL._AC_.jpg"
  },
  {
    title: "Back to the Future",
    description: "Un adolescente viaggia indietro nel tempo grazie a una macchina del tempo costruita in maniera stravagante.",
    genre: "Fantascienza/Commedia",
    type: "Film",
    year: 1985,
    imdb: "https://www.imdb.com/title/tt0088763/",
    cover: "https://m.media-amazon.com/images/I/51v5ZpFyaFL._AC_.jpg"
  },
  {
    title: "The Lion King",
    description: "Un classico Disney che racconta la storia di un giovane leone destinato a diventare re.",
    genre: "Animazione/Aventura",
    type: "Film",
    year: 1994,
    imdb: "https://www.imdb.com/title/tt0110357/",
    cover: "https://m.media-amazon.com/images/I/51cbYSkbCJL._AC_.jpg"
  },
  {
    title: "Blade Runner",
    description: "Un film cult che esplora l'identità e l'umanità in un futuro distopico.",
    genre: "Fantascienza/Noir",
    type: "Film",
    year: 1982,
    imdb: "https://www.imdb.com/title/tt0083658/",
    cover: "https://m.media-amazon.com/images/I/51dQh3bI7-L._AC_.jpg"
  },
  {
    title: "The Prestige",
    description: "La rivalità tra due maghi in una storia di illusioni e inganni.",
    genre: "Drama/Mistero",
    type: "Film",
    year: 2006,
    imdb: "https://www.imdb.com/title/tt0482571/",
    cover: "https://m.media-amazon.com/images/I/51WO6vXG1jL._AC_.jpg"
  },
  {
    title: "Memento",
    description: "Un uomo con perdita di memoria cerca vendetta seguendo indizi criptici.",
    genre: "Thriller/Mistero",
    type: "Film",
    year: 2000,
    imdb: "https://www.imdb.com/title/tt0209144/",
    cover: "https://m.media-amazon.com/images/I/51c6z9YWmXL._AC_.jpg"
  },
  {
    title: "Whiplash",
    description: "La storia di un giovane batterista e il suo esigente mentore in un ambiente competitivo.",
    genre: "Drama/Musicale",
    type: "Film",
    year: 2014,
    imdb: "https://www.imdb.com/title/tt2582802/",
    cover: "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SL1024_.jpg"
  },
  {
    title: "American Beauty",
    description: "Una critica alla società americana moderna attraverso la storia di una famiglia in crisi.",
    genre: "Drama",
    type: "Film",
    year: 1999,
    imdb: "https://www.imdb.com/title/tt0169547/",
    cover: "https://m.media-amazon.com/images/I/51pnxDn6XwL._AC_.jpg"
  },
  {
    title: "No Country for Old Men",
    description: "Un cacciatore di taglie e un assassino spietato si scontrano in un thriller violento.",
    genre: "Thriller/Crime",
    type: "Film",
    year: 2007,
    imdb: "https://www.imdb.com/title/tt0477348/",
    cover: "https://m.media-amazon.com/images/I/51mFJq4YUIL._AC_.jpg"
  },
  {
    title: "Eternal Sunshine of the Spotless Mind",
    description: "Una coppia cerca di cancellare il dolore dei ricordi, scoprendo che l'amore è difficile da dimenticare.",
    genre: "Romantico/Sci-Fi",
    type: "Film",
    year: 2004,
    imdb: "https://www.imdb.com/title/tt0338013/",
    cover: "https://m.media-amazon.com/images/I/51-d7JUnUHL._AC_.jpg"
  },
  {
    title: "The Truman Show",
    description: "La vita di un uomo è in realtà uno show televisivo senza che lui lo sappia.",
    genre: "Drama/Sci-Fi",
    type: "Film",
    year: 1998,
    imdb: "https://www.imdb.com/title/tt0120382/",
    cover: "https://m.media-amazon.com/images/I/51ExwFs-jCL._AC_.jpg"
  },
  {
    title: "The Departed",
    description: "Un poliziotto sotto copertura e un infiltrato nella polizia si confrontano in un gioco di inganni.",
    genre: "Crime/Thriller",
    type: "Film",
    year: 2006,
    imdb: "https://www.imdb.com/title/tt0407887/",
    cover: "https://m.media-amazon.com/images/I/51c5V3fIP0L._AC_.jpg"
  },
  {
    title: "City of God",
    description: "La cruda realtà delle favelas di Rio de Janeiro raccontata attraverso la vita di giovani coinvolti nel crimine.",
    genre: "Crime/Drama",
    type: "Film",
    year: 2002,
    imdb: "https://www.imdb.com/title/tt0317248/",
    cover: "https://m.media-amazon.com/images/I/51F8wQclOJL._AC_.jpg"
  },
  {
    title: "Django Unchained",
    description: "Un ex schiavo diventa cacciatore di taglie e si mette in cerca dei responsabili della sua sofferenza.",
    genre: "Western/Drama",
    type: "Film",
    year: 2012,
    imdb: "https://www.imdb.com/title/tt1853728/",
    cover: "https://m.media-amazon.com/images/I/51pWFP4-HCL._AC_.jpg"
  },
  {
    title: "The Revenant",
    description: "La lotta per la sopravvivenza di un trapper nel selvaggio West, in cerca di vendetta.",
    genre: "Avventura/Drama",
    type: "Film",
    year: 2015,
    imdb: "https://www.imdb.com/title/tt1663202/",
    cover: "https://m.media-amazon.com/images/I/51Y9MP2YIZL._AC_.jpg"
  },
  // SERIE TV
  {
    title: "Cobra Kai",
    description: "Il sequel di Karate Kid che riprende la rivalità tra Johnny Lawrence e Daniel LaRusso.",
    genre: "Azione/Drama",
    type: "Serie TV",
    year: 2018,
    imdb: "https://www.imdb.com/title/tt7221388/",
    cover: "https://m.media-amazon.com/images/M/MV5BM2E4ZDNjZWItNDZhOS00NzNkLThhNDEtMDY0NGExMWY0N2Y0XkEyXkFqcGdeQXVyMTI1NjIyNjk@._V1_.jpg"
  },
  {
    title: "Stranger Things",
    description: "Un gruppo di ragazzi si trova coinvolto in eventi soprannaturali negli anni '80.",
    genre: "Fantascienza/Horror",
    type: "Serie TV",
    year: 2016,
    imdb: "https://www.imdb.com/title/tt4574334/",
    cover: "https://m.media-amazon.com/images/I/81Cjz7xjKTL._AC_SL1500_.jpg"
  },
  {
    title: "Lucifer",
    description: "Lucifer Morningstar, il diavolo in persona, decide di vivere a Los Angeles e aiutare la polizia.",
    genre: "Fantasy/Crime",
    type: "Serie TV",
    year: 2016,
    imdb: "https://www.imdb.com/title/tt4052886/",
    cover: "https://m.media-amazon.com/images/I/81ouCQe2RWL._AC_SL1500_.jpg"
  },
  {
    title: "Breaking Bad",
    description: "La storia di un professore di chimica che diventa un pericoloso signore della droga.",
    genre: "Crime/Drama",
    type: "Serie TV",
    year: 2008,
    imdb: "https://www.imdb.com/title/tt0903747/",
    cover: "https://m.media-amazon.com/images/I/51t6vHWeq8L._AC_.jpg"
  },
  {
    title: "The Witcher",
    description: "La storia di Geralt di Rivia, un cacciatore di mostri con poteri sovrannaturali.",
    genre: "Fantasy/Azione",
    type: "Serie TV",
    year: 2019,
    imdb: "https://www.imdb.com/title/tt5180504/",
    cover: "https://m.media-amazon.com/images/I/71dftdQczGL._AC_SL1024_.jpg"
  },
  {
    title: "Squid Game",
    description: "Un gruppo di persone disperate partecipa a giochi mortali per vincere un'enorme somma di denaro.",
    genre: "Thriller/Drama",
    type: "Serie TV",
    year: 2021,
    imdb: "https://www.imdb.com/title/tt10919420/",
    cover: "https://m.media-amazon.com/images/I/81TmSmcso0L._AC_SL1500_.jpg"
  },
  {
    title: "Game of Thrones",
    description: "La battaglia per il Trono di Spade tra potenti famiglie in un mondo fantasy epico.",
    genre: "Fantasy/Drama",
    type: "Serie TV",
    year: 2011,
    imdb: "https://www.imdb.com/title/tt0944947/",
    cover: "https://m.media-amazon.com/images/I/51Vb5zF7H2L._AC_.jpg"
  },
  {
    title: "La Casa di Carta",
    description: "Un gruppo di criminali geniali organizza la rapina del secolo alla Zecca di Spagna.",
    genre: "Crime/Thriller",
    type: "Serie TV",
    year: 2017,
    imdb: "https://www.imdb.com/title/tt6468322/",
    cover: "https://m.media-amazon.com/images/I/51a0zk2dJcL._AC_.jpg"
  },
  {
    title: "The Mandalorian",
    description: "Un cacciatore di taglie viaggia nella galassia con un piccolo essere chiamato Grogu.",
    genre: "Fantascienza/Azione",
    type: "Serie TV",
    year: 2019,
    imdb: "https://www.imdb.com/title/tt8111088/",
    cover: "https://m.media-amazon.com/images/I/91YHLch8S+L._AC_SL1500_.jpg"
  },
  {
    title: "Peaky Blinders",
    description: "La storia della famiglia Shelby, una gang che governa Birmingham nel dopoguerra.",
    genre: "Crime/Drama",
    type: "Serie TV",
    year: 2013,
    imdb: "https://www.imdb.com/title/tt2442560/",
    cover: "https://m.media-amazon.com/images/I/81hZTIZI2JL._AC_SL1500_.jpg"
  },
  {
    title: "Better Call Saul",
    description: "Il prequel di Breaking Bad, incentrato sull'avvocato Jimmy McGill.",
    genre: "Crime/Drama",
    type: "Serie TV",
    year: 2015,
    imdb: "https://www.imdb.com/title/tt3032476/",
    cover: "https://m.media-amazon.com/images/I/81J+izSp4pL._AC_SL1500_.jpg"
  }
];

const handler = async (m, { conn }) => {
  const randomPick = entertainment[Math.floor(Math.random() * entertainment.length)];
  const msg = `🎬 *Consiglio ${randomPick.type}*\n\n*Titolo:* ${randomPick.title}\n*Genere:* ${randomPick.genre}\n*Anno:* ${randomPick.year}\n*Descrizione:* ${randomPick.description}\n\n(${randomPick.imdb})`;
  await conn.sendFile(m.chat, randomPick.cover, 'cover.jpg', msg, m);
};

handler.command = /^(consigliafilm|consigliaserie|ai_consiglia-film)$/i;
handler.tags = ['ai'];
export default handler;
