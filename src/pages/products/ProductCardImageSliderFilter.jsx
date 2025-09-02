import React,{useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules'; 
import { motion, AnimatePresence } from 'framer-motion';

const ProductCardImageSliderFilter = ({ images,stock }) => {
  const [hovered, setHovered] = useState(false);

  const hasImages = images?.length > 0;
  const mainImage = hasImages ? images[0] : null;
  const hoverImage = hasImages && images.length > 1 ? images[1] : null;

  return (
    <div
      className="position-relative w-100 overflow-hidden"
      style={{
        maxHeight: '15rem',
        aspectRatio: 1 / 1
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {mainImage && (
          <motion.img
            key="main"
            src={mainImage}
            alt="Main Product"
            initial={{ opacity: 1 }}
            animate={{ opacity: hovered && hoverImage ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-100 h-100 position-absolute top-0 start-0 object-contain"
            style={{
              filter: stock === 0 ? 'grayscale(100%)' : 'none',
            }}
          />
        )}

        {hoverImage && (
          <motion.img
            key="hover"
            src={hoverImage}
            alt="Hover Product"
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-100 h-100 position-absolute top-0 start-0 object-contain"
            style={{
              filter: stock === 0 ? 'grayscale(100%)' : 'none',
            }}
          />
        )}
      </AnimatePresence>

      {!mainImage && (
        <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-light">
          <span className="text-muted">No Image Available</span>
        </div>
      )}
    </div>
  );
};

export default ProductCardImageSliderFilter;
