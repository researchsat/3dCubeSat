import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './',
  base: './',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        manualChunks: {
          'three-core': ['three'],
          'three-addons': ['three/examples/jsm/controls/OrbitControls.js']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    cors: true
  },
  preview: {
    port: 3000
  }
});

