import { useState } from 'react';
import { InfiniteMovieList } from './components/InfiniteMovieList';
import { MovieModal } from './components/MovieModal';
import './styles/global.css';

function App() {
  const [query, setQuery] = useState('');

  // 🔥 NOWE: stan modala
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

      {/* 🔥 MODAL */}
      {selectedMovieId && (
        <MovieModal
          movieId={selectedMovieId}
          onClose={() => setSelectedMovieId(null)}
        />
      )}
    </div>
  );
}

export default App;