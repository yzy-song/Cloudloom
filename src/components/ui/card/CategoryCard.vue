<!--
 * @Author: yzy
 * @Date: 2025-08-16 11:39:53
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-18 08:22:37
-->
<template>
  <router-link
    :to="{ path: '/gallery', query: { filter: filterKey } }"
    class="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 block"
  >
    <!-- 背景图片 -->
    <div class="bg-gray-200 border-2 border-dashed rounded-2xl aspect-[4/3] w-full"></div>

    <!-- 覆盖层 -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

    <!-- 内容 -->
    <div class="absolute bottom-0 left-0 p-6 w-full">
      <h3 class="text-xl font-display font-bold text-white">{{ title }}</h3>
      <p class="mt-1 text-white/90">{{ count }} 件汉服</p>
      <button
        class="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white border border-white px-4 py-2 rounded-full hover:bg-white/10"
        @click.prevent="$emit('view-category')"
      >
        查看系列
      </button>
    </div>

    <!-- 装饰元素 -->
    <div class="absolute top-4 right-4">
      <div class="bg-hanfu-gold text-hanfu-blue rounded-full px-3 py-1 text-xs font-medium">
        精选系列
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  count: number
  routePath: string // 新增路由路径属性
  filterKey: string
}>()

defineEmits(['view-category'])
</script>

<style scoped>
/* 添加微妙的缩放动画 */
/* 修复后的样式 */
.group:hover [class*='aspect-[4/3]'] {
  transform: scale(1.05);
  transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
}
</style>
