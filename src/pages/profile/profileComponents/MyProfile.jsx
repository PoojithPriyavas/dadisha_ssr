import { useContext, useEffect, useState } from 'react';
import { Context } from '../../../context/context';
import { toast } from 'react-toastify';
import axios from '../../../utilities/customAxios.js';
import './Spinner.css';

export default function MyProfile() {
  const { userData, getuserData, userDataLoading } = useContext(Context);

  const [userPostData, setUserPostData] = useState({
    name: '',
    last_name: '',
    email: '',
    mobile_number: '',
  });

  const [errors, setErrors] = useState({});

  // Fetch user data on mount
  useEffect(() => {
    getuserData();
  }, []);

  // Set form state from userData
  useEffect(() => {
    if (userData) {
      setUserPostData({
        name: userData.name || '',
        last_name: userData.last_name || '',
        email: userData.email || '',
        mobile_number: userData.mobile_number || '',
      });
    }
  }, [userData]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setUserPostData(prev => ({
      ...prev,
      [name]: value,
    }));
    setErrors(prev => ({
      ...prev,
      [name]: '',
    }));
  };

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (!userPostData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (userPostData.email && !validateEmail(userPostData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const postUserData = async () => {
    if (validate()) {
      try {
        const response = await axios.put('disha/profile-update', {
          ...userPostData,
        });
        if (response.status === 200) {
          getuserData();
          toast.success('Data updated successfully');
        }
      } catch (error) {
        toast.error('Failed to update data');
      }
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    postUserData();
  };

  // Show loader if loading
  if (userDataLoading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container pb-10">
      <h2 className="fw-700 mb-4">Account Info</h2>
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
        <div className="d-flex gap-4">
          <div className="form-group w-full">
            <label htmlFor="name">
              First Name <span className="text-red">*</span>
            </label>
            <input
              type="text"
              value={userPostData.name}
              onChange={handleInputChange}
              className="form-control"
              id="name"
              name="name"
              placeholder="Enter first name"
            />
            {errors.name && <div className="text-danger">{errors.name}</div>}
          </div>
          <div className="form-group w-full">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              value={userPostData.last_name}
              onChange={handleInputChange}
              className="form-control"
              id="last_name"
              name="last_name"
              placeholder="Enter last name"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">
            Email Address <span className="text-red">*</span>
          </label>
          <input
            type="email"
            value={userPostData.email}
            onChange={handleInputChange}
            className="form-control"
            id="email"
            name="email"
            placeholder="Enter email"
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="mobile_number">Phone Number (Optional)</label>
          <input
            type="tel"
            value={userPostData.mobile_number}
            onChange={handleInputChange}
            className="form-control"
            id="mobile_number"
            name="mobile_number"
            placeholder="Enter phone number"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white rounded-xl border-none hover-btn"
          style={{ width: 'fit-content', backgroundColor: '#fbae24' }}
        >
          Save
        </button>
      </form>
    </div>
  );
}
