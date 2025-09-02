import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';
import { renderToString } from 'react-dom/server';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function testSSR() {
  console.log('Testing basic SSR implementation...');
  
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
    
    // Transform HTML with Vite for home route
    const transformedTemplate = await vite.transformIndexHtml('/', template);
    
    // Load the server entry
    const { render } = await vite.ssrLoadModule('/src/entry-server.jsx');
    
    // Create a rendering context
    const helmetContext = {};
    const ssrContext = {
      url: '/',
      helmetContext,
      data: {}
    };
    
    // Render the app HTML
    const appHtml = renderToString(render(ssrContext));
    
    console.log('✅ Basic SSR test successful!');
    console.log('Generated HTML length:', appHtml.length);
    console.log('Sample of generated HTML:', appHtml.substring(0, 100) + '...');
    
    // Clean up
    await vite.close();
    
    return true;
  } catch (error) {
    console.error('❌ SSR test failed:', error);
    return false;
  }
}

testSSR();