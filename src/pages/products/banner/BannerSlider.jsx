import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import './bannerslider.css';

export default function BannerSlider({ homeData }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  const hasBanners = homeData?.banners?.length > 0;

  useEffect(() => {
    if (
      swiperRef.current &&
      prevRef.current &&
      nextRef.current
    ) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, [homeData]); // Ensures it runs after buttons are in DOM and data is loaded

  return (
    <div className="banner-slider aspect-wrapper">
      {!hasBanners ? (
        <div className="skeleton-box w-100 h-100"></div>
      ) : (
        <>
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          //  pagination={{ clickable: true }}
            loop={true}
            autoplay={{ delay: 3000 }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper bannermain"
          >
            {homeData.banners.map((item) => (
              <SwiperSlide key={item.id} className="overflow-hidden position-relative">
                <a href={item?.url} className="w-100 h-100 overflow-hidden custom-pointer">
                  <img
                    src={item.image}
                    alt="dadisha banner"
                    className="w-full h-full object-cover"
                  />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button ref={prevRef} className="custom-prev-button">
           <i class="fa-solid fa-circle-chevron-left" style={{background:'black', borderRadius:'50%'}}></i>
          </button>
          <button ref={nextRef} className="custom-next-button">
            <i class="fa-solid fa-circle-chevron-right" style={{background:'black', borderRadius:'50%'}}></i>
          </button>
        </>
      )}
    </div>
  );
}
