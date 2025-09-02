import React, { useEffect } from 'react';
import ProductFooter from '../products/ProductFooter';
import CategoryBanner from './categorySections/CategoryBanner';
import FiterSection from './categorySections/FiterSection';
import SecondaryHeader from '../../components/SecondaryHeader';
import { useLocation } from 'react-router-dom';

export default function CategoryFilter() {
  const location = useLocation();
  const inSearchPath = location.pathname === '/categoryfilter' && new URLSearchParams(location.search).has('search');
  return (
    <div>
      <SecondaryHeader />
      <div  style={{marginTop:'100px'}}>
        {!inSearchPath && <CategoryBanner />}
      </div>

      <div className="container mx-auto categoey-page" >
        {/* <CategoryBanner /> */}
        <FiterSection />
      </div>
      <ProductFooter />
    </div>
  );
}
