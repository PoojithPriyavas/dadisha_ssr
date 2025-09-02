import React, { useContext, useEffect, useState } from "react";
import { message, Rate } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FiShoppingCart } from "react-icons/fi";
import { SlCreditCard } from "react-icons/sl";
import { FiShield } from "react-icons/fi";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { GoShieldCheck } from "react-icons/go";
import { LuCreditCard } from "react-icons/lu";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoShareOutline } from "react-icons/io5";
import { RiLoopLeftFill } from "react-icons/ri";
import { HiDocument } from "react-icons/hi2";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { InputNumber } from "primereact/inputnumber";
import "primereact/resources/themes/saga-blue/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css";
import DOMPurify from "dompurify"; // Import DOMPurify
import "./productdetail.css";
import { use } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../../utilities/customAxios";
import { Context } from "../../../context/context";
import { isTokenValid } from "../../../utilities";
const PrdSecOne = ({ loading, productDetail, setProductDetail }) => {
  console.log(productDetail, "prd details")
  const navigate = useNavigate();
  const { zindexIncrease } = useContext(Context);

  const location = useLocation();


  // const variantsprd = [
  //   {
  //     color: [
  //       {
  //         name: "Black",
  //       },
  //       {
  //         name: "White",
  //       },
  //     ],
  //     size: [
  //       {
  //         name: "Small",
  //       },
  //       {
  //         name: "Medium",
  //       },
  //       {
  //         name: "Large",
  //       },
  //     ],
  //   },
  // ];
  const [activeTab, setActiveTab] = useState("description");
  // State to manage the active image
  const [activeImage, setActiveImage] = useState(null);

  const {
    setOpenBulkOrderPopUp,
    bulkReqSendData,
    setBulkReqSendData,
    selectedCurrency,
    selectedProductIds,
    setSelectedProductIds,
  } = useContext(Context);


  // Zoom functionality
  const handleZoomImage = (e) => {
    const zoomContainer =
      e.currentTarget.parentElement.querySelector(".zoom-container");
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    zoomContainer.style.backgroundPosition = `${x * 100}% ${y * 100}%`;
    zoomContainer.style.display = "block";
  };

  const handleLeaveImageZoom = (e) => {
    const zoomContainer =
      e.currentTarget.parentElement.querySelector(".zoom-container");
    zoomContainer.style.display = "none";
  };

  const addToWishlist = async (slug) => {
    try {
      const response = await axios.post("/disha/add-to-wishlist", {
        product_slug: slug,
      });

      // Check the response data for the message
      if (response.data.message) {
        toast.success(response.data.message);
        setProductDetail(prev => ({ ...prev, wishlist: !prev.wishlist }))
      }
    } catch (error) {
      toast.error("Failed Product updated to wishlist");
      console.error("Error Product updated to wishlist:", error);
    }
  };

  const addToCart = async (variant, slug) => {
    try {
      const response = await axios.post("/disha/add-to-cart", {
        product_slug: slug,
        ...(variant && { variant_id: variant }),
      });
      // console.log('Product added to wishlist:', response.data);
      toast.success("Product added to cart");
    } catch (error) {
      toast.error("Failed to add product to cart");
      console.error("Error adding product to cart:", error);
    }
  };

  const handleFileDownload = async (fileUrl, fileName) => {
    try {
      // Create a temporary anchor element
      const link = document.createElement("a");
      link.href = fileUrl;
      link.target = "_blank";
      link.download = fileName || "document"; // Use provided filename or default to 'document'

      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.error("Failed to download file");
      console.error("Error downloading file:", error);
    }
  };

  const [isChecked, setIsChecked] = useState(
    selectedProductIds.includes(productDetail?.slug)
  );
  useEffect(() => {
    setIsChecked(selectedProductIds.includes(productDetail?.slug));
  }, [selectedProductIds, productDetail?.slug]);

  const handleCheckboxChange = (e) => {
    const productSlug = productDetail?.slug;
    const isChecked = e.target.checked;
    const token = localStorage.getItem('dadishaToken');

    if (!token) {
      toast.error('Please sign in to compare products');
      return;
    }

    let updatedProductIds;

    if (isChecked) {
      if (selectedProductIds.length >= 4) {
        toast.error('Compare available for 4 products at a time');
        return;
      }
      updatedProductIds = [...selectedProductIds, productSlug];
    } else {
      updatedProductIds = selectedProductIds.filter((slug) => slug !== productSlug);
    }

    setSelectedProductIds(updatedProductIds);
    console.log(updatedProductIds, "updated product ids")
    localStorage.setItem(
      "selectedProductIds",
      JSON.stringify(updatedProductIds)
    );
  };



  const shareProductOnWhatsApp = (productName) => {
    const currentUrl = window.location.href; // Get the current URL
    const message = `Check out this product: ${productName} - ${currentUrl}`; // Format the message
    const whatsappUrl = `https://wa.me/6282634660?text=${encodeURIComponent(
      message
    )}`; // Create the WhatsApp link

    window.open(whatsappUrl, "_blank"); // Open the link in a new tab
  };
  /// varient selecttion /////
  //************plan A****************/
  // const allVariants = productDetail.variants;
  // const variantEntries = productDetail.product_variant_entries;

  // // selectedVariantValues = { [variantId]: valueId }  --> {2: 4} for 8GB RAM

  // function getAvailableOptions(selectedVariantValues) {
  //   // Step 1: Filter valid variants
  //   const filteredVariants = allVariants.filter(variant =>
  //     Object.entries(selectedVariantValues).every(([vId, valId]) =>
  //       variant.variant_values.some(vv => vv.variant == vId && vv.value == valId)
  //     )
  //   );

  //   // Step 2: Build possible options for each variant
  //   const optionsMap = {};

  //   filteredVariants.forEach(variant => {
  //     variant.variant_values.forEach(({ variant, value }) => {
  //       if (!optionsMap[variant]) optionsMap[variant] = new Set();
  //       optionsMap[variant].add(value);
  //     });
  //   });

  //   // Step 3: Convert Set to array and map to names
  //   const availableOptions = {};

  //   Object.entries(optionsMap).forEach(([variantId, valueSet]) => {
  //     const entry = variantEntries.find(v => v.id == variantId);
  //     if (entry) {
  //       availableOptions[entry.name] = entry.value.filter(v => valueSet.has(v.id));
  //     }
  //   });

  //   return availableOptions;
  // }

  // const selected = { 2: 4 }; // RAM: 8GB
  // const options = getAvailableOptions(selected);
  // console.log(options,"op")


  //**************PLAN B**************/

  // function getAvailableOptions(selectedVariantValues, allVariants, variantEntries) {
  //   // Step 1: Filter variants that match ALL selected variant values
  //   const filteredVariants = allVariants.filter(variant =>
  //     Object.entries(selectedVariantValues).every(([vId, valId]) =>
  //       variant.variant_values.some(vv => vv.variant == vId && vv.value == valId)
  //     )
  //   );

  //   // Step 2: From remaining variants, build a map of available options for each variant group
  //   const optionsMap = {};

  //   filteredVariants.forEach(variant => {
  //     variant.variant_values.forEach(({ variant, value }) => {
  //       // Skip already selected values — we don't want to overwrite those
  //       if (!selectedVariantValues[variant]) {
  //         if (!optionsMap[variant]) optionsMap[variant] = new Set();
  //         optionsMap[variant].add(value);
  //       }
  //     });
  //   });

  //   // Step 3: Convert sets into usable value-name pairs
  //   const availableOptions = {};

  //   Object.entries(optionsMap).forEach(([variantId, valueSet]) => {
  //     const entry = variantEntries.find(entry => entry.id == variantId);
  //     if (entry) {
  //       availableOptions[entry.name] = entry.value.filter(val => valueSet.has(val.id));
  //     }
  //   });

  //   return availableOptions;
  // }
  // const selected = { 2: 4 }; // RAM = 8GB (variantId 2, valueId 4)
  // const options = getAvailableOptions(selected, productDetail.variants, productDetail.product_variant_entries);

  // console.log(options,"ops")

  // Result:
  // {
  //   Storage: [{ id: 7, name: "128GB" }],
  //   Color: [{ id: 9, name: "Blue" }]
  // }
  //****************PLAN C *************************/
  const [selectedVariantValues, setSelectedVariantValues] = useState({});
  const [activeVariant, setActiveVariant] = useState(null);

  useEffect(() => {
    if (productDetail?.variants?.length > 0) {
      const firstVariant = productDetail.variants[0];
      const initialSelection = {};
      firstVariant.variant_values.forEach(v => {
        initialSelection[v.variant] = v.value;
      });
      setSelectedVariantValues(initialSelection);
      setActiveVariant(firstVariant);
    }
  }, [productDetail]);



  const handleVariantChange = (variantId, valueId) => {
    let updatedSelection = {
      ...selectedVariantValues,
      [variantId]: valueId,
    };

    updatedSelection = autoSelectSingleOptions(updatedSelection);

    const matched = productDetail.variants.find(variant => {

      const valuesMap = {};
      variant.variant_values.forEach(v => {
        valuesMap[v.variant] = v.value;
      });

      return Object.entries(updatedSelection).every(
        ([k, v]) => valuesMap[k] === v
      );
    });

    if (matched) {
      setSelectedVariantValues(updatedSelection);
      setActiveVariant(matched);
    } else {
      let newSelection = { [variantId]: valueId };
      newSelection = autoSelectSingleOptions(newSelection);

      const fallback = productDetail.variants.find(variant => {
        const valuesMap = {};
        variant.variant_values.forEach(v => {
          valuesMap[v.variant] = v.value;
        });

        return Object.entries(newSelection).every(
          ([k, v]) => valuesMap[k] === v
        );
      });

      if (fallback) {
        setSelectedVariantValues(newSelection);
        setActiveVariant(fallback);
      } else {
        setSelectedVariantValues({});
        setActiveVariant(null);
      }
    }
  };


  const autoSelectSingleOptions = (selection) => {
    let updatedSelection = { ...selection };
    let changed = true;

    while (changed) {
      changed = false;
      productDetail.product_variant_entries.forEach(variantType => {
        const availableOptions = getAvailableOptions(updatedSelection, productDetail.variants, variantType.id);

        if (
          !updatedSelection[variantType.id] &&
          availableOptions.size === 1
        ) {
          const onlyOption = Array.from(availableOptions)[0];
          updatedSelection[variantType.id] = onlyOption;
          changed = true;
        }
      });
    }

    return updatedSelection;
  };




  useEffect(() => {
    if (productDetail?.variants?.length > 0) {
      const firstVariant = productDetail.variants[0];

      const initialSelection = {};
      firstVariant.variant_values.forEach(v => {
        initialSelection[v.variant] = v.value;
      });

      setSelectedVariantValues(initialSelection);
      setActiveVariant(firstVariant);
    } else {
      setSelectedVariantValues({});
      setActiveVariant(null);
    }
  }, [productDetail]);



  // const getAvailableOptions = (selected, allVariants, currentType) => {
  //   const matchedVariants = allVariants.filter((variant) => {
  //     const valuesMap = {};
  //     variant.variant_values.forEach(v => {
  //       valuesMap[v.variant] = v.value;
  //     });

  //     return Object.entries(selected).every(
  //       ([k, v]) => k === currentType || valuesMap[k] === v
  //     );
  //   });

  //   const available = new Set();
  //   matchedVariants.forEach((variant) => {
  //     variant.variant_values.forEach((v) => {
  //       if (v.variant === currentType) {
  //         available.add(v.value);
  //       }
  //     });
  //   });

  //   return available;
  // };


  const getAvailableOptions = (selected, allVariants, currentType) => {
    const matchedVariants = allVariants.filter((variant) => {
      const valuesMap = {};
      variant.variant_values.forEach(v => {
        valuesMap[v.variant] = v.value;
      });

      return Object.entries(selected).every(
        ([k, v]) => k === currentType || valuesMap[k] === v
      );
    });

    const available = new Set();
    matchedVariants.forEach((variant) => {
      variant.variant_values.forEach((v) => {
        if (v.variant === currentType) {
          available.add(v.value);
        }
      });
    });

    return available;
  };


  useEffect(() => {
    if (activeVariant?.main_image) {
      setActiveImage(activeVariant.main_image);
    } else if (activeVariant?.additional_images?.length > 0) {
      setActiveImage(activeVariant.additional_images[0]);
    } else if (productDetail?.main_image) {
      setActiveImage(productDetail.main_image);
    } else if (productDetail?.additional_images?.length > 0) {
      setActiveImage(productDetail.additional_images[0]);
    }
  }, [activeVariant, productDetail]);

  // console.log("Active Variant ID:", activeVariant?.id);
  // const getSelectedVariantDetails = () => {
  //   if (!activeVariant || !productDetail?.product_variant_entries) return {};

  //   const selectedVariantDetails = {};

  //   activeVariant.variant_values.forEach((v) => {
  //     const variantType = productDetail.product_variant_entries.find(entry => entry.id === v.variant);
  //     if (variantType) {
  //       const value = variantType.value.find(val => val.id === v.value);
  //       if (value) {
  //         selectedVariantDetails[variantType.name] = value.name;
  //       }
  //     }
  //   });

  //   return selectedVariantDetails;
  // };

  // const selectedVariantDetails = getSelectedVariantDetails();

  // console.log(selectedVariantDetails, "iddd");



  // useEffect(() => {
  //   console.log("Selected Options:", selectedVariantValues);
  //   console.log("Active Variant:", activeVariant);
  // }, [selectedVariantValues, activeVariant]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = activeVariant?.additional_images ?? productDetail?.additional_images ?? [];

  // Default to first image when images change
  useEffect(() => {
    if (images.length > 0) {
      setActiveImageIndex(0);
    }
  }, [images]);

  const handlePrev = () => {
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : prev));
  };

  return (
    <div>
      <div className="container mx-auto details mt-4">
        <p className="mb-0">
          Home <i class="fa-solid fa-chevron-right"></i> Products{" "}
          {/* <i class="fa-solid fa-chevron-right"></i> SubCategory */}
        </p>
        <div className=" min-h-[200px]">
          <div className="row mt-4">
            {/* ------------product main image-------------- */}
            <div className="col-md-5 d-flex flex-column">
              {/* ---------- MAIN IMAGE ---------- */}
              <div
                className={`mainimage rounded p-1 position-relative ${zindexIncrease ? "mainimage-z-plus" : "mainimage-z-minus"
                  }`}
              >
                <img
                  src={images[activeImageIndex] || productDetail?.main_image || productDetail?.additional_images?.[0] || ""}
                  className="h-100 w-100 object-fit-contain"
                  onMouseMove={handleZoomImage}
                  onMouseLeave={handleLeaveImageZoom}
                  alt="Main Product"
                />
                {/* ---------- ZOOM VIEW ---------- */}
                <div
                  className="zoom-container position-absolute bg-white p-1 top-0 overflow-hidden"
                  style={{
                    backgroundImage: `url(${images[activeImageIndex] || productDetail?.main_image || productDetail?.additional_images?.[0] || ""})`,
                    backgroundRepeat: "no-repeat",
                    minHeight: "500px",
                    minWidth: "700px",
                    height: "100%",
                    right: "-710px",
                    zIndex: 10,
                    backgroundSize: "200% 200%",
                  }}
                ></div>

              </div>

              {/* ---------- SWIPER FOR ADDITIONAL IMAGES ---------- */}
              <div className="mt-3 position-relative">
                <Swiper
                  spaceBetween={2}
                  slidesPerView={Math.min(6, images.length)}
                  centeredSlides={false}
                  slidesOffsetBefore={0}
                  slidesOffsetAfter={0}
                  className="my-swiper"
                >
                  {images.map((img_url, i) => (
                    <SwiperSlide key={i}>
                      <div
                        className={`w-full bg-white rounded p-3 cursor-pointer ${activeImageIndex === i ? "borderprimary" : "bordergrey"
                          }`}
                        style={{ height: "6rem", width: "6rem" }}
                        onClick={() => setActiveImageIndex(i)}
                      >
                        <img
                          src={img_url}
                          alt={`Thumbnail ${i + 1}`}
                          className="h-100 w-100 object-scale-down mix-blend-multiply"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Manual Navigation Buttons */}
                <div className="swiper-nav-btns mt-2 flex justify-between w-full px-4">
                  <button
                    onClick={handlePrev}
                    className="swiper-button-prev text-white"
                    disabled={activeImageIndex === 0}
                  >
                    <i className="fa-solid fa-chevron-left"></i>
                  </button>
                  <button
                    onClick={handleNext}
                    className="swiper-button-next text-white"
                    disabled={activeImageIndex === images.length - 1}
                  >
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* ------------product main image-------------- */}
            {/* ------------product details-------------- */}
            {loading ? (
              <div className="col-md-7 d-flex flex-column gap-2 px-3">
                <Skeleton width={200} height={30} />
                <div className="d-flex gap-4 align-items-center">
                  <div className="d-flex gap-2 align-items-center">
                    <Skeleton circle width={20} height={20} />
                    <Skeleton width={60} height={20} />
                    <Skeleton width={30} height={20} />
                    <Skeleton width={80} height={20} />
                  </div>
                  <Skeleton width={100} height={20} />
                </div>
                <Skeleton width="80%" height={20} />
                <div>
                  <div className="d-flex gap-3 text-xl md:text-2xl align-items-center font-medium my-1 flex-wrap mt-0">
                    <Skeleton width={100} height={30} />
                    <Skeleton width={80} height={30} />
                  </div>
                  <div className="d-flex gap-1 text-xl md:text-2xl align-items-center font-medium my-1 flex-wrap">
                    <Skeleton width={150} height={30} />
                  </div>
                </div>
                <div
                  className="d-flex gap-3 align-items-center px-4 py-3 rounded w-fit"
                  style={{
                    backgroundColor: "#FFF7ED",
                    border: "1px solid #FFEDD5",
                  }}
                >
                  <Skeleton width={200} height={20} />
                  <Skeleton width={150} height={30} />
                </div>
                <div className="d-flex gap-2 mt-4">
                  <Skeleton width={120} height={40} />
                  <Skeleton width={120} height={40} />
                </div>
                <div className="d-flex gap-2 mt-4">
                  <Skeleton width={150} height={30} />
                </div>
                <div className="d-flex gap-4 align-items-center mt-4">
                  <Skeleton width={30} height={30} />
                  <Skeleton width={200} height={20} />
                </div>
                <div className="d-flex gap-4 align-items-center mt-4">
                  <Skeleton width={30} height={30} />
                  <Skeleton width={200} height={20} />
                </div>
                <div className="d-flex gap-4 align-items-center mt-4">
                  <Skeleton width={30} height={30} />
                  <Skeleton width={200} height={20} />
                </div>
                <div className="d-flex gap-4 align-items-center mt-4">
                  <Skeleton width={100} height={20} />
                  <Skeleton width={200} height={20} />
                </div>
              </div>)
              :

              <>
                <div className="col-md-6 d-flex flex-column gap-2 px-3">
                  <h2 className="pname ">{productDetail?.name}</h2>
                  <div className="d-flex gap-4 align-items-center">
                    <div className="d-flex gap-2 align-items-center">
                      {productDetail?.average_rating && (
                        <div className="d-flex align-items-center ">
                          <Rate
                            allowHalf
                            disabled
                            defaultValue={productDetail?.average_rating}
                            className="text-base-color"
                            style={{ zIndex: -10 }}
                          />
                        </div>
                      )}

                      <div className="border border-1 rounded px-3 py-1" style={{ borderColor: "#b7aaaa80" }}>{productDetail?.average_rating}</div>
                      <div className="font-noto">|</div>
                      <div className="font-poppins"><span className="font-noto">HSN </span>{productDetail?.hsn_code}</div>
                    </div>
                    {productDetail?.sku && (
                      <p className="mb-0">
                        SKU : <span className="fw-bold">{productDetail?.sku}</span>
                      </p>
                    )}
                  </div>
                  <p
                    className="text-muted mb-0"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        productDetail?.short_description || ""
                      ),
                    }}
                  />
                  <div>
                    <div className="d-flex gap-3 text-xl md:text-2xl align-items-center font-medium my-1 flex-wrap mt-0">
                      {selectedCurrency === "INR" ? (
                        <>
                          <p className="detailprice mb-0">
                            <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal', color: 'inherit' }}>₹</span>{activeVariant?.sale_price ?? productDetail?.sale_price}
                          </p>
                          <p className="text-muted text-decoration-line-through mb-0">
                            <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal', color: 'inherit' }}>₹</span>{activeVariant?.mrp ?? productDetail?.mrp}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="detailprice mb-0">
                            $ {activeVariant?.sale_price_in_dollar ?? productDetail?.sale_price_in_dollar}
                          </p>
                          <p className="text-muted text-decoration-line-through mb-0">
                            $ {activeVariant?.mrp_in_dollar ?? productDetail?.mrp_in_dollar}
                          </p>
                        </>
                      )}
                    </div>


                    {productDetail.minimum_order_quantity > 1 ? (
                      <>
                        <div className='d-flex gap-1 text-xl md:text-2xl align-items-center font-medium my-1 flex-wrap' style={{ display: 'flex', alignItems: 'center' }}>
                          <div className="d-flex gap-1 align-items-center px-2 py-1 rounded w-fit" style={{
                            display: 'flex', alignItems: 'center', backgroundColor: "#FFF7ED",
                            border: "1px solid #FFEDD5"
                          }}> <img src="/images/assets/price_tag.png" style={{ height: '20px' }} /><p className="font-poppins" style={{ marginBottom: '0px', fontWeight: 400, fontSize: '12px' }}>Wholesale</p>
                          </div>
                          <div className="d-flex gap-1 align-items-center px-2 py-1 rounded w-fit" style={{
                            display: 'flex', alignItems: 'center', backgroundColor: "#FFF7ED",
                            border: "1px solid #FFEDD5"
                          }}>
                            <p style={{ fontSize: '12px', color: 'red', marginBottom: '0px' }}>Minimum Order Quantity : <span>{productDetail.minimum_order_quantity}</span></p>
                          </div>
                        </div>
                        <div className='d-flex gap-3 text-xl md:text-2xl align-items-center font-medium my-1 flex-wrap min-qty'>
                          <h6 className="font-poppins" style={{ marginLeft: '5px', marginBottom: '0px', color: 'green', fontWeight: 600 }}>{activeVariant?.discount_in_percentage} % off</h6>
                        </div>
                      </>
                    ) : (
                      <div className='d-flex gap-3 text-xl md:text-2xl align-items-center font-medium my-1 flex-wrap min-qty'>
                        {activeVariant?.discount_percentage &&
                          <h6 className="font-poppins" style={{ marginLeft: '5px', marginBottom: '0px', color: 'green', fontWeight: 600 }}>{Number(activeVariant?.discount_percentage).toFixed(2)} % off</h6>
                        }
                      </div>
                    )}


                    {(activeVariant?.off || productDetail?.off) || (activeVariant?.off_in_dollar || productDetail?.off_in_dollar) ? (
                      <p className="mb-2" style={{ color: "#16A34A" }}>
                        {selectedCurrency === "INR"
                          ? (activeVariant?.off ?? productDetail?.off)
                          : (activeVariant?.off_in_dollar ?? productDetail?.off_in_dollar)}
                        % OFF
                      </p>
                    ) : null}

                  </div>
                  <div
                    className="d-flex gap-3 align-items-center px-4 py-3 rounded w-fit"
                    style={{
                      backgroundColor: "#FFF7ED",
                      border: "1px solid #FFEDD5",
                    }}
                  >
                    <p className="mb-0  text-p">
                      <span className="fw-bold fs-6 "> Need Bulk Orders</span> & we
                      are there for you{" "}
                    </p>
                    <button
                      className="px-4  text-white py-1 border-none"
                      onClick={() => {
                        setOpenBulkOrderPopUp(true);
                        setBulkReqSendData((prev) => ({ ...prev, message: `${prev.message}Product id: ${productDetail?.id || "N/A"}\nHSN Code: ${productDetail?.hsn_code || "N/A"}` }))
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      style={{
                        backgroundColor: "#FFA500",
                        borderRadius: "6px",
                        fontSize: "12px",
                      }}
                    >
                      APPLY FOR BULK ORDER
                    </button>
                  </div>
                  <div className="d-flex gap-2 mt-4">
                    {isTokenValid() ? (
                      <button
                        className="detailbtn-pri rounded px-4 d-flex align-items-center justify-content-center gap-2 py-2"
                        onClick={() => addToWishlist(productDetail?.slug)}
                      >
                        <IoMdHeartEmpty className="fs-5" />
                        {productDetail?.wishlist ? "Added to wishlist" : "Add to wishlist"}
                      </button>
                    ) : (
                      <button
                        className="detailbtn-pri rounded px-4 d-flex align-items-center justify-content-center gap-2 py-2"
                        onClick={() => {
                          navigate("/signin");
                        }}
                      >
                        <IoMdHeartEmpty className="fs-5" />
                        Add to wishlist
                      </button>
                    )}

                    {isTokenValid() ? (
                      <button
                        className={`${(activeVariant
                          ? activeVariant.quantity === 0
                          : productDetail?.stock === 0) ? "disablebtn" : "detailbtn-sec"} rounded px-4 d-flex align-items-center justify-content-center gap-2 py-2`}
                        onClick={() => addToCart(
                          activeVariant ? activeVariant.id : undefined
                          , productDetail?.slug
                        )}
                        disabled={activeVariant ? activeVariant.quantity === 0 : productDetail?.stock === 0}
                      >
                        <FiShoppingCart />
                        Add To Cart
                      </button>
                    ) : (
                      <button
                        className={`${(activeVariant
                          ? activeVariant.quantity === 0
                          : productDetail?.stock === 0) ? "disablebtn" : "detailbtn-sec"} rounded px-4 d-flex align-items-center justify-content-center gap-2 py-2`}
                        onClick={() => navigate('/signin')}
                        disabled={activeVariant ? activeVariant.quantity === 0 : productDetail?.stock === 0}
                      >
                        <FiShoppingCart />
                        Add To Cart
                      </button>
                    )}
                  </div>
                  {Array.isArray(productDetail.product_variant_entries) && productDetail.product_variant_entries.length > 0 && (
                    <div className="">
                      {/* {productDetail.product_variant_entries.map((variant) => (
                        <div className="d-flex gap-2 mt-3 align-items-center" key={variant.id}>
                          <h5 className="fs-6 mb-0 fw-bold" style={{ color: "#6B7280" }}>
                            {variant.name.charAt(0).toUpperCase() + variant.name.slice(1)}
                          </h5>
                          <div className="d-flex flex-wrap gap-2">
                            {variant.value.map((val, idx) => (
                              <div
                                key={val.id}
                                className={`variant-option me-2 px-2 py-1 rounded border ${idx === 0 ? 'border-primary bg-light' : 'border-[#dcdcdc]'
                                  } cursor-pointer`}
                              >
                                {val.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))} */}
                      {productDetail.product_variant_entries.map((variant) => {
                        const availableOptions = getAvailableOptions(selectedVariantValues, productDetail.variants, variant.id);

                        return (
                          <div key={variant.id} className="d-flex align-items-start gap-3 mt-3">
                            {/* Label - fixed width */}
                            <div style={{ minWidth: '100px' }}>
                              <h5 className="fs-6 mb-1 fw-bold text-secondary">
                                {variant.name.charAt(0).toUpperCase() + variant.name.slice(1)}
                              </h5>
                            </div>

                            {/* Options */}
                            <div className="d-flex flex-wrap gap-2">
                              {variant.value.map((val) => {
                                const isManuallySelected = selectedVariantValues[variant.id] === val.id;

                                const isAutoSelectedByActiveVariant = activeVariant?.variant_values?.some(v =>
                                  v.variant === variant.id && v.value === val.id
                                );

                                const isAvailable = availableOptions.has(val.id);

                                let classes = "variant-option px-2 py-1 rounded border";
                                if (isAutoSelectedByActiveVariant || isManuallySelected) {
                                  classes += " border-warning bg-light";
                                }
                                if (!isAvailable) {
                                  classes += " text-muted";
                                }

                                return (
                                  <div
                                    key={val.id}
                                    onClick={() => handleVariantChange(variant.id, val.id)}
                                    className={classes}
                                    style={{
                                      color: isAvailable ? "" : "#999",
                                      cursor: "pointer",
                                      opacity: isAvailable ? 1 : 0.6,
                                    }}
                                    title={!isAvailable ? "Not available with current selection" : ""}
                                  >
                                    {val.name}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <div className="card-sec">
                    <div className="d-flex gap-3 align-items-start" style={{ padding: '10px' }}>
                      <LuCreditCard className="fs-1" />
                      <p className="mb-0 fs-6" style={{ color: '#9e9e9e' }}>
                        <span style={{ color: '#6B7280', fontWeight: 500 }}>Payment. </span>Payment upon receipt of goods, Payment by card in the
                        department, Google Pay, Online card
                      </p>
                    </div>
                    <div style={{ borderTop: '1px solid #E5E7EB', margin: '0px' }}></div>
                    <div className="d-flex gap-3 align-items-start" style={{ padding: '10px' }}>
                      {/* <FiShield className="fs-3" /> */}
                      <GoShieldCheck className="fs-3" />
                      <p className="mb-0 fs-6" style={{ color: '#9e9e9e' }}>
                        <span style={{ color: '#6B7280', fontWeight: 500 }}>Warranty.</span> This product is under warranty. Check for detailed
                        warranty notes
                      </p>
                    </div>
                  </div>

                  <div className="d-flex gap-4 align-items-center mt-4">
                    <div className="d-flex gap-2 align-items-center fw-bold">
                      <IoShareOutline className="fs-5" />
                      <p
                        className="mb-0 fs-6 custom-pointer"
                        onClick={() => shareProductOnWhatsApp(productDetail?.name)}
                      >
                        Share this Product
                      </p>
                    </div>
                    <div className="d-flex gap-2 align-items-center fw-bold">
                      <div className="d-flex gap-2 align-items-center fw-bold">
                        <input
                          type="checkbox"
                          className="w-10 h-10"
                          checked={isChecked}
                          onChange={handleCheckboxChange}
                        />
                        <p className="mb-0 fs-6 whitespace-nowrap">
                          Add to Compare
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 mt-4">
                  <div className="tab-switcher">
                    <h5 className="text-black fw-700">Product Details</h5>
                  </div>

                  {activeTab === "description" && (
                    <div className="mt-4">
                      <p
                        className="text-editor"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(
                            productDetail?.long_description || ""
                          ),
                        }}
                      />
                    </div>
                  )}

                  {activeTab === "review" && (
                    <div className="mt-4">
                      <p>
                        review section Quisque varius diam vel metus mattis, id
                        aliquam diam rnoncus. Proin vitae magna in dui finibus
                        malesuada et at nulla. Morbi elit ex, viverra vitae ante
                        vel, blandit feugiat ligula. Fusce fermentum laculis nith,
                        at sodales leo maximus a. Nullam ultricies sodales nunc, in
                        pelentesque lorem mattis quis. Cras imperdiet est in nunc
                        tristique lacinia. Nullam aliquam mauris eu accumsan
                        tincidunt. Suspendisse velit ex, aliquet vel ornare vel,
                        dignissim a tortor.
                      </p>
                    </div>
                  )}
                </div>
                {/* {productDetail?.specifications && (
                  console.log(productDetail?.specifications),
                  <div className="col-12 tab-switcher mt-4">
                    <button className="active px-0 bg-white fw-700">
                      Product Specifications
                    </button>
                    <div
                      className="mt-4"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(productDetail?.specifications || "", { ALLOWED_TAGS: ['ul', 'li', 'p', 'strong'] }),
                      }}
                    />


                  </div>
                )} */}

                {productDetail?.specifications && (
                  console.log(productDetail?.specifications),
                  <div className="col-12 tab-switcher mt-4">
                    <button className="active px-0 bg-white fw-700">
                      Product Specifications
                    </button>
                    <div
                      className="mt-4 specification-html-content"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          productDetail?.specifications || '',
                          { ALLOWED_TAGS: ['ul', 'li', 'p', 'strong'] }
                        ),
                      }}
                    />
                  </div>
                )}

                {productDetail?.in_the_box && (
                  <div className=" tab-switcher mt-4">
                    <button className="active px-0 bg-white fw-700">
                      In the box
                    </button>
                    {/* <ol className="mt-3" style={{ listStyleType: 'disc' }}>
   <li>1 Surgical Gown, Pair Glove, 2 Mask, Pair Shoe cover</li>
 </ol> */}
                    <div
                      className="mt-4"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(productDetail?.in_the_box || ""),
                      }}
                    />
                  </div>
                )}

                {productDetail?.key_features && (
                  <div className="tab-switcher mt-4">
                    <button className="active px-0 bg-white fw-700">
                      Key Features
                    </button>
                    <p
                      className="mt-4 key-features"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(productDetail?.key_features || ""),
                      }}
                    />
                  </div>
                )}
                {productDetail?.resources?.length > 0 && (
                  <div className="tab-switcher mt-4">
                    <button className="active px-0 mb-4 bg-white fw-700">
                      Resources
                    </button>
                    <div className="row g-3">
                      {productDetail?.resources?.map((item, index) => (
                        <div
                          className="col-12 col-md-6"
                          key={index}
                          onClick={() => handleFileDownload(item.file, item.name)}
                        >
                          <div
                            className="d-flex gap-3 p-2 rounded align-items-center custom-pointer h-100"
                            style={{ border: "dashed 1.5px #e3e3eccc" }}
                          >
                            <div
                              className="px-2 py-2 rounded"
                              style={{
                                backgroundColor: "#ffbebe99",
                                height: "fit-content",
                              }}
                            >
                              <HiDocument className="text-danger fs-3" />
                            </div>
                            <p className="mb-0">{item.name}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {productDetail?.standard_certificates?.length > 0 && (
                  <div className="tab-switcher mt-4">
                    <button className="active px-0 mb-4 bg-white fw-700">
                      Standard Certificates
                    </button>
                    <div className="row g-3">
                      {productDetail?.standard_certificates?.map((item, index) => (
                        <div
                          className="col-12 col-md-6"
                          key={index}
                          onClick={() => handleFileDownload(item.file, item.name)}
                        >
                          <div
                            className="d-flex gap-3 p-2 rounded align-items-center custom-pointer h-100"
                            style={{ border: "dashed 1.5px #e3e3eccc" }}
                          >
                            <div
                              className="px-2 py-2 rounded"
                              style={{
                                backgroundColor: "#ffbebe99",
                                height: "fit-content",
                              }}
                            >
                              <HiDocument className="text-danger fs-3" />
                            </div>
                            <p className="mb-0">{item.name}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}


                <div className=" tab-switcher mt-4">
                  <button className="active px-0 mb-4 bg-white fw-700 ">
                    Sold By
                  </button>
                  <div
                    className="d-flex  flex-wrap flex-sm-nowrap gap-2 gap-sm-4"
                  // style={{ gridTemplateColumns: '1fr 1fr' }}
                  >
                    <h6>Dadisha PVT LTD</h6>
                  </div>
                  <div
                    className="d-flex  flex-wrap flex-sm-nowrap gap-2 gap-sm-4"
                  // style={{ gridTemplateColumns: '1fr 1fr' }}
                  >
                    <p>Dadisha PVT LTD commited to providing each customer with highest standard of customer service </p>
                  </div>
                </div>
              </>}
            {/* ------------product details-------------- */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrdSecOne;
