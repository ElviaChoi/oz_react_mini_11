import { useEffect, useState } from "react";
import { getPopularMoviesUrl, TMDB_GET_OPTION } from "../constants.js";
import MovieCard from "../components/MovieCard";
import MovieSlide from "../components/MovieSlide";

function MovieList() {
  const [movies, setMovies] = useState([]); // TMDb에서 받아온 영화 목록을 저장할 상태

  useEffect(() => {
    fetch(getPopularMoviesUrl(), TMDB_GET_OPTION)
      .then((res) => res.json())
      .then((data) => {
        // 성인 콘텐츠 제외
        const filtered = data.results.filter((movie) => movie.adult === false);
        console.log(filtered);
        setMovies(filtered);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-10">
      {/* 영화 추천 슬라이드 */}
      <section>
        <h2 className="text-lg font-bold mb-2 text-center">추천 영화</h2>
        <MovieSlide movies={movies.slice(0, 12)} />
      </section>

      {/* 전체 영화 리스트 */}
      <section>
        <h2 className="text-lg font-bold mb-4 text-center">인기 영화 리스트</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
              voteAverage={movie.vote_average}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default MovieList;
