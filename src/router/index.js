/*
 * @Author: 蓝山
 * @Date: 2022-11-23 10:12:20
 * @FilePath: \Miss\src\router\index.js
 * @LastEditors: 蓝山
 * @LastEditTime: 2022-12-28 10:21:41
 */
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
