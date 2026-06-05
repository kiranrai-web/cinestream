import { useEffect, useState, useMemo, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { allMovies, allGenres } from '../data/movies';

const SearchModal = () => {
  const { isSearchOpen, closeSearch, openMovie } = useApp();
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('All');
  const [sortBy, setSortBy] = useState('relevance');
  const inputRef = useRef(null);

  // Auto-focus the input when the modal mounts.
  // (The parent <App> remounts this component via a key when isSearchOpen
  // changes, so we don't need to manually reset state on each open.)
  useEffect(() => {
    setTimeout(() => inputRef.current && inputRef.current.focus(), 50);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && isSearchOpen) closeSearch();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isSearchOpen, closeSearch]);

  const results = useMemo(() => {
    let list = [...allMovies];

    // Filter by genre
    if (genre !== 'All') {
      list = list.filter((m) =>
        m.genre.toLowerCase().split('•').map((g) => g.trim()).includes(genre.toLowerCase())
      );
    }

    // Filter by query
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((m) =>
        m.title.toLowerCase().includes(q) ||
        m.genre.toLowerCase().includes(q) ||
        (m.director && m.director.toLowerCase().includes(q)) ||
        (m.cast && m.cast.some((c) => c.toLowerCase().includes(q)))
      );
    }

    // Sort
    if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'year') {
      list.sort((a, b) => b.year - a.year);
    } else if (sortBy === 'title') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (q && sortBy === 'relevance') {
      // Sort by query match priority
      list.sort((a, b) => {
        const aTitle = a.title.toLowerCase().includes(q) ? 0 : 1;
        const bTitle = b.title.toLowerCase().includes(q) ? 0 : 1;
        return aTitle - bTitle;
      });
    }

    return list;
  }, [query, genre, sortBy]);

  if (!isSearchOpen) return null;

  const handleSelect = (movie) => {
    openMovie(movie);
    closeSearch();
  };

  const handleClear = () => {
    setQuery('');
    inputRef.current && inputRef.current.focus();
  };

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto"
      onClick={closeSearch}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="max-w-5xl mx-auto px-4 md:px-8 pt-20 pb-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bebas text-4xl md:text-5xl tracking-wider">
            Search CineStream
          </h2>
          <button
            onClick={closeSearch}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-2xl transition-all"
            aria-label="Close search"
          >
            ×
          </button>
        </div>

        {/* Search Input */}
        <div className="relative mb-4">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-400">
            🔍
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies, series, genres, cast..."
            className="w-full pl-14 pr-12 py-4 bg-white/10 border border-white/20 rounded-lg text-white text-lg placeholder-gray-400 focus:outline-none focus:border-netflix-red focus:bg-white/15 transition-colors"
          />
          {query && (
            <button
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xl"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-netflix-red cursor-pointer"
          >
            {allGenres.map((g) => (
              <option key={g} value={g} className="bg-gray-900">
                {g}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-netflix-red cursor-pointer"
          >
            <option value="relevance" className="bg-gray-900">Relevance</option>
            <option value="rating" className="bg-gray-900">Top Rated</option>
            <option value="year" className="bg-gray-900">Newest</option>
            <option value="title" className="bg-gray-900">A-Z</option>
          </select>
          <span className="px-4 py-2 text-gray-400 text-sm self-center">
            {results.length} {results.length === 1 ? 'result' : 'results'}
          </span>
        </div>

        {/* Results */}
        {results.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-6xl mb-4">🎬</p>
            <p className="text-xl">No results found for "{query || genre}"</p>
            <p className="text-sm mt-2">Try different keywords or change the genre filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {results.map((movie) => (
              <button
                key={movie.id}
                onClick={() => handleSelect(movie)}
                className="group text-left bg-netflix-gray rounded-lg overflow-hidden border border-white/10 hover:border-netflix-red hover:scale-105 transition-all shadow-lg hover:shadow-netflix-red/30"
              >
                <div className="aspect-[2/3] relative overflow-hidden bg-gray-800">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-yellow-400 font-bold">
                    ★ {movie.rating}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-netflix-red flex items-center justify-center text-white">
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

        {/* Keyboard hint */}
        <p className="text-center text-gray-500 text-xs mt-8">
          Press <kbd className="px-2 py-1 bg-white/10 rounded">Esc</kbd> to close
        </p>
      </div>
    </div>
  );
};

export default SearchModal;
