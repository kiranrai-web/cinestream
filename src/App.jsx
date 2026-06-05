import { useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import MovieModal from './components/MovieModal';
import SearchModal from './components/SearchModal';
import Toast from './components/Toast';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import SeriesPage from './pages/SeriesPage';
import MyListPage from './pages/MyListPage';

function App() {
  const { currentPage, isSearchOpen } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'movies':
        return <MoviesPage />;
      case 'series':
        return <SeriesPage />;
      case 'mylist':
        return <MyListPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-netflix-dark text-white">
      <Navbar />

      <main className="animate-fade-in">{renderPage()}</main>

      {/* Footer - only on non-home pages */}
      {currentPage !== 'home' && <Footer />}

      {/* Global Modals */}
      <MovieModal />
      {/* Key on SearchModal forces remount -> resets filters each open */}
      <SearchModal key={isSearchOpen ? 'open' : 'closed'} />

      {/* Toast Notifications */}
      <Toast />

      {/* Global animation styles */}
      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px);
            filter: blur(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scale-up {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-scale-up {
          animation: scale-up 0.3s ease-out;
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

const Footer = () => {
  return (
    <footer className="py-12 px-8 md:px-16 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="font-bebas text-2xl text-netflix-red mb-6">CINESTREAM</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-400">
          <div className="flex flex-col gap-3">
            <a href="#" className="hover:text-white transition-colors">Audio Description</a>
            <a href="#" className="hover:text-white transition-colors">Investor Relations</a>
            <a href="#" className="hover:text-white transition-colors">Legal Notices</a>
          </div>
          <div className="flex flex-col gap-3">
            <a href="#" className="hover:text-white transition-colors">Help Center</a>
            <a href="#" className="hover:text-white transition-colors">Jobs</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Preferences</a>
          </div>
          <div className="flex flex-col gap-3">
            <a href="#" className="hover:text-white transition-colors">Gift Cards</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-white transition-colors">Corporate Information</a>
          </div>
          <div className="flex flex-col gap-3">
            <a href="#" className="hover:text-white transition-colors">Media Center</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Contact Us</a>
          </div>
        </div>
        <div className="mt-8 text-xs text-gray-500">
          © 2024 CineStream. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default App;
