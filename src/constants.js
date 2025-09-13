export const TMDB_GET_OPTION = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN}`,
  },
};

export const PATHS = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  MYPAGE: "/mypage",
  SEARCH: "/search",
  MOVIE_DETAIL: "/details",
};

export const TEXTS = {
  // General
  loading: "로딩중...",
  loadingFailed: "데이터를 불러오는데 실패했습니다.",
  loginRequired: "로그인이 필요합니다.",

  // Movies
  movieLoadFailed: "영화 정보를 불러오는데 실패했습니다.",
  noMoreMovies: "더 이상 불러올 영화가 없습니다.",

  // Search
  searching: "검색 중...",
  noSearchResults: "검색 결과가 없습니다.",

  // Bookmarks
  bookmarksLoading: "북마크를 불러오는 중...",
  bookmarksLoadFailed: "북마크를 불러오는데 실패했습니다.",
  noBookmarks: "아직 북마크한 영화가 없습니다.",
  confirmDeleteAllBookmarks: "북마크를 모두 삭제하시겠습니까?",

  // MyPage
  updateNickname: "닉네임 수정",
  save: "저장",
  cancel: "취소",
  enterNickname: "닉네임을 입력해주세요",
  updateNicknameFailed: "닉네임 변경 실패: ",

  // Signup
  signupSuccess: "회원가입 성공!",
  signupFailed: "회원가입 실패: ",

  // Login
  loginFailed: "로그인 실패: ",
};