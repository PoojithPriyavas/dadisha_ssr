import React from 'react';
import { renderToString } from 'react-dom/server';

const App = () => {
  return <div>Hello SSR World</div>;
};

console.log('Testing minimal SSR...');
try {
  const html = renderToString(<App />);
  console.log('✅ Minimal SSR test successful!');
  console.log('Generated HTML:', html);
} catch (error) {
  console.error('❌ Minimal SSR test failed:', error);
}