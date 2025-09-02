import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductFooter from '../ProductFooter';
import Header from '../../../components/Header';
import SubCategoryHeader from '../../../components/subCategoryHeader/SubCategoryHeader';
import { Fade, Slide } from 'react-awesome-reveal';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import axios from '../../../utilities/customAxios.js';

export default function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const onChange = (e, key) => {
    setLoginData({ ...loginData, [key]: e.target.value });
    // Clear errors when the user starts typing
    setErrors({ ...errors, [key]: '' });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    // Validate email
    if (!loginData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    }

    // Validate password
    if (!loginData.password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (loginData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const loginFun = async () => {
    if (!validateForm()) {
      return; // Stop if validation fails
    }

    try {
      const response = await axios.post('user/individual-login/', loginData);
      if (response.status === 200) {
        const token = response.data.access_token;
        localStorage.setItem('dadishaToken', token);
        toast.success('Login successful');
        navigate('/home');
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Login failed. Please try again.');
      }
    }
  };

  return (
    <>
      <Header />
      <div className="mt-8">
        {/* <SubCategoryHeader /> */}
        <div className="container mt-6">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="mb-4">
                <div className="">
                  <Fade duration={800} delay={200} cascade damping={0.1}>
                    <h3 className="text-center" style={{ fontSize: '1.75rem' }}>
                      Sign In
                    </h3>
                  </Fade>
                  <Slide direction="down">
                    <p className="text-center py-2">
                      There are many advantages to creating an account: the
                      payment process is faster, shipment tracking is possible
                      and much more.
                    </p>
                  </Slide>
                </div>
                <Fade duration={800} delay={200} cascade damping={0.1}>
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      loginFun();
                    }}
                  >
                    <div className="mt-6 mb-3">
                      <label htmlFor="loginEmail" className="form-label">
                        Username or Registered Email *
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="loginEmail"
                        value={loginData.email}
                        onChange={e => onChange(e, 'email')}
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
                          value={loginData.password}
                          onChange={e => onChange(e, 'password')}
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
                    <div className="d-flex justify-content-between">
                      <div className="mb-4 d-flex align-items-center gap-2">
                        <input
                          type="checkbox"
                          style={{ width: 'fit-content' }}
                          id="rememberMe"
                        />
                        <label
                          className="form-check-label"
                          style={{ lineBreak: 'unset' }}
                          htmlFor="rememberMe"
                        >
                          Remember me
                        </label>
                      </div>
                      <p
                        className="custom-pointer"
                        style={{ color: '#FFA500' }}
                        onClick={() => {
                          navigate('/forgetpassword');
                        }}
                      >
                        Forget Password?
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="rounded border-none w-100 py-2 text-white mt-4"
                      style={{ backgroundColor: '#FFA500' }}
                    >
                      Sign In
                    </button>
                    <br />
                    <br />

                    <p className="text-center py-2">
                      If do not have an account,{' '}
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
                        Register now
                      </span>{' '}
                    </p>
                    <p className="py-4 text-center py-2">
                      By creating an account or logging in, you agree to
                      Dadisha’s{' '}
                      <span style={{ color: '#FFA500',cursor:'pointer' }} onClick={()=>navigate('/privacy-policy')}>Privacy Policy</span>
                    </p>
                  </form>
                </Fade>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <ProductFooter />
      </div>
    </>
  );
}
