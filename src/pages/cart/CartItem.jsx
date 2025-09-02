import React, { useContext, useEffect, useState } from 'react';
import SecondaryHeader from '../../components/SecondaryHeader';
import ProductFooter from '../products/ProductFooter';
import { FcOk } from 'react-icons/fc';
import { FcCancel } from 'react-icons/fc';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { IoMdHeartEmpty } from 'react-icons/io';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import axios from '../../utilities/customAxios.js';
import { Context } from '../../context/context.jsx';
import { toast } from 'react-toastify';
import './CartItem.css'
import Header from '../../components/Header.jsx';

const CartItem = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const { selectedCurrency } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const getCartItems = async () => {
    setLoading(true);
    const result = await axios.get('/disha/cart-page');
    setCartItems(result.data);
    setLoading(false);
  };
  console.log(cartItems, "cart")
  useEffect(() => {
    getCartItems();
  }, []);

  const removeCartFun = async slug => {
    const result = await axios.post('/disha/remove-product-from-cart', {
      product_slug: slug,
    });
    if (result.status === 200) {
      getCartItems();
      toast.success('Product removed from cart');
    }
  };

  const addToWishlist = async slug => {
    try {
      const response = await axios.post('/disha/add-to-wishlist', {
        product_slug: slug,
      });
      if (response.data.message) {
        toast.success(response.data.message)
        setCartItems(prev => {
          if (!prev?.cart_items || !Array.isArray(prev.cart_items)) return prev;
          const updatedCartItems = prev.cart_items.map(item =>
            item.product?.slug === slug
              ? {
                ...item,
                product: {
                  ...item.product,
                  wishlist: !item.product.wishlist,
                },
              }
              : item
          );

          return {
            ...prev,
            cart_items: updatedCartItems,
          };
        });
      }
      // toast.success('Product added to wishlist');
    } catch (error) {
      toast.error('Failed to add product to wishlist');
      console.error('Error adding product to wishlist:', error);
    }
  };

  const removeItemCartFun = async (slug, variant) => {
    const result = await axios.post('/disha/remove-from-cart', {
      product_slug: slug,
      ...(variant && { variant_id: variant }),
    });
    if (result.status === 200) {
      getCartItems();
      toast.success('Product removed from cart');
    }
  };

  const addItemToCart = async (slug, variant) => {
    try {
      const result = await axios.post('/disha/add-to-cart', {
        product_slug: slug,
        ...(variant && { variant_id: variant }),
      });
      if (result.status === 200) {
        getCartItems();
        toast.success('Product added to cart');
      }
    } catch (error) {
      toast.error('Failed to add product to cart');
      console.error('Error adding product to cart:', error);
    }
  };

  // const handleQuantityChange = (e, slug) => {
  //   const newQuantity = e.value;
  //   const cartItem = cartItems.cart_items.find(
  //     item => item.product.slug === slug
  //   );
  //   if (!cartItem) return;

  //   const currentQuantity = cartItem.quantity;
  //   const productStock = cartItem.product.stock;


  //   if (newQuantity < 1) {
  //     toast.warn("Quantity cannot be less than 1.");
  //     return;
  //   }

  //   if (newQuantity > productStock) {
  //     toast.warn(`Only ${productStock} item(s) available in stock.`);
  //     return;
  //   }

  //   if (newQuantity > currentQuantity) {
  //     addItemToCart(slug);
  //   } else if (newQuantity < currentQuantity) {
  //     if (currentQuantity > 1) {
  //       removeItemCartFun(slug);
  //     }
  //   }
  // };

  const [loadingSlugs, setLoadingSlugs] = useState({});
  const [clickLocks, setClickLocks] = useState({});

  const handleDecrement = async (slug, variant) => {
    if (clickLocks[slug]) return;

    const cartItem = cartItems.cart_items.find(item => item.product.slug === slug);
    if (!cartItem || cartItem.quantity <= 1) {
      toast.warn("Quantity cannot be less than 1.");
      return;
    }

    setClickLocks(prev => ({ ...prev, [slug]: true }));

    try {
      await removeItemCartFun(slug, variant);

      // Optional: Add a small delay for smoother UX
      // await new Promise(resolve => setTimeout(resolve, 100));
    } finally {
      setClickLocks(prev => ({ ...prev, [slug]: false }));
    }
  };

  const handleIncrement = async (slug, variant) => {
    if (clickLocks[slug]) return;

    const cartItem = cartItems.cart_items.find(item => item.product.slug === slug);
    if (!cartItem) return;

    if (cartItem.quantity >= cartItem.product.stock) {
      toast.warn(`Only ${cartItem.product.stock} item(s) available in stock.`);
      return;
    }

    setClickLocks(prev => ({ ...prev, [slug]: true }));

    try {
      await addItemToCart(slug, variant);
      // Optional: Add a small delay
      // await new Promise(resolve => setTimeout(resolve, 100));
    } finally {
      setClickLocks(prev => ({ ...prev, [slug]: false }));
    }
  };
  useEffect(() => {
    console.log('CartItem re-rendered');
  });

  return (
    <div>
      {/* <SecondaryHeader /> */}
      <Header />
      <div className="container mx-auto mt-9">
        {loading ? (
          // Skeleton loader while data is loading
          <div className="row">
            <div className="col-auto col-lg-8 me-lg-0 me-auto">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="mb-10">
                  <div className="d-flex align-items-start flex-row flex-nowrap gap-4" style={{ minHeight: '200px' }}>
                    <div className="flex-shrink-0" style={{ width: '100%', maxWidth: '150px' }}>
                      <div className="rounded overflow-hidden cartimg skeleton" style={{
                        height: '150px',
                        aspectRatio: 1,
                        backgroundColor: '#f0f0f0'
                      }}></div>
                    </div>
                    <div className="flex-grow-1" style={{ minWidth: '200px' }}>
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start">
                          <div className="col-10">
                            <div className="skeleton-text" style={{
                              width: '80%',
                              height: '24px',
                              marginBottom: '12px',
                              backgroundColor: '#f0f0f0'
                            }}></div>
                          </div>
                          <div className="col-2 d-flex gap-2 align-items-center justify-content-end">
                            <div className="skeleton-icon" style={{
                              width: '20px',
                              height: '20px',
                              backgroundColor: '#f0f0f0'
                            }}></div>
                          </div>
                        </div>

                        <div className="skeleton-text" style={{
                          width: '30%',
                          height: '16px',
                          marginBottom: '8px',
                          backgroundColor: '#f0f0f0'
                        }}></div>

                        <div className="d-flex gap-5">
                          <div className="skeleton-text" style={{
                            width: '20%',
                            height: '16px',
                            backgroundColor: '#f0f0f0'
                          }}></div>
                          <div className="skeleton-text" style={{
                            width: '15%',
                            height: '16px',
                            backgroundColor: '#f0f0f0'
                          }}></div>
                        </div>

                        <div className="mt-3 d-flex flex-wrap justify-content-between align-items-center gap-3">
                          <div className="d-flex gap-3 align-items-center">
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              border: '1px solid #f0f0f0',
                              borderRadius: '10px',
                              padding: '4px 10px',
                              backgroundColor: '#fff',
                            }}>
                              <div className="skeleton-button" style={{
                                width: '32px',
                                height: '32px',
                                backgroundColor: '#f0f0f0'
                              }}></div>
                              <div className="skeleton-input" style={{
                                width: '40px',
                                height: '32px',
                                backgroundColor: '#f0f0f0',
                                margin: '0 5px'
                              }}></div>
                              <div className="skeleton-button" style={{
                                width: '32px',
                                height: '32px',
                                backgroundColor: '#f0f0f0'
                              }}></div>
                            </div>
                            <div className="skeleton-button" style={{
                              width: '120px',
                              height: '32px',
                              backgroundColor: '#f0f0f0'
                            }}></div>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <div className="skeleton-text" style={{
                              width: '60px',
                              height: '24px',
                              backgroundColor: '#f0f0f0'
                            }}></div>
                            <div className="skeleton-text" style={{
                              width: '40px',
                              height: '24px',
                              backgroundColor: '#f0f0f0'
                            }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-12 col-lg-4 me-lg-0 me-auto">
              <div className="rounded p-4 mb-4 skeleton" style={{
                border: '1px solid #f0f0f0',
                backgroundColor: '#f9f9f9'
              }}>
                <div className="skeleton-text" style={{
                  width: '40%',
                  height: '24px',
                  marginBottom: '20px',
                  backgroundColor: '#f0f0f0'
                }}></div>

                <div className="d-flex flex-column mt-2">
                  {[1, 2, 3, 4].map((_, index) => (
                    <div key={index} className="d-flex justify-content-between" style={{
                      borderBottom: '1px solid #f0f0f0',
                      padding: '8px 0'
                    }}>
                      <div className="skeleton-text" style={{
                        width: '60%',
                        height: '16px',
                        backgroundColor: '#f0f0f0'
                      }}></div>
                      <div className="skeleton-text" style={{
                        width: '20%',
                        height: '16px',
                        backgroundColor: '#f0f0f0'
                      }}></div>
                    </div>
                  ))}
                </div>

                <div className="skeleton-button" style={{
                  width: '100%',
                  height: '40px',
                  marginTop: '20px',
                  backgroundColor: '#f0f0f0'
                }}></div>
              </div>
            </div>
          </div>
        ) : !cartItems?.cart_items || cartItems?.cart_items?.length === 0 ? (
          <div className="fw-600 mt-0 text-center d-flex flex-column align-items-center justify-content-center"
            style={{ minHeight: '60vh' }}>
            <img src='images/assets/empty_cart.png' style={{ maxWidth: '250px', width: '100%', height: 'auto', marginBottom: '20px' }} />
            <div><h6 className="font-poppins" style={{ padding: '15px 65px', border: '1px solid #b1adad69', fontWeight: 600 }}>YOUR CART IS CURRENTLY EMPTY.</h6></div>
            <button className="detailbtn-pri rounded px-4 d-flex align-items-center justify-content-center gap-2 py-2"
              onClick={() => navigate('/')}
            >Start Shopping</button>
          </div>
        ) : (
          <div className="row">
            <div className="col-auto col-lg-8 me-lg-0 me-auto">
              {cartItems?.cart_items?.map((item, index) => {
                // Determine which price and image to use based on variant presence
                const priceData = item.variant ? {
                  mrp: item.variant.mrp,
                  sale_price: item.variant.sale_price,
                  discount: item.variant.discount,
                  off: item.variant.discount_percentage || item.variant.off,
                  mrp_in_dollar: item.variant.mrp_in_dollar,
                  sale_price_in_dollar: item.variant.sale_price_in_dollar,
                  discount_in_dollar: item.variant.discount_in_dollar
                } : {
                  mrp: item.product.mrp,
                  sale_price: item.product.sale_price,
                  discount: item.product.discount,
                  off: item.product.discount_in_percentage,
                  mrp_in_dollar: item.product.mrp_in_dollar,
                  sale_price_in_dollar: item.product.sale_price_in_dollar,
                  discount_in_dollar: item.product.discount_in_dollar
                };

                // Use variant image if available, otherwise use product image
                const displayImage = item.variant?.additional_images?.[0] || item.product.image;
                const stockQuantity = item.variant?.quantity || item.product.stock;

                return (
                  <div key={index} className="mb-10">
                    <div className="d-flex align-items-start flex-row flex-nowrap gap-4" style={{ minHeight: '200px' }}>
                      <div className="flex-shrink-0" style={{ width: '100%', maxWidth: '150px' }}>
                        <div className="rounded overflow-hidden cartimg" style={{ height: '150px', aspectRatio: 1 }}>
                          <img
                            src={displayImage}
                            alt={item.product.name}
                            className="w-100"
                            style={{ height: '100%', objectFit: 'contain' }}
                            onError={(e) => {
                              e.target.src = item.product.image; // Fallback to product image
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex-grow-1" style={{ minWidth: '200px' }}>
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start">
                            <div className="col-10">
                              <h5 className="card-title mb-1">
                                {item.product.name}
                              </h5>
                            </div>
                            <div className="col-2 d-flex gap-2 align-items-center justify-content-end">
                              <AiOutlineCloseCircle
                                className="custom-pointer fs-5"
                                onClick={() => {
                                  removeCartFun(item.product.slug);
                                }}
                              />
                            </div>
                          </div>
                          {item.product.qhse_product && (
                            <p
                              className="card-text w-fit px-3 py-1 text-white mt-2"
                              style={{
                                backgroundColor: '#FFA500',
                                borderRadius: '3px 3px 12px 3px',
                                fontSize: '0.75rem',
                                width: 'fit-content',
                              }}
                            >
                              Dadisha Assured
                            </p>
                          )}
                          {/* {item.product.qhse_product && (
                            <img
                              src="/tags/tag.png"
                              alt="Dadisha Assured"
                              className="mt-2"
                              style={{
                                width: 'auto',
                                height: '20px',
                              }}
                            />
                          )} */}


                          <div className="d-flex gap-5">
                            <p
                              className="fw-500 mb-1"
                              style={{
                                color: '#FFA500',
                                textTransform: 'uppercase',
                              }}
                            >
                              Free Shipping
                            </p>
                            {stockQuantity > 0 ? (
                              <div className="d-flex align-items-center gap-1 mb-0">
                                <FcOk />
                                <p className="mb-0" style={{ fontSize: '0.75rem' }}>In stock</p>
                              </div>
                            ) : (
                              <div className="d-flex align-items-center gap-1 mb-0">
                                <FcCancel />
                                <p className="mb-0" style={{ fontSize: '0.75rem' }}>Out of stock</p>
                              </div>
                            )}
                          </div>
                          {item.variant?.variant_values?.length > 0 && (
                            <div className="mt-2">
                              {item.variant.variant_values.map((value, i) => (
                                <p key={i} className="mb-1">
                                  <span className="fw-bold">{value.variant_name}:</span> {value.value_name}
                                </p>
                              ))}
                            </div>
                          )}
                          <div className="mt-3 d-flex flex-wrap justify-content-between align-items-center gap-3">
                            <div className="d-flex gap-3 align-items-center">
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                border: '1px solid #ccc',
                                borderRadius: '10px',
                                padding: '4px 10px',
                                backgroundColor: '#fff',
                              }}>
                                <Button
                                  icon="pi pi-minus"
                                  className="p-button-secondary"
                                  onClick={() => handleDecrement(item.product.slug, item.variant?.id)}
                                  disabled={item.quantity <= 1 || clickLocks[item.product.slug]}
                                  style={{
                                    fontSize: '18px',
                                    width: '32px',
                                    height: '32px',
                                    padding: 0,
                                    border: 'none',
                                    background: 'transparent',
                                    color: '#000',
                                    outline: 'none',
                                    boxShadow: 'none',
                                    transition: 'all 0.3s ease',
                                    opacity: clickLocks[item.product.slug] ? 0.7 : 1,
                                  }}
                                />
                                <input
                                  type="text"
                                  value={item.quantity}
                                  readOnly
                                  style={{
                                    width: '40px',
                                    height: '32px',
                                    textAlign: 'center',
                                    border: '1px solid #ccc',
                                    outline: 'none',
                                    fontSize: '16px',
                                    color: '#000',
                                    backgroundColor: '#fff',
                                    padding: '1px',
                                    borderRadius: '10px',
                                  }}
                                />
                                <Button
                                  icon="pi pi-plus"
                                  className="p-button-secondary"
                                  onClick={() => handleIncrement(item.product.slug, item.variant?.id)}
                                  disabled={item.quantity >= stockQuantity || clickLocks[item.product.slug]}
                                  style={{
                                    fontSize: '18px',
                                    width: '32px',
                                    height: '32px',
                                    padding: 0,
                                    border: 'none',
                                    background: 'transparent',
                                    color: '#000',
                                    outline: 'none',
                                    boxShadow: 'none',
                                    transition: 'all 0.3s ease',
                                    opacity: clickLocks[item.product.slug] ? 0.7 : 1,
                                  }}
                                />
                              </div>

                              <div
                                className="d-flex gap-2 align-items-center fw-bold custom-pointer"
                                onClick={() => addToWishlist(item.product.slug)}
                                style={{ fontSize: '0.75rem' }}
                              >
                                {item.product.wishlist ? (
                                  <button className="detailbtn-pri rounded px-4 d-flex align-items-center justify-content-center gap-2 py-2">
                                    <IoMdHeartEmpty className="fs-6" />
                                    Added to wishlist
                                  </button>
                                ) : (
                                  <button className="detailbtn-pri rounded px-4 d-flex align-items-center justify-content-center gap-2 py-2">
                                    <IoMdHeartEmpty className="fs-6" />
                                    Add to wishlist
                                  </button>
                                )}
                              </div>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                              {priceData.off && (
                                <div
                                  className="px-2 py-1"
                                  style={{
                                    backgroundColor: '#ffa50057',
                                    fontSize: '0.688rem',
                                    borderRadius: '10px',
                                  }}
                                >
                                  {Number(priceData.off).toFixed(2)}% OFF
                                </div>
                              )}
                              {selectedCurrency === 'INR' ? (
                                <>
                                  <p
                                    className="mb-0"
                                    style={{
                                      textDecoration: 'line-through',
                                      color: '#909090',
                                    }}
                                  >
                                    <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal', color: 'inherit' }}>₹</span>{priceData.mrp}
                                  </p>
                                  <p className="mb-0 fw-bold">
                                    <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal', color: 'inherit' }}>₹</span>{priceData.sale_price}
                                  </p>
                                </>
                              ) : (
                                <>
                                  <p
                                    className="mb-0"
                                    style={{
                                      textDecoration: 'line-through',
                                      color: '#909090',
                                      fontSize: '0.75rem',
                                    }}
                                  >
                                    ${priceData.mrp_in_dollar}
                                  </p>
                                  <p className="mb-0 fw-bold">
                                    ${priceData.sale_price_in_dollar}
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="col-12 col-lg-4 me-lg-0 me-auto">
              <div
                className="rounded p-4 mb-4"
                style={{ border: '1px solid #FFA500' }}
              >
                <h1 className="fw-bold fs-6">Order Summary</h1>

                <div className="d-flex flex-column mt-2">
                  <div
                    className="d-flex justify-content-between"
                    style={{ borderBottom: '1px solid #CCCCCC' }}
                  >
                    <p className="my-2" style={{ color: '#666666' }}>
                      Price ( {cartItems?.cart_items?.length} Items )
                    </p>
                    {selectedCurrency === 'INR' ? (
                      <p className="my-2 fw-bold"> <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal', color: 'inherit' }}>₹</span> {cartItems?.sub_total}</p>
                    ) : (
                      <p className="my-2 fw-bold">
                        ${cartItems?.sub_total_in_dollar}
                      </p>
                    )}
                  </div>

                  <div
                    className="d-flex justify-content-between"
                    style={{ borderBottom: '1px solid #CCCCCC' }}
                  >
                    <p className="my-2" style={{ color: '#666666' }}>
                      Discount
                    </p>
                    {selectedCurrency === 'INR' ? (
                      <p className="my-2 fw-bold"><span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal', color: 'inherit' }}>₹</span> {cartItems?.discount}</p>
                    ) : (
                      <p className="my-2 fw-bold">
                        ${cartItems?.discount_in_dollar}
                      </p>
                    )}
                  </div>
                  <div
                    className="d-flex justify-content-between"
                    style={{ borderBottom: '1px solid #CCCCCC' }}
                  >
                    <p className="my-2" style={{ color: '#666666' }}>
                      Delivery Charges
                    </p>
                    {selectedCurrency === 'INR' ? (
                      <p className="my-2 fw-bold">
                        <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal', color: 'inherit' }}>₹</span> {cartItems?.delivery_charge}
                      </p>
                    ) : (
                      <p className="my-2 fw-bold">
                        ${cartItems?.delivery_charge_in_dollar}
                      </p>
                    )}
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="my-2" style={{ color: '#666666' }}>
                      Total Amount:
                    </p>
                    {selectedCurrency === 'INR' ? (
                      <p className="my-2 fw-bold">
                        <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal', color: 'inherit' }}>₹</span> {cartItems?.payable_amount}
                      </p>
                    ) : (
                      <p className="my-2 fw-bold">
                        ${cartItems?.payable_amount_in_dollar}
                      </p>
                    )}
                  </div>
                </div>
                <div className="d-flex mt-2 justify-content-center">
                  <button
                    className="border-none text-white px-4 py-2 rounded custom-pointer"
                    style={{ backgroundColor: '#FFA500' }}
                    onClick={() => navigate('/checkout')}
                  >
                    checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ProductFooter />
    </div>
  );
};

export default CartItem;
