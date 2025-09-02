import React from 'react';
import { Slide, Fade } from 'react-awesome-reveal';
import { useNavigate } from 'react-router-dom';

export default function TrendingSearch({ trendingSearch, homeData }) {
  const navigate = useNavigate()
  return (
    <>

      <div className="mt-5 mb-5">
        <div className="d-flex justify-content-between align-items-center">
          <Slide direction="down" duration={800} delay={200}>
            <h5 className="text-black fw-600 mb-4">Trending Search</h5>
          </Slide>

          {/* <a className="d-flex align-items-center gap-2">
              View All <IoIosArrowForward />
            </a> */}
        </div>
        <div className="mt-2 d-flex gap-4" style={{ flexWrap: 'wrap' }}>
          {trendingSearch?.map((item, index) => (
            <Fade key={item?.id} duration={800} delay={index * 100}>
              <div
                className="d-flex justify-content-between align-items-center px-4 py-1 custom-pointer font-noto"
                style={{ backgroundColor: '#e3e3ec45', borderRadius: '20px' }}
                onClick={() => navigate(`/categoryfilter?search=${item?.search}`)}
              >
                {item?.search}
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </>

  );
}
