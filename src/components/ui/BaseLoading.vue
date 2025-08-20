<!--
 * @Author: yzy
 * @Date: 2025-08-20 16:50:16
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-20 16:50:20
-->
<template>
  <div class="flex items-center justify-center p-8">
    <div class="relative">
      <!-- Spinner -->
      <div
        class="w-12 h-12 border-4 border-hanfu-red border-t-transparent rounded-full animate-spin"
      ></div>

      <!-- Optional text -->
      <div v-if="text" class="mt-4 text-center">
        <p class="text-gray-600">{{ text }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  text?: string
}

defineProps<Props>()
</script>
