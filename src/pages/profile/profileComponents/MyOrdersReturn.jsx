import { useContext, useEffect, useState } from 'react';
import styles from './MyOrders.module.css';
import axios from '../../../utilities/customAxios';
import { toast } from 'react-toastify';
import { Context } from '../../../context/context';
import { Modal } from 'antd';
import Header from '../../../components/Header';
import SubCategoryHeader from '../../../components/subCategoryHeader/SubCategoryHeader';
import { Fade } from 'react-awesome-reveal';
import { useNavigate, useParams } from 'react-router-dom';
import DOMPurify from "dompurify"; 
import SecondaryHeader from '../../../components/SecondaryHeader';


export default function MyOrdersReturn() {
  const { orderid } = useParams();
  const navigate = useNavigate();
  const { selectedCurrency } = useContext(Context);
  const [ordersToDisplay, setOrdersToDisplay] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);

  const getMyOrder = async () => {
    try {
      const response = await axios.get(`disha/order-details/${orderid}`);
      setOrdersToDisplay(response.data);
    } catch (error) {
      toast.error('Failed to fetch orders');
      console.error(error);
    }
  };

  useEffect(() => {
    getMyOrder();
  }, []);

  const formatDate = dateString => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <Header />
      <div className="mthead">
        {/* <SubCategoryHeader /> */}
         {/* <SecondaryHeader /> */}
        <div className="container pb-10 mt-4">
          <div className="d-flex justify-content-between align-items-center">
            <Fade duration={800} delay={200} cascade damping={0.1}>
              <p className="mb-0 d-flex justify-content-between align-items-center">
                <div
                  className="custom-pointer"
                  onClick={() => {
                    navigate('/');
                  }}
                >
                  Home
                </div>
                <i className="fa-solid fa-chevron-right mx-2"></i>{' '}
                <div
                  className="custom-pointer"
                  onClick={() => {
                    navigate('/profile/myorder');
                  }}
                >
                  My orders
                </div>
                <i className="fa-solid fa-chevron-right mx-2"></i>
                <div style={{ color: '#9CA3AF' }}>Return</div>
              </p>
            </Fade>
          </div>
          <p className="fw-500 fs-5 mt-4">Select Item For Replacement</p>

          <div className={`${styles.ordercontainer} mt-4`}>
            <div className={`${styles.ordertowrap} d-flex flex-wrap gap-2`}>
              <div className="w-100">
                <div className="d-flex gap-4">
                  <div className="w-50">
                    <span className={styles.productpropertyHeading}>
                      Order Id :{' '}
                    </span>
                    <span className={styles.productpropertycontent}>
                      #{ordersToDisplay?.ids}
                    </span>
                  </div>
                  <div className="w-50 d-flex justify-content-end">
                    <span className={styles.productpropertyHeading}>
                      Total :{' '}
                    </span>
                    {selectedCurrency === 'INR' ? (
                      <span className={styles.productpropertycontent}>
                        <span  style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal', color: 'inherit' }}>₹</span>{ordersToDisplay?.payable_amount}
                      </span>
                    ) : (
                      <span className={styles.productpropertycontent}>
                        ${ordersToDisplay?.payable_amount_in_dollar}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-100">
                <div className="d-flex gap-4">
                  <div className="w-50">
                    <span className={styles.productpropertyHeading}>
                      Ship To:
                    </span>
                    <span className={styles.productpropertycontent}>
                      {ordersToDisplay?.shipping_address?.landmark_1 || 'N/A'}
                    </span>
                  </div>
                  <div className="w-50 d-flex justify-content-end">
                    <span className={styles.productpropertyHeading}>
                      Order Date :{' '}
                    </span>
                    <span className={styles.productpropertycontent}>
                      {formatDate(ordersToDisplay?.created_at)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.orderproductcontainer}>
              {ordersToDisplay?.order_items?.map(item => (
                <OrderProductCard
                  item={item}
                  key={item.id}
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                />
              ))}
            </div>
            <div className="mt-4 replacementPolicy">
              <p className="fw-500">Replacement Procedure - Policy</p>
              <ol>
                <li>
                  Choose the products you wish to replace and provide the reason
                  for the replacement.
                </li>
                <li>Submit your replacement request through the portal.</li>
                <li>
                  Our customer support team will contact you to verify the
                  replacement and ask for an unboxing video as proof of the
                  issue.
                </li>
                <li>Send the unboxing video for review.</li>
                <li>
                  If the request is approved, a replacement ID will be generated
                  by our team.
                </li>
                <li>
                  Print the return ID and securely paste it on the delivery box.
                </li>
                <li>
                  The product must be delivered to our hub by the customer.
                </li>
                <li>
                  Ensure the replacement ID is attached to the box and provide
                  the tracking ID in the return form.
                </li>
                <li>
                  Once we receive the product, our team will verify its
                  condition.
                </li>
                <li>
                  If everything is in order, a new product will be processed
                  promptly.
                </li>
                <li>
                  If the fault is on our end, we will cover the delivery
                  charges. Please ensure you keep all relevant receipts for
                  reference.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const OrderProductCard = ({ item, selectedItems, setSelectedItems }) => {
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState(false);
  const [isReasonDropdownVisible, setIsReasonDropdownVisible] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const handleCheckboxChange = () => {
    setIsSelected(!isSelected);
    if (!isSelected) {
      setSelectedItems([...selectedItems, item.id]);
    } else {
      setSelectedItems(selectedItems.filter(id => id !== item.id));
    }
  };

  const handleSelectReason = reason => {
    setSelectedReason(reason);
    setIsReasonDropdownVisible(false);
    if (reason === 'Other') {
      setCustomReason('');
    } else {
      setCustomReason('');
    }
  };

  const handleSubmitReplacement = async () => {
    if (selectedItems.length === 0) {
      toast.error('Please select items for replacement');
      return;
    }
    if (selectedReason === '' && customReason === '') {
      toast.error('Please select the reason for replacement');
      return;
    }
    try {
      const response = await axios.post('/disha/replace-product/', {
        order_items_ids: selectedItems,
        replacement_reason: selectedReason || customReason,
      });

      if (response.status === 200) {
        setIsSuccessModalVisible(true);
      }
    } catch (error) {
      toast.error('Failed to submit replacement request');
      console.error(error);
    }
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalVisible(false);
  };
  return (
    <div>
      <div className={styles.orderproductcard}>
        <input
          type="checkbox"
          style={{ width: '1.2rem', height: '1.2rem' }}
          checked={isSelected}
          onChange={handleCheckboxChange}
        />
        <div className={styles.imagewrap}>
          <img
            src={item?.product?.image}
            className="w-100 h-100 object-cover"
          />
        </div>
        <div className="w-100">
          <p className={styles.producttext}>{item?.product?.name}</p>
          <p className={`${styles.producttext} line-clamp-2`}  dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(item?.product?.long_description || '')}}/>
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-4">
            <div className="d-flex gap-4">
              <div className="">
                {/* <div>
                  <span className={styles.productpropertyHeading}>
                    Color :{' '}
                  </span>
                  <span className={styles.productpropertycontent}>
                    {item?.product?.color || 'N/A'}
                  </span>
                </div>
                <div>
                  <span className={styles.productpropertyHeading}>Type : </span>
                  <span className={styles.productpropertycontent}>
                    {item?.product?.type || 'N/A'}
                  </span>
                </div> */}
              </div>
              <div className="">
                <div>
                  <span className={styles.productpropertyHeading}>
                    Quantity :{' '}
                  </span>
                  <span className={styles.productpropertycontent}>
                    {item?.quantity}
                  </span>
                </div>
                <div>
                  <span className={styles.productpropertyHeading}>
                    Price :{' '}
                  </span>
                  <span className={styles.productpropertycontent}>
                    <span  style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal', color: 'inherit' }}>₹</span>{item?.product_price}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex mt-3 gap-4 flex-wrap sm:flex-nowrap">
            <div className="position-relative">
              <button
                className={`${styles.button} py-2`}
                style={{ height: 'fit-content ', whiteSpace: 'nowrap' }}
                onClick={() =>
                  setIsReasonDropdownVisible(!isReasonDropdownVisible)
                }
              >
                Reason for replacement
              </button>
              {isReasonDropdownVisible && (
                <ReasonDropdown onSelectReason={handleSelectReason} />
              )}
            </div>
            {selectedReason === 'Other' && (
              <textarea
                style={{ borderRadius: '6px', border: '1px solid #ffa500' }}
                value={customReason}
                onChange={e => setCustomReason(e.target.value)}
              />
            )}
            {selectedReason && selectedReason !== 'Other' && (
              <div>{selectedReason}</div>
            )}
          </div>
          <div className="d-flex justify-content-end mt-4">
            <button
              className="bg-p px-4 py-2 border-none text-white rounded fw-500"
              style={{ fontSize: '13px' }}
              onClick={handleSubmitReplacement}
            >
              Proceed to return
            </button>
          </div>
        </div>
      </div>
      <Modal
        visible={isSuccessModalVisible}
        onOk={handleSuccessModalClose}
        onCancel={handleSuccessModalClose}
        centered
        footer={null}
      >
        <div className="d-flex justify-content-center align-items-center my-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="84"
            height="84"
            viewBox="0 0 84 84"
            fill="none"
          >
            <g clip-path="url(#clip0_232_6509)">
              <path
                d="M42 83.5C65.196 83.5 84 64.9198 84 42C84 19.0802 65.196 0.5 42 0.5C18.804 0.5 0 19.0802 0 42C0 64.9198 18.804 83.5 42 83.5Z"
                fill="black"
              />
              <path
                d="M13.5347 42.9268L35.8052 64.9322L70.4482 30.7016L63.0247 23.3665L35.8052 50.262L20.9582 35.5917L13.5347 42.9268Z"
                fill="#ECF0F1"
              />
            </g>
            <defs>
              <clipPath id="clip0_232_6509">
                <rect
                  width="84"
                  height="83"
                  fill="white"
                  transform="translate(0 0.5)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="font-weight-bold   mt-2 fs-4 text-center">
          Replacement successfully placed
        </div>
        <p className="text-center mt-2">
          You have successfully placed replacement request. Our team will
          contact you shortly. You can check you replacement status in{' '}
        </p>
        <div className="d-flex gap-4 align-items-center justify-content-center">
          <button
            className="text-p borderprimary bg-white px-4 py-2"
            onClick={() => {
              navigate('/');
            }}
          >
            Go to Home
          </button>
          <button
            className="text-white borderprimary bg-p px-4 py-2"
            onClick={() => {
              navigate('/profile/returnsandrefunds');
            }}
          >
            View Order
          </button>
        </div>
      </Modal>
    </div>
  );
};

const ReasonDropdown = ({ onSelectReason }) => {
  const reasons = [
    'Product Damage',
    'Not Correct Size',
    'Wrong Item Shipped',
    'Other',
  ];

  return (
    <div
      className={`position-absolute  bg-white w-100 p-2`}
      style={{
        top: '2.4rem',
        borderRadius: '6px',
        border: '1px solid #ffa500',
      }}
    >
      <div className="d-flex flex-column gap-2">
        {reasons.map((reason, index) => (
          <div
            key={index}
            className="custom-pointer"
            onClick={() => onSelectReason(reason)}
          >
            {reason}
          </div>
        ))}
      </div>
    </div>
  );
};
