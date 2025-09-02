import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../profile/profileComponents/ReturnAndRefunds.module.css";
import { toast } from 'react-toastify';
import axios from '../../utilities/customAxios';
import { useNavigate } from 'react-router-dom';

const SellWithUsForm = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    mobile_number: '',
    email: '',
    business_name: '',
    business_type: '',
    business_address: '',
    business_pincode: '',
    gst: '',
    pan: '',
    bank_name: '',
    bank_branch: '',
    bank_account_no: '',
    bank_account_name: '',
    ifsc: '',
    pancard_1: '',
    pancard_2: '',
    company_incorporation_certificate_1: '',
    company_incorporation_certificate_2: '',
    moa_1: '',
    moa_2: '',
    utitlity_bill_1: '',
    utitlity_bill_2: '',
    aadhar_card_1: '',
    aadhar_card_2: ''
  });

  const [errors, setErrors] = useState({});
  const [panImages, setPanImages] = useState([]);
  const [companyNumber, setCompanyNumber] = useState([]);
  const [moaAoa, setMoaAoa] = useState([]);
  const [aadhar, setAadhar] = useState([]);
  const [addressProof, setAddressProof] = useState([]);

  const validateStep1 = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Seller Name is required';
    if (!formData.mobile_number.trim()) errors.mobile_number = 'Contact Number is required';
    if (!formData.email.trim()) errors.email = 'Email ID is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.business_name.trim()) errors.business_name = 'Business Name is required';
    if (!formData.business_type.trim()) errors.business_type = 'Business Type is required';
    if (!formData.business_address.trim()) errors.business_address = 'Business Address is required';
    if (!formData.business_pincode.trim()) errors.business_pincode = 'Business Pincode is required';
    return errors;
  };

  const validateStep2 = () => {
    const errors = {};
    if (!formData.gst.trim()) errors.gst = 'GSTIN is required';
    if (!formData.pan.trim()) errors.pan = 'PAN is required';
    if (!formData.bank_account_name.trim()) errors.bank_account_name = 'Bank Account Name is required';
    if (!formData.bank_account_no.trim()) errors.bank_account_no = 'Account Number is required';
    if (!formData.ifsc.trim()) errors.ifsc = 'IFSC Code is required';
    if (!formData.bank_name.trim()) errors.bank_name = 'Bank Name is required';
    return errors;
  };

  const validateStep3 = () => {
    const errors = {};
    if (panImages.length < 2) errors.panImages = 'Both sides of PAN card are required';

    if ((formData.business_type === 'pvtltd' || formData.business_type === 'ltd' || formData.business_type === 'opc') &&
      companyNumber.length < 1) {
      errors.companyNumber = 'Company Incorporation Certificate is required';
    }

    if ((formData.business_type === 'pvtltd' || formData.business_type === 'llp' || formData.business_type === 'pvtltd') &&
      moaAoa.length < 1) {
      errors.moaAoa = 'MOA & AOA is required';
    }

    if (addressProof.length < 1) errors.addressProof = 'Utility Bill is required';

    if (formData.business_type === 'SoleProprietorship' && aadhar.length < 2) {
      errors.aadhar = 'Both sides of Aadhar Card are required';
    }
    return errors;
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const nextStep = (value) => {
    let validationErrors = {};

    if (step === 1 || step === value) {
      validationErrors = validateStep1();
    } else if (step === 2 || step === value) {
      validationErrors = validateStep2();
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStep(step + 1);
  };

  const prevStep = () => {
    setErrors({});
    setStep(step - 1);
  };

  const DocumentVerification = ({ label, images, setImages, formDataKey1, formDataKey2, error }) => {
    const fileInputRef = useRef(null);

    // Determine if this requires 2 files (PAN Card and Aadhar Card) or 1 file (others)
    const requiresTwoFiles = label === 'PAN Card' || label === 'Aadhar Card';
    const useImagePreview = requiresTwoFiles;
    const maxFiles = requiresTwoFiles ? 2 : 1;

    const handleIconClick = () => {
      fileInputRef.current.click();
    };

    const handleFilesChange = (e) => {
      const files = Array.from(e.target.files);
      const availableSlots = maxFiles - images.length;

      if (files.length > availableSlots) {
        toast.error(`Maximum ${maxFiles} file${maxFiles > 1 ? 's' : ''} allowed.`);
        e.target.value = null;
        return;
      }

      const newItems = files.slice(0, availableSlots).map((file) => ({
        id: URL.createObjectURL(file),
        file,
        name: file.name
      }));

      setImages((prev) => {
        const updatedItems = [...prev, ...newItems].slice(0, maxFiles);

        setFormData(prevFormData => ({
          ...prevFormData,
          [formDataKey1]: updatedItems[0]?.file || '',
          ...(requiresTwoFiles && { [formDataKey2]: updatedItems[1]?.file || '' }),
        }));

        // Clear error when files are uploaded
        if (error) {
          setErrors(prev => {
            const newErrors = { ...prev };
            if (label === 'PAN Card') delete newErrors.panImages;
            if (label === 'Company Incorporation Number') delete newErrors.companyNumber;
            if (label === 'MOA & AOA') delete newErrors.moaAoa;
            if (label === 'Utility Bill - Address Proof') delete newErrors.addressProof;
            if (label === 'Aadhar Card') delete newErrors.aadhar;
            return newErrors;
          });
        }

        return updatedItems;
      });
    };

    const handleRemoveItem = (id) => {
      setImages((prev) => {
        const filtered = prev.filter((item) => item.id !== id);
        setFormData((prevFormData) => ({
          ...prevFormData,
          [formDataKey1]: filtered[0]?.file || '',
          ...(requiresTwoFiles && { [formDataKey2]: filtered[1]?.file || '' }),
        }));
        return filtered;
      });
    };

    return (
      <div className="form-group w-full">
        <label className="mb-2">
          {label}<span className="text-danger ms-1">*</span>
        </label>
        <div className="d-flex gap-2 align-items-center">
          {images.map((item) => (
            <div
              key={item.id}
              style={{ position: 'relative', width: "70px", height: "70px", borderRadius: '5px' }}
            >
              {useImagePreview ? (
                <img
                  src={item.id}
                  alt="preview"
                  className="w-full h-full object-cover rounded bg-gray-200"
                />
              ) : (
                <div
                  className="w-full h-full d-flex flex-column justify-content-center align-items-center bg-light rounded border"
                  style={{ fontSize: '10px', textAlign: 'center', padding: '4px' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-earmark-text mb-1" viewBox="0 0 16 16">
                    <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5.5 9a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5.5 11a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z" />
                    <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                  </svg>
                  <div style={{ fontSize: '8px', wordBreak: 'break-all' }}>
                    {item.name?.substring(0, 8)}...
                  </div>
                </div>
              )}
              <button
                onClick={() => handleRemoveItem(item.id)}
                style={{ display: 'flex', position: 'absolute', top: 0, right: 0, fontSize: '11px', padding: '4px', border: 'none', background: '#000', borderRadius: '50%', color: '#fff' }}
              >
                <i className="fa fa-times" aria-hidden="true"></i>
              </button>
            </div>
          ))}
          <button
            type="button"
            disabled={images.length >= maxFiles}
            onClick={handleIconClick}
            className="flex items-center justify-center"
            style={{
              height: '70px',
              width: '70px',
              borderRadius: '5px',
              color: '#aba5a5',
              backgroundColor: useImagePreview ? '#e5e7eb' : 'transparent',
              border: useImagePreview ? '1px solid #d1d5db' : '2px dashed #aba5a5'
            }}
          >
            {useImagePreview ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-camera" viewBox="0 0 16 16">
                <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" />
                <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-upload" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
              </svg>
            )}
          </button>
        </div>
        <input
          type="file"
          accept={useImagePreview ? "image/*" : "*"}
          ref={fileInputRef}
          onChange={handleFilesChange}
          style={{ display: "none" }}
          multiple={requiresTwoFiles}
        />
        {!useImagePreview && (
          <div className="text-muted small mt-1">
            Accepted file formats: PDF, DOCX, TXT, and other document types
          </div>
        )}
        {error && <div className="text-danger small mt-1">{error}</div>}
      </div>
    )
  }

  const stepValidations = (value) => {
    console.log(value)
    if (value === step) return;
    if (value > step) {
      nextStep(value);
    }
    else {
      prevStep();
    }
  }

  const OrderProgress = ({ step }) => {
    return (
      <div className={styles.orderprogress}>
        <div className={styles.orderprogresswrap}>
          <div className={`${styles.linewrap} ${step >= 1 ? styles.lineactive : ''}`}></div>
          <div className={`${styles.linewrap} ${step >= 2 ? styles.lineactive : ''}`}></div>
          <div className={`${styles.linewrap} ${step >= 3 ? styles.lineactive : ''} `}></div>
          <div className={`${styles.circlewrap}`}>
            <div className={`${styles.circle}  custom-pointer ${step >= 1 ? styles.circleactive : ''} ${step === 1 ? styles.current : styles.notcurrent}`}
              onClick={() => { stepValidations(1) }}>
              1<p className={`${styles.para} `}>Basic Information</p>
            </div>
            <div className={`${styles.circle}  custom-pointer ${step >= 2 ? styles.circleactive : ''} ${step === 2 ? styles.current : styles.notcurrent}`}
              onClick={() => { stepValidations(2) }}>
              2<p className={`${styles.para} `}>Business Registration & Tax Details</p>
            </div>
            <div className={`${styles.circle}  custom-pointer ${step >= 3 ? styles.circleactive : ''} ${step === 3 ? styles.current : styles.notcurrent}`}
              onClick={() => { stepValidations(3) }}
            >
              3<p className={`${styles.para} `}>Identity Verification</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className='' >
            <div className="d-flex gap-4 mt-3 flex-column flex-md-row">
              <div className="form-group w-full">
                <label className='mb-2'>Seller Name<span className='text-danger ms-1'>*</span></label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>
              <div className="form-group w-full">
                <label className='mb-2'>Contact Number<span className='text-danger ms-1'>*</span></label>
                <input
                  type="text"
                  className={`form-control ${errors.mobile_number ? 'is-invalid' : ''}`}
                  name="mobile_number"
                  value={formData.mobile_number}
                  onChange={handleChange}
                />
                {errors.mobile_number && <div className="invalid-feedback">{errors.mobile_number}</div>}
              </div>
            </div>
            <div className="d-flex gap-4 mt-3 flex-column flex-md-row">
              <div className="form-group w-full">
                <label className='mb-2'>Email ID<span className='text-danger ms-1'>*</span></label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <div className="form-group w-full">
                <label className='mb-2'>Business Name<span className='text-danger ms-1'>*</span>( same as in GST)</label>
                <input
                  type="text"
                  className={`form-control ${errors.business_name ? 'is-invalid' : ''}`}
                  name="business_name"
                  value={formData.business_name}
                  onChange={handleChange}
                />
                {errors.business_name && <div className="invalid-feedback">{errors.business_name}</div>}
              </div>
            </div>
            <div className="d-flex gap-4 mt-3 flex-column flex-md-row">
              <div className="form-group w-full">
                <label>Business Type<span className='text-danger ms-1'>*</span></label>
                <select
                  className={`form-control ${errors.business_type ? 'is-invalid' : ''}`}
                  name="business_type"
                  value={formData.business_type}
                  onChange={handleChange}
                >
                  <option value="">Select...</option>
                  <option value="SoleProprietorship">Sole Proprietorship</option>
                  <option value="Partnership-Firm">Partnership Firm</option>
                  <option value="llp">Limited Liability Partnership (LLP)</option>
                  <option value="pvtltd">Private Limited Company (Pvt. Ltd.)</option>
                  <option value="ltd">Public Limited Company (Ltd.)</option>
                  <option value="opc">One Person Company (OPC)</option>
                </select>
                {errors.business_type && <div className="invalid-feedback">{errors.business_type}</div>}
              </div>
              <div className="w-full"></div>
            </div>
            <div className="d-flex gap-4 mt-3 flex-column flex-md-row">
              <div className="form-group w-full mt-3">
                <label>Business Address<span className='text-danger ms-1'>*</span></label>
                <textarea
                  type="text"
                  className={`form-control ${errors.business_address ? 'is-invalid' : ''}`}
                  name="business_address"
                  value={formData.business_address}
                  onChange={handleChange}
                />
                {errors.business_address && <div className="invalid-feedback">{errors.business_address}</div>}
              </div>
              <div className="form-group w-full mt-3">
                <label>Business Pincode<span className='text-danger ms-1'>*</span></label>
                <textarea
                  type="text"
                  className={`form-control ${errors.business_pincode ? 'is-invalid' : ''}`}
                  name="business_pincode"
                  value={formData.business_pincode}
                  onChange={handleChange}
                />
                {errors.business_pincode && <div className="invalid-feedback">{errors.business_pincode}</div>}
              </div>
            </div>
            <p className='my-4'>By continuing, I agree to Dadisha <span className='text-p' style={{ cursor: 'pointer' }} onClick={() => navigate('/terms-and-conditions')}>Terms of Use</span> & <span className='text-p' style={{ cursor: 'pointer' }} onClick={() => navigate('/privacy-policy')}>Privacy Policy</span></p>
            <button className="btn btn-primary px-4" onClick={nextStep}>
              Register & Continue
            </button>
          </div>
        );
      case 2:
        return (
          <div>
            <div className="d-flex gap-4 mt-3 flex-column flex-md-row">
              <div className="form-group w-full">
                <label className='mb-2'>GSTIN<span className='text-danger ms-1'>*</span></label>
                <input
                  type="gstin"
                  className={`form-control ${errors.gst ? 'is-invalid' : ''}`}
                  name="gst"
                  value={formData.gst}
                  onChange={handleChange}
                />
                {errors.gst && <div className="invalid-feedback">{errors.gst}</div>}
              </div>
              <div className="form-group w-full">
                <label className='mb-2'>PAN<span className='text-danger ms-1'>*</span></label>
                <input
                  type="text"
                  className={`form-control ${errors.pan ? 'is-invalid' : ''}`}
                  name="pan"
                  value={formData.pan}
                  onChange={handleChange}
                />
                {errors.pan && <div className="invalid-feedback">{errors.pan}</div>}
              </div>
            </div>
            <div className="d-flex gap-4 mt-3 flex-column flex-md-row">
              <div className="form-group w-full">
                <label className='mb-2'>Bank Account Name<span className='text-danger ms-1'>*</span></label>
                <input
                  type=""
                  className={`form-control ${errors.bank_account_name ? 'is-invalid' : ''}`}
                  name="bank_account_name"
                  value={formData.bank_account_name}
                  onChange={handleChange}
                />
                {errors.bank_account_name && <div className="invalid-feedback">{errors.bank_account_name}</div>}
              </div>
              <div className="form-group w-full">
                <label className='mb-2'>Account Number<span className='text-danger ms-1'>*</span></label>
                <input
                  type="accountNumber"
                  className={`form-control ${errors.bank_account_no ? 'is-invalid' : ''}`}
                  name="bank_account_no"
                  value={formData.bank_account_no}
                  onChange={handleChange}
                />
                {errors.bank_account_no && <div className="invalid-feedback">{errors.bank_account_no}</div>}
              </div>
            </div>
            <div className="d-flex gap-4 mt-3 flex-column flex-md-row">
              <div className="form-group w-full">
                <label className='mb-2'>IFSC Code <span className='text-danger ms-1'>*</span></label>
                <input
                  type="ifscCode"
                  className={`form-control ${errors.ifsc ? 'is-invalid' : ''}`}
                  name="ifsc"
                  value={formData.ifsc}
                  onChange={handleChange}
                />
                {errors.ifsc && <div className="invalid-feedback">{errors.ifsc}</div>}
              </div>
              <div className="form-group w-full">
                <label className='mb-2'>Bank Name <span className='text-danger ms-1'>*</span></label>
                <input
                  type="text"
                  className={`form-control ${errors.bank_name ? 'is-invalid' : ''}`}
                  name="bank_name"
                  value={formData.bank_name}
                  onChange={handleChange}
                />
                {errors.bank_name && <div className="invalid-feedback">{errors.bank_name}</div>}
              </div>
            </div>

            <div className="d-flex gap-4 my-4">
              <button className="btn px-4 text-p" style={{ border: '1px solid #fbae24' }} onClick={prevStep}>
                Previous
              </button>
              <button className="btn btn-primary px-4" onClick={nextStep}>
                Next
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <>
            <div className="d-flex gap-4 mt-3 flex-column flex-md-row">
              <DocumentVerification
                label="PAN Card"
                images={panImages}
                setImages={setPanImages}
                setFormData={setFormData}
                formDataKey1="pancard_1"
                formDataKey2="pancard_2"
                error={errors.panImages}
              />
              {(formData.business_type === 'pvtltd' || formData.business_type === 'ltd' || formData.business_type === 'opc') && (
                <DocumentVerification
                  label="Company Incorporation Number"
                  images={companyNumber}
                  setImages={setCompanyNumber}
                  setFormData={setFormData}
                  formDataKey1="company_incorporation_certificate_1"
                  formDataKey2="company_incorporation_certificate_2"
                  error={errors.companyNumber}
                />
              )}
              {(formData.business_type === 'pvtltd' || formData.business_type === 'llp' || formData.business_type === 'pvtltd') && (
                <DocumentVerification
                  label="MOA & AOA"
                  images={moaAoa}
                  setImages={setMoaAoa}
                  setFormData={setFormData}
                  formDataKey1="moa_1"
                  formDataKey2="moa_2"
                  error={errors.moaAoa}
                />
              )}
            </div>

            <div className="d-flex gap-4 mt-3 flex-column flex-md-row">
              <DocumentVerification
                label="Utility Bill - Address Proof"
                images={addressProof}
                setImages={setAddressProof}
                setFormData={setFormData}
                formDataKey1="utitlity_bill_1"
                formDataKey2="utitlity_bill_2"
                error={errors.addressProof}
              />

              {(formData.business_type === 'SoleProprietorship') && (
                <DocumentVerification
                  label="Aadhar Card"
                  images={aadhar}
                  setImages={setAadhar}
                  setFormData={setFormData}
                  formDataKey1="aadhar_card_1"
                  formDataKey2="aadhar_card_2"
                  error={errors.aadhar}
                />
              )}
              <div className="w-full"></div>
            </div>
            <div className="d-flex gap-4 my-4">
              <button className="btn px-4 text-p" style={{ border: '1px solid #fbae24' }} onClick={prevStep}>
                Previous
              </button>
              <button className="btn btn-primary px-4" style={{ marginTop: "1.5rem" }} onClick={handleReviewSubmit}>
                REGISTER NOW
              </button>
            </div>
          </>
        );
      default:
        return <div>Invalid step</div>;
    }
  };

  const handleReviewSubmit = async () => {
    const validationErrors = validateStep3();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const formDataToSend = new FormData();

      for (const key in formData) {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      }
      await axios.post('/disha/seller-registration/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Registration Succesful');
      setFormData({
        name: '',
        mobile_number: '',
        email: '',
        business_name: '',
        business_type: '',
        business_address: '',
        business_pincode: '',
        gst: '',
        pan: '',
        bank_name: '',
        bank_branch: '',
        bank_account_no: '',
        bank_account_name: '',
        ifsc: '',
        pancard_1: '',
        pancard_2: '',
        company_incorporation_certificate_1: '',
        company_incorporation_certificate_2: '',
        moa_1: '',
        moa_2: '',
        utitlity_bill_1: '',
        utitlity_bill_2: '',
        aadhar_card_1: '',
        aadhar_card_2: ''
      });
      setAadhar([]);
      setPanImages([]);
      setCompanyNumber([]);
      setMoaAoa([]);
      setAddressProof([]);
      setErrors({});
      setStep(1);

    } catch (error) {
      toast.error('Failed to Register your seller account');
      console.error(error);
    }
  };

  return (
    <div className="container my-5" id='sell-with-us-form'>
      <div className="bg-white rounded-xl p-4" style={{ boxShadow: '0px 4px 25px 0px rgba(116, 116, 116, 0.10)' }}>
        <div className='px-5'>
          <OrderProgress step={step} />
        </div>
        <div className='position-realtive pt-5 sm:pt-10'>
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default SellWithUsForm;