import React, { useContext, useEffect, useState } from 'react';
import { FaTruckFast } from 'react-icons/fa6';
import { IoReload } from 'react-icons/io5';
import { FaShield } from 'react-icons/fa6';
import { GiRabbit } from 'react-icons/gi';
import { IoMdHeadset } from 'react-icons/io';
import { FaTwitter } from 'react-icons/fa6';
import { FaFacebookF } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { FaWhatsapp, FaLinkedin, FaQuora } from 'react-icons/fa';
import { Context } from '../../context/context';
import { useNavigate } from 'react-router-dom';
import axios from '../../utilities/customAxios'
import { isTokenValid } from '../../utilities';

export default function ProductFooter() {
  const { setOpenBulkOrderPopUp, setPolicyDetails } = useContext(Context);
  const [policy, setPolicy] = useState([]);
  const navigate = useNavigate();
  const getPolicy = async () => {
    try {
      const result = await axios.get('/disha/settings');
      setPolicyDetails(result.data);
      setPolicy(result.data);
    } catch (error) {
      console.error('Error fetching policy:', error);
    }
  };

  useEffect(() => {
    getPolicy();
  }, []);


  return (
    <div>
      <div className="px-4 py-4" style={{ backgroundColor: '#FFA500' }}>
        <div className="d-flex gap-5 justify-content-center align-items-center flex-wrap">
          <h1 className="fs-4 text-white mb-0">
            Need Bulk Orders & we are there for you
          </h1>
          <img src="/img/plane.png" alt="" className="d-none d-sm-block" />
          <button
            className="btn text-white"
            onClick={() => {
              setOpenBulkOrderPopUp(true);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{ backgroundColor: '#343A40', borderRadius: '20px' }}
          >
            Apply For Bulk order
          </button>
        </div>
      </div>
      <div className="rounded-xl px-4 py-3" style={{ fontSize: '14px' }}>
        <div className="d-flex flex-wrap justify-content-between font-noto">
          <div className="d-flex justify-content-between align-items-center gap-2">
            <FaTruckFast className="textprimary" />
            <p className="text-uppercase mb-0"> free shipping</p>
          </div>
          <div className="d-flex justify-content-between align-items-center gap-2">
            <IoReload className="textprimary" />
            <p className="text-uppercase mb-0"> Bulk Order request</p>
          </div>
          <div className="d-flex justify-content-between align-items-center gap-2">
            <FaShield className="textprimary" />
            <p className="text-uppercase mb-0"> 100% secure payment</p>
          </div>

          <div className="d-flex justify-content-between align-items-center gap-2">
            <IoMdHeadset className="textprimary" />
            <p className="text-uppercase mb-0">
              {' '}
              online support
            </p>
          </div>
        </div>
      </div>
      <div style={{ borderBottom: '1px solid #DEE2E6' }}></div>
      <div className="container mt-2">
        <div className="row">
          <div class="col-12 col-sm-6 col-md-4 ">
            <h1 className="fw-bold fs-6 text-black mt-4">
              Dadisha Private limited
            </h1>
            <div className="d-flex flex-column gap-2 font-noto">
              <p className="mb-0" style={{ cursor: 'pointer' }}  ><span style={{ paddingRight: '5px', cursor: 'pointer' }}><i class="fa fa-phone" aria-hidden="true"></i></span>{policy.mobile_number}</p>
              <p className="mb-0" style={{ cursor: 'pointer' }} ><span style={{ paddingRight: '5px', cursor: 'pointer' }}><i class="fa fa-envelope" aria-hidden="true"></i></span>{policy.email}</p>
              <p className="mb-0" style={{ cursor: 'pointer' }} onClick={() => navigate('/privacy-policy')}>Privacy Policy</p>
              <p className="mb-0" style={{ cursor: 'pointer' }} onClick={() => navigate('/shopping-policy')}>Shopping Policy</p>
              <p className="mb-0" style={{ cursor: 'pointer' }} onClick={() => navigate('/supplier-policy')}>Supplier Policy</p>
              <p className="mb-0" style={{ cursor: 'pointer' }} onClick={() => navigate('/terms-and-conditions')} >Terms & Conditions</p>
            </div>
            <div className="my-4 d-flex gap-3">
              <div
                className=" rounded-full d-flex justify-content-center align-items-center"
                style={{
                  border: ' 1px solid #DEE2E6',
                  width: '40px',
                  height: '40px',
                }}
              >
                <a href='https://www.linkedin.com/company/dadisha-private-limited-company/' target='_blank'><FaLinkedin className="text-black" /></a>

              </div>
              <div
                className=" rounded-full d-flex justify-content-center align-items-center"
                style={{
                  border: ' 1px solid #DEE2E6',
                  width: '40px',
                  height: '40px',
                }}
              >
                <a href='https://x.com/Dad_of_QHSE?t=qAC_pGAJ0iMSnZBI5hNLtw&s=08' target='_blank'> <FaTwitter className="text-black" /></a>

              </div>
              <div
                className=" rounded-full d-flex justify-content-center align-items-center"
                style={{
                  border: ' 1px solid #DEE2E6',
                  width: '40px',
                  height: '40px',
                }}
              >
                <a href='https://www.facebook.com/profile.php?id=61567822319706' target='_blank'><FaFacebookF className="text-black" /></a>

              </div>
              <div
                className=" rounded-full d-flex justify-content-center align-items-center"
                style={{
                  border: ' 1px solid #DEE2E6',
                  width: '40px',
                  height: '40px',
                }}
              >
                <a href='https://www.instagram.com/dad_of_qhse/' target='_blank'><FaInstagram className="text-black" /></a>

              </div>
              <div
                className=" rounded-full d-flex justify-content-center align-items-center"
                style={{
                  border: ' 1px solid #DEE2E6',
                  width: '40px',
                  height: '40px',
                }}
              >
                <a href='https://youtube.com/@dadofqhsesolutions?si=p7nL7imUgyDDqGeN' target='_blank'><FaYoutube className="text-black" /></a>

              </div>
              <div
                className=" rounded-full d-flex justify-content-center align-items-center"
                style={{
                  border: ' 1px solid #DEE2E6',
                  width: '40px',
                  height: '40px',
                }}
              >
                <a href='https://www.quora.com/profile/DADISHA-PVT-LTD-DAD-OF-QHSE-SOLUTIONS?ch=10&oid=2969548644&share=7f78e4b4&srid=5576sF&target_type=user' target='_blank'><FaQuora className="text-black" /></a>

              </div>
              <div
                className=" rounded-full d-flex justify-content-center align-items-center"
                style={{
                  border: ' 1px solid #DEE2E6',
                  width: '40px',
                  height: '40px',
                }}
              >
                <a href='https://whatsapp.com/channel/0029Vb3ykB5CHDymQ4te8D0Y' target='_blank'><FaWhatsapp className="text-black" /></a>

              </div>
            </div>
          </div>

         { isTokenValid()&&<div class="col-12 col-sm-2 col-md-3 ">
            <h1 className="fw-bold fs-6 text-black mt-4 ">
              Your Account & Orders
            </h1>
            <div className="d-flex flex-column gap-2 font-noto">
              <p className="mb-0" style={{ cursor: isTokenValid() ? 'pointer' : 'not-allowed', opacity: isTokenValid ? 1 : 0.5 }} onClick={() => {
                if (!isTokenValid()) return;
                window.scrollTo({ top: 0, behavior: 'smooth' });
                navigate('/profile/myprofile');
              }} >Profile</p>
              <p className="mb-0" style={{ cursor: isTokenValid() ? 'pointer' : 'not-allowed', opacity: isTokenValid ? 1 : 0.5 }} onClick={() => {
                if (!isTokenValid()) return;
                window.scrollTo({ top: 0, behavior: 'smooth' });
                navigate('/cart');
              }}>Cart</p>
              <p className="mb-0" style={{ cursor: isTokenValid() ? 'pointer' : 'not-allowed', opacity: isTokenValid ? 1 : 0.5 }} onClick={() => {
                if (!isTokenValid()) return;
                window.scrollTo({ top: 0, behavior: 'smooth' });
                navigate('/profile/mywishlist');
              }}>Favorites</p>
            </div>
          </div>}

          <div class="col-12 col-sm-2 col-md-3 ">
            <h1 className="fw-bold fs-6 text-black mt-4 ">Resources</h1>
            <div className="d-flex flex-column gap-2 font-noto">
              <p className="mb-0" style={{ cursor: 'pointer' }} onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                navigate('/about');
              }}>About Us</p>
              <p className="mb-0" style={{ cursor: 'pointer' }} onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                navigate('/contactus');
              }}>Contact Us</p>
              <p className="mb-0" style={{ cursor: 'pointer' }} onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                navigate('/faqs');
              }}>FAQ</p>
              {/* <p className="mb-0"> Careers</p> */}
              <p className="mb-0" style={{ cursor: 'pointer' }} onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                navigate('/blogs/1');
              }}>Blog</p>
            </div>
          </div>
          <div class="col-12 col-sm-2 col-md-2 ">
            <h1 className="fw-bold fs-6 text-black mt-4 ">Partner</h1>
            <div className="d-flex flex-column gap-2 font-noto">
              <p
                className="mb-0 custom-pointer"
                onClick={() => navigate('/sellwithus')}
              >
                Become Seller
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6" style={{ backgroundColor: '#EBEEF6' }}>
        <div className="container">
          <div className="d-flex flex-wrap justify-content-between align-items-center py-2">
            <h1 className="fs-6 mb-0 ">
              © 2024{' '}
              <span className="text-black">Dadisha Private Limited .</span> All
              Rights Reserved
            </h1>
            <div className="d-flex gap-2 align-items-center">
              {/* <img src="/img/pay.png" alt="" style={{ height: '20px' }} />
              <img src="/img/pay1.png" alt="" style={{ height: '20px' }} />
              <img src="/img/pay2.png" alt="" style={{ height: '20px' }} />
              <img src="/img/pay3.png" alt="" style={{ height: '20px' }} />
              <img src="/img/pay4.png" alt="" style={{ height: '20px' }} /> */}
              <h1 className="fs-6 mb-0 "> Designed And Developed By <span style={{ fontWeight: 600, cursor: 'pointer' }} onClick={() => window.open('http://www.codhatch.com')} >COD HATCH</span></h1>
              {/* <img src="/img/codhatch.png" alt="codhatch" onClick={()=>window.open('http://www.codhatch.com')}  target="_blank" style={{ height: '40px',cursor:'pointer' }} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
