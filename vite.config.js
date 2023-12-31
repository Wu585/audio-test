import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/api": {
        target: "http://172.16.131.97:8800",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    }
  }
})
