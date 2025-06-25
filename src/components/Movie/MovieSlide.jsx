import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { getImageUrl } from "../../utils/apiUrls";
import { useNavigate } from "react-router-dom";

function MovieSlide({ movies }) {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={16}
      slidesPerView={4}
      navigation
      pagination={{ clickable: true }}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      className="max-w-screen-xl mx-auto"
    >
      {movies.map((movie, index) => (
        <SwiperSlide key={movie.id}>
          <div
            onClick={() => handleClick(movie.id)}
            className="relative cursor-pointer group hover:scale-105 transition-transform"
          >
            {/* 순번 뱃지 */}
            <div className="absolute top-4 left-4 w-12 h-12 rounded-full flex items-center justify-center z-10 bg-sky-500 backdrop-blur-md text-white text-[28px] font-bold shadow-md border border-white/30">
              {index + 1}
            </div>

            {/* 포스터 이미지 */}
            <img
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              className="w-full h-[460px] object-cover rounded-xl shadow-xl"
            />

            {/* 호버 시 타이틀 표시 */}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 px-4 py-3 text-white text-base text-center rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity">
              {movie.title}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default MovieSlide;
