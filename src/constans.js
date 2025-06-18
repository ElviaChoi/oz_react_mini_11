export const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";

export const TMDB_MOVIE_API_BASE_URL = `${TMDB_API_BASE_URL}/movie`;

export const TMDB_GET_OPTION = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDP_READ_ACCESS_TOKEN}`,
  },
};

// MovieList에서 쓸 수 있는 popular 목록 URL
export const getPopularMoviesUrl = () =>
  `${TMDB_MOVIE_API_BASE_URL}/popular?language=ko`;

// MovieDetail에서 쓸 수 있는 상세 정보용 URL 생성 함수
export const getMovieDetailUrl = (id) =>
  `${TMDB_MOVIE_API_BASE_URL}/${id}?language=ko`;
