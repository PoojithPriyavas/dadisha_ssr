import React from 'react';
import Header from '../../components/Header';
import AboutSectionOne from './AboutSectionOne';
import AboutSectionTwo from './AboutSectionTwo';
import AboutSectionThree from './AboutSectionThree';
import AboutSectionFour from './AboutSectionFour';
import HomeSectionEight from '../home/HomeSectionEight';
import AboutSectionFive from './AboutSectionFive';
import ProductFooter from '../products/ProductFooter';

export default function About() {
  return (
    <div>
      <Header />
      <AboutSectionOne />
      <AboutSectionTwo />
      <AboutSectionThree />
      <AboutSectionFour />
      <AboutSectionFive />
      {/* <HomeSectionEight /> */}
      <ProductFooter/>
    </div>
  );
}
