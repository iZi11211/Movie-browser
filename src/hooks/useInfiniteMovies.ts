// src/hooks/useInfiniteMovies.ts

import { useInfiniteQuery } from '@tanstack/react-query';
import { tmdbClient } from '../api/tmdbClient';

interface MoviesResponse {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}

export function useInfiniteMovies(query = '') {
  return useInfiniteQuery({
    queryKey: ['movies', 'infinite', query],

    initialPageParam: 1,

    queryFn: async ({ pageParam }) => {
      const endpoint = query
        ? '/search/movie'
        : '/movie/popular';

      const { data } = await tmdbClient.get<MoviesResponse>(
        endpoint,
        {
          params: {
            page: pageParam,
            ...(query ? { query } : {}),
          },
        }
      );

      return data;
    },

    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;

      return nextPage <= lastPage.total_pages
        ? nextPage
        : undefined;
    },
  });
}