// src/components/InfiniteMovieList.tsx

import { useEffect, useRef } from 'react';
import { useInfiniteMovies } from '../hooks/useInfiniteMovies';
import { MovieCard } from './MovieCard';
import { SkeletonCard } from './SkeletonCard';

interface Props {
  query?: string;
  onSelectMovie?: (id: number) => void; // 🔥 DODANE
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

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];

        if (
          first.isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage
        ) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // 🔥 flatten stron
  const movies =
    data?.pages.flatMap((p) => p.results) ?? [];

  // 🔥 debug (możesz usunąć w produkcji)
  console.log(movies.map((m) => m.vote_average));
  console.log(movies.map((m) => m.title));

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
<div className="movies-grid">
  {movies.map((movie) => (
    <div
      key={movie.id}
      onClick={() =>
        onSelectMovie?.(movie.id)
      }
    >
      <MovieCard movie={movie} />
    </div>
  ))}
</div>

      {/* sentinel — infinite scroll trigger */}
      <div ref={sentinelRef} style={{ height: 1 }} />
    </>
  );
}