<!--
 * @Author: yzy
 * @Date: 2025-08-16 11:15:06
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-22 11:04:16
-->
<template>
  <div
    class="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col group cursor-pointer"
    @click="navigateToDetail"
  >
    <div
      class="aspect-[3/4] bg-gray-200 border-2 border-dashed rounded-t-2xl w-full transform group-hover:scale-105 transition-transform duration-300"
    ></div>
    <div class="p-5 flex-grow flex flex-col">
      <div class="flex-grow">
        <div class="flex justify-between items-start">
          <div>
            <h3
              class="font-display text-lg font-medium text-gray-900 group-hover:text-hanfu-red transition-colors"
            >
              {{ product.title }}
            </h3>
            <p class="text-sm text-gray-500 mt-1">{{ product.category }}</p>
          </div>
          <span class="px-2 py-1 bg-hanfu-blue/10 text-hanfu-blue text-xs rounded-full">
            {{ product.dynasty }}
          </span>
        </div>
        <p class="mt-3 text-gray-600 text-sm line-clamp-3">
          {{
            product.description ||
            '灵感来自盛唐时期的女子服饰，采用真丝提花面料，裙头绣有传统缠枝纹样'
          }}
        </p>
      </div>
      <div class="mt-4 flex justify-between items-center">
        <span class="text-hanfu-red font-medium">€{{ product.price.toFixed(2) }}</span>
        <button
          class="text-hanfu-red hover:text-hanfu-red/80 transition-colors"
          @click.stop="navigateToDetail"
        >
          查看详情
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import type { Product } from '@/types'
const router = useRouter()

interface Props {
  product: Product
}

const props = defineProps<Props>()
function navigateToDetail() {
  router.push({ name: 'ProductDetail', params: { id: props.product.id } })
}
</script>
