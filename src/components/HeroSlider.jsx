import { useState, useEffect, useCallback } from 'react';
import { movies } from '../data/movies';
import { useApp } from '../context/AppContext';

const HeroSlider = () => {
  const { toggleMyList, isInMyList, openMovie, showToast } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % movies.length);
    setAnimationKey((k) => k + 1);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
    setAnimationKey((k) => k + 1);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  const goToSlide = useCallback((index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setAnimationKey((k) => k + 1);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating, currentIndex]);

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const handlePlayClick = (e) => {
    e.stopPropagation();
    const currentMovie = movies[currentIndex];
    if (currentMovie.trailer) {
      window.open(currentMovie.trailer, '_blank');
      showToast(`Opening trailer for "${currentMovie.title}"`, 'info');
    } else {
      showToast('Trailer not available', 'error');
    }
  };

  const handleAddToList = (e) => {
    e.stopPropagation();
    const currentMovie = movies[currentIndex];
    toggleMyList(currentMovie);
  };

  const handleInfoClick = (e) => {
    e.stopPropagation();
    openMovie(movies[currentIndex]);
  };

  const isInList = isInMyList(movies[currentIndex]?.id);
  const activeMovie = movies[currentIndex];

  return (
    <div
      className="relative h-screen w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {movies.map((movie, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={movie.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              isActive ? 'z-10 opacity-100' : 'z-0 opacity-0'
            }`}
            style={{ pointerEvents: isActive ? 'auto' : 'none' }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center scale-105"
              style={{ backgroundImage: `url(${movie.backgroundImage})` }}
            >
              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  isActive
                    ? 'bg-gradient-to-r from-black/95 via-black/50 to-transparent'
                    : 'bg-black/60'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-netflix-dark via-transparent to-transparent" />
            </div>
          </div>
        );
      })}

      {/* Content for active slide (rendered separately to avoid animation key issues) */}
      {activeMovie && (
        <div
          key={`content-${animationKey}`}
          className="absolute top-1/2 left-6 md:left-16 transform -translate-y-1/2 z-20 max-w-xl pr-4"
        >
          <div
            className="flex items-center gap-3 text-sm mb-3"
            style={{ animation: 'slide-up 0.8s ease-out 0.1s both' }}
          >
            <span className="text-yellow-400 font-bold text-lg">★ {activeMovie.rating}</span>
            <span className="text-gray-300">{activeMovie.year}</span>
            <span className="text-netflix-red font-semibold">{activeMovie.genre}</span>
          </div>

          <h1
            className="font-bebas text-5xl md:text-7xl lg:text-8xl mb-4 leading-none tracking-wide"
            style={{ animation: 'slide-up 0.8s ease-out 0.3s both' }}
          >
            {activeMovie.title}
          </h1>

          <p
            className="text-gray-300 text-sm md:text-base leading-relaxed mb-4 max-w-lg"
            style={{ animation: 'slide-up 0.8s ease-out 0.5s both' }}
          >
            {activeMovie.description}
          </p>

          <div
            className="flex flex-wrap gap-2 mb-6"
            style={{ animation: 'slide-up 0.8s ease-out 0.7s both' }}
          >
            <span className="px-3 py-1 border border-white/30 rounded text-xs text-gray-300">
              {activeMovie.duration}
            </span>
            <span className="px-3 py-1 border border-white/30 rounded text-xs text-gray-300">
              {activeMovie.quality}
            </span>
            <span className="px-3 py-1 border border-white/30 rounded text-xs text-gray-300">
              {activeMovie.maturity}
            </span>
          </div>

          <div
            className="flex flex-wrap gap-3"
            style={{ animation: 'slide-up 0.8s ease-out 0.9s both' }}
          >
            <button
              onClick={handlePlayClick}
              className="px-6 md:px-8 py-3 bg-netflix-red text-white font-semibold rounded hover:bg-red-700 transition-all hover:scale-105 flex items-center gap-2"
            >
              ▶ Play
            </button>
            <button
              onClick={handleAddToList}
              className={`px-6 md:px-8 py-3 border rounded font-semibold transition-all hover:scale-105 ${
                isInList
                  ? 'bg-green-600 border-green-600 text-white'
                  : 'bg-white/10 border-white/30 text-white hover:bg-white/20'
              }`}
            >
              {isInList ? '✓ In My List' : '+ My List'}
            </button>
            <button
              onClick={handleInfoClick}
              className="px-6 md:px-8 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded hover:bg-white/30 transition-all hover:scale-105 flex items-center gap-2"
            >
              ℹ More Info
            </button>
          </div>
        </div>
      )}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-14 md:h-14 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white text-2xl md:text-3xl transition-all hover:scale-110 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-14 md:h-14 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white text-2xl md:text-3xl transition-all hover:scale-110 backdrop-blur-sm"
        aria-label="Next slide"
      >
        ›
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {movies.map((movie, index) => (
          <button
            key={movie.id}
            onClick={() => goToSlide(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-10 bg-netflix-red'
                : 'w-6 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}: ${movie.title}`}
          />
        ))}
      </div>

      {/* Mini slides preview on the right (desktop only) */}
      <div className="hidden lg:flex absolute right-20 top-1/2 -translate-y-1/2 flex-col gap-3 z-20 max-h-[80vh] overflow-y-auto pr-2 scrollbar-hide">
        {movies.map((movie, index) => {
          if (index === currentIndex) return null;
          return (
            <button
              key={movie.id}
              onClick={() => goToSlide(index)}
              className="w-44 h-24 rounded-lg overflow-hidden cursor-pointer transition-all hover:scale-105 shadow-lg relative group bg-gray-800"
              style={{
                backgroundImage: `url(${movie.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="w-full h-full bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                <span className="font-bebas text-lg tracking-wide text-white">
                  {movie.title}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default HeroSlider;
