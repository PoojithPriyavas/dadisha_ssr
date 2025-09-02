import React, { useEffect, useState } from 'react';
import { Fade, Slide } from 'react-awesome-reveal';
import { useInView } from 'react-intersection-observer';

export default function ServicesSectionOne() {
  const [progressBars, setProgressBars] = useState([]);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      const bars = document.querySelectorAll('.progress-bar');
      bars.forEach(bar => {
        if (!bar.classList.contains('appear')) {
          bar.classList.add('appear');
          const total = parseInt(bar.getAttribute('aria-valuenow'), 10);
          const delay = 300;
          let width = 0;
          const interval = setInterval(() => {
            if (width >= total) {
              clearInterval(interval);
            } else {
              width++;
              bar.style.width = width + '%';
              bar.querySelector('span').innerHTML = width + '%';
            }
          }, delay / total);
        }
      });
    }
  }, [inView]);

  return (
    <section className="p-0 top-space-margin page-title-center-alignment">
      <div className="container">
        <div className="row align-items-center justify-content-center extra-very-small-screen">
          <div className="col-xl-8 col-lg-10 text-center position-relative page-title-extra-large">
            <Fade>
              <h1
                className="fw-700 text-dark-gray mb-20px ls-minus-2px font-poppins"
                style={{ color: '#000' }}
              >
                Services
              </h1>
            </Fade>
            <Slide direction="up" duration={800} delay={200}>
              <h2 className="fw-400 ls-0px mb-0 font-noto">
                Fostering QHSE identity and positive culture for organizational
                well-being and compliance.
              </h2>
            </Slide>
          </div>
        </div>
        <div className="row mb-6 mt-7 md-mb-50px">
          <div className="col-xl-5 col-lg-6">
            <Fade duration={800} delay={200} triggerOnce>
              <h3 className="text-dark-gray fw-600 ls-minus-2px w-95 xl-w-100 font-poppins">
                Bringing QHSE identity and developing positive culture.
              </h3>
              <p className="w-95 md-w-100 font-noto">
                Our service fosters a synergistic QHSE environment across
                various industries and business scopes. DADISHA ensures
                organizational well-being, safeguarding employees and the
                environment. We enhance company assets, reputation, and
                compliance with legal and moral obligations. By promoting a safe
                work environment, we maximize economic benefits and prevent
                unwanted incidents.
              </p>
            </Fade>
          </div>
          <div
            className="col-lg-6 offset-xl-1 progress-bar-style-01 mt-50px"
            ref={ref}
          >
            <Fade cascade duration={800} delay={200} triggerOnce>
              <div className="progress mb-18 sm-mb-120px bg-extra-medium-gray">
                <div className="progress-bar-title text-dark-gray fs-14 fw-500 font-noto">
                  Designing and distributing QHSE equipment
                </div>
                <div
                  className="progress-bar bg-dark-gray"
                  role="progressbar"
                  aria-valuenow="100"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-label="app-development"
                >
                  <span className="progress-bar-percent text-center bg-dark-gray fs-11 fw-600 lh-12 text-white">
                    0%
                  </span>
                </div>
              </div>
              <div className="progress mb-20 sm-mb-120px bg-extra-medium-gray">
                <div className="progress-bar-title text-dark-gray fs-14 fw-500  font-noto">
                  Enhancing QHSE identity through Risk Management Support.
                </div>
                <div
                  className="progress-bar bg-dark-gray"
                  role="progressbar"
                  aria-valuenow="100"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-label="branding"
                >
                  <span className="progress-bar-percent text-center bg-dark-gray fs-11 fw-600 lh-12 text-white">
                    0%
                  </span>
                </div>
              </div>
              <div className="progress mb-20 sm-mb-120px bg-extra-medium-gray">
                <div className="progress-bar-title text-dark-gray fs-14 fw-500  font-noto">
                  Providing education and placement support for entry-level QHSE
                  specialists.
                </div>
                <div
                  className="progress-bar bg-dark-gray"
                  role="progressbar"
                  aria-valuenow="100"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-label="web-development"
                >
                  <span className="progress-bar-percent text-center bg-dark-gray fs-11 fw-600 lh-12 text-white">
                    0%
                  </span>
                </div>
              </div>
            </Fade>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-lg-4 row-cols-sm-2 justify-content-center text-center">
          <Fade cascade duration={800} delay={200} triggerOnce>
            <div className="col icon-with-text-style-11 border-0 overflow-visible">
              <div className="text-box-wrapper align-items-center d-flex position-relative overflow-hidden border-radius-6px">
                <div className="text-center w-100">
                  <div className="text-box last-paragraph-no-margin p-20">
                    <img
                      src="images/assets/service1.png"
                      className="w-110px mb-20px d-block mx-auto"
                      alt=""
                    />
                    <span className="alt-font text-dark-gray fw-600 fs-20 font-poppins">
                      Survey and Consultation
                    </span>
                  </div>
                  <div className="text-box-hover bg-dark-gray h-100 d-flex align-items-center justify-content-center flex-column">
                    <h1 className="text-outline text-outline-color-base-color mb-10px ls-minus-2px fw-600 position-absolute bottom-minus-40px">
                      01
                    </h1>
                    <p className="d-inline-block w-70 mb-10px text-white opacity-5 lg-w-90 font-noto">
                      Dive deep into your needs and objectives through thorough
                      discussions.
                    </p>
                    <span className="alt-font fw-500 fs-20 text-white mb-20px font-poppins">
                      Discussion
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col icon-with-text-style-11 border-0 overflow-visible">
              <div className="text-box-wrapper align-items-center d-flex position-relative overflow-hidden border-radius-6px">
                <div className="text-center w-100">
                  <div className="text-box last-paragraph-no-margin p-20">
                    <img
                      src="images/assets/service2.png"
                      className="w-110px mb-20px d-block mx-auto"
                      alt=""
                    />
                    <span className="alt-font text-dark-gray fw-600 fs-20 font-poppins">
                      Strategy
                    </span>
                  </div>
                  <div className="text-box-hover bg-dark-gray h-100 d-flex align-items-center justify-content-center flex-column">
                    <h1 className="text-outline text-outline-color-base-color mb-10px ls-minus-2px fw-600 position-absolute bottom-minus-40px">
                      02
                    </h1>
                    <p className="d-inline-block w-70 mb-10px text-white opacity-5 lg-w-90 font-noto">
                      Craft customized strategies to align perfectly with your
                      goals.
                    </p>
                    <span className="alt-font fw-500 fs-20 text-white mb-20px font-poppins">
                      Strategy
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col icon-with-text-style-11 border-0 overflow-visible">
              <div className="text-box-wrapper align-items-center d-flex position-relative overflow-hidden border-radius-6px">
                <div className="text-center w-100">
                  <div className="text-box last-paragraph-no-margin p-20">
                    <img
                      src="images/assets/service3.png"
                      className="w-110px mb-20px d-block mx-auto"
                      alt=""
                    />
                    <span className="alt-font text-dark-gray fw-600 fs-20 font-poppins">
                      Execute
                    </span>
                  </div>
                  <div className="text-box-hover bg-dark-gray h-100 d-flex align-items-center justify-content-center flex-column">
                    <h1 className="text-outline text-outline-color-base-color mb-10px ls-minus-2px fw-600 position-absolute bottom-minus-40px">
                      03
                    </h1>
                    <p className="d-inline-block w-70 mb-10px text-white opacity-5 lg-w-90 font-noto">
                      Implement meticulously planned strategies with precision.
                    </p>
                    <span className="alt-font fw-500 fs-20 text-white mb-20px font-poppins">
                      Execute
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col icon-with-text-style-11 border-0 overflow-visible">
              <div className="text-box-wrapper align-items-center d-flex position-relative overflow-hidden border-radius-6px">
                <div className="text-center w-100">
                  <div className="text-box last-paragraph-no-margin p-20">
                    <img
                      src="images/assets/service4.png"
                      className="w-110px mb-20px d-block mx-auto"
                      alt=""
                    />
                    <span className="alt-font text-dark-gray fw-600 fs-20 font-poppins">
                      Launch
                    </span>
                  </div>
                  <div className="text-box-hover bg-dark-gray h-100 d-flex align-items-center justify-content-center flex-column">
                    <h1 className="text-outline text-outline-color-base-color mb-10px ls-minus-2px fw-600 position-absolute bottom-minus-40px">
                      04
                    </h1>
                    <p className="d-inline-block w-70 mb-10px text-white opacity-5 lg-w-90 font-noto">
                      Deliver the end result or launch your service, marking our
                      journey's culmination.
                    </p>
                    <span className="alt-font fw-500 fs-20 text-white mb-20px font-poppins">
                      Launch
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
}
