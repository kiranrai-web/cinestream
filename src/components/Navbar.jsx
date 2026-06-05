import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'movies', label: 'Movies' },
  { id: 'series', label: 'Series' },
  { id: 'mylist', label: 'My List' }
];

const Navbar = () => {
  const { currentPage, navigate, myList, openSearch } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleNavClick = (page) => {
    navigate(page);
    setIsMobileMenuOpen(false);
  };

  const handleSearchClick = () => {
    openSearch();
  };

  const handleProfileClick = () => {
    // Profile - show toast and highlight user
    // (placeholder for future auth feature)
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 md:px-12 py-4 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-md shadow-lg'
          : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      {/* Logo + Nav Links */}
      <div className="flex items-center gap-8">
        <button
          onClick={() => handleNavClick('home')}
          className="font-bebas text-2xl md:text-3xl tracking-wider cursor-pointer text-netflix-red hover:scale-105 transition-transform"
        >
          CINESTREAM
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-6">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            const showBadge = item.id === 'mylist' && myList.length > 0;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`text-sm font-medium transition-colors duration-200 relative ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {showBadge && (
                    <span className="absolute -top-2 -right-3 bg-netflix-red text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                      {myList.length}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 md:gap-5">
        <button
          onClick={handleSearchClick}
          className="text-white text-xl hover:scale-110 transition-transform p-1"
          aria-label="Search"
          title="Search"
        >
          🔍
        </button>
        <button
          onClick={handleProfileClick}
          className="hidden md:flex w-9 h-9 bg-netflix-red rounded items-center justify-center cursor-pointer hover:bg-red-700 transition-colors"
          aria-label="Profile"
          title="Profile"
        >
          👤
        </button>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl p-1"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md md:hidden border-t border-white/10">
          <ul className="flex flex-col py-2">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              const showBadge = item.id === 'mylist' && myList.length > 0;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left block px-6 py-3 transition-colors ${
                      isActive
                        ? 'text-white bg-white/10'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="flex items-center justify-between">
                      <span>{item.label}</span>
                      {showBadge && (
                        <span className="bg-netflix-red text-white text-xs font-bold rounded-full min-w-[22px] h-[22px] flex items-center justify-center px-2">
                          {myList.length}
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
