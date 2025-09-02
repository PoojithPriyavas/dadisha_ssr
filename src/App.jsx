
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Services from './pages/services/Services';
import ContactUs from './pages/contactUs/ContactUs';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Product from './pages/products/Product';
import CategoryFilter from './pages/category/CategoryFilter';
import ProductDetails from './pages/products/productDetail/ProductDetails';
import SignIn from './pages/products/signIn/SignIn.jsx';
import Register from './pages/register/Register';
import CartItem from './pages/cart/CartItem.jsx';
import ForgetPWD from './pages/forgetpassword/ForgetPWD.jsx';
import CheckOut from './pages/checkout/CheckOut.jsx';
import Profile from './pages/profile/Profile.jsx';
import MyOrders from './pages/profile/profileComponents/MyOrders.jsx';
import MyProfile from './pages/profile/profileComponents/MyProfile.jsx';
import MyOrdersReturn from './pages/profile/profileComponents/MyOrdersReturn.jsx';
import MyWishList from './pages/profile/profileComponents/MyWishList.jsx';
import MyAddress from './pages/profile/profileComponents/MyAddress.jsx';
import Faqs from './pages/profile/profileComponents/Faqs.jsx';
import ReturnAndRefunds from './pages/profile/profileComponents/ReturnAndRefunds.jsx';
import { AppProvider } from './context/context.jsx';
import OrderSuccessPage from './components/order/OrderSuccessPage.jsx';
import Compare from './components/compareScreen/Compare.jsx';
import CompareButton from './components/CompareButton.jsx';
import SellWithUs from './pages/sellWithUs/SellWithUs.jsx';
import Blogs from './pages/blogs/Blogs.jsx';
import BlogDetails from './pages/blogs/BlogDetail.jsx';
import Payment from './pages/payment/payment.jsx';
import PrivacyPolicy from './pages/policy/PrivacyPolicy.jsx';
import SupplierPolicy from './pages/policy/SupplierPolicy.jsx';
import ShoppingPolicy from './pages/policy/ShoppingPolicy.jsx';
import TermsAndConditions from './pages/policy/TermsAndConditions.jsx';
import { RouteChangeHandler } from './RouteChangeHandler/RouteChangeHandler.jsx';
import PrivateRoute from './PrivateRouter/PrivateRouter.jsx';
import TestHome from './pages/Test/TestHome.jsx';
import TestContact from './pages/Test/TestContact.jsx';
import TestAbout from './pages/Test/TestAbout.jsx';
import Elearning from './pages/elearning/elearning.jsx';
import CourseDetails from './pages/courseDetails/CourseDetails.jsx';
import RiskManag from './pages/riskManagement/RiskManagement.jsx';
import RiskMtDetail from './pages/riskManagement/RiskMtDetail.jsx';



function App() {
  const [count, setCount] = useState(0);
  const [scrollProgressVisible, setScrollProgressVisible] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const location = useLocation();
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    if (
      location.pathname === '/' ||
      location.pathname === '/categoryfilter' ||
      location.pathname === '/signin' ||
      location.pathname === '/register' ||
      location.pathname === '/cart' ||
      location.pathname === '/forgetpassword' ||
      location.pathname === '/checkout' ||
      location.pathname === '/profile' ||
      location.pathname === '/profile/myorder' ||
      location.pathname === '/profile/myprofile' ||
      location.pathname === '/profile/mywishlist' ||
      location.pathname === '/profile/myaddress' ||
      location.pathname === '/profile/faqs' ||
      location.pathname === '/profile/returnsandrefunds' ||
      location.pathname === '/return-submit' ||
      location.pathname === '/compare' ||
      location.pathname === '/sellwithus' ||
      location.pathname === '/riskmanag' ||

      location.pathname === '/blogs/'
    ) {
      setBackgroundImage('');
    } else {
      // setBackgroundImage('url(images/vertical-line-bg-small-medium-gray.svg)');
      setBackgroundImage('')
    }
  }, [location]);

  useEffect(() => {
    // Only run this effect on the client side
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop;
        if (scrollTop > 200) {
          setScrollProgressVisible(true);
        } else {
          setScrollProgressVisible(false);
        }

        const scrollHeight = document.documentElement.scrollHeight;
        const windowHeight = document.documentElement.clientHeight;
        const maxScrollTop = scrollHeight - windowHeight;
        const scrollTopPercentage = (scrollTop / maxScrollTop) * 100;
        setScrollPercentage(Math.min(scrollTopPercentage, 100));
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleScrollTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
      <div
        style={{
          backgroundImage: backgroundImage,
          backgroundPosition: 'center top',
          backgroundRepeat: 'repeat',
          minHeight: '100vh',
        }}
      >
        <ToastContainer />
          <RouteChangeHandler />
          <CompareButton />
          <Routes>
            <Route path="/home-2" element={<Home />} />
            <Route path="/about-2" element={<About />} />
            <Route path="/contactus-2" element={<ContactUs />} />
            <Route path="/" element={<Product />} />
            <Route path="/productdetails/:slug" element={<ProductDetails />} />
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />}>
                <Route path="myprofile" element={<MyProfile />} />
                <Route path="myorder" element={<MyOrders />} />
                <Route path="mywishlist" element={<MyWishList />} />
                <Route path="myaddress" element={<MyAddress />} />
                {/* <Route path="faqs" element={<Faqs />} /> */}
                <Route path="returnsandrefunds" element={<ReturnAndRefunds />} />
              </Route>
            </Route>

            <Route path="/faqs" element={<Faqs />} />
            <Route path="/categoryfilter" element={<CategoryFilter />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<CartItem />} />
            <Route path="/forgetpassword" element={<ForgetPWD />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/ordersuccess" element={<OrderSuccessPage />} />
            <Route path="/return-submit/:orderid" element={<MyOrdersReturn />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/sellwithus" element={<SellWithUs />} />
            <Route path="/blogs/:page" element={<BlogDetails />} />
            <Route path="/blogs/:slug" element={<BlogDetails />} />
            <Route path="/blogs/pages/:slug" element={<Blogs />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/supplier-policy" element={<SupplierPolicy />} />
            <Route path="/shopping-policy" element={<ShoppingPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

            <Route path="/home" element={<TestHome />} />
            <Route path="/contactus" element={<TestContact />} />
            <Route path="/about" element={<TestAbout />} />
            <Route path="/elearning" element={<Elearning />} />
            <Route path="/risk-Management" element={<RiskManag />} />
            <Route path='/risk-management/:slug' element={<RiskMtDetail />} />

            <Route path="/courseDetails/:slug" element={<CourseDetails />} />



          </Routes>
        <div
          className={`scroll-progress d-block ${scrollProgressVisible ? 'visible' : ''}
            }`}
        >
          <a
            href="#"
            className="scroll-top"
            onClick={handleScrollTop}
            aria-label="scroll"
          >
            <span className="scroll-text">Scroll</span>
            <span className="scroll-line">
              <span
                className="scroll-point"
                style={{ height: `${scrollPercentage}% ` }}
              ></span>
            </span>
          </a>
        </div>
      </div>
  );
}

export default App;