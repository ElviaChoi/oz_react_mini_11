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
      spaceBetween={20}
      slidesPerView={4}
      navigation
      pagination={{ clickable: true }}
      loop={true}
    >
      {movies.map((movie) => (
        <SwiperSlide key={movie.id}>
          <MovieCard
            title={movie.title}
            posterPath={movie.poster_path}
            voteAverage={movie.vote_average}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default MovieSlide;
