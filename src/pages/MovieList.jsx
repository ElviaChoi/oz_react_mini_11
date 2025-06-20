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
    <div className="min-h-screen bg-gray-100 p-4 space-y-10">
      {/* 추천 영화 슬라이드 */}
      <section>
        <h2 className="text-lg font-bold text-center mb-4">추천 영화</h2>
        <MovieSlide movies={movies.slice(0, 12)} />
      </section>

      {/* 인기 영화 리스트 */}
      <section>
        <h2 className="text-lg font-bold text-center mb-4">인기 영화 리스트</h2>
        <div className="flex flex-wrap justify-center gap-4">
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
