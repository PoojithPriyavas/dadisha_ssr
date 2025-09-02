import React, { useContext, useEffect, useState } from 'react';
import axios from '../../utilities/customAxios.js';
import SecondaryHeader from '../SecondaryHeader';
import ProductFooter from '../../pages/products/ProductFooter';
import { Rate } from 'antd';
import { FiShoppingCart } from 'react-icons/fi';
import { isTokenValid } from '../../utilities/index.js';
import { IoMdHeartEmpty } from 'react-icons/io';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { toast } from 'react-toastify';
import { Context } from '../../context/context';
import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';


export default function Compare() {
  const [products, setProducts] = useState([]);
  const { selectedCurrency, setSelectedProductIds } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedProductIds = JSON.parse(localStorage.getItem('selectedProductIds')) || [];
      setSelectedProductIds(storedProductIds);
    } catch (error) {
      console.error('Error loading selectedProductIds:', error);
      setSelectedProductIds([]);
    }
  }, []);

  const fetchComparisonData = async () => {
    try {
      const response = await axios.post('/disha/compare-product/', {
        product_slugs: selectedProductIdsArray,
      });
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching comparison data:', error);
    }
  };

  useEffect(() => {
    fetchComparisonData();
  }, []);

  const addToWishlist = async slug => {
    try {
      const response = await axios.post('/disha/add-to-wishlist', {
        product_slug: slug,
      });
      toast.success(response.data.message || 'Added to wishlist');
    } catch (error) {
      toast.error('Failed to add product to wishlist');
    }
  };

  const addToCart = async slug => {
    try {
      await axios.post('/disha/add-to-cart', {
        product_slug: slug,
      });
      toast.success('Product added to cart');
    } catch (error) {
      toast.error('Failed to add product to cart');
    }
  };

  const removeProduct = slug => {
    console.log(slug, "slug");

    try {
      const updatedProductIds = selectedProductIdsArray.filter(
        productId => productId !== slug
      );
      console.log(updatedProductIds, "updated product slugs")
      localStorage.setItem(
        'selectedProductIds',
        JSON.stringify(updatedProductIds)
      );
      setSelectedProductIds(updatedProductIds);
      setProducts(prev => prev.filter(p => p.slug !== slug));
      console.log(products, "products final")
      toast.success('Product removed from comparison');

    } catch (error) {
      toast.error('Failed to remove product');
    }
  };

  console.log(products, "products")
  return (
    <div>
      <SecondaryHeader />
      <div className="mt-4">
        {/* <SubCategoryHeader /> */}
      </div>
      <div className="container mx-auto details mt-4">
        <p className="mb-0">
          Home <i className="fa-solid fa-chevron-right"></i> Compare{' '}
        </p>
        <div className="mt-4">
          {products.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table className="table table-bordered text-center align-middle" style={{ minWidth: '900px' }}>
                <thead>
                  <tr>
                    <th style={{ position: 'sticky', left: 0, backgroundColor: '#fff', zIndex: 2 }}>Attribute</th>
                    {products.map(product => (
                      <th key={product.id} className="position-relative">
                        {product.name}
                        <div
                          className="position-absolute custom-pointer"
                          style={{ right: '10px', top: '10px' }}
                        >
                          <IoIosCloseCircleOutline
                            className="fs-5 text-danger"
                            onClick={() => removeProduct(product.slug)}
                          />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      label: 'Image',
                      render: product => (
                        <div>
                          <div
                            className="rounded overflow-hidden mt-2 mx-auto"
                            style={{ height: '10rem', width: '10rem' }}
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-100 h-100 object-cover"
                            />
                          </div>
                          <div className="d-flex gap-2 mt-4 mb-2 justify-content-center">
                            {isTokenValid() ? (
                              <button
                                className="detailbtn-sec rounded px-3 d-flex align-items-center justify-content-center gap-2 py-2"
                                onClick={() => addToWishlist(product.slug)}
                              >
                                <IoMdHeartEmpty className="fs-5" />
                              </button>
                            ) : (
                              <button
                                className="detailbtn-sec rounded px-3 d-flex align-items-center justify-content-center gap-2 py-2"
                                onClick={() => navigate('/signin')}
                              >
                                <IoMdHeartEmpty className="fs-5" />
                              </button>
                            )}
                            {isTokenValid() ? (
                              <button
                                className={`${product.stock === 0 ? 'disablebtn' : 'detailbtn-sec'
                                  } rounded px-4 d-flex align-items-center justify-content-center gap-2 py-2`}
                                onClick={() => addToCart(product.slug)}
                                disabled={product.stock === 0}
                              >
                                <FiShoppingCart />
                                Add To Cart
                              </button>
                            ) : (
                              <button
                                className={`${product.stock === 0 ? 'disablebtn' : 'detailbtn-sec'
                                  } rounded px-4 d-flex align-items-center justify-content-center gap-2 py-2`}
                                onClick={() => navigate('/signin')}
                                disabled={product.stock === 0}
                              >
                                <FiShoppingCart />
                                Add To Cart
                              </button>
                            )}
                          </div>
                        </div>
                      ),
                    },
                    {
                      label: 'Price',
                      render: product =>
                        selectedCurrency === 'INR' ? (
                          <>
                            <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal', color: 'inherit' }}>₹</span>
                            {product.sale_price}
                          </>
                        ) : (
                          `$${product.sale_price_in_dollar}`
                        ),
                    }
                    ,
                    {
                      label: 'MRP',
                      render: product =>
                        selectedCurrency === 'INR' ? (
                          <span className="text-muted text-decoration-line-through"><span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal', color: 'inherit' }}>₹</span>{product.mrp}</span>
                        ) : (
                          <span className="text-muted text-decoration-line-through">$ {product.mrp_in_dollar}</span>
                        ),
                    },
                    {
                      label: 'Discount',
                      render: product => (
                        <span style={{ color: '#16A34A' }}>
                          {selectedCurrency === 'INR' ? product.off : product.off_in_dollar}% OFF
                        </span>
                      ),
                    },
                    {
                      label: 'Customer feedback',
                      render: product => (
                        <div className="d-flex gap-2 justify-content-center align-items-center">
                          <Rate disabled defaultValue={product.average_rating} />
                          ({product.reviews_count} Reviews)
                        </div>
                      ),
                    },
                    {
                      label: 'Description',
                      render: product => (
                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.short_description || '') }} />
                      ),
                    },
                    {
                      label: 'Key Features',
                      render: product => (
                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.key_features || '') }} />
                      ),
                    },
                    {
                      label: 'Stock',
                      render: product => product.stock,
                    },
                    {
                      label: 'Replacement Days',
                      render: product => product.replacement_in_days,
                    },
                    {
                      label: 'Category',
                      render: product =>
                        `${product.main_category} > ${product.sub_category}${product.child_category ? ` > ${product.child_category}` : ''
                        }`,
                    },
                  ].map((row, index) => (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
                      <th
                        style={{
                          position: 'sticky',
                          left: 0,
                          backgroundColor: '#fff',
                          zIndex: 1,
                          verticalAlign: 'middle',
                          width: '20%',
                        }}
                      >
                        {row.label}
                      </th>
                      {products.map(product => (
                        <td key={product.id} style={{ minWidth: '18rem' }}>{row.render(product)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No products selected for comparison.</p>
          )}
        </div>
      </div>
      <ProductFooter />
    </div>
  );


}
