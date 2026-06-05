import { useEffect } from 'react';
import { useApp } from '../context/AppContext';

const MovieModal = () => {
  const { selectedMovie, closeMovie, toggleMyList, isInMyList, showToast } = useApp();

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') closeMovie();
    };
    if (selectedMovie) {
      window.addEventListener('keydown', onKey);
    }
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedMovie, closeMovie]);

  if (!selectedMovie) return null;

  const inList = isInMyList(selectedMovie.id);

  const handlePlay = () => {
    if (selectedMovie.trailer) {
      window.open(selectedMovie.trailer, '_blank');
      showToast(`Opening trailer for "${selectedMovie.title}"`, 'info');
    } else {
      showToast('Trailer not available', 'error');
    }
  };

  const handleListToggle = () => {
    toggleMyList(selectedMovie);
  };

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-start justify-center overflow-y-auto bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={closeMovie}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-4xl mx-4 my-8 bg-netflix-dark rounded-2xl overflow-hidden shadow-2xl animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero Backdrop */}
        <div className="relative h-72 md:h-96 w-full overflow-hidden">
          <img
            src={selectedMovie.backgroundImage || selectedMovie.poster}
            alt={selectedMovie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-dark via-netflix-dark/40 to-transparent" />
          <button
            onClick={closeMovie}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white text-2xl flex items-center justify-center transition-all hover:scale-110"
            aria-label="Close"
          >
            ×
          </button>

          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="font-bebas text-5xl md:text-7xl tracking-wider text-white mb-2 drop-shadow-2xl">
              {selectedMovie.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-200">
              <span className="text-yellow-400 font-bold text-base">★ {selectedMovie.rating}</span>
              <span className="px-2 py-0.5 border border-white/40 rounded text-xs">
                {selectedMovie.maturity || 'PG-13'}
              </span>
              <span>{selectedMovie.year}</span>
              <span className="px-2 py-0.5 border border-white/40 rounded text-xs">
                {selectedMovie.duration}
              </span>
              <span className="px-2 py-0.5 border border-white/40 rounded text-xs">
                {selectedMovie.quality}
              </span>
              <span className="text-netflix-red font-semibold">{selectedMovie.genre}</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={handlePlay}
              className="px-8 py-3 bg-netflix-red text-white font-semibold rounded hover:bg-red-700 transition-all hover:scale-105 flex items-center gap-2"
            >
              ▶ Play
            </button>
            <button
              onClick={handleListToggle}
              className={`px-8 py-3 font-semibold rounded transition-all hover:scale-105 border ${
                inList
                  ? 'bg-green-600 border-green-600 text-white'
                  : 'bg-white/10 border-white/30 text-white hover:bg-white/20'
              }`}
            >
              {inList ? '✓ In My List' : '+ My List'}
            </button>
            <button
              onClick={handlePlay}
              className="w-12 h-12 rounded-full border-2 border-white/40 hover:border-white flex items-center justify-center transition-all hover:scale-110"
              aria-label="Play trailer"
              title="Play trailer"
            >
              🔊
            </button>
          </div>

          <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
            {selectedMovie.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="text-gray-500 mb-1">Director</p>
              <p className="text-white font-medium">{selectedMovie.director || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Cast</p>
              <p className="text-white font-medium">
                {(selectedMovie.cast && selectedMovie.cast.join(', ')) || 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Category</p>
              <p className="text-white font-medium">{selectedMovie.category || 'Movies'}</p>
            </div>
          </div>

          {/* Similar / More Like This (placeholder suggestions) */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <h3 className="font-bebas text-2xl tracking-wider mb-3">More Like This</h3>
            <p className="text-gray-500 text-sm">
              You might also enjoy similar titles in the {selectedMovie.genre} genre.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
