// src/context/context.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from '../utilities/customAxios.js';

const Context = createContext();

const AppProvider = ({ children, initialSSRData = {} }) => {
  const [homeData, setHomeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryLoader, setCategoryLoader] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState('INR');
  const [openBulkOrderPopUp, setOpenBulkOrderPopUp] = useState(false);
  const [bulkReqSendData, setBulkReqSendData] = useState({
    name: '',
    email: '',
    mobile_number: '',
    message: '',
  });
  const [userData, setUserData] = useState([]);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [trendingPrdData, setTrendingPrdData] = useState([]);
  const [weaklyPrdData, setWeaklyPrdData] = useState([]);
  const [qhseTagPrdData, setQhseTagPrdData] = useState([]);
  const [trendingSearch, setTrendingSearch] = useState([]);
  const [trendingLoading, setTrendingLoading] = useState([]);
  const [weeklyLoading, setWeeklyLoading] = useState(true);
  const [qhseLoading, setQhseLoading] = useState(true);
  const [policyDetails, setPolicyDetails] = useState([]);
  const [zindexIncrease, setZindexIncrease] = useState(true);

  // Helper function for API calls
  const makeApiCall = async (apiCall, successCallback) => {
    try {
      const result = await apiCall();
      if (successCallback) successCallback(result.data);
      return result;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  const gethomeData = async () => {
    setCategoryLoader(true);
    try {
      await makeApiCall(
        () => axios.get('/disha/banner-section'),
        (data) => setHomeData(data)
      );
    } finally {
      setCategoryLoader(false);
    }
  };

  const [userDataLoading, setUserDataLoading] = useState(false);

  const getuserData = async () => {
    setUserDataLoading(true);
    try {
      await makeApiCall(
        () => axios.get('/disha/profile-update'),
        (data) => setUserData(data)
      );
    } finally {
      setUserDataLoading(false);
    }
  };

  useEffect(() => {
    try {
      const storedProductIds = JSON.parse(localStorage.getItem('selectedProductIds')) || [];
      setSelectedProductIds(storedProductIds);
    } catch (error) {
      console.error('Error loading selectedProductIds:', error);
      setSelectedProductIds([]);
    }
  }, []);


  const getTrendingProducts = async () => {
    setTrendingLoading(true);
    try {
      await makeApiCall(
        () => axios.get('/disha/trending-products'),
        (data) => setTrendingPrdData(data.trending_products)
      );
    } finally {
      setTrendingLoading(false);
    }
  };

  const getWeaklyPrdData = async () => {
    setWeeklyLoading(true);
    try {
      await makeApiCall(
        () => axios.get('/disha/weekly-deals'),
        (data) => {
          setWeaklyPrdData(data.weekly_deals);
          setTrendingSearch(data.trending_search);
        }
      );
    } finally {
      setWeeklyLoading(false);
    }
  };

  const getQhseTagPrdData = async () => {
    setQhseLoading(true);
    try {
      await makeApiCall(
        () => axios.get('/disha/qhse-products'),
        (data) => setQhseTagPrdData(data.qhse_products)
      );
    } finally {
      setQhseLoading(false);
    }
  };


  // E-LEARNING SECTION API IMPLEMENTATION

  const [coursesData, setCoursesData] = useState(initialSSRData.coursesData || []);
  const [courseLoading, setCourseLoading] = useState(false)
  const fetchDadishaCourses = async () => {
    console.log("calling")
    try {
      const response = await axios.post('/learning/all-courses/', {
        types: 'Dadisha Courses',
      });
      setCoursesData(response.data)
      // return response.data;
    } catch (error) {
      console.error('Axios API error:', error.response?.data || error.message);
      return null;
    }
  };

  // TEST FILTER PURPOSE

  const [courseFilter, setCourseFilter] = useState([]);
  const [filterLoading, setFilterLoading] = useState(false)

  const fetchDadishaCoursesFilter = async (filters = {}) => {
    console.log("Calling Dadisha Courses API with filters:", filters);
    setFilterLoading(true);

    const payload = {
      types: 'Dadisha Courses',
      ...filters,
    };

    try {
      const response = await axios.post('/learning/all-courses/', payload);
      setCourseFilter(response.data);
      setFilterLoading(false)
      // return response.data;
    } catch (error) {
      console.error('Axios API error:', error.response?.data || error.message);
      return null;
    }
  };



  const [courseCategories, setCourseCategories] = useState(initialSSRData.courseCategories || []);
  const [courseCatLoading, setCourseCatLoading] = useState(false)

  const getCourseCategories = async () => {
    setCourseCatLoading(true);
    try {
      await makeApiCall(
        () => axios.get('/learning/all-courses/'),
        (data) => setCourseCategories(data)
      );
    } finally {
      setCourseCatLoading(false);
    }
  };

  const [courseDetails, setCourseDetails] = useState([]);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const fetchCourseDetail = async (slug) => {
    setDetailsLoading(true)
    try {
      const response = await axios.get(`/learning/course-detail/${encodeURIComponent(slug)}`);
      setCourseDetails(response.data)
      setDetailsLoading(true)
      // return response.data;
    } catch (error) {
      console.error('Error fetching course detail:', error);
      throw error;
    }
  };

  const [settings, setSettings] = useState([]);
  const getSettingsData = async () => {
    try {
      const result = await axios.get('/disha/settings');
      setSettings(result.data);
    } catch (error) {
      console.error('Error fetching policy:', error);
    }
  };


  useEffect(() => {
    fetchDadishaCourses();
    getCourseCategories();
    getSettingsData();
  }, [])

  return (
    <Context.Provider
      value={{
        homeData,
        gethomeData,
        categoryLoader,
        setHomeData,
        selectedCurrency,
        setSelectedCurrency,
        openBulkOrderPopUp,
        setOpenBulkOrderPopUp,
        bulkReqSendData,
        setBulkReqSendData,
        userData,
        setUserData,
        getuserData,
        userDataLoading,
        selectedProductIds,
        setSelectedProductIds,
        trendingPrdData,
        setTrendingPrdData,
        trendingLoading,
        getTrendingProducts,
        weaklyPrdData,
        weeklyLoading,
        setWeaklyPrdData,
        getWeaklyPrdData,
        qhseTagPrdData,
        setQhseTagPrdData,
        getQhseTagPrdData,
        qhseLoading,
        trendingSearch,
        setTrendingSearch,
        zindexIncrease,
        setZindexIncrease,
        policyDetails,
        setPolicyDetails,
        loading,
        setLoading,
        fetchDadishaCourses,
        coursesData,
        getCourseCategories,
        courseCategories,
        fetchDadishaCoursesFilter,
        courseFilter,
        filterLoading,
        fetchCourseDetail,
        courseDetails,
        detailsLoading,
        settings
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => useContext(Context);
export { AppProvider, Context };