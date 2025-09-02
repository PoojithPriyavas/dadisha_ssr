// This file contains configuration to make antd work properly with SSR

// For server-side rendering
export function configureAntdForSSR() {
  // If we're in a server environment, we need to configure antd for SSR
  if (typeof window === 'undefined') {
    // This is a server environment
    global.window = {
      matchMedia: () => ({
        matches: false,
        addListener: () => {},
        removeListener: () => {},
      }),
      addEventListener: () => {},
      removeEventListener: () => {},
      getComputedStyle: () => ({
        getPropertyValue: () => '',
      }),
      scrollTo: () => {},
      location: { href: '' },
      localStorage: {
        getItem: () => null,
        setItem: () => null,
      },
      sessionStorage: {
        getItem: () => null,
        setItem: () => null,
      },
    };
    
    global.document = {
      createElement: () => ({
        style: {},
        setAttribute: () => {},
        getElementsByTagName: () => [],
      }),
      createTextNode: () => ({}),
      querySelector: () => null,
      querySelectorAll: () => [],
      getElementById: () => null,
      documentElement: { 
        style: {},
        scrollTop: 0,
        scrollHeight: 0,
        clientHeight: 0
      },
      head: { appendChild: () => {} },
      body: { 
        appendChild: () => {},
        style: {}
      },
      addEventListener: () => {},
      removeEventListener: () => {},
    };
    
    global.navigator = { 
      userAgent: 'SSR',
      language: 'en'
    };
  }
}