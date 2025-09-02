import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';
import { renderToString } from 'react-dom/server';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function testSSR() {
  console.log('Testing SSR implementation...');
  
  try {
    // Create Vite server in middleware mode
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'custom'
    });
    
    // Read index.html
    const template = fs.readFileSync(
      path.resolve(__dirname, 'index.html'),
      'utf-8'
    );
    
    // Load the server entry
    const { render } = await vite.ssrLoadModule('/src/entry-server.jsx');
    
    // Import SSR data fetching utilities
    const { 
      fetchBlogData, 
      fetchBlogListData, 
      fetchProductDetailData, 
      fetchElearningData 
    } = await vite.ssrLoadModule('/src/utils/ssrDataFetching.js');
    
    // Test routes to verify
    const routesToTest = [
      { path: '/', name: 'Home page' },
      { path: '/blogs', name: 'Blog list page', fetchData: fetchBlogListData },
      { path: '/blogs/how-to-choose-the-right-skincare', name: 'Blog detail page', fetchData: fetchBlogData },
      { path: '/products/product-detail/organic-face-wash', name: 'Product detail page', fetchData: fetchProductDetailData },
      { path: '/elearning', name: 'E-learning page', fetchData: fetchElearningData }
    ];
    
    // Test each route
    for (const route of routesToTest) {
      console.log(`\nTesting SSR for ${route.name}: ${route.path}`);
      
      // Transform HTML with Vite for this route
      const transformedTemplate = await vite.transformIndexHtml(route.path, template);
      
      // Create a rendering context
      const helmetContext = {};
      
      // Fetch data if available for this route
      let data = {};
      if (route.fetchData) {
        console.log(`Fetching data for ${route.name}...`);
        try {
          data = await route.fetchData(route.path);
          console.log(`Data fetched successfully for ${route.name}`);
        } catch (error) {
          console.warn(`Warning: Failed to fetch data for ${route.name}:`, error.message);
        }
      }
      
      // Create SSR context
      const ssrContext = {
        url: route.path,
        helmetContext,
        data
      };
      
      // Render the app HTML
      const appHtml = renderToString(render(ssrContext));
      
      console.log(`✅ SSR test successful for ${route.name}!`);
      console.log(`Generated HTML length: ${appHtml.length}`);
      console.log(`Sample of generated HTML: ${appHtml.substring(0, 100)}...`);
    }
    
    // Clean up
    await vite.close();
    
    return true;
  } catch (error) {
    console.error('❌ SSR test failed:', error);
    return false;
  }
}

testSSR();