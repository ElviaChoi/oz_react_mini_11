import { useEffect, useState } from "react";
import { getImageUrl } from "../utils/getImageUrl"; // 이미지 경로
import { useParams } from "react-router-dom";
import { getMovieDetailUrl, TMDB_GET_OPTION } from "../constants.js";

function MovieDetail() {
  const { id } = useParams(); // 경로에서 id 가져오는 부분
  const [movie, setMovie] = useState(undefined);

  const imageUrl = movie ? getImageUrl(movie.poster_path) : ""; // 이미지 경로 변경

  let genres = "";

  if (movie && movie.genres) {
    const genreNames = movie.genres.map((genre) => genre.name);
    genres = genreNames.join(", ");
  }

  useEffect(() => {
    fetch(getMovieDetailUrl(id), TMDB_GET_OPTION)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setMovie(res);
      });
  }, [id]);

  return (
    <>
      {movie ? (
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
      ) : (
        <div>로딩중</div>
      )}
    </>
  );
}

export default MovieDetail;
