import { useContext, useEffect,useState } from 'react';
import Header from '../../components/Header';
import ProductFooter from '../products/ProductFooter';
import SubCategoryHeader from '../../components/subCategoryHeader/SubCategoryHeader';
import CategorySidebar from '../../components/sidebar/CategoySidebar';
import { Fade } from 'react-awesome-reveal';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { FaArrowRight } from 'react-icons/fa6';
import { Context } from '../../context/context';

export default function Profile() {
  const navigate = useNavigate();
  const { userData, getuserData,setSelectedProductIds } = useContext(Context);
  useEffect(() => {
    getuserData();
  }, []);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <Header />
      <div className="mthead">
        {/* <SubCategoryHeader /> */}
        {/* <div className={`App ${isExpanded ? 'body-pd' : ''}`} id="body-pd">
          <CategorySidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
          <h1>Componentes</h1>
        </div> */}
        {/* <CategorySidebar /> */}
        <div className="container mx-auto mt-4">
          <div className="d-flex justify-content-between align-items-center">
            {/* <Fade duration={800} delay={200} cascade damping={0.1}> */}
            <p className="mb-0 d-flex justify-content-between align-items-center">
              <div
                className="custom-pointer"
                onClick={() => {
                  navigate('/');
                }}
              >
                Home
              </div>

              <i className="fa-solid fa-chevron-right mx-2"></i>
              <div style={{ color: '#9CA3AF' }}>Profile</div>
            </p>
            {/* </Fade> */}
          </div>

          <div className="row mt-4">
            <aside
              className="col-md-3 py-4 px-4 mb-6 rounded-xl"
              style={{ backgroundColor: '#FAFAFA' }}
            >
              <div className=" font-Inter text-xs  font-bold">
                <h1 className="fs-5 fw-700">{userData?.name}</h1>
                <h4 className="fs-6 fw-300">{userData?.email}</h4>
                <div className="mt-6 profile-nav d-flex flex-column gap-3">
                  <NavLink
                    to={'myprofile'}
                    className="text-black underline-none bg-white rounded-xl px-2 py-3 w-100 d-flex justify-content-between align-items-center"
                  >
                    <h1 className="fs-6 mb-0 fw-400">My Profile</h1>{' '}
                    <FaArrowRight />
                  </NavLink>

                  <NavLink
                    to={'myorder'}
                    className="text-black underline-none bg-white rounded-xl px-2 py-3 w-100 d-flex justify-content-between align-items-center"
                  >
                    <h1 className="fs-6 mb-0 fw-400"> My Orders</h1>{' '}
                    <FaArrowRight />
                  </NavLink>
                  <NavLink
                    to={'mywishlist'}
                    className="text-black underline-none bg-white rounded-xl px-2 py-3 w-100 d-flex justify-content-between align-items-center"
                  >
                    <h1 className="fs-6 mb-0 fw-400"> Wishlist</h1>{' '}
                    <FaArrowRight />
                  </NavLink>
                  <NavLink
                    to={'myaddress'}
                    className="text-black underline-none bg-white rounded-xl px-2 py-3 w-100 d-flex justify-content-between align-items-center"
                  >
                    <h1 className="fs-6 mb-0 fw-400"> My address</h1>{' '}
                    <FaArrowRight />
                  </NavLink>
                  <NavLink
                    to={'returnsandrefunds'}
                    className="text-black underline-none bg-white rounded-xl px-2 py-3 w-100 d-flex justify-content-between align-items-center"
                  >
                    <h1 className="fs-6 mb-0 fw-400"> Replace and Cancelled</h1>{' '}
                    <FaArrowRight />
                  </NavLink>
                  {/* <NavLink
                    to={'faqs'}
                    className="text-black underline-none bg-white rounded-xl px-2 py-3 w-100 d-flex justify-content-between align-items-center"
                  >
                    <h1 className="fs-6 mb-0 fw-400">FAQ</h1> <FaArrowRight />
                  </NavLink> */}
                  <div
                    className="text-black underline-none bg-white rounded-xl px-2 py-3 w-100 d-flex justify-content-between align-items-center custom-pointer"
                    onClick={() => {
                      localStorage.removeItem('dadishaToken');
                      localStorage.removeItem('selectedProductIds');
                      navigate('/home');
                    }}
                  >
                    <h1 className="fs-6 mb-0 fw-400 "> Sign Out</h1>{' '}
                    <FaArrowRight />
                  </div>
                </div>
              </div>
            </aside>

            <main className="col-md-9 my-10">
              <Outlet />
            </main>
          </div>
        </div>
      </div>

      <ProductFooter />
    </div>
  );
}
