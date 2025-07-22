import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import bannerSlides from "../../../json/bannerSlides.json";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";

function BannerSlider() {
  return (
    <div className="w-full bg-white dark:bg-gray-900 rounded-md px-4 md:px-8">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        className="w-full max-w-[1220px] h-72 md:h-[400px] rounded-md mx-auto shadow-lg"
      >
        {bannerSlides.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-full rounded-md overflow-hidden shadow-md">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-in-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex flex-col justify-center items-center lg:items-start p-12 text-white rounded-md">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold drop-shadow-lg max-w-xl leading-snug">
                  <Typewriter
                    words={[item.title]}
                    loop={0}
                    cursor
                    cursorStyle="_"
                    typeSpeed={50}
                    deleteSpeed={40}
                    delaySpeed={1800}
                  />
                </h2>
                <p className="mt-3 text-sm sm:text-base md:text-lg max-w-xl text-white/90 drop-shadow">
                  {item.description}
                </p>
                <Link to="/apartment" className="mt-6 inline-block">
                  <button
                    type="button"
                    className="bg-[#ec5407] text-sm hover:bg-[#ff6e1a] focus:ring-4 focus:ring-orange-300 text-white font-semibold px-6 py-2 rounded-full shadow-lg transition duration-300 ease-in-out select-none"
                  >
                    Explore Apartments
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default BannerSlider;
