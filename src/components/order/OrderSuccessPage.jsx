import { useNavigate } from 'react-router-dom';

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light p-4">
      <div className="bg-white p-5 rounded shadow-sm text-center">
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
        <h1 className="h2 font-weight-bold  mb-4 mt-2">
          Your order is successfully placed
        </h1>
        <p className="text-muted mb-4">
          You have successfully placed order. Our team will contact you shortly.
        </p>
        <div className="d-flex  gap-3">
          <button
            className="w-100 bg-p border-none text-white py-2"
            onClick={() => {
              navigate('/');
            }}
          >
            Go to Products
          </button>
          <button
            className="w-100 bg-p border-none text-white py-2"
            onClick={() => {
              navigate('/profile/myorder');
            }}
          >
            View Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
