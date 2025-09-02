import React from 'react';
import { FaStar } from 'react-icons/fa6';
import { Fade, Slide } from 'react-awesome-reveal';

export default function AboutSectionOne() {
  return (
    <section className="p-0 top-space-margin page-title-center-alignment">
      <div className="container">
        <div className="row align-items-center justify-content-center extra-very-small-screen">
          <div className="col-xl-8 col-lg-10 text-center position-relative 
          page-title-extra-large
          ">
            <Fade>
              <h1 className="fw-700 text-dark-gray mb-20px ls-minus-2px font-poppins about-heading">
                Dadisha Private Limited
              </h1>
            </Fade>
            <Slide direction="down">
              <h2 className="fw-400 ls-0px mb-0">
                Your Trusted QHSE Solutions – Delivering Synergetic Industrial
                Excellence.
              </h2>
            </Slide>
          </div>
        </div>
        <div className="row mb-1 mt-7">
          <Fade>
            <div className="col-lg-12 md-mb-10px">
              <div className="icon-with-text-style-08 mb-25px">
                <div className="feature-box feature-box-left-icon-middle">
                  <div className="bg-base-color text-dark-gray border-radius-30px ps-20px pe-20px fs-16 ls-minus-2px d-flex py-2">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                  <div className="feature-box-content">
                    <span className="m-10px d-inline-block fs-15 lh-24 fw-700 text-dark-gray text-uppercase text-decoration-line-bottom">
                      5 star rating
                    </span>
                  </div>
                </div>
              </div>
              <h3 className="mb-0 fw-600 text-dark-gray w-100 font-poppins text-sm sm:text-base text-justify lg:text-justify tracking-normal"
                style={{ lineHeight: '1.5', hyphens: 'none', textAlign: 'justify', textJustify: 'inter-word', marginBottom: '14px' }}>
                We're your QHSE Guardians.
              </h3>
            </div>
          </Fade>
          <div className="spacer20"></div>
          <div className="col-lg-6">
            <div className="row">
              <div className="fs-19 fw-600 text-dark-gray font-poppins" style={{ marginBottom: '12px' }}>
                Our vision
              </div>
              <p>
                <li className="font-noto  text-justify" style={{ lineHeight: '1.8' }}>
                  To be the global leader in QHSE solutions, setting a benchmark for innovation, reliability,
                  and sustainability. We envision industries thriving through compliance, skilled workforces,
                  and environmental responsibility, ensuring synergetic industrial excellence and long-term
                  success.
                </li>
                <div className="spacer20 "></div>
                <li className="font-noto  text-justify" style={{ lineHeight: '1.8' }}>
                  Setting a benchmark for innovation, reliability, and sustainability, enabling industries to thrive through compliance and skilled workforces, and promoting environmental responsibility and long-term industrial excellence.
                </li>
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row">
              <div className="fs-19 fw-600 text-dark-gray font-poppins" style={{ marginBottom: '12px' }}>
                Our mission
              </div>
              <p>
                <li className="font-noto  text-justify" style={{ lineHeight: '1.8' }}>
                  Our mission is to deliver comprehensive QHSE solutions that integrate AI-powered risk
                  management, compliance automation, and workplace safety strategies. Through
                  advanced technology, globally recognized training, and customized digital solutions, we help
                  businesses implement, execute, and sustain industry-leading safety and compliance
                  practices.
                </li>
                <div className="spacer20"></div>
                <li className="font-noto  text-justify" style={{ lineHeight: '1.8' }}>
                  Integrating AI-powered risk management, compliance automation, and workplace safety strategies, leveraging advanced technology and globally recognized training, and providing customized digital solutions to help businesses implement, execute, and sustain industry-leading safety and compliance practices.
                </li>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
