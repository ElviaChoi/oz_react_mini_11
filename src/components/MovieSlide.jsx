import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"; // 모듈 추가
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import MovieCard from "./MovieCard";

function MovieSlide({ movies }) {
  return (
    <Swiper
      modules={[Navigation, Pagination]} //필수: Swiper 기능 활성화
      spaceBetween={10}
      slidesPerView={6}
      navigation
      pagination={{ clickable: true }}
      loop={true}
    >
      {movies.map((movie, index) => (
        <SwiperSlide key={movie.id} className={index === 0 ? "ml-18" : ""}>
          <div className="mb-12">
            <MovieCard
              title={movie.title}
              posterPath={movie.poster_path}
              voteAverage={movie.vote_average}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default MovieSlide;
