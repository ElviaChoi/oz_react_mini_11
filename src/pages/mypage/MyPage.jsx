import { useUserContext } from "../../supabase";
import { useEffect, useState, useCallback } from "react";
import MovieCard from "../../components/Movie/MovieCard";
import { getMovieDetailUrl } from "../../utils/apiUrls";
import { TMDB_GET_OPTION } from "../../constants";

function MyPage() {
  const { user } = useUserContext();
  const [loading, setLoading] = useState(true);
  const [bookmarkIds, setBookmarkIds] = useState([]);
  const [movies, setMovies] = useState([]);

  const syncBookmarks = useCallback(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarkIds(saved);
  }, []);

  useEffect(() => {
    syncBookmarks();
    setLoading(false);
  }, [user, syncBookmarks]);

  useEffect(() => {
    const fetchMovies = async () => {
      const promises = bookmarkIds.map((id) =>
        fetch(getMovieDetailUrl(id), TMDB_GET_OPTION).then((res) => res.json())
      );
      const results = await Promise.all(promises);
      setMovies(results);
    };

    if (bookmarkIds.length > 0) {
      fetchMovies();
    } else {
      setMovies([]);
    }
  }, [bookmarkIds]);

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-400">
        유저 정보를 불러오는 중입니다...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center mt-10 text-red-500">로그인이 필요합니다.</div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4 py-[180px]">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
          <div className="w-32 h-32 bg-sky-400 text-white rounded-full ml-6 mr-7 flex items-center justify-center text-4xl font-bold">
            {user.email?.charAt(0).toUpperCase()}
          </div>

          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <h2 className="text-2xl font-semibold">{user.userName}</h2>
              <button className="text-sm text-sky-500 hover:underline">
                닉네임 수정
              </button>
            </div>
            <p className="text-gray-600 mt-1">{user.email}</p>
            <button className="mt-4 text-sm text-sky-500 hover:underline">
              프로필 이미지 수정
            </button>
          </div>
        </div>

        {/* 북마크 */}
        <div className="mt-12 border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">북마크</h3>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => {
                if (confirm("북마크를 모두 삭제하시겠습니까?")) {
                  localStorage.removeItem("bookmarks");
                  syncBookmarks();
                }
              }}
            >
              🗑️
            </button>
          </div>

          {movies.length === 0 ? (
            <p className="text-gray-500">아직 북마크한 영화가 없습니다.</p>
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
        </div>
      </div>
    </div>
  );
}

export default MyPage;
