import { useState } from 'react';
import { InfiniteMovieList } from './components/InfiniteMovieList';
import { MovieModal } from './components/MovieModal';
import { ToastContainer } from './components/ToastContainer';
import './styles/global.css';

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [toasts, setToasts] = useState<any[]>([]);

  const addToast = (message: string) => {
    const id = Date.now();
    setToasts((p) => [...p, { id, message }]);

    setTimeout(() => {
      setToasts((p) => p.filter((t) => t.id !== id));
    }, 2000);
  };

  return (
    <div className="app-container">
      <h1 className="page-title">🎬 Movie Browser</h1>

      <input
        className="search-input"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          addToast('🔎 Szukanie...');
        }}
      />

      <InfiniteMovieList
        query={query}
        onSelectMovie={(id: number) => {
          setSelectedMovieId(id);
          addToast('🎬 Film otwarty');
        }}
      />

      {selectedMovieId && (
        <MovieModal
          movieId={selectedMovieId}
          onClose={() => setSelectedMovieId(null)}
        />
      )}

      <ToastContainer toasts={toasts} />
    </div>
  );
}