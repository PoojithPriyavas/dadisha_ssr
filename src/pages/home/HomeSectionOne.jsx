import React, { useEffect } from 'react';
import anime from 'animejs';

const particleDefaultOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: false,
        value_area: 800,
      },
    },
    color: {
      value: ['#fdc14c', '#fd5c4c', '#48bb0f'],
    },
    shape: {
      type: 'circle',
    },
    size: {
      value: 10,
      random: true,
      anim: {
        enable: true,
        speed: 1,
      },
    },
    opacity: {
      value: 0.5,
      random: false,
    },
    move: {
      direction: 'right',
      attract: {
        enable: true,
      },
    },
    line_linked: {
      enable: false,
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: false,
      },
      onclick: {
        enable: false,
      },
    },
  },
  retina_detect: true,
};

const numberOfEls = 100;
const duration = 6000;
const delay = duration / numberOfEls;

export default function HomeSectionOne() {
  useEffect(() => {
    // Initialize particles
    const particleItems = document.querySelectorAll('[data-particle="true"]');
    if (typeof particlesJS === 'function' && particleItems.length) {
      particleItems.forEach(particleItem => {
        const particleId = particleItem.getAttribute('id');
        const particleItemOptions = particleItem.getAttribute(
          'data-particle-options'
        );
        let options;
        if (
          particleItemOptions &&
          particleItemOptions !== 'undefined' &&
          typeof particleItemOptions !== 'undefined'
        ) {
          options = JSON.parse(particleItemOptions);
        } else {
          options = particleDefaultOptions;
        }
        particlesJS(particleId, options);
      });
    }

    // Initialize animation
    const wrapperEl = document.querySelector('.looping-wrapper') || false;

    let tl = anime.timeline({
      duration: delay,
      complete: function () {
        tl.restart();
      },
    });

    function createEl(i) {
      let el = document.createElement('div');
      const rotate = (360 / numberOfEls) * i;
      const translateY = -50;
      el.classList.add('el');
      el.style.transform =
        'rotate(' + rotate + 'deg) translateY(' + translateY + '%)';
      tl.add({
        begin: function () {
          anime({
            targets: el,
            rotate: [rotate + 'deg', rotate + 10 + 'deg'],
            translateY: [translateY + '%', translateY + 10 + '%'],
            scale: [1, 1.25],
            easing: 'easeInOutSine',
            direction: 'alternate',
            duration: duration * 0.1,
          });
        },
      });
      if (wrapperEl) wrapperEl.appendChild(el);
    }

    for (let i = 0; i < numberOfEls; i++) createEl(i);

    // Cleanup function to remove elements when the component unmounts
    return () => {
      if (wrapperEl) {
        wrapperEl.innerHTML = '';
      }
    };
  }, []);

  return (
    <section className="p-0 border-radius-6px full-screen md-h-600px sm-h-450px  position-relative overflow-hidden">
      <div
        id="particles-style-01"
        className="position-absolute h-100 top-0 left-0 w-100"
        data-particle="true"
        data-particle-options='{"particles":{"number":{"value":10,"density":{"enable":true,"value_area":800}},"color":{"value":["#000000", "#ffbd1f"]},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":1,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":4,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":false,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"repulse"},"onclick":{"enable":true,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true}'
      ></div>
      <div className="looping-wrapper md-h-100"></div>

      <div className="image-middle-fadein img">
        <img src="images/assets/dadisha_logo.png" alt="Logo" />
      </div>
    </section>
  );
}
