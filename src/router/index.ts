/*
 * @Author: yzy
 * @Date: 2025-08-16 10:23:53
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-26 22:50:22
 */
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'

import type { RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { title: '云锦轩 - 汉服体验馆' },
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
    meta: { title: '预约体验 - 云锦轩', requiresAuth: true },
  },
  {
    path: '/knowledge',
    name: 'Knowledge',
    component: () => import('../views/KnowledgeView.vue'),
    meta: { title: '汉服知识 - 云锦轩' },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: { title: '登录 - 云锦轩', requiresGuest: true },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/ProfileView.vue'),
    meta: { title: '个人资料 - 云锦轩', requiresAuth: true },
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('../views/OrdersView.vue'),
    meta: { title: '我的预约 - 云锦轩', requiresAuth: true },
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('../views/FavoritesView.vue'),
    meta: { title: '我的收藏 - 云锦轩', requiresAuth: true },
  },
  {
    path: '/survey-page',
    name: 'Survey',
    component: () => import('../views/SurveyView.vue'),
    meta: { title: '市场调研 - 云锦轩' },
  },
  {
    path: '/test',
    name: 'TestPage',
    component: () => import('../views/TestView.vue'),
    meta: { title: '测试页面 - 云锦轩', requiresAuth: true },
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
  document.title = (to.meta.title as string) || '云锦轩 - 汉服体验馆'
  // 检查是否启用认证检查,如果为true，那么有一些页面需要登录后才可访问
  const enableAuth = import.meta.env.VITE_ENABLE_AUTH === 'true'
  if (!enableAuth) {
    next()
    return
  }

  const authStore = useAuthStore()

  // 初始化用户状态
  authStore.initAuth()

  // 检查是否需要认证
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({
      path: '/login',
      query: { redirect: to.fullPath },
    })
    return
  }

  // 检查是否需要访客状态（已登录用户不能访问登录页）
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next({ path: '/' })
    return
  }

  next()
})

export default router
