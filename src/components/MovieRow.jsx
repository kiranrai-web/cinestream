import { useRef, useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

const MovieRow = ({ title, movies, variant = 'portrait', showProgress = false }) => {
  const rowRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { openMovie } = useApp();

  const checkScroll = () => {
    if (!rowRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  useEffect(() => {
    checkScroll();
    const el = rowRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [movies]);

  const scroll = (direction) => {
    if (!rowRef.current) return;
    const scrollAmount = rowRef.current.clientWidth * 0.85;
    rowRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="relative group/row mb-8">
      {title && (
        <h2 className="font-bebas text-2xl md:text-3xl tracking-wider mb-4 px-4 md:px-8">
          {title}
        </h2>
      )}

      <div className="relative">
        {/* Left arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 z-20 w-12 bg-black/60 hover:bg-black/80 flex items-center justify-center text-white text-2xl opacity-0 group-hover/row:opacity-100 transition-opacity"
            aria-label="Scroll left"
          >
            ‹
          </button>
        )}

        {/* Right arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 z-20 w-12 bg-black/60 hover:bg-black/80 flex items-center justify-center text-white text-2xl opacity-0 group-hover/row:opacity-100 transition-opacity"
            aria-label="Scroll right"
          >
            ›
          </button>
        )}

        {/* Scrollable row */}
        <div
          ref={rowRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide px-4 md:px-8 pb-2 scroll-smooth"
        >
          {movies.map((movie) => (
            <button
              key={movie.id}
              onClick={() => openMovie(movie)}
              className={`group flex-shrink-0 relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10 hover:shadow-2xl hover:shadow-netflix-red/40 border border-white/10 hover:border-netflix-red ${
                variant === 'landscape' ? 'w-64 md:w-80' : 'w-36 md:w-44'
              }`}
            >
              <div
                className={`relative ${
                  variant === 'landscape' ? 'aspect-video' : 'aspect-[2/3]'
                } overflow-hidden bg-gray-800`}
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Rating badge */}
                <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-yellow-400 font-bold">
                  ★ {movie.rating}
                </div>

                {/* Hover overlay with play button */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center bg-black/40">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-netflix-red flex items-center justify-center text-white text-xl shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-300">
                    ▶
                  </div>
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white font-semibold text-sm truncate">
                    {movie.title}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-300 mt-1">
                    <span>{movie.year}</span>
                    <span>•</span>
                    <span className="truncate">{movie.genre.split('•')[0].trim()}</span>
                  </div>
                </div>

                {/* Progress bar (for continue watching) */}
                {showProgress && movie.progress !== undefined && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                    <div
                      className="h-full bg-netflix-red transition-all"
                      style={{ width: `${movie.progress}%` }}
                    />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieRow;
