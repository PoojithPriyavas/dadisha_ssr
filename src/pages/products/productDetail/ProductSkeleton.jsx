import React from "react";
import "./ProductSkeleton.css";

const ProductDetailSkeleton = () => {
  return (
    <div className="container">
    <div className="prdsec-wrapper skeleton-loading">
    <div className="image-section">
      <div className="mainimage skeleton-box image-skeleton"></div>
    </div>

    <div className="details">
      <div className="pname skeleton-box" style={{ width: '70%' }}></div>
      <div className="detailprice skeleton-box" style={{ width: '30%' }}></div>

      <div className="quantity-section">
        <div className="p-inputnumber-button skeleton-box"></div>
        <div className="p-inputnumber-input skeleton-box" style={{ width: '50px' }}></div>
        <div className="p-inputnumber-button skeleton-box"></div>
      </div>

      <div className="button-section">
        <div className=" skeleton-box" style={{ width: '140px', height: '40px' }}></div>
        <div className=" skeleton-box" style={{ width: '140px', height: '40px' }}></div>
      </div>

      <div className="key-features">
        <div className="skeleton-box" style={{ width: '120px', height: '20px' }}></div>
        <ul>
          <li className="skeleton-box" style={{ width: '80%' }}></li>
          <li className="skeleton-box" style={{ width: '60%' }}></li>
          <li className="skeleton-box" style={{ width: '70%' }}></li>
        </ul>
      </div>
    </div>
  </div>
  </div>
  );
};

export default ProductDetailSkeleton;
