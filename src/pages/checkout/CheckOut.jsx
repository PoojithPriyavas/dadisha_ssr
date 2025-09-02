import React, { useContext, useEffect, useState } from 'react';
import SecondaryHeader from '../../components/SecondaryHeader';
import ProductFooter from '../products/ProductFooter';
import { Context } from '../../context/context';
import axios from '../../utilities/customAxios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { isTokenValid } from '../../utilities/index'

const CheckOut = () => {
  const [cartItems, setCartItems] = useState([]);
  const { selectedCurrency } = useContext(Context);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState('');
  const navigate = useNavigate();

  const [billingshippingaddress, setbillingshippingaddress] = useState({
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

  const [validationErrors, setValidationErrors] = useState({});
  const [countryList, setCountryList] = useState([]);
  const [shippinAddressList, setShippingAddressList] = useState([]);
  const [billingAddressList, setBillingAddressList] = useState([]);
  const [showBillingAddress, setShowBillingAddress] = useState(false);
  const [selectedShippingAddressId, setSelectedShippingAddressId] =
    useState(null);
  const [selectedBillingAddressId, setSelectedBillingAddressId] =
    useState(null);

  useEffect(() => {
    getCartItems();
    getCountryList();
    getShippinAddressList();
    getBillingAddressList();
  }, []);

  const getCartItems = async () => {
    const result = await axios.get('/disha/cart-page');
    setCartItems(result.data);
  };


  const getCountryList = async () => {
    const result = await axios.get('/disha/country-list');
    setCountryList(result.data);
  };

  const getShippinAddressList = async () => {
    const response = await axios.get('/disha/add-address');
    setShippingAddressList(response.data);
  };

  const getBillingAddressList = async () => {
    const response = await axios.get('/disha/add-address');
    setBillingAddressList(response.data);
    console.log('address', billingAddressList)
  };

  const handleCountryChange = e => {
    const selectedCountryId = e.target.value;
    const country = countryList.find(c => c.id === parseInt(selectedCountryId));
    setSelectedCountry(country);
    setSelectedState('');
    setbillingshippingaddress({
      ...billingshippingaddress,
      country: country?.name,
      state: '',
    });
  };

  const handleStateChange = e => {
    setSelectedState(e.target.value);
    setbillingshippingaddress({
      ...billingshippingaddress,
      state: e.target.value,
    });
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
      if (!billingshippingaddress[field]) {
        errors[field] = `This field is required`;
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const submitbillingshippingaddress = async () => {
    if (!validateAddressFields()) return;

    try {
      const response = await axios.post(
        '/disha/add-address',
        billingshippingaddress
      );
      if (response.status === 201) {
        toast.success('Address added successfully');
        setbillingshippingaddress({
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
        getShippinAddressList();
        getBillingAddressList();
      }
    } catch (error) {
      toast.error('Failed to add address');
    }
  };

  const handlePlaceOrder = async (payload) => {


    try {
      const response = await axios.post('/disha/checkout-page', payload);
      if (response.status === 200) {
        toast.success('Order placed successfully');
        navigate('/profile/myorder');
        // navigate('/ordersuccess');

      }
    } catch (error) {
      toast.error('Failed to place order');
    }
  };


  const handlePayment = async () => {
    const token = localStorage.getItem('dadishaToken');
    console.log("Token:", token);
    if (!selectedShippingAddressId) {
      toast.error('Please select a shipping address');
      return;
    }

    if (!cartItems?.cart_items || !Array.isArray(cartItems.cart_items) || cartItems.cart_items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }


    const invalidItems = cartItems.cart_items.filter(item => {
      const minQty = item?.product?.minimum_order_quantity || 1;
      return item.quantity < minQty;
    });

    if (invalidItems.length > 0) {
      const errorMessage = invalidItems.map(
        item => `${item?.product?.name || 'Unknown Product'} (min: ${item?.product?.minimum_order_quantity || 1})`
      ).join(', ');

      toast.error(`Please select at least the minimum quantity for: ${errorMessage}`);
      return;
    }
    const payload = {
      shipping_address_id: selectedShippingAddressId,
      billing_address_id: selectedBillingAddressId || selectedShippingAddressId,
    };


    try {
      const response = await axios.post('/payments/razorpay_order', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("resp", response)

      const { amount, orderId, currency } = response.data;
      console.log("amount :", amount, "order id :", orderId, "currency :", currency)
      // const { currency } = response.data.currency;
      // const { payableAmount } = response.data.amount;


      // if (!orderId) {
      //   alert("Failed to create order");
      //   return;
      // }


      const options = {
        key: "rzp_test_b5pQrAEedx98XZ",
        amount: amount,
        currency: currency,
        name: "Dadisha PVT LTD",
        description: "Test Transaction",
        order_id: orderId,
        handler: function (response) {
          console.log("Payment Successful!", response);
          // alert("Payment Successful!");
          handlePlaceOrder(payload);
        },
        prefill: {
          name: "test",
          email: "test@example.com",
          contact: "1234567890",
        },
        theme: {
          color: "#F37254",
        },
      };

      console.log("Razorpay Options:", options);

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error("Payment failed. Please try again.");
    }

  };

  return (
    <div>
      <SecondaryHeader />
      <div className="container mx-auto mt-10">
        <div className="row">
          <div className="col-auto col-lg-8 me-lg-0 me-auto">
            <div
              className="rounded p-4"
              style={{ border: '1px solid #ffa500' }}
            >
              <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                {showBillingAddress ? (
                  <p className="my-1 fw-bold">Selected Shipping Address</p>
                ) : (
                  <p className="my-1 fw-bold">Shipping Address List</p>
                )}
                {billingAddressList.length > 0 && (
                  <div className="d-flex align-items-center gap-2" style={{ padding: '10px 0px' }}>
                    <input
                      type="checkbox"
                      checked={showBillingAddress}
                      onChange={() => setShowBillingAddress(!showBillingAddress)}
                      className="h-10"
                      style={{ width: '1rem' }}
                    />
                    <p className="my-1">Choose different billing address</p>
                  </div>
                )}
              </div>
              <div className="mt-2">
                {!showBillingAddress ? (
                  <div>
                    {shippinAddressList.length > 0 ? (
                      shippinAddressList.map(baddress => (
                        <div
                          className="d-flex align-items-center gap-4"
                          key={baddress.id}
                        >
                          <input
                            type="checkbox"
                            className="h-10"
                            style={{ width: '1rem' }}
                            checked={selectedShippingAddressId === baddress.id}
                            onChange={() =>
                              setSelectedShippingAddressId(baddress.id)
                            }
                          />
                          <div>
                            <p className="mb-0">{baddress.name}</p>
                            <p className="mb-0 line-clamp-1">
                              {baddress.address}, {baddress.country},{' '}
                              {baddress.state}, {baddress.city},{' '}
                              {baddress.pincode}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="my-4">No shipping address found</p>
                    )}
                  </div>
                ) : (
                  <div>
                    {/* <p className="my-1 fw-bold">Billing Address List</p> */}
                    {billingAddressList.length > 0 ? (
                      billingAddressList.map(baddress => (
                        <div
                          className="d-flex align-items-center gap-4"
                          key={baddress.id}
                        >
                          <input
                            type="checkbox"
                            className="h-10"
                            style={{ width: '1rem' }}
                            checked={selectedBillingAddressId === baddress.id}
                            onChange={() =>
                              setSelectedBillingAddressId(baddress.id)
                            }
                          />
                          <div>
                            <p className="mb-0">{baddress.name}</p>
                            <p className="mb-0 line-clamp-1">
                              {baddress.address}, {baddress.country},{' '}
                              {baddress.state}, {baddress.city},{' '}
                              {baddress.pincode}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="my-4">No billing address found</p>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="rounded p-4 mb-4">
              <h1 className="fw-bold fs-4">Shipping Information</h1>
              <div className="mt-4 d-flex flex-column gap-3">
                <div className="d-flex gap-3">
                  <div className="w-50">
                    <label className="form-label">User name</label>
                    <input
                      type="text"
                      value={billingshippingaddress.name}
                      placeholder="Enter name"
                      className="form-control"
                      onChange={e =>
                        setbillingshippingaddress({
                          ...billingshippingaddress,
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
                      value={billingshippingaddress.company_name}
                      className="form-control"
                      placeholder="Enter company name"
                      onChange={e =>
                        setbillingshippingaddress({
                          ...billingshippingaddress,
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
                      value={selectedCountry?.id || ''}
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
                      value={selectedState}
                      disabled={!selectedCountry}
                    >
                      <option value="">Select state</option>
                      {selectedCountry?.state_set?.map((state, index) => (
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
                        setbillingshippingaddress({
                          ...billingshippingaddress,
                          district: e.target.value,
                        })
                      }
                      value={billingshippingaddress.district}
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
                        setbillingshippingaddress({
                          ...billingshippingaddress,
                          pincode: e.target.value,
                        })
                      }
                      value={billingshippingaddress.pincode}
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
                      value={billingshippingaddress.landmark_1}
                      className="form-control"
                      placeholder="Enter Flat, House no, Building, Company, Apartment"
                      onChange={e =>
                        setbillingshippingaddress({
                          ...billingshippingaddress,
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
                      value={billingshippingaddress.landmark_2}
                      className="form-control"
                      placeholder="Enter Area, Street, Sector, Village"
                      onChange={e =>
                        setbillingshippingaddress({
                          ...billingshippingaddress,
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
                      value={billingshippingaddress.address}
                      className="form-control"
                      placeholder="Enter Address"
                      onChange={e =>
                        setbillingshippingaddress({
                          ...billingshippingaddress,
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
                      value={billingshippingaddress.email}
                      className="form-control"
                      placeholder="Enter email"
                      onChange={e =>
                        setbillingshippingaddress({
                          ...billingshippingaddress,
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
                      value={billingshippingaddress.mobile_number}
                      className="form-control"
                      placeholder="Enter phone number"
                      onChange={e =>
                        setbillingshippingaddress({
                          ...billingshippingaddress,
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
                      value={billingshippingaddress.remarks}
                      onChange={e =>
                        setbillingshippingaddress({
                          ...billingshippingaddress,
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
                  onClick={submitbillingshippingaddress}
                >
                  ADD ADDRESS
                </button>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4 me-lg-0 me-auto">
            <div
              className="rounded p-4 mb-4"
              style={{ border: '1px solid #FFA500' }}
            >
              <h1 className="fw-bold fs-6">Order Summary</h1>
              <div className="mt-4 d-flex flex-column gap-3">
                {cartItems?.cart_items?.map(item => (
                  <div className="d-flex gap-3" key={item.id}>
                    <div className="h-10 w-20 rounded overflow-hidden">
                      <img
                        src={item.variant ? item?.variant?.additional_images[0] : item?.product?.image}
                        alt={item?.product?.name}
                        className="w-100 h-100 "
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <div>
                      <h2 className="fs-6 line-clamp-2">
                        {item?.product?.name}
                      </h2>
                      <p>
                        {item?.quantity} * {''}
                        {selectedCurrency === 'INR' ? (
                          <span className="text-primary">
                            <span  style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal', color: 'inherit' }}>₹</span> {item?.variant ? item?.variant?.sale_price : item?.product?.sale_price}
                          </span>
                        ) : (
                          <span className="text-primary">
                            $ {item?.product?.sale_price}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="d-flex flex-column mt-2">
                <div
                  className="d-flex justify-content-between"
                  style={{ borderBottom: '1px solid #CCCCCC' }}
                >
                  <p className="my-2" style={{ color: '#666666' }}>
                    Price
                  </p>
                  {selectedCurrency === 'INR' ? (
                    <p className="my-2 fw-bold"> <span  style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal', color: 'inherit' }}>₹</span> {cartItems?.sub_total}</p>
                  ) : (
                    <p className="my-2 fw-bold">
                      $ {cartItems?.sub_total_in_dollar}
                    </p>
                  )}
                </div>
                <div
                  className="d-flex justify-content-between"
                  style={{ borderBottom: '1px solid #CCCCCC' }}
                >
                  <p className="my-2" style={{ color: '#666666' }}>
                    Discount
                  </p>
                  {selectedCurrency === 'INR' ? (
                    <p className="my-2 fw-bold"> <span  style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal', color: 'inherit' }}>₹</span> {cartItems?.discount}</p>
                  ) : (
                    <p className="my-2 fw-bold">
                      $ {cartItems?.discount_in_dollar}
                    </p>
                  )}
                </div>
                <div
                  className="d-flex justify-content-between"
                  style={{ borderBottom: '1px solid #CCCCCC' }}
                >
                  <p className="my-2" style={{ color: '#666666' }}>
                    Delivery Charges
                  </p>
                  {selectedCurrency === 'INR' ? (
                    <p className="my-2 fw-bold">
                      <span  style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal', color: 'inherit' }}>₹</span> {cartItems?.delivery_charge}
                    </p>
                  ) : (
                    <p className="my-2 fw-bold">
                      $ {cartItems?.delivery_charge_in_dollar}
                    </p>
                  )}
                </div>
                <div className="d-flex justify-content-between">
                  <p className="my-2" style={{ color: '#666666' }}>
                    Total Amount:
                  </p>
                  {selectedCurrency === 'INR' ? (
                    <p className="my-2 fw-bold">
                      <span  style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal', color: 'inherit' }}>₹</span> {cartItems?.payable_amount}
                    </p>
                  ) : (
                    <p className="my-2 fw-bold">
                      $ {cartItems?.payable_amount_in_dollar}
                    </p>
                  )}
                </div>
                {cartItems?.delivery_charge === 0 ? null : (
                  <>
                    {selectedCurrency === 'INR' ? (
                      <p className="fw-bold" style={{ color: '#8C8C8C' }}>
                        You will save <span  style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal', color: 'inherit' }}>₹</span> {cartItems?.discount} on this order
                      </p>
                    ) : (
                      <p className="fw-bold" style={{ color: '#8C8C8C' }}>
                        You will save $ {cartItems?.discount_in_dollar} on this
                        order
                      </p>
                    )}
                  </>
                )}
              </div>
              <div className="d-flex mt-2 justify-content-center">
                <button
                  className="border-none text-white px-4 py-2 rounded"
                  style={{ backgroundColor: '#FFA500' }}
                  onClick={handlePayment}
                >
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProductFooter />
    </div>
  );
};

export default CheckOut;
