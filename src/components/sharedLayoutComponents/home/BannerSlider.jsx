import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import bannerSlides from "../../../json/bannerSlides.json";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";

function BannerSlider() {
  return (
    <div className="w-full dark:bg-gray-900 md:rounded-md relative">
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
        className="w-full max-w-7xl h-72 md:h-[400px]"
      >
        {bannerSlides.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-full rounded-sm overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center min-h-full"
              />
              <p className="absolute top-4 right-4 text-xs md:text-sm bg-black/50 text-white px-3 py-1 rounded-full z-20">
                {i + 1} / {bannerSlides.length}
              </p>
              <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/20 backdrop-blur-[1px] rounded-md p-6 text-white flex flex-col justify-center items-start">
                <h1 className="text-2xl md:text-3xl font-extrabold drop-shadow-md animate-fadeIn ml-6 md:ml-10">
                  <Typewriter
                    words={[item.title]}
                    loop={0}
                    cursor
                    cursorStyle="_"
                    typeSpeed={60}
                    deleteSpeed={30}
                    delaySpeed={1500}
                  />
                </h1>
                <p className="mt-2 text-white/90 text-sm md:text-base max-w-md ml-6 md:ml-10">
                  {item.description}
                </p>
                <Link to="/apartment" className="ml-6 md:ml-10">
                  <button className="mt-4 px-4 py-1.5 bg-[#ec5407] hover:bg-[#373634] text-white text-sm font-semibold rounded-full shadow-md transition duration-150">
                    Explore Now
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute -bottom-1 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-12"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.62,22,103.58,29.16,158.6,17.86C267.79,45.5,355,0,443.6,0S619.41,45.5,707.6,57.86C783.5,69,857,42.86,930,24c86-22,172-20,270,6V0Z"
            fill="#e8faf4"
          ></path>
        </svg>
      </div>
    </div>
  );
}

export default BannerSlider;
