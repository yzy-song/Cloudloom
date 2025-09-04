<!--
 * @Author: yzy
 * @Date: 2025-08-29 09:09:22
 * @LastEditors: yzy
 * @LastEditTime: 2025-09-04 15:20:00
 * @Description: 导航栏，移除了深色模式，仅保留浅色模式，并保留主页滚动“折叠”效果
-->
<template>
  <!-- The <template> tag can have multiple root elements in Vue 3 -->
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out',
      headerClass,
      { '-translate-y-full': isScrollingDown && isScrolled && !mobileMenuOpen },
    ]"
  >
    <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
      <div class="flex items-center justify-between h-full">
        <!-- Logo -->
        <router-link to="/" class="flex items-center group">
          <svg
            class="w-10 h-10 mr-2"
            :class="logoColorClass"
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
              logoTextColorClass,
            ]"
          >
            云织
          </span>
        </router-link>

        <!-- Desktop Navigation Menu -->
        <nav class="hidden md:flex items-center space-x-10">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            :class="[
              'font-semibold text-sm tracking-wider relative group transition-colors duration-300',
              linkTextColorClass,
            ]"
          >
            <span>{{ t(item.label) }}</span>
            <span
              :class="[
                'absolute -bottom-2 left-1/2 -translate-x-1/2 h-0.5 w-0 rounded-full transition-all duration-300 group-hover:w-full',
                underlineColorClass,
              ]"
            ></span>
            <span
              v-if="activePath === item.path"
              :class="[
                'absolute -bottom-2 left-1/2 -translate-x-1/2 h-0.5 w-full rounded-full',
                underlineColorClass,
              ]"
            ></span>
          </router-link>
        </nav>

        <!-- Right-side Icons -->
        <div class="hidden md:flex items-center space-x-6">
          <button :class="iconColorClass" aria-label="Search">
            <MagnifyingGlassIcon class="h-6 w-6" />
          </button>
          <router-link to="/cart" :class="iconColorClass" aria-label="Shopping Cart"
            ><ShoppingCartIcon class="h-6 w-6"
          /></router-link>
          <!-- User Menu Dropdown -->
          <div v-if="authStore.isAuthenticated" class="relative" ref="userMenuContainer">
            <button
              @click="isUserMenuOpen = !isUserMenuOpen"
              id="user-menu-button"
              aria-label="User Menu"
            >
              <img
                class="h-9 w-9 rounded-full object-cover border-2 transition-colors duration-300"
                :class="isScrolled || !isHomePage ? 'border-gray-300' : 'border-white/50'"
                :src="authStore.user?.avatarUrl || 'https://source.unsplash.com/100x100/?portrait'"
                alt="用户头像"
              />
            </button>

            <!-- Dropdown Panel -->
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div
                v-if="isUserMenuOpen"
                class="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div class="px-4 py-3 border-b border-gray-200">
                  <p class="text-sm font-semibold text-gray-800">
                    {{ authStore.user?.nickName || '' }}
                  </p>
                  <p class="text-sm text-gray-500 truncate">{{ authStore.user?.email }}</p>
                </div>
                <div class="py-1">
                  <router-link
                    v-for="item in userMenuItems"
                    :key="item.name"
                    :to="item.path"
                    class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    @click="isUserMenuOpen = false"
                  >
                    <component :is="item.icon" class="w-5 h-5 mr-3 text-gray-500" />
                    {{ item.name }}
                  </router-link>
                </div>
                <div class="py-1 border-t border-gray-200">
                  <button
                    @click="logout"
                    class="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <ArrowLeftOnRectangleIcon class="w-5 h-5 mr-3 text-gray-500" />
                    退出登录
                  </button>
                </div>
              </div>
            </transition>
          </div>
          <router-link v-else to="/login" :class="loginLinkClass"
            ><UserCircleIcon class="h-6 w-6 mr-1" /><span>登录</span></router-link
          >
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="mobile-menu-toggle"
            :class="[{ open: mobileMenuOpen }, iconColorClass]"
            aria-label="Open Menu"
          >
            <span class="bar"></span><span class="bar"></span><span class="bar"></span>
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- Mobile menu panel -->
  <transition name="mobile-menu-fade">
    <div
      v-show="mobileMenuOpen"
      class="fixed inset-0 z-[60] bg-white/95 backdrop-blur-lg flex flex-col p-6 md:hidden"
    >
      <!-- 1. Redesigned Menu Header -->
      <div class="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
        <h2 class="font-serif text-2xl font-bold text-gray-800">菜单</h2>
        <button
          @click="mobileMenuOpen = false"
          class="text-gray-700 z-50 p-2 -mr-2"
          aria-label="Close Menu"
        >
          <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- 2. Main content area -->
      <div class="w-full max-w-sm mx-auto flex flex-col h-full">
        <!-- Search Bar -->
        <div class="relative w-full mb-6">
          <input
            type="text"
            placeholder="搜索..."
            class="w-full pl-12 pr-6 py-4 rounded-full border border-gray-300 bg-white focus:outline-none focus:border-[#C0392B] text-lg placeholder-gray-400 text-gray-800"
          />
          <MagnifyingGlassIcon
            class="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400"
          />
        </div>

        <!-- Navigation Links -->
        <nav class="flex-grow">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="font-bold text-2xl text-gray-800 py-4 w-full text-center block hover:bg-gray-100 transition-colors duration-200 rounded-lg"
            @click="mobileMenuOpen = false"
          >
            {{ t(item.label) }}
          </router-link>
        </nav>

        <!-- User Actions & Footer -->
        <div class="w-full border-t border-gray-200 pt-6">
          <div v-if="authStore.isAuthenticated" class="flex items-center justify-between">
            <div class="flex items-center">
              <img
                class="h-12 w-12 rounded-full object-cover mr-3 border-2 border-gray-300"
                :src="authStore.user?.avatarUrl || 'https://source.unsplash.com/100x100/?portrait'"
                alt="用户头像"
              />
              <div>
                <span class="font-bold text-lg text-gray-800">{{
                  authStore.user?.nickName || '用户名'
                }}</span>
                <router-link
                  to="/profile"
                  @click="mobileMenuOpen = false"
                  class="text-sm text-gray-500 hover:underline block"
                  >查看个人资料</router-link
                >
              </div>
            </div>
            <router-link to="/cart" @click="mobileMenuOpen = false" class="p-2">
              <ShoppingCartIcon class="h-8 w-8 text-gray-700" />
            </router-link>
          </div>
          <div v-else class="flex items-center justify-between">
            <router-link
              to="/login"
              class="flex items-center text-gray-800 font-semibold text-lg"
              @click="mobileMenuOpen = false"
            >
              <UserCircleIcon class="h-10 w-10 mr-2" />登录
            </router-link>
            <router-link to="/cart" @click="mobileMenuOpen = false" class="p-2">
              <ShoppingCartIcon class="h-8 w-8 text-gray-700" />
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted, onMounted } from 'vue'
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  ArchiveBoxIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/vue/24/outline'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useScroll, useScrollDirection } from '@/composables/useScroll'
import { useAuthStore } from '@/stores/auth.store'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const { isScrolled } = useScroll(50)
const { isScrollingDown } = useScrollDirection()
const mobileMenuOpen = ref(false)
const isUserMenuOpen = ref(false)
const userMenuContainer = ref<HTMLElement | null>(null)

const navItems = [
  { label: 'navbar.home', path: '/' },
  { label: 'navbar.gallery', path: '/gallery' },
  { label: 'navbar.knowledge', path: '/knowledge' },
  { label: 'navbar.about', path: '/about' },
  { label: 'navbar.collaboration', path: '/collaboration' },
]

const userMenuItems = [
  { name: '个人资料', path: '/profile', icon: UserCircleIcon },
  { name: '我的订单', path: '/orders', icon: ArchiveBoxIcon },
]

const isHomePage = computed(() => route.path === '/')
const activePath = computed(() => route.path)
const isLight = computed(() => isHomePage.value && !isScrolled.value)

const headerClass = computed(() =>
  isLight.value ? 'h-28 bg-transparent' : 'h-20 bg-white/80 backdrop-blur-lg shadow-md',
)
const logoColorClass = computed(() => (isLight.value ? 'text-white' : 'text-[#C0392B]'))
const logoTextColorClass = computed(() =>
  isLight.value ? 'text-3xl text-white' : 'text-2xl text-gray-800',
)
const linkTextColorClass = computed(() =>
  isLight.value ? 'text-white hover:text-white/80' : 'text-gray-700 hover:text-[#C0392B]',
)
const underlineColorClass = computed(() => (isLight.value ? 'bg-white' : 'bg-[#C0392B]'))
const iconColorClass = computed(() =>
  isLight.value ? 'text-white' : 'text-gray-700 hover:text-[#C0392B]',
)
const loginLinkClass = computed(() => [
  'flex items-center font-semibold text-sm transition-colors duration-300',
  isLight.value ? 'text-white hover:text-white/80' : 'text-gray-700 hover:text-[#C0392B]',
])

const logout = () => {
  isUserMenuOpen.value = false
  authStore.logout()
  router.push('/')
}

// Click outside to close user dropdown
const handleClickOutside = (event: MouseEvent) => {
  if (userMenuContainer.value && !userMenuContainer.value.contains(event.target as Node)) {
    isUserMenuOpen.value = false
  }
}

watch(isUserMenuOpen, (isOpen) => {
  if (isOpen) {
    document.addEventListener('click', handleClickOutside)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
})

watch(mobileMenuOpen, (newValue) => {
  if (newValue) {
    document.body.classList.add('overflow-hidden')
  } else {
    document.body.classList.remove('overflow-hidden')
  }
})

onUnmounted(() => {
  document.body.classList.remove('overflow-hidden')
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style>
/* Styles remain the same */
.mobile-menu-toggle {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  box-sizing: border-box;
  z-index: 10;
}
.mobile-menu-toggle .bar {
  width: 100%;
  height: 3px;
  background-color: currentColor;
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
}
.mobile-menu-toggle.open .bar:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}
.mobile-menu-toggle.open .bar:nth-child(2) {
  opacity: 0;
}
.mobile-menu-toggle.open .bar:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}
.mobile-menu-fade-enter-active,
.mobile-menu-fade-leave-active {
  transition: opacity 0.3s ease;
}
.mobile-menu-fade-enter-from,
.mobile-menu-fade-leave-to {
  opacity: 0;
}
</style>
