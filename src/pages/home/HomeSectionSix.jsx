import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaStar } from 'react-icons/fa6';

export default function HomeSectionSix() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: (
      <div className="slider-one-slide-prev-1 bg-sherpa-blue text-white swiper-button-prev slider-navigation-style-04 w-60px h-60px hidden">
        <i className="fa-solid fa-arrow-left"></i>
      </div>
    ),
    nextArrow: (
      <div className="slider-one-slide-next-1 bg-sherpa-blue text-white swiper-button-next slider-navigation-style-04 w-60px h-60px">
        <i className="fa-solid fa-arrow-right"></i>
      </div>
    ),
  };

  return (
    <section className="pb-4 lg-pb-6 sm-pb-50px position-relative bg-dark-gray section-dark">
      <div className="cover-background position-absolute h-100 w-100 left-0px top-0px">
        <img src="images/assets/demo-web-agency-bg-01.png" alt="" />
      </div>

      <div className="container position-relative">
        <div className="row justify-content-center align-items-center mb-9 xl-mb-5 sm-mb-30px">
          <div className="col-lg-5">
            <div className="mb-15 d-flex align-items-center md-mb-30px">
              <div className="fw-700 fs-80 text-white me-10px">4.82</div>
              <div className="text-center">
                <div className="bg-base-color text-dark-gray border-radius-30px ps-20px pe-20px fs-16 ls-minus-2px d-flex items-center py-2">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <span className="text-white fs-13 fw-500 text-uppercase">
                  Clutch review
                </span>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-7 overflow-hidden offset-xl-1">
            <Slider {...settings}>
              <div>
                <h5 className="text-white mb-20px w-90 xl-w-100 lh-42 fw-400">
                  Unlocking the power of safety management for a brighter
                  tomorrow.
                </h5>
                <span className="text-base-color fw-600 d-block fs-15 text-uppercase lh-22 ls-2px">
                  @Sinoj Saleel
                </span>
              </div>
              <div>
                <h5 className="text-white mb-20px w-90 xl-w-100 lh-42 fw-400">
                  Empowering progress, safeguarding excellence. At DAD of QHSE Solutions, we weave quality, health, safety, and
                  environment into the very fabric of innovation.
                </h5>
                <span className="text-base-color fw-600 d-block fs-15 text-uppercase lh-22 ls-2px">
                  @Hridhi Balakrishnan
                </span>
              </div>
              <div>
                <h5 className="text-white mb-20px w-90 xl-w-100 lh-42 fw-400">
                  Liberating the potential of safety stewardship for brighter
                  future.
                </h5>
                <span className="text-base-color fw-600 d-block fs-15 text-uppercase lh-22 ls-2px">
                  @Sinoj Saleel
                </span>
              </div>
              <div>
                <h5 className="text-white mb-20px w-90 xl-w-100 lh-42 fw-400">
                  Outstanding Quality products and best services highly
                  recommend to facilitate the implementation of the QHSE
                  management system in your organization.
                </h5>
                <span className="text-base-color fw-600 d-block fs-15 text-uppercase lh-22 ls-2px">
                  @Vishnuprasad Ramakrishnan
                </span>
              </div>
              <div>
                <h5 className="text-white mb-20px w-90 xl-w-100 lh-42 fw-400">
                  Crafting Safety with Style: DAD of QHSE Solutions' Innovative Safety
                  Kit Designs
                </h5>
                <span className="text-base-color fw-600 d-block fs-15 text-uppercase lh-22 ls-2px">
                  @Aiswarya
                </span>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}
