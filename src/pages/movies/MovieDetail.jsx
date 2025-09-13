import { useParams } from "react-router-dom";
import { getImageUrl } from "../../utils/apiUrls";
import { useUserContext } from "../../supabase";
import useBookmark from "../../hooks/useBookmark";
import { MdPushPin, MdOutlinePushPin } from "react-icons/md";
import { useToast } from "../../components/Toast";
import useMovieDetail from "../../hooks/useMovieDetail";
import StatusLayout from "../../components/common/StatusLayout";
import { TEXTS } from "../../constants";

function MovieDetail() {
  const { id } = useParams();
  const { movie, loading, error } = useMovieDetail(id);
  const { user } = useUserContext();
  const { isBookmarked, addBookmark, removeBookmark } = useBookmark(Number(id));
  const { showToast } = useToast();

  const handleBookmarkClick = () => {
    if (!user) {
      showToast(TEXTS.loginRequired, "error");
      return;
    }

    if (isBookmarked) {
      removeBookmark(Number(id));
    } else {
      addBookmark(Number(id));
    }
  };

  return (
    <StatusLayout
      isLoading={loading}
      error={error}
      errorMessage={TEXTS.movieLoadFailed}
    >
      {movie && (
        <section
          className="relative pt-[200px] sm:pt-[100px] md:pt-[130px] min-h-[calc(100vh+200px)] bg-cover bg-center text-white bg-[#0f172a]"
          style={{
            backgroundImage: movie.backdrop_path
              ? `url(${getImageUrl(movie.backdrop_path)})`
              : "none",
          }}
        >
          {movie.backdrop_path && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0 pointer-events-none" />
          )}

          <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-center gap-12 text-center">
            <div className="relative group w-full md:w-[320px] lg:w-[380px] rounded-xl">
              <button
                onClick={handleBookmarkClick}
                className="absolute top-5 right-4 z-20 text-6xl"
                aria-label={isBookmarked ? "북마크 제거" : "북마크 추가"}
              >
                {isBookmarked ? (
                  <MdPushPin className="text-red-500" />
                ) : (
                  <MdOutlinePushPin className="text-sky-400" />
                )}
              </button>

              <img
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                className="w-full h-full object-cover rounded-xl z-10 relative"
              />
              <div className="absolute -inset-3 rounded-2xl z-0 group-hover:bg-white/10 group-hover:blur-md transition duration-300" />
            </div>

            <div className="flex-1 space-y-6 max-w-xl mx-auto relative z-10">
              <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-300 to-white">
                {movie.title}
              </h1>

              <div className="flex flex-wrap justify-center gap-4 text-sm text-sky-200">
                <span className="bg-gray-800 rounded-full px-3 py-1 text-white">
                  {movie.release_date?.slice(0, 4)}
                </span>
                <span className="bg-gray-800 rounded-full px-3 py-1">
                  {movie.genres?.map((g) => g.name).join(", ")}
                </span>
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
      )}
    </StatusLayout>
  );
}

export default MovieDetail;
