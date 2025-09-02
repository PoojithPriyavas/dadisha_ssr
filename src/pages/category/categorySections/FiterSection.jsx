import { useContext, useEffect, useState } from "react";
import { MdFilterListOff } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { TbFilterOff } from "react-icons/tb";
import { Rate } from "antd";
import { Accordion } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../../utilities/customAxios.js";
import ProductCardImageSliderFilter from "../../products/ProductCardImageSliderFilter.jsx";
import "./category.css";
import { Context } from "../../../context/context";
import { isTokenValid } from "../../../utilities/index.js";
import { toast } from "react-toastify";
import { IoMdStar } from "react-icons/io";
import { Modal } from "antd";
import { motion } from "framer-motion";


export default function FilterSection() {
  const { selectedCurrency, gethomeData, homeData } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get("search");
  const [productResult, setProductResult] = useState([]);
  const [productTotalCount, setProductTotalCount] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedChildCategories, setSelectedChildCategories] = useState([]);
  const [filterIsHidden, setFilterIsHidden] = useState(false);
  const [mainCategories, setMainCategories] = useState([]);
  const [minPriceINR, setMinPriceINR] = useState("");
  const [maxPriceINR, setMaxPriceINR] = useState("");
  const [minPriceUSD, setMinPriceUSD] = useState("");
  const [maxPriceUSD, setMaxPriceUSD] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [selectedOtherOption, setSelectedOtherOption] = useState("");
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null,
    currentPage: 1
  });
  const [isLoading, setIsLoading] = useState(false);
  const [availableStandards, setAvailableStandards] = useState([]);
  const [availableIndustrys, setAvailableIndustrys] = useState([]);

  const [selectedStandards, setSelectedStandards] = useState([]);
  const [selectedIndustrys, setSelectedIndustrys] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);


  console.log(productResult, "pr result")
  const showFilterModal = () => {
    setIsFilterModalVisible(true);
  };

  const handleFilterModalCancel = () => {
    console.log("calls cancel button")
    setIsFilterModalVisible(false);
  };

  useEffect(() => {
    gethomeData();
  }, []);

  useEffect(() => {
    setMainCategories(homeData?.main_categories);
  }, [homeData]);
  
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const res = await axios.get('/disha/filter-product-by-all', {
          params: {
            page_size: 30
          }
        });
        setAvailableStandards(res.data.standards || []);
        setAvailableIndustrys(res.data.industrys || []);
      } catch (error) {
        console.error("Error fetching filter options", error);
        setAvailableStandards([]);
        setAvailableIndustrys([]);
      }
    };

    fetchFilterOptions();
  }, []);

  const getProductResult = async (url = null, pageNumber = null, extraFilters = {}) => {
    setIsLoading(true);
    try {
      let result;

      if (url) {
        // 🔥 Use URL as-is; don't add params again
        const formData = new FormData();
        formData.append('page_size', 30);
        result = await axios.post(url, formData);
      } else {
        // Build query string with filters
        const params = new URLSearchParams({
          ...(searchValue && { search_query: searchValue }),
          ...(selectedCategory && { main_category_id: selectedCategory }),
          ...(selectedSubCategories.length > 0 && { sub_category_ids: selectedSubCategories.join(',') }),
          ...(selectedChildCategories.length > 0 && { child_category_ids: selectedChildCategories.join(',') }),
          ...(minPriceINR && { min_price_filter_in_inr: minPriceINR }),
          ...(maxPriceINR && { max_price_filter_in_inr: maxPriceINR }),
          ...(minPriceUSD && { min_price_filter_in_dollar: minPriceUSD }),
          ...(maxPriceUSD && { max_price_filter_in_dollar: maxPriceUSD }),
          ...(sortBy && { sort_by: sortBy }),
          ...(ratingFilter && { rating_filter: ratingFilter }),
          ...(selectedOtherOption === "dadisha_assured" && { dadisha_assured: "Dadisha Assured" }),
          ...(selectedOtherOption === "weekly_deals" && { weekly_deals: "Weekly Deals" }),
          ...(selectedOtherOption === "trending_products" && { trending_products: "Trending Products" }),
          ...(selectedStandards.length > 0 && { standards: selectedStandards.join(',') }),
          ...(selectedIndustrys.length > 0 && { industrys: selectedIndustrys.join(',') }),
          ...(pageNumber && { page: pageNumber }),
          ...extraFilters
        });

        const fullUrl = `/disha/filter-product-by-all?${params.toString()}`;
        const formData = new FormData();
        formData.append('page_size', 30);
        result = await axios.post(fullUrl, formData);
      }

      // Add null checks to prevent map errors
      setProductResult(result.data.results || []);
      setProductTotalCount(result.data.count || 0);
      setPagination(prev => ({
        count: result.data.count || 0,
        next: result.data.next || null,
        previous: result.data.previous || null,
        currentPage: pageNumber ||
          (url ? (url.includes('page=') ? parseInt(new URL(url).searchParams.get('page')) :
            (url === result.data.next ? prev.currentPage + 1 : prev.currentPage - 1)) : 1)
      }));

    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };



  // Helper function to handle API response
  const handleResponse = (result, pageNumber) => {
    // Add null checks to prevent map errors
    setProductResult(result.data.results || []);
    setPagination({
      count: result.data.count || 0,
      next: result.data.next || null,
      previous: result.data.previous || null,
      currentPage: pageNumber || 1
    });
  };

  const getStandardIdsFromNames = (names) => {
    if (!names || !availableStandards.length) return [];
    return names.split(',')
      .map(name => availableStandards.find(s => s.name.toLowerCase() === name.toLowerCase())?.id)
      .filter(id => id !== undefined);
  };

  const getIndustryIdsFromNames = (names) => {
    if (!names || !availableIndustrys.length) return [];
    return names.split(',')
      .map(name => availableIndustrys.find(i => i.name.toLowerCase() === name.toLowerCase())?.id)
      .filter(id => id !== undefined);
  };

  useEffect(() => {
    if (!mainCategories || mainCategories.length === 0) return;

    const loadFromURL = async () => {
      const pageFromURL = parseInt(searchParams.get("page")) || 1;
      const mainCategoryId = searchParams.get("maincategoryid");

      if (mainCategoryId) {
        const categoryExists = mainCategories.some(cat => cat.id.toString() === mainCategoryId);
        if (categoryExists) {
          setSelectedCategory(mainCategoryId);
        }
      }

      const standardsFromURL = searchParams.get("standards");
      const industrysFromURL = searchParams.get("industrys");

      const standardIds = standardsFromURL ? getStandardIdsFromNames(standardsFromURL) : [];
      const industryIds = industrysFromURL ? getIndustryIdsFromNames(industrysFromURL) : [];

      if (standardIds.length > 0) setSelectedStandards(standardIds);
      if (industryIds.length > 0) setSelectedIndustrys(industryIds);

      const params = new URLSearchParams({
        ...(searchValue && { search_query: searchValue }),
        ...(mainCategoryId && { main_category_id: mainCategoryId }),
        ...(selectedSubCategories.length > 0 && { sub_category_ids: selectedSubCategories.join(',') }),
        ...(selectedChildCategories.length > 0 && { child_category_ids: selectedChildCategories.join(',') }),
        ...(minPriceINR && { min_price_filter_in_inr: minPriceINR }),
        ...(maxPriceINR && { max_price_filter_in_inr: maxPriceINR }),
        ...(minPriceUSD && { min_price_filter_in_dollar: minPriceUSD }),
        ...(maxPriceUSD && { max_price_filter_in_dollar: maxPriceUSD }),
        ...(sortBy && { sort_by: sortBy }),
        ...(ratingFilter && { rating_filter: ratingFilter }),
        ...(selectedOtherOption === "dadisha_assured" && { dadisha_assured: "Dadisha Assured" }),
        ...(selectedOtherOption === "weekly_deals" && { weekly_deals: "Weekly Deals" }),
        ...(selectedOtherOption === "trending_products" && { trending_products: "Trending Products" }),
        ...(standardIds.length > 0 && { standards: standardIds.join(',') }),
        ...(industryIds.length > 0 && { industrys: industryIds.join(',') }),
        page: pageFromURL
      });

      const url = `/disha/filter-product-by-all?${params.toString()}`;
      await getProductResult(url, pageFromURL);
      setIsInitialLoad(false);
    };

    loadFromURL();
  }, [mainCategories, location.search, availableStandards, availableIndustrys]);



  useEffect(() => {
    if (isInitialLoad) return;

    updateURL(
      selectedCategory,
      selectedSubCategories,
      selectedChildCategories,
      selectedCurrency === "INR" ? minPriceINR : minPriceUSD,
      selectedCurrency === "INR" ? maxPriceINR : maxPriceUSD,
      selectedCurrency,
      searchValue,
      sortBy,
      ratingFilter,
      selectedOtherOption,
      selectedStandards,
      selectedIndustrys
    );
  }, [selectedStandards, selectedIndustrys]);
  useEffect(() => {
    if (initialLoadComplete) {
      getProductResult();
    }
  }, [
    initialLoadComplete,
    selectedCategory,
    selectedSubCategories,
    selectedChildCategories,
    searchValue,
    minPriceINR,
    maxPriceINR,
    minPriceUSD,
    maxPriceUSD,
    sortBy,
    ratingFilter
  ]);

  const updateURL = (
    mainCatId,
    subCatIds,
    childCatIds,
    minPrice,
    maxPrice,
    currency,
    searchQuery,
    sortBy,
    ratingFilter,
    selectedOtherOption,
    standards = [],
    industrys = []
  ) => {
    const newSearchParams = new URLSearchParams(location.search);

    // Handle main category
    if (mainCatId) {
      newSearchParams.set("maincategoryid", mainCatId.toString());
    } else {
      newSearchParams.delete("maincategoryid");
    }

    // Handle sub categories
    if (subCatIds?.length > 0) {
      newSearchParams.set("subcategoryids", subCatIds.join(","));
    } else {
      newSearchParams.delete("subcategoryids");
    }

    // Handle child categories
    if (childCatIds?.length > 0) {
      newSearchParams.set("childcategoryids", childCatIds.join(","));
    } else {
      newSearchParams.delete("childcategoryids");
    }

    // Handle price filters - only set if values exist
    if (currency === "INR") {
      if (minPrice && minPrice !== "") {
        newSearchParams.set("min_price_filter_in_inr", minPrice);
      } else {
        newSearchParams.delete("min_price_filter_in_inr");
      }

      if (maxPrice && maxPrice !== "") {
        newSearchParams.set("max_price_filter_in_inr", maxPrice);
      } else {
        newSearchParams.delete("max_price_filter_in_inr");
      }
      // Clear USD params when using INR
      newSearchParams.delete("min_price_filter_in_dollar");
      newSearchParams.delete("max_price_filter_in_dollar");
    } else if (currency === "USD") {
      if (minPrice && minPrice !== "") {
        newSearchParams.set("min_price_filter_in_dollar", minPrice);
      } else {
        newSearchParams.delete("min_price_filter_in_dollar");
      }

      if (maxPrice && maxPrice !== "") {
        newSearchParams.set("max_price_filter_in_dollar", maxPrice);
      } else {
        newSearchParams.delete("max_price_filter_in_dollar");
      }
      // Clear INR params when using USD
      newSearchParams.delete("min_price_filter_in_inr");
      newSearchParams.delete("max_price_filter_in_inr");
    }

    // Handle search query
    if (searchQuery) {
      newSearchParams.set("search", searchQuery);
    } else {
      newSearchParams.delete("search");
    }

    // Handle sort by
    if (sortBy) {
      newSearchParams.set("sort_by", sortBy);
    } else {
      newSearchParams.delete("sort_by");
    }

    // Handle rating filter
    if (ratingFilter) {
      newSearchParams.set("rating_filter", ratingFilter);
    } else {
      newSearchParams.delete("rating_filter");
    }

    // Handle other options
    if (selectedOtherOption) {
      newSearchParams.set("other_option", selectedOtherOption);
    } else {
      newSearchParams.delete("other_option");
    }

    if (standards?.length > 0 && availableStandards?.length > 0) {
      const standardNames = standards.map(id => {
        const standard = availableStandards.find(s => s.id === id);
        return standard ? standard.name.toLowerCase() : '';
      }).filter(name => name !== '');

      if (standardNames.length > 0) {
        newSearchParams.set("standards", standardNames.join(","));
      } else {
        newSearchParams.delete("standards");
      }
    } else {
      newSearchParams.delete("standards");
    }

    // Handle industrys - use names instead of IDs
    if (industrys?.length > 0 && availableIndustrys?.length > 0) {
      const industryNames = industrys.map(id => {
        const industry = availableIndustrys.find(i => i.id === id);
        return industry ? industry.name.toLowerCase() : '';
      }).filter(name => name !== '');

      if (industryNames.length > 0) {
        newSearchParams.set("industrys", industryNames.join(","));
      } else {
        newSearchParams.delete("industrys");
      }
    } else {
      newSearchParams.delete("industrys");
    }

    navigate(`?${newSearchParams.toString()}`);
  };
  const handleNextPage = () => {
    if (pagination.next) {
      const nextPage = pagination.currentPage + 1;
      getProductResult(pagination.next, nextPage);
    }
  };

  const handlePrevPage = () => {
    if (pagination.previous) {
      const prevPage = pagination.currentPage - 1;
      getProductResult(pagination.previous, prevPage);
    }
  };


  const handlePageChange = (pageNumber) => {
    const baseUrl = "/disha/filter-product-by-all";

    const params = new URLSearchParams({
      ...(searchValue && { search_query: searchValue }),
      ...(selectedCategory && { main_category_id: selectedCategory }),
      ...(selectedSubCategories.length > 0 && { sub_category_ids: selectedSubCategories.join(',') }),
      ...(selectedChildCategories.length > 0 && { child_category_ids: selectedChildCategories.join(',') }),
      ...(minPriceINR && { min_price_filter_in_inr: minPriceINR }),
      ...(maxPriceINR && { max_price_filter_in_inr: maxPriceINR }),
      ...(minPriceUSD && { min_price_filter_in_dollar: minPriceUSD }),
      ...(maxPriceUSD && { max_price_filter_in_dollar: maxPriceUSD }),
      ...(sortBy && { sort_by: sortBy }),
      ...(ratingFilter && { rating_filter: ratingFilter }),
      ...(selectedOtherOption === "dadisha_assured" && { dadisha_assured: "Dadisha Assured" }),
      ...(selectedOtherOption === "weekly_deals" && { weekly_deals: "Weekly Deals" }),
      ...(selectedOtherOption === "trending_products" && { trending_products: "Trending Products" }),
      ...(selectedStandards.length > 0 && { standards: selectedStandards.join(',') }),
      ...(selectedIndustrys.length > 0 && { industrys: selectedIndustrys.join(',') }),
      page: pageNumber
    });

    const urlWithParams = `${baseUrl}?${params.toString()}`;
    getProductResult(urlWithParams, pageNumber);
  };





  const Pagination = ({
    currentPage,
    totalItems,
    itemsPerPage,
    onNext,
    onPrev,
    onPageChange,
    scrollTarget = "top" // "top" for page top, or provide a ref/selector
  }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const visiblePages = 5;
    let startPage, endPage;

    // Scroll to top function
    const scrollToTop = () => {
      if (scrollTarget === "top") {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (typeof scrollTarget === 'string') {
        // If scrollTarget is a selector string
        const element = document.querySelector(scrollTarget);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (scrollTarget?.current) {
        // If scrollTarget is a React ref
        scrollTarget.current.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // Wrapper functions that include scroll functionality
    const handleNext = () => {
      onNext();
      scrollToTop();
    };

    const handlePrev = () => {
      onPrev();
      scrollToTop();
    };

    const handlePageChange = (page) => {
      onPageChange(page);
      scrollToTop();
    };

    if (totalPages <= visiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const maxPagesBeforeCurrent = Math.floor(visiblePages / 2);
      const maxPagesAfterCurrent = Math.ceil(visiblePages / 2) - 1;

      if (currentPage <= maxPagesBeforeCurrent) {
        startPage = 1;
        endPage = visiblePages;
      } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
        startPage = totalPages - visiblePages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrent;
        endPage = currentPage + maxPagesAfterCurrent;
      }
    }

    return (
      <div className="pagination-controls">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="pagination-arrow"
        >
          &lt;
        </button>

        {startPage > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className={`page-btn ${currentPage === 1 ? 'active' : ''}`}
            >
              1
            </button>
            {startPage > 2 && <span className="pagination-ellipsis">...</span>}
          </>
        )}

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
          const pageNum = startPage + i;
          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
            >
              {pageNum}
            </button>
          );
        })}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="pagination-ellipsis">...</span>}
            <button
              onClick={() => handlePageChange(totalPages)}
              className={`page-btn ${currentPage === totalPages ? 'active' : ''}`}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="pagination-arrow"
        >
          &gt;
        </button>
      </div>
    );
  };

  const handleMinPriceChange = (e, currency) => {
    const value = e.target.value;
    if (currency === "INR") {
      setMinPriceINR(value);
      updateURL(
        selectedCategory,
        selectedSubCategories,
        selectedChildCategories,
        value,
        maxPriceINR,
        currency,
        searchValue,
        sortBy,
        ratingFilter
      );
    } else if (currency === "USD") {
      setMinPriceUSD(value);
      updateURL(
        selectedCategory,
        selectedSubCategories,
        selectedChildCategories,
        value,
        maxPriceUSD,
        currency,
        searchValue,
        sortBy,
        ratingFilter
      );
    }
  };

  const handleMaxPriceChange = (e, currency) => {
    const value = e.target.value;
    if (currency === "INR") {
      setMaxPriceINR(value);
      updateURL(
        selectedCategory,
        selectedSubCategories,
        selectedChildCategories,
        minPriceINR,
        value,
        currency,
        searchValue,
        sortBy,
        ratingFilter
      );
    } else if (currency === "USD") {
      setMaxPriceUSD(value);
      updateURL(
        selectedCategory,
        selectedSubCategories,
        selectedChildCategories,
        minPriceUSD,
        value,
        currency,
        searchValue,
        sortBy,
        ratingFilter
      );
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubCategories([]);
    setSelectedChildCategories([]);
    updateURL(
      categoryId,
      [],
      [],
      null,
      null,
      selectedCurrency,
      searchValue,
      sortBy,
      ratingFilter
    );
  };

  const handleSubCategoryChange = (subCategoryId) => {
    const updatedSubCategories = selectedSubCategories.includes(subCategoryId)
      ? selectedSubCategories.filter((id) => id !== subCategoryId)
      : [...selectedSubCategories, subCategoryId];

    setSelectedSubCategories(updatedSubCategories);
    updateURL(
      selectedCategory,
      updatedSubCategories,
      selectedChildCategories,
      null,
      null,
      selectedCurrency,
      searchValue,
      sortBy,
      ratingFilter
    );
  };

  const handleChildCategoryChange = (childCategoryId) => {
    const updatedChildCategories = selectedChildCategories.includes(
      childCategoryId
    )
      ? selectedChildCategories.filter((id) => id !== childCategoryId)
      : [...selectedChildCategories, childCategoryId];

    setSelectedChildCategories(updatedChildCategories);
    updateURL(
      selectedCategory,
      selectedSubCategories,
      updatedChildCategories,
      null,
      null,
      selectedCurrency,
      searchValue,
      sortBy,
      ratingFilter
    );
  };

  const handleSearchChange = (value) => {
    const newSearchParams = new URLSearchParams(location.search);
    if (value) {
      newSearchParams.set("search", value);
    } else {
      newSearchParams.delete("search");
    }
    navigate(`?${newSearchParams.toString()}`);
  };

  const handleSortByChange = (value) => {
    setSortBy(value);
    updateURL(
      selectedCategory,
      selectedSubCategories,
      selectedChildCategories,
      selectedCurrency === "INR" ? minPriceINR : minPriceUSD,
      selectedCurrency === "INR" ? maxPriceINR : maxPriceUSD,
      selectedCurrency,
      searchValue,
      value,
      ratingFilter
    );
  };

  const handleRatingFilterChange = (value) => {
    setRatingFilter(value);
    updateURL(
      selectedCategory,
      selectedSubCategories,
      selectedChildCategories,
      selectedCurrency === "INR" ? minPriceINR : minPriceUSD,
      selectedCurrency === "INR" ? maxPriceINR : maxPriceUSD,
      selectedCurrency,
      searchValue,
      sortBy,
      value
    );
  };

  const handleResetFilters = (e) => {
    console.log("reset function called")
    e.stopPropagation();
    e.preventDefault();
    setSelectedCategory(null);
    setSelectedSubCategories([]);
    setSelectedChildCategories([]);
    setMinPriceINR("");
    setMaxPriceINR("");
    setMinPriceUSD("");
    setMaxPriceUSD("");
    // setSearchValue('');
    setSortBy("");
    setRatingFilter("");
    setSelectedOtherOption("");
    setSelectedIndustrys([]);
    setSelectedStandards([]);

    const newSearchParams = new URLSearchParams();
    navigate(`?${newSearchParams.toString()}`);
  };

  const addToWishlist = async (slug) => {
    try {
      const response = await axios.post("/disha/add-to-wishlist", {
        product_slug: slug,
      });

      // Check the response data for the message
      if (response.data.message) {
        getProductResult();
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Failed Product updated to wishlist");
      console.error("Error Product updated to wishlist:", error);
    }
  };

  const handleStandardChange = (standardId) => {
    const updated = selectedStandards.includes(standardId)
      ? selectedStandards.filter((id) => id !== standardId)
      : [...selectedStandards, standardId];

    setSelectedStandards(updated);

    // Debounce the API call
    const timer = setTimeout(() => {
      getProductResult(null, 1, {
        standards: updated,
        industrys: selectedIndustrys
      });
    }, 300);

    return () => clearTimeout(timer);
  };

  // Handler for industry changes with debouncing
  const handleIndustryChange = (industryId) => {
    const updated = selectedIndustrys.includes(industryId)
      ? selectedIndustrys.filter((id) => id !== industryId)
      : [...selectedIndustrys, industryId];

    setSelectedIndustrys(updated);

    // Debounce the API call
    const timer = setTimeout(() => {
      getProductResult(null, 1, {
        standards: selectedStandards,
        industrys: updated
      });
    }, 300);

    return () => clearTimeout(timer);
  };

  return (
    <>
      <div className="row mt-4 mb-4 ">
        <div
          className={`col-12 col-md-5 col-lg-3 ${!filterIsHidden ? "mb-4" : ""} `}
        >
          {!filterIsHidden && (
            <div className="d-flex gap-4 mb-6">
              {/* Desktop Button (toggle filter panel) */}
              <button
                className="desktop-only rounded bg-white p-1 w-100 mb-0 custom-pointer"
                onClick={() => setFilterIsHidden(!filterIsHidden)}
                style={{ border: "1px solid #D9D9D9", fontSize: "14px" }}
              >
                <span className="me-4">
                  <MdFilterListOff />
                </span>
                Hide Filters
              </button>

              {/* Mobile Button (show modal) */}
              <button
                className="mobile-only rounded bg-white p-1 w-100 mb-0 custom-pointer"
                onClick={showFilterModal}
                style={{ border: "1px solid #D9D9D9", fontSize: "14px" }}
              >
                <span className="me-4">
                  <MdFilterListOff />
                </span>
                Show Filters
              </button>

              {/* Reset Button (same for all devices) */}
              <button
                className="rounded bg-white p-1 custom-pointer d-flex align-items-center justify-content-center w-100"
                onClick={handleResetFilters}
                style={{
                  border: "1px solid #D9D9D9",
                  minWidth: "100px",
                  fontSize: "14px",
                }}
              >
                <span className="me-2">
                  <TbFilterOff />
                </span>
                Reset
              </button>
            </div>
          )}

          {/* <button
            className="d-md-none btn btn-outline-secondary w-100 mb-3"
            onClick={showFilterModal}
          >
            Open Filters
          </button> */}
          <div
            className={`mt-4 rounded p-6 ${filterIsHidden ? "d-none" : "d-none d-md-block"}`}
            style={{ border: "1px solid #D9D9D9" }}
          >
            <div style={{ borderBottom: "1px solid #E1E1E1" }} className="pb-6">
              <input
                type="text"
                placeholder="Search products..."
                value={searchValue || ""}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="rounded bg-white p-2 w-100 mb-2"
                style={{ border: "1px solid #D9D9D9" }}
              />
              <div className="">
                <h1
                  className="font-semibold fs-6 mb-0"
                  style={{ lineHeight: "3rem" }}
                >
                  Price Range
                </h1>
                <div className="mt-0 d-flex">
                  <button
                    className="p-2 text-center border-none"
                    style={{ backgroundColor: "#E1E1E1", width: "5rem" }}
                  >
                    {selectedCurrency === "INR" ? "INR" : "USD"}
                  </button>
                  <input
                    className="rounded-none"
                    placeholder="Minimum price"
                    style={{ padding: "2px 25px" }}
                    value={selectedCurrency === "INR" ? minPriceINR : minPriceUSD}
                    onChange={(e) => handleMinPriceChange(e, selectedCurrency)}
                  />
                </div>
                <div className="mt-4 d-flex">
                  <button
                    className="p-2 text-center border-none"
                    style={{ backgroundColor: "#E1E1E1", width: "5rem" }}
                  >
                    {selectedCurrency === "INR" ? "INR" : "USD"}
                  </button>
                  <input
                    className="rounded-none"
                    placeholder="Maximum price"
                    style={{ padding: "2px 25px" }}
                    value={selectedCurrency === "INR" ? maxPriceINR : maxPriceUSD}
                    onChange={(e) => handleMaxPriceChange(e, selectedCurrency)}
                  />
                </div>
              </div>
            </div>
            <div style={{ borderBottom: "1px solid #E1E1E1" }} className="pb-6">
              <div className="">
                <h1
                  className="font-semibold fs-6 mb-0"
                  style={{ lineHeight: "3rem" }}
                >
                  Sort By
                </h1>
                <div className="d-flex flex-column gap-2">
                  <div className="mt-0 d-flex gap-2 align-items-center">
                    <input
                      type="radio"
                      name="sort"
                      value="low_to_high_price"
                      checked={sortBy === "low_to_high_price"}
                      onChange={() => handleSortByChange("low_to_high_price")}
                      style={{ width: "12px", height: "12px" }}
                    />
                    <label> Price - Low to High</label>
                  </div>
                  <div className="mt-0 d-flex gap-2 align-items-center">
                    <input
                      type="radio"
                      name="sort"
                      value="high_to_low_price"
                      checked={sortBy === "high_to_low_price"}
                      onChange={() => handleSortByChange("high_to_low_price")}
                      style={{ width: "12px", height: "12px" }}
                    />
                    <label> Price - High to Low</label>
                  </div>
                  <div className="mt-0 d-flex gap-2 align-items-center">
                    <input
                      type="radio"
                      name="sort"
                      value="popularity"
                      checked={sortBy === "popularity"}
                      onChange={() => handleSortByChange("popularity")}
                      style={{ width: "12px", height: "12px" }}
                    />
                    <label>Popularity</label>
                  </div>
                  <div className="mt-0 d-flex gap-2 align-items-center">
                    <input
                      type="radio"
                      name="sort"
                      value="newest"
                      checked={sortBy === "newest"}
                      onChange={() => handleSortByChange("newest")}
                      style={{ width: "12px", height: "12px" }}
                    />
                    <label>Newest</label>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ borderBottom: "1px solid #E1E1E1" }} className="pb-6">
              <div className="">
                <h1
                  className="font-semibold fs-6 mb-0"
                  style={{ lineHeight: "3rem" }}
                >
                  Rate
                </h1>
                <div className="d-flex flex-column gap-2">
                  <div className="mt-0 d-flex gap-2 align-items-center">
                    <input
                      type="radio"
                      name="rating"
                      value="4"
                      checked={ratingFilter === "4"}
                      onChange={() => handleRatingFilterChange("4")}
                      style={{ width: "12px", height: "12px" }}
                    />
                    <label className="d-flex justify-content-center  align-items-center">
                      4
                      <span>
                        <IoMdStar className="text-p me-1 ms-1" size={18} />
                      </span>{" "}
                      Above
                    </label>
                  </div>
                  <div className="mt-0 d-flex gap-2 align-items-center">
                    <input
                      type="radio"
                      name="rating"
                      value="3"
                      checked={ratingFilter === "3"}
                      onChange={() => handleRatingFilterChange("3")}
                      style={{ width: "12px", height: "12px" }}
                    />
                    <label className="d-flex justify-content-center  align-items-center">
                      3
                      <span>
                        <IoMdStar className="text-p me-1 ms-1" size={18} />
                      </span>{" "}
                      Above
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h1 className="font-semibold fs-6 mt-4 mb-1">Product Categories</h1>
              <Accordion>
                {mainCategories?.map((category, index) => (
                  <Accordion.Item key={category?.id} eventKey={index.toString()}>
                    <Accordion.Header>
                      <input
                        type="radio"
                        className="me-2"
                        style={{ width: "12px", height: "12px" }}
                        checked={selectedCategory === category.id.toString()}
                        onChange={() => handleCategoryChange(category.id)}
                        name="mainCategory"
                      /> {" "}
                      <span style={{ textTransform: "capitalize" }}> {category?.name}</span>
                    </Accordion.Header>
                    <Accordion.Body style={{ padding: "0" }}>
                      <div className="d-flex flex-column gap-2">
                        {category?.sub_categories?.map((sub, subIndex) => (
                          <div key={sub?.id}>
                            <Accordion>
                              <Accordion.Item eventKey={subIndex.toString()}>
                                <Accordion.Header>
                                  <input
                                    type="checkbox"
                                    className="me-2"
                                    style={{ width: "12px", height: "12px" }}
                                    checked={selectedSubCategories.includes(
                                      sub.id
                                    )}
                                    onChange={() =>
                                      handleSubCategoryChange(sub.id)
                                    }
                                  />{" "}
                                  <span style={{ textTransform: "capitalize" }}>{sub.name}</span>
                                </Accordion.Header>
                                <Accordion.Body>
                                  <div className="d-flex flex-column gap-2">
                                    {sub?.child_categories?.map((child) => (
                                      <div
                                        key={child?.id}
                                        className="d-flex gap-2 align-items-center"
                                      >
                                        <input
                                          type="checkbox"
                                          style={{
                                            width: "12px",
                                            height: "12px",
                                          }}
                                          checked={selectedChildCategories.includes(
                                            child.id
                                          )}
                                          onChange={() =>
                                            handleChildCategoryChange(child.id)
                                          }
                                        />
                                        <div style={{ textTransform: "capitalize" }}>{child.name}</div>
                                      </div>
                                    ))}
                                  </div>
                                </Accordion.Body>
                              </Accordion.Item>
                            </Accordion>
                          </div>
                        ))}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>

            <div style={{ borderBottom: "1px solid #E1E1E1" }} className="pb-6">
              <div className="">
                <h1
                  className="font-semibold fs-6 mb-0"
                  style={{ lineHeight: "3rem" }}
                >
                  Others
                </h1>
                <div className="d-flex flex-column gap-2">
                  <div className="mt-0 d-flex gap-2 align-items-center">
                    <input
                      type="radio"
                      name="others"
                      checked={selectedOtherOption === "dadisha_assured"}
                      onChange={() => {
                        const newOption = selectedOtherOption === "dadisha_assured" ? "" : "dadisha_assured";
                        setSelectedOtherOption(newOption);
                        updateURL(
                          selectedCategory,
                          selectedSubCategories,
                          selectedChildCategories,
                          selectedCurrency === "INR" ? minPriceINR : minPriceUSD,
                          selectedCurrency === "INR" ? maxPriceINR : maxPriceUSD,
                          selectedCurrency,
                          searchValue,
                          sortBy,
                          ratingFilter,
                          newOption
                        );
                      }}
                      style={{ width: "12px", height: "12px" }}
                    />
                    <label> Dadisha Assured</label>
                  </div>
                  <div className="mt-0 d-flex gap-2 align-items-center">
                    <input
                      type="radio"
                      name="others"
                      checked={selectedOtherOption === "weekly_deals"}
                      onChange={() => {
                        const newOption = selectedOtherOption === "weekly_deals" ? "" : "weekly_deals";
                        setSelectedOtherOption(newOption);
                        updateURL(
                          selectedCategory,
                          selectedSubCategories,
                          selectedChildCategories,
                          selectedCurrency === "INR" ? minPriceINR : minPriceUSD,
                          selectedCurrency === "INR" ? maxPriceINR : maxPriceUSD,
                          selectedCurrency,
                          searchValue,
                          sortBy,
                          ratingFilter,
                          newOption
                        );
                      }}
                      style={{ width: "12px", height: "12px" }}
                    />
                    <label> Weekly Deals</label>
                  </div>
                  <div className="mt-0 d-flex gap-2 align-items-center">
                    <input
                      type="radio"
                      name="others"
                      checked={selectedOtherOption === "trending_products"}
                      onChange={() => {
                        const newOption = selectedOtherOption === "trending_products" ? "" : "trending_products";
                        setSelectedOtherOption(newOption);
                        updateURL(
                          selectedCategory,
                          selectedSubCategories,
                          selectedChildCategories,
                          selectedCurrency === "INR" ? minPriceINR : minPriceUSD,
                          selectedCurrency === "INR" ? maxPriceINR : maxPriceUSD,
                          selectedCurrency,
                          searchValue,
                          sortBy,
                          ratingFilter,
                          newOption
                        );
                      }}
                      style={{ width: "12px", height: "12px" }}
                    />
                    <label>Trending Products</label>
                  </div>

                </div>
              </div>
            </div>
            {/* STANDARDS FILTER */}
            <div>
              <h1 className="font-semibold fs-6 mt-4 mb-1">Standards</h1>
              <Accordion defaultActiveKey="standards">
                <Accordion.Item eventKey="standards">
                  {/* <Accordion.Header>Choose Standards</Accordion.Header> */}
                  <Accordion.Body>
                    <div className="d-flex flex-column gap-2">
                      {availableStandards.map((standard) => (
                        <div key={standard.id} className="d-flex gap-2 align-items-center">
                          <input
                            type="checkbox"
                            style={{ width: "12px", height: "12px" }}
                            checked={selectedStandards.includes(standard.id)}
                            onChange={() => {
                              const updated = selectedStandards.includes(standard.id)
                                ? selectedStandards.filter((id) => id !== standard.id)
                                : [...selectedStandards, standard.id];
                              setSelectedStandards(updated);
                              getProductResult(null, 1, { standards: updated, industrys: selectedIndustrys });
                            }}

                          />
                          <div style={{ textTransform: "capitalize" }}>{standard.name}</div>
                        </div>
                      ))}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>

            {/* INDUSTRYS FILTER */}
            <div>
              <h1 className="font-semibold fs-6 mt-4 mb-1">Industries</h1>
              <Accordion defaultActiveKey="industrys">
                <Accordion.Item eventKey="industrys">
                  {/* <Accordion.Header>Choose Industrys</Accordion.Header> */}
                  <Accordion.Body>
                    <div className="d-flex flex-column gap-2">
                      {availableIndustrys.map((industry) => (
                        <div key={industry.id} className="d-flex gap-2 align-items-center">
                          <input
                            type="checkbox"
                            style={{ width: "12px", height: "12px" }}
                            checked={selectedIndustrys.includes(industry.id)}
                            onChange={() => {
                              const updated = selectedIndustrys.includes(industry.id)
                                ? selectedIndustrys.filter((id) => id !== industry.id)
                                : [...selectedIndustrys, industry.id];
                              setSelectedIndustrys(updated);
                              getProductResult(null, 1, { standards: selectedStandards, industrys: updated });
                            }}

                          />
                          <div style={{ textTransform: "capitalize" }}>{industry.name}</div>
                        </div>
                      ))}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>

          </div>
        </div>
        <div
          className={`col-12  ${filterIsHidden ? "col-md-12 col-lg-12" : "col-md-7 col-lg-9"
            }`}
        >
          <div className="d-flex gap-4">
            {filterIsHidden && (
              <button
                className="rounded bg-white p-2 whitespace-nowrap  mb-0 custom-pointer px-4"
                onClick={() => setFilterIsHidden(!filterIsHidden)}
                style={{ border: "1px solid #D9D9D9" }}
              >
                <span className="me-4">
                  <MdFilterListOff />
                </span>
                {filterIsHidden ? "Show Filters" : "Hide Filters"}
              </button>
            )}

            <div
              className="rounded p-2 d-flex px-4 justify-content-between"
              style={{
                width: "100%",
                backgroundColor: "#f3f4f6",
              }}
            >
              <p className="mb-0 fs-6">
                Showing all {(productResult?.products || []).length} results
              </p>
              <div className="d-flex gap-4">
                <p className="mb-0 fs-6">Total <span style={{ fontWeight: 600 }}>{productTotalCount}</span> products found</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="row">
              {loading ? (
                // Skeleton loader when data is loading
                Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    className={`col-6 col-sm-6 mb-4 ${filterIsHidden ? " col-md-4 col-lg-4 col-xl-3" : " col-md-6 col-lg-3 col-xl-4"
                      }`}
                  >
                    <div className="product-card rounded-xl overflow-hidden">
                      {/* Image placeholder */}
                      <div className="position-relative">
                        <div className="skeleton-image rounded-xl" style={{ height: "200px", width: "100%" }}></div>
                      </div>

                      <div className="card-body bg-white px-3 pt-2 pb-3">
                        {/* Rating placeholder */}
                        <div className="d-flex align-items-center mb-2">
                          <div className="skeleton-rating" style={{ height: "20px", width: "100px" }}></div>
                        </div>

                        {/* Discount placeholder (only shows sometimes) */}
                        {index % 3 === 0 && (
                          <div className="skeleton-discount mb-1" style={{ height: "20px", width: "60px" }}></div>
                        )}

                        {/* Title placeholder */}
                        <div className="skeleton-title mb-2" style={{ height: "20px", width: "100%" }}></div>
                        <div className="skeleton-title" style={{ height: "20px", width: "80%" }}></div>

                        {/* Price placeholder */}
                        <div className="d-flex justify-content-between align-items-center px-2 mt-3">
                          <div className="d-flex gap-2">
                            <div className="skeleton-price" style={{ height: "24px", width: "60px" }}></div>
                            <div className="skeleton-original-price" style={{ height: "20px", width: "50px" }}></div>
                          </div>
                          <div className="skeleton-wishlist" style={{ height: "24px", width: "24px" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                // Actual product listing when data is loaded
                (productResult?.products || []).map((item, index) => (
                  <div
                    key={index}
                    className={`col-6 col-sm-6 mb-4 ${filterIsHidden ? " col-md-4 col-lg-4 col-xl-3" : " col-md-6 col-lg-3 col-xl-4"
                      }`}
                  >
                    <motion.div
                      className="product-card rounded-xl overflow-hidden"
                      initial={{ opacity: 0, y: 60 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
                      viewport={{ once: true, amount: 0.2 }}
                    >
                      <div
                        className="position-relative custom-pointer"
                        onClick={() => navigate(`/productdetails/${item.slug}`)}
                      >
                        <div className="text-start" style={{ paddingLeft: '10px', position: 'absolute' }}>
                          {item.qhse_product && (
                            <img
                              src="/tags/tag.png"
                              alt="Dadisha Assured"
                              style={{ width: '35px', height: 'auto' }}
                              className="tag-overlay"
                            />
                          )}
                        </div>

                        <ProductCardImageSliderFilter images={item.thumbanil_images} stock={item?.stock} />
                      </div>

                      <div className="card-body bg-white px-3 pt-2 pb-3">
                        <div className="rating d-flex align-items-center mb-2">
                          <Rate allowHalf disabled defaultValue={item?.average_rating} />
                          <span className="ms-2 rating-span">({item?.average_rating})</span>
                        </div>
                        {item?.off > 0 && (
                          <div className="discount-label mb-1">{item?.off}% OFF</div>
                        )}
                        <h6 className="product-title text-truncate-2 mb-2 text-start">{item?.name}</h6>
                        <div className="d-flex justify-content-between align-items-center px-2">
                          <div className="d-flex gap-2 desc-div">
                            <p className="price fw-bold text-dark mb-0">
                              {selectedCurrency === "INR" ? (
                                <>
                                  <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal', color: 'inherit' }}>₹</span>
                                  {item.sale_price}
                                </>
                              ) : (
                                `$${item.sale_price_in_dollar}`
                              )}
                            </p>
                            <p className="text-muted text-decoration-line-through mb-0">
                              {selectedCurrency === "INR" ? (
                                <>
                                  <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal', color: 'inherit' }}>₹</span>
                                  {item.mrp}
                                </>
                              ) : (
                                `$${item.mrp_in_dollar}`
                              )}
                            </p>

                          </div>
                          <div
                            className={`wishlist-section ${item?.wishlist ? "wishlist-active" : "wishlist-inactive"
                              }`}
                          >
                            {isTokenValid() ? (
                              <button
                                className="wishlist-btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addToWishlist(item?.slug);
                                }}
                                style={{ display: 'flex', alignItems: 'center' }}
                              >
                                <img
                                  src={
                                    item?.wishlist
                                      ? "/icons/wishlist-yellow.png"
                                      : "/icons/wishlist.svg"
                                  }
                                  alt="wishlist"
                                  className="wishlist-icon"
                                />
                              </button>
                            ) : (
                              <button className="wishlist-btn" onClick={() => navigate("/signin")}>
                                <img
                                  src="/icons/wishlist.svg"
                                  alt="wishlist"
                                  className="wishlist-icon"
                                />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        {/* Add this where you want the pagination to appear */}
        {pagination.count > 0 && (
          <div className="d-flex justify-content-center mt-4">
            <Pagination
              currentPage={pagination.currentPage}
              totalItems={pagination.count}
              itemsPerPage={30}
              onNext={handleNextPage}
              onPrev={handlePrevPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>


      <Modal
        title={null}
        open={isFilterModalVisible}
        onCancel={handleFilterModalCancel}
        footer={null}
        closable={false}
        centered
        maskClosable
        style={{ top: "auto", padding: 0 }}
        width="100%"
        modalRender={(modal) => (
          <div className="bottom-sheet-wrapper">
            <div className="bottom-sheet-header d-flex justify-content-between align-items-center p-3 border-bottom">
              <h5 className="mb-0">Filters</h5>

              <div className="d-flex gap-3 align-items-center">
                <button
                  className="rounded bg-white p-1 custom-pointer d-flex align-items-center justify-content-center w-100"
                  onClick={(e) => handleResetFilters(e)}
                  style={{
                    border: "1px solid #D9D9D9",
                    minWidth: "100px",
                    fontSize: "14px",
                  }}
                >
                  <span className="me-2">
                    <TbFilterOff />
                  </span>
                  Reset
                </button>

                <button
                  className="btn-close"
                  onClick={handleFilterModalCancel}
                  aria-label="Close"
                ></button>
              </div>
            </div>

            <div className="bottom-sheet-body px-4 pb-4">{modal}</div>
          </div>
        )}
      >
        <div
          className="mt-4 rounded p-3"
          style={{ border: "1px solid #D9D9D9", maxHeight: "60vh", overflowY: "auto" }}
        >
          <div style={{ borderBottom: "1px solid #E1E1E1" }} className="pb-6">
            <input
              type="text"
              placeholder="Search products..."
              value={searchValue || ""}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="rounded bg-white p-2 w-100 mb-2"
              style={{ border: "1px solid #D9D9D9" }}
            />
            <div className="">
              <h1
                className="font-semibold fs-6 mb-0"
                style={{ lineHeight: "3rem" }}
              >
                Price Range
              </h1>
              <div className="mt-0 d-flex">
                <button
                  className="p-2 text-center border-none"
                  style={{ backgroundColor: "#E1E1E1", width: "5rem" }}
                >
                  {selectedCurrency === "INR" ? "INR" : "USD"}
                </button>
                <input
                  className="rounded-none"
                  placeholder="Minimum price"
                  style={{ padding: "2px 25px" }}
                  value={selectedCurrency === "INR" ? minPriceINR : minPriceUSD}
                  onChange={(e) => handleMinPriceChange(e, selectedCurrency)}
                />
              </div>
              <div className="mt-4 d-flex">
                <button
                  className="p-2 text-center border-none"
                  style={{ backgroundColor: "#E1E1E1", width: "5rem" }}
                >
                  {selectedCurrency === "INR" ? "INR" : "USD"}
                </button>
                <input
                  className="rounded-none"
                  placeholder="Maximum price"
                  style={{ padding: "2px 25px" }}
                  value={selectedCurrency === "INR" ? maxPriceINR : maxPriceUSD}
                  onChange={(e) => handleMaxPriceChange(e, selectedCurrency)}
                />
              </div>
            </div>
          </div>
          <div style={{ borderBottom: "1px solid #E1E1E1" }} className="pb-6">
            <div className="">
              <h1
                className="font-semibold fs-6 mb-0"
                style={{ lineHeight: "3rem" }}
              >
                Sort By
              </h1>
              <div className="d-flex flex-column gap-2">
                <div className="mt-0 d-flex gap-2 align-items-center">
                  <input
                    type="radio"
                    name="sort"
                    value="low_to_high_price"
                    checked={sortBy === "low_to_high_price"}
                    onChange={() => handleSortByChange("low_to_high_price")}
                    style={{ width: "12px", height: "12px" }}
                  />
                  <label> Price - Low to High</label>
                </div>
                <div className="mt-0 d-flex gap-2 align-items-center">
                  <input
                    type="radio"
                    name="sort"
                    value="high_to_low_price"
                    checked={sortBy === "high_to_low_price"}
                    onChange={() => handleSortByChange("high_to_low_price")}
                    style={{ width: "12px", height: "12px" }}
                  />
                  <label> Price - High to Low</label>
                </div>
                <div className="mt-0 d-flex gap-2 align-items-center">
                  <input
                    type="radio"
                    name="sort"
                    value="popularity"
                    checked={sortBy === "popularity"}
                    onChange={() => handleSortByChange("popularity")}
                    style={{ width: "12px", height: "12px" }}
                  />
                  <label>popularity</label>
                </div>
                <div className="mt-0 d-flex gap-2 align-items-center">
                  <input
                    type="radio"
                    name="sort"
                    value="newest"
                    checked={sortBy === "newest"}
                    onChange={() => handleSortByChange("newest")}
                    style={{ width: "12px", height: "12px" }}
                  />
                  <label>newest</label>
                </div>
              </div>
            </div>
          </div>
          <div style={{ borderBottom: "1px solid #E1E1E1" }} className="pb-6">
            <div className="">
              <h1
                className="font-semibold fs-6 mb-0"
                style={{ lineHeight: "3rem" }}
              >
                Rate
              </h1>
              <div className="d-flex flex-column gap-2">
                <div className="mt-0 d-flex gap-2 align-items-center">
                  <input
                    type="radio"
                    name="rating"
                    value="4"
                    checked={ratingFilter === "4"}
                    onChange={() => handleRatingFilterChange("4")}
                    style={{ width: "12px", height: "12px" }}
                  />
                  <label className="d-flex justify-content-center  align-items-center">
                    4
                    <span>
                      <IoMdStar className="text-p me-1 ms-1" size={18} />
                    </span>{" "}
                    above
                  </label>
                </div>
                <div className="mt-0 d-flex gap-2 align-items-center">
                  <input
                    type="radio"
                    name="rating"
                    value="3"
                    checked={ratingFilter === "3"}
                    onChange={() => handleRatingFilterChange("3")}
                    style={{ width: "12px", height: "12px" }}
                  />
                  <label className="d-flex justify-content-center  align-items-center">
                    3
                    <span>
                      <IoMdStar className="text-p me-1 ms-1" size={18} />
                    </span>{" "}
                    above
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h1 className="font-semibold fs-6 mt-4 mb-1">Product Categories</h1>
            <Accordion>
              {(mainCategories || []).map((category, index) => (
                <Accordion.Item key={category?.id} eventKey={index.toString()}>
                  <Accordion.Header>
                    <input
                      type="radio"
                      className="me-2"
                      style={{ width: "12px", height: "12px" }}
                      checked={selectedCategory === category.id}
                      onChange={() => handleCategoryChange(category.id)}
                      name="mainCategory"
                    />{" "}
                    <span style={{ textTransform: "capitalize" }}> {category?.name}</span>
                  </Accordion.Header>
                  <Accordion.Body style={{ padding: "0" }}>
                    <div className="d-flex flex-column gap-2">
                      {(category?.sub_categories || []).map((sub, subIndex) => (
                        <div key={sub?.id}>
                          <Accordion>
                            <Accordion.Item eventKey={subIndex.toString()}>
                              <Accordion.Header>
                                <input
                                  type="checkbox"
                                  className="me-2"
                                  style={{ width: "12px", height: "12px" }}
                                  checked={selectedSubCategories.includes(
                                    sub.id
                                  )}
                                  onChange={() =>
                                    handleSubCategoryChange(sub.id)
                                  }
                                />{" "}
                                <span style={{ textTransform: "capitalize" }}>{sub.name}</span>
                              </Accordion.Header>
                              <Accordion.Body>
                                <div className="d-flex flex-column gap-2">
                                  {(sub?.child_categories || []).map((child) => (
                                    <div
                                      key={child?.id}
                                      className="d-flex gap-2 align-items-center"
                                    >
                                      <input
                                        type="checkbox"
                                        style={{
                                          width: "12px",
                                          height: "12px",
                                        }}
                                        checked={selectedChildCategories.includes(
                                          child.id
                                        )}
                                        onChange={() =>
                                          handleChildCategoryChange(child.id)
                                        }
                                      />
                                      <div style={{ textTransform: "capitalize" }}>{child.name}</div>
                                    </div>
                                  ))}
                                </div>
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </div>
                      ))}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
          <div style={{ borderBottom: "1px solid #E1E1E1" }} className="pb-6">
            <div className="">
              <h1
                className="font-semibold fs-6 mb-0"
                style={{ lineHeight: "3rem" }}
              >
                Others
              </h1>
              <div className="d-flex flex-column gap-2">
                <div className="mt-0 d-flex gap-2 align-items-center">
                  <input
                    type="radio"
                    name="others"
                    checked={selectedOtherOption === "dadisha_assured"}
                    onChange={() => {
                      const newOption = selectedOtherOption === "dadisha_assured" ? "" : "dadisha_assured";
                      setSelectedOtherOption(newOption);
                      updateURL(
                        selectedCategory,
                        selectedSubCategories,
                        selectedChildCategories,
                        selectedCurrency === "INR" ? minPriceINR : minPriceUSD,
                        selectedCurrency === "INR" ? maxPriceINR : maxPriceUSD,
                        selectedCurrency,
                        searchValue,
                        sortBy,
                        ratingFilter,
                        newOption
                      );
                    }}
                    style={{ width: "12px", height: "12px" }}
                  />
                  <label> Dadisha Assured</label>
                </div>
                <div className="mt-0 d-flex gap-2 align-items-center">
                  <input
                    type="radio"
                    name="others"
                    checked={selectedOtherOption === "weekly_deals"}
                    onChange={() => {
                      const newOption = selectedOtherOption === "weekly_deals" ? "" : "weekly_deals";
                      setSelectedOtherOption(newOption);
                      updateURL(
                        selectedCategory,
                        selectedSubCategories,
                        selectedChildCategories,
                        selectedCurrency === "INR" ? minPriceINR : minPriceUSD,
                        selectedCurrency === "INR" ? maxPriceINR : maxPriceUSD,
                        selectedCurrency,
                        searchValue,
                        sortBy,
                        ratingFilter,
                        newOption
                      );
                    }}
                    style={{ width: "12px", height: "12px" }}
                  />
                  <label> Weekly Deals</label>
                </div>
                <div className="mt-0 d-flex gap-2 align-items-center">
                  <input
                    type="radio"
                    name="others"
                    checked={selectedOtherOption === "trending_products"}
                    onChange={() => {
                      const newOption = selectedOtherOption === "trending_products" ? "" : "trending_products";
                      setSelectedOtherOption(newOption);
                      updateURL(
                        selectedCategory,
                        selectedSubCategories,
                        selectedChildCategories,
                        selectedCurrency === "INR" ? minPriceINR : minPriceUSD,
                        selectedCurrency === "INR" ? maxPriceINR : maxPriceUSD,
                        selectedCurrency,
                        searchValue,
                        sortBy,
                        ratingFilter,
                        newOption
                      );
                    }}
                    style={{ width: "12px", height: "12px" }}
                  />
                  <label>Trending Products</label>
                </div>

              </div>
            </div>
          </div>
          {/* STANDARDS FILTER */}
          <div>
            <h1 className="font-semibold fs-6 mt-4 mb-1">Standards</h1>
            <Accordion defaultActiveKey="standards">
              <Accordion.Item eventKey="standards">
                {/* <Accordion.Header>Choose Standards</Accordion.Header> */}
                <Accordion.Body>
                  <div className="d-flex flex-column gap-2">
                    {availableStandards.map((standard) => (
                      <div key={standard.id} className="d-flex gap-2 align-items-center">
                        <input
                          type="checkbox"
                          style={{ width: "12px", height: "12px" }}
                          checked={selectedStandards.includes(standard.id)}
                          onChange={() => {
                            const updated = selectedStandards.includes(standard.id)
                              ? selectedStandards.filter((id) => id !== standard.id)
                              : [...selectedStandards, standard.id];
                            setSelectedStandards(updated);
                            getProductResult(null, 1, { standards: updated, industrys: selectedIndustrys });
                          }}

                        />
                        <div style={{ textTransform: "capitalize" }}>{standard.name}</div>
                      </div>
                    ))}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>

          {/* INDUSTRYS FILTER */}
          <div>
            <h1 className="font-semibold fs-6 mt-4 mb-1">Industries</h1>
            <Accordion defaultActiveKey="industrys">
              <Accordion.Item eventKey="industrys">
                {/* <Accordion.Header>Choose Industrys</Accordion.Header> */}
                <Accordion.Body>
                  <div className="d-flex flex-column gap-2">
                    {availableIndustrys.map((industry) => (
                      <div key={industry.id} className="d-flex gap-2 align-items-center">
                        <input
                          type="checkbox"
                          style={{ width: "12px", height: "12px" }}
                          checked={selectedIndustrys.includes(industry.id)}
                          onChange={() => {
                            const updated = selectedIndustrys.includes(industry.id)
                              ? selectedIndustrys.filter((id) => id !== industry.id)
                              : [...selectedIndustrys, industry.id];
                            setSelectedIndustrys(updated);
                            getProductResult(null, 1, { standards: selectedStandards, industrys: updated });
                          }}

                        />
                        <div style={{ textTransform: "capitalize" }}>{industry.name}</div>
                      </div>
                    ))}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </Modal>
    </>
  );
}
