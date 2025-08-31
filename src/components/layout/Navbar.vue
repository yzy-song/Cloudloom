<!--
 * @Author: yzy
 * @Date: 2025-08-29 09:09:22
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-31 15:12:35
 * @Description: 经过重新设计的导航栏，实现了类似参考网站的滚动“折叠”效果
-->
<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out',
      isScrolled ? 'h-20 bg-white/80 backdrop-blur-lg shadow-md' : 'h-28 bg-transparent',
    ]"
  >
    <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
      <div class="flex items-center justify-between h-full">
        <!-- Logo -->
        <router-link to="/" class="flex items-center group">
          <!-- 您可以在这里替换成您的SVG Logo -->
          <svg
            class="w-10 h-10 text-[#C0392B] mr-2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="currentColor"
              stroke-width="2"
              stroke-linejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="currentColor"
              stroke-width="2"
              stroke-linejoin="round"
            />
          </svg>
          <span
            :class="[
              'font-serif font-bold tracking-widest transition-colors duration-300',
              isScrolled ? 'text-2xl text-gray-800' : 'text-3xl text-white',
            ]"
          >
            云织
          </span>
        </router-link>

        <!-- 桌面端导航菜单 -->
        <nav class="hidden md:flex items-center space-x-10">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            :class="[
              'font-semibold text-sm tracking-wider relative group transition-colors duration-300',
              isScrolled ? 'text-gray-700 hover:text-[#C0392B]' : 'text-white hover:text-white/80',
            ]"
          >
            <span>{{ t(item.label) }}</span>
            <span
              :class="[
                'absolute -bottom-2 left-1/2 -translate-x-1/2 h-0.5 w-0 rounded-full transition-all duration-300 group-hover:w-full',
                isScrolled ? 'bg-[#C0392B]' : 'bg-white',
              ]"
            ></span>
            <span
              v-if="activePath === item.path"
              :class="[
                'absolute -bottom-2 left-1/2 -translate-x-1/2 h-0.5 w-full rounded-full',
                isScrolled ? 'bg-[#C0392B]' : 'bg-white',
              ]"
            ></span>
          </router-link>
        </nav>

        <!-- 右侧图标区域 -->
        <div class="hidden md:flex items-center space-x-6">
          <button
            :class="[
              'transition-colors duration-300',
              isScrolled ? 'text-gray-700 hover:text-[#C0392B]' : 'text-white',
            ]"
          >
            <MagnifyingGlassIcon class="h-6 w-6" />
          </button>
          <router-link
            to="/cart"
            :class="[
              'transition-colors duration-300',
              isScrolled ? 'text-gray-700 hover:text-[#C0392B]' : 'text-white',
            ]"
          >
            <ShoppingCartIcon class="h-6 w-6" />
          </router-link>
          <!-- 用户菜单 -->
          <div v-if="authStore.isAuthenticated" class="relative">
            <button @click="isUserMenuOpen = !isUserMenuOpen" id="user-menu-button">
              <img
                class="h-9 w-9 rounded-full object-cover border-2"
                :class="isScrolled ? 'border-gray-300' : 'border-white/50'"
                :src="authStore.user?.avatar || 'https://source.unsplash.com/100x100/?portrait'"
                alt="用户头像"
              />
            </button>
            <!-- 用户下拉菜单 (此处省略，可复用您之前的代码) -->
          </div>
          <router-link
            v-else
            to="/login"
            :class="[
              'font-semibold text-sm transition-colors duration-300',
              isScrolled ? 'text-gray-700 hover:text-[#C0392B]' : 'text-white',
            ]"
          >
            登录
          </router-link>
        </div>

        <!-- 移动端菜单按钮 -->
        <div class="md:hidden">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            :class="isScrolled ? 'text-gray-800' : 'text-white'"
          >
            <Bars3Icon class="h-7 w-7" />
          </button>
        </div>
      </div>
    </div>

    <!-- 移动端菜单面板 (此处省略，可复用您之前的代码) -->
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { MagnifyingGlassIcon, ShoppingCartIcon, Bars3Icon } from '@heroicons/vue/24/outline'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const { t } = useI18n()
const route = useRoute()
const authStore = useAuthStore()

// 响应式变量
const isScrolled = ref(false)
const mobileMenuOpen = ref(false)
const isUserMenuOpen = ref(false)

const navItems = [
  { label: 'navbar.home', path: '/' },
  { label: 'navbar.gallery', path: '/gallery' },
  { label: 'navbar.knowledge', path: '/knowledge' },
  { label: 'navbar.about', path: '/about' },
  { label: 'navbar.collaboration', path: '/collaboration' },
]

const activePath = computed(() => route.path)

// 滚动事件处理
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

// 生命周期钩子
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
