// Helper to make placeholder images for missing data
const img = (seed) => `https://picsum.photos/seed/${seed}/1920/1080`;
const poster = (seed) => `https://picsum.photos/seed/${seed}/400/600`;

// Featured movies for the hero slider
export const movies = [
  {
    id: 1,
    title: 'Inception',
    rating: 8.8,
    year: 2010,
    genre: 'Sci-Fi • Thriller',
    duration: '2h 28m',
    quality: '4K Ultra HD',
    description: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O. A mind-bending journey through layers of dreams.',
    trailer: 'https://www.youtube.com/watch?v=YoHD9XEInc0',
    backgroundImage: img('inception'),
    poster: poster('inception'),
    category: 'Movies',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page', 'Tom Hardy'],
    director: 'Christopher Nolan',
    maturity: 'PG-13'
  },
  {
    id: 2,
    title: 'The Dark Knight',
    rating: 9.0,
    year: 2008,
    genre: 'Action • Crime',
    duration: '2h 32m',
    quality: '4K Ultra HD',
    description: 'Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and DA Harvey Dent. They soon find themselves prey to a reign of chaos unleashed by the Joker.',
    trailer: 'https://www.youtube.com/watch?v=EXeTwQWrcwY',
    backgroundImage: img('darkknight'),
    poster: poster('darkknight'),
    category: 'Movies',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
    director: 'Christopher Nolan',
    maturity: 'PG-13'
  },
  {
    id: 3,
    title: 'Interstellar',
    rating: 8.6,
    year: 2014,
    genre: 'Sci-Fi • Adventure',
    duration: '2h 49m',
    quality: '4K Ultra HD',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival. An epic journey across the stars to save the human race from extinction.',
    trailer: 'https://www.youtube.com/watch?v=zSWdZVtXT7E',
    backgroundImage: img('interstellar'),
    poster: poster('interstellar'),
    category: 'Movies',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    director: 'Christopher Nolan',
    maturity: 'PG-13'
  },
  {
    id: 4,
    title: 'The Matrix',
    rating: 8.7,
    year: 1999,
    genre: 'Sci-Fi • Action',
    duration: '2h 16m',
    quality: '4K Ultra HD',
    description: 'A computer hacker learns about the true nature of reality and his role in the war against its controllers. The groundbreaking film that changed cinema forever.',
    trailer: 'https://www.youtube.com/watch?v=vKQi3bBA1y8',
    backgroundImage: img('matrix'),
    poster: poster('matrix'),
    category: 'Movies',
    cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'],
    director: 'Lana Wachowski',
    maturity: 'R'
  }
];

// Trending movies
export const trendingMovies = [
  { id: 5, title: 'Dune', rating: 8.5, year: 2021, genre: 'Sci-Fi', duration: '2h 35m', quality: '4K', description: 'A noble family becomes embroiled in a war for control over the galaxy\'s most valuable asset.', poster: poster('dune'), backgroundImage: img('dune'), trailer: 'https://www.youtube.com/watch?v=8g18jFHCLXk', cast: ['Timothée Chalamet', 'Rebecca Ferguson'], director: 'Denis Villeneuve', maturity: 'PG-13', category: 'Movies' },
  { id: 6, title: 'Avatar', rating: 8.2, year: 2009, genre: 'Sci-Fi', duration: '2h 42m', quality: '4K', description: 'A paraplegic Marine dispatched to Pandora becomes torn between following orders and protecting the world.', poster: poster('avatar'), backgroundImage: img('avatar'), trailer: 'https://www.youtube.com/watch?v=5PSNL1qE6VY', cast: ['Sam Worthington', 'Zoe Saldana'], director: 'James Cameron', maturity: 'PG-13', category: 'Movies' },
  { id: 7, title: 'Pulp Fiction', rating: 8.9, year: 1994, genre: 'Crime', duration: '2h 34m', quality: 'HD', description: 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.', poster: poster('pulpfiction'), backgroundImage: img('pulpfiction'), trailer: 'https://www.youtube.com/watch?v=s7EdQ4FqbhY', cast: ['John Travolta', 'Samuel L. Jackson'], director: 'Quentin Tarantino', maturity: 'R', category: 'Movies' },
  { id: 8, title: 'Fight Club', rating: 8.4, year: 1999, genre: 'Drama', duration: '2h 19m', quality: 'HD', description: 'An insomniac office worker and a soap maker form an underground fight club that evolves into much more.', poster: poster('fightclub'), backgroundImage: img('fightclub'), trailer: 'https://www.youtube.com/watch?v=SUXWAEX2jlg', cast: ['Brad Pitt', 'Edward Norton'], director: 'David Fincher', maturity: 'R', category: 'Movies' },
  { id: 9, title: 'Forrest Gump', rating: 8.7, year: 1994, genre: 'Drama', duration: '2h 22m', quality: 'HD', description: 'The presidencies of Kennedy and Johnson, the Vietnam War, and more unfold from the perspective of an Alabama man.', poster: poster('forrestgump'), backgroundImage: img('forrestgump'), trailer: 'https://www.youtube.com/watch?v=bLvqoHBptjg', cast: ['Tom Hanks', 'Robin Wright'], director: 'Robert Zemeckis', maturity: 'PG-13', category: 'Movies' },
  { id: 10, title: 'The Godfather', rating: 9.2, year: 1972, genre: 'Crime', duration: '2h 55m', quality: '4K', description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', poster: poster('godfather'), backgroundImage: img('godfather'), trailer: 'https://www.youtube.com/watch?v=sY1S34973zA', cast: ['Marlon Brando', 'Al Pacino'], director: 'Francis Ford Coppola', maturity: 'R', category: 'Movies' },
  { id: 11, title: 'Gladiator', rating: 8.5, year: 2000, genre: 'Action', duration: '2h 35m', quality: '4K', description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family.', poster: poster('gladiator'), backgroundImage: img('gladiator'), trailer: 'https://www.youtube.com/watch?v=owK1qxDsnE4', cast: ['Russell Crowe', 'Joaquin Phoenix'], director: 'Ridley Scott', maturity: 'R', category: 'Movies' },
  { id: 12, title: 'Joker', rating: 8.4, year: 2019, genre: 'Thriller', duration: '2h 2m', quality: '4K', description: 'A mentally troubled comedian disregarded by society begins a slow descent into madness.', poster: poster('joker'), backgroundImage: img('joker'), trailer: 'https://www.youtube.com/watch?v=zAGVQLHvwOY', cast: ['Joaquin Phoenix', 'Robert De Niro'], director: 'Todd Phillips', maturity: 'R', category: 'Movies' }
];

// TV Series
export const seriesList = [
  { id: 101, title: 'Breaking Bad', rating: 9.5, year: 2008, genre: 'Crime • Drama', duration: '5 Seasons', quality: '4K', description: 'A high school chemistry teacher diagnosed with cancer turns to manufacturing methamphetamine to secure his family\'s future.', poster: poster('breakingbad'), backgroundImage: img('breakingbad'), trailer: 'https://www.youtube.com/watch?v=HhesaQXLuRY', cast: ['Bryan Cranston', 'Aaron Paul'], director: 'Vince Gilligan', maturity: 'TV-MA', category: 'Series' },
  { id: 102, title: 'Stranger Things', rating: 8.7, year: 2016, genre: 'Sci-Fi • Horror', duration: '4 Seasons', quality: '4K', description: 'When a young boy vanishes, a small town uncovers a mystery involving supernatural forces and government experiments.', poster: poster('strangerthings'), backgroundImage: img('strangerthings'), trailer: 'https://www.youtube.com/watch?v=b9EkMc7Z7bY', cast: ['Millie Bobby Brown', 'Finn Wolfhard'], director: 'The Duffer Brothers', maturity: 'TV-14', category: 'Series' },
  { id: 103, title: 'The Crown', rating: 8.6, year: 2016, genre: 'Drama', duration: '6 Seasons', quality: '4K', description: 'The story of Queen Elizabeth II of the United Kingdom, told over six decades.', poster: poster('thecrown'), backgroundImage: img('thecrown'), trailer: 'https://www.youtube.com/watch?v=JWtnJjn6ng0', cast: ['Claire Foy', 'Olivia Colman'], director: 'Peter Morgan', maturity: 'TV-MA', category: 'Series' },
  { id: 104, title: 'The Witcher', rating: 8.2, year: 2019, genre: 'Fantasy', duration: '3 Seasons', quality: '4K', description: 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.', poster: poster('witcher'), backgroundImage: img('witcher'), trailer: 'https://www.youtube.com/watch?v=ndL1COoACEM', cast: ['Henry Cavill', 'Anya Chalotra'], director: 'Lauren S. Hissrich', maturity: 'TV-MA', category: 'Series' },
  { id: 105, title: 'Money Heist', rating: 8.2, year: 2017, genre: 'Thriller', duration: '5 Seasons', quality: 'HD', description: 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history.', poster: poster('moneyheist'), backgroundImage: img('moneyheist'), trailer: 'https://www.youtube.com/watch?v=_InqQJRqGeM', cast: ['Úrsula Corberó', 'Álvaro Morte'], director: 'Álex Rodrigo', maturity: 'TV-MA', category: 'Series' },
  { id: 106, title: 'Dark', rating: 8.8, year: 2017, genre: 'Sci-Fi • Mystery', duration: '3 Seasons', quality: '4K', description: 'A child disappearance sends four families on a frantic hunt for answers in this German thriller.', poster: poster('darkseries'), backgroundImage: img('darkseries'), trailer: 'https://www.youtube.com/watch?v=ESEUoa-mz2c', cast: ['Louis Hofmann', 'Oliver Masucci'], director: 'Baran bo Odar', maturity: 'TV-MA', category: 'Series' }
];

// Continue watching
export const continueWatching = [
  { id: 201, title: 'The Dark Knight', rating: 9.0, year: 2008, genre: 'Action', duration: '2h 32m', quality: '4K', description: 'Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and DA Harvey Dent.', poster: poster('darkknight2'), backgroundImage: img('darkknight2'), trailer: 'https://www.youtube.com/watch?v=EXeTwQWrcwY', progress: 45, cast: ['Christian Bale', 'Heath Ledger'], director: 'Christopher Nolan', maturity: 'PG-13', category: 'Movies' },
  { id: 202, title: 'Breaking Bad', rating: 9.5, year: 2008, genre: 'Crime', duration: '5 Seasons', quality: '4K', description: 'A high school chemistry teacher diagnosed with cancer turns to manufacturing methamphetamine to secure his family\'s future.', poster: poster('breakingbad2'), backgroundImage: img('breakingbad2'), trailer: 'https://www.youtube.com/watch?v=HhesaQXLuRY', progress: 70, cast: ['Bryan Cranston', 'Aaron Paul'], director: 'Vince Gilligan', maturity: 'TV-MA', category: 'Series' },
  { id: 203, title: 'Inception', rating: 8.8, year: 2010, genre: 'Sci-Fi', duration: '2h 28m', quality: '4K', description: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.', poster: poster('inception2'), backgroundImage: img('inception2'), trailer: 'https://www.youtube.com/watch?v=YoHD9XEInc0', progress: 25, cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt'], director: 'Christopher Nolan', maturity: 'PG-13', category: 'Movies' },
  { id: 204, title: 'Stranger Things', rating: 8.7, year: 2016, genre: 'Sci-Fi', duration: '4 Seasons', quality: '4K', description: 'When a young boy vanishes, a small town uncovers a mystery involving supernatural forces.', poster: poster('strangerthings2'), backgroundImage: img('strangerthings2'), trailer: 'https://www.youtube.com/watch?v=b9EkMc7Z7bY', progress: 60, cast: ['Millie Bobby Brown', 'Finn Wolfhard'], director: 'The Duffer Brothers', maturity: 'TV-14', category: 'Series' },
  { id: 205, title: 'The Matrix', rating: 8.7, year: 1999, genre: 'Sci-Fi', duration: '2h 16m', quality: '4K', description: 'A computer hacker learns about the true nature of reality and his role in the war against its controllers.', poster: poster('matrix2'), backgroundImage: img('matrix2'), trailer: 'https://www.youtube.com/watch?v=vKQi3bBA1y8', progress: 33, cast: ['Keanu Reeves', 'Laurence Fishburne'], director: 'Lana Wachowski', maturity: 'R', category: 'Movies' },
  { id: 206, title: 'Interstellar', rating: 8.6, year: 2014, genre: 'Sci-Fi', duration: '2h 49m', quality: '4K', description: 'A team of explorers travel through a wormhole in space to ensure humanity\'s survival.', poster: poster('interstellar2'), backgroundImage: img('interstellar2'), trailer: 'https://www.youtube.com/watch?v=zSWdZVtXT7E', progress: 88, cast: ['Matthew McConaughey', 'Anne Hathaway'], director: 'Christopher Nolan', maturity: 'PG-13', category: 'Movies' }
];

// All movies combined (used for search/browse)
export const allMovies = [
  ...movies,
  ...trendingMovies,
  ...seriesList
];

// Get unique genres for filtering
export const allGenres = [
  'All',
  ...new Set(
    [...allMovies, ...continueWatching]
      .flatMap((m) => m.genre.split('•').map((g) => g.trim()))
      .filter(Boolean)
  )
];
