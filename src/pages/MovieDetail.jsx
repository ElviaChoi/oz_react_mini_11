import { useState } from "react";
import movieDetailData from "../data/movieDetailData.json";

function MovieDetail() {
  const [movie] = useState(movieDetailData);

  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const genres = movie.genres.map((genre) => genre.name).join(", ");

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          gap: "20px",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {/* 왼쪽: 포스터 */}
        <div>
          <img
            src={imageUrl}
            alt={movie.title}
            style={{ width: "800px", borderRadius: "8px" }}
          />
        </div>

        {/* 오른쪽: 정보들 */}
        <div style={{ flexGrow: 1 }}>
          {/* 제목 + 평점 */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
              {movie.title}
            </h2>
            <p>⭐ 평점: {movie.vote_average.toFixed(1)}</p>
          </div>

          {/* 장르 */}
          <div style={{ marginBottom: "10px" }}>
            <strong>장르:</strong> {genres}
          </div>

          {/* 줄거리 */}
          <div>
            <strong>줄거리</strong>
            <p>{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
