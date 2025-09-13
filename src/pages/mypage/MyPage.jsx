import { useUserContext, useSupabaseAuth } from "../../supabase";
import { useState } from "react";
import MovieCard from "../../components/Movie/MovieCard";
import Avatar from "../../components/common/Avatar";
import { useToast } from "../../components/Toast";
import useBookmarkedMovies from "../../hooks/useBookmarkedMovies";
import StatusLayout from "../../components/common/StatusLayout";
import { TEXTS } from "../../constants";

function MyPage() {
  const { user, setUser } = useUserContext();
  const { updateUserName } = useSupabaseAuth();
  const { showToast } = useToast();

  const { movies, loading, error, syncBookmarks } = useBookmarkedMovies();

  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(user?.userName || "");

  if (!user) {
    return <div className="text-center mt-10 text-red-500">{TEXTS.loginRequired}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-950 px-4 pt-[240px] sm:pt-[140px] md:pt-[150px] pb-24 text-white">
      <div className="max-w-4xl mx-auto bg-white/5 rounded-xl backdrop-blur p-8 shadow-xl border border-white/20">
        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-8">
          <div className="mx-auto sm:mx-0">
            <Avatar user={user} size="lg" />
          </div>

          <div className="text-center sm:text-left space-y-2 w-full">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              {editing ? (
                <>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="bg-transparent border-b border-sky-400 text-white focus:outline-none text-base"
                  />
                  <button
                    onClick={async () => {
                      if (newName.trim() === "") {
                        showToast(TEXTS.enterNickname, "error");
                        return;
                      }
                      try {
                        const updated = await updateUserName(newName);
                        setUser(updated.user);
                        setEditing(false);
                      } catch (err) {
                        showToast(`${TEXTS.updateNicknameFailed}${err.message}`, "error");
                      }
                    }}
                    className="text-md text-green-400 hover:underline"
                  >
                    {TEXTS.save}
                  </button>
                  <button
                    onClick={() => {
                      setNewName(user.userName);
                      setEditing(false);
                    }}
                    className="text-md text-red-400 hover:underline"
                  >
                    {TEXTS.cancel}
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-sky-300">
                    {user.userName}
                  </h2>
                  <button
                    className="text-sm text-sky-400 hover:underline"
                    onClick={() => setEditing(true)}
                  >
                    {TEXTS.updateNickname}
                  </button>
                </>
              )}
            </div>
            <p className="text-gray-300">{user.email}</p>
          </div>
        </div>

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
      </div>
    </div>
  );
}

export default MyPage;
