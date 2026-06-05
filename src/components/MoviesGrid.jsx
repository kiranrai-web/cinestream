import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { allGenres } from '../data/movies';

const MoviesGrid = ({ title, movies, emptyMessage = 'No content to display' }) => {
  const { openMovie } = useApp();
  const [genre, setGenre] = useState('All');
  const [sortBy, setSortBy] = useState('rating');

  const filtered = useMemo(() => {
    let list = [...movies];

    if (genre !== 'All') {
      list = list.filter((m) =>
        m.genre.toLowerCase().split('•').map((g) => g.trim()).includes(genre.toLowerCase())
      );
    }

    if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'year') {
      list.sort((a, b) => b.year - a.year);
    } else if (sortBy === 'title') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }, [movies, genre, sortBy]);

  return (
    <div className="pt-24 pb-16 px-4 md:px-8 min-h-screen">
      <h1 className="font-bebas text-4xl md:text-5xl tracking-wider mb-6">
        {title}
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        <div className="flex items-center gap-2">
          <label className="text-gray-400 text-sm">Genre:</label>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="px-3 py-1.5 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-netflix-red cursor-pointer"
          >
            {allGenres.map((g) => (
              <option key={g} value={g} className="bg-gray-900">
                {g}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-gray-400 text-sm">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1.5 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-netflix-red cursor-pointer"
          >
            <option value="rating" className="bg-gray-900">Top Rated</option>
            <option value="year" className="bg-gray-900">Newest</option>
            <option value="title" className="bg-gray-900">A-Z</option>
          </select>
        </div>
        <span className="px-3 py-1.5 text-gray-400 text-sm self-center">
          {filtered.length} {filtered.length === 1 ? 'title' : 'titles'}
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-6xl mb-4">🎬</p>
          <p className="text-xl">{emptyMessage}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filtered.map((movie) => (
            <button
              key={movie.id}
              onClick={() => openMovie(movie)}
              className="group text-left bg-netflix-gray rounded-lg overflow-hidden border border-white/10 hover:border-netflix-red hover:scale-105 transition-all shadow-lg hover:shadow-netflix-red/30"
            >
              <div className="aspect-[2/3] relative overflow-hidden bg-gray-800">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-yellow-400 font-bold">
                  ★ {movie.rating}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 rounded-full bg-netflix-red flex items-center justify-center text-white shadow-lg">
                    ▶
                  </div>
                </div>
              </div>
              <div className="p-3">
                <p className="text-white font-semibold text-sm truncate">
                  {movie.title}
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  {movie.year} • {movie.genre.split('•')[0].trim()}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoviesGrid;
