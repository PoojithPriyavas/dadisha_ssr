import React, { useContext } from 'react';
import { Fade, Slide } from 'react-awesome-reveal';
import { IoIosArrowForward } from 'react-icons/io';
import FirstProductSlider from './FirstProductSlider';
import { useNavigate } from 'react-router-dom';
import { Context } from "../../context/context.jsx";

export default function QHSEProductsSection({ loading, qhseTagPrdData, homeData }) {
  const navigate = useNavigate()
  // const { loading } = useContext(Context);
  const SkeletonLoader = () => (
    <div className="skeleton-loader">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-image"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-price"></div>
        </div>
      ))}
    </div>
  );
  return (
    <>

      <div>
        {qhseTagPrdData?.length > 0 && (
          <div className="mt-6 rounded mb-4" style={{ marginTop: '10rem' }}>
            <div className="d-flex justify-content-between align-items-center">
              <Slide direction="down" duration={800} delay={200}>
                <h5 className="text-black fw-600" >Dadisha Assured</h5>
              </Slide>

              <a
                className="d-flex align-items-center gap-2 text-black custom-pointer"
                style={{ textDecoration: 'none' }}
                onClick={() => { navigate('/categoryfilter?other_option=dadisha_assured') }}
              >
                View All <IoIosArrowForward />
              </a>
            </div>
            {
              loading ? <SkeletonLoader />
                :
                <FirstProductSlider loading={loading} productArray={qhseTagPrdData} prdtype="qhse" />
            }</div>
        )}
      </div>
    </>

  );
}
