import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import App from './App.jsx';
import { HelmetProvider } from 'react-helmet-async';
import { AppProvider } from './context/context.jsx';
import { configureAntdForSSR } from './ssr-antd-config.js';

// Create SSR data context
export const SSRDataContext = React.createContext({});

// Configure antd for SSR
configureAntdForSSR();

// Server-side rendering function
export function render(ssrContext) {
  const { url, helmetContext, data } = ssrContext;
  
  return (
    <StaticRouter location={url}>
      <HelmetProvider context={helmetContext}>
        <AppProvider initialSSRData={data}>
          <SSRDataContext.Provider value={data}>
            <App />
          </SSRDataContext.Provider>
        </AppProvider>
      </HelmetProvider>
    </StaticRouter>
  );
}