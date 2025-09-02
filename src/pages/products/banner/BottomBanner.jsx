import React from 'react';
import { Fade } from 'react-awesome-reveal';
import './bannerslider.css';

export default function BottomBanner({ homeData,hasAdditionalBanners }) {

  return (
    <div className="d-none d-md-block">
      <div className="row mt-3 w-100 px-0 mx-0">
        <div className="col-6 px-0">
          <div
            className="w-100 overflow-hidden rounded-xl position-relative"
            style={{ height: '240px' }}
          >
            {!hasAdditionalBanners ? (
              <div className="skeleton-box w-100 h-100"></div>
            ) : (
              <>
                <img
                  src={homeData?.additional_banners?.[1]?.image}
                  alt="dadisha banner"
                  className="w-100 h-100 object-cover"
                />
                <div className="position-absolute bottom-0 w-100">
                  <div className="d-flex justify-content-start align-items-center mb-4 ms-4">
                    <Fade duration={800} delay={200}>
                      <a
                        className="bg-white text-black rounded-xl px-4 py-1 border-none fs-6 underline-none custom-pointer"
                        href={homeData?.additional_banners?.[1]?.url}
                      >
                        Discover Now
                      </a>
                    </Fade>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="col-6 ps-4 pe-0">
          <div className="row">
            <div className="col-6">
              <div
                className="w-100 overflow-hidden rounded-xl position-relative"
                style={{ height: '240px' }}
              >
                {!hasAdditionalBanners ? (
                  <div className="skeleton-box w-100 h-100"></div>
                ) : (
                  <>
                    <img
                      src={homeData?.additional_banners?.[2]?.image}
                      alt="dadisha banner"
                      className="w-100 h-100 object-cover"
                    />
                    <div className="position-absolute bottom-0 w-100">
                      <div className="d-flex justify-content-center align-items-center mb-4">
                        <Fade duration={800} delay={200}>
                          <a
                            className="bg-white text-black rounded-xl px-4 py-1 border-none fs-6 underline-none custom-pointer"
                            href={homeData?.additional_banners?.[2]?.url}
                          >
                            Shop Now
                          </a>
                        </Fade>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="col-6">
              <div
                className="w-100 overflow-hidden rounded-xl position-relative"
                style={{ height: '240px' }}
              >
                {!hasAdditionalBanners ? (
                  <div className="skeleton-box w-100 h-100"></div>
                ) : (
                  <>
                    <img
                      src={homeData?.additional_banners?.[3]?.image}
                      alt="dadisha banner"
                      className="w-100 h-100 object-cover"
                    />
                    <div className="position-absolute bottom-0 w-100">
                      <div className="d-flex justify-content-center align-items-center mb-4">
                        <Fade duration={800} delay={200}>
                          <a
                            className="bg-white text-black rounded-xl px-4 py-1 border-none fs-6 underline-none custom-pointer"
                            href={homeData?.additional_banners?.[3]?.url}
                          >
                            Shop Now
                          </a>
                        </Fade>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}