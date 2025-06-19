import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../utils/apiUrls";

function MovieCard({ id, title, posterPath, voteAverage }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/details/${id}`);
  };

  const imageUrl = getImageUrl(posterPath);

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer w-48 bg-white p-2 rounded shadow hover:scale-105 transition"
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-[220px] object-cover rounded mb-2"
      />
      <h2 className="mt-2 font-semibold text-center h-[32px] overflow-hidden text-ellipsis whitespace-nowrap">
        {title}
      </h2>
      <p className="text-center text-sm text-gray-600">
        ⭐ {voteAverage.toFixed(1)}
      </p>
    </div>
  );
}

export default MovieCard;
