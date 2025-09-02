# Server-Side Rendering (SSR) Implementation

This document provides instructions on how to use the SSR implementation in this React+Vite project.

## Overview

Server-Side Rendering (SSR) has been implemented in this project using Vite's SSR capabilities. The implementation includes:

- Entry point files for both client and server
- Vite configuration for SSR
- Express server for rendering
- Special handling for antd components

## How to Use

### Development

During development, you can continue to use the standard Vite development server:

```bash
npm run dev
```

### Building for Production

To build the application for production with SSR support:

```bash
npm run build
```

This will create two builds:
- Client-side build in `dist/client`
- Server-side build in `dist/server`

### Running the SSR Server

To start the SSR server:

```bash
npm run serve
```

This will start an Express server that renders the React application on the server and sends the HTML to the client.

### Testing SSR

To test the SSR implementation:

```bash
npm run test:ssr
```

## Implementation Details

### Entry Points

- `src/entry-client.jsx`: Client-side entry point that hydrates the server-rendered HTML
- `src/entry-server.jsx`: Server-side entry point that renders the React application on the server

### Server

- `server.js`: Express server that handles SSR

### Configuration

- `vite.config.js`: Vite configuration for SSR
- `src/ssr-antd-config.js`: Configuration for antd components in SSR

## Notes

- The SSR implementation preserves all existing functionality and design of the application
- antd components are specially handled to work properly with SSR
- Static assets are served from the appropriate directories