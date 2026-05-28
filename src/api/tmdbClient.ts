// src/api/tmdbClient.ts

import axios from 'axios';

export const tmdbClient =
  axios.create({
    baseURL:
      import.meta.env
        .VITE_TMDB_BASE_URL,

    params: {
      api_key:
        import.meta.env
          .VITE_TMDB_API_KEY,

      language: 'pl-PL',
    },
  });

tmdbClient.interceptors.response.use(
  (response) => response,

  (error) => {
    console.error(
      'TMDB API ERROR:',
      error
    );

    return Promise.reject(error);
  }
);