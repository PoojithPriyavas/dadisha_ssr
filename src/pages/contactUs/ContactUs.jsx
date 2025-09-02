import React, { useEffect, useRef, useState } from 'react';
import Header from '../../components/Header';
import HomeSectionEight from '../home/HomeSectionEight';
import { Fade, Slide } from 'react-awesome-reveal';
import { CiUser } from 'react-icons/ci';
import { CiMail } from 'react-icons/ci';
import { HiOutlineDevicePhoneMobile } from 'react-icons/hi2';
import { RiMessage2Line } from 'react-icons/ri';
import AboutSectionFive from '../about/AboutSectionFive';
import customAxios from '../../utilities/customAxios';
import { FaYoutube } from 'react-icons/fa';
import { FaWhatsapp, FaLinkedin, FaQuora } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ProductFooter from '../products/ProductFooter';

export default function ContactUs() {
  const scrollTextRef = useRef(null);
  const [submitData, setSubmitData] = useState({
    name: '',
    address: '',
    phone_number: '',
    message: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    address: '',
    phone_number: '',
    message: '',
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollText = scrollTextRef.current;
      const scrollPosition = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = scrollPosition / maxScroll;
      const translateX = -54.7059 * scrollPercentage;

      scrollText.style.transform = `scale(1, 1) translate3d(${translateX}px, 0px, 0px)`;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const onChange = (e, key) => {
    setSubmitData({ ...submitData, [key]: e.target.value });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      address: '',
      phone_number: '',
      message: '',
    };

    if (!submitData.name) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!submitData.address) {
      newErrors.address = 'Email is required';
      valid = false;
    }

    if (!submitData.phone_number) {
      newErrors.phone_number = 'Phone number is required';
      valid = false;
    }

    if (!submitData.message) {
      newErrors.message = 'Message is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const submitDataFn = async e => {
    e.preventDefault();
    try {
      if (validateForm()) {
        const response = await customAxios.post(
          'disha/contact-form',
          submitData
        );
        if (response.status === 200) {
          toast.success('Contact form submitted successfully');
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <div>
      <Header />
      <section className="p-0  page-title-center-alignment">
        <div className="container">
          <div className="row align-items-center justify-content-center extra-very-small-screen">
            <div className="col-xl-8 col-lg-10 text-center position-relative page-title-extra-large">
              <Fade>
                <h1 className="fw-700 text-dark-gray mb-20px ls-minus-2px font-poppins">
                  Contact us
                </h1>
              </Fade>
              <Slide direction="down" duration={800} delay={200}>
                <h2 className="fw-400 ls-0px mb-0 font-noto">
                  Providing Complete QHSE Solutions—Your Trusted Compliance Partner!.
                </h2>
              </Slide>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-xl-5 col-lg-6">
              <h2 className="text-dark-gray fw-500 mb-10 ls-minus-1px font-poppins" style={{ lineHeight: '1.5', hyphens: 'none', textJustify: 'inter-word' }}>
                Strengthening your project with advanced risk management and workplace safety
                QHSE solutions.
              </h2>
              <div className="outside-box-left-5 d-none d-lg-inline-block">
                <div
                  className="text-base-color fw-600 ls-minus-20px word-break-normal contact-text"
                  ref={scrollTextRef}
                // style={{ fontSize: '15vw' }}
                >
                  contact
                </div>
              </div>
            </div>
            <div className="col-lg-6 offset-lg-1 contact-form-style-03">
              <Slide direction="right" duration={800} delay={200}>
                <h6 className="fw-500 text-dark-gray mb-20px sm-mb-10px ls-minus-05px">
                  <span className="fw-700">Hello,</span> Connect with us.
                </h6>
                <form onSubmit={submitDataFn}>
                  <div className="position-relative form-group mb-20px">
                    <span className="form-icon">
                      <CiUser />
                    </span>
                    <input
                      className={`custom-contact-input ps-0 border-radius-0px  form-control required ${errors.name ? 'is-invalid' : ''
                        }`}
                      type="text"
                      name="name"
                      placeholder="Your name*"
                      value={submitData.name}
                      onChange={e => onChange(e, 'name')}
                      id="name"
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>
                  <div className="position-relative form-group mb-20px">
                    <span className="form-icon">
                      <CiMail />
                    </span>
                    <input
                      className={`custom-contact-input ps-0 border-radius-0px  form-control required ${errors.address ? 'is-invalid' : ''
                        }`}
                      type="email"
                      name="email"
                      placeholder="Your email address*"
                      value={submitData.email}
                      onChange={e => onChange(e, 'address')}
                      id="email"
                    />
                    {errors.address && (
                      <div className="invalid-feedback">{errors.address}</div>
                    )}
                  </div>
                  <div className="position-relative form-group mb-20px">
                    <span className="form-icon">
                      <HiOutlineDevicePhoneMobile />
                    </span>
                    <input
                      className={`custom-contact-input ps-0 border-radius-0px form-control required ${errors.phone_number ? 'is-invalid' : ''
                        }`}
                      type="tel"
                      name="phone"
                      placeholder="Your Contact number*"
                      value={submitData.phone_number}
                      onChange={e => onChange(e, 'phone_number')}
                      id="phone"
                    />
                    {errors.phone_number && (
                      <div className="invalid-feedback">
                        {errors.phone_number}
                      </div>
                    )}
                  </div>
                  <div className="position-relative form-group form-textarea mb-0">
                    <textarea
                      className={` custom-contact-input ps-0 border-radius-0px  form-control ${errors.message ? 'is-invalid' : ''
                        }`}
                      name="message"
                      placeholder="Your message"
                      rows="4"
                      value={submitData.message}
                      onChange={e => onChange(e, 'message')}
                      id="message"
                    ></textarea>
                    <span className="form-icon">
                      <RiMessage2Line />
                    </span>
                    {errors.message && (
                      <div className="invalid-feedback">{errors.message}</div>
                    )}
                    <input type="hidden" name="redirect" value="" />
                    <button
                      className="btn submit btn-small btn-dark-gray btn-box-shadow btn-round-edge mt-35px mb-25px w-100"
                      type="submit"
                    >
                      Send message
                    </button>
                    <p className="fs-14 lh-24 w-100 mb-0 text-center text-lg-start font-noto">
                      Your privacy is our priority. We ensure absolute confidentiality—your information stays
                      secure and is never shared without your consent .
                    </p>
                    <div className="form-results mt-20px d-none"></div>
                  </div>
                </form>
              </Slide>
            </div>
          </div>
          <div className="row justify-content-center mt-10 mb-3">
            <div className="col-lg-12 col-md-12 col-sm-12 text-center elements-social social-icon-style-06 lg-mb-30px">
              <div className="fs-22 mb-25px text-dark-gray font-noto">
                Connect with <span className="fw-600">social media</span>
              </div>
              <ul className="extra-large-icon fw-600">
                <Fade
                  cascade
                  damping={0.1}
                  delay={200}
                  duration={500}
                  triggerOnce
                >
                  <li>
                    <a
                      className="facebook"
                      href='https://www.facebook.com/profile.php?id=61567822319706'
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="brand-label text-dark-gray">Fb</span>
                      <span className="brand-icon fa-brands fa-facebook-f"></span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="dribbble"
                      href='https://www.instagram.com/dad_of_qhse/'
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="brand-label text-dark-gray">Ig</span>
                      <span className="brand-icon fa-brands fa-instagram-square"></span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="twitter"
                      href='https://x.com/Dad_of_QHSE?t=qAC_pGAJ0iMSnZBI5hNLtw&s=08'
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="brand-label text-dark-gray">Tw</span>
                      <span className="brand-icon fa-brands fa-twitter"></span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="linkedin"
                      href='https://www.linkedin.com/company/dadisha-private-limited-company/'
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="brand-label text-dark-gray">In</span>
                      <span className="brand-icon fa-brands fa-linkedin"></span>
                      
                    </a>
                  </li>
                  <li>
                    <a
                      className="youtube"
                      href='https://youtube.com/@dadofqhsesolutions?si=p7nL7imUgyDDqGeN'
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="brand-label text-dark-gray">Yt</span>
                      <span className="brand-icon fa-brands fa-youtube"></span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="quora"
                      href='https://www.quora.com/profile/DADISHA-PVT-LTD-DAD-OF-QHSE-SOLUTIONS?ch=10&oid=2969548644&share=7f78e4b4&srid=5576sF&target_type=user'
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="brand-label text-dark-gray">Qa</span>
                      <span className="brand-icon fab fa-quora"></span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="whatsapp"
                      href='https://whatsapp.com/channel/0029Vb3ykB5CHDymQ4te8D0Y'
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="brand-label text-dark-gray">Wa</span>
                      <span className="brand-icon fa-brands fa-whatsapp"></span>
                      
                    </a>
                  </li>
                </Fade>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <AboutSectionFive />
      {/* <HomeSectionEight /> */}
      <ProductFooter />
    </div>
  );
}
