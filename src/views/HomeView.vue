<template>
  <div class="overflow-hidden">
    <!-- 英雄区域 -->
    <section class="relative bg-gradient-to-r from-hanfu-blue/10 to-hanfu-red/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-display text-gray-900 leading-tight">
              发现东方美学<br />
              <span class="text-hanfu-red">汉服文化体验</span>
            </h1>
            <p class="mt-6 text-lg text-gray-600 max-w-lg">
              在爱尔兰体验纯正的中国传统服饰文化，专业汉服租赁、摄影服务与文化沙龙，让东方之美绽放异域
            </p>
            <div class="mt-10 flex flex-wrap gap-4">
              <button class="btn-primary">预约体验</button>
              <router-link to="/gallery" class="btn-outline"> 查看汉服 </router-link>
            </div>
          </div>
          <div class="relative">
            <!-- 装饰性元素 -->
            <div
              class="absolute -top-6 -right-6 w-32 h-32 bg-hanfu-gold rounded-full opacity-20"
            ></div>
            <div
              class="absolute -bottom-6 -left-6 w-48 h-48 bg-hanfu-blue rounded-full opacity-10"
            ></div>

            <!-- 主图 -->
            <div class="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
              <div class="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
            </div>

            <!-- 装饰性标签 -->
            <div class="absolute -bottom-4 -right-4 bg-white px-6 py-3 rounded-full shadow-lg">
              <span class="font-medium text-hanfu-blue">始于衣冠 · 达于博远</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 特色分类 -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl md:text-4xl font-display text-gray-900">探索汉服世界</h2>
          <p class="mt-4 text-lg text-gray-600">按朝代、形制与场景探索我们精心准备的汉服收藏</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <CategoryCard
            v-for="(category, index) in categories"
            :key="index"
            :title="category.title"
            :count="category.count"
            :image="category.image"
          />
        </div>
      </div>
    </section>

    <!-- 精选汉服展示 -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center mb-12">
          <div>
            <h2 class="text-3xl font-display text-gray-900">精选汉服</h2>
            <p class="mt-2 text-gray-600">我们最受欢迎的汉服系列</p>
          </div>
          <router-link to="/gallery" class="text-hanfu-red hover:underline font-medium">
            查看全部 &rarr;
          </router-link>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProductCard
            v-for="(product, index) in featuredProducts"
            :key="index"
            :title="product.title"
            :category="product.category"
            :dynasty="product.dynasty"
            :price="product.price"
          />
        </div>
      </div>
    </section>

    <!-- 合作邀请 -->
    <section class="py-16 bg-hanfu-green/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-3xl shadow-hanfu p-8 md:p-12">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 class="text-3xl md:text-4xl font-display text-gray-900">寻找合作伙伴</h2>
              <p class="mt-4 text-lg text-gray-600">
                我们正在爱尔兰寻找合作伙伴，共同推广汉服文化。无论您是礼品店、文化中心还是活动策划方，我们都期待与您合作。
              </p>
              <ul class="mt-6 space-y-3">
                <li class="flex items-start">
                  <div class="flex-shrink-0 mt-1">
                    <CheckCircleIcon class="h-5 w-5 text-hanfu-green" />
                  </div>
                  <span class="ml-3 text-gray-700">批发价格优惠</span>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0 mt-1">
                    <CheckCircleIcon class="h-5 w-5 text-hanfu-green" />
                  </div>
                  <span class="ml-3 text-gray-700">独家文化内容支持</span>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0 mt-1">
                    <CheckCircleIcon class="h-5 w-5 text-hanfu-green" />
                  </div>
                  <span class="ml-3 text-gray-700">联合营销推广</span>
                </li>
              </ul>
              <div class="mt-8">
                <router-link to="/collaboration" class="btn-primary"> 了解合作详情 </router-link>
              </div>
            </div>
            <div class="relative">
              <div class="bg-gray-200 border-2 border-dashed rounded-2xl aspect-video w-full" />
              <div class="absolute -bottom-4 -left-4 bg-white rounded-xl px-6 py-4 shadow-lg">
                <div class="text-hanfu-blue font-medium">爱尔兰汉服文化推广计划</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <button
    v-if="isDev"
    @click="toggleDevPanel"
    class="fixed bottom-4 left-4 bg-blue-500 text-white p-3 rounded-full shadow-lg z-50 hover:bg-blue-600 transition"
    aria-label="开发模式控制"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    </svg>
  </button>

  <!-- 开发访问信息组件 -->
  <DevAccessInfo ref="devPanel" />
</template>

<script setup lang="ts">
import CategoryCard from '@/components/ui/card/CategoryCard.vue'
import ProductCard from '@/components/ui/card/ProductCard.vue'
import { CheckCircleIcon } from '@heroicons/vue/24/outline'

interface Category {
  title: string
  count: number
  image?: string
}

interface Product {
  title: string
  category: string
  dynasty: string
  price: number
}

const categories: Category[] = [
  { title: '唐制汉服', count: 28 },
  { title: '宋制汉服', count: 22 },
  { title: '明制汉服', count: 35 },
  { title: '婚服系列', count: 12 },
]

const featuredProducts: Product[] = [
  { title: '唐风齐胸襦裙', category: '盛唐风华', dynasty: '唐', price: 89.99 },
  { title: '宋制百迭裙', category: '雅致宋韵', dynasty: '宋', price: 79.99 },
  { title: '明制马面裙', category: '端庄明风', dynasty: '明', price: 99.99 },
]

import { ref, onMounted } from 'vue'
import DevAccessInfo from '@/components/DevAccessInfo.vue'

const isDev = ref(false)
const devPanel = ref<InstanceType<typeof DevAccessInfo> | null>(null)

onMounted(() => {
  isDev.value = import.meta.env.DEV
})

// 切换开发面板显示
function toggleDevPanel() {
  if (devPanel.value) {
    // 通过组件引用来控制面板显示
    const panel = devPanel.value as any
    panel.isVisible = !panel.isVisible

    // 保存状态到本地存储
    localStorage.setItem('devPanelVisible', panel.isVisible.toString())
  }
}
</script>
