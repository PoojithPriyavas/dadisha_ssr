import React from 'react';
import { Fade, Slide } from 'react-awesome-reveal';

export default function AboutSectionFour() {
  return (
    <section className="p-0">
      <div className="container">
        <Fade duration={800} delay={200} cascade damping={0.1}>
          <div className="row mb-6 sm-mb-40px">
            <div className="col-lg-6 md-mb-25px">
              <h3
                className="mb-0 fw-500 text-dark-gray w-100 font-poppins text-sm sm:text-base tracking-normal"
                style={{ lineHeight: '1.5', hyphens: 'none' ,textJustify:'inter-word',fontSize:'clamp(1.2rem,1.35rem,1.35rem)'}}
              >
                Dadisha excels in AI-driven QHSE solutions,  offering customized-compliance strategies,
                intelligent risk mitigation, and integrated industry-wide solutions to help businesses achieve
                seamless safety and operational excellence.
              </h3>


            </div>
            <div className="col-lg-5 offset-lg-1">
              <p className="w-95 md-w-100 font-noto  text-justify" style={{ lineHeight: '1.8' }}>
                We help businesses reduce risks, optimize workflows, and maintain regulatory compliance
                through customized QHSE strategies, accredited professional training, AI-integrated risk
                management tools, and a zero-commission QHSE marketplace.
              </p>
              {/* <a href="demo-web-agency-people.html"
                  className="btn btn-medium btn-expand-ltr text-dark-gray btn-rounded fw-700"><span
                      className="bg-base-color"></span>Meet the team</a> */}
            </div>
          </div>
        </Fade>

        <Slide direction="up" duration={800} delay={200}>
          <div className="row mb-2">
            <div className="col-12 text-center">
              <div className="text-dark-gray fs-20 ls-minus-05px font-noto">
                Our expert team is here to assist. Strengthen your{' '}
                <span className="fw-700">QHSE </span> strategy today with Dadisha’s
                innovative solutions!.{' '}
                <a
                  href="/contactus"
                  className="text-dark-gray text-dark-gray-hover fw-600 text-decoration-line-bottom"
                >
                  Contact us now
                </a>
              </div>
            </div>
          </div>
        </Slide>
      </div>
    </section>
  );
}
