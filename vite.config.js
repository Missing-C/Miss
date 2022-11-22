/*
 * @Author: 蓝山
 * @Date: 2022-11-22 11:08:41
 * @FilePath: \blue\vite.config.js
 * @LastEditors: 蓝山
 * @LastEditTime: 2022-11-22 11:42:43
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    refresh: true,
  })],
  server: {
    port: "1314",
		host: '127.0.0.1',
    // 是否开启 https
    https: false,
    hmr: true,
    usePolling:true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
