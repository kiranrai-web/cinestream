import { trendingMovies } from '../data/movies';

const TrendingSection = () => {
  return (
    <section className="w-full">
      <h2 className="font-bebas text-3xl mb-6 tracking-wide">Trending Now</h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {trendingMovies.map((movie) => (
          <div
            key={movie.id}
            className="flex-shrink-0 relative w-36 md:w-44 h-52 md:h-64 bg-gradient-to-br from-netflix-gray to-netflix-dark rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-netflix-red/30 border border-white/10 hover:border-netflix-red group"
          >
            {/* Rating Badge */}
            <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-yellow-400 font-bold z-10">
              ★ {movie.rating}
            </div>

            {/* Movie Title */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
              <p className="text-sm font-semibold text-center group-hover:text-netflix-red transition-colors">
                {movie.title}
              </p>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-netflix-red/0 group-hover:bg-netflix-red/10 transition-all duration-300" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingSection;