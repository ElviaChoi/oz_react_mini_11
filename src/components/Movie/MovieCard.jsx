import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../utils/apiUrls";
import { useUserContext } from "../../supabase";
import useBookmark from "../../hooks/useBookmark";
import { MdPushPin, MdOutlinePushPin } from "react-icons/md";

function MovieCard({ id, title, posterPath, voteAverage, onBookmarkChange }) {
  const navigate = useNavigate();
  const imageUrl = getImageUrl(posterPath);

  const { user } = useUserContext();
  const { isBookmarked, addBookmark, removeBookmark } = useBookmark(id);

  const handleClick = () => {
    navigate(`/details/${id}`);
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (isBookmarked) {
      removeBookmark(id);
    } else {
      addBookmark(id);
    }

    if (onBookmarkChange) {
      onBookmarkChange(); // 상위 컴포넌트에 변경 알림
    }
  };

  return (
    <div
      onClick={handleClick}
      className="relative cursor-pointer group bg-white/5 backdrop-blur-md border border-white/20 p-3 rounded-2xl shadow-2xl hover:scale-[1.03] transition-transform duration-300 w-full sm:w-[240px] md:w-[260px] lg:w-[280px]"
    >
      <button
        onClick={handleBookmarkClick}
        className="absolute top-5 right-5 z-10 text-gray-100 text-3xl"
      >
        {isBookmarked ? (
          <MdPushPin className="text-red-500 text-4xl" />
        ) : (
          <MdOutlinePushPin className="text-sky-500 text-4xl" />
        )}
      </button>

      {/* 이미지 */}
      <div className="relative overflow-hidden rounded-xl shadow-lg">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-[340px] object-cover rounded-xl group-hover:brightness-110 group-hover:blur-[1px] transition duration-300"
        />
      </div>
      {/* 타이틀 + 평점 */}
      <div className="mt-4 flex justify-between items-center text-white">
        <h2 className="text-base font-semibold truncate pr-2 mr-2">{title}</h2>
        <span className="whitespace-nowrap bg-yellow-300 text-black font-semibold px-4 py-1 text-sm rounded-lg shadow-md">
          ⭐ {voteAverage.toFixed(1)}
        </span>
      </div>
    </div>
  );
}

export default MovieCard;
