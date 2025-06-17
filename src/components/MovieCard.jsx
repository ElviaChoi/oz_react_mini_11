import { useNavigate } from "react-router-dom";

function MovieCard({ title, posterPath, voteAverage }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/details");
  };

  const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer w-48 bg-white p-2 rounded shadow hover:scale-105 transition"
    >
      <img src={imageUrl} alt={title} className="w-full h-auto rounded" />
      <h2 className="mt-2 font-semibold text-center">{title}</h2>
      <p className="text-center text-sm text-gray-600">⭐ {voteAverage}</p>
    </div>
  );
}

export default MovieCard;
