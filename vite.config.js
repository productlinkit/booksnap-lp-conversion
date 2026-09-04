import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      // Two entries rather than a client router: the checkout is one more
      // static page, so it costs no routing dependency and survives being
      // deep-linked or refreshed on any static host.
      input: {
        main: 'index.html',
        checkout: 'checkout.html',
      },
    },
  },
})
