/*
 * @Author: 蓝山
 * @Date: 2022-11-22 11:08:41
 * @FilePath: \Miss\src\main.js
 * @LastEditors: 蓝山
 * @LastEditTime: 2022-12-27 10:35:57
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import naive from 'naive-ui'
import './assets/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import load from '@/lib/commonLoading'
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(load)
app.use(ElementPlus)
app.use(naive)
app.mount('#app')
