import { useEffect, useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../../context/context';
import { Slide } from 'react-awesome-reveal';
import './CategorySlider.css';

const CategorySlider = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const { homeData, gethomeData, categoryLoader } = useContext(Context);
  const [scrollPos, setScrollPos] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    gethomeData();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      const max = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      setMaxScroll(max);
    }
  }, [homeData]);

  const handleScroll = (direction) => {
    const scrollAmount = 200;
    if (scrollRef.current) {
      const newPos = direction === 'left'
        ? scrollRef.current.scrollLeft - scrollAmount
        : scrollRef.current.scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({ left: newPos, behavior: 'smooth' });
    }
  };

  const handleScrollUpdate = () => {
    setScrollPos(scrollRef.current.scrollLeft);
  };

  const SkeletonCard = () => (
    <div
      className="d-flex flex-column align-items-center"
      style={{ width: '8rem' }}
    >
      <div className="skeleton-circle mx-4" style={{ width: '5rem', height: '5rem', borderRadius: '50%', backgroundColor: '#e3e3ec' }}></div>
      <div className="skeleton-text mt-2" style={{ width: '60%', height: '0.8rem', backgroundColor: '#e3e3ec', borderRadius: '4px' }}></div>
    </div>
  );

  return (
    <div className="pt-1 pb-5 category-slider-container position-relative">
      {categoryLoader ? (
        <>
          <h1 className="fs-5 fw-600 mb-4 skeleton-text w-50">Loading Categories...</h1>
          <div className="d-flex mt-4 overflow-scroll scrollbar-none gap-4" ref={scrollRef}>
            {[...Array(6)].map((_, index) => <SkeletonCard key={index} />)}
          </div>
        </>
      ) : (
        <>
          <Slide direction="down" duration={800} delay={200}>
            <h1 className="fs-5 fw-600">Explore Popular Categories</h1>
          </Slide>

          {/* Left Arrow */}
          {scrollPos > 0 && (
            <button className="scroll-arrow left" onClick={() => handleScroll('left')}>
              <i class="fa-solid fa-circle-chevron-left"></i>
            </button>
          )}

          {/* Right Arrow */}
          {scrollPos < maxScroll - 10 && (
            <button className="scroll-arrow right" onClick={() => handleScroll('right')}>
              <i class="fa-solid fa-circle-chevron-right"></i>
            </button>
          )}

          <div
            className="d-flex mt-4 overflow-scroll scrollbar-none gap-4 category-scroll-wrapper"
            ref={scrollRef}
            onScroll={handleScrollUpdate}
          >
            {homeData?.main_categories?.length > 0 ? (
              homeData.main_categories.slice() 
                .sort((a, b) => a.order_by - b.order_by).map((item) => (
                  <div
                    className="d-flex flex-column align-items-center"
                    key={item.id}
                    style={{ width: '6rem' }}
                  >
                    <div
                      className="h-20t w-20t overflow-hidden rounded-full mx-4 custom-pointer grid place-items-center d-flex justify-content-center align-items-center category-img-wrapper"
                      style={{
                        borderRadius: '50%',
                        backgroundColor: '#e3e3ec45',
                      }}
                      onClick={() =>
                        navigate(`/categoryfilter?maincategoryid=${item.id}`)
                      }
                    >
                      <img src={item.image} alt={item.name} className="w-100 h-100 object-cover" />
                    </div>
                    <div className="text-black text-center mt-2" style={{ fontSize: '0.8rem' }}>
                      {item.name}
                    </div>
                  </div>
                ))
            ) : (
              <p>No categories found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CategorySlider;
