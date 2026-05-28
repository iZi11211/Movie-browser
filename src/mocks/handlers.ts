// src/mocks/handlers.ts

import {
  delay,
  http,
  HttpResponse,
} from 'msw';

const TMDB_BASE =
  'https://api.themoviedb.org/3';

export const handlers = [
  // =========================
  // POPULAR MOVIES
  // =========================

  http.get(
    `${TMDB_BASE}/movie/popular`,
    async ({ request }) => {
      await delay(800);

      const url = new URL(
        request.url
      );

      const page = Number(
        url.searchParams.get(
          'page'
        ) ?? 1
      );

      return HttpResponse.json({
        page,

        total_pages: 10,

        total_results: 200,

        results: Array.from(
          { length: 20 },
          (_, i) => ({
            id:
              page * 100 + i,

            title: `Film testowy ${page}-${
              i + 1
            }`,

            overview:
              'Opis testowego filmu.',

            poster_path:
              null,

            release_date:
              '2024-01-01',

            vote_average: 7.5,

            genre_ids: [
              28,
              12,
            ],
          })
        ),
      });
    }
  ),

  // =========================
  // SEARCH MOVIES
  // =========================

  http.get(
    `${TMDB_BASE}/search/movie`,
    async ({ request }) => {
      await delay(500);

      const url = new URL(
        request.url
      );

      const query =
        url.searchParams.get(
          'query'
        ) ?? '';

      if (
        query.toLowerCase() ===
        'empty'
      ) {
        return HttpResponse.json({
          page: 1,

          results: [],

          total_pages: 0,

          total_results: 0,
        });
      }

      return HttpResponse.json({
        page: 1,

        total_pages: 1,

        total_results: 2,

        results: [
          {
            id: 1,

            title:
              'Batman Begins',

            overview:
              'Bruce Wayne becomes Batman.',

            poster_path:
              null,

            release_date:
              '2005-06-15',

            vote_average: 8.2,

            genre_ids: [28],
          },

          {
            id: 2,

            title:
              'The Dark Knight',

            overview:
              'Batman vs Joker.',

            poster_path:
              null,

            release_date:
              '2008-07-18',

            vote_average: 9.0,

            genre_ids: [28],
          },
        ],
      });
    }
  ),

  // =========================
  // MOVIE DETAILS
  // =========================

  http.get(
    `${TMDB_BASE}/movie/:id`,
    async ({ params }) => {
      await delay(400);

      return HttpResponse.json({
        id: params.id,

        title:
          'Mockowany film',

        overview:
          'Szczegóły mockowanego filmu.',

        poster_path:
          null,

        backdrop_path:
          null,

        release_date:
          '2024-01-01',

        runtime: 120,

        vote_average: 7.8,

        genres: [
          {
            id: 28,
            name: 'Action',
          },
        ],
      });
    }
  ),

  // =========================
  // GENRES
  // =========================

  http.get(
    `${TMDB_BASE}/genre/movie/list`,
    () => {
      return HttpResponse.json({
        genres: [
          {
            id: 28,
            name: 'Action',
          },

          {
            id: 35,
            name: 'Comedy',
          },

          {
            id: 18,
            name: 'Drama',
          },
        ],
      });
    }
  ),

  // =========================
  // AUTH ERROR
  // =========================

  http.get(
    `${TMDB_BASE}/movie/error`,
    () => {
      return HttpResponse.json(
        {
          status_message:
            'Invalid API key.',
        },
        {
          status: 401,
        }
      );
    }
  ),

  // =========================
  // SERVER ERROR
  // =========================

  http.get(
    `${TMDB_BASE}/movie/server-error`,
    () => {
      return HttpResponse.json(
        {
          message:
            'Internal Server Error',
        },
        {
          status: 500,
        }
      );
    }
  ),

  // =========================
  // RICK & MORTY
  // =========================

  http.get(
    'https://rickandmortyapi.com/api/character',
    () => {
      return HttpResponse.json({
        info: {
          count: 2,

          pages: 1,

          next: null,
        },

        results: [
          {
            id: 1,

            name:
              'Rick Sanchez',

            status:
              'Alive',

            species:
              'Human',

            image: '',
          },

          {
            id: 2,

            name:
              'Morty Smith',

            status:
              'Alive',

            species:
              'Human',

            image: '',
          },
        ],
      });
    }
  ),
];