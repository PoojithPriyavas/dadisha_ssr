import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { HelmetProvider } from 'react-helmet-async';
import { AppProvider } from './context/context.jsx';

// Client-side rendering - hydrates the HTML sent from the server
hydrateRoot(
  document.getElementById('root'),
  <BrowserRouter>
    <HelmetProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </HelmetProvider>
  </BrowserRouter>
);