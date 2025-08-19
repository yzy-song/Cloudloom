/*
 * @Author: yzy
 * @Date: 2025-08-16 10:23:53
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-19 14:39:53
 */
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'

import type { RouteRecordRaw } from 'vue-router'

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
  {
    path: '/booking',
    name: 'Booking',
    component: () => import('../views/BookingView.vue'),
    meta: { title: '预约体验 - 云锦轩' },
  },
  {
    path: '/knowledge',
    name: 'Knowledge',
    component: () => import('../views/KnowledgeView.vue'),
    meta: { title: '汉服知识 - 云锦轩' },
  },
  {
    path: '/survey-page', // 新增的路由路径
    name: 'Survey',
    component: () => import('../views/SurveyView.vue'), // 导入新的组件
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
      return {
        el: '.sticky-filter-bar',
        behavior: 'smooth',
        top: 80,
      }
    }

    // 页面切换时滚动到顶部
    if (to.path !== from.path) {
      return { top: 0, behavior: 'smooth' }
    }

    return savedPosition || { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = (to.meta.title as string) || '云锦轩 - 爱尔兰汉服体验馆'

  // 可以在这里添加用户认证检查等逻辑

  next()
})

export default router
