import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getImageUrl, getMovieDetailUrl } from "../utils/apiUrls";
import { TMDB_GET_OPTION } from "../constants";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(undefined);

  const imageUrl = movie ? getImageUrl(movie.poster_path) : "";

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
        <section className="p-5">
          <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto">
            {/* 왼쪽: 포스터 */}
            <div className="flex-shrink-0">
              <img
                src={imageUrl}
                alt={movie.title}
                className="w-full md:w-[400px] rounded-lg"
              />
            </div>

            {/* 오른쪽: 정보들 */}
            <div className="flex-grow space-y-4">
              {/* 제목 + 평점 */}
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{movie.title}</h2>
                <p className="text-gray-700">
                  ⭐ 평점: {movie.vote_average.toFixed(1)}
                </p>
              </div>

              {/* 장르 */}
              <div>
                <strong>장르:</strong> {genres}
              </div>

              {/* 줄거리 */}
              <div>
                <strong>줄거리</strong>
                <p className="text-gray-800 mt-1">{movie.overview}</p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="text-center mt-10 text-lg text-gray-500">로딩중...</div>
      )}
    </>
  );
}

export default MovieDetail;
