import { useEffect, useState } from 'react';
import { tmdbClient } from '../api/tmdbClient';

interface Props {
  movieId: number;
  onClose: () => void;
}

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  runtime?: number;
}

export function MovieModal({ movieId, onClose }: Props) {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const { data } = await tmdbClient.get<MovieDetails>(
          `/movie/${movieId}`
        );
        setMovie(data);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [movieId]);

  if (!movieId) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>

        {loading ? (
          <p>Ładowanie...</p>
        ) : (
          movie && (
            <>
              <h2>{movie.title}</h2>

              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : 'https://via.placeholder.com/300x450?text=No+Image'
                }
              />

              <p>{movie.overview}</p>

              <p>
                ⭐ {movie.vote_average} • {movie.release_date}
              </p>
            </>
          )
        )}
      </div>
    </div>
  );
}