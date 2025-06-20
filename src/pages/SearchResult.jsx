import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSearchMoviesUrl } from "../utils/apiUrls";
import { TMDB_GET_OPTION } from "../constants";
import MovieCard from "../components/MovieCard";

function SearchResult() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      fetch(getSearchMoviesUrl(query), TMDB_GET_OPTION)
        .then((res) => res.json())
        .then((data) => {
          const filtered = data.results.filter((movie) => !movie.adult);
          setResults(filtered);
        });
    }
  }, [query]);

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      {/* 검색어 표시 */}
      <h2 className="text-xl font-bold mb-4 text-center">
        🔍 "{query}" 검색 결과
      </h2>

      {/* 결과 리스트 */}
      <div className="flex flex-wrap gap-4 justify-center">
        {results.length > 0 ? (
          results.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
              voteAverage={movie.vote_average}
            />
          ))
        ) : (
          <p className="text-gray-500">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default SearchResult;
