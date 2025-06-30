export const filterSafeMovies = (movies) => {
  const bannedGenres = [10749]; //로맨스 영화 필터링
  const bannedKeywords = [
    "erotic",
    "adult",
    "sexual",
    "섹스",
    "성인",
    "노출",
    "야한",
    "nudity",
    "첫경험",
    "첫 경험",
    "bed",
    "리얼돌",
    "야동",
    "무삭제",
    "마사지",
    "출장",
    "행위",
    "정사",
    "야사",
    "sex",
    "porn",
    "nsfw",
    "xxx",
    "strip",
    "orgy",
    "escort",
    "threesome",
  ];

  return movies.filter((movie) => {
    const text = `${movie.title} ${movie.overview}`.toLowerCase();
    return (
      !movie.adult &&
      !movie.genre_ids?.some((id) => bannedGenres.includes(id)) &&
      !bannedKeywords.some((word) => text.includes(word))
    );
  });
};
