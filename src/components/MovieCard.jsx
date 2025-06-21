import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../utils/apiUrls";

function MovieCard({ id, title, posterPath, voteAverage }) {
  const navigate = useNavigate();
  const imageUrl = getImageUrl(posterPath);

  const handleClick = () => {
    navigate(`/details/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer group bg-white/5 backdrop-blur-md border border-white/20 p-3 rounded-2xl shadow-2xl hover:scale-[1.03] transition-transform duration-300 w-full sm:w-[240px] md:w-[260px] lg:w-[280px]"
    >
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
