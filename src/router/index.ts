/*
 * @Author: yzy
 * @Date: 2025-08-16 10:23:53
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-29 10:30:00
 */
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { titleKey: 'router.home' },
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: () => import('../views/GalleryView.vue'),
    meta: { titleKey: 'router.gallery' },
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: () => import('../views/ProductDetail.vue'),
    meta: { titleKey: 'router.productDetail' },
    props: true,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
    meta: { titleKey: 'router.about' },
  },
  {
    path: '/collaboration',
    name: 'Collaboration',
    component: () => import('../views/CollaborationView.vue'),
    meta: { titleKey: 'router.collaboration' },
  },
  {
    path: '/booking',
    name: 'Booking',
    component: () => import('../views/BookingView.vue'),
    meta: { titleKey: 'router.booking', requiresAuth: true },
  },
  {
    path: '/knowledge',
    name: 'Knowledge',
    component: () => import('../views/KnowledgeView.vue'),
    meta: { titleKey: 'router.knowledge' },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: { titleKey: 'router.login', requiresGuest: true },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/ProfileView.vue'),
    meta: { titleKey: 'router.profile', requiresAuth: true },
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('../views/OrdersView.vue'),
    meta: { titleKey: 'router.orders', requiresAuth: true },
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('../views/FavoritesView.vue'),
    meta: { titleKey: 'router.favorites', requiresAuth: true },
  },
  {
    path: '/survey-page',
    name: 'Survey',
    component: () => import('../views/SurveyView.vue'),
    meta: { titleKey: 'router.survey' },
  },
  {
    path: '/test',
    name: 'TestPage',
    component: () => import('../views/TestView.vue'),
    meta: { titleKey: 'router.test', requiresAuth: true },
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue'),
    meta: { titleKey: 'router.notFound' },
  },
  {
    path: '/500',
    name: 'ServerError',
    component: () => import('../views/ServerErrorView.vue'),
    meta: { titleKey: 'router.serverError' },
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

    if (to.path !== from.path) {
      return { top: 0, behavior: 'smooth' }
    }

    return savedPosition || { top: 0 }
  },
})

export default router
