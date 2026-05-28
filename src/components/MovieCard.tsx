// src/components/MovieCard.tsx

import { useCallback, useState } from 'react';
import { useFavorites } from '../hooks/useFavorites';
import type { Movie } from '../hooks/useFetchMovies';

import './MovieCard.css';

interface Props {
  movie: Movie;
  onClick?: () => void; // 🔥 DODANE: otwieranie modala
}

export function MovieCard({ movie, onClick }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const [optimisticFav, setOptimisticFav] = useState<boolean | null>(null);

  const displayedFav = optimisticFav ?? isFavorite(movie.id);

  const handleToggle = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation(); // 🔥 nie otwieraj modala przy kliknięciu ❤️

      setOptimisticFav(!displayedFav);

      try {
        await toggleFavorite(movie);
        setOptimisticFav(null);
      } catch {
        setOptimisticFav(null);
      }
    },
    [displayedFav, toggleFavorite, movie]
  );

  return (
    <div className="movie-card" onClick={onClick}>
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'https://via.placeholder.com/300x450?text=No+Image'
        }
        alt={movie.title}
      />

      <div className="movie-content">
        <h3>{movie.title}</h3>

        <p>
          {movie.release_date?.slice(0, 4)} • ⭐{' '}
          {movie.vote_average?.toFixed(1)}
        </p>

        <button
          onClick={handleToggle}
          aria-label={
            displayedFav
              ? 'Usuń z ulubionych'
              : 'Dodaj do ulubionych'
          }
          className={`fav-btn ${displayedFav ? 'active' : ''}`}
        >
          {displayedFav ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  );
}