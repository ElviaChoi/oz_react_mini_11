import { useSearchParams } from "react-router-dom";
import useSearchStore from "../../store/searchStore";
import MovieCard from "../../components/Movie/MovieCard";

function SearchResult() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const { searchResults, isLoading } = useSearchStore();

  return (
    <section className="pt-[180px] sm:pt-[120px] md:pt-[130px] min-h-[calc(100vh+100px)] bg-gray-950 text-gray-900 px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl pt-[60px] md:text-3xl font-bold text-center mb-8 text-sky-600">
          🎞 '{query}' 검색 결과 🎞
        </h2>

        {isLoading ? (
          <p className="text-center text-gray-500 text-lg mt-12">검색 중...</p>
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {searchResults.map((movie) => (
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
