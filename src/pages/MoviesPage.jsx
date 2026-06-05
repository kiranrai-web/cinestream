import MoviesGrid from '../components/MoviesGrid';
import { movies, trendingMovies } from '../data/movies';

const MoviesPage = () => {
  const allMovies = [...movies, ...trendingMovies];

  return (
    <MoviesGrid
      title="🎬 Movies"
      movies={allMovies}
      emptyMessage="No movies found"
    />
  );
};

export default MoviesPage;
