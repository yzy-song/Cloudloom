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
            @click="$router.push('/booking')"
          >
            预约体验
          </button>
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
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Bars3Icon } from '@heroicons/vue/24/outline'

const route = useRoute()
const mobileMenuOpen = ref(false)

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
]

// 当前激活的路由
const activePath = computed(() => route.path)
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
