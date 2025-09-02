// import React from "react";

// export default function Payment() {
//   const handlePayment = async () => {
//     const options = {
//       key: "rzp_test_b5pQrAEedx98XZ", 
//       amount: 1000,
//       currency: "INR",
//       name: "Dadisha PVT LTD",
//       description: "Test Transaction",
//       order_id: "order_QAXTLhvHtJ7EJW", 
//       handler: function (response) {
//         console.log("Payment Successful!", response);
//         alert("Payment Successful!");
//       },
//       prefill: {
//         name: "test",
//         email: "test@example.com",
//         contact: "1234567890",
//       },
//       theme: {
//         color: "#F37254",
//       },
//     };

//     const razorpayInstance = new window.Razorpay(options);
//     razorpayInstance.open();
//   };

//   return (
//     <div>
//       <button onClick={handlePayment}>Pay</button>
//     </div>
//   );
// }

// App.js
import React, { useState } from 'react';
import './payment.css';


// Sample category data structure
const categories = [
  {
    id: 1,
    name: 'Electronics',
    subCategories: [
      { id: 11, name: 'Mobile Phones' },
      { id: 12, name: 'Laptops' },
      { id: 13, name: 'Headphones' },
    ],
  },
  {
    id: 2,
    name: 'Furniture',
    subCategories: [
      { id: 21, name: 'Sofas' },
      { id: 22, name: 'Beds' },
      { id: 23, name: 'Chairs' },
    ],
  },
  {
    id: 3,
    name: 'Clothing',
    subCategories: [
      { id: 31, name: 'Men\'s Wear' },
      { id: 32, name: 'Women\'s Wear' },
    ],
  },
];

const Payment = () => {

  const toggleSubCategory = (categoryId) => {
    if (activeCategory === categoryId) {
      setActiveCategory(null); // Close the category if it's already open
    } else {
      setActiveCategory(categoryId); // Open the clicked category
    }
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const handleBack = () => setActiveCategory(null);

  return (
    <div>
    {!menuOpen && (
      <button className="menu-icon" onClick={() => setMenuOpen(true)}>
        <i className="fa-solid fa-bars fa-2x"></i>
      </button>
    )}

    {/* Main Menu */}
    <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
      <ul className="menu-list">
        {categories.map((cat) => (
          <li
            key={cat.id}
            onClick={() => setActiveCategory(cat)}
            className="menu-item"
          >
            {cat.name}
            <i className="fa-solid fa-arrow-right submenu-icon"></i>
          </li>
        ))}
      </ul>
    </div>

    {/* Subcategory Panel */}
    <div className={`side-submenu ${activeCategory ? 'open' : ''}`}>
      {activeCategory && (
        <>
          <button className="back-btn" onClick={() => setActiveCategory(null)}>
            <i className="fa-solid fa-arrow-right back-icon rotated"></i> Back
          </button>
          <h3>{activeCategory.name}</h3>
          <ul className="sub-menu-list">
            {activeCategory.subCategories.map((sub) => (
              <li key={sub.id} className="menu-item">
                {sub.name}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  </div>
  );
};

export default Payment;
