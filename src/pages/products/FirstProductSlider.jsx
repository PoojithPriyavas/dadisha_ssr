import React, { useContext, useState, useRef, useCallback, memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Rate } from "antd";
import ProductCardImageSlider from "./ProductCardImageSlider";
import "./products.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/context";
import { isTokenValid } from "../../utilities";
import { toast } from "react-toastify";
import axios from "../../utilities/customAxios.js";
import { motion } from "framer-motion";

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
        href={`/productdetails/${item.slug}`}
        className="position-relative custom-pointer text-decoration-none"
        onClick={(e) => {
          e.preventDefault();
          navigate(`/productdetails/${item.slug}`);
        }}
        style={{ display: 'block', color: 'inherit' }}
      >
        <div className="text-start" style={{ paddingLeft: '10px', position: 'absolute' }}>
          {item.qhse_product && (
            <img
              src="/tags/tag.png"
              alt="Dadisha Assured"
              style={{ width: '35px', height: 'auto' }}
              className="tag-overlay"
            />
          )}
        </div>
        <ProductCardImageSlider
          images={item?.thumbanil_images}
          stock={item?.stock}
        />
      </a>
      <div className="card-body bg-white px-3 pt-2 pb-3" style={{ fontSize: 'clamp(1.1rem,1.1vw,1.2rem)' }}>
        <div className="rating d-flex align-items-center mb-2">
          <Rate allowHalf disabled defaultValue={item?.average_rating} />
        </div>
        {item?.off && (
          <div className="discount-label mb-1">
            {item?.off > 0 ? `${item?.off}% OFF` : ""}
          </div>
        )}
        <a
          href={`/productdetails/${item.slug}`}
          className="text-decoration-none"
          onClick={(e) => {
            e.preventDefault();
            navigate(`/productdetails/${item.slug}`);
          }}
          style={{ color: 'inherit' }}
        >
          <h6 className="product-title text-truncate-2 mb-2 text-start">{item?.name}</h6>
        </a>
        <div>
          <div className="d-flex justify-content-between align-items-end px-2">
            <div className="d-flex gap-2">
              <p className="price fw-bold text-dark mb-0"><span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal', color: 'inherit' }}>&#8377;</span>{item?.sale_price}</p>
              <p className="text-muted text-decoration-line-through mb-0"><span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal', color: 'inherit' }}>&#8377;</span>{item?.mrp}</p>
            </div>
            <div className={`wishlist-section ${item?.wishlist ? "wishlist-active" : "wishlist-inactive"}`}>
              {isTokenValid() ? (
                <button
                  className="wishlist-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToWishlist(item?.slug);
                  }}
                >
                  <img
                    src={
                      item?.wishlist
                        ? "/icons/wishlist-yellow.png"
                        : "/icons/wishlist.svg"
                    }
                    alt="wishlist"
                    className="wishlist-icon"
                  />
                </button>
              ) : (
                <button
                  className="wishlist-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/signin");
                  }}
                >
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
      <div key={index} className="skeleton-card">
        <div className="skeleton-image" />
        <div className="skeleton-text" />
        <div className="skeleton-price" />
      </div>
    ))}
  </div>
));

const FirstProductSlider = ({ loading, productArray, prdtype }) => {
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const {
    setQhseTagPrdData,
    setTrendingPrdData
  } = useContext(Context);

  const addToWishlist = useCallback(async (slug) => {
    try {
      const response = await axios.post("/disha/add-to-wishlist", {
        product_slug: slug,
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        setQhseTagPrdData((prev) => (
          prev.map((item) => (item.slug === slug ? { ...item, wishlist: !item.wishlist } : item))
        ));
        setTrendingPrdData((prev) => (
          prev.map((item) => (item.slug === slug ? { ...item, wishlist: !item.wishlist } : item))
        ));
      }
    } catch (error) {
      toast.error("Failed Product updated to wishlist");
      console.error("Error Product updated to wishlist:", error);
    }
  }, [setQhseTagPrdData, setTrendingPrdData]);

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
              onSlideChange={updateNavigationState}
              onInit={updateNavigationState}
              watchSlidesProgress
              observeParents
              observer
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
              modules={[Pagination]}
              className="product-swiper"
            >
              {productArray?.map((item, index) => (
                <SwiperSlide key={index}>
                  <ProductCard
                    item={item}
                    addToWishlist={addToWishlist}
                    navigate={navigate}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {!loading && productArray?.length > 0 && (
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
  );
};

export default memo(FirstProductSlider);