import HeroSlider from '../components/HeroSlider';
import MovieRow from '../components/MovieRow';
import { trendingMovies, seriesList, continueWatching } from '../data/movies';

const HomePage = () => {
  return (
    <div>
      {/* Hero Slider - only on home */}
      <section className="h-screen">
        <HeroSlider />
      </section>

      {/* Trending Section */}
      <section className="py-12 bg-gradient-to-t from-netflix-dark to-transparent">
        <MovieRow title="🔥 Trending Now" movies={trendingMovies} />
      </section>

      {/* Continue Watching */}
      <section className="py-4">
        <MovieRow
          title="▶ Continue Watching"
          movies={continueWatching}
          variant="landscape"
          showProgress
        />
      </section>

      {/* Popular Series */}
      <section className="py-4">
        <MovieRow title="📺 Popular Series" movies={seriesList} />
      </section>

      {/* New Releases */}
      <section className="py-4 pb-16">
        <MovieRow
          title="🆕 New Releases"
          movies={[...trendingMovies].sort((a, b) => b.year - a.year)}
        />
      </section>
    </div>
  );
};

export default HomePage;
