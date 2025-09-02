import React from 'react';
import { IoIosArrowRoundForward } from 'react-icons/io';

export default function HomeSectionFour() {
  return (
    <section className="p-0">
      <div className="container">
        <div
          className="row row-cols-1 row-cols-lg-2 row-cols-md-2 m-0 justify-content-center"
          data-anime='{ "el": "childs", "translateY": [40, 0], "opacity": [0,1], "duration": 800, "delay": 200, "staggervalue": 300, "easing": "easeOutQuad" }'
        >
          {/* start process step item */}
          <div className="col process-step-style-10 ps-5 pe-5 pt-3 pb-3 sm-mb-20px position-relative hover-box">
            <div className="process-step-icon-box position-absolute top-minus-15px left-25px md-left-0px">
              {/* <div className="number d-inline-block fs-90 fw-700 text-outline text-outline-color-extra-medium-gray">
                01
              </div> */}
            </div>
            <span className="fs-19 fw-600 text-dark-gray mb-5px d-block position-relative font-poppins">
              Dadisha Marketplace (E-Commerce)
            </span>
            <div className="position-relative last-paragraph-no-margin home-section-three-para">
              <p className="lh-30 w-90 sm-w-100 font-noto text-justify">
                A zero-commission QHSE marketplace featuring nationally and internationally approved
                safety products, including PPE, signage, workplace safety tools, and compliance solutions,
                supporting both sellers and buyers in achieving industry standards.
              </p>
              <a
                href=""
                className="hover-content d-flex justify-content-center align-items-center icon-box w-45px h-45px rounded-circle bg-base-color border-2 home-hover-btn"
              >
                <IoIosArrowRoundForward className="text-dark-gray " />
              </a>
            </div>
          </div>
          {/* end process step item */}
          {/* start process step item */}
          <div className="col process-step-style-10 ps-5 pe-5 mt-3 pb-3 sm-mb-20px position-relative  md-mt-0 hover-box">
            <div className="process-step-icon-box position-absolute top-minus-15px left-25px md-left-0px">
              {/* <div className="number d-inline-block fs-90 fw-700 text-outline text-outline-color-extra-medium-gray">
                02
              </div> */}
            </div>
            <span className="fs-19 fw-600 text-dark-gray mb-5px d-block position-relative font-poppins">
              E-Learning & Professional Training
            </span>
            <div className="position-relative last-paragraph-no-margin home-section-three-para">
              <p className="lh-30 w-90 sm-w-100 font-noto text-justify">
                Providing QHSE-focused Continues Professional Development ( CPD ) Courses with globally recognized certifications,
                interactive assessments, and embassy-approved certificates to ensure compliance, career
                advancement, and placement support with job alerts.
              </p>
              <a
                href=""
                className="hover-content d-flex justify-content-center align-items-center icon-box w-45px h-45px rounded-circle bg-base-color border-2"
              >
                <IoIosArrowRoundForward className="text-dark-gray" />
              </a>
            </div>
          </div>
          {/* end process step item */}
          {/* start process step item */}
          <div className="col process-step-style-10 ps-5 pe-5 pt-3 pb-3 sm-mb-20px position-relative hover-box">
            {/* <div className="process-step-icon-box position-absolute top-minus-15px left-25px md-left-0px">
              <div className="number d-inline-block fs-90 fw-700 text-outline text-outline-color-extra-medium-gray">
                03
              </div>
            </div> */}
            <span className="fs-19 fw-600 text-dark-gray mb-5px d-block position-relative font-poppins">
              SAAS & Custom Software Development
            </span>
            <div className="position-relative last-paragraph-no-margin home-section-three-para">
              <p className="lh-30 w-90 sm-w-100 font-noto text-justify">
                (Software as a Service - SAAS) Dadisha’s QHSE management app provides AI-driven
                compliance tracking, risk mitigation, and workplace safety automation with ISO-certified
                solutions, ensuring seamless implementation and execution of QHSE management system in every industries.

              </p>
              <a
                href=""
                className="hover-content d-flex justify-content-center align-items-center icon-box w-45px h-45px rounded-circle bg-base-color border-2"
              >
                <IoIosArrowRoundForward className="text-dark-gray" />
              </a>
            </div>
          </div>
          {/* end process step item */}
          {/* start process step item */}
          <div className="col process-step-style-10 ps-5 pe-5 pt-3 pb-3 sm-mb-20px position-relative hover-box">
            {/* <div className="process-step-icon-box position-absolute top-minus-15px left-25px md-left-0px">
              <div className="number d-inline-block fs-90 fw-700 text-outline text-outline-color-extra-medium-gray">
                03
              </div>
            </div> */}
            <span className="fs-19 fw-600 text-dark-gray mb-5px d-block position-relative font-poppins">
              Risk Management Products & Services

            </span>
            <div className="position-relative last-paragraph-no-margin home-section-three-para">
              <p className="lh-30 w-90 sm-w-100 font-noto text-justify">
                Developing AI-powered safety solutions, including customizable risk management stands
                with sensors, cameras, and automated monitoring for real-time data collection, risk
                detection, and compliance tracking.

              </p>
              <a
                href=""
                className="hover-content d-flex justify-content-center align-items-center icon-box w-45px h-45px rounded-circle bg-base-color border-2"
              >
                <IoIosArrowRoundForward className="text-dark-gray" />
              </a>
            </div>
          </div>
          {/* end process step item */}
        </div>
      </div>
    </section>
  );
}
