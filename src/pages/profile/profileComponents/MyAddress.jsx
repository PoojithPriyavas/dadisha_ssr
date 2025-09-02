import React, { useContext, useEffect, useState, useRef } from 'react';
import axios from '../../../utilities/customAxios';
import { toast } from 'react-toastify';
import { Context } from '../../../context/context';
import { Modal, Rate } from 'antd';
import { useNavigate } from 'react-router-dom';
// import { MoreVertical } from "lucide-react";

export default function MyAddress() {
  const [countryList, setCountryList] = useState([]);
  const [addAddressVisible, setAddAddressVisible] = useState(false);
  const { userData, getuserData } = useContext(Context);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState('');
  const [addressList, setAddressList] = useState([]);
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [loading, setLoading] = useState(false);


  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setSelectedAddressId(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleEditClick = (addressDetails) => {
    setAddress(addressDetails);
    setSelectedAddressId(addressDetails.id);
    setIsEditMode(true);
    setAddAddressVisible(true);
  };

  const [errors, setErrors] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  const [address, setAddress] = useState({
    address_id: '',
    name: '',
    company_name: '',
    country: '',
    state: '',
    district: '',
    pincode: '',
    address: '',
    landmark_1: '',
    landmark_2: '',
    mobile_number: '',
    email: '',
    remarks: '',
  });

  useEffect(() => {
    getCountryList();
    getAddressList()
  }, []);




  const showModal = () => {

    setAddAddressVisible(true);
  };

  const handleCancel = () => {
    setAddAddressVisible(false);
    setIsEditMode(false);
    setAddress({
      name: "",
      company_name: "",
      district: "",
      pincode: "",
      landmark_1: "",
      landmark_2: "",
      address: "",
      email: "",
      mobile_number: "",
      remarks: "",
    });
  };
  const getCountryList = async () => {
    const result = await axios.get('/disha/country-list');
    setCountryList(result.data);
  };
  const getAddressList = async () => {
    const token = localStorage.getItem('dadishaToken');
    setLoading(true);
    try {
      const result = await axios.get('/disha/add-address', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAddressList(result.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createAddress = async () => {
    if (!validateAddressFields()) return;

    try {
      const response = await axios.post(
        '/disha/add-address',
        address
      );
      if (response.status === 201) {
        toast.success('Address added successfully');
        setAddAddressVisible(false);
        getAddressList();
        setAddress({
          name: '',
          company_name: '',
          country: '',
          state: '',
          district: '',
          pincode: '',
          address: '',
          landmark_1: '',
          landmark_2: '',
          mobile_number: '',
          email: '',
          remarks: '',
        });
        setValidationErrors({});
      }
    } catch (error) {
      toast.error('Failed to add address');
    }
  };

  const updateAddress = async (value) => {
    const updatedAddress = {
      ...address,
      address_id: value.id,
    };

    try {
      await axios.put('/disha/add-address', updatedAddress);
      toast.success('Address updated successfully');
      setAddAddressVisible(false);
      getAddressList();
    } catch (error) {
      toast.error('Failed to Update address');
      console.error(error);
    }
  };

  const deleteAddress = async (addressId) => {
       const token = localStorage.getItem('dadishaToken');
    try {
      const response = await axios.delete('/disha/add-address', {
        data: {
          address_id: addressId.id
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Address deleted successfully');
      getAddressList();
      return response.data;
    } catch (error) {
      toast.success('error deleting address');
      console.error('Error deleting address:', error);
      // throw error;
    }
  };

  const validateAddressFields = () => {
    const requiredFields = [
      'name',
      'country',
      'state',
      'district',
      'pincode',
      'address',
      'mobile_number',
      'email',
    ];
    const errors = {};

    requiredFields.forEach(field => {
      if (!address[field]) {
        errors[field] = `This field is required`;
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const handleStateChange = e => {
    // setSelectedState(e.target.value);
    setAddress({
      ...address,
      state: e.target.value,
    });
  };
  const handleCountryChange = e => {
    const selectedCountryId = e.target.value;
    const country = countryList.find(c => c.id === parseInt(selectedCountryId));
    // setSelectedCountry(country);
    // setSelectedState('');
    setAddress({
      ...address,
      country: country?.name || '',
      state: '',
    });
  };
  console.log(addressList, "address list")


  return (
    <div className='container pb-10' >
      <h2 className="fw-700 mb-4">My Address</h2>
      <button className="rounded mb-4" onClick={() => showModal()} style={{ padding: '10px 10%', border: 'none', background: '#ffa500', color: '#fff', fontSize: '12px' }}>ADD A NEW ADDRESS</button>

      {/* {addressList.map((item, i) =>

          <div
            key={i}
            className="border rounded-lg shadow-sm p-4 mb-2 bg-white"
          >
            <p className="font-bold">{item.name}</p>
            <p className="text-gray-600">{item.address}</p>
            <button
              onClick={() => handleEditClick(item)}
              className="text-blue-500 hover:underline mt-2"
            >
              Edit
            </button>
          </div>

        )} */}

      {/* <div className="max-w-2xl mx-auto bg-white shadow-md rounded-md">
        {addressList.map((item, index) => (
          <div
            key={item.id}
            className={`flex items-center justify-between p-4 ${index !== item.length - 1 ? "border-b" : ""}`}
          >
            <div className="flex-1">
              <p className="font-semibold">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.address}</p>
            </div>
            <p className="text-gray-500 cursor-pointer">h</p>
          </div>
        ))}
      </div> */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className='mb-6 rounded-xl' style={{ backgroundColor: 'rgb(250, 250, 250)' }}>
          {addressList.map((item, index) => (
            <div key={item.id} className="d-flex justify-content-between align-items-center position-relative px-4 py-4"
              style={{ borderBottom: index !== addressList.length - 1 ? '1px solid #E3E3E3' : undefined }}>
              <div>
                <p className="text-black fw-600 mb-1">{item.name}</p>
                <p className="text-muted small mb-0">{item.landmark_1} , {item.pincode}</p>
              </div>
              <div className="position-relative">
                <div className="dropdown-container" style={{ position: 'relative' }}>
                  <a
                    className="d-flex align-items-center gap-2 text-black custom-pointer"
                    style={{ textDecoration: 'none' }}
                    onClick={() => setSelectedAddressId(prev => prev === item.id ? null : item.id)}
                  >
                    ⋮
                  </a>

                  {selectedAddressId === item.id && (
                    <div
                      className="position-absolute"
                      style={{
                        right: '100%',
                        top: 0,
                        minWidth: '100px',
                        zIndex: 1000,
                        backgroundColor: 'white',
                        borderRadius: '4px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                      }}
                    >
                      <div className="d-flex flex-column">
                        <button
                          className="dropdown-item w-100 text-start px-3 py-1 bg-transparent border-0"
                          onClick={() => handleEditClick(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="dropdown-item w-100 text-start px-3 py-1 bg-transparent border-0 text-danger"
                          onClick={() => deleteAddress(item)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Modal
        title={isEditMode ? "Edit Address" : "New Address"}
        visible={addAddressVisible}
        onCancel={handleCancel}
        centered
        footer={null}
      >
        <div className="mt-4 d-flex flex-column gap-3">
          <div className="d-flex gap-3">
            <div className="w-50">
              <label className="form-label">User name</label>
              <input
                type="text"
                value={address.name}
                placeholder="Enter name"
                className="form-control"
                onChange={e =>
                  setAddress({
                    ...address,
                    name: e.target.value,
                  })
                }
              />
              {validationErrors.name && (
                <p className="text-danger small mt-1">
                  {validationErrors.name}
                </p>
              )}
            </div>
            <div className="w-50">
              <label className="form-label">
                Company Name (Optional)
              </label>
              <input
                type="text"
                value={address.company_name}
                className="form-control"
                placeholder="Enter company name"
                onChange={e =>
                  setAddress({
                    ...address,
                    company_name: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="d-flex gap-3">
            <div className="w-50">
              <label className="form-label">Country</label>
              <select
                className="form-select"
                onChange={handleCountryChange}
                value={countryList.find(c => c.name === address.country)?.id || ''}
              >
                <option value="">Select country</option>
                {countryList.map(country => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
              {validationErrors.country && (
                <p className="text-danger small mt-1">
                  {validationErrors.country}
                </p>
              )}
            </div>
            <div className="w-50">
              <label className="form-label">Region/State</label>
              <select
                className="form-select"
                onChange={handleStateChange}
                value={address.state}
                disabled={!address.country}
              >
                <option value="">Select state</option>
                {countryList
                  .find(c => c.name === address.country)
                  ?.state_set
                  ?.map((state, index) => (
                    <option key={index} value={state.name}>
                      {state.name}
                    </option>
                  ))}
              </select>

              {validationErrors.state && (
                <p className="text-danger small mt-1">
                  {validationErrors.state}
                </p>
              )}
            </div>
          </div>
          <div className="d-flex gap-3">
            <div className="w-50">
              <label className="form-label">Town/City</label>
              <input
                onChange={e =>
                  setAddress({
                    ...address,
                    district: e.target.value,
                  })
                }
                value={address.district}
                placeholder="Enter city"
                type="text"
                className="form-control"
              />
              {validationErrors.district && (
                <p className="text-danger small mt-1">
                  {validationErrors.district}
                </p>
              )}
            </div>
            <div className="w-50">
              <label className="form-label">Pin Code</label>
              <input
                onChange={e =>
                  setAddress({
                    ...address,
                    pincode: e.target.value,
                  })
                }
                value={address.pincode}
                placeholder="Enter pincode"
                type="text"
                className="form-control"
              />
              {validationErrors.pincode && (
                <p className="text-danger small mt-1">
                  {validationErrors.pincode}
                </p>
              )}
            </div>
          </div>
          <div className="d-flex gap-3">
            <div className="w-100">
              <label className="form-label">
                Flat, House no., Building, Company, Apartment
              </label>
              <input
                type="text"
                value={address.landmark_1}
                className="form-control"
                placeholder="Enter Flat, House no, Building, Company, Apartment"
                onChange={e =>
                  setAddress({
                    ...address,
                    landmark_1: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="d-flex gap-3">
            <div className="w-100">
              <label className="form-label">
                Area, Street, Sector, Village
              </label>
              <input
                type="text"
                value={address.landmark_2}
                className="form-control"
                placeholder="Enter Area, Street, Sector, Village"
                onChange={e =>
                  setAddress({
                    ...address,
                    landmark_2: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="d-flex gap-3">
            <div className="w-100">
              <label className="form-label">Address</label>
              <textarea
                type="text"
                value={address.address}
                className="form-control"
                placeholder="Enter Address"
                onChange={e =>
                  setAddress({
                    ...address,
                    address: e.target.value,
                  })
                }
              />
              {validationErrors.address && (
                <p className="text-danger small mt-1">
                  {validationErrors.address}
                </p>
              )}
            </div>
          </div>
          <div className="d-flex gap-3">
            <div className="w-50">
              <label className="form-label">Email</label>
              <input
                type="email"
                value={address.email}
                className="form-control"
                placeholder="Enter email"
                onChange={e =>
                  setAddress({
                    ...address,
                    email: e.target.value,
                  })
                }
              />
              {validationErrors.email && (
                <p className="text-danger small mt-1">
                  {validationErrors.email}
                </p>
              )}
            </div>
            <div className="w-50">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                value={address.mobile_number}
                className="form-control"
                placeholder="Enter phone number"
                onChange={e =>
                  setAddress({
                    ...address,
                    mobile_number: e.target.value,
                  })
                }
              />
              {validationErrors.mobile_number && (
                <p className="text-danger small mt-1">
                  {validationErrors.mobile_number}
                </p>
              )}
            </div>
          </div>
          <div className="d-flex gap-3">
            <div className="w-100">
              <label className="form-label">Order Notes (Optional)</label>
              <textarea
                value={address.remarks}
                onChange={e =>
                  setAddress({
                    ...address,
                    remarks: e.target.value,
                  })
                }
                className="form-control"
                rows="3"
              />
            </div>
          </div>
          <button
            className="border-none text-white px-4 py-2 rounded"
            style={{ backgroundColor: '#FFA500' }}
            onClick={() => isEditMode ? updateAddress(address) : createAddress()}
          >
            {isEditMode ? "UPDATE" : "SAVE"}
          </button>
        </div>

      </Modal>



    </div>
  );
}
