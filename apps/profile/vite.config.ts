import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  server: {
    port: 5175,
  },
  plugins: [
    tailwindcss(),
    react(),
    federation({
      name: 'profile',
      filename: 'remoteEntry.js',
      exposes: {
        './ProfileApp': './src/app/ProfileApp.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  build: {
    target: 'esnext',
  }
});
