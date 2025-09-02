import React, { useContext, memo } from 'react';
import FirstProductSlider from './FirstProductSlider';
import { Fade, Slide } from 'react-awesome-reveal';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { Context } from "../../context/context.jsx";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const BannerSlider = memo(({ banners }) => {
  console.log('BannerSlider received banners:', banners); // Debug log

  if (!banners?.length) {
    console.log('No banners to display'); // Debug log
    return null;
  }

  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 3000 }}
      loop={true}
      className="banner-swiper"
      style={{
        aspectRatio: '5 / 1',
        backgroundColor: '#f5f5f5'
      }}
    >
      {banners.map((banner, index) => (
        <SwiperSlide key={index}>
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            aspectRatio: '5 / 1',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <img
              src={banner.image}
              alt={`Banner ${index}`}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain'
              }}
              onError={(e) => {
                console.error('Failed to load banner image:', banner.image);
                e.target.style.display = 'none';
              }}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
});

const SkeletonLoader = memo(() => (
  <div className="skeleton-loader">
    {[...Array(4)].map((_, index) => (
      <div key={index} className="skeleton-card">
        <div className="skeleton-image"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-price"></div>
      </div>
    ))}
  </div>
));

const TrendingProducts = ({ loading, trendingPrdData, homeData }) => {
  const navigate = useNavigate();

  // Debug homeData
  console.log('Full homeData:', homeData);
  console.log('All additional_banners:', homeData?.additional_banners);

  const banners = homeData?.additional_banners?.filter(banner => banner.placing === "Option 2") || [];
  const orderByThreeBanners = homeData?.additional_banners?.filter(banner => banner.placing === "Option 3") || [];
  const orderByFourBanners = homeData?.additional_banners?.filter(banner => banner.placing === "Option 4") || [];

  // Debug filtered banners
  console.log('Banners (order_by=2):', banners);
  console.log('Banners (order_by=3):', orderByThreeBanners);
  console.log('Banners (order_by=4):', orderByFourBanners);

  return (
    <>
      <BannerSlider banners={banners} />

      <div className="mt-6 rounded mb-4" style={{ marginTop: '10rem' }}>
        <div className="d-flex justify-content-between align-items-center">
          <Slide direction="down" duration={800} delay={200}>
            <h5 className="text-black fw-600">Trending products</h5>
          </Slide>

          <a
            className="d-flex align-items-center gap-2 text-black custom-pointer"
            style={{ textDecoration: 'none' }}
            onClick={() => {
              navigate('/categoryfilter?other_option=trending_products');
            }}
          >
            View All <IoIosArrowForward />
          </a>
        </div>
        {loading ? <SkeletonLoader /> : <FirstProductSlider productArray={trendingPrdData} />}
      </div>

      <BannerSlider banners={orderByThreeBanners} />
      <br />
      <br />
      <BannerSlider banners={orderByFourBanners} />
    </>
  );
};

export default memo(TrendingProducts);