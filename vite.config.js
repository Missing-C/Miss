/*
 * @Author: 蓝山
 * @Date: 2022-11-14 14:09:50
 * @FilePath: \blue-mountain\vite.config.js
 * @LastEditors: 蓝山
 * @LastEditTime: 2022-11-15 17:48:43
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: "1314",
		host: '127.0.0.1',
    // 是否开启 https
    https: false,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
