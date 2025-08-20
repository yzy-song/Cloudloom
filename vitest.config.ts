/*
 * @Author: yzy
 * @Date: 2025-08-20 16:45:30
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-20 16:46:02
 */
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['src/**/*.{test,spec}.{js,ts}'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/mocks/', '**/*.d.ts'],
    },
  },
})
