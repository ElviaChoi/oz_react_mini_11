// TMDb API 기본 URL (영화 전용)
const BASE_URL = "https://api.themoviedb.org/3/movie";

// 포스터 이미지 URL 생성
export const getImageUrl = (path) => `https://image.tmdb.org/t/p/w500${path}`;

// 인기 영화 목록 URL
export const getPopularMoviesUrl = () => `${BASE_URL}/popular?language=ko`;

// 영화 상세정보 URL
export const getMovieDetailUrl = (id) => `${BASE_URL}/${id}?language=ko`;

// 영화 검색 URL
export const getSearchMoviesUrl = (query) =>
  `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
    query
  )}&language=ko`;
