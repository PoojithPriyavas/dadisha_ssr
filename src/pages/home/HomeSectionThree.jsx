import React, { useEffect } from 'react';

export default function HomeSectionThree() {
  useEffect(() => {
    // Example: Add a simple animation effect when the component mounts
    const elements = document.querySelectorAll('[data-anime]');
    elements.forEach(el => {
      const animeData = JSON.parse(el.getAttribute('data-anime'));
      const {
        el: target,
        translateX,
        opacity,
        duration,
        delay,
        staggervalue,
        easing,
      } = animeData;

      // Simple animation using setTimeout for demonstration
      setTimeout(() => {
        el.style.transform = `translateX(${translateX[1]}px)`;
        el.style.opacity = opacity[1];
      }, delay);
    });
  }, []);

  return (
    <section className="position-relative overflow-hidden section-dark home-section-three ">
      <div className="container">
        <div className="row align-items-center position-relative">
          <div className="col-lg-6">
            <div
              className="outside-box-left-20 md-outside-box-left-0"
              data-bottom-top="transform:scale(1.1, 1.1)"
              data-top-bottom="transform:scale(1, 1)"
            >
              <img src="images/assets/home_image.png" alt="www." />
            </div>
          </div>
          <div
            className="col-lg-6 z-index-9 md-mt-35px"
            data-anime='{ "el": "childs", "translateX": [15, 0], "opacity": [0,1], "duration": 800, "delay": 200, "staggervalue": 300, "easing": "easeOutQuad" }'
          >
            <h1
              className="text-dark-gray fw-500 mb-40px md-mb-25px  md-outside-box-left-0 ls-minus-3px word-break-normal heading-qhse"
              // style={{
              //   fontSize: '5.2rem',
              //   lineHeight: '5rem',
              // }}
            >
              Delivering Complete QHSE Solutions for Every Industry.
            </h1>
            <p className="lh-34 w-95 mb-30px lg-w-100 font-noto text-justify" >
              Dadisha Private Limited is a{' '}
              <span className="text-dark-gray fw-600 text-decoration-line-bottom">
                leading QHSE solutions provider
              </span>{' '}
              in India and the UAE,
              delivering AI-powered workplace safety, internationally accredited courses, QHSE-focused
              e-commerce, custom software development, and advanced risk management products &
              services. Our integrated systems drive compliance, safety, and operational efficiency across
              22 industries, ensuring sustainable growth and regulatory adherence while fostering a strong
              QHSE culture
            </p>
            <a
              href="/about"
              className="btn btn-large btn-expand-ltr text-dark-gray btn-rounded fw-700"
            >
              <span className="bg-base-color"></span>About Dadisha Private Limited
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
