import { useState } from 'react';
import { InfiniteMovieList } from './components/InfiniteMovieList';
import { MovieModal } from './components/MovieModal';
import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from './components/ToastContainer';
import './styles/global.css';

function App() {
  const [query, setQuery] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);

  const addToast = (message: string) => {
    const id = Date.now();

    setToasts((prev) => [...prev, { id, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2000);
  };

  return (
    <div className="app-container">
      <h1 className="page-title">🎬 Movie Browser</h1>

      <input
        className="search-input"
        type="text"
        placeholder="Szukaj filmów..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          addToast('🔎 Szukanie...');
        }}
      />

      <InfiniteMovieList
        query={query}
        onSelectMovie={(id) => {
          setSelectedMovieId(id);
          addToast('🎬 Film otwarty');
        }}
      />

      <AnimatePresence mode="wait">
        {selectedMovieId && (
          <MovieModal
            key="movie-modal"
            movieId={selectedMovieId}
            onClose={() => setSelectedMovieId(null)}
          />
        )}
      </AnimatePresence>

      {/* 🍞 TOASTS (TO BRAKOWAŁO) */}
      <ToastContainer toasts={toasts} />
    </div>
  );
}

export default App;