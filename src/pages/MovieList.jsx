import { useState } from "react";
import movieListData from "../data/movieListData.json";
import MovieCard from "../components/MovieCard";
import MovieSlide from "../components/MovieSlide";

function MovieList() {
  const [movies] = useState(movieListData.results);

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
