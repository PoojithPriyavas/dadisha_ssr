import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { HelmetProvider } from 'react-helmet-async';
import { AppProvider } from './context/context.jsx';
import { SSRDataContext } from './entry-server.jsx';

// Get SSR data from window.__SSR_DATA__
let ssrData = {};

try {
  // Safely parse SSR data from window.__SSR_DATA__
  ssrData = window.__SSR_DATA__ || {};
  
  // Ensure we have consistent data structure
  if (!ssrData.blogList) ssrData.blogList = {};
  if (!ssrData.blogDetail) ssrData.blogDetail = null;
} catch (error) {
  console.error('Error parsing SSR data:', error);
  ssrData = { blogList: {}, blogDetail: null };
}

// Client-side rendering - hydrates the HTML sent from the server
hydrateRoot(
  document.getElementById('root'),
  <BrowserRouter>
    <HelmetProvider>
      <AppProvider initialSSRData={ssrData}>
        <SSRDataContext.Provider value={ssrData}>
          <App />
        </SSRDataContext.Provider>
      </AppProvider>
    </HelmetProvider>
  </BrowserRouter>
);