<template>
  <nav class="bg-white shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-20 items-center">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <router-link to="/" class="flex items-center group">
            <div
              class="w-10 h-10 rounded-full bg-hanfu-red flex items-center justify-center mr-2 transition-transform group-hover:rotate-12"
            >
              <span class="text-white font-display text-xl">华</span>
            </div>
            <div
              class="text-2xl font-display text-gray-900 tracking-wider group-hover:text-hanfu-red transition-colors"
            >
              云锦轩
            </div>
          </router-link>
        </div>

        <!-- 桌面导航 -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link
            v-for="item in navItems"
            :key="item.name"
            :to="item.path"
            class="text-gray-700 hover:text-hanfu-red transition-colors font-medium relative py-2"
            :class="activePath === item.path ? 'text-hanfu-red font-semibold' : ''"
          >
            {{ item.name }}
            <span
              v-if="activePath === item.path"
              class="absolute bottom-0 left-0 w-full h-0.5 bg-hanfu-red rounded-full"
            ></span>
          </router-link>
          <button
            class="btn-primary hover:scale-[1.03] transition-transform"
            @click="navigateToBooking"
          >
            预约体验
          </button>

          <!-- 用户菜单 -->
          <div v-if="authStore.isAuthenticated" class="relative ml-3">
            <div>
              <button
                @click="isUserMenuOpen = !isUserMenuOpen"
                class="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hanfu-red"
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
                <span class="ml-2 text-gray-700">{{ authStore.user?.username }}</span>
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
            class="text-gray-700 hover:text-hanfu-red transition-colors font-medium"
          >
            登录/注册
          </router-link>
        </div>

        <!-- 移动端菜单按钮 -->
        <div class="md:hidden flex items-center">
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="p-2">
            <Bars3Icon class="h-8 w-8 text-gray-600" />
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
          :key="item.name"
          :to="item.path"
          class="block py-3 text-gray-700 hover:text-hanfu-red border-b"
          @click="mobileMenuOpen = false"
          :class="activePath === item.path ? 'text-hanfu-red font-semibold' : ''"
        >
          {{ item.name }}
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
            class="block py-2 text-gray-700 hover:text-hanfu-red"
            @click="mobileMenuOpen = false"
          >
            个人资料
          </router-link>
          <router-link
            to="/orders"
            class="block py-2 text-gray-700 hover:text-hanfu-red"
            @click="mobileMenuOpen = false"
          >
            我的预约
          </router-link>
          <router-link
            to="/favorites"
            class="block py-2 text-gray-700 hover:text-hanfu-red"
            @click="mobileMenuOpen = false"
          >
            我的收藏
          </router-link>
          <button
            @click="logout"
            class="block w-full text-left py-2 text-gray-700 hover:text-hanfu-red"
          >
            退出登录
          </button>
        </div>

        <router-link
          v-else
          to="/login"
          class="block py-3 text-gray-700 hover:text-hanfu-red border-b"
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Bars3Icon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const mobileMenuOpen = ref(false)
const isUserMenuOpen = ref(false)

interface NavItem {
  name: string
  path: string
}

const navItems: NavItem[] = [
  { name: '首页', path: '/' },
  { name: '汉服展示', path: '/gallery' },
  { name: '汉服知识', path: '/knowledge' },
  { name: '关于我们', path: '/about' },
  { name: '商业合作', path: '/collaboration' },
  { name: '测试页', path: '/test' },
]

// 当前激活的路由
const activePath = computed(() => route.path)

// 退出登录
const logout = async () => {
  try {
    await authStore.logout()
    isUserMenuOpen.value = false
    mobileMenuOpen.value = false

    // 强制刷新页面以确保状态完全重置
    if (route.path !== '/') {
      router.push('/')
    } else {
      // 如果已经在首页，强制重新加载
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
      // 用户登出时关闭所有菜单
      isUserMenuOpen.value = false
      mobileMenuOpen.value = false
    }
  },
)

// 预约体验
const navigateToBooking = () => {
  if (!authStore.isAuthenticated) {
    // 如果未登录，跳转到登录页，并携带重定向参数
    router.push({ path: '/login', query: { redirect: '/booking' } })
  } else {
    router.push('/booking')
  }
}

// 点击外部关闭用户菜单
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('#user-menu-button')) {
    isUserMenuOpen.value = false
  }
}

onMounted(() => {
  // 初始化用户状态
  authStore.initAuth()

  // 添加全局点击监听
  document.addEventListener('click', handleClickOutside)
})

// 移除监听
onUnmounted(() => {
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
