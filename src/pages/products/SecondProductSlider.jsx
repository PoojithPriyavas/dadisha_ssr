// import React, { useContext, useState, useRef, useEffect } from "react";
// import { FaHeart, FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { Rate } from "antd";
// import { useNavigate } from "react-router-dom";
// import { Fade } from "react-awesome-reveal";
// import { isTokenValid } from "../../utilities";
// import { toast } from "react-toastify";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import { Pagination } from "swiper/modules";
// import ProductCardImageSlider from "./ProductCardImageSlider";
// import axios from "../../utilities/customAxios.js";
// import './productCard.css'
// import { IoIosArrowForward } from 'react-icons/io';
// import { Context } from "../../context/context";
// import { motion } from "framer-motion";
// import { Autoplay } from 'swiper/modules';




// export default function SecondProductSlider({ loading, weaklyPrdData, homeData }) {
//   // console.log(weaklyPrdData, "weeksdas");
//   console.log('Received banners:', homeData);
//   const { getWeaklyPrdData, setWeaklyPrdData } = useContext(Context);
//   const navigate = useNavigate();
//   const swiperRef = useRef(null);
//   const [isBeginning, setIsBeginning] = useState(true);
//   const [isEnd, setIsEnd] = useState(false);

//   const addToWishlist = async (slug) => {
//     try {
//       const response = await axios.post("/disha/add-to-wishlist", { product_slug: slug });
//       if (response.data.message) {
//         toast.success(response.data.message);
//         // getWeaklyPrdData();
//         setWeaklyPrdData((prev) =>
//           prev.map((item) =>
//             item.product?.slug === slug
//               ? {
//                 ...item,
//                 product: {
//                   ...item.product,
//                   wishlist: !item.product.wishlist,
//                 },
//               }
//               : item
//           )
//         );

//       }
//     } catch (error) {
//       toast.error("Failed to update wishlist");
//     }
//   };

//   const handlePrev = () => {
//     if (swiperRef.current && !isBeginning) {
//       swiperRef.current.swiper.slidePrev();
//     }
//   };

//   const handleNext = () => {
//     if (swiperRef.current && !isEnd) {
//       swiperRef.current.swiper.slideNext();
//     }
//   };

//   const updateNavigationState = (swiper) => {
//     setIsBeginning(swiper.isBeginning);
//     setIsEnd(swiper.isEnd);
//   };

//   const SkeletonLoader = () => (
//     <div className="skeleton-loader">
//       {[...Array(2)].map((_, index) => (
//         <motion.div key={index} className="skeleton-card"
//           initial={{ opacity: 0, y: 60 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{
//             duration: 0.8,
//             ease: [0.25, 0.8, 0.25, 1],
//           }}
//           viewport={{ once: true, amount: 0.2 }}>
//           <div className="skeleton-image" />
//           <div className="skeleton-text" />
//           <div className="skeleton-price" />
//         </motion.div>
//       ))}
//     </div>
//   );
//   const banners = homeData || [];
//   return (
//     <>


//       <div className="weekly-slider-wrapper mt-5 px-3">
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <Fade duration={800} delay={200}>
//             <h5 className="text-black fw-600 mb-0">Best Weekly Deals</h5>
//           </Fade>
//           <a
//             className="d-flex align-items-center gap-2 text-black custom-pointer"
//             style={{ textDecoration: 'none' }}
//             onClick={() => navigate("/categoryfilter?other_option=weekly_deals")}
//           >
//             View All <IoIosArrowForward />
//           </a>
//         </div>
//         <div className="weekly-slider-container d-flex flex-wrap">
//           <div className="slider-section position-relative">
//             {loading ? (
//               <SkeletonLoader />
//             ) : (
//               <>
//                 <Swiper
//                   ref={swiperRef}
//                   slidesPerView='auto'
//                   spaceBetween={20}
//                   onSlideChange={updateNavigationState}
//                   onInit={updateNavigationState}
//                   watchSlidesProgress
//                   observeParents
//                   observer
//                   breakpoints={{
//                     0: { slidesPerView: 2, spaceBetween: 10 },
//                     320: { slidesPerView: 2, spaceBetween: 10 },
//                     480: { slidesPerView: 2.2, spaceBetween: 12 },
//                     640: { slidesPerView: 2.5, spaceBetween: 14 },
//                     768: { slidesPerView: 3, spaceBetween: 16 },
//                     900: { slidesPerView: 3.5, spaceBetween: 20 },
//                     1024: { slidesPerView: 4, spaceBetween: 24 },
//                     1200: { slidesPerView: 4.5, spaceBetween: 24 },
//                     1280: { slidesPerView: 5, spaceBetween: 24 },
//                     1440: { slidesPerView: 6, spaceBetween: 24 },
//                     1600: { slidesPerView: 6.5, spaceBetween: 24 },
//                     1920: { slidesPerView: 7, spaceBetween: 24 },
//                   }}
//                   modules={[Pagination]}
//                   className="product-swiper"
//                 >
//                   {weaklyPrdData?.map((item, index) => (
//                     <SwiperSlide key={index}>
//                       <motion.div
//                         className="product-card rounded-xl overflow-hidden"
//                         initial={{ opacity: 0, y: 60 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{
//                           duration: 0.8,
//                           ease: [0.25, 0.8, 0.25, 1],
//                         }}
//                         viewport={{ once: true, amount: 0.2 }}
//                       >
//                         <div
//                           className="position-relative custom-pointer"
//                           onClick={() => navigate(`/productdetails/${item.product?.slug}`)}
//                         >
//                           <div className="text-start" style={{ paddingLeft: '10px', position: 'absolute' }}>
//                             {item?.product?.qhse_product && (
//                               <img
//                                 src="/tags/tag.png"
//                                 alt="Dadisha Assured"
//                                 style={{ width: '35px', height: 'auto' }}
//                                 className="tag-overlay"
//                               />
//                             )}
//                           </div>

//                           <ProductCardImageSlider
//                             images={item.product.thumbanil_images}
//                             stock={item.product?.stock}
//                           />
//                         </div>
//                         <div className="card-body bg-white px-3 pt-2 pb-3" style={{ fontSize: 'clamp(1.1rem,1.1vw,1.2rem)' }}>
//                           <div className="rating d-flex align-items-center mb-2">
//                             <Rate allowHalf disabled defaultValue={item?.product?.average_rating} />
//                             {/* <span className="ms-2 rating-span">({item?.product?.average_rating})</span> */}
//                           </div>
//                           {item?.product?.off && (
//                             <div className="discount-label mb-1">
//                               {item?.product?.off > 0 ? `${item?.product?.off}% OFF` : ""}
//                             </div>
//                           )}
//                           <h6 className="product-title text-truncate-2 mb-2 text-start">{item?.product?.name}</h6>
//                           <div>
//                             <div className="d-flex justify-content-between align-items-center px-2">
//                               <div className="d-flex gap-2 desc-div">
//                                 <p className="price fw-bold text-dark mb-0"><span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal', color: 'inherit' }}>₹</span>{item?.product.sale_price}</p>
//                                 <p className="text-muted text-decoration-line-through mb-0"><span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal', color: 'inherit' }}>₹</span>{item?.product.mrp}</p>
//                               </div>

//                               <div
//                                 className={`wishlist-section ${item?.product?.wishlist ? "wishlist-active" : "wishlist-inactive"
//                                   }`}
//                               >
//                                 {isTokenValid() ? (
//                                   <button
//                                     className="wishlist-btn"
//                                     onClick={(e) => {
//                                       e.stopPropagation();
//                                       addToWishlist(item?.product?.slug);
//                                     }}
//                                   >
//                                     <img
//                                       src={
//                                         item?.product?.wishlist
//                                           ? "/icons/wishlist-yellow.png"
//                                           : "/icons/wishlist.svg"
//                                       }
//                                       alt="wishlist"
//                                       className="wishlist-icon"
//                                     />
//                                   </button>
//                                 ) : (
//                                   <button className="wishlist-btn" onClick={() => navigate("/signin")}>
//                                     <img
//                                       src="/icons/wishlist.svg"
//                                       alt="wishlist"
//                                       className="wishlist-icon"
//                                     />
//                                   </button>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </motion.div>
//                     </SwiperSlide>
//                   ))}
//                 </Swiper>

//                 {/* Navigation buttons */}
//                 {!loading && weaklyPrdData?.length > 0 && (
//                   <>
//                     <button
//                       className={`swiper-button-prev2 ${isBeginning ? 'swiper-button-disabled' : ''}`}
//                       onClick={handlePrev}
//                       disabled={isBeginning}
//                     >
//                       <FaChevronLeft />
//                     </button>
//                     <button
//                       className={`swiper-button-next2 ${isEnd ? 'swiper-button-disabled' : ''}`}
//                       onClick={handleNext}
//                       disabled={isEnd}
//                     >
//                       <FaChevronRight />
//                     </button>
//                   </>
//                 )}
//               </>
//             )}
//           </div>
//         </div >
//       </div >
//       {banners?.length > 0 && (
//         <Swiper
//           modules={[Autoplay]}
//           autoplay={{ delay: 3000 }}
//           loop={true}
//           className="banner-swiper"
//           style={{
//             aspectRatio: '5 / 1',
//             // height: '300px', // Fixed height for testing
//             backgroundColor: '#f5f5f5' // Fallback color
//           }}
//         >
//           {banners.map((banner, index) => (
//             <SwiperSlide key={index}>
//               <div style={{
//                 position: 'relative',
//                 width: '100%',
//                 height: '100%',
//                 aspectRatio: '5 / 1',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center'
//               }}>
//                 <img
//                   src={banner.image}
//                   alt={`Banner ${index}`}
//                   style={{
//                     maxWidth: '100%',
//                     maxHeight: '100%',
//                     objectFit: 'contain'
//                   }}
//                   onError={(e) => {
//                     console.error('Failed to load banner image:', banner.image);
//                     e.target.style.display = 'none';
//                   }}
//                 />
//                 {/* Debug overlay */}

//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       )}
//     </>
//   );
// }


import React, { useContext, useState, useRef, useCallback, memo } from "react";


import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Rate } from "antd";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { isTokenValid } from "../../utilities";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import ProductCardImageSlider from "./ProductCardImageSlider";
import axios from "../../utilities/customAxios.js";
import './productCard.css'
import { IoIosArrowForward } from 'react-icons/io';
import { Context } from "../../context/context";
import { motion } from "framer-motion";

// Memoized Product Card to prevent unnecessary re-renders
const ProductCard = memo(({ item, addToWishlist, navigate }) => {
  return (
    <motion.div
      className="product-card rounded-xl overflow-hidden"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <a
        href={`/productdetails/${item.product?.slug}`}
        className="position-relative custom-pointer text-decoration-none"
        onClick={(e) => {
          e.preventDefault();
          navigate(`/productdetails/${item.product?.slug}`);
        }}
        style={{ display: 'block', color: 'inherit' }}
      >
        <div className="text-start" style={{ paddingLeft: '10px', position: 'absolute' }}>
          {item?.product?.qhse_product && (
            <img
              src="/tags/tag.png"
              alt="Dadisha Assured"
              style={{ width: '35px', height: 'auto' }}
              className="tag-overlay"
            />
          )}
        </div>
        <ProductCardImageSlider
          images={item.product.thumbanil_images}
          stock={item.product?.stock}
        />
      </a>

      <div className="card-body bg-white px-3 pt-2 pb-3" style={{ fontSize: 'clamp(1.1rem,1.1vw,1.2rem)' }}>
        <div className="rating d-flex align-items-center mb-2">
          <Rate allowHalf disabled defaultValue={item?.product?.average_rating} />
        </div>
        {item?.product?.off && (
          <div className="discount-label mb-1">
            {item?.product?.off > 0 ? `${item?.product?.off}% OFF` : ""}
          </div>
        )}
        <a
          href={`/productdetails/${item.product?.slug}`}
          className="text-decoration-none"
          onClick={(e) => {
            e.preventDefault();
            navigate(`/productdetails/${item.product?.slug}`);
          }}
          style={{ color: 'inherit' }}
        >
          <h6 className="product-title text-truncate-2 mb-2 text-start">{item?.product?.name}</h6>
        </a>
        <div>
          <div className="d-flex justify-content-between align-items-center px-2">
            <div className="d-flex gap-2 desc-div">
              <p className="price fw-bold text-dark mb-0">
                <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal', color: 'inherit' }}>₹</span>
                {item?.product.sale_price}
              </p>
              <p className="text-muted text-decoration-line-through mb-0">
                <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal', color: 'inherit' }}>₹</span>
                {item?.product.mrp}
              </p>
            </div>
            <div className={`wishlist-section ${item?.product?.wishlist ? "wishlist-active" : "wishlist-inactive"}`}>
              {isTokenValid() ? (
                <button
                  className="wishlist-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToWishlist(item?.product?.slug);
                  }}
                >
                  <img
                    src={
                      item?.product?.wishlist
                        ? "/icons/wishlist-yellow.png"
                        : "/icons/wishlist.svg"
                    }
                    alt="wishlist"
                    className="wishlist-icon"
                  />
                </button>
              ) : (
                <button className="wishlist-btn" onClick={(e) => {
                  e.stopPropagation();
                  navigate("/signin");
                }}>
                  <img
                    src="/icons/wishlist.svg"
                    alt="wishlist"
                    className="wishlist-icon"
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

const SkeletonLoader = memo(() => (
  <div className="skeleton-loader">
    {[...Array(2)].map((_, index) => (
      <motion.div
        key={index}
        className="skeleton-card"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="skeleton-image" />
        <div className="skeleton-text" />
        <div className="skeleton-price" />
      </motion.div>
    ))}
  </div>
));

const BannerSlider = memo(({ banners }) => {
  if (!banners?.length) return null;

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

const SecondProductSlider = ({ loading, weaklyPrdData, homeData }) => {
  const { setWeaklyPrdData } = useContext(Context);
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // Memoized addToWishlist function
  const addToWishlist = useCallback(async (slug) => {
    try {
      const response = await axios.post("/disha/add-to-wishlist", { product_slug: slug });
      if (response.data.message) {
        toast.success(response.data.message);
        setWeaklyPrdData((prev) =>
          prev.map((item) =>
            item.product?.slug === slug
              ? {
                ...item,
                product: {
                  ...item.product,
                  wishlist: !item.product.wishlist,
                },
              }
              : item
          )
        );
      }
    } catch (error) {
      toast.error("Failed to update wishlist");
    }
  }, [setWeaklyPrdData]);

  const handlePrev = useCallback(() => {
    if (swiperRef.current && !isBeginning) {
      swiperRef.current.swiper.slidePrev();
    }
  }, [isBeginning]);

  const handleNext = useCallback(() => {
    if (swiperRef.current && !isEnd) {
      swiperRef.current.swiper.slideNext();
    }
  }, [isEnd]);

  const updateNavigationState = useCallback((swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, []);

  return (
    <>
      <div className="weekly-slider-wrapper mt-5 px-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Fade duration={800} delay={200}>
            <h5 className="text-black fw-600 mb-0">Best Weekly Deals</h5>
          </Fade>
          <a
            className="d-flex align-items-center gap-2 text-black custom-pointer"
            style={{ textDecoration: 'none' }}
            onClick={() => navigate("/categoryfilter?other_option=weekly_deals")}
          >
            View All <IoIosArrowForward />
          </a>
        </div>
        <div className="weekly-slider-container d-flex flex-wrap">
          <div className="slider-section position-relative">
            {loading ? (
              <SkeletonLoader />
            ) : (
              <>
                <Swiper
                  ref={swiperRef}
                  slidesPerView='auto'
                  spaceBetween={20}
                  freeMode={true}  // Enable free mode scrolling
                  grabCursor={true}  // Show grab cursor when hovered
                  onSlideChange={updateNavigationState}
                  onInit={updateNavigationState}
                  watchSlidesProgress
                  observeParents
                  observer
                  touchEventsTarget="container"
                  touchRatio={1}
                  touchAngle={45}
                  simulateTouch={true}
                  shortSwipes={true}
                  longSwipes={false}
                  followFinger={true}
                  modules={[FreeMode, Pagination]}  // Add FreeMode module
                  breakpoints={{
                    0: { slidesPerView: 2, spaceBetween: 10 },
                    320: { slidesPerView: 2, spaceBetween: 10 },
                    480: { slidesPerView: 2.2, spaceBetween: 12 },
                    640: { slidesPerView: 2.5, spaceBetween: 14 },
                    768: { slidesPerView: 3, spaceBetween: 16 },
                    900: { slidesPerView: 3.5, spaceBetween: 20 },
                    1024: { slidesPerView: 4, spaceBetween: 24 },
                    1200: { slidesPerView: 4.5, spaceBetween: 24 },
                    1280: { slidesPerView: 5, spaceBetween: 24 },
                    1440: { slidesPerView: 6, spaceBetween: 24 },
                    1600: { slidesPerView: 6.5, spaceBetween: 24 },
                    1920: { slidesPerView: 7, spaceBetween: 24 },
                  }}
                  className="product-swiper"
                >
                  {weaklyPrdData?.map((item, index) => (
                    <SwiperSlide key={index}>
                      <ProductCard
                        item={item}
                        addToWishlist={addToWishlist}
                        navigate={navigate}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                {!loading && weaklyPrdData?.length > 0 && (
                  <>
                    <button
                      className={`swiper-button-prev2 ${isBeginning ? 'swiper-button-disabled' : ''}`}
                      onClick={handlePrev}
                      disabled={isBeginning}
                      aria-label="Previous slide"
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      className={`swiper-button-next2 ${isEnd ? 'swiper-button-disabled' : ''}`}
                      onClick={handleNext}
                      disabled={isEnd}
                      aria-label="Next slide"
                    >
                      <FaChevronRight />
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <BannerSlider banners={homeData} />
    </>
  );
};

export default React.memo(SecondProductSlider);