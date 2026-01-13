import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  server: { port: 5173 },
  plugins: [
    react(),
    federation({
      name: 'shell',
      remotes: {
        courses: 'http://localhost:5174/assets/remoteEntry.js',
        profile: 'http://localhost:5175/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  build: {
    target: 'esnext',
  }
});
