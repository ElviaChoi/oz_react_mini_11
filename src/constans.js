export const IMAGE_BASE_URL = "";

export const TMDB_MOVIE_API_BASE_URL = "https://api.themoviedb.org/3/movie";

export const TMDB_GET_OPTION = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDP_READ_ACCESS_TOKEN}`,
  },
};
