import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getImageUrl, getMovieDetailUrl } from "../../utils/apiUrls";
import { TMDB_GET_OPTION } from "../../constants";
import { useUserContext } from "../../supabase";
import useBookmark from "../../hooks/useBookmark";
import { MdPushPin, MdOutlinePushPin } from "react-icons/md";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const { user } = useUserContext();
  const { isBookmarked, addBookmark, removeBookmark } = useBookmark(Number(id));

  useEffect(() => {
    fetch(getMovieDetailUrl(id), TMDB_GET_OPTION)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [id]);

  if (!movie) {
    return (
      <div className="text-center text-gray-300 mt-10 text-lg">로딩중...</div>
    );
  }

  const backdropUrl = getImageUrl(movie.backdrop_path);
  const posterUrl = getImageUrl(movie.poster_path);
  const genres = movie.genres?.map((g) => g.name).join(", ");

  const handleBookmarkClick = () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (isBookmarked) {
      removeBookmark(Number(id));
    } else {
      addBookmark(Number(id));
    }
  };

  return (
    <section
      className="relative pt-[200px] sm:pt-[100px] md:pt-[130px] min-h-[calc(100vh+200px)] bg-cover bg-center text-white bg-[#0f172a]"
      style={{
        backgroundImage: movie.backdrop_path ? `url(${backdropUrl})` : "none",
      }}
    >
      {movie.backdrop_path && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0 pointer-events-none" />
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-center gap-12 text-center">
        {/* 포스터 */}
        <div className="relative group w-full md:w-[320px] lg:w-[380px] rounded-xl">
          {/* ⭐ 북마크 버튼 */}
          <button
            onClick={handleBookmarkClick}
            className="absolute top-5 right-4 z-20 text-6xl"
          >
            {isBookmarked ? (
              <MdPushPin className="text-red-500" />
            ) : (
              <MdOutlinePushPin className="text-sky-400" />
            )}
          </button>

          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover rounded-xl z-10 relative"
          />
          <div className="absolute -inset-3 rounded-2xl z-0 group-hover:bg-white/10 group-hover:blur-md transition duration-300" />
        </div>

        {/* 텍스트 정보 */}
        <div className="flex-1 space-y-6 max-w-xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-300 to-white">
            {movie.title}
          </h1>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-sky-200">
            <span className="bg-gray-800 rounded-full px-3 py-1 text-white">
              {movie.release_date?.slice(0, 4)}
            </span>
            <span className="bg-gray-800 rounded-full px-3 py-1">{genres}</span>
            <span className="bg-yellow-500 text-black rounded-full px-3 py-1 font-semibold">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>
          </div>

          <p className="text-base text-gray-100 leading-relaxed max-w-md mx-auto">
            {movie.overview}
          </p>
        </div>
      </div>
    </section>
  );
}

export default MovieDetail;
