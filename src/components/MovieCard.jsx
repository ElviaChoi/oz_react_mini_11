function MovieCard({ title, posterPath, voteAverage }) {
  const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

  return (
    <div className="w-60 bg-white p-4 rounded shadow text-center">
      <img src={imageUrl} alt={title} className="rounded mb-2" />
      <h3 className="text-lg font-bold">{title}</h3>
      <p>평점: {voteAverage}</p>
    </div>
  );
}

export default MovieCard;
