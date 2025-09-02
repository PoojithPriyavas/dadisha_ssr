// Utility functions for SSR data fetching
import axios from '../utilities/customAxios.js';

// Create an SSR-compatible axios instance
const createSSRAxios = () => {
  // Return the existing axios instance or create a new one for SSR
  return axios;
};

// Function to fetch blog data for SSR
export async function fetchBlogData(slug) {
  try {
    const ssrAxios = createSSRAxios();
    const response = await ssrAxios.get(`/disha/blog-detail/${slug}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blog data for SSR:', error);
    return null;
  }
}

// Function to fetch blog list data for SSR
export async function fetchBlogListData() {
  try {
    const ssrAxios = createSSRAxios();
    
    // Fetch all required data for the blog list page in parallel
    const [blogs, categories, tags, recentPosts] = await Promise.all([
      ssrAxios.get('/disha/get-blogs'),
      ssrAxios.get('/disha/blog-categories'),
      ssrAxios.get('/disha/blog-tags'),
      ssrAxios.get('/disha/recent-posts')
    ]);
    
    // Return structured data for the blog list page
    return {
      blogs: blogs.data?.results || [],
      categories: categories.data || [],
      tags: tags.data || [],
      recentPosts: recentPosts.data || []
    };
  } catch (error) {
    console.error('Error fetching blog list data for SSR:', error);
    return {
      blogs: [],
      categories: [],
      tags: [],
      recentPosts: []
    };
  }
}

// Function to fetch product detail data for SSR
export async function fetchProductDetailData(slug) {
  try {
    const ssrAxios = createSSRAxios();
    
    // Fetch product details and reviews in parallel
    const [productDetails, reviewsData] = await Promise.all([
      ssrAxios.post(`/disha/product-details?product_slug=${slug}`),
      ssrAxios.post('/disha/product-review/', { product_slug: slug })
    ]);
    
    // Return structured data for the product detail page
    return {
      product: productDetails.data.product,
      related_products: productDetails.data.related_products || [],
      reviews: reviewsData.data.reviews || [],
      reviewAvg: reviewsData.data || {
        rating_chart: {},
        total_reviews: 0,
      }
    };
  } catch (error) {
    console.error('Error fetching product detail data for SSR:', error);
    return {
      product: null,
      related_products: [],
      reviews: [],
      reviewAvg: {
        rating_chart: {},
        total_reviews: 0,
      }
    };
  }
}

// Function to fetch e-learning data for SSR
export async function fetchElearningData() {
  try {
    const ssrAxios = createSSRAxios();
    
    // Fetch all required data for the e-learning page in parallel
    const [coursesResponse, categoriesResponse] = await Promise.all([
      ssrAxios.post('/learning/all-courses/', { types: 'Dadisha Courses' }),
      ssrAxios.get('/learning/all-courses/')
    ]);
    
    // Return structured data for the e-learning page
    return {
      coursesData: coursesResponse.data || [],
      courseCategories: categoriesResponse.data || []
    };
  } catch (error) {
    console.error('Error fetching e-learning data for SSR:', error);
    return {
      coursesData: [],
      courseCategories: []
    };
  }
}