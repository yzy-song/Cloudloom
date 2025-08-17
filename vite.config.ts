/*
 * @Author: yzy
 * @Date: 2025-08-16 10:23:53
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-16 13:19:46
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), tailwindcss()],
  server: {
    host: '0.0.0.0', // 允许所有网络接口访问
    port: 5173, // 指定端口号（可选）
    strictPort: true, // 如果端口被占用则报错
    open: false, // 不自动打开浏览器

    // 启用更快的预加载
    preTransformRequests: true,
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
