import MoviesGrid from '../components/MoviesGrid';
import { seriesList } from '../data/movies';

const SeriesPage = () => {
  return (
    <MoviesGrid
      title="📺 TV Series"
      movies={seriesList}
      emptyMessage="No series found"
    />
  );
};

export default SeriesPage;
