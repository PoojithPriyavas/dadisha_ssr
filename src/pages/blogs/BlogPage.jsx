import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import './blogs.css';
import axios from '../../utilities/customAxios.js';
import { Helmet } from "react-helmet-async";
import { useBlogSSRData } from "../../hooks/useSSRData";

function BlogPage() {
  const { slug } = useParams();
  // Get SSR data if available
  const ssrBlogData = useBlogSSRData();
  
  // Initialize state with SSR data to prevent hydration mismatch
  const [blogDetails, setBlogDetails] = useState(ssrBlogData || []);
  const [loading, setLoading] = useState(!ssrBlogData);

const getBlogDetails = async () => {
  try {
    // Skip fetching if we already have data from SSR
    if (ssrBlogData) {
      return;
    }
    
    // Check if slug is a number (page number) or a string (actual slug)
    if (slug && !isNaN(slug)) {
      // This is a page number, not a blog slug
      console.error("Numeric page parameter provided instead of blog slug");
      setLoading(false);
      return;
    }
    
    // Otherwise, fetch data client-side
    const response = await fetch(`https://admin.dadisha.com/disha/blog-detail/${slug}`);
    
    // Check if the response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    setBlogDetails(data);
  } catch (err) {
    console.error("Failed to fetch blog details", err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  // Only fetch if we don't have SSR data
  if (!ssrBlogData) {
    getBlogDetails();
  }
}, [slug, ssrBlogData]);

  if (loading) {
    return <div className="text-center mt-20 text-lg">Loading blog...</div>;
  }

  if (!blogDetails) {
    return <div className="text-center mt-20 text-red-500">Blog not found.</div>;
  }

  return (
    <>
      <Helmet>
        <title>{blogDetails.meta_title || blogDetails.title}</title>
        <meta name="description" content={blogDetails.meta_desc || blogDetails.title} />

        {/* Open Graph Tags */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={blogDetails.meta_title || blogDetails.title} />
        <meta property="og:description" content={blogDetails.meta_desc || ''} />
        <meta property="og:image" content={blogDetails.image_big || blogDetails.image} />
        <meta property="og:url" content={`https://dadisha.com/blogs/pages/${blogDetails.slug}`} />
        <meta property="og:site_name" content="Dadisha PVT LTD" />

        {/* Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blogDetails.meta_title || blogDetails.title} />
        <meta name="twitter:description" content={blogDetails.meta_desc || ''} />
        <meta name="twitter:image" content={blogDetails.image_big || blogDetails.image} />
        <meta name="twitter:creator" content={blogDetails.author || 'Dadisha Team'} />
      </Helmet>

      <div className="container mx-auto px-4 py-10 mt-10  blog-detail-page-style">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            {blogDetails.title}
          </h1>

          <p className="text-center text-sm mt-2" style={{ color: '#c73838' }}>
            {blogDetails.date} | <span className="text-yellow-700 font-medium">{blogDetails.author}</span>
          </p>

          {/* <div className="mt-8">
            <h2 className="text-lg font-semibold">Introduction</h2>
            <p className="text-gray-700 mt-2">{blogDetails.meta_desc}</p>
          </div> */}

          {/* <div className="image-grid mt-6">
            {blogDetails.image && (
              <img
                src={blogDetails.image}
                alt={blogDetails.alt}
                className="image-item"
              />
            )}
        
          </div> */}

          {blogDetails.image_big && (
            <img
              src={blogDetails.image_big}
              alt={blogDetails.alt}
              className="image-item"
            />
          )}

          <div
            className="mt-5 text-gray-700 blog-content-container"
            style={{ textAlign: 'justify' }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blogDetails.text_editor || ''),
            }}
          />

          <br></br>

          {/* <div className="line mt-5"></div> */}

          {/* {blogDetails?.tags?.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mt-5">
              {blogDetails.tags.map((tag, i) => (
                <button
                  key={i}
                  className="bg-white border border-gray-300 hover:bg-gray-100 px-5 py-2 rounded-md shadow-sm transition m-1"
                >
                  {tag}
                </button>
              ))}
            </div>
          )} */}
        </div>
      </div>
    </>
  );
}

export default BlogPage;
