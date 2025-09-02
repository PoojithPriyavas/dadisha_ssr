import { useContext } from 'react';
import { SSRDataContext } from '../entry-server.jsx';

// Hook to access SSR data in client components
export function useSSRData() {
  return useContext(SSRDataContext) || {};
}

// Hook to access specific SSR data for blog pages
export function useBlogSSRData() {
  const ssrData = useSSRData();
  return ssrData.blogDetail || null;
}

// Hook to access specific SSR data for blog list pages
export function useBlogListSSRData() {
  const ssrData = useSSRData();
  return ssrData.blogList || [];
}

// Hook to access specific SSR data for product detail pages
export function useProductDetailSSRData() {
  const ssrData = useSSRData();
  return ssrData.productDetail || null;
}

// Hook to access specific SSR data for e-learning pages
export function useElearningSSRData() {
  const ssrData = useSSRData();
  return ssrData.elearning || [];
}