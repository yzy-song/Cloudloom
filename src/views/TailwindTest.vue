<!--
 * @Author: yzy
 * @Date: 2025-08-16 12:30:50
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-16 15:30:09
-->
<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
      <h1 class="text-3xl font-bold text-center mb-6 text-hanfu-red">Tailwind CSS v4 测试</h1>

      <div class="space-y-4 sm:space-y-6">
        <!-- 颜色测试 -->
        <div class="p-4 bg-hanfu-blue/10 rounded-lg">
          <h2 class="text-xl font-semibold mb-2">颜色测试</h2>
          <div class="flex space-x-4">
            <div class="w-12 h-12 bg-hanfu-red rounded-md"></div>
            <div class="w-12 h-12 bg-hanfu-blue rounded-md"></div>
            <div class="w-12 h-12 bg-hanfu-gold rounded-md"></div>
          </div>
        </div>

        <!-- 字体测试 -->
        <div class="p-4 bg-hanfu-red/10 rounded-lg">
          <h2 class="text-xl font-semibold mb-2">字体测试</h2>
          <p class="font-display text-lg">这是标题字体 (Noto Serif SC)</p>
          <p class="mt-2">这是正文字体 (Open Sans)</p>
        </div>

        <!-- 响应式测试 -->
        <div class="p-4 bg-hanfu-gold/10 rounded-lg">
          <h2 class="text-xl font-semibold mb-2">响应式测试</h2>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="bg-gray-200 p-3 rounded text-center">1</div>
            <div class="bg-gray-200 p-3 rounded text-center">2</div>
            <div class="bg-gray-200 p-3 rounded text-center">3</div>
          </div>
        </div>

        <!-- 按钮测试 -->
        <div class="p-4 bg-white border rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4">按钮测试</h2>
          <div class="flex flex-wrap gap-4">
            <button class="btn-primary">主要按钮</button>
            <button class="btn-outline">轮廓按钮</button>
            <button class="px-4 py-2 bg-hanfu-blue text-white rounded-full hover:bg-opacity-90">
              自定义按钮
            </button>
          </div>
        </div>

        <!-- 成功指示 -->
        <div class="p-4 bg-green-100 text-green-700 rounded-lg flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Tailwind CSS v4 配置成功！</span>
        </div>
      </div>

      <!-- 汉服展示测试 -->
      <div class="mt-8">
        <h2 class="text-xl font-display font-bold mb-4">汉服展示测试</h2>
        <div class="hanfu-card">
          <div class="bg-gray-200 h-48 w-full"></div>
          <div class="p-4">
            <div class="flex justify-between">
              <h3 class="font-display text-lg font-medium">唐风齐胸襦裙</h3>
              <span class="text-hanfu-red font-medium">唐代</span>
            </div>
            <p class="mt-2 text-gray-600 text-sm">灵感来自盛唐时期的女子服饰，采用真丝提花面料</p>
            <button
              class="mt-4 w-full py-2 border border-hanfu-red text-hanfu-red rounded-lg hover:bg-red-50 transition"
            >
              查看详情
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
