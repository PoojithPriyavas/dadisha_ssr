import React, { useState, useEffect, useContext } from "react";
import styles from "./ReturnAndRefunds.module.css";
import axios from "../../../utilities/customAxios";
import { Context } from '../../../context/context';
import { Modal, Rate } from 'antd';
import { useNavigate } from 'react-router-dom';
import DOMPurify from "dompurify";

const ReturnAndRefunds = () => {
  const [orderState, setOrderState] = useState("ongoing");
  const [modalOpen, setModelOpen] = useState(false);
  const [replaceAndRefunds, setReplaceAndRefunds] = useState([]);
  const [loading, setLoading] = useState(false);


  const { selectedCurrency } = useContext(Context);
  // const getRetuns = async () => {
  //   const response = await axios.get('/disha/returns-and-refunds/');
  //   setReplaceAndRefunds(response.data);
  // }
  // useEffect(() => {
  //   getRetuns();
  // }, [])
  const [myOrders, setMyOrders] = useState({
    ongoing_orders: [],
    completed_orders: [],
    cancelled_orders: [],
  });
  const replacemnetStatus = [
    "Replacement Requested",
    "Replacement Approved By Admin",
    "Replacement In Transit To Admin",
    "Replacement Initiated By Admin",
    "Replacement In Transit To Customer",
    "Replacement Delivered To Admin",
    "Replacement Issued",
    "Shipped"
  ]
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

      const filteredOngoing = ongoing_orders.filter(order => {
        const status = order.status?.toLowerCase().trim();
        return (
          status !== "cancelled" &&
          status !== "Replacement Delivered To Admin"
        );
      });

      const replacementDelivered = ongoing_orders.filter(
        order => order.status?.trim() === "Replacement Delivered To Admin"
      );
      console.log(replacementDelivered, "replaement delivered to admin")
      const cancelledOrders = ongoing_orders.filter(
        order => order.status?.trim() === "Replacement Cancelled By Admin"
      );

      const finalCompleted = [...completed_orders, ...replacementDelivered];

      setMyOrders({
        ongoing_orders: filteredOngoing,
        completed_orders: finalCompleted,
        cancelled_orders: cancelledOrders,
      });
      // console.log(  'ongoing_orders :', filteredOngoing,
      //         'completed_orders :' ,finalCompleted,
      //         'cancelled_orders :', cancelledOrders,)
    } catch (error) {
      toast.error('Failed to fetch orders');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };



  // console.log(myOrders, "myorder")
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
        ?.map(order => ({
          ...order,
          order_items: order.order_items.filter(item => replacemnetStatus.includes(item.status))
        }))
        .filter(order => order.order_items.length > 0)

      : orderState === "completed"
        ? myOrders.completed_orders
          ?.map(item => ({
            ...item,
            order_items: item.order_items.filter(item => item.status === "Replacement Delivered To Customer")
          }))
          .filter(item => item.order_items.length > 0)
        : myOrders.cancelled_orders || [];

  const [isCancelOrderModalVisible, setIsCancelOrderModalVisible] =
    useState(false);
  const [cancellationReason, setCancellationReason] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const showModal = orderId => {
    setSelectedOrderId(orderId);
    setIsCancelOrderModalVisible(true);
  };
  console.log(ordersToDisplay, "sasd")
  const handleDownload = async (order) => {
    const response = await fetch(order.replacement_pdf);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "replacement-summary.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };


  return (
    <div className="container pb-10">
      <div className="d-flex gap-4  align-items-center ">
        <h2 className="fw-700 ">My Returns </h2>
        <div className="d-flex gap-2">
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
        <div className="text-center my-5">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : ordersToDisplay.length === 0 ? (
        <p className="text-center mt-20 fs-6">No orders yet</p>
      ) : (
        ordersToDisplay?.map(order => (
          <div key={order.id} className={styles.ordercontainer}>
            <div className={`${styles.ordertowrap} d-flex flex-wrap gap-2`}>
              <div className="w-100">
                <div className="d-flex gap-4">
                  <div className="w-50">
                    <span className={styles.productpropertyHeading}>
                      Order Id :{' '}
                    </span>
                    <span className={styles.productpropertycontent}>
                      #{order?.ids}
                    </span>
                  </div>
                  <div className="w-50 d-flex justify-content-end">
                    <span className={styles.productpropertyHeading}>
                      Total :{' '}
                    </span>
                    {selectedCurrency === 'INR' ? (
                      <span className={styles.productpropertycontent}>
                        <span  style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal', color: 'inherit' }}>₹</span>F{order?.payable_amount}
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
                />
              ))}
            </div>
            {order?.order_items.map(item => (
              item.status === "Replacement Approved By Admin" && (
                <div className={`${styles.deliverywrap}`}>
                  <div className={`${styles.left}`}>

                    <>
                      <p className={styles.leftheading}>Return Delivery Address</p>
                      <p className={styles.address}>{ordersToDisplay[0]?.shipping_address?.address}</p>
                    </>


                  </div>
                  {/* {order?.order_items.map(item => (
                item.status === "Replacement Approved By Admin" && ( */}
                  <div className={`${styles.right}`}>
                    <button
                      className={styles.button}
                      onClick={() => setModelOpen((prev) => !prev)}
                    >
                      Submit Shipping Details
                    </button>
                    <button className={styles.button} onClick={() => handleDownload(order)}>
                      Download Replacement Summary
                    </button>
                  </div>
                  {/* )
              ))} */}

                </div>
              )
            ))}
            {/* <div className={`${styles.contact}`}>
              <p className={styles.conatcttext}>
                We have encountered some issues with the courier you sent. Please
                contact customer support, or wait for our team to reach out to
                you.
              </p>

              <button className={`${styles.button} ${styles.contactbtn}`}>
                Contact Support
              </button>
            </div> */}
            <div className="d-none d-md-block">
              <OrderProgress status={order.status} orderState={orderState} />
            </div>
            <div className="d-block d-md-none mt-6">
              <p>Order status : {order.status}</p>
            </div>
          </div>
        ))
      )}


      <InfoWrap />
      {modalOpen && (
        <>
          <ShipmentModal />
          <div
            onClick={() => setModelOpen((prev) => !prev)}
            className={styles.modalexitwrapper}
          ></div>
        </>
      )}
    </div>
  );
};

export default ReturnAndRefunds;

// const OrderProductCard = ({ orderState }) => {
//   return (
//     <div className={styles.orderproductcard}>
//       <div className={styles.imagewrap}>
//         <img />
//       </div>
//       <div className="d-flex justify-content-between ">
//         <p className={styles.producttext}>
//           SROK Smart Phone 128GB, Oled Retina here goes prodcut name two line.kj
//           skjhd fkh ksjdhf kshdkf dskhf skdjfh ksjhdfk sdhkjfh sdkjhfksdhf
//           kjdshkfjh dskhfsdf
//         </p>
//         <p className={`${styles.price}`}>INR 579.00</p>
//       </div>
//     </div>
//   );
// };

////demo//////
const OrderProductCard = ({ orderState, returnId, item }) => {
  console.log(returnId, "itemsdfs")
  const navigate = useNavigate();
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(item?.product?.average_rating); // Default rating

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

  return (
    <div>
      {' '}
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
              src={item?.product?.image}
              className="w-100 h-100 object-cover"
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
            src={item?.product?.image}
            className="w-100 h-100 object-cover"
          />
        </div>
        <div className="w-100">
          <p className={styles.producttext}>{item?.product?.name}</p>
          <p className={styles.producttext} style={{ fontWeight: 'normal' }} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.product?.short_description || "") }}>

          </p>

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
              {!orderState && (
                <div className={`${styles.buttonwrap}`}>
                  <button className={styles.button} onClick={showReviewModal} disabled={hasUserReviewed(item)} style={{ cursor: hasUserReviewed(item) ? "not-allowed" : 'pointer' }}>
                    {hasUserReviewed(item) ? "Review Already Submitted" : "Write product review"}
                  </button>
                  <button
                    className={`${styles.button} ${styles.btnsecondary}`}
                    onClick={() => {
                      navigate(`/return-submit/${returnId?.id}`);
                    }}
                  >
                    Replace item
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderProgress = ({ status, orderState }) => {
  const stepTitles = [
    "Return request Initiated",
    "Request accepted",
    "In Transit",
    "Verification...",
    "Replacement In Progress",
    "Replacement Completed",
  ];

  const statusToStepIndex = {
    "Replacement Requested": 0,
    "Replacement Approved By Admin": 1,
    "Replacement In Transit To Admin": 2,
    "Replacement Delivered To Admin": 3,
    "Replacement Issued": 4,
    "Replacement Initiated By Admin": 4,
    "Replacement In Transit To Customer": 4,
    "Shipped": 5,
    "Replacement Delivered To Customer": 5,
    "Replacement Cancelled By Admin": 5
  };

  const currentStepIndex = statusToStepIndex[status] ?? 0;
  console.log("OrderProgress → status:", status, "| currentStepIndex:", currentStepIndex)
  const filteredSteps = orderState === "Cancelled"
    ? stepTitles.map((title, idx) => (idx === 0 || idx === 5 ? title : null))
    : stepTitles;

  return (
    <div className={styles.orderprogress}>
      <div className={styles.orderprogresswrap}>
        {/* Lines */}
        {stepTitles.slice(0, -1).map((_, idx) => (
          <div
            key={`line-${idx}`}
            className={`${styles.linewrap} ${idx < currentStepIndex ? styles.lineactive : ""}`}
          ></div>
        ))}

        {/* Circles with titles */}
        <div className={styles.circlewrap}>
          {filteredSteps.map((title, idx) =>
            title !== null ? (
              <div
                key={idx}
                className={`${styles.circle} ${idx <= currentStepIndex ? styles.circleactive : ""}`}
              >
                {idx + 1}
                <p className={styles.para}>{title}</p>
              </div>
            ) : null
          )}
        </div>

      </div>
    </div>
  );
};


const InfoWrap = () => {
  return (
    <div className={`${styles.infowrap}`}>
      <p className={styles.point}>
        1.Choose the products you wish to return and provide the reason for the
        return.
      </p>
      <p className={styles.point}>
        2.Choose the products you wish to return and provide the reason for the
        return.
      </p>
      <p className={styles.point}>
        3.Choose the products you wish to return and provide the reason for the
        return.
      </p>
      <p className={styles.point}>
        4.Choose the products you wish to return and provide the reason for the
        return.
      </p>
      <p className={styles.point}>
        1.Choose the products you wish to return and provide the reason for the
        return.
      </p>
      <p className={styles.point}>
        1.Choose the products you wish to return and provide the reason for the
        return.
      </p>
      <p className={styles.point}>
        1.Choose the products you wish to return and provide the reason for the
        return.
      </p>
    </div>
  );
};

const ShipmentModal = () => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalwrapper}>
        <h3 className={styles.modalheading}>Submit Shipping Details</h3>
        <form className={styles.formwrapper}>
          <div className={styles.forminput}>
            <label className={styles.label}>
              Delivery Agent <span>*</span>
            </label>
            <input
              type="text"
              className={styles.input}
              placeholder="Delivery agent name - FedExe, Delhivery "
            />
          </div>
          <div className={styles.forminput}>
            <label className={styles.label}>
              Tracking ID <span>*</span>
            </label>
            <input
              type="text"
              className={styles.input}
              placeholder="Tracking ID  "
            />
          </div>
          <div className={styles.forminput}>
            <label className={styles.label}>
              Upload Courier Bill / Receipt{" "}
            </label>
            <div className={styles.uploadwrap}>
              <div className={styles.inputwrap}>
                <input type="file" className={styles.hiddenupload} />
                <i className={`pi pi-upload ${styles.uploadicon}`}></i>
              </div>
              <div className={styles.uploadimgwrap}>
                <i className={`pi pi-trash ${styles.trashicon}`}></i>
                {/* <input type="file" className={styles.hiddenupload} /> */}
                {/* <i className={`pi pi-upload ${styles.uploadicon}`}></i> */}
              </div>
            </div>
          </div>
          <button className={styles.modalbutton}>
            Submit Shipping Details
          </button>
        </form>
      </div>
    </div>
  );
};
