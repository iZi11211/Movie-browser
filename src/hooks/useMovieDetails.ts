// src/hooks/useMovieDetails.ts

import { useQuery } from '@tanstack/react-query';

import { tmdbClient } from '../api/tmdbClient';

import { QUERY_KEYS } from '../constants/queryKeys';

export interface MovieDetails {
  id: number;

  title: string;

  overview: string;

  poster_path: string | null;

  backdrop_path: string | null;

  release_date: string;

  runtime: number;

  vote_average: number;

  genres: {
    id: number;
    name: string;
  }[];
}

export function useMovieDetails(
  id: number | null
) {
  return useQuery({
    queryKey:
      QUERY_KEYS.movies.detail(
        id ?? 0
      ),

    queryFn: async () => {
      const { data } =
        await tmdbClient.get<MovieDetails>(
          `/movie/${id}`
        );

      return data;
    },

    enabled: id !== null,
  });
}