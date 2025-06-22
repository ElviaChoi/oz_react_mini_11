import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSearchMoviesUrl, getImageUrl } from "../utils/apiUrls";
import { TMDB_GET_OPTION } from "../constants";
import MovieCard from "../components/MovieCard";

function SearchResult() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const [results, setResults] = useState([]);
  const [bgImage, setBgImage] = useState("");

  useEffect(() => {
    if (query) {
      fetch(getSearchMoviesUrl(query), TMDB_GET_OPTION)
        .then((res) => res.json())
        .then((data) => {
          setResults(data.results);
          if (data.results.length > 0) {
            setBgImage(getImageUrl(data.results[0].backdrop_path));
          }
        });
    }
  }, [query]);

  return (
    <section
      className="min-h-screen bg-cover bg-center relative text-white"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="absolute inset-0 bg-gray-950 bg-opacity-70 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-300 to-white">
          🔍 ' {query} ' 검색 결과
        </h2>

        {results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {results.map((movie) => (
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
        ) : (
          <p className="text-center text-gray-300 text-lg mt-12">
            검색 결과가 없습니다.
          </p>
        )}
      </div>
    </section>
  );
}

export default SearchResult;
