import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,

    // add the next lines if you're using windows and hot reload doesn't work
    watch: {
      usePolling: true
    }
  },
})