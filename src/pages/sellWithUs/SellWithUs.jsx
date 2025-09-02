import React, { useState } from 'react';
import Header from '../../components/Header';
import SubCategoryHeader from '../../components/subCategoryHeader/SubCategoryHeader';
import { FaCheck } from 'react-icons/fa6';
import SellWithUsForm from './SellWithUsForm';
import ProductFooter from '../products/ProductFooter';

export default function SellWithUs() {
  const [activeTab, setActiveTab] = useState('createaccount');

  const handleTabClick = tabId => {
    setActiveTab(tabId);
  };

  const scrollRegisterForm = () => {
    const element = document.getElementById('sell-with-us-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div>
      <Header />
      <div className="mtheads">
        {/* <SubCategoryHeader /> */}
      </div>
      <div className="container mx-auto mt-4">
        <div className="row row-cols-1 row-cols-md-2">
          <div className="d-flex justify-content-center flex-column">
            <h1 className="fw-600">Sell Internationally With </h1>
            <h1 className="fw-600 text-p">0% Commission!</h1>

            <p className="lead mt-2 fw-400">
              Zero Registration Fees | Keep 100% Of Your Profits
            </p>
            <p className="lead fw-400" style={{ color: '#7C7C7C' }}>
              Join Now & Start Selling Worldwide!
            </p>
            <button className="bg-p text-white rounded px-5 py-2 border-none w-fit mt-2" onClick={scrollRegisterForm}>
              Start Selling
            </button>
          </div>
          <div className="p-5 d-flex justify-content-center align-items-center">
            <div className="seller-image">
              <img
                src="/img/seller-bg-2.jpg"
                alt="dadisha seller image"
                className="w-100 h-100 object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-center mb-4">
            Why Sellers Trust Dadisha Marketplace
          </h3>
          <p
            className="text-center lead fs-5 my-4 fw-400 px-3 px-md-5 px-lg-5 px-xl-5"
          // style={{ padding: '0px 12rem' }}
          >
            We make selling simple, profitable, and hassle-free so you can focus
            on growing your business. Whether you're a small business, a large
            supplier, or a first-time seller, our platform is designed to help
            you succeed in the global market.
          </p>
          <div
            className="d-flex flex-column flex-md-row rounded p-5 gap-5 mt-6"
            style={{ border: '1px solid #FFA50080' }}
          >
            <div className="" style={{ flex: 1 }}>
              <ul className="list-unstyled">
                <li className="mb-3">
                  <div className="d-flex gap-4">
                    <div
                      className="rounded-full d-flex justify-content-center align-items-center"
                      style={{
                        border: '2px solid #fbae24',
                        width: '30px', // Increased size
                        height: '30px', // Increased size
                        minWidth: '30px',
                        background: '#ffedcb',
                      }}
                    >
                      <FaCheck className="text-p" /> {/* Adjusted icon size */}
                    </div>
                    <div style={{ borderBottom: '1px solid #FFA50080' }}>
                      <strong>0% Commission Fee</strong>
                      <p className="mb-4">
                        Sellers Keep 100% Of Their Profits—No Hidden Charges, No
                        Commission Fees.
                      </p>
                    </div>
                  </div>
                </li>
                <li className="mb-3">
                  <div className="d-flex gap-4">
                    <div
                      className="rounded-full d-flex justify-content-center align-items-center"
                      style={{
                        border: '2px solid #fbae24',
                        width: '30px', // Increased size
                        height: '30px', // Increased size
                        minWidth: '30px',
                        background: '#ffedcb',
                      }}
                    >
                      <FaCheck className="text-p" /> {/* Adjusted icon size */}
                    </div>
                    <div style={{ borderBottom: '1px solid #FFA50080' }}>
                      <strong>Fast & Secure Payments</strong>
                      <p className="mb-4">
                        Get Paid Within 7 Days Of Order Delivery—Safe, Reliable,
                        And Hassle-Free.
                      </p>
                    </div>
                  </div>
                </li>
                <li className="mb-3">
                  <div className="d-flex gap-4">
                    <div
                      className="rounded-full d-flex justify-content-center align-items-center"
                      style={{
                        border: '2px solid #fbae24',
                        width: '30px', // Increased size
                        height: '30px', // Increased size
                        minWidth: '30px',
                        background: '#ffedcb',
                      }}
                    >
                      <FaCheck className="text-p" /> {/* Adjusted icon size */}
                    </div>
                    <div style={{ borderBottom: '1px solid #FFA50080' }}>
                      <strong>Easy Product Listing</strong>
                      <p className="mb-4">
                        List Your Products In Just A Few Clicks—No Technical
                        Skills Required.
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="" style={{ flex: 1 }}>
              <ul className="list-unstyled">
                <li className="mb-3">
                  <div className="d-flex gap-4">
                    <div
                      className="rounded-full d-flex justify-content-center align-items-center"
                      style={{
                        border: '2px solid #fbae24',
                        width: '30px', // Increased size
                        height: '30px', // Increased size
                        minWidth: '30px',
                        background: '#ffedcb',
                      }}
                    >
                      <FaCheck className="text-p" /> {/* Adjusted icon size */}
                    </div>
                    <div style={{ borderBottom: '1px solid #FFA50080' }}>
                      <strong>Sell Internationally With Ease</strong>
                      <p className="mb-4">
                        Reach Millions Of Customers Worldwide And Expand Your
                        Business Across Borders Effortlessly.
                      </p>
                    </div>
                  </div>
                </li>
                <li className="mb-3">
                  <div className="d-flex gap-4">
                    <div
                      className="rounded-full d-flex justify-content-center align-items-center"
                      style={{
                        border: '2px solid #fbae24',
                        width: '30px', // Increased size
                        height: '30px', // Increased size
                        minWidth: '30px',
                        background: '#ffedcb',
                      }}
                    >
                      <FaCheck className="text-p" /> {/* Adjusted icon size */}
                    </div>
                    <div style={{ borderBottom: '1px solid #FFA50080' }}>
                      <strong>Growth For Every Seller</strong>
                      <p className="mb-4">
                        Whether You're A Small Business, A Large Supplier,
                        Branded, Or Unbranded, We Help You Scale Seamlessly.
                      </p>
                    </div>
                  </div>
                </li>
                <li className="mb-3">
                  <div className="d-flex gap-4">
                    <div
                      className="rounded-full d-flex justify-content-center align-items-center"
                      style={{
                        border: '2px solid #fbae24',
                        width: '30px', // Increased size
                        height: '30px', // Increased size
                        minWidth: '30px',
                        background: '#ffedcb',
                      }}
                    >
                      <FaCheck className="text-p" /> {/* Adjusted icon size */}
                    </div>
                    <div
                      className=""
                      style={{ borderBottom: '1px solid #FFA50080' }}
                    >
                      <strong>Lowest Cost Shipping</strong>
                      <p className="mb-4">
                        Enjoy affordable, hassle-free global logistics with
                        trusted shipping partners, ensuring seamless delivery,
                        reliable service
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="mb-4 text-left">How It Works</h3>
          <div className="row">
            <div className="col-md-4 d-flex flex-column gap-2">
              <div
                className={`d-flex justify-items-center align-items-center gap-4 px-4 py-3 rounded  custom-pointer ${activeTab === 'createaccount' ? 'borderprimary' : ''
                  }`}
                onClick={() => handleTabClick('createaccount')}
              >
                <div
                  className="rounded-full d-flex justify-content-center align-items-center"
                  style={{
                    border: '2px solid #fbae24',
                    width: '30px', // Increased size
                    height: '30px', // Increased size
                    minWidth: '30px',
                    background: '#ffedcb',
                  }}
                >
                  <FaCheck className="text-p" /> {/* Adjusted icon size */}
                </div>
                <h5 className="fs-6 mb-0">Create Account</h5>
              </div>
              <div
                className={`d-flex justify-items-center align-items-center gap-4 px-4 py-3 rounded  custom-pointer  ${activeTab === 'listproducts' ? 'borderprimary' : ''
                  }`}
                onClick={() => handleTabClick('listproducts')}
              >
                <div
                  className="rounded-full d-flex justify-content-center align-items-center"
                  style={{
                    border: '2px solid #fbae24',
                    width: '30px',
                    height: '30px',
                    minWidth: '30px',
                    background: '#ffedcb',
                  }}
                >
                  <FaCheck className="text-p" />
                </div>
                <h5 className="fs-6 mb-0 ">List Products</h5>
              </div>
              <div
                className={`d-flex justify-items-center align-items-center gap-4 px-4 py-3 rounded  custom-pointer  ${activeTab === 'storageandshipping' ? 'borderprimary' : ''
                  }`}
                onClick={() => handleTabClick('storageandshipping')}
              >
                <div
                  className="rounded-full d-flex justify-content-center align-items-center"
                  style={{
                    border: '2px solid #fbae24',
                    width: '30px', // Increased size
                    height: '30px', // Increased size
                    minWidth: '30px',
                    background: '#ffedcb',
                  }}
                >
                  <FaCheck className="text-p" /> {/* Adjusted icon size */}
                </div>
                <h5 className="fs-6 mb-0">Storage & Shipping</h5>
              </div>
              <div
                className={`d-flex justify-items-center align-items-center gap-4 px-4 py-3 rounded  custom-pointer  ${activeTab === 'receivepayment' ? 'borderprimary' : ''
                  }`}
                onClick={() => handleTabClick('receivepayment')}
              >
                <div
                  className="rounded-full d-flex justify-content-center align-items-center"
                  style={{
                    border: '2px solid #fbae24',
                    width: '30px', // Increased size
                    height: '30px', // Increased size
                    minWidth: '30px',
                    background: '#ffedcb',
                  }}
                >
                  <FaCheck className="text-p" /> {/* Adjusted icon size */}
                </div>
                <h5 className="fs-6 mb-0">Receive Payment</h5>
              </div>


              <div
                className={`d-flex justify-items-center align-items-center gap-4 px-4 py-3 rounded  custom-pointer  ${activeTab === 'sellerportal' ? 'borderprimary' : ''
                  }`}
                onClick={() => handleTabClick('sellerportal')}
              >
                <div
                  className="rounded-full d-flex justify-content-center align-items-center"
                  style={{
                    border: '2px solid #fbae24',
                    width: '30px', // Increased size
                    height: '30px', // Increased size
                    minWidth: '30px',
                    background: '#ffedcb',
                  }}
                >
                  <FaCheck className="text-p" /> {/* Adjusted icon size */}
                </div>
                <h5 className="fs-6 mb-0">Seller Portal</h5>
              </div>
            </div>
            <div className="col-md-8">
              {activeTab === 'createaccount' && (
                <div id="createaccount" className="">
                  <h5
                    className="fs-6 fw-600 p-1 w-fit"
                    style={{ borderBottom: '2px solid #fbae24' }}
                  >
                    Create Account
                  </h5>
                  <p className="mt-4 fw-500 lh-lg fs-6">
                    Join Dadisha MarketPlace and start selling globally with a
                    fast and effortless registration process. With just a few
                    essential documents, you can create your seller account in
                    minutes. Follow our simple onboarding steps to unlock new
                    markets, reach international customers, and grow your
                    business without delays.
                  </p>
                  <button className="bg-p text-white py-1 px-4 border-none rounded" onClick={scrollRegisterForm}>
                    Join Us
                  </button>
                </div>
              )}

              {activeTab === 'listproducts' && (
                <div id="listproducts" className="mb-5">
                  <h5
                    className="fs-6 fw-600 p-1 w-fit"
                    style={{ borderBottom: '2px solid #fbae24' }}
                  >
                    List Products
                  </h5>
                  <p className="mt-4 fw-500 lh-lg fs-6">
                    A listing is the process of showcasing your products on
                    [Your Platform Name], making them available to a global
                    audience. It involves creating a detailed product page with
                    key information such as title, description, high-quality
                    images, pricing, and specifications. A well-optimized
                    listing enhances visibility, attracts potential buyers, and
                    boosts your sales. Start listing your products today and
                    expand your reach effortlessly!
                  </p>
                  <button className="bg-p text-white py-1 px-4 border-none rounded">
                    Demo Video
                  </button>
                </div>
              )}

              {activeTab === 'storageandshipping' && (
                <div id="storageandhipping" className="mb-5">
                  <h5
                    className="fs-6 fw-600 p-1 w-fit"
                    style={{ borderBottom: '2px solid #fbae24' }}
                  >
                    Storage & Shipping
                  </h5>
                  <p className="mt-4 fw-600 lh-lg fs-6 mb-0">
                    Congratulations on Your First Order! 🎉
                  </p>
                  <p className="fw-500 lh-lg fs-6">
                    Shipping is a crucial part of delivering a great customer
                    experience, and at [Your Platform Name], we offer two
                    flexible fulfillment options to suit your business needs:
                  </p>
                  <p className="mt-4 fw-600 lh-lg fs-6 mb-0">
                    Dadisha Partnered Delivery 🚚
                  </p>
                  <ol style={{ listStyleType: 'disc' }}>
                    <li className="fw-500 lh-lg fs-6">
                      Our trusted delivery agents handle everything—from pickup
                      to doorstep delivery.
                    </li>
                    <li className="fw-500 lh-lg fs-6">
                      A pickup is scheduled from your location, ensuring a
                      seamless process.
                    </li>
                    <li className="fw-500 lh-lg fs-6">
                      Delivery charges are automatically deducted from your
                      payout based on product dimensions, weight, and delivery
                      distance.
                    </li>
                    <li className="fw-500 lh-lg fs-6">
                      Hassle-free logistics so you can focus on growing your
                      business.
                    </li>
                  </ol>
                  <p className="mt-4 fw-600 lh-lg fs-6 mb-0">
                    Self-Managed Delivery 📦
                  </p>
                  <ol style={{ listStyleType: 'disc' }}>
                    <li className="fw-500 lh-lg fs-6">
                      You can use your own delivery agents or preferred
                      logistics partners.
                    </li>
                    <li className="fw-500 lh-lg fs-6">
                      You manage the shipping process, and the delivery cost is
                      handled by you.
                    </li>
                    <li className="fw-500 lh-lg fs-6">
                      Greater flexibility and control over your shipping
                      strategy.
                    </li>
                  </ol>
                  <p className="mt-4 fw-600 lh-lg fs-6 mb-0">
                    Product Replacements :
                  </p>
                  <ol style={{ listStyleType: 'disc' }}>
                    <li className="fw-500 lh-lg fs-6">
                      If a product replacement is required, the delivery charge
                      set by the user will be deducted from the seller’s payout
                      to cover logistics costs.
                    </li>
                  </ol>
                  <div className="borderprimary rounded">
                    <div className="fw-500 lh-lg fs-6 px-4 py-2">
                      Replacements are only allowed for defective, damaged, or
                      missing products after verification. Users must provide an
                      unboxing video and proof for approval before a replacement
                      is initiated.
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'receivepayment' && (
                <div id="receivepayment" className="mb-5">
                  <h5
                    className="fs-6 fw-600 p-1 w-fit"
                    style={{ borderBottom: '2px solid #fbae24' }}
                  >
                    Receive Payment
                  </h5>
                  <p className="mt-4 fw-500 lh-lg fs-6">
                    At Dadisha, We Believe In Transparent Pricing With Zero Commission-Ensuring You Keep 100% Of Your Earnings. Our Fee Structure Is Simple, With Clear Charges For Payment Processing, Shipping, And Replacements.
                  </p>
                  <p className="mt-4 fw-600 lh-lg fs-6 ">
                    Fixed Fees & Payment Processing
                  </p>
                  <ol style={{ listStyleType: 'disc' }}>
                    <li className="fw-500 lh-lg fs-6">
                      Zero Commission – You receive the full product price.
                    </li>
                    <li className="fw-500 lh-lg fs-6">
                      Payment Gateway Fee – A 2% charge applies to all
                      transactions for secure processing via Razorpay.
                    </li>
                    <li className="fw-500 lh-lg fs-6">
                      GST – Applicable as per government regulations.
                    </li>
                    <li className="fw-500 lh-lg fs-6">
                      Payout Cycle – Payments are released 7 days after
                      successful delivery directly to your registered bank
                      account.
                    </li>
                  </ol>
                  <p className="mt-4 fw-600 lh-lg fs-6 ">Shipping Fees</p>
                  <p className="mt-4 fw-500 lh-lg fs-6 ">
                    Sellers can choose between
                  </p>
                  <ol>
                    <li className="fw-500 lh-lg fs-6">
                      Dadisha Partnered Delivery :
                      <ol style={{ listStyleType: 'disc' }}>
                        <li className="fw-500 lh-lg fs-6">
                          Seamless Pickup & Delivery – Our partnered agents will
                          pick up the product and deliver it to the customer.
                        </li>
                        <li className="fw-500 lh-lg fs-6">
                          Fee Calculation – Shipping charges are based on
                          product weight, size, and delivery distance.
                        </li>
                        <li className="fw-500 lh-lg fs-6">
                          Automatic Deduction – Shipping fees are deducted from
                          your payout.
                        </li>
                      </ol>
                    </li>
                    <li className="fw-500 lh-lg fs-6">
                      Self-Shipping
                      <ol style={{ listStyleType: 'disc' }}>
                        <li className="fw-500 lh-lg fs-6">
                          Sellers can use their own delivery agents and manage
                          shipping costs independently.
                        </li>
                        <li className="fw-500 lh-lg fs-6">
                          No deductions by Dadisha for shipping if self-managed.
                        </li>
                      </ol>
                    </li>
                  </ol>
                  <p className="mt-4 fw-600 lh-lg fs-6 ">
                    Product Replacement Policy
                  </p>
                  <ol>
                    <li className="fw-500 lh-lg fs-6">
                      Replacements are only applicable if:
                      <ol style={{ listStyleType: 'disc' }}>
                        <li className="fw-500 lh-lg fs-6">
                          The product is defective, non-functional, or missing.
                        </li>
                        <li className="fw-500 lh-lg fs-6">
                          The buyer provides necessary proof (unboxing video,
                          images, etc.).
                        </li>
                        <li className="fw-500 lh-lg fs-6">
                          After verification, if the issue is seller’s fault,
                          the replacement is processed.
                        </li>
                      </ol>
                    </li>
                    <li className="fw-500 lh-lg fs-6">
                      Replacement Shipping Charges
                      <ol style={{ listStyleType: 'disc' }}>
                        <li className="fw-500 lh-lg fs-6">
                          The seller is responsible for covering return shipping
                          costs when a replacement is approved.
                        </li>
                        <li className="fw-500 lh-lg fs-6">
                          The return shipping fee is deducted from the payout.
                        </li>
                      </ol>
                    </li>
                  </ol>
                  <p className="mt-4 fw-600 lh-lg fs-6 ">
                    Registration & Other Fees
                  </p>
                  <ol style={{ listStyleType: 'disc' }}>
                    <li className="fw-500 lh-lg fs-6">
                      Zero Registration fee ( Limited TIme Offer )
                    </li>
                    <li className="fw-500 lh-lg fs-6">
                      Sellers can view all applicable fees on their Dadisha
                      Seller Dashboard.
                    </li>
                  </ol>
                  <p className="mt-4 fw-600 lh-lg fs-6 mb-0">
                    Effortless selling, smarter management—all in one place. 🚀
                  </p>
                </div>
              )}
              {activeTab === 'sellerportal' && (
                <div id="sellerportal" className="mb-5">
                  <h5
                    className="fs-6 fw-600 p-1 w-fit"
                    style={{ borderBottom: '2px solid #fbae24' }}
                  >
                    Seller Portal
                  </h5>
                  <p className="mt-4 fw-500 lh-lg fs-6">
                    Stay In Control Of Your Online Store With Our Seller Web Dashboard-Your All-In-One Platform For Seamless Business Management.                  </p>
                  <p className="mt-4 fw-500 lh-lg fs-6 ">
                    With Our Dashboard, You Can:
                  </p>
                  <ol style={{ listStyleType: 'disc' }}>
                    <li className="fw-500 lh-lg fs-6">
                      Create & Manage Listings.
                    </li>
                    <li className="fw-500 lh-lg fs-6">
                      Process Orders & Fulfill Shipments.
                    </li>
                    <li className="fw-500 lh-lg fs-6">
                      Track Inventory In Real-Time
                    </li>
                    <li className="fw-500 lh-lg fs-6">
                      Monitor Payments & Earnings
                    </li>
                    <li className="fw-500 lh-lg fs-6">
                      Gain Business Insights
                    </li>
                    <li className="fw-500 lh-lg fs-6">
                      Access Dedicated Seller Support
                    </li>
                    <li className="fw-500 lh-lg fs-6">
                      Effortless Selling, Smarter Management-All In One Place.
                    </li>
                  </ol>
                  <div id="" className="mt-5">
                    <h5
                      className="fs-6 fw-600 p-1 w-fit"
                      style={{ borderBottom: '2px solid #fbae24' }}
                    >
                      Dedicated Seller Support – Always Here for You
                    </h5>
                    <p className="mt-4 fw-500 lh-lg fs-6">
                      What sets us apart is our commitment to seamless seller
                      support. Whether you have questions, need guidance, or require
                      assistance, our dedicated team is always ready to help.
                    </p>
                    <p className="mt-4 fw-500 lh-lg fs-6">
                      All support details, including contact numbers, email, and
                      resources, are readily available in your Seller Dashboard.Sell
                      with confidence, knowing help is just a click away! 🚀
                    </p>
                  </div>
                </div>
              )}


            </div>
          </div>
        </div>
        <SellWithUsForm />
      </div>
      <ProductFooter />
    </div>
  );
}
