# Server-Side Rendering (SSR) Implementation

This document provides an overview of the Server-Side Rendering implementation in the Dadisha project.

## Overview

Server-Side Rendering (SSR) has been implemented to improve initial page load performance, SEO, and user experience. The implementation uses React's SSR capabilities with Vite as the build tool.

## Implemented Features

SSR has been implemented for the following pages:

1. Blog Page (`/blogs`)
2. Blog Detail Page (`/blogs/:slug`)
3. Product Detail Page (`/products/product-detail/:slug`)
4. E-learning Page (`/elearning`)

## Architecture

The SSR implementation consists of the following key components:

1. **Server Entry Point**: `server.js` - Express server that handles SSR requests
2. **Server Renderer**: `src/entry-server.jsx` - Renders React components on the server
3. **Client Hydration**: `src/entry-client.jsx` - Hydrates the server-rendered HTML on the client
4. **Data Fetching**: `src/utils/ssrDataFetching.js` - Utilities for fetching data during SSR
5. **Data Context**: `src/hooks/useSSRData.js` - Hooks for accessing SSR data in components

## How It Works

1. When a request comes in, the server matches the URL to a route
2. If the route requires SSR data, the appropriate data fetching function is called
3. The fetched data is passed to the React renderer via an SSR context
4. The React components render with the pre-fetched data
5. The rendered HTML is sent to the client along with the data
6. The client hydrates the HTML and continues normal React operation

## Testing SSR

To test the SSR implementation, run:

```bash
npm run test:ssr        # Basic SSR test
npm run test:ssr:routes # Test SSR on specific routes
```

## Development Workflow

1. Run the development server: `npm run dev`
2. Build for production: `npm run build`
3. Start the production server: `npm run serve` or `npm start`

## Notes

- SSR data fetching is implemented to avoid duplicate requests when the page loads
- Components check for SSR data before making client-side requests
- The `AppProvider` and `SSRDataContext` work together to provide data to components