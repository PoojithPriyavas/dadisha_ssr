import React from 'react';
import SecondaryHeader from '../../components/SecondaryHeader';
import Product from '../products/Product';
import ProductFooter from '../products/ProductFooter';
import { Rate } from 'antd';
import { FiShoppingCart } from 'react-icons/fi';

const CompareItem = () => {
  return (
    <div>
      <SecondaryHeader />
      <div className="container  mx-auto mt-10">
        <table className="table table-bordered table-hover my-4">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">
                <div className="" style={{ height: '14rem' }}>
                  <img
                    src="/public/tempimg/p1.jpg"
                    className="w-100 h-100 object-cover"
                  />
                </div>
              </th>
              <th scope="col">
                <div className="" style={{ height: '14rem' }}>
                  <img
                    src="/public/tempimg/p1.jpg"
                    className="w-100 h-100 object-cover"
                  />
                </div>
              </th>
              <th scope="col">
                <div className="" style={{ height: '14rem' }}>
                  <img
                    src="/public/tempimg/p1.jpg"
                    className="w-100 h-100 object-cover"
                  />
                </div>
              </th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th scope="col">sfsfsfsfsd</th>
              <th scope="col">Gamdias AREs M2 Gaming</th>
              <th scope="col">Apple Mac 24*4K Retina Display</th>
              <th scope="col">Samsung Galaxy S21 FE 5G</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Customer Feedback</th>
              <td>
                <div className="d-flex gap-2">
                  <div className="d-flex align-items-center ">
                    <Rate
                      allowHalf
                      disabled
                      defaultValue={4.5}
                      className="text-base-color fs-6"
                    />
                  </div>
                  <div className="">( 4.5 )</div>
                </div>
              </td>
              <td>
                <div className="d-flex gap-2">
                  <div className="d-flex align-items-center ">
                    <Rate
                      allowHalf
                      disabled
                      defaultValue={5}
                      className="text-base-color fs-6"
                    />
                  </div>
                  <div className="">( 5 )</div>
                </div>
              </td>
              <td>
                <div className="d-flex gap-2">
                  <div className="d-flex align-items-center ">
                    <Rate
                      allowHalf
                      disabled
                      defaultValue={2.5}
                      className="text-base-color fs-6"
                    />
                  </div>
                  <div className="">( 2.5 )</div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Price</th>
              <td className="text-primary">$699.00</td>
              <td className="text-primary">$1,699.00</td>
              <td className="text-primary">$699.99</td>
            </tr>
            <tr>
              <th scope="row">Sold By</th>
              <td>Clicen</td>
              <td>Apple</td>
              <td>Clicen</td>
            </tr>
            <tr>
              <th scope="row">Brand</th>
              <td>StarTech</td>
              <td>Apple</td>
              <td>Samsung</td>
            </tr>
            <tr>
              <th scope="row">Model</th>
              <td>ARES M2 and ZEUS E2</td>
              <td>Apple Mac 24* M1 Blue 2021</td>
              <td>Samsung Galaxy S21 FE 5G</td>
            </tr>
            <tr>
              <th scope="row">Feature</th>
              <td>ARES M2 and ZEUS E2</td>
              <td>ARES M2 and ZEUS E2</td>
              <td>ARES M2 and ZEUS E2</td>
            </tr>
            <tr>
              <th scope="row">Size</th>
              <td>6.71 inches, 110.5 cm</td>
              <td>6.7 inches, 109.8 cm</td>
              <td>6.4 inches, 98.9 cm</td>
            </tr>
            <tr>
              <th scope="row">Weight</th>
              <td>950 g (7.41 oz)</td>
              <td>240 g (3.47 oz)</td>
              <td>177 g (5.24 oz)</td>
            </tr>
            <tr className="p-2">
              <th scope="row"></th>
              <td>
                <button className="detailbtn-pri py-2 rounded px-4 d-flex align-items-center justify-content-center gap-2">
                  <FiShoppingCart />
                  Add To Cart
                </button>
              </td>
              <td>
                <button className="detailbtn-pri py-2 rounded px-4 d-flex align-items-center justify-content-center gap-2">
                  <FiShoppingCart />
                  Add To Cart
                </button>
              </td>
              <td>
                <button className="detailbtn-sec py-2 rounded px-4 d-flex align-items-center justify-content-center gap-2">
                  <FiShoppingCart />
                  Added To Cart
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-10">
        <ProductFooter />
      </div>
    </div>
  );
};

export default CompareItem;
