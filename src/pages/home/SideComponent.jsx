import React, { useEffect, useRef } from 'react';

export default function SideComponent() {
  const boxRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const boxes = document.querySelectorAll('[data-shadow-animation="true"]');
      boxes.forEach(box => addBoxAnimationClass(box));
    };

    const addBoxAnimationClass = box => {
      if (box) {
        const w = box.offsetWidth;
        const h = box.offsetHeight;
        const offset = box.getBoundingClientRect();
        const right = offset.left + w;
        const bottom = offset.top + h;
        const visibleX = Math.max(
          0,
          Math.min(
            w,
            window.innerWidth - offset.left,
            right - window.pageXOffset
          )
        );
        const visibleY = Math.max(
          0,
          Math.min(
            h,
            window.innerHeight - offset.top,
            bottom - window.pageYOffset
          )
        );
        const visible = (visibleX * visibleY) / (w * h);
        if (visible >= 0.5) {
          const animationDelay = box.getAttribute('data-animation-delay');
          if (animationDelay && parseInt(animationDelay) > 10) {
            setTimeout(() => {
              box.classList.add('shadow-in');
            }, parseInt(animationDelay));
          } else {
            box.classList.add('shadow-in');
          }
        }
      }
    };

    // Initial check
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={boxRef}
      className="sticky-wrap z-index-1 d-none d-xxl-inline-block"
      data-animation-delay="100"
      data-shadow-animation="true"
    >
      <div className="elements-social social-icon-style-10">
        <ul className="small-icon dark fw-500">
          <li className="fs-18">
            Follow us{' '}
            <span className="separator-line-1px w-30px bg-dark-gray d-inline-block align-middle ms-15px"></span>
          </li>
          <li>
            <a
              className="facebook"
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fb.
            </a>{' '}
          </li>
          <li>
            <a
              className="dribbble"
              href="https://www.instagram.com/disha_industrials?igsh=dXZ6dnU1ems3OTN4"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ig.
            </a>
          </li>
          <li>
            <a
              className="twitter"
              href="http://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tw.
            </a>
          </li>
          <li>
            <a
              className="linkedin"
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              In.
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
