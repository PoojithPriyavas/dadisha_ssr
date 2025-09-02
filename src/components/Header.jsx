import { useContext, useState, useEffect } from "react";
import './header.css';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Fade, Slide } from "react-awesome-reveal";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { FiUser } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import { FiMenu } from 'react-icons/fi';
import { isTokenValid } from "../utilities";
import ScrollToTop from "./ScrollToTop";
import { Context } from "../context/context";
import { FiSearch } from "react-icons/fi";
import BulkOrderComponent from "./bulkOrderComponent/BulkOrderComponent";

export default function Header() {
  const navigate = useNavigate();
  const [openNav, setOpenNav] = useState(false);
  const { homeData, gethomeData, setSelectedCurrency, openBulkOrderPopUp } = useContext(Context);
  // console.log(homeData?.main_categories?.map((cat) =>( cat)) ,'homedata')

  const location = useLocation();
  const isHidden = location.pathname === "/";

  // Helper function to check if current path matches
  const isActive = (path) => {
    return location.pathname === path ||
      (path === '/home' && location.pathname === '/');
  };


  useEffect(() => {
    gethomeData();
  }, []);
  const items = [
    {
      label: "INR",
      key: "0",
    },
    {
      label: "USD",
      key: "1",
    },
  ];



  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const handleBack = () => setActiveCategory(null);

  const handleMenuClick = ({ key }) => {
    const selected = items.find((item) => item.key === key);
    setSelectedItem(selected);
    setSelectedCurrency(selected.label);
  };

  const menu = {
    items,
    onClick: handleMenuClick,
  };

  const handleSubCategoryClick = (mainCategoryId, subCategoryId) => {
    navigate(
      `/categoryfilter?maincategoryid=${mainCategoryId}&subcategoryids=${subCategoryId}`
    );
  };

  const handleChildCategoryClick = (
    mainCategoryId,
    subCategoryId,
    childCategoryId
  ) => {
    // console.log(mainCategoryId,
    //   subCategoryId,
    //   childCategoryId,
    //   "id2")
    navigate(
      `/categoryfilter?maincategoryid=${mainCategoryId}&subcategoryids=${subCategoryId}&childcategoryids=${childCategoryId}`
    );
  };
  const searchNavigateFun = () => {
    navigate(`/categoryfilter?search=${searchValue}`);
  };

  return (
    <header>
      <ScrollToTop />
      {/* start navigation */}
      <nav className="navbar navbar-expand-lg header-light header-transparent bg-white disable-fixed position-fixed">
        <div className="container-fluid " >
          <div className="col-auto col-lg-2 me-lg-0 me-auto align-items-center">


            {!menuOpen && (
              <div className="menu-icon-mobile-only">
                <FiMenu
                  size={28}
                  className="custom-pointer"
                  aria-label="Toggle navigation"
                  onClick={() => setMenuOpen(true)}
                />
              </div>
            )}

            <a
              className="navbar-brand custom-pointer"
              onClick={() => navigate("/")}
            >
              <img
                src="/images/assets/logo_50.png"
                data-at2x="/images/assets/logo_112.png"
                alt=""
                className="default-logo"
              />
              <img
                src="/images/assets/logo_50.png"
                data-at2x="/images/assets/logo_112.png"
                alt=""
                className="alt-logo"
              />
              <img
                src="/images/assets/logo_50.png"
                data-at2x="/images/assets/logo_112.png"
                alt=""
                className="mobile-logo"
              />
            </a>
          </div>
          <div className="col-auto col-lg-8 menu-order position-static">

            <div
              className="collapse navbar-collapse justify-content-center"
              id="navbarNav"
            >
              <ul
                className="navbar-nav d-flex justify-content-between w-100"
                style={{ padding: "0 8%" }}
              >

                <li className="nav-item" style={{ visibility: isHidden ? "hidden" : "visible" }}>
                  <a
                    className={`nav-link custom-pointer ${isActive('/home') ? 'active-nav' : ''}`}
                    onClick={() => navigate("/home")}
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item" style={{ visibility: isHidden ? "hidden" : "visible" }}>
                  <a
                    className={`nav-link custom-pointer ${isActive('/about') ? 'active-nav' : ''}`}

                    onClick={() => navigate("/about")}
                  >
                    About
                  </a>
                </li>

                <li className="nav-item custom-pointer cursor-pointer">
                  <a href="/" className={`nav-link custom-pointer ${isActive('/') ? 'active-nav' : ''}`}>
                    Market Place
                  </a>
                </li>
                <li className="nav-item custom-pointer cursor-pointer">
                  <a href="/blogs/1" className={`nav-link custom-pointer ${isActive('/blogs/1') ? 'active-nav' : ''}`}>
                    Blogs
                  </a>
                </li>
                <li className="nav-item custom-pointer cursor-pointer">
                  <a onClick={() => navigate("/elearning")} className={`nav-link custom-pointer ${isActive('/elearning') ? 'active-nav' : ''}`}>
                    E-Learning
                  </a>
                </li>
                <li className="nav-item cursor-pointer">
                  <a href="/contactus" className={`nav-link custom-pointer ${isActive('/contactus') ? 'active-nav' : ''}`}>
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-auto col-lg-2 text-end d-flex gap-4 justify-content-center align-items-center">


            {isTokenValid() ? (
              <div
                className="d-flex gap-2 align-items-center fw-600 text-black custom-pointer"
                onClick={() => navigate("/profile/myprofile")}
                style={{ fontSize: "1rem" }}
              >
                <FiUser style={{ color: "#FFA500" }} />
                Profile
              </div>
            ) : (
              <div
                className="d-flex gap-2 align-items-center fw-600 text-black custom-pointer"
                onClick={() => navigate("/signin")}
                style={{ fontSize: "1rem" }}
              >
                <FiUser style={{ color: "#FFA500" }} />
                Sign In
              </div>
            )}
            {isTokenValid() && (
              <div
                className="d-flex gap-2 align-items-center fw-600 text-black custom-pointer"
                style={{ fontSize: "1rem" }}
                onClick={() => navigate("/cart")}
              >
                <FiShoppingCart style={{ color: "#FFA500" }} />
                Cart
              </div>
            )}

          </div>
        </div>


        {openBulkOrderPopUp && <BulkOrderComponent />}
      </nav>

      <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
        <div className="menu-header">
          <button
            className="close-btn"
            onClick={() => {
              setMenuOpen(false);
              setActiveCategory(null);
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="mobile-only py-2">
          <div className="position-relative w-full rounded overflow-hidden" style={{ boxShadow: '0 0 0 0.3px #ffa500' }}>
            <input
              className="border-none text-back overflow-hidden w-100"

              placeholder="Search for products"
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  searchNavigateFun();
                }
              }}
            />
            <div
              className="position-absolute end-0 top-0 px-3 py-1 h-full custom-pointer"
              style={{ backgroundColor: "#FFA500" }}
              onClick={searchNavigateFun}
            >
              <div className="d-flex justify-content-center align-items-center h-full">
                <FiSearch className="text-white fs-6" />
              </div>
            </div>
          </div>
        </div>
        <ul className="menu-list">
          <li className={`menu-item font-noto ${isActive('/home') ? 'active' : ''}`}
            onClick={() => navigate("/home")} >Home</li>

          <li className={`menu-item font-noto ${isActive('/about') ? 'active' : ''}`}
            onClick={() => navigate("/about")}>About us</li>

          <li className={`menu-item font-noto ${isActive('/blogs/1') ? 'active' : ''}`}
            onClick={() => navigate("/blogs/1")} >Blogs</li>
          <li className={`menu-item font-noto ${isActive('/elearning') ? 'active' : ''}`}
            onClick={() => navigate("/elearning")} >E-Learning</li>

          <li className={`menu-item font-noto ${isActive('/contactus') ? 'active' : ''}`}
            onClick={() => navigate("/contactus")} >Contact</li>

          {isTokenValid() ? (
            <>
              <li className={`menu-item font-noto ${isActive('/profile/myprofile') ? 'active' : ''}`} onClick={() => navigate("/profile/myprofile")} ><span><FiUser style={{ color: "#FFA500" }} />  Profile</span></li>
            </>
          ) : (
            <> <li className={`menu-item font-noto ${isActive('/signin') ? 'active' : ''}`} onClick={() => navigate("/signin")} ><span><FiUser style={{ color: "#FFA500" }} />  Sign in</span></li></>
          )}
          <li className={`menu-item font-noto ${isActive('/') ? 'active' : ''}`} onClick={() => navigate("/")} > Marketplace</li>



        </ul>
      </div>


    </header>
  );
}
