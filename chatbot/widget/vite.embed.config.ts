import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, 'src/mount.tsx'),
      name: 'SupportChatbotBundle',
      formats: ['iife'],
      fileName: () => 'chatbot-widget.iife.js',
    },
  },
});
