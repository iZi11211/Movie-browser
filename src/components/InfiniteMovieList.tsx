import { useEffect, useRef, useState } from 'react';
import { Reorder } from 'framer-motion';
import { useInfiniteMovies } from '../hooks/useInfiniteMovies';
import { MovieCard } from './MovieCard';
import { SkeletonCard } from './SkeletonCard';

interface Props {
  query?: string;
  onSelectMovie?: (id: number) => void;
}

export function InfiniteMovieList({
  query = '',
  onSelectMovie,
}: Props) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteMovies(query);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const [orderedMovies, setOrderedMovies] = useState<any[]>([]);

  // 🔥 SAFE INIT (no crashes)
  useEffect(() => {
    const movies =
      data?.pages?.flatMap((p) => p.results) ?? [];

    if (movies.length > 0) {
      setOrderedMovies(movies);
    }
  }, [data]);

  // 🔥 infinite scroll SAFE
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage
        ) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <div className="movies-grid">
        {Array.from({ length: 12 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return <p>Błąd ładowania danych</p>;
  }

  return (
    <>
      {/* 🔥 ONLY REORDER (NO motion wrapper!) */}
      <Reorder.Group
        axis="y"
        values={orderedMovies}
        onReorder={setOrderedMovies}
        className="movies-grid"
      >
        {orderedMovies.map((movie) => (
          <Reorder.Item
            key={movie.id}
            value={movie}
            whileDrag={{ scale: 1.03 }}
            style={{
              listStyle: 'none',
              cursor: 'grab',
            }}
            onClick={() => onSelectMovie?.(movie.id)}
          >
            <MovieCard movie={movie} />
          </Reorder.Item>
        ))}
      </Reorder.Group>

      <div ref={sentinelRef} style={{ height: 1 }} />
    </>
  );
}