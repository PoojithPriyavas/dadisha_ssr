import React, { useState } from 'react';
import Header from '../../components/Header';
import AboutSectionFive from '../about/AboutSectionFive';
import HomeSectionEight from '../home/HomeSectionEight';
import { Fade, Slide } from 'react-awesome-reveal';
import { CiHeart } from 'react-icons/ci';
import { Rate } from 'antd';
import CategorySlider from './category/CategorySlider';
import BannerSlider from './banner/BannerSlider';

const productArray = [
  {
    id: 1,
    name: 'Product 1',
    description: 'Description of Product 1',
    image: '/tempimg/p1.jpg',
    rating: 0.5,
  },
  {
    id: 2,
    name: 'Product 2',
    description:
      'Description of Product 2 hiscdjjncsdkjkmsknjknjsdjknkjnsdkjn adsjjhjas',
    image: '/tempimg/p2.jpg',
    rating: 5,
  },
  {
    id: 3,
    name: 'Product 3',
    description: 'Description of Product 3',
    image: '/tempimg/p3.jpg',
    rating: 2.5,
  },
  {
    id: 4,
    name: 'Product 3',
    description: 'Description of Product 3',
    image: '/tempimg/p4.jpg',
    rating: 4.5,
  },
  {
    id: 5,
    name: 'Product 3',
    description: 'Description of Product 3',
    image: '/tempimg/p5.jpg',
    rating: 2.5,
  },
  {
    id: 6,
    name: 'Product 6',
    description: 'Description of Product 3',
    image: '/tempimg/p6.jpg',
    rating: 0.5,
  },

  {
    id: 5,
    name: 'Product 7',
    description: 'Description of Product 7',
    image: '/tempimg/p7.jpg',
    rating: 1.5,
  },
];

const categories = [
  {
    id: 1,
    name: 'Personal Protective',
    subCategories: [
      'Respiratory',
      'Body',
      'Foot',
      'Head',
      'Eye',
      'Hand',
      'Hearing',
    ],
  },
  {
    id: 2,
    name: 'QHSE',
    subCategories: [
      'Trash Bin',
      'Cupboard',
      'Station',
      'Office',
      'Fire first aid',
    ],
  },
  {
    id: 3,
    name: 'Way Finding',
    subCategories: [
      'Manufacturing',
      'Small and Medium Sized Enterprises',
      'Space',
      'Tourism',
      'Marine',
      'Agriculture',
      'Food',
    ],
  },
];

const languages = [
  { id: 1, name: 'English' },
  { id: 2, name: 'Hindi' },
  { id: 3, name: 'Arabic' },
  { id: 4, name: 'Spanish' },
];

export default function ProductFilter() {
  const [expandedCategories, setExpandedCategories] = useState({ 1: true });

  const toggleCategory = categoryId => {
    setExpandedCategories(prevState => ({
      ...prevState,
      [categoryId]: !prevState[categoryId],
    }));
  };

  console.log(expandedCategories);

  return (
    <div>
      <Header />

      <div className="container mx-auto  prd-top">
        {/* <Fade>
          <h1 className="fw-700 text-dark-gray mb-20px ls-minus-2px custom-font">
            Products
          </h1>
        </Fade>
        <Slide direction="down" duration={800} delay={200}>
          <p className="fw-400  fs-6" style={{ lineHeight: '20px' }}>
            Explore the some of our finest products - ⁠Designing, Engineering,
            Manufacturing, Selling, and Renting.
          </p>
        </Slide> */}
        <CategorySlider />
        <BannerSlider />
        <div className="row my-4">
          <div className="col-3 ">
            <div className=" rounded px-1  py-4  ">
              <div className="d-flex justify-content-between align-items-center mb-30px ">
                <div
                  className="fw-700 text-dark-gray "
                  style={{ fontSize: '24px' }}
                >
                  {' '}
                  Filter
                </div>
                <button className="fw-700 text-dark-gray border-1 bg-white border-radius-30px px-4 py-1 h-fit">
                  Reset
                </button>
              </div>
              <div>
                <h1
                  className="fw-700 text-white mb-2 bg-black py-2 px-2"
                  style={{ fontSize: '16px', lineHeight: '10px' }}
                >
                  Categories
                </h1>
                {categories.map(item => (
                  <div key={item.id}>
                    <div
                      className="d-flex justify-content-between align-items-center mt-10px mb-10px  custom-pointer"
                      onClick={() => toggleCategory(item.id)}
                    >
                      <div
                        className="fw-700 text-dark-gray "
                        style={{ fontSize: '14px' }}
                      >
                        {item.name}
                      </div>
                      <i
                        className={`fa ${
                          expandedCategories[item.id] ? 'fa-minus' : 'fa-plus'
                        } text-dark-gray`}
                        aria-hidden="true"
                      ></i>
                    </div>
                    {expandedCategories[item.id] &&
                      item.subCategories.map((sub, index) => (
                        <Slide direction="down" key={index}>
                          <div
                            className="d-flex  align-items-center h-fit w-fit p-0"
                            style={{ lineHeight: '0px' }}
                          >
                            <input type="checkbox" className="h-fit w-fit" />
                            <h1
                              className="fw-700 mb-0 "
                              style={{
                                fontSize: '14px',
                                lineHeight: '30px',
                                marginLeft: '10px',
                              }}
                            >
                              {sub}
                            </h1>
                          </div>
                        </Slide>
                      ))}
                  </div>
                ))}
              </div>
              <div>
                <h1
                  className="fw-700 text-white mb-2 bg-black py-2 px-2"
                  style={{ fontSize: '16px', lineHeight: '10px' }}
                >
                  Language
                </h1>

                {languages?.map(lang => (
                  <Slide direction="down">
                    <div
                      className="d-flex  align-items-center h-fit w-fit p-0"
                      style={{ lineHeight: '0px' }}
                    >
                      <input type="checkbox" className="h-fit w-fit" />
                      <h1
                        className="fw-700 mb-0 "
                        style={{
                          fontSize: '14px',
                          lineHeight: '30px',
                          marginLeft: '10px',
                        }}
                      >
                        {lang.name}
                      </h1>
                    </div>
                  </Slide>
                ))}
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className=" rounded">
              <input
                className="mb-3 mt-2 rounded border-black text-back"
                placeholder="search the product here"
              />
              <div className="row">
                {productArray.map(item => (
                  <div className="col-4 mb-4" key={item.id}>
                    <div className="card">
                      <div className="h-200px">
                        <img
                          src={item.image}
                          className="card-img-top w-full h-full object-cover"
                          alt="..."
                        />
                      </div>
                      <div className="card-body">
                        <h5 className="mb-0" style={{ fontSize: '18px' }}>
                          {item.name}
                        </h5>
                        <div className="d-flex justify-content-between align-items-center">
                          <p
                            className="mb-0 "
                            style={{ fontSize: '20px', color: '#6f7071' }}
                          >
                            {' '}
                            29 $
                          </p>
                          <Rate
                            allowHalf
                            disabled
                            defaultValue={item.rating}
                            className="text-base-color"
                          />
                        </div>
                        <p
                          className="text-ellipsis line-clamp-2"
                          style={{
                            minHeight: '40px',
                            fontSize: '12px',
                            lineHeight: '20px',
                          }}
                        >
                          {item.description}
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <button
                            className=" text-dark-gray rounded fw-700 bg-white border-1 px-1 py-1  h-30px w-30px d-flex justify-content-between align-items-center"
                            style={{ fontSize: '12px' }}
                          >
                            <CiHeart style={{ fontSize: '20px' }} />
                          </button>
                          <button
                            className=" text-white border-radius-30px fw-700 bg-black border-none px-4  h-fit "
                            style={{ fontSize: '12px' }}
                          >
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <AboutSectionFive /> */}
      <HomeSectionEight />
    </div>
  );
}
