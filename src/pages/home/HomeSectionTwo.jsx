import React, { useEffect } from 'react';
import anime from 'animejs';
import { RiVerifiedBadgeFill } from 'react-icons/ri';

export default function HomeSectionTwo() {
  useEffect(() => {
    const animateElements = () => {
      const elements = document.querySelectorAll('[data-anime]');
      elements.forEach(el => {
        const animeConfig = JSON.parse(el.getAttribute('data-anime'));
        anime({
          targets: el,
          translateX: animeConfig.translateX,
          opacity: animeConfig.opacity,
          duration: animeConfig.duration,
          delay: animeConfig.delay,
          easing: animeConfig.easing,
        });
      });
    };

    animateElements();
  }, []);

  return (
    <section className="p-0">
      <div className="container">
        <div
          className="row justify-content-center align-items-center flex-column flex-sm-row"
          data-anime='{ "translateX": [15, 0], "opacity": [0,1], "duration": 800, "delay": 200, "easing": "easeOutQuad" }'
        >
          {/* <!-- start features box item --> */}
          <div className="col-auto icon-with-text-style-08 md-mb-10px text-center text-md-start">
            <div className="feature-box feature-box-left-icon-middle d-inline-flex align-middle">
              <div className="feature-box-icon me-5px">
                <RiVerifiedBadgeFill className="  text-dark-gray" />
              </div>
              <div className="feature-box-content">
                <span className="fs-14 fw-600 text-dark-gray text-uppercase font-noto">
                  Dadisha Marketplace
                </span>
              </div>
            </div>
          </div>
          {/* <!-- end features box item --> */}
          <div className="col-auto md-mb-15px d-none d-md-flex">
            <span className="progress-step-separator"></span>
          </div>
          {/* <!-- start features box item --> */}
          <div className="col-auto icon-with-text-style-08 md-mb-10px text-center text-md-start">
            <div className="feature-box feature-box-left-icon-middle d-inline-flex align-middle">
              <div className="feature-box-icon me-5px">
                <RiVerifiedBadgeFill className="  text-dark-gray" />
              </div>
              <div className="feature-box-content">
                <span className="fs-14 fw-600 text-dark-gray text-uppercase font-noto">
                  E-Learning & Professional Training
                </span>
              </div>
            </div>
          </div>
          {/* <!-- end features box item --> */}
          <div className="col-auto md-mb-15px d-none d-md-flex">
            <span className="progress-step-separator"></span>
          </div>
          {/* <!-- start features box item --> */}
          <div className="col-auto icon-with-text-style-08 md-mb-10px text-center text-md-start">
            <div className="feature-box feature-box-left-icon-middle d-inline-flex align-middle">
              <div className="feature-box-icon me-5px">
                <RiVerifiedBadgeFill className="  text-dark-gray" />
              </div>
              <div className="feature-box-content">
                <span className="fs-14 fw-600 text-dark-gray text-uppercase font-noto">
                  SAAS & Custom Software Development
                </span>
              </div>
            </div>
          </div>
          {/* <!-- end features box item --> */}
          {/* <!-- start features box item --> */}
          <div className="col-auto icon-with-text-style-08 md-mb-10px text-center text-md-start">
            <div className="feature-box feature-box-left-icon-middle d-inline-flex align-middle">
              <div className="feature-box-icon me-5px">
                <RiVerifiedBadgeFill className="  text-dark-gray" />
              </div>
              <div className="feature-box-content">
                <span className="fs-14 fw-600 text-dark-gray text-uppercase font-noto">
                  Risk Management Products & Services
                </span>
              </div>
            </div>
          </div>
          {/* <!-- end features box item --> */}
        </div>
      </div>
    </section>
  );
}
