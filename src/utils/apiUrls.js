const BASE_URL = "https://api.themoviedb.org/3/movie";

export const getImageUrl = (path) => `https://image.tmdb.org/t/p/w500${path}`;

export const getPopularMoviesUrl = (page = 1) =>
  `${BASE_URL}/popular?language=ko&page=${page}`;

export const getMovieDetailUrl = (id) => `${BASE_URL}/${id}?language=ko`;

export const getSearchMoviesUrl = (query) =>
  `https://api.themoviedb.org/3/search/movie?language=ko&include_adult=false&query=${encodeURIComponent(
    query
  )}`;
