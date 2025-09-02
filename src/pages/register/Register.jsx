import React, { useState } from 'react';
import ProductFooter from '../products/ProductFooter';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import { IoEyeOutline } from 'react-icons/io5';
import { IoEyeOffOutline } from 'react-icons/io5';
import axios from '../../utilities/customAxios.js';
import { toast } from 'react-toastify';
import SubCategoryHeader from '../../components/subCategoryHeader/SubCategoryHeader.jsx';
import { FaArrowRight } from 'react-icons/fa6';
import { FaRegEye } from 'react-icons/fa6';
import { FaRegEyeSlash } from 'react-icons/fa6';

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']); // State to store OTP digits
  const [showOtpScreen, setShowOtpScreen] = useState(false); // State to toggle OTP screen
  const [otpStatus, setOtpStatus] = useState(''); // 'correct', 'incorrect', or ''

  const [loginData, setLoginData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const loginChange = (e, key) => {
    setErrors({});
    setLoginData({ ...loginData, [key]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!loginData.name) {
      newErrors.name = 'Name is required';
    }

    if (!loginData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = 'Email address is invalid';
    }

    if (!loginData.password) {
      newErrors.password = 'Password is required';
    } else if (loginData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!loginData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (loginData.password !== loginData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const registerFun = async e => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        'user/individual-registration/',
        loginData
      );
      if (response.status === 201) {
        toast.success('Registration successful');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navigate('/signin');
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Registration failed. Please try again.');
      }
    }
  };
  const [showRegisterScreen, setShowRegisterScreen] = useState(false);
  const handleOtpChange = (e, index) => {
    const value = e.target.value;

    // Reset OTP status when user starts typing
    if (otpStatus !== '') {
      setOtpStatus('');
    }

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
  const [backendOtp, setBackendOtp] = useState(null);
  // Function to handle form submission for sending code
  const handleSendCode = async e => {
    try {
      setEmailLoading(true);
      e.preventDefault();
      const response = await axios.post('user/register-verification', {
        email: loginData?.email,
      });
      if (response.status === 200) {
        const receivedOtp = response.data?.otp_hash;
        setBackendOtp(receivedOtp);
        setEmailLoading(false);
        setShowOtpScreen(true);
      }
    } catch (error) {
      setEmailLoading(false);
      toast.error('Email not found');
    }
  };

  const [otpLoading, setOtpLoading] = useState(false);

  const handleVerifyOtp = async e => {
    e.preventDefault();
    const enteredOtp = otp.join(''); // Join array of digits into a string

    if (enteredOtp.length !== 4) {
      toast.error('Please enter the complete 4-digit OTP');
      return;
    }

    if (!backendOtp) {
      toast.error('OTP not generated. Please resend the code.');
      return;
    }

    // Divide the backend OTP by 2
    const otpString = String(backendOtp);
    const startIndex = Math.floor((otpString.length - 4) / 2);
    const expectedOtp = otpString.substring(startIndex, startIndex + 4);

    // Continue with your verification logic
    console.log('Expected OTP:', expectedOtp);

    if (enteredOtp === expectedOtp) {
      // Set OTP status to correct first
      setOtpStatus('correct');
      
      // Show success toast after a brief delay
      setTimeout(() => {
        toast.success('OTP verified successfully!');
        setShowRegisterScreen(true);
      }, 500);
    } else {
      // Set OTP status to incorrect
      setOtpStatus('incorrect');
      toast.error('Incorrect OTP');
    }
  };

  // Function to get input style based on OTP status
  const getOtpInputStyle = () => {
    if (otpStatus === 'correct') {
      return { 
        width: '50px', 
        textAlign: 'center', 
        borderColor: '#28a745',
        backgroundColor: '#d4edda'
      };
    } else if (otpStatus === 'incorrect') {
      return { 
        width: '50px', 
        textAlign: 'center', 
        borderColor: '#dc3545',
        backgroundColor: '#f8d7da'
      };
    }
    return { width: '50px', textAlign: 'center' };
  };

  return (
    <>
      <Header />
      <div className="mt-8">
        {/* <SubCategoryHeader /> */}
        {showRegisterScreen ? (
          <div className="container mt-6">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="mb-4">
                  <div className="">
                    <h3 className="text-center" style={{ fontSize: '1.75' }}>
                      Register
                    </h3>
                    <p className="text-center py-2">
                      If you have an account,{' '}
                      <span
                        className="custom-pointer"
                        style={{ color: '#FFA500', textDecoration: 'underline' }}
                        onClick={() => navigate('/signin')}
                      >
                        sign in
                      </span>{' '}
                      with your username or email address.
                    </p>
                  </div>
                  <div>
                    <form onSubmit={registerFun}>
                      <div className="mt-6 mb-3">
                        <label htmlFor="loginName" className="form-label">
                          Name *
                        </label>
                        <input
                          type="text"
                          className={`form-control `}
                          id="loginName"
                          onChange={e => loginChange(e, 'name')}
                        />
                        {errors.name && (
                          <div className="text-danger">{errors.name}</div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="loginEmail" className="form-label">
                          Email address *
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="loginEmail"
                          onChange={e => loginChange(e, 'email')}
                          value={loginData?.email}
                        />
                        {errors.email && (
                          <div className="text-danger">{errors.email}</div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="loginPassword" className="form-label">
                          Password *
                        </label>
                        <div className="position-relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            className="form-control"
                            id="loginPassword"
                            onChange={e => loginChange(e, 'password')}
                          />
                          <div className="position-absolute top-0 end-0 h-100 d-flex align-items-center">
                            {showPassword ? (
                              <IoEyeOffOutline
                                className="me-3 custom-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                              />
                            ) : (
                              <IoEyeOutline
                                className="me-3 custom-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                              />
                            )}
                          </div>
                        </div>
                        {errors.password && (
                          <div className="text-danger">{errors.password}</div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="loginConfirmPassword"
                          className="form-label"
                        >
                          Confirm Password *
                        </label>
                        <div className="position-relative">
                          <input
                            type={showPassword2 ? 'text' : 'password'}
                            className="form-control"
                            id="loginConfirmPassword"
                            onChange={e => loginChange(e, 'confirmPassword')}
                          />
                          <div className="position-absolute top-0 end-0 h-100 d-flex align-items-center">
                            {showPassword2 ? (
                              <IoEyeOffOutline
                                className="me-3 custom-pointer"
                                onClick={() => setShowPassword2(!showPassword2)}
                              />
                            ) : (
                              <IoEyeOutline
                                className="me-3 custom-pointer"
                                onClick={() => setShowPassword2(!showPassword2)}
                              />
                            )}
                          </div>
                        </div>
                        {errors.confirmPassword && (
                          <div className="text-danger">
                            {errors.confirmPassword}
                          </div>
                        )}
                      </div>
                      <p className="">
                        By creating an account or logging in, you agree to
                        Dadisha's{' '}
                        <span style={{ color: '#FFA500', cursor: 'pointer' }} onClick={() => navigate('/privacy-policy')}>Privacy Policy</span>
                      </p>
                      <button
                        type="submit"
                        className="rounded border-none w-100 py-2 text-white mt-4"
                        style={{ backgroundColor: '#FFA500' }}
                      >
                        Register
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : showOtpScreen ? (
          // OTP Verification Screen
          <div className='container'>
            <div className='row justify-content-center'>
              <div className='col-md-6'>
                <h3 className="text-center" style={{ fontSize: '1.75rem' }}>
                  Verify Your Email Address
                </h3>
                <p className="text-center py-2">
                  Please check your inbox and click the link to verify your email.
                </p>

                <form onSubmit={handleVerifyOtp}>
                  <div className="d-flex justify-content-center gap-2 gap-sm-4 mt-10 mb-10">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        className="form-control"
                        style={getOtpInputStyle()}
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
            </div>
          </div>

        ) : (

          <div className='container'>
            <div className='row justify-content-center'>
              <div className='col-md-6'>
                <h3 className="text-center" style={{ fontSize: '1.75rem' }}>
                  Verify & Register
                </h3>
                <p className="text-center py-2">
                  Enter your email address
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
                      onChange={e => loginChange(e, 'email')}
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
                          navigate('/register');
                        }}
                      >
                        Sign In
                      </span>{' '}
                    </p>
                    {/* <p className="">
                  Don't have an account?
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
                </p> */}
                  </div>
                  <p className="py-4">
                    You may contact Customer Service
                    <span style={{ color: '#FFA500' }}>Customer Service</span>
                    for help restoring access to your account.
                  </p>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-10">
        <ProductFooter />
      </div>
    </>
  );
}