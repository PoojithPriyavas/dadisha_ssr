import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Fade, Slide } from "react-awesome-reveal";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { FiUser } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import { FiSearch, FiMenu } from "react-icons/fi";
import CatDropDown from "./categorydropdown/CatDropDown";
import ScrollToTop from "./ScrollToTop";
import { isTokenValid } from "../utilities";
import { Context } from "../context/context";
import BulkOrderComponent from "./bulkOrderComponent/BulkOrderComponent";

export default function SecondaryHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { homeData, gethomeData, setSelectedCurrency, openBulkOrderPopUp, setOpenBulkOrderPopUp } =
    useContext(Context);
  const [openNav, setOpenNav] = React.useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);

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

  const [selectedItem, setSelectedItem] = useState(items[0]);
  useEffect(() => {
    gethomeData();
  }, []);
  useEffect(() => {
    if (openBulkOrderPopUp) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Cleanup function to remove the class when the component unmounts
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [openBulkOrderPopUp]);

  const handleMenuClick = ({ key }) => {
    const selected = items.find((item) => item.key === key);
    setSelectedItem(selected);
    setSelectedCurrency(selected.label);
  };

  const menu = {
    items,
    onClick: handleMenuClick,
  };

  const searchNavigateFun = () => {
    navigate(`/categoryfilter?search=${searchValue}`);
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
  const isHidden = location.pathname === "/";

  return (
    <header
      className="position-fixed top-0 w-100 bg-white"
      style={{ zIndex: "1000", height: '50px', }}
    >
      <ScrollToTop />
      {/* start navigation */}
      <nav className="py-0 my-0 navbar navbar-expand-lg header-light header-transparent bg-white disable-fixed relative">
        {/* mobile header-start */}
        <div className="container w-100 d-block d-md-none">
          <div className="row g-0 align-items-center">
            {/* Left Section */}
            <div className="col-4 d-flex justify-content-start align-items-center gap-2 ps-2">
              <FiMenu
                className="fs-1 custom-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
              />

              <FiSearch
                className="fs-1 custom-pointer"
                onClick={() => {
                  if (menuOpen) {
                    setMenuOpen(false);
                    setActiveCategory(null);
                  } else {
                    setMenuOpen(true);
                  }
                }}
              />
            </div>


            {/* Center Logo */}
            <div className="col-4 text-center justify-content-center align-items-center">
              {/* <img
                src="/images/assets/logo_50.png"
                className="mobile-logo"
                alt="Logo"
                style={{ height: "40px" }}
                onClick={() => navigate("/")}
              /> */}
            </div>

            {/* Right Section */}
            <div className="col-4 d-flex justify-content-end align-items-center gap-2 pe-2">
              <FiUser className="fs-1" style={{ color: "#FFA500" }} />
              <FiShoppingCart className="fs-1" style={{ color: "#FFA500" }} onClick={() => navigate("/cart")} />
            </div>
          </div>
        </div>
        {/* mobile header ends */}
        <div className="container mx-auto my-auto d-none d-md-block" style={{ paddingTop: 0, paddingBottom: 0, maxHeight: '100px' }}>
          <div
            className="row align-items-center justify-content-center w-100 flex-nowrap"
          // style={{ padding: '0 3rem' }}
          >
            <div className="col-11 col-sm-10 col-md-11 col-lg-5 d-flex gap-1 gap-sm-5">
              <button
                className="navbar-toggler float-start"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-label="Toggle navigation"
                onClick={() => {
                  if (menuOpen) {
                    setMenuOpen(false);
                    setActiveCategory(null);
                  } else {
                    setMenuOpen(true);
                  }
                }}
              >
                <span className="navbar-toggler-line"></span>
                <span className="navbar-toggler-line"></span>
                <span className="navbar-toggler-line"></span>
                <span className="navbar-toggler-line"></span>
              </button>
              <div className="">
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
              <div
                className="d-flex   align-items-center justify-content-center w-full"
              // style={{ width: '28rem' }}
              >
                <div
                  className="d-flex  rounded w-full "
                  style={{ border: "1px solid #F3F4F6" }}
                >
                  {/* <div
                    className="d-none d-sm-flex align-items-center h-full w-fit justify-content-center custom-pointer"
                    style={{
                      backgroundColor: '#F3F4F6',
                      width: ' 14rem',
                      height: '3rem',
                    }}
                  >
                    <CatDropDown />
                  </div> */}

                  {/* <div className="position-relative w-full rounded overflow-hidden">
                    <input
                      className=" border-none text-back  overflow-hidden"
                      placeholder="Search for products"
                    />

                    <div
                      className="position-absolute end-0 top-0   px-3  py-1 h-full custom-pointer"
                      style={{ backgroundColor: '#FFA500' }}
                    >
                      <div className="d-flex justify-content-center align-items-center h-full">
                        <FiSearch className="text-white fs-6  " />
                      </div>
                    </div>
                  </div> */}
                  <div className="position-relative w-full rounded overflow-hidden ">
                    <input
                      className=" border-none text-back  overflow-hidden"
                      placeholder="Search for products"
                      onChange={(e) => setSearchValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          searchNavigateFun();
                        }
                      }}
                    />

                    <div
                      className="position-absolute end-0 top-0   px-3  py-1 h-full custom-pointer"
                      style={{ backgroundColor: "#FFA500" }}
                      onClick={() => {
                        searchNavigateFun();
                      }}
                    >
                      <div className="d-flex justify-content-center align-items-center h-full custom-pointer">
                        <FiSearch className="text-white fs-6  " />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" menu-order position-static col-1  col-lg-7 col-md-1 col-sm-2  justify-content-end">

              <div
                className="collapse navbar-collapse justify-content-center"
                id="navbarNav"
              >
                <ul className="navbar-nav d-flex justify-content-between w-100">
                  <li className="nav-item" >
                    <a
                      className="nav-link custom-pointer"
                      style={{ fontSize: "clamp(0.8rem, 0.9vw, 1rem)" }}
                      onClick={() => navigate("/home")}
                    >
                      Home
                    </a>
                  </li>
                  <li className="nav-item"style={{ display: isHidden ? "none" : "" }}>
                    <a
                      className="nav-link custom-pointer"
                      onClick={() => navigate("/about")}
                      style={{ fontSize: "clamp(0.8rem, 0.9vw, 1rem)" }}
                    >
                      About
                    </a>
                  </li>

                  <li className="nav-item custom-pointer cursor-pointer" style={{ display: isHidden ? "none" : "" }}>
                    <a
                      href="/"
                      className="nav-link"
                      style={{ fontSize: "clamp(0.8rem, 0.9vw, 1rem)" }}
                    >
                      Market Place
                    </a>
                  </li>
                  <li className="nav-item custom-pointer cursor-pointer">
                    <a
                      href="/blogs/1"
                      className="nav-link"
                      style={{ fontSize: "clamp(0.8rem, 0.9vw, 1rem)" }}
                    >
                      Blogs
                    </a>
                  </li>
                  <li className="nav-item cursor-pointer">
                    <a
                      href="/elearning"
                      className="nav-link"
                      style={{ fontSize: "clamp(0.8rem, 0.9vw, 1rem)" }}
                    >
                      E-Learning
                    </a>
                  </li>
                  <li className="nav-item cursor-pointer">
                    <a
                      href="/contactus"
                      className="nav-link"
                      style={{ fontSize: "clamp(0.8rem, 0.9vw, 1rem)" }}
                    >
                      Contact
                    </a>
                  </li>


                  {/* <li className="d-flex justify-content-center align-items-center custom-pointer">
                    <Dropdown menu={menu} trigger={["click"]}>
                      <a
                        onClick={(e) => e.preventDefault()}
                        style={{ textDecoration: "none" }}
                      >
                        <Space
                          className="fw-600 text-black px-0"
                          style={{ fontSize: "1rem" }}
                        >
                          <span>
                            {selectedItem
                              ? selectedItem.label
                              : "Select an item"}
                            <DownOutlined />
                          </span>
                        </Space>
                      </a>
                    </Dropdown>
                  </li> */}
                  {isTokenValid() && (
                    <div
                      className="d-flex gap-2 align-items-center fw-600 text-black custom-pointer"
                      onClick={() => navigate("/profile/mywishlist")}
                      style={{ fontSize: "clamp(0.8rem, 0.9vw, 1rem)" }}
                    >

                      Favourites
                    </div>
                  )}
                  {isTokenValid() ? (
                    <div
                      className="d-flex gap-2 align-items-center fw-600 text-black custom-pointer"
                      onClick={() => navigate("/profile/myprofile")}
                      style={{ fontSize: "clamp(0.8rem, 0.9vw, 1rem)" }}
                    >
                      <FiUser style={{ color: "#FFA500" }} />
                      Profile
                    </div>
                  ) : (
                    <div
                      className="d-flex gap-2 align-items-center fw-600 text-black custom-pointer"
                      onClick={() => navigate("/signin")}
                      style={{ fontSize: "clamp(0.8rem, 0.9vw, 1rem)" }}
                    >
                      <FiUser style={{ color: "#FFA500" }} />
                      Sign In
                    </div>
                  )}
                  {isTokenValid() && (<li
                    className="d-flex gap-2 align-items-center fw-600 text-black custom-pointer"
                    style={{ fontSize: "clamp(0.8rem, 0.9vw, 1rem)" }}
                    onClick={() => navigate("/cart")}
                  >
                    <FiShoppingCart style={{ color: "#FFA500" }} />
                    Cart
                  </li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* {openNav && (
          <Fade duration={800} delay={200} cascade damping={0.1}>
            <div
              className="absolute navbar-collapse justify-content-center"
              id="navbarNav"
            >
              <Slide
                direction="down"
                duration={800}
                delay={200}
                cascade
                damping={0.1}
              >
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a
                      className="nav-link custom-pointer"
                      onClick={() => navigate("/")}
                    >
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link custom-pointer"
                      onClick={() => navigate("/about")}
                    >
                      About
                    </a>
                  </li>
                
                  <li className="nav-item custom-pointer cursor-pointer">
                    <a href="/products" className="nav-link">
                      Products
                    </a>
                  </li>
                  <li className="nav-item cursor-pointer">
                    <a href="/contactus" className="nav-link">
                      Contact
                    </a>
                  </li>
                  <li className="nav-item cursor-pointer">
                    <a className="nav-link">Login</a>
                  </li>
                  <li className=" nav-item cursor-pointer d-flex">
                    <a className="nav-link" onClick={() => navigate("/cart")}>
                      Cart
                    </a>
                  
                  </li>
                </ul>
              </Slide>
            </div>
          </Fade>
        )} */}
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
        <div className="mobile-only  py-2">
          <div className="position-relative w-full rounded overflow-hidden">
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
          <li className="menu-item font-noto" onClick={() => navigate("/home")} >Home</li>
          <li className="menu-item font-noto" onClick={() => navigate("/about")}>About us</li>
          <li className="menu-item font-noto" onClick={() => navigate("/blogs/1")} >Blogs</li>
            <li className="menu-item font-noto" onClick={() => navigate("/elearning")} >E-Learning</li>
          <li className="menu-item font-noto" onClick={() => navigate("/contactus")} >Contact</li>
          {isTokenValid() ? (
            <>
              <li className="menu-item font-noto" onClick={() => navigate("/profile/myprofile")} ><span><FiUser style={{ color: "#FFA500" }} />  Profile</span></li>
            </>
          ) : (
            <> <li className="menu-item font-noto" onClick={() => navigate("/signin")} ><span><FiUser style={{ color: "#FFA500" }} />  Sign in</span></li></>
          )}
          <li className="menu-item font-noto" onClick={() => navigate("/")} > Marketplace</li>
          {/* {homeData?.main_categories?.map((cat) => (
            <li
              key={cat.id}
              onClick={() => setActiveCategory(cat)}
              className="menu-item font-noto"
            >
              {cat.name}
              <i className="fa-solid fa-arrow-right submenu-icon"></i>
            </li>
          ))} */}


        </ul>
      </div>

      {/* Subcategory Panel */}
      {/* <div className={`side-submenu ${activeCategory ? 'open' : ''}`}>
        {activeCategory && (
          <>
            <button className="back-btn" onClick={() => setActiveCategory(null)}>
              <i className="fa-solid fa-arrow-right back-icon rotated"></i> Back
            </button>
            <h3 >{activeCategory.name}</h3>
            <ul className="sub-menu-list">
              {activeCategory.sub_categories?.map((sub) => (
                <li
                  key={sub.id}
                  className="menu-item font-noto"
                  onClick={() => setActiveSubCategory(sub)}
                >
                  {sub.name}
                </li>
              ))}
            </ul>
          </>
        )}
      </div> */}

      {/* Child Category Panel */}
      {/* <div className={`side-submenu ${activeSubCategory ? 'open' : ''}`}>
        {activeSubCategory && (
          <>
            <button className="back-btn" onClick={() => setActiveSubCategory(null)}>
              <i className="fa-solid fa-arrow-right back-icon rotated"></i> Back
            </button>
            <h3 >{activeSubCategory.name}</h3>
            <ul className="sub-menu-list">
              {activeSubCategory.child_categories?.map((child) => (
                <li key={child.id} className="menu-item font-noto" onClick={() => handleChildCategoryClick(activeCategory.id, activeSubCategory.id, child.id)}>
                  {child.name}
                </li>
              ))}
            </ul>
          </>
        )}
      </div> */}
      {/* end navigation */}
    </header>
  );
}
