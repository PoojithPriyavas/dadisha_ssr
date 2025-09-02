import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { renderToString } from 'react-dom/server';
import { createRequire } from 'module';
import { matchPath } from 'react-router-dom';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

async function createServer() {
  const app = express();

  // Create Vite server in middleware mode and configure the app type as
  // 'custom', disabling Vite's own HTML serving logic so parent server
  // can take control
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  // Use vite's connect instance as middleware
  app.use(vite.middlewares);
  
  // Serve static assets from dist/client
  app.use('/assets', express.static(path.resolve(__dirname, 'dist/client/assets')));
  app.use('/css', express.static(path.resolve(__dirname, 'css')));
  app.use('/js', express.static(path.resolve(__dirname, 'js')));
  app.use('/dist', express.static(path.resolve(__dirname, 'dist/client')));
  app.use('/images', express.static(path.resolve(__dirname, 'public/images')));
  app.use('/img', express.static(path.resolve(__dirname, 'public/img')));
  app.use('/icons', express.static(path.resolve(__dirname, 'public/icons')));
  app.use('/tags', express.static(path.resolve(__dirname, 'public/tags')));
  app.use('/tempimg', express.static(path.resolve(__dirname, 'public/tempimg')));

  app.use('*', async (req, res) => {
    const url = req.originalUrl;

    try {
      // 1. Read index.html
      let template = fs.readFileSync(
        path.resolve(__dirname, 'index.html'),
        'utf-8'
      );

      // 2. Apply Vite HTML transforms. This injects the Vite HMR client, and
      //    also applies HTML transforms from Vite plugins, e.g. global preambles
      //    from @vitejs/plugin-react
      template = await vite.transformIndexHtml(url, template);

      // 3. Load the server entry and SSR data fetching utilities
      //    ssrLoadModule automatically transforms ESM source code to be usable in Node.js!
      //    No bundling required, and provides efficient invalidation similar to HMR.
      const { render } = await vite.ssrLoadModule('/src/entry-server.jsx');
      const { 
        fetchBlogData, 
        fetchBlogListData, 
        fetchProductDetailData, 
        fetchElearningData 
      } = await vite.ssrLoadModule('/src/utils/ssrDataFetching.js');
      
      // 4. Fetch data based on the route
      let ssrData = {};
      
      // Check for blog detail page
      const blogDetailMatch = url.match(/\/blogs\/([^\/]+)$/);
      if (blogDetailMatch) {
        const slug = blogDetailMatch[1];
        ssrData.blogDetail = await fetchBlogData(slug);
      }
      
      // Check for blog list page
      if (url.match(/\/blogs\/pages\//) || url === '/blogs/') {
        ssrData.blogList = await fetchBlogListData();
      }
      
      // Check for product detail page
      const productDetailMatch = url.match(/\/productdetails\/([^\/]+)$/);
      if (productDetailMatch) {
        const slug = productDetailMatch[1];
        ssrData.productDetail = await fetchProductDetailData(slug);
      }
      
      // Check for e-learning page
      if (url === '/elearning') {
        ssrData.elearning = await fetchElearningData();
      }
      
      // 5. Create a rendering context for react-helmet-async
      const helmetContext = {};
      
      // 6. Create SSR context with preloaded data
      const ssrContext = {
        url,
        helmetContext,
        data: ssrData
      };
      
      // 7. Render the app HTML. This assumes entry-server.js's exported `render`
      //    function calls appropriate framework SSR APIs,
      //    e.g. ReactDOMServer.renderToString()
      const appHtml = renderToString(render(ssrContext));

      // 6. Get helmet data for meta tags
      const { helmet } = helmetContext;
      
      // 7. Inject the app-rendered HTML into the template.
      const html = template
        .replace(`<div id="root"></div>`, `<div id="root">${appHtml}</div>`)
        // Add all helmet meta tags if available
        .replace('</head>', `${helmet ? 
          helmet.title.toString() + 
          helmet.meta.toString() + 
          helmet.link.toString() + 
          helmet.style.toString() + 
          helmet.script.toString() : ''}</head>`);

      // 8. Send the rendered HTML back.
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      // If an error is caught, let Vite fix the stack trace so it maps back to
      // your actual source code.
      vite.ssrFixStacktrace(e);
      console.error(e);
      res.status(500).end(e.message);
    }
  });

  const PORT = process.env.PORT || 5173;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

createServer();