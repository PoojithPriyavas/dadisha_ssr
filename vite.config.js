import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production'
  const isSsr = process.env.SSR === 'true'
  
  return {
    plugins: [react()],
    build: {
      minify: isProduction,
      ssr: isSsr ? resolve('src/entry-server.jsx') : false,
      outDir: isSsr ? 'dist/server' : 'dist/client',
      rollupOptions: {
        input: {
          app: isSsr ? resolve('src/entry-server.jsx') : resolve('src/entry-client.jsx')
        },
        output: {
          // Ensure proper format based on build target
          format: isSsr ? 'cjs' : 'es'
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    ssr: {
      // SSR specific configuration
      noExternal: ['react-helmet-async', 'antd']
    }
  }
})
