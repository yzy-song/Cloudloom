<template>
  <nav
    class="bg-white shadow-sm sticky top-0 z-50 transition-transform duration-300 ease-in-out"
    :class="{ '-translate-y-full': !isHeaderVisible }"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-20 items-center">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <router-link to="/" class="flex items-center group">
            <div
              class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-2 transition-transform group-hover:rotate-12"
            >
              <span class="text-white font-display text-xl">C</span>
            </div>
            <div
              class="text-2xl font-display text-gray-900 tracking-wider group-hover:text-blue-600 transition-colors"
            >
              云织汉服
            </div>
          </router-link>
        </div>

        <!-- 桌面导航 -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="text-gray-700 hover:text-blue-600 transition-colors font-medium relative py-2"
            :class="activePath === item.path ? 'text-blue-600 font-semibold' : ''"
          >
            {{ t(item.label) }}
            <span
              v-if="activePath === item.path"
              class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full"
            ></span>
          </router-link>
          <router-link
            to="/booking"
            class="px-5 py-2 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-blue-700 transition"
          >
            {{ t('navbar.bookNow') }}
          </router-link>
          <LanguageSwitcher />
        </div>

        <!-- 用户菜单 -->
        <div v-if="authStore.isAuthenticated" class="relative ml-3">
          <div>
            <button
              @click="isUserMenuOpen = !isUserMenuOpen"
              class="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
              id="user-menu-button"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <span class="sr-only">打开用户菜单</span>
              <img
                class="h-8 w-8 rounded-full"
                :src="
                  authStore.user?.avatar ||
                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                "
                alt="用户头像"
              />
              <span class="ml-2 text-gray-700">{{
                authStore.user?.nickName !== undefined && authStore.user.nickName !== ''
                  ? authStore.user.nickName
                  : authStore.user?.username
              }}</span>
              <ChevronDownIcon class="ml-1 h-4 w-4 text-gray-400" />
            </button>
          </div>

          <!-- 用户下拉菜单 -->
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <div
              v-show="isUserMenuOpen"
              class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabindex="-1"
            >
              <router-link
                to="/profile"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                tabindex="-1"
                @click="isUserMenuOpen = false"
              >
                个人资料
              </router-link>
              <router-link
                to="/orders"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                tabindex="-1"
                @click="isUserMenuOpen = false"
              >
                我的预约
              </router-link>
              <router-link
                to="/favorites"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                tabindex="-1"
                @click="isUserMenuOpen = false"
              >
                我的收藏
              </router-link>
              <button
                @click="logout"
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                tabindex="-1"
              >
                退出登录
              </button>
            </div>
          </transition>
        </div>
        <router-link
          v-else
          to="/login"
          class="text-gray-700 hover:text-blue-600 transition-colors font-medium"
        >
          登录/注册
        </router-link>

        <!-- 移动端菜单按钮 -->
        <div class="md:hidden flex items-center">
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="p-2">
            <svg class="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 移动端菜单 -->
    <div
      v-show="mobileMenuOpen"
      class="md:hidden bg-white border-t"
      :class="mobileMenuOpen ? 'animate-slideDown' : 'animate-slideUp'"
    >
      <div class="pt-2 pb-3 space-y-1 px-4">
        <router-link
          v-for="item in navItems"
          :key="item.label"
          :to="item.path"
          class="block py-3 text-gray-700 hover:text-blue-600 border-b"
          @click="mobileMenuOpen = false"
          :class="activePath === item.path ? 'text-blue-600 font-semibold' : ''"
        >
          {{ item.label }}
        </router-link>

        <div v-if="authStore.isAuthenticated" class="border-b py-3">
          <div class="flex items-center mb-3">
            <img
              class="h-8 w-8 rounded-full"
              :src="
                authStore.user?.avatar ||
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
              "
              alt="用户头像"
            />
            <span class="ml-2 text-gray-700">{{ authStore.user?.username }}</span>
          </div>
          <router-link
            to="/profile"
            class="block py-2 text-gray-700 hover:text-blue-600"
            @click="mobileMenuOpen = false"
          >
            个人资料
          </router-link>
          <router-link
            to="/orders"
            class="block py-2 text-gray-700 hover:text-blue-600"
            @click="mobileMenuOpen = false"
          >
            我的预约
          </router-link>
          <router-link
            to="/favorites"
            class="block py-2 text-gray-700 hover:text-blue-600"
            @click="mobileMenuOpen = false"
          >
            我的收藏
          </router-link>
          <button
            @click="logout"
            class="block w-full text-left py-2 text-gray-700 hover:text-blue-600"
          >
            退出登录
          </button>
        </div>

        <router-link
          v-else
          to="/login"
          class="block py-3 text-gray-700 hover:text-blue-600 border-b"
          @click="mobileMenuOpen = false"
        >
          登录/注册
        </router-link>

        <button
          class="w-full mt-4 btn-primary"
          @click="($router.push('/booking'), (mobileMenuOpen = false))"
        >
          预约体验
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import LanguageSwitcher from '../ui/LanguageSwitcher.vue'
import { useAuthStore } from '@/stores/auth.store'

const router = useRouter()
const authStore = useAuthStore()

const mobileMenuOpen = ref(false)
const isUserMenuOpen = ref(false)
const { t } = useI18n()
const route = useRoute()

const navItems = [
  { label: 'navbar.home', path: '/' },
  { label: 'navbar.gallery', path: '/gallery' },
  { label: 'navbar.knowledge', path: '/knowledge' },
  { label: 'navbar.about', path: '/about' },
  { label: 'navbar.collaboration', path: '/collaboration' },
]
const activePath = computed(() => route.path)

const isHeaderVisible = ref(true)
let lastScrollPosition = 0

const handleScroll = () => {
  const currentScrollPosition = window.scrollY || document.documentElement.scrollTop
  if (currentScrollPosition > 60) {
    if (currentScrollPosition < lastScrollPosition) {
      isHeaderVisible.value = true // 向上滚动时显示
    } else {
      isHeaderVisible.value = false // 向下滚动时隐藏
    }
  } else {
    isHeaderVisible.value = true // 滚动到顶部时始终显示
  }
  lastScrollPosition = currentScrollPosition
}

// 退出登录
const logout = async () => {
  try {
    await authStore.logout()
    isUserMenuOpen.value = false
    mobileMenuOpen.value = false

    if (route.path !== '/') {
      router.push('/')
    } else {
      window.location.reload()
    }
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

// 监听认证状态变化
watch(
  () => authStore.isAuthenticated,
  (newValue) => {
    if (!newValue) {
      isUserMenuOpen.value = false
      mobileMenuOpen.value = false
    }
  },
)

const navigateToBooking = () => {
  if (!authStore.isAuthenticated) {
    router.push({ path: '/login', query: { redirect: '/booking' } })
  } else {
    router.push('/booking')
  }
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const userMenuButton = document.getElementById('user-menu-button')
  if (userMenuButton && !userMenuButton.contains(target)) {
    isUserMenuOpen.value = false
  }
}

onMounted(() => {
  authStore.initAuth()
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.animate-slideDown {
  animation: slideDown 0.3s ease-out forwards;
  overflow: hidden;
}

.animate-slideUp {
  animation: slideUp 0.3s ease-in forwards;
  overflow: hidden;
}

@keyframes slideDown {
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 300px;
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    max-height: 300px;
    opacity: 1;
  }
  to {
    max-height: 0;
    opacity: 0;
  }
}
</style>
