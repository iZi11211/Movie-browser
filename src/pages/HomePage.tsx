// przykładowe użycie wszystkich stanów UI
// src/pages/HomePage.tsx

import { useState } from 'react';

import { useFetchMovies } from '../hooks/useFetchMovies';
import { useDebounce } from '../hooks/useDebounce';

import { MovieCard } from '../components/MovieCard';
import { SkeletonCard } from '../components/SkeletonCard';
import { ErrorBanner } from '../components/ErrorBanner';
import { EmptyState } from '../components/EmptyState';

export default function HomePage() {
  const [page, setPage] =
    useState(1);

  const [query, setQuery] =
    useState('');

  const debouncedQuery =
    useDebounce(query, 300);

  const {
    data,
    isLoading,
    isError,
    isSuccess,
    isPlaceholderData,
    error,
    refetch,
  } = useFetchMovies(
    page,
    debouncedQuery
  );

  if (isLoading) {
    return (
      <div className="movies-grid">
        {Array.from({
          length: 12,
        }).map((_, index) => (
          <SkeletonCard
            key={index}
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorBanner
        message={
          error instanceof Error
            ? error.message
            : 'Unknown error'
        }
        onRetry={() =>
          refetch()
        }
      />
    );
  }

  if (
    data?.results.length === 0
  ) {
    return <EmptyState />;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) =>
          setQuery(
            e.target.value
          )
        }
      />

      {isSuccess && (
        <div
          className="movies-grid"
          style={{
            opacity:
              isPlaceholderData
                ? 0.5
                : 1,
            transition:
              'opacity 0.2s',
          }}
        >
          {data?.results.map(
            (movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
              />
            )
          )}
        </div>
      )}

      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() =>
            setPage((prev) =>
              prev - 1
            )
          }
        >
          Previous
        </button>

        <span>
          Page {page}
        </span>

        <button
          onClick={() =>
            setPage((prev) =>
              prev + 1
            )
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}