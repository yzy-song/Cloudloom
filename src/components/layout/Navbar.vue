<!--
 * @Author: yzy
 * @Date: 2025-08-16 11:03:41
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-16 15:28:42
-->
<template>
  <nav class="bg-white shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-20">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <router-link to="/">
            <div class="flex items-center">
              <div
                class="w-10 h-10 rounded-full bg-hanfu-red flex items-center justify-center mr-2"
              >
                <span class="text-white font-display text-xl">华</span>
              </div>
              <div class="text-2xl font-display text-gray-900 tracking-wider">云锦轩</div>
            </div>
          </router-link>
        </div>

        <!-- 桌面导航 -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link
            v-for="item in navItems"
            :key="item.name"
            :to="item.path"
            class="text-gray-700 hover:text-hanfu-red transition-colors font-medium"
            active-class="text-hanfu-red font-semibold"
          >
            {{ item.name }}
          </router-link>
          <button class="btn-primary">预约体验</button>
        </div>

        <!-- 移动端菜单按钮 -->
        <div class="md:hidden flex items-center">
          <button @click="mobileMenuOpen = !mobileMenuOpen">
            <Bars3Icon class="h-8 w-8 text-gray-600" />
          </button>
        </div>
      </div>
    </div>

    <!-- 移动端菜单 -->
    <div v-show="mobileMenuOpen" class="md:hidden bg-white border-t">
      <div class="pt-2 pb-3 space-y-1 px-4">
        <router-link
          v-for="item in navItems"
          :key="item.name"
          :to="item.path"
          class="block py-3 text-gray-700 hover:text-hanfu-red border-b"
          @click="mobileMenuOpen = false"
          active-class="text-hanfu-red font-semibold"
        >
          {{ item.name }}
        </router-link>
        <button class="w-full mt-4 btn-primary">预约体验</button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Bars3Icon } from '@heroicons/vue/24/outline'

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
  { name: 'Test', path: '/tailwind-test' },
]
</script>
