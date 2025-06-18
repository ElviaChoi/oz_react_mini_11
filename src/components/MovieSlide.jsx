import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"; // 모듈 추가
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import MovieCard from "./MovieCard";

function MovieSlide({ movies }) {
  return (
    <Swiper
      modules={[Navigation, Pagination]} // 필수: Swiper 기능 활성화
      spaceBetween={12} // 슬라이드 간격 (px)
      slidesPerView={5} // 한 화면에 보여줄 카드 개수
      navigation // 좌우 화살표 네비게이션 사용
      pagination={{ clickable: true }} // 페이지네이션 점 클릭 가능하게 설정
      loop={true} // 슬라이드 무한 반복
    >
      {movies.map((movie, index) => (
        <SwiperSlide key={movie.id} className={index === 0 ? "ml-16" : ""}>
          <div className="mb-12">
            <MovieCard
              id={movie.id}
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
