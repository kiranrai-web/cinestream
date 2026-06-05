/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const AppContext = createContext();

const STORAGE_KEYS = {
  MY_LIST: 'cinestream_myList'
};

export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'movies' | 'series' | 'mylist'
  const [myList, setMyList] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MY_LIST);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Refs
  const toastTimersRef = useRef([]);
  // Holds the latest showToast so other callbacks can call it without
  // including it in their dependency arrays (avoids eslint warnings).
  const showToastRef = useRef(() => {});

  // Persist myList
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MY_LIST, JSON.stringify(myList));
    } catch (err) {
      console.warn('Could not persist myList', err);
    }
  }, [myList]);

  // Cleanup timers and overflow on unmount
  useEffect(() => {
    return () => {
      toastTimersRef.current.forEach((t) => clearTimeout(t));
      toastTimersRef.current = [];
      document.body.style.overflow = '';
    };
  }, []);

  // Toast system
  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    const timer = setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
    toastTimersRef.current.push(timer);
  }, []);

  // Keep ref pointed at latest showToast
  useEffect(() => {
    showToastRef.current = showToast;
  }, [showToast]);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Helper to call latest showToast through ref
  const toast = useCallback((message, type, duration) => {
    showToastRef.current(message, type, duration);
  }, []);

  // Add to my list
  const addToMyList = useCallback((movie) => {
    if (!movie) return;
    setMyList((prev) => {
      if (prev.find((m) => m.id === movie.id)) {
        return prev;
      }
      return [...prev, movie];
    });
    toast(`✓ Added "${movie.title}" to My List`, 'success');
  }, [toast]);

  // Remove from my list
  const removeFromMyList = useCallback((movieId) => {
    setMyList((prev) => {
      const target = prev.find((m) => m.id === movieId);
      const next = prev.filter((m) => m.id !== movieId);
      if (target) {
        toast(`Removed "${target.title}" from My List`, 'info');
      }
      return next;
    });
  }, [toast]);

  // Toggle in my list
  const toggleMyList = useCallback((movie) => {
    if (!movie) return;
    setMyList((prev) => {
      const exists = prev.find((m) => m.id === movie.id);
      if (exists) {
        toast(`Removed "${movie.title}" from My List`, 'info');
        return prev.filter((m) => m.id !== movie.id);
      }
      toast(`✓ Added "${movie.title}" to My List`, 'success');
      return [...prev, movie];
    });
  }, [toast]);

  const isInMyList = useCallback(
    (movieId) => myList.some((m) => m.id === movieId),
    [myList]
  );

  // Navigation
  const navigate = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openMovie = useCallback((movie) => {
    setSelectedMovie(movie);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeMovie = useCallback(() => {
    setSelectedMovie(null);
    document.body.style.overflow = '';
  }, []);

  const openSearch = useCallback(() => {
    setIsSearchOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
    document.body.style.overflow = '';
  }, []);

  const value = {
    currentPage,
    navigate,
    myList,
    addToMyList,
    removeFromMyList,
    toggleMyList,
    isInMyList,
    selectedMovie,
    openMovie,
    closeMovie,
    isSearchOpen,
    openSearch,
    closeSearch,
    toasts,
    showToast,
    dismissToast
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within AppProvider');
  }
  return ctx;
};

export default AppContext;
