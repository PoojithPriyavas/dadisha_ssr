import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductFooter from '../products/ProductFooter';
import Header from '../../components/Header.jsx';
import { FaArrowRight } from 'react-icons/fa6';
import { FaRegEye } from 'react-icons/fa6';
import { FaRegEyeSlash } from 'react-icons/fa6';
import axios from '../../utilities/customAxios.js';
import { toast } from 'react-toastify';

export default function ForgetPWD() {
  const navigate = useNavigate();
  const [showOtpScreen, setShowOtpScreen] = useState(false); // State to toggle OTP screen
  const [showResetPasswordScreen, setShowResetPasswordScreen] = useState(false); // State to toggle Reset Password screen
  const [otp, setOtp] = useState(['', '', '', '']); // State to store OTP digits
  const [pwd1show, setpwd1show] = useState(false);
  const [pwd2show, setpwd2show] = useState(false);
  const [pwd1, setpwd1] = useState(false);
  const [pwd2, setpwd2] = useState(false);
  const [email, setEmail] = useState('');

  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  // Function to handle OTP input change
  const handleOtpChange = (e, index) => {
    const value = e.target.value;

    // Allow only single digit
    if (value.length <= 1 && !isNaN(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus the next input
      if (value && index < 3) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const [emailLoading, setEmailLoading] = useState(false);
  // Function to handle form submission for sending code
  const handleSendCode = async e => {
    try {
      setEmailLoading(true);
      e.preventDefault();
      const response = await axios.post('user/forget-password', {
        email: email,
      });
      if (response.status === 200) {
        setEmailLoading(false);
        setShowOtpScreen(true); // Show OTP screen after sending code
      }
    } catch (error) {
      setEmailLoading(false);
      toast.error('Email not found');
    }
  };

  const [otpLoading, setOtpLoading] = useState(false);
  // Function to handle OTP verification
  const handleVerifyOtp = async e => {
    try {
      e.preventDefault();
      setOtpLoading(true);
      const enteredOtp = otp.join('');
      const response = await axios.post('user/submit-otp', {
        email: email,
        otp: enteredOtp,
      });
      if (response.status === 200) {
        setOtpLoading(false);
        setShowResetPasswordScreen(true);
      } else {
        toast.error('Invalid OTP');
        setOtpLoading(false);
      }
    } catch (error) {
      toast.error('Invalid OTP');
      setOtpLoading(false);
    }
  };

  const [passwordLoading, setPasswordLoading] = useState(false);
  // Function to handle Reset Password form submission
  const handleResetPassword = async e => {
    try {
      e.preventDefault();
      setPasswordLoading(true);
      if (pwd1 !== pwd2) {
        toast.error('Passwords do not match');
        setPasswordLoading(false);
        return;
      }
      if (pwd1.length < 6) {
        toast.error('Password must be at least 6 digits long');
        setPasswordLoading(false);
        return;
      }

      const response = await axios.post('user/reset-password', {
        email: email,
        password: pwd1,
      });
      if (response.status === 200) {
        setShowResetPasswordScreen(false);
        toast.success('Password reset successful');
        navigate('/signin');
        setPasswordLoading(false);
      }
    } catch (error) {
      toast.error('Password reset failed');
      setPasswordLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-18">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="mb-4">
              {showResetPasswordScreen ? (
                // Reset Password Screen
                <div>
                  <h3 className="text-center" style={{ fontSize: '1.75rem' }}>
                    Reset Password
                  </h3>
                  <p className="text-center py-2">
                    Enter the email address associated with your Dadisha
                    account.
                  </p>

                  <form onSubmit={handleResetPassword}>
                    <div className="mt-6">
                      <label htmlFor="newPassword" className="form-label">
                        New Password
                      </label>
                      <div className="position-relative">
                        <input
                          type={pwd1show ? 'text' : 'password'}
                          className="form-control"
                          id="newPassword"
                          onChange={e => setpwd1(e.target.value)}
                          required
                        />
                        <div className="position-absolute end-0 top-0 h-100">
                          <div className="d-flex align-items-center h-100 me-4">
                            {!pwd1show ? (
                              <FaRegEye
                                className="custom-pointer"
                                onClick={() => {
                                  setpwd1show(!pwd1show);
                                }}
                              />
                            ) : (
                              <FaRegEyeSlash
                                className="custom-pointer"
                                onClick={() => {
                                  setpwd1show(!pwd1show);
                                }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label htmlFor="confirmPassword" className="form-label">
                        Confirm Password
                      </label>
                      <div className="position-relative">
                        <input
                          type={pwd2show ? 'text' : 'password'}
                          className="form-control"
                          id="confirmPassword"
                          onChange={e => setpwd2(e.target.value)}
                          required
                        />
                        <div className="position-absolute end-0 top-0 h-100">
                          <div className="d-flex align-items-center h-100 me-4">
                            {!pwd2show ? (
                              <FaRegEye
                                className="custom-pointer"
                                onClick={() => {
                                  setpwd2show(!pwd2show);
                                }}
                              />
                            ) : (
                              <FaRegEyeSlash
                                className="custom-pointer"
                                onClick={() => {
                                  setpwd2show(!pwd2show);
                                }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={passwordLoading}
                      className={`${passwordLoading ? 'bg-p-disabled' : 'bg-p'
                        } rounded border-none w-100 py-2 text-white mt-4 d-flex justify-content-center align-items-center`}
                    >
                      RESET PASSWORD
                    </button>
                  </form>
                </div>
              ) : showOtpScreen ? (
                // OTP Verification Screen
                <div>
                  <h3 className="text-center" style={{ fontSize: '1.75rem' }}>
                    Verify Your Email Address
                  </h3>
                  <p className="text-center py-2">
                    Nam ultricies lectus a risus blandit elementum. Quisque arcu
                    arcu, tristique a eu in diam.
                  </p>

                  <form onSubmit={handleVerifyOtp}>
                    <div className="d-flex justify-content-center gap-2 gap-sm-4 mt-10 mb-10">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          type="text"
                          className="form-control"
                          style={{ width: '50px', textAlign: 'center' }}
                          maxLength={1}
                          value={digit}
                          onChange={e => handleOtpChange(e, index)}
                          id={`otp-input-${index}`}
                        />
                      ))}
                    </div>
                    <button
                      type="submit"
                      disabled={otpLoading}
                      className={`${otpLoading ? 'bg-p-disabled' : 'bg-p'
                        } rounded border-none w-100 py-2 text-white mt-4 d-flex justify-content-center align-items-center`}
                    >
                      VERIFY OTP <FaArrowRight className="ms-2" />
                    </button>
                    <div className="d-flex justify-content-between mt-6 ">
                      <p className="fw-600">Verification Code</p>
                      <p
                        className="fw-600 custom-pointer"
                        style={{ color: '#FFA500' }}
                        onClick={handleSendCode}
                      >
                        Resend Code
                      </p>
                    </div>
                  </form>
                </div>
              ) : (
                // Forget Password Screen
                <div>
                  <h3 className="text-center" style={{ fontSize: '1.75rem' }}>
                    Forget Password
                  </h3>
                  <p className="text-center py-2">
                    Enter the email address associated with your Dadisha
                    account.
                  </p>
                  <form onSubmit={handleSendCode}>
                    <div className="mt-6">
                      <label htmlFor="loginEmail" className="form-label">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="loginEmail"
                        required
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>

                    <button
                      type="submit"
                      // disabled={emailLoading}
                      className={`${emailLoading ? 'bg-p-disabled' : 'bg-p'
                        } rounded border-none w-100 py-2 text-white mt-4 d-flex justify-content-center align-items-center`}
                      style={{ backgroundColor: '#FFA500' }}
                    >
                      {emailLoading ? (
                        <div
                          className="spinner-border spinner-border-sm text-white"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        <>
                          SEND CODE <FaArrowRight className="ms-2" />
                        </>
                      )}
                    </button>
                    <div className="mt-4 d-flex justify-content-between flex-wrap">
                      <p className="">
                        Already have an account?
                        <span
                          className="custom-pointer"
                          style={{
                            color: '#FFA500',
                            textDecoration: 'underline',
                          }}
                          onClick={() => {
                            navigate('/register');F
                          }}
                        >
                          Sign In
                        </span>{' '}
                      </p>
                      <p className="">
                        Don’t have an account?
                        <span
                          className="custom-pointer"
                          style={{
                            color: '#FFA500',
                            textDecoration: 'underline',
                          }}
                          onClick={() => {
                            navigate('/register');
                          }}
                        >
                          Sign Up
                        </span>{' '}
                      </p>
                    </div>
                    <p className="py-4">
                      You may contact Customer Service
                      <span style={{ color: '#FFA500' }}>Customer Service</span>
                      for help restoring access to your account.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <ProductFooter />
      </div>
    </>
  );
}
