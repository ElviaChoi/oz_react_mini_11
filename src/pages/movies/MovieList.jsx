import { useEffect, useState, useCallback } from "react";
import { getPopularMoviesUrl } from "../../utils/apiUrls";
import { TMDB_GET_OPTION } from "../../constants";
import MovieCard from "../../components/Movie/MovieCard";
import MovieSlide from "../../components/Movie/MovieSlide";
import useThrottle from "../../hooks/useThrottle";
import { filterSafeMovies } from "../../utils/filterMovies";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // 영화 데이터 호출 함수
  const fetchMovies = async (pageNum) => {
    setLoading(true);
    try {
      const res = await fetch(getPopularMoviesUrl(pageNum), TMDB_GET_OPTION);
      const data = await res.json();
      const filtered = filterSafeMovies(data.results);

      if (filtered.length === 0) {
        setHasMore(false);
      } else {
        setMovies((prev) => {
          const newMovies = [...prev, ...filtered];
          const uniqueMovies = Array.from(
            new Map(newMovies.map((movie) => [movie.id, movie])).values()
          );
          return uniqueMovies;
        });
      }
    } catch (err) {
      console.error("영화 불러오기 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  //  컴포넌트 진입 시 초기 데이터 로딩
  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  //  스크롤 이벤트 핸들러 (throttle 적용)
  const handleScroll = useCallback(
    useThrottle(() => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight;

      if (scrollTop + windowHeight >= fullHeight - 300 && hasMore && !loading) {
        setPage((prev) => prev + 1);
      }
    }, 300),
    [hasMore, loading]
  );

  // 스크롤 이벤트 등록
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="pt-[220px] sm:pt-[120px] md:pt-[120px] min-h-[calc(100vh+100px)] bg-gray-950 px-4 sm:px-6 lg:px-8 space-y-16 pb-24">
      {/* 🎬 추천 영화 섹션 */}
      <section>
        <h2 className="font-bold text-[34px] text-center text-white mb-2 pt-6">
          🎬 오늘의 추천 영화 🎬
        </h2>
        <p className="text-center text-sky-400 text-lg mb-10">
          Pickflix가 엄선한 지금 꼭 봐야 할 영화!
        </p>
        <MovieSlide movies={movies.slice(0, 12)} />
      </section>

      {/* 📈 인기 영화 리스트 */}
      <section>
        <h2 className="text-[30px] font-bold text-white text-center mb-6 tracking-tight">
          📈 지금 인기 있는 영화 📈
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

        {/* 로딩 및 종료 메시지 */}
        {loading && <p className="text-center text-sky-400 mt-8">로딩 중...</p>}
        {!hasMore && (
          <p className="text-center text-gray-500 mt-8">
            더 이상 불러올 영화가 없습니다.
          </p>
        )}
      </section>
    </div>
  );
}

export default MovieList;
