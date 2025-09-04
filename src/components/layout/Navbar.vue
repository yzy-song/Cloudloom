<!--
 * @Author: yzy
 * @Date: 2025-08-29 09:09:22
 * @LastEditors: yzy
 * @LastEditTime: 2025-09-04 15:12:35
 * @Description: 经过重新设计的导航栏，实现了类似参考网站的滚动“折叠”效果
-->
<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out',
      headerClass,
      // 根据滚动方向添加或移除类以实现隐藏/显示
      { '-translate-y-full': isScrollingDown && isScrolled },
    ]"
  >
    <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
      <div class="flex items-center justify-between h-full">
        <!-- Logo -->
        <router-link to="/" class="flex items-center group">
          <!-- 您可以在这里替换成您的SVG Logo -->
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

        <!-- 桌面端导航菜单 -->
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

        <!-- 右侧图标区域 -->
        <div class="hidden md:flex items-center space-x-6">
          <button :class="iconColorClass">
            <MagnifyingGlassIcon class="h-6 w-6" />
          </button>
          <router-link to="/cart" :class="iconColorClass">
            <ShoppingCartIcon class="h-6 w-6" />
          </router-link>
          <!-- 登录/用户头像 -->
          <div v-if="authStore.isAuthenticated" class="relative">
            <button @click="isUserMenuOpen = !isUserMenuOpen" id="user-menu-button">
              <img
                class="h-9 w-9 rounded-full object-cover border-2 transition-colors duration-300"
                :class="isScrolled || !isHomePage ? 'border-gray-300' : 'border-white/50'"
                :src="authStore.user?.avatar || 'https://source.unsplash.com/100x100/?portrait'"
                alt="用户头像"
              />
            </button>
            <!-- 用户下拉菜单 (此处省略，可复用您之前的代码) -->
          </div>
          <router-link v-else to="/login" :class="loginLinkClass">
            <UserCircleIcon class="h-6 w-6 mr-1" />
            <span>登录</span>
          </router-link>
        </div>

        <!-- 移动端菜单按钮 -->
        <div class="md:hidden">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="mobile-menu-toggle"
            :class="{
              open: mobileMenuOpen,
              'text-gray-800': isScrolled || !isHomePage,
              'text-white': !isScrolled && isHomePage,
            }"
          >
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </button>
        </div>
      </div>
    </div>

    <!-- 移动端菜单面板 (全屏覆盖) -->
    <transition name="mobile-menu-fade">
      <div
        v-if="mobileMenuOpen"
        class="fixed inset-0 z-[60] bg-white/95 backdrop-blur-lg flex flex-col items-center justify-center p-6 md:hidden"
      >
        <button @click="mobileMenuOpen = false" class="absolute top-6 right-6 text-gray-700 z-50">
          <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="w-full max-w-sm flex flex-col items-center space-y-8">
          <!-- 登录/用户头像区域 -->
          <div class="w-full flex justify-between items-center border-b pb-4">
            <div v-if="authStore.isAuthenticated" class="flex items-center">
              <img
                class="h-12 w-12 rounded-full object-cover mr-2 border-2 border-gray-300"
                :src="authStore.user?.avatar || 'https://source.unsplash.com/100x100/?portrait'"
                alt="用户头像"
              />
              <div class="flex flex-col">
                <span class="font-bold text-xl text-gray-800">{{
                  authStore.user?.nickName || '用户'
                }}</span>
                <router-link
                  to="/profile"
                  @click="mobileMenuOpen = false"
                  class="text-sm text-gray-500 hover:underline mt-1"
                >
                  查看个人资料
                </router-link>
              </div>
            </div>
            <router-link
              v-else
              to="/login"
              class="flex items-center text-gray-800 font-semibold text-lg"
              @click="mobileMenuOpen = false"
            >
              <UserCircleIcon class="h-10 w-10 mr-2" />
              登录
            </router-link>
            <router-link to="/cart" @click="mobileMenuOpen = false" class="text-gray-800">
              <ShoppingCartIcon class="h-10 w-10" />
            </router-link>
          </div>

          <!-- 搜索框 -->
          <div class="relative w-full">
            <input
              type="text"
              placeholder="搜索..."
              class="w-full pl-12 pr-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:border-[#C0392B] text-lg placeholder-gray-400"
            />
            <MagnifyingGlassIcon
              class="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400"
            />
          </div>

          <!-- 导航链接 -->
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="font-bold text-2xl text-gray-800 py-4 w-full text-center hover:bg-gray-100 transition-colors duration-200 rounded-lg"
            @click="mobileMenuOpen = false"
          >
            {{ t(item.label) }}
          </router-link>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import { MagnifyingGlassIcon, ShoppingCartIcon, UserCircleIcon } from '@heroicons/vue/24/outline'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useScroll, useScrollDirection } from '@/composables/useScroll'
import { useAuthStore } from '@/stores/auth.store'

const { t } = useI18n()
const route = useRoute()
const authStore = useAuthStore()

// 响应式变量
const { isScrolled } = useScroll(50)
const { isScrollingDown } = useScrollDirection()
const mobileMenuOpen = ref(false)
const isUserMenuOpen = ref(false)

const navItems = [
  { label: 'navbar.home', path: '/' },
  { label: 'navbar.gallery', path: '/gallery' },
  { label: 'navbar.knowledge', path: '/knowledge' },
  { label: 'navbar.about', path: '/about' },
  { label: 'navbar.collaboration', path: '/collaboration' },
]

const isHomePage = computed(() => route.path === '/')
const activePath = computed(() => route.path)

const isLight = computed(() => {
  if (isHomePage.value) {
    return !isScrolled.value
  }
  return false
})

const headerClass = computed(() => {
  if (isLight.value) {
    return 'h-28 bg-transparent'
  }
  return 'h-20 bg-white/80 backdrop-blur-lg shadow-md'
})

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

// 监听 mobileMenuOpen 状态，以禁用或启用页面滚动
watch(mobileMenuOpen, (newValue) => {
  if (newValue) {
    document.body.classList.add('overflow-hidden')
  } else {
    document.body.classList.remove('overflow-hidden')
  }
})

// 组件卸载时确保移除类，避免副作用
onUnmounted(() => {
  document.body.classList.remove('overflow-hidden')
})
</script>

<style>
.slide-right-fade-enter-active,
.slide-right-fade-leave-active {
  transition: opacity 0.2s;
}
.slide-right-fade-enter-from,
.slide-right-fade-leave-to {
  opacity: 0;
}

/* 全屏菜单的淡入淡出动画 */
.mobile-menu-fade-enter-active,
.mobile-menu-fade-leave-active {
  transition: opacity 0.3s ease;
}
.mobile-menu-fade-enter-from,
.mobile-menu-fade-leave-to {
  opacity: 0;
}

/* 汉堡菜单图标动画 */
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
  z-index: 10; /* 确保图标在菜单之上 */
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
</style>
