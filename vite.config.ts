import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

// import path from "path"

// https://vite.dev/config/
export default defineConfig({
  // optimizeDeps: {
  //   include: ['connectkit', 'wagmi_chains']
  // },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis'
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true
        })
      ]
    }
  },
  plugins: [react()],
  server: {
    port: 3001
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    // alias: {
    //   "@": path.resolve(__dirname, "./src"),
    // },
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@components', replacement: '/src/components' },
      { find: '@modules', replacement: '/src/modules' },
      { find: '@routes', replacement: '/src/routes' },
      { find: '@utils', replacement: '/src/utils' },
      { find: '@layouts', replacement: '/src/layouts' },
      { find: '@context', replacement: '/src/context' },
      { find: '@hooks', replacement: '/src/hooks' },
      { find: '@assets', replacement: '/src/assets' },
      { find: '@styles', replacement: '/src/styles' },
      { find: '@interfaces', replacement: '/src/interfaces' },
      { find: '@constants', replacement: '/src/constants' },
      { find: '@stores', replacement: '/src/stores' },
      { find: '@lib', replacement: '/src/lib' },
      { find: '@apis', replacement: '/src/apis' },
      { find: '@lotties', replacement: '/src/lotties' }
    ]
  },
})
