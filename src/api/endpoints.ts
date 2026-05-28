export const endpoints = {
  popularMovies: '/movie/popular',
  searchMovies: '/search/movie',
  movieDetails: (id: number) => `/movie/${id}`,
  genres: '/genre/movie/list',
};