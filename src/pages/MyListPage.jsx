import { useApp } from '../context/AppContext';

const MyListPage = () => {
  const { myList, openMovie, removeFromMyList } = useApp();

  return (
    <div className="pt-24 pb-16 px-4 md:px-8 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-bebas text-4xl md:text-5xl tracking-wider">
          ❤️ My List
        </h1>
        <span className="text-gray-400 text-sm">
          {myList.length} {myList.length === 1 ? 'title' : 'titles'}
        </span>
      </div>

      {myList.length === 0 ? (
        <div className="text-center py-20 text-gray-400 max-w-md mx-auto">
          <p className="text-6xl mb-4">📋</p>
          <h2 className="text-2xl font-semibold mb-2 text-white">Your list is empty</h2>
          <p className="text-base mb-6">
            Add movies and series to your list to watch them later. Click the "+ My List" button
            on any title to add it here.
          </p>
          <p className="text-sm text-gray-500">
            💡 Tip: Try clicking the "+" buttons in the hero slider or any movie card.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {myList.map((movie) => (
            <div
              key={movie.id}
              className="group relative bg-netflix-gray rounded-lg overflow-hidden border border-white/10 hover:border-netflix-red transition-all shadow-lg hover:shadow-netflix-red/30"
            >
              <button
                onClick={() => openMovie(movie)}
                className="block w-full text-left"
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
                <div className="p-3 pb-12">
                  <p className="text-white font-semibold text-sm truncate">
                    {movie.title}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    {movie.year} • {movie.genre.split('•')[0].trim()}
                  </p>
                </div>
              </button>

              {/* Remove button (always visible at bottom) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromMyList(movie.id);
                }}
                className="absolute bottom-2 right-2 px-2 py-1 bg-red-600/90 hover:bg-red-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                aria-label={`Remove ${movie.title} from list`}
              >
                <span>✕</span>
                <span>Remove</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListPage;
