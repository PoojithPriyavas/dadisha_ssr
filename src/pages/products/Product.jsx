import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import SecondaryHeader from '../../components/SecondaryHeader';
import { Fade, Slide } from "react-awesome-reveal";
import { FiSearch } from "react-icons/fi";
import CategorySlider from "./category/CategorySlider";
import BannerSlider from "./banner/BannerSlider";
import BottomBanner from "./banner/BottomBanner";
import TrendingSerach from "./TrendingSerach";
import ProductFooter from "./ProductFooter";
import FirstProductSlider from "./FirstProductSlider";
import SecondProductSlider from "./SecondProductSlider";
import CatDropDown from "../../components/categorydropdown/CatDropDown";
import { Context } from "../../context/context";
import axios from "../../utilities/customAxios.js";
import QHSEProductsSection from "./QHSEProductsSection.jsx";
import InfoCard from "../../components/InfoCard.jsx";
import TrendingProducts from "./TrendingProducts.jsx";
import { useNavigate } from "react-router-dom";

export default function Product() {
  const [expandedCategories, setExpandedCategories] = useState({ 1: true });
  const navigate = useNavigate();
  const toggleCategory = (categoryId) => {
    setExpandedCategories((prevState) => ({
      ...prevState,
      [categoryId]: !prevState[categoryId],
    }));
  };

  const {
    homeData,
    gethomeData,
    getTrendingProducts,
    trendingPrdData,
    weaklyPrdData,
    weeklyLoading,
    getWeaklyPrdData,
    qhseTagPrdData,
    qhseLoading,
    getQhseTagPrdData,
    trendingSearch,
    trendingLoading,
    loading
  } = useContext(Context);

  useEffect(() => {
    gethomeData();
    getWeaklyPrdData();
    getQhseTagPrdData();
    getTrendingProducts();
  }, []);
  // ----------to saerch navigate----------
  const [searchValue, setSearchValue] = useState("");
  const searchNavigateFun = () => {
    navigate(`/categoryfilter?search=${searchValue}`);
  };


  const hasAdditionalBanners = homeData?.additional_banners?.length > 1;
  console.log(homeData?.additional_banners, "hasAdditionalBanners");
  const orderByOneBanners = homeData?.additional_banners?.filter(banner => banner.placing === "Option 1") || [];




  console.log(orderByOneBanners, "orderByOneBanner");



  return (
    <div>
      {/* <Header /> */}
      <SecondaryHeader />
      <div style={{ position: 'relative', zIndex: 1, marginTop: '100px' }}>
        <BannerSlider homeData={homeData} />
      </div>
      <InfoCard />
      <div className="container mx-auto  prd-top ">

        <div
          className="d-flex  rounded "
        // style={{ border: "1px solid #F3F4F6" }}
        >

        </div>

        <CategorySlider />
        {/* ---------------------banner slider------------------- */}

        {/* ---------------------banner slider------------------- */}
        {/* ----------Best Weekly Deals------------------- */}
        <SecondProductSlider loading={weeklyLoading} weaklyPrdData={weaklyPrdData} homeData={orderByOneBanners} />
        {/* ----------Best Weekly Deals------------------- */}

        <TrendingSerach trendingSearch={trendingSearch} homeData={homeData} />
        <QHSEProductsSection loading={qhseLoading} qhseTagPrdData={qhseTagPrdData} homeData={homeData} />
        {/* <InfoCard />  */}

        <TrendingProducts loading={trendingLoading} trendingPrdData={trendingPrdData} homeData={homeData} />
      </div>
      <ProductFooter />
    </div>
  );
}
