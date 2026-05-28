// src/components/MovieCard.tsx

import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { useFavorites } from '../hooks/useFavorites';
import type { Movie } from '../hooks/useFetchMovies';
import { useMotion } from '../motion';

import './MovieCard.css';

interface Props {
  movie: Movie;
  onClick?: () => void;
}

export function MovieCard({ movie, onClick }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();

  // 🎯 central motion system
  const { reduce, duration, easing } = useMotion();

  const [optimisticFav, setOptimisticFav] = useState<boolean | null>(null);

  const displayedFav = optimisticFav ?? isFavorite(movie.id);

  const handleToggle = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();

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

  // 🎯 JEDNE VARIANTS (zgodne z reduced motion)
  const variants = {
    hidden: {
      opacity: 0,
      y: reduce ? 0 : 16,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.div
      className="movie-card"
      onClick={onClick}
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        duration: duration.ui,
        ease: easing.out,
      }}

      // 🎯 micro interaction (hover)
      whileHover={
        reduce
          ? undefined
          : {
              scale: 1.03,
              transition: {
                duration: duration.micro,
                ease: easing.out,
              },
            }
      }

      whileTap={
        reduce ? undefined : { scale: 0.98 }
      }
    >
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
    </motion.div>
  );
}