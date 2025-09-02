import { use } from 'framer-motion/client';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomeSectionEight() {
  const navigate = useNavigate();
  return (
    <footer className="p-0">
      <div className="container">
        <div className="row align-items-center mb-4 sm-mb-6">
          <div className="col-md-10 col-sm-8 text-center text-sm-start xs-mb-25px">
            <h5 className="mb-0 text-dark-gray fw-400 ls-minus-1px">
              Let's change the strategy and get the{' '}
              <a
                href="contact.html"
                className="text-decoration-line-bottom-medium fw-600 text-dark-gray text-dark-gray-hover"
              >
                synergetic outcome.
              </a>
            </h5>
          </div>
          <div className="col-md-2 col-sm-4 text-center text-sm-end">
            <a href="" className="footer-logo d-inline-block">
              <img
                src="images/assets/logo_50.png"
                data-at2x="images/assets/logo_112.png"
                alt=""
              />
            </a>
          </div>
        </div>
        <div className="row align-items-end mb-6 sm-mb-40px">
          {/* start footer column */}
          <div className="col-lg-5 col-sm-4 text-center text-sm-start xs-mb-25px last-paragraph-no-margin">
            <span className="d-block text-dark-gray ls-minus-05px mb-5px fw-600 font-noto">
              Dynamic Achievement In Delivering Industrial Solutions for HSEQ Assurance
            </span>
            <span className="d-block text-dark-gray ls-minus-05px mb-5px fw-600">
              UAE - INDIA
            </span>
            <br />
            <br />
          </div>
          {/* end footer column */}

          {/* start footer column */}
          <div className="col-md-4 col-sm-4 last-paragraph-no-margin ms-auto text-center text-sm-end">
            <a
              href="tel:917907887783"
              className="text-dark-gray d-block lh-30 text-dark-gray-hover"
            >
              INDIA - +91 7907887783
            </a>
            <a
              href="tel:917907887783"
              className="text-dark-gray d-block lh-30 text-dark-gray-hover"
            >
              UAE - +971 522209890
            </a>
            <a
              href="mailto: info@dadisha.com"
              className="text-dark-gray text-dark-gray-hover fw-600 text-decoration-line-bottom"
            >
              info@dadisha.com
            </a>
            <br />
            <br />
          </div>
          {/* end footer column */}
        </div>
      </div>
      <div className="footer-bottom pt-25px pb-25px border-top border-color-charcoal-grey">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 text-center text-lg-start md-mb-10px">
              <ul className="footer-navbar fw-600 fs-16">
                <li className="nav-item active">
                  <a
                    className="nav-link custom-pointer"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      navigate('/home');
                    }}
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link custom-pointer"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      navigate('/about');
                    }}
                  >
                    About
                  </a>
                </li>
                {/* <li className="nav-item cursor-pointer">
                  <a className="nav-link custom-pointer"
                     onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      navigate('/services');
                    }}>
                    Services
                  </a>
                </li> */}
                <li className="nav-item">
                  <a className="nav-link custom-pointer"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      navigate('/');
                    }}>
                    Products
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link custom-pointer"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      navigate('/contactus');
                    }}>
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-5 text-center text-lg-end">
              <span className="fs-15 font-noto">
                &copy; This site is developed by the{' '}
                <a
                  href="http://codhatch.com"
                  className="text-decoration-line-bottom text-dark-gray text-dark-gray-hover fw-500"
                  target="_blank"
                >
                  Cod Hatch.
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
