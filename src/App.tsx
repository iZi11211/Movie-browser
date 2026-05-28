import { useState } from 'react';
import { InfiniteMovieList } from './components/InfiniteMovieList';
import { MovieModal } from './components/MovieModal';
import { AnimatePresence } from 'framer-motion';
import './styles/global.css';

function App() {
  const [query, setQuery] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  return (
    <div className="app-container">
      <h1 className="page-title">🎬 Movie Browser</h1>

      <input
        className="search-input"
        type="text"
        placeholder="Szukaj filmów..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <InfiniteMovieList
        query={query}
        onSelectMovie={setSelectedMovieId}
      />

      {/* AnimatePresence WRAP dla modala */}
      <AnimatePresence mode="wait">
        {selectedMovieId && (
          <MovieModal
            key="movie-modal"
            movieId={selectedMovieId}
            onClose={() => setSelectedMovieId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;