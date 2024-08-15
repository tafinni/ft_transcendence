// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: 'src/server.js', // Specify the entry point for your JS app
    },
  },
  server: {
    port: 5000,
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['src'],
    },
  },
});