import { useState } from "react";
import movieListData from "./data/movieListData.json";
import MovieCard from "./components/MovieCard";

function App() {
  const [movies] = useState(movieListData.results); //movieListData 에 있는 results

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-xl font-bold mb-4 text-center">인기 영화 리스트</h1>

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
    </div>
  );
}

export default App;
