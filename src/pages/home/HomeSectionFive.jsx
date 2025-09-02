import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import customAxios from '../../utilities/customAxios';

export default function HomeSectionFive() {
  const animatedDivRef = useRef(null);

  useEffect(() => {
    console.log('HomeSectionFive component mounted');

    const handleAnimation = () => {
      const elements = document.querySelectorAll('[data-anime]');
      elements.forEach(element => {
        try {
          const animeData = JSON.parse(element.getAttribute('data-anime'));

          // Ensure the required properties exist and are arrays
          if (
            Array.isArray(animeData.translateY) &&
            Array.isArray(animeData.scale) &&
            Array.isArray(animeData.opacity)
          ) {
            element.style.transition = `transform ${animeData.duration}ms ${animeData.easing}`;
            element.style.transform = `translateY(${animeData.translateY[1]}px) scale(${animeData.scale[1]})`;
            element.style.opacity = animeData.opacity[1];
          } else {
            console.error('Invalid anime data format:', animeData);
          }
        } catch (error) {
          console.error('Error parsing anime data:', error);
        }
      });
    };

    handleAnimation();

    // Scroll-triggered animation using anime.js
    const scrollAnimation = () => {
      const element = animatedDivRef.current;
      if (!element) return;

      const scrollTop = window.scrollY;
      const elementTop = element.offsetTop;
      const elementHeight = element.offsetHeight;

      // Calculate the scroll progress
      const scrollProgress = (scrollTop - elementTop) / elementHeight;
      console.log('Scroll Progress:', scrollProgress);

      // Adjust the scroll progress to start the animation at -4.50
      const adjustedScrollProgress = scrollProgress + 4.5;

      // Animate the element from left to right
      anime({
        targets: element,
        translateX: [-400, 500], // Adjust the values as needed
        duration: 10000, // Adjust the duration as needed
        easing: 'easeOutQuad',
        autoplay: false,
      }).seek(adjustedScrollProgress * 1000); // Adjust the seek value based on scroll progress
    };

    // Attach the scroll event listener
    window.addEventListener('scroll', scrollAnimation);
    console.log('Scroll event listener attached');

    // Cleanup function
    return () => {
      console.log('HomeSectionFive component unmounted');
      window.removeEventListener('scroll', scrollAnimation);
      console.log('Scroll event listener removed');
    };
  }, []);

  // const [products, setProducts] = useState([]);
  // const getProducts = async () => {
  //   const response = await customAxios.get('disha/homepage');
  //   setProducts(response.data.products);
  // };

  // useEffect(() => {
  //   getProducts();
  // }, []);

  return (
    <section className="pb-0 pt-0 ps-2 pe-2 lg-pt-3 md-pt-7 sm-p-0  d-none d-md-flex">
      <div className="container">
        <div className="row align-items-end mb-6">
          <div className="col-lg-9 col-md-8">
            <div className="outside-box-left-25 md-outside-box-left-50">
              <div
                ref={animatedDivRef}
                className="fs-225 xl-fs-190 lg-fs-140 text-base-color fw-600 ls-minus-20px position-relative d-inline-block word-break-normal"
                data-bottom-top="transform:scale(1, 1) translate3d(0px, 0px, 0px);"
                data-top-bottom="transform:scale(1, 1) translate3d(400px, 0px, 0px);"
              >
                Dadisha Scope
                <div
                  className="position-absolute right-minus-100px top-minus-120px z-index-9 md-w-200px d-none d-md-block"
                  data-anime='{ "translateY": [0, 0], "scale": [0.7, 1], "opacity": [0,1], "duration": 800, "delay": 200, "staggervalue": 300, "easing": "easeOutQuad" }'
                >
                  <img
                    src="images/newassets/ring-white.png"
                    className="animation-rotation"
                    alt=""
                  />
                  <div className="absolute-middle-center w-100 z-index-minus-1">
                    <img
                      src="images/newassets/round-black-background.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-lg-3 col-md-4 text-start text-md-end">
            <a
              href="products.html"
              className="btn btn-large btn-expand-ltr text-dark-gray btn-rounded fw-700 mb-50px sm-mb-0"
            >
              <span className="bg-base-color"></span>Explore projects
            </a>
          </div> */}
        </div>
      </div>
      {/* <div className="container">
        <div>
          <div className="row">
            <div className="col-12 filter-content">
              <ul className="disha-image-list portfolio-simple grid grid-3col xxl-grid-3col xl-grid-3col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-large text-center">
                {products.map(item => (
                  <li key={item.id}>
                    <div className="disha-image-container">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="d-flex gap-2  align-items-center  portfolio-caption pt-35px pb-35px md-pt-25px md-pb-25px">
                      <a className="fs-20 mb-0 text-dark-gray">{item.name}</a>
                      <div>-</div>
                      <div className="fs-16 mb-0">{item.name2}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div> */}
    </section>
  );
}
