import React, { useContext, useState, useEffect,useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import { Slide } from 'react-awesome-reveal';
import { Context } from '../../context/context';
import axios from '../../utilities/customAxios';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

export default function BulkOrderComponent() {
  const { bulkReqSendData, setBulkReqSendData, setOpenBulkOrderPopUp } = useContext(Context);
  const location = useLocation();
  // const [bulkReqSendData, setBulkReqSendData] = useState({
  //   name: '',
  //   email: '',
  //   mobile_number: '',
  //   message: '',
  // });
  const initialPathname = useRef(location.pathname);

  useEffect(() => {
    // Only close if the pathname has actually changed (not initial render)
    if (location.pathname !== initialPathname.current) {
      setOpenBulkOrderPopUp(false);
    }
  }, [location.pathname, setOpenBulkOrderPopUp]);

  const [errors, setErrors] = useState({}); // State to hold validation errors

  const handleInputChange = e => {
    const { id, value } = e.target;
    setBulkReqSendData(prevState => ({
      ...prevState,
      [id]: value,
    }));
    // Clear the error for the field when the user starts typing
    setErrors(prevErrors => ({
      ...prevErrors,
      [id]: '',
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!bulkReqSendData.name.trim()) {
      newErrors.name = 'Name / Company is required';
    }
    if (!bulkReqSendData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(bulkReqSendData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!bulkReqSendData.mobile_number.trim()) {
      newErrors.mobile_number = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(bulkReqSendData.mobile_number)) {
      newErrors.mobile_number = 'Phone Number must be 10 digits';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const sendBulkReqFun = async e => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!validateForm()) {
      return; // Stop if validation fails
    }

    try {
      const response = await axios.post(
        'disha/bulk-request-quote',
        bulkReqSendData
      );
      if (response.status === 200) {
        toast.success('Request sent successfully');
        setOpenBulkOrderPopUp(false);
      }
    } catch (error) {
      toast.error('Failed to send request');
      console.error(error);
    }
  };

  return (
    <div className="position-absolute end-0 top-0" style={{ width: '30rem' }}>
      <Slide direction="right" duration={800} delay={200}>
        <div
          className="fw-600 text-black custom-pointer bg-white"
          style={{
            height: '100vh',
            boxShadow: '0px 4px 23.4px 0px rgba(0, 0, 0, 0.06)',
          }}
        >
          <div style={{ borderBottom: '1px solid #EFEFEF' }}>
            <div className="me-3 ms-3 d-flex justify-content-between align-items-center py-4">
              <h1 className="fs-4 textprimary">Request a Quote</h1>
              <IoMdClose
                className="fs-5 custom-pointer"
                onClick={() => setOpenBulkOrderPopUp(false)}
              />
            </div>
          </div>
          <form className="p-4" onSubmit={sendBulkReqFun}>
            <div className="mb-3 mt-2">
              <label htmlFor="name" className="form-label fw-500">
                Name / Company <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                placeholder="Name / Company"
                className="form-control"
                id="name"
                value={bulkReqSendData.name}
                onChange={handleInputChange}
                required
              />
              {errors.name && (
                <div className="text-danger small">{errors.name}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-500">
                Email<span className="text-danger"> *</span>
              </label>
              <input
                type="email"
                placeholder="example@example.com"
                className="form-control"
                id="email"
                value={bulkReqSendData.email}
                onChange={handleInputChange}
                required
              />
              {errors.email && (
                <div className="text-danger small">{errors.email}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="mobile_number" className="form-label fw-500">
                Phone Number<span className="text-danger"> *</span>
              </label>
              <input
                type="tel"
                placeholder="Phone Number"
                className="form-control"
                id="mobile_number"
                value={bulkReqSendData.mobile_number}
                onChange={handleInputChange}
                required
              />
              {errors.mobile_number && (
                <div className="text-danger small">{errors.mobile_number}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label fw-500">
                Message
              </label>
              <textarea
                className="form-control"
                placeholder="Write your message here"
                id="message"
                rows="5"
                value={bulkReqSendData.message}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-p text-white w-100 px-4 py-2 border-none fs-6 rounded-md"
            >
              Request Quote
            </button>
          </form>
        </div>
      </Slide>
    </div>
  );
}
