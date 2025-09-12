import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSearchMoviesUrl } from "../../utils/apiUrls";
import { TMDB_GET_OPTION } from "../../constants";
import MovieCard from "../../components/Movie/MovieCard";
import { filterSafeMovies } from "../../utils/filterMovies";
import axios from 'axios';

function SearchResult() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query) {
        try {
          const response = await axios.get(getSearchMoviesUrl(query), TMDB_GET_OPTION);
          setResults(filterSafeMovies(response.data.results));
        } catch (error) {
          console.error("Error fetching search results:", error);
          setResults([]);
        }
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <section className="pt-[180px] sm:pt-[120px] md:pt-[130px] min-h-[calc(100vh+100px)] bg-gray-950 text-gray-900 px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl pt-[60px] md:text-3xl font-bold text-center mb-8 text-sky-600">
          🎞 '{query}' 검색 결과 🎞
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
          <p className="text-center text-gray-500 text-lg mt-12">
            검색 결과가 없습니다.
          </p>
        )}
      </div>
    </section>
  );
}

export default SearchResult;
