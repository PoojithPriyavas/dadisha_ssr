// import { useContext, useEffect, useState } from 'react';
// import styles from './MyOrders.module.css';
// import axios from '../../../utilities/customAxios';
// import { toast } from 'react-toastify';
// import { Context } from '../../../context/context';
// import { Modal, Rate } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import DOMPurify from "dompurify";

// export default function MyOrders() {
//   const [orderState, setOrderState] = useState("ongoing");
//   const { selectedCurrency } = useContext(Context);

//   const [myOrders, setMyOrders] = useState({
//     ongoing_orders: [],
//     completed_orders: [],
//     cancelled_orders: [],
//   });
//   const [progresState, setProgresState] = useState(1);

//   const handleStateChange = (state) => {
//     if (state) {
//       setOrderState(state);
//     } else {
//       setOrderState(prev => (prev === "ongoing" ? "completed" : "ongoing"));
//     }
//   };

//   const getMyOrder = async () => {
//     try {
//       const response = await axios.get('/disha/my-orders');

//       // Destructure the response data
//       const { ongoing_orders, completed_orders } = response.data;

//       // Separate out the cancelled orders from ongoing_orders
//       const filteredOngoing = ongoing_orders.filter(
//         order => order.status?.toLowerCase().trim() !== "cancelled"
//       );

//       const cancelledFromOngoing = ongoing_orders.filter(
//         order => order.status?.toLowerCase().trim() === "cancelled"
//       );

//       // Set the orders properly
//       setMyOrders({
//         ongoing_orders: filteredOngoing,
//         completed_orders: completed_orders,
//         cancelled_orders: cancelledFromOngoing,
//       });

//       console.log('Filtered Orders:', {
//         ongoing_orders: filteredOngoing,
//         completed_orders,
//         cancelled_orders: cancelledFromOngoing,
//       });
//     } catch (error) {
//       toast.error('Failed to fetch orders');
//       console.error(error);
//     }
//   };

//   console.log(myOrders, "myoreder")
//   useEffect(() => {
//     getMyOrder();
//   }, []);


//   const formatDate = dateString => {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   };

//   const ordersToDisplay =
//     orderState === "ongoing"
//       ? myOrders.ongoing_orders
//       : orderState === "completed"
//         ? myOrders.completed_orders
//         : myOrders.cancelled_orders || [];

//   const [isCancelOrderModalVisible, setIsCancelOrderModalVisible] =
//     useState(false);
//   const [cancellationReason, setCancellationReason] = useState('');
//   const [selectedOrderId, setSelectedOrderId] = useState(null);

//   const showModal = orderId => {
//     setSelectedOrderId(orderId);
//     setIsCancelOrderModalVisible(true);
//   };

//   const cancelOrderFun = async () => {
//     try {
//       await axios.put(`/disha/cancel-order/${selectedOrderId}`, {
//         cancelled_reason: cancellationReason,
//       });
//       toast.success('Order cancelled successfully');
//       setIsCancelOrderModalVisible(false);
//       setCancellationReason('');
//       getMyOrder();
//     } catch (error) {
//       toast.error('Failed to cancel order');
//       console.error(error);
//     }
//   };

//   const handleCancel = () => {
//     setIsCancelOrderModalVisible(false);
//     setCancellationReason('');
//   };

//   return (
//     <div className="container pb-10">
//       <Modal
//         title="Cancel Order"
//         visible={isCancelOrderModalVisible}
//         onCancel={handleCancel}
//         centered
//         footer={null}
//       >
//         <p>
//           If the order is canceled after checkout, GST and a 2% transaction fee
//           will be deducted, and the remaining amount will be refunded.
//         </p>
//         <textarea
//           className="p-2 rounded"
//           placeholder="Reason for cancellation"
//           value={cancellationReason}
//           onChange={e => setCancellationReason(e.target.value)}
//         />

//         <button
//           className="mt-2 bg-p text-white  border-none w-100 py-2 rounded"
//           onClick={cancelOrderFun}
//         >
//           Cancel order
//         </button>
//       </Modal>
//       <div className="order-header">
//         <h2 className="fw-700 headtextres">My Orders :</h2>
//         <div className="order-buttons">
//           <button
//             onClick={() => handleStateChange("ongoing")}
//             className={`${styles.statebutton} ${orderState === "ongoing" && styles.active}`}
//           >
//             On Going
//           </button>
//           <button
//             onClick={() => handleStateChange("completed")}
//             className={`${styles.statebutton} ${orderState === "completed" && styles.active}`}
//           >
//             Completed
//           </button>
//           <button
//             onClick={() => handleStateChange("cancelled")}
//             className={`${styles.statebutton} ${orderState === "cancelled" && styles.active}`}
//           >
//             Cancelled
//           </button>
//         </div>
//       </div>

//       {ordersToDisplay.length === 0 ? (
//         <p className="text-center mt-20 fs-6">No orders yet</p>
//       ) : (
//         ordersToDisplay?.map(order => (
//           <div key={order.id} className={styles.ordercontainer}>
//             <div className={`${styles.ordertowrap} d-flex flex-wrap gap-2`}>
//               <div className="w-100">
//                 <div className="d-flex gap-4">
//                   <div className="w-50">
//                     <span className={styles.productpropertyHeading}>
//                       Order Id :{' '}
//                     </span>
//                     <span className={styles.productpropertycontent}>
//                       #{order?.ids}
//                     </span>
//                   </div>
//                   <div className="w-50 d-flex justify-content-end">
//                     <span className={styles.productpropertyHeading}>
//                       Total :{' '}
//                     </span>
//                     {selectedCurrency === 'INR' ? (
//                       <span className={styles.productpropertycontent}>
//                         ₹{order?.payable_amount}
//                       </span>
//                     ) : (
//                       <span className={styles.productpropertycontent}>
//                         ${order?.payable_amount_in_dollar}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//               <div className="w-100">
//                 <div className="d-flex gap-4">
//                   <div className="w-50">
//                     <span className={styles.productpropertyHeading}>
//                       Ship To:
//                     </span>
//                     <span className={styles.productpropertycontent}>
//                       {order?.shipping_address?.landmark_1}
//                     </span>
//                   </div>
//                   <div className="w-50 d-flex justify-content-end">
//                     <span className={styles.productpropertyHeading}>
//                       Order Date :{' '}
//                     </span>
//                     <span className={styles.productpropertycontent}>
//                       {formatDate(order.created_at)}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className={styles.orderproductcontainer}>
//               {order?.order_items.map(item => (
//                 <OrderProductCard
//                   orderState={orderState}
//                   returnId={order}
//                   item={item}
//                   key={item.id}
//                 />
//               ))}
//             </div>
//             {orderState !== "completed" &&
//               orderState !== "cancelled" &&
//               order.status?.trim().toLowerCase() !== "order confirmed" &&
//               order.status?.trim().toLowerCase() !== "cancelled" && (
//                 <div className="d-flex justify-content-end mt-3">
//                   <button
//                     className={styles.button}
//                     onClick={() => showModal(order.id)} // Pass order.id
//                   >
//                     Cancel Order
//                   </button>
//                 </div>
//               )}

//             <div className="d-none d-md-block">
//               <OrderProgress status={order.status} />
//             </div>
//             <div className="d-block d-md-none mt-6">
//               <p>Order status : {order.status}</p>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// const OrderProductCard = ({ orderState, returnId, item }) => {
//   console.log(returnId, "itemsdfs")
//   const navigate = useNavigate();
//   const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
//   const [review, setReview] = useState('');
//   const [rating, setRating] = useState(item?.product?.average_rating); // Default rating

//   const showReviewModal = () => {
//     setIsReviewModalVisible(true);
//     setRating(5);
//   };

//   const handleReviewCancel = () => {
//     setIsReviewModalVisible(false);
//     setReview('');
//     setRating(item?.product?.average_rating);
//   };

//   const handleReviewSubmit = async () => {
//     if (rating < 1) {
//       toast.error('Please give at least 1 star rating.');
//       return;
//     }
//     try {
//       await axios.post('/disha/add-review/', {
//         product: item.product.id,
//         review: review,
//         average_rating: rating,
//       });
//       toast.success('Review submitted successfully');
//       setIsReviewModalVisible(false);
//       setReview('');
//       setRating(5);
//     } catch (error) {
//       toast.error('Failed to submit review');
//       console.error(error);
//     }
//   };
//   const hasUserReviewed = (orderItem) => {
//     return orderItem.review !== null;
//   };

//   return (
//     <div>
//       {' '}
//       <Modal
//         title="How was the product ?"
//         visible={isReviewModalVisible}
//         onCancel={handleReviewCancel}
//         centered
//         footer={null}
//       >
//         <div className="d-flex gap-4 mt-4">
//           <div className={styles.imagewrap}>
//             <img
//               src={item?.product?.image}
//               className="w-100 h-100 object-cover"
//             />
//           </div>
//           <div className="mt-8">
//             <Rate
//               defaultValue={item?.product?.average_rating}
//               value={rating}
//               onChange={value => setRating(value < 1 ? 1 : value)}
//             />
//           </div>
//         </div>
//         <p className="mt-4">
//           Write a review <span className="text-danger"> (required)</span>
//         </p>
//         <textarea
//           className="p-2 rounded "
//           placeholder="Write your review here..."
//           value={review}
//           onChange={e => setReview(e.target.value)}
//         />
//         <div className="d-flex justify-content-end gap-4 mt-2">
//           <button
//             key="submit"
//             onClick={handleReviewSubmit}
//             className="bg-p py-2 px-4 border-none text-white rounded"
//           >
//             Submit
//           </button>
//         </div>
//       </Modal>
//       <div className={styles.orderproductcard}>
//         <div className={styles.imagewrap}>
//           <img
//             src={item?.product?.image}
//             className="w-100 h-100 object-cover"
//           />
//         </div>
//         <div className="w-100">
//           <p className={styles.producttext}>{item?.product?.name}</p>
//           <p className={styles.producttext} style={{ fontWeight: 'normal' }} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.product?.short_description || "") }}>

//           </p>

//           <div className="d-flex justify-content-between align-items-center flex-wrap gap-4">
//             <div className="d-flex gap-4" style={{ visibility: 'hidden' }}>
//               <div className="">
//                 <div>
//                   <span className={styles.productpropertyHeading}>
//                     Color :{' '}
//                   </span>
//                   <span className={styles.productpropertycontent}>
//                     Sparkle Grey
//                   </span>
//                 </div>
//                 <div>
//                   <span className={styles.productpropertyHeading}>Type : </span>
//                   <span className={styles.productpropertycontent}>
//                     Other Type
//                   </span>
//                 </div>
//               </div>
//               <div className="">
//                 <div>
//                   <span className={styles.productpropertyHeading}>
//                     Color :{' '}
//                   </span>
//                   <span className={styles.productpropertycontent}>
//                     Sparkle Grey
//                   </span>
//                 </div>
//                 <div>
//                   <span className={styles.productpropertyHeading}>Type : </span>
//                   <span className={styles.productpropertycontent}>
//                     Other Type
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="d-flex justify-content-end">
//               {/* {!orderState && item.status?.toLowerCase().trim() === "order delivered" && ( */}

//               {/* <div className={`${styles.buttonwrap}`}>
//                   <button
//                     className={styles.button}
//                     onClick={showReviewModal}
//                     disabled={hasUserReviewed(item)}
//                     style={{ cursor: hasUserReviewed(item) ? "not-allowed" : 'pointer' }}
//                   >
//                     {hasUserReviewed(item) ? "Review Already Submitted" : "Write product review"}
//                   </button>
//                   <button
//                     className={`${styles.button} ${styles.btnsecondary}`}
//                     onClick={() => {
//                       navigate(`/return-submit/${returnId?.id}`);
//                     }}
//                   >
//                     Replace item
//                   </button>
//                 </div> */}
//               {/* )} */}
//               {orderState === "completed" && (
//                 <div className={`${styles.buttonwrap}`}>
//                   <button
//                     className={styles.button}
//                     onClick={showReviewModal}
//                     disabled={hasUserReviewed(item)}
//                     style={{ cursor: hasUserReviewed(item) ? "not-allowed" : 'pointer' }}
//                   >
//                     {hasUserReviewed(item) ? "Review Already Submitted" : "Write product review"}
//                   </button>
//                   <button
//                     className={`${styles.button} ${styles.btnsecondary}`}
//                     onClick={() => {
//                       navigate(`/return-submit/${returnId?.id}`);
//                     }}
//                   >
//                     Replace item
//                   </button>
//                 </div>
//               )}


//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const OrderProgress = ({ status }) => {
//   // Define the order statuses and their corresponding steps
//   const statusSteps = [
//     { step: 1, label: 'Order Received', status: 'Pending' },
//     { step: 2, label: 'Order Confirmed', status: 'Order Confirmed' },
//     { step: 3, label: 'On the Way', status: 'On the Way' },
//     { step: 4, label: 'Order Delivered', status: 'Delivered' },
//   ];

//   // Determine which steps are active based on the current status
//   const activeSteps = statusSteps.map(step => ({
//     ...step,
//     isActive: statusSteps.findIndex(s => s.status === status) >= step.step - 1,
//   }));

//   return (
//     <div className={styles.orderprogress}>
//       <h3 className={styles.orderprogresheading}>Order Progress</h3>
//       <div className={styles.orderprogresswrap}
//         style={{ fontSize: '14px' }}
//       >
//         <div
//           className={`${styles.linewrap} ${activeSteps[0].isActive && styles.lineactive
//             }`}
//         ></div>
//         <div
//           className={`${styles.linewrap} ${activeSteps[1].isActive && styles.lineactive
//             }`}
//         ></div>
//         <div
//           className={`${styles.linewrap} ${activeSteps[2].isActive && styles.lineactive
//             }`}
//         ></div>
//         <div
//           className={`${styles.linewrap} ${activeSteps[3].isActive && styles.lineactive
//             }`}
//         ></div>
//         <div className={`${styles.circlewrap}`}>
//           {activeSteps.map(step => (
//             <div
//               key={step.step}
//               className={`${styles.circle} ${step.isActive && styles.circleactive
//                 }`}
//             >
//               {step.step}
//               <p className={`${styles.para}`} style={{ marginTop: '5px' }}>{step.label}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };


import { useContext, useEffect, useState } from 'react';
import styles from './MyOrders.module.css';
import axios from '../../../utilities/customAxios';
import { toast } from 'react-toastify';
import { Context } from '../../../context/context';
import { Modal, Rate } from 'antd';
import { useNavigate } from 'react-router-dom';
import DOMPurify from "dompurify";

export default function MyOrders() {
  const [orderState, setOrderState] = useState("ongoing");
  const { selectedCurrency } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [myOrders, setMyOrders] = useState({
    ongoing_orders: [],
    completed_orders: [],
    cancelled_orders: [],
  });
  const [progresState, setProgresState] = useState(1);

  const handleStateChange = (state) => {
    if (state) {
      setOrderState(state);
    } else {
      setOrderState(prev => (prev === "ongoing" ? "completed" : "ongoing"));
    }
  };

  const getMyOrder = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/disha/my-orders');

      const { ongoing_orders, completed_orders } = response.data;

      const filteredOngoing = ongoing_orders.filter(
        order => order.status?.toLowerCase().trim() !== "cancelled"
      );

      const cancelledFromOngoing = ongoing_orders.filter(
        order => order.status?.toLowerCase().trim() === "cancelled"
      );

      setMyOrders({
        ongoing_orders: filteredOngoing,
        completed_orders: completed_orders,
        cancelled_orders: cancelledFromOngoing,
      });
    } catch (error) {
      toast.error('Failed to fetch orders');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  console.log(myOrders, "myoreder")
  useEffect(() => {
    getMyOrder();
  }, []);

  const formatDate = dateString => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const ordersToDisplay =
    orderState === "ongoing"
      ? myOrders.ongoing_orders
      : orderState === "completed"
        ? myOrders.completed_orders
        : myOrders.cancelled_orders || [];

  const [isCancelOrderModalVisible, setIsCancelOrderModalVisible] =
    useState(false);
  const [cancellationReason, setCancellationReason] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const showModal = orderId => {
    setSelectedOrderId(orderId);
    setIsCancelOrderModalVisible(true);
  };

  const cancelOrderFun = async () => {
    try {
      await axios.put(`/disha/cancel-order/${selectedOrderId}`, {
        cancelled_reason: cancellationReason,
      });
      toast.success('Order cancelled successfully');
      setIsCancelOrderModalVisible(false);
      setCancellationReason('');
      getMyOrder();
    } catch (error) {
      toast.error('Failed to cancel order');
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsCancelOrderModalVisible(false);
    setCancellationReason('');
  };
  // const handleDownload = (order) => {
  //   // const invoiceUrl = `/api/download-invoice/${order.id}`;
  //   // window.open(invoiceUrl, '_blank');
  // };

  const handleDownload = (order) => {
    const invoiceUrl = `https://admin.dadisha.com/new-invoice/${order.id}`;
    window.open(invoiceUrl, '_blank');
  };


  return (
    <div className="container pb-10">
      <Modal
        title="Cancel Order"
        visible={isCancelOrderModalVisible}
        onCancel={handleCancel}
        centered
        footer={null}
      >
        <p>
          If the order is canceled after checkout, GST and a 2% transaction fee
          will be deducted, and the remaining amount will be refunded.
        </p>
        <textarea
          className="p-2 rounded"
          placeholder="Reason for cancellation"
          value={cancellationReason}
          onChange={e => setCancellationReason(e.target.value)}
        />

        <button
          className="mt-2 bg-p text-white  border-none w-100 py-2 rounded"
          onClick={cancelOrderFun}
        >
          Cancel order
        </button>
      </Modal>
      <div className="order-header">
        <h2 className="fw-700 headtextres">My Orders :</h2>
        <div className="order-buttons">
          <button
            onClick={() => handleStateChange("ongoing")}
            className={`${styles.statebutton} ${orderState === "ongoing" && styles.active}`}
          >
            On Going
          </button>
          <button
            onClick={() => handleStateChange("completed")}
            className={`${styles.statebutton} ${orderState === "completed" && styles.active}`}
          >
            Completed
          </button>
          <button
            onClick={() => handleStateChange("cancelled")}
            className={`${styles.statebutton} ${orderState === "cancelled" && styles.active}`}
          >
            Cancelled
          </button>
        </div>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner"></div>
        </div>
      ) : ordersToDisplay.length === 0 ? (
        <p className="text-center mt-20 fs-6">No orders yet</p>
      ) : (
        ordersToDisplay?.slice().reverse().map(order => (
          <div key={order.id} className={styles.ordercontainer}>
            <div className={`${styles.ordertowrap} d-flex flex-wrap gap-2`}>
              <div className="w-100">
                <div className="d-flex gap-4">
                  <div className="w-50 d-flex align-items-center gap-2">
                    <div>
                      <span className={styles.productpropertyHeading}>
                        Order Id:{' '}
                      </span>
                      <span className={styles.productpropertycontent}>
                        #{order?.ids}
                      </span>
                    </div>
                    <button
                      className={`${styles.downloadBtn}`}
                      onClick={() => handleDownload(order)}
                      title="Download Invoice"
                    >
                      <i className="fas fa-file-download"></i>
                    </button>
                  </div>

                  <div className="w-50 d-flex justify-content-end">
                    <span className={styles.productpropertyHeading}>
                      Total :{' '}
                    </span>
                    {selectedCurrency === 'INR' ? (
                      <span className={styles.productpropertycontent}>
                        <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal', color: 'inherit' }}>₹</span>{order?.payable_amount}
                      </span>
                    ) : (
                      <span className={styles.productpropertycontent}>
                        ${order?.payable_amount_in_dollar}
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
                      {order?.shipping_address?.landmark_1}
                    </span>
                  </div>
                  <div className="w-50 d-flex justify-content-end">
                    <span className={styles.productpropertyHeading}>
                      Order Date :{' '}
                    </span>
                    <span className={styles.productpropertycontent}>
                      {formatDate(order.created_at)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.orderproductcontainer}>
              {order?.order_items.map(item => (
                <OrderProductCard
                  orderState={orderState}
                  returnId={order}
                  item={item}
                  key={item.id}
                  selectedCurrency={selectedCurrency}
                />
              ))}
            </div>
            {orderState !== "completed" &&
              orderState !== "cancelled" &&
              order.status?.trim().toLowerCase() !== "order confirmed" &&
              order.status?.trim().toLowerCase() !== "cancelled" && (
                <div className="d-flex justify-content-end mt-3">
                  <button
                    className={styles.button}
                    onClick={() => showModal(order.id)} // Pass order.id
                  >
                    Cancel Order
                  </button>
                </div>
              )}

            <div className="d-none d-md-block">
              <OrderProgress status={order.status} />
            </div>
            <div className="d-block d-md-none mt-6">
              <p>Order status : {order.status}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const OrderProductCard = ({ orderState, returnId, item, selectedCurrency }) => {

  const navigate = useNavigate();
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(item?.product?.average_rating);

  const showReviewModal = () => {
    setIsReviewModalVisible(true);
    setRating(5);
  };

  const handleReviewCancel = () => {
    setIsReviewModalVisible(false);
    setReview('');
    setRating(item?.product?.average_rating);
  };

  const handleReviewSubmit = async () => {
    if (rating < 1) {
      toast.error('Please give at least 1 star rating.');
      return;
    }
    try {
      await axios.post('/disha/add-review/', {
        product: item.product.id,
        review: review,
        average_rating: rating,
      });
      toast.success('Review submitted successfully');
      setIsReviewModalVisible(false);
      setReview('');
      setRating(5);
    } catch (error) {
      toast.error('Failed to submit review');
      console.error(error);
    }
  };

  const hasUserReviewed = (orderItem) => {
    return orderItem.review !== null;
  };

  // Determine which image and price to display
  const displayImage = item?.variant?.additional_images?.[0] || item?.product?.image;
  const displayPrice = item?.variant?.sale_price || item?.product_price;
  const displayPriceInDollar = item?.variant?.sale_price_in_dollar || item?.product_price_in_dollar;

  return (
    <div>
      <Modal
        title="How was the product ?"
        visible={isReviewModalVisible}
        onCancel={handleReviewCancel}
        centered
        footer={null}
      >
        <div className="d-flex gap-4 mt-4">
          <div className={styles.imagewrap}>
            <img
              src={displayImage}
              className="w-100 h-100 object-cover"
              alt="Product"
            />
          </div>
          <div className="mt-8">
            <Rate
              defaultValue={item?.product?.average_rating}
              value={rating}
              onChange={value => setRating(value < 1 ? 1 : value)}
            />
          </div>
        </div>
        <p className="mt-4">
          Write a review <span className="text-danger"> (required)</span>
        </p>
        <textarea
          className="p-2 rounded "
          placeholder="Write your review here..."
          value={review}
          onChange={e => setReview(e.target.value)}
        />
        <div className="d-flex justify-content-end gap-4 mt-2">
          <button
            key="submit"
            onClick={handleReviewSubmit}
            className="bg-p py-2 px-4 border-none text-white rounded"
          >
            Submit
          </button>
        </div>
      </Modal>
      <div className={styles.orderproductcard}>
        <div className={styles.imagewrap}>
          <img
            src={displayImage}
            className="w-100 h-100 object-cover"
            alt="Product"
          />
        </div>
        <div className="w-100">
          <p className={styles.producttext}>{item?.product?.name}</p>
          <p className={styles.producttext} style={{ fontWeight: 'normal' }} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.product?.short_description || "") }}></p>

          {/* Display variant information if available */}
          {item?.variant && (
            <div className="d-flex gap-4" style={{ visibility: 'hidden' }}>
              <div>
                <div>
                  <span className={styles.productpropertyHeading}>Price: </span>
                  <span className={styles.productpropertycontent}>
                    {selectedCurrency === 'INR' ? (
                      `₹${displayPrice}`
                    ) : (
                      `$${displayPriceInDollar || displayPrice}`
                    )}
                  </span>
                </div>
                {item.variant.variant_values?.map((variantValue, index) => (
                  <div key={index}>
                    <span className={styles.productpropertyHeading}>
                      {variantValue.variant === 8 ? 'Size' : variantValue.variant === 9 ? 'Language' : 'Variant'}:{' '}
                    </span>
                    <span className={styles.productpropertycontent}>
                      {variantValue.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center flex-wrap gap-4">
            <div className="d-flex gap-4" style={{ visibility: 'hidden' }}>
              <div className="">
                <div>
                  <span className={styles.productpropertyHeading}>
                    Color :{' '}
                  </span>
                  <span className={styles.productpropertycontent}>
                    Sparkle Grey
                  </span>
                </div>
                <div>
                  <span className={styles.productpropertyHeading}>Type : </span>
                  <span className={styles.productpropertycontent}>
                    Other Type
                  </span>
                </div>
              </div>
              <div className="">
                <div>
                  <span className={styles.productpropertyHeading}>
                    Color :{' '}
                  </span>
                  <span className={styles.productpropertycontent}>
                    Sparkle Grey
                  </span>
                </div>
                <div>
                  <span className={styles.productpropertyHeading}>Type : </span>
                  <span className={styles.productpropertycontent}>
                    Other Type
                  </span>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              {orderState === "completed" && (
                <div className={`${styles.buttonwrap}`}>
                  <button
                    className={styles.button}
                    onClick={showReviewModal}
                    disabled={hasUserReviewed(item)}
                    style={{ cursor: hasUserReviewed(item) ? "not-allowed" : 'pointer' }}
                  >
                    {hasUserReviewed(item) ? "Review Already Submitted" : "Write product review"}
                  </button>
                  {item?.product?.replacement_in_days == 0 ?
                    (
                      <p className='font-poppins' style={{ fontSize: '0.8rem', color: 'red' }}>No Replacement Available</p>
                    )
                    : (
                      <button
                        className={`${styles.button} ${styles.btnsecondary}`}
                        onClick={() => {
                          navigate(`/return-submit/${returnId?.id}`);
                        }}
                      >
                        Replace item
                      </button>
                    )}

                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderProgress = ({ status }) => {
  // Define the order statuses and their corresponding steps
  const statusSteps = [
    { step: 1, label: 'Order Received', status: 'Pending' },
    { step: 2, label: 'Order Confirmed', status: 'Order Confirmed' },
    { step: 3, label: 'On the Way', status: 'On the Way' },
    { step: 4, label: 'Order Delivered', status: 'Delivered' },
  ];

  // Determine which steps are active based on the current status
  const activeSteps = statusSteps.map(step => ({
    ...step,
    isActive: statusSteps.findIndex(s => s.status === status) >= step.step - 1,
  }));

  return (
    <div className={styles.orderprogress}>
      <h3 className={styles.orderprogresheading}>Order Progress</h3>
      <div className={styles.orderprogresswrap}
        style={{ fontSize: '14px' }}
      >
        <div
          className={`${styles.linewrap} ${activeSteps[0].isActive && styles.lineactive
            }`}
        ></div>
        <div
          className={`${styles.linewrap} ${activeSteps[1].isActive && styles.lineactive
            }`}
        ></div>
        <div
          className={`${styles.linewrap} ${activeSteps[2].isActive && styles.lineactive
            }`}
        ></div>
        <div
          className={`${styles.linewrap} ${activeSteps[3].isActive && styles.lineactive
            }`}
        ></div>
        <div className={`${styles.circlewrap}`}>
          {activeSteps.map(step => (
            <div
              key={step.step}
              className={`${styles.circle} ${step.isActive && styles.circleactive
                }`}
            >
              {step.step}
              <p className={`${styles.para}`} style={{ marginTop: '10px' }}>{step.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};