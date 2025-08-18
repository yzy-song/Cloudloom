/*
 * @Author: yzy
 * @Date: 2025-08-16 10:23:53
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-18 08:51:28
 */

import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { title: '云锦轩 - 爱尔兰汉服体验馆' },
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: () => import('../views/GalleryView.vue'),
    meta: { title: '汉服展示 - 云锦轩' },
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: () => import('../views/ProductDetail.vue'),
    meta: { title: '产品详情 - 云锦轩' },
    props: true,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
    meta: { title: '关于我们 - 云锦轩' },
  },
  {
    path: '/collaboration',
    name: 'Collaboration',
    component: () => import('../views/CollaborationView.vue'),
    meta: { title: '商业合作 - 云锦轩' },
  },
  // 在路由配置中添加测试路由
  {
    path: '/tailwind-test',
    name: 'TailwindTest',
    component: () => import('../views/TailwindTest.vue'),
    meta: { title: 'Tailwind 测试' },
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue'),
    meta: { title: '页面未找到' },
  },
  {
    path: '/500',
    name: 'ServerError',
    component: () => import('../views/ServerErrorView.vue'),
    meta: { title: '服务器错误' },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.query.filter !== from.query.filter) {
      // 当筛选参数变化时，滚动到筛选区域
      return {
        el: '.sticky-filter-bar',
        behavior: 'smooth',
        top: 80, // 距离顶部偏移量
      }
    }
    return savedPosition || { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  document.title = (to.meta.title as string) || '云锦轩 - 爱尔兰汉服体验馆'
  next()
})

export default router
