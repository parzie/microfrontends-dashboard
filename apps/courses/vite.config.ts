import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation';
import tailwindcss from '@tailwindcss/vite';

console.log('FEDERATION PLUGIN LOADED', federation);


export default defineConfig({
  server: {
    port: 5174,
  },
  plugins: [
    tailwindcss(),
    react(),
    federation({
      name: 'courses',
      filename: 'remoteEntry.js',
      exposes: {
        './CoursesApp': './src/app/CoursesApp.tsx',
      },
      shared: ['react', 'react-dom'],
    }),

  ],
  build: {
    target: 'esnext',
  }
});
