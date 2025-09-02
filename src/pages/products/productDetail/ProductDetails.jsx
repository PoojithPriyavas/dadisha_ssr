import { useState, useEffect, useContext } from 'react';
import ProductFooter from '../ProductFooter';
import PrdSecOne from './PrdSecOne';
import { IoIosArrowForward } from 'react-icons/io';
import { FaTruckFast } from 'react-icons/fa6';
import { IoReload } from 'react-icons/io5';
import { FaShield } from 'react-icons/fa6';
import { GiRabbit } from 'react-icons/gi';
import { IoMdHeadset } from 'react-icons/io';
import FirstProductSlider from '../FirstProductSlider';
import SecondaryHeader from '../../../components/SecondaryHeader';
import { useParams } from 'react-router-dom';
import axios from '../../../utilities/customAxios.js';
import SubCategoryHeader from '../../../components/subCategoryHeader/SubCategoryHeader.jsx';
import { Context } from '../../../context/context.jsx';
import { Progress, Rate } from 'antd'; // Import Ant Design components
import ProductDetailSkeleton from './ProductSkeleton.jsx';
import { useProductDetailSSRData } from '../../../hooks/useSSRData';

export default function ProductDetails() {
  const { slug } = useParams();
  console.log(slug, "slug")
  const [productDetail, setProductDetail] = useState({});
  const [relatedproducts, setRelatedproducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewAvg, setReviewAvg] = useState({
    rating_chart: {},
    total_reviews: 0,
  });
  const { trendingPrdData, getTrendingProducts, loading, setLoading } = useContext(Context);

// Get SSR data if available
const ssrProductData = useProductDetailSSRData();

const getPrdDetails = async () => {
  try {
    // If we have SSR data, use it instead of making a new request
    if (ssrProductData && ssrProductData.product) {
      setProductDetail(ssrProductData.product);
      setRelatedproducts(ssrProductData.related_products || []);
      return;
    }
    
    // Otherwise, fetch data client-side
    setLoading(true);
    const result = await axios.post(`/disha/product-details?product_slug=${slug}`);
    setProductDetail(result.data.product);
    setRelatedproducts(result.data.related_products);
  } catch (error) {
    console.error("Failed to fetch product details:", error);
  } finally {
    setLoading(false);
  }
};


  const getReviews = async () => {
    // If we have SSR data with reviews, use it
    if (ssrProductData && ssrProductData.reviews) {
      setReviews(ssrProductData.reviews);
      setReviewAvg(ssrProductData.reviewAvg || {
        rating_chart: {},
        total_reviews: 0,
      });
      return;
    }
    
    // Otherwise fetch client-side
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('dadishaToken') : null;
    try {
      const response = await axios.post('/disha/product-review/', {
        product_slug: slug
      },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : ''
          }
        });
      setReviews(response.data.reviews);
      setReviewAvg(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getTrendingProducts();
  }, []);
  useEffect(() => {
    getPrdDetails();
    getReviews();

  }, [slug]);

  // Mock reviews data
  // const reviews = [
  //   {
  //     name: 'Steve Jobs',
  //     rating: 4,
  //     comment:
  //       'I recently had the pleasure of using this service, and I must say, it excels in being user-friendly, making navigation a breeze. I especially appreciated the thoughtful experience. Highly recommend!',
  //   },
  //   {
  //     name: 'Elon Musk',
  //     rating: 5,
  //     comment:
  //       'What a fantastic experience! The features are incredibly intuitive, and I found everything I needed without any hassle. It’s clear that a lot of thought went into making this tool efficient and enjoyable to use. Definitely a five-star service!',
  //   },
  //   {
  //     name: 'Mark Zuckerberg',
  //     rating: 5,
  //     comment:
  //       'I am thoroughly impressed with this platform! The seamless integration of various functionalities makes it a joy to use. The attention to detail is remarkable, and it truly stands out in the market. I can’t recommend it enough!',
  //   },
  // ];
  // Review summary data
  const ratingData = Object.entries(reviewAvg.rating_chart).map(([star, count]) => ({
    stars: star,
    count: count,
  }));

  const reviewSummary = {
    averageRating: 4.8,
    totalRatings: 12,
    totalReviews: 42,
    ratingBreakdown: [
      { stars: 5, count: 42 },
      { stars: 4, count: 68 },
      { stars: 3, count: 15 },
      { stars: 2, count: 5 },
      { stars: 1, count: 12 },
    ],
  };
  // Function to get initials from a name
  const getInitials = name => {
    const names = name.split(' ');
    const firstNameInitial = names[0].charAt(0).toUpperCase();
    const lastNameInitial =
      names.length > 1 ? names[names.length - 1].charAt(0).toUpperCase() : '';
    return `${firstNameInitial}${lastNameInitial}`;
  };

  // Calculate total reviews for percentage calculation
  const totalReviews = reviewSummary.ratingBreakdown.reduce(
    (total, item) => total + item.count,
    0
  );


  const SkeletonLoader = () => (
    <div className="skeleton-loader">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-image"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-price"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <SecondaryHeader />
      <div className="mt-5">
        {/* <SubCategoryHeader /> */}
      </div>
      {loading ? (
        <ProductDetailSkeleton />
      ) : (
        <PrdSecOne loading={loading} productDetail={productDetail} setProductDetail={setProductDetail} />
      )}


      <div className="container mx-auto">
        <div className="mt-6 rounded mb-4" style={{ marginTop: '10rem' }}>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="text-black fw-700">Recommended products</h5>
            {/* <a
              className="d-flex align-items-center gap-2 text-black custom-pointer"
              style={{ textDecoration: 'none' }}
            >
              View All <IoIosArrowForward />
            </a> */}
          </div>
          {loading ? <SkeletonLoader /> :
            <FirstProductSlider productArray={relatedproducts} />
          }
        </div>
        <div
          className="rounded-xl px-4 py-3 text-white mb-4 mt-6"
          style={{ backgroundColor: '#F6AB4A', fontSize: '14px' }}
        >
          <div className="d-flex flex-wrap justify-content-between">
            <div className="d-flex justify-content-between align-items-center gap-2">
              <FaTruckFast />
              <p className="text-uppercase mb-0"> free shipping</p>
            </div>
            <div className="d-flex justify-content-between align-items-center gap-2">
              <IoReload />
              <p className="text-uppercase mb-0"> Bulk Order request</p>
            </div>
            <div className="d-flex justify-content-between align-items-center gap-2">
              <FaShield />
              <p className="text-uppercase mb-0"> 100% secure payment</p>
            </div>

            <div className="d-flex justify-content-between align-items-center gap-2">
              <IoMdHeadset />
              <p className="text-uppercase mb-0">
                {' '}
                online support
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 rounded mb-4" style={{ marginTop: '10rem' }}>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="text-black fw-700">Recently viewed products</h5>
            <a
              className="d-flex align-items-center gap-2 text-black custom-pointer"
              style={{ textDecoration: 'none' }}
            >
              View All <IoIosArrowForward />
            </a>
          </div>{loading ? <SkeletonLoader /> :
            <FirstProductSlider productArray={trendingPrdData} />
          }
        </div>
        {/* Review Summary Section */}
        <div className="mt-6">
          <h5 className="text-black fw-700 mb-4">Customer Reviews</h5>
          <div
            className="row rounded-xl px-2 py-4 w-100 mx-auto"
            style={{ boxShadow: '0px 4px 25px 0px rgba(116, 116, 116, 0.10)' }}
          >
            <div className="col-md-4">
              <div className="card p-3 h-100">
                <h3 className="mb-2">{reviewAvg.average_rating}</h3>
                <div className="mb-2">
                  <Rate
                    disabled
                    className="text-base-color"
                    defaultValue={reviewAvg.average_rating}
                    allowHalf
                  />
                </div>
                <p className="text-muted">
                  {reviewAvg.total_reviews} Ratings
                </p>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card p-3">
                {ratingData.map((rating, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <span className="me-2">
                      {rating.stars} <span className="text-p">★</span>
                    </span>
                    <div className="flex-grow-1">
                      <Progress
                        percent={(rating.count / reviewAvg.total_reviews) * 100}
                        showInfo={false}
                        strokeColor="#faad14"
                        size="small"
                      />
                    </div>
                    <span className="ms-2">{rating.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Review Section */}
        <div className="mt-5">
          <div className="row">
            {reviews?.map((review, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div
                  className="h-100 rounded-xl px-2 py-4"
                  style={{
                    boxShadow: '0px 4px 25px 0px rgba(116, 116, 116, 0.10)',
                  }}
                >
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      {/* Profile Picture with Initials */}
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          width: '40px',
                          height: '40px',
                          backgroundColor: '#fbe9af80',
                          color: '#fff',
                          fontSize: '16px',
                          fontWeight: 'bold',
                          marginRight: '10px',
                        }}
                      >
                        {getInitials(review.user_name)}
                      </div>
                      <h5 className="card-title mb-0">{review.user_name}</h5>
                    </div>
                    <div className="mb-2">
                      <Rate
                        disabled
                        className="text-base-color fs-6"
                        defaultValue={review.average_rating}
                        allowHalf
                      />
                    </div>
                    <p className="card-text">{review.review}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ProductFooter />
    </div>
  );
}
