import MovieCard from "../Movie/MovieCard";
import useBookmarkedMovies from "../../hooks/useBookmarkedMovies";
import StatusLayout from "../common/StatusLayout";
import { TEXTS } from "../../constants";

const BookmarkList = () => {
  const { movies, loading, error, syncBookmarks } = useBookmarkedMovies();

  return (
    <div className="mt-12 border-t border-white/10 pt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-sky-300">
          📌 나의 북마크
        </h3>
        <button
          className="text-red-400 hover:text-red-600 text-base"
          onClick={() => {
            if (confirm(TEXTS.confirmDeleteAllBookmarks)) {
              localStorage.removeItem("bookmarks");
              syncBookmarks();
            }
          }}
        >
          모두 삭제 🗑️
        </button>
      </div>

      <StatusLayout
        isLoading={loading}
        error={error}
        loadingMessage={TEXTS.bookmarksLoading}
        errorMessage={TEXTS.bookmarksLoadFailed}
      >
        {movies.length === 0 ? (
          <p className="text-gray-500">{TEXTS.noBookmarks}</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
                voteAverage={movie.vote_average}
                onBookmarkChange={syncBookmarks}
              />
            ))}
          </div>
        )}
      </StatusLayout>
    </div>
  );
};

export default BookmarkList;
