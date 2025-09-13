import MovieCard from "../../components/Movie/MovieCard";
import MovieSlide from "../../components/Movie/MovieSlide";
import useMovies from "../../hooks/useMovies";
import { TEXTS } from "../../constants";
import SkeletonCard from "../../components/skeletons/SkeletonCard";

function MovieList() {
  const { movies, loading, hasMore, error } = useMovies();
  const initialLoading = loading && movies.length === 0;

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10 text-lg">
        {TEXTS.movieLoadFailed}
      </div>
    );
  }

  return (
    <div className='pt-[220px] sm:pt-[120px] md:pt-[120px] min-h-[calc(100vh+100px)] bg-gray-950 px-4 sm:px-6 lg:px-8 space-y-16 pb-24'>
      <section>
        <h2 className='font-bold text-[34px] text-center text-white mb-2 pt-6'>
          🎬 오늘의 추천 영화 🎬
        </h2>
        <p className='text-center text-sky-400 text-lg mb-10'>
          Pickflix가 엄선한 지금 꼭 봐야 할 영화!
        </p>
        {initialLoading ? (
          <div className='flex overflow-x-auto space-x-4 px-4 pb-4'>
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className='flex-shrink-0 w-[240px]'>
                <SkeletonCard />
              </div>
            ))}
          </div>
        ) : (
          <MovieSlide movies={movies.slice(0, 12)} />
        )}
      </section>

      <section>
        <h2 className='text-[30px] font-bold text-white text-center mb-6 tracking-tight'>
          📈 지금 인기 있는 영화 📈
        </h2>
        <p className='text-center text-sky-400 mb-10 text-base'>
          실시간으로 가장 많은 추천을 받은 작품들을 모았습니다.
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 max-w-screen-xl mx-auto px-4'>
          {initialLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <div className='flex justify-center' key={index}>
                  <SkeletonCard />
                </div>
              ))
            : movies.map((movie) => (
                <div className='flex justify-center' key={movie.id}>
                  <MovieCard
                    id={movie.id}
                    title={movie.title}
                    posterPath={movie.poster_path}
                    voteAverage={movie.vote_average}
                  />
                </div>
              ))}
        </div>

        {loading && !initialLoading && (
          <p className='text-center text-sky-400 mt-8'>{TEXTS.loading}</p>
        )}
        {!hasMore && (
          <p className='text-center text-gray-500 mt-8'>
            {TEXTS.noMoreMovies}
          </p>
        )}
      </section>
    </div>
  );
}

export default MovieList;
