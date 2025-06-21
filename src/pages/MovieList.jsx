import { useEffect, useState } from "react";
import { getPopularMoviesUrl } from "../utils/apiUrls";
import { TMDB_GET_OPTION } from "../constants";
import MovieCard from "../components/MovieCard";
import MovieSlide from "../components/MovieSlide";

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(getPopularMoviesUrl(), TMDB_GET_OPTION)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.results.filter((movie) => !movie.adult);
        setMovies(filtered);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 px-4 sm:px-6 lg:px-8 space-y-16 pb-24">
      {/* 추천 영화 슬라이드 */}
      <section>
        <h2 className="font-bold text-[46px] text-center text-white mb-2 pt-6">
          🎬 오늘의 추천 영화 🎬
        </h2>
        <p className="text-center text-sky-400 text-lg mb-10">
          Pickflix가 엄선한 지금 꼭 봐야 할 영화!
        </p>

        <MovieSlide movies={movies.slice(0, 12)} />
      </section>

      {/* 인기 영화 리스트 */}
      <section>
        <h2 className="text-3xl font-bold text-white text-center mb-6 tracking-tight">
          📈 지금 인기 있는 영화
        </h2>
        <p className="text-center text-sky-400 mb-10 text-base">
          실시간으로 가장 많은 추천을 받은 작품들을 모았습니다.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 max-w-screen-xl mx-auto px-4">
          {movies.map((movie) => (
            <div className="flex justify-center" key={movie.id}>
              <MovieCard
                id={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
                voteAverage={movie.vote_average}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default MovieList;
