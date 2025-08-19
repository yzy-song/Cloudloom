<template>
  <div class="bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <!-- 图片展示 -->
        <div>
          <!-- 主图 -->
          <div class="bg-gray-200 border-2 border-dashed rounded-2xl aspect-[3/4] w-full" />

          <!-- 缩略图 -->
          <div class="mt-6 grid grid-cols-4 gap-4">
            <div
              v-for="n in 4"
              :key="n"
              class="bg-gray-200 border-2 border-dashed rounded-xl aspect-square cursor-pointer hover:opacity-80 transition-opacity"
            />
          </div>
        </div>

        <!-- 产品信息 -->
        <div>
          <div class="sticky top-24">
            <div>
              <span
                class="inline-block px-3 py-1 bg-hanfu-blue/10 text-hanfu-blue rounded-full text-sm"
              >
                {{ product.dynasty }}代汉服
              </span>
              <h1 class="mt-4 text-3xl md:text-4xl font-display text-gray-900">
                {{ product.title }}
              </h1>

              <div class="mt-6 flex items-center">
                <div class="flex text-yellow-400">
                  <StarIcon v-for="i in 5" :key="i" class="h-5 w-5" />
                </div>
                <span class="ml-2 text-gray-600">(28 条评价)</span>
              </div>

              <p class="mt-6 text-xl text-hanfu-red font-medium">€{{ product.price.toFixed(2) }}</p>

              <div class="mt-8 space-y-6">
                <div>
                  <h3 class="text-lg font-medium text-gray-900">产品描述</h3>
                  <p class="mt-2 text-gray-600">
                    {{ product.description }}
                  </p>
                </div>

                <div>
                  <h3 class="text-lg font-medium text-gray-900">工艺细节</h3>
                  <ul class="mt-2 text-gray-600 space-y-2">
                    <li
                      v-for="(detail, index) in product.details"
                      :key="index"
                      class="flex items-start"
                    >
                      <CheckCircleIcon class="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>{{ detail }}</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 class="text-lg font-medium text-gray-900">尺寸选择</h3>
                  <div class="mt-3 flex flex-wrap gap-3">
                    <button
                      v-for="size in product.sizeOptions"
                      :key="size"
                      :class="[
                        'w-14 h-14 rounded-full flex items-center justify-center border-2 transition',
                        selectedSize === size
                          ? 'border-hanfu-red text-hanfu-red'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400',
                      ]"
                      @click="selectedSize = size"
                    >
                      {{ size }}
                    </button>
                  </div>
                </div>

                <div class="flex flex-wrap gap-4">
                  <button class="flex-1 btn-primary py-4">立即预约体验</button>
                  <button class="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                    <HeartIcon class="h-6 w-6 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 相关产品 -->
      <section class="mt-24">
        <h2 class="text-2xl font-display text-gray-900 mb-8">相关推荐</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard
            v-for="(related, index) in relatedProducts"
            :key="index"
            :title="related.title"
            :category="related.category"
            :dynasty="related.dynasty"
            :price="related.price"
            :id="related.id"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { StarIcon, HeartIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'
import ProductCard from '@/components/ui/card/ProductCard.vue'
import { type Product } from '@/types'

const props = defineProps<{
  id: string
}>()

const selectedSize = ref('M')

const product = computed<Product>(() => ({
  id: parseInt(props.id),
  title: '唐风齐胸襦裙 · 霓裳羽衣',
  description:
    '此款齐胸襦裙灵感来自盛唐时期的女子服饰，采用高级真丝提花面料制成，裙头绣有传统缠枝纹样，衣身采用渐变染色工艺。广袖设计飘逸灵动，重现"风吹仙袂飘飘举"的唐诗意境。',
  price: 89.99,
  category: '齐胸襦裙',
  dynasty: '唐',
  tags: ['热门', '新品', '真丝'],
  images: [],
  material: '100%桑蚕丝',
  sizeOptions: ['S', 'M', 'L', 'XL'],
  careInstructions: '手洗，不可漂白，低温熨烫',
  createdAt: '2023-05-10',
  updatedAt: '2023-05-10',
  details: [
    '100% 天然桑蚕丝面料',
    '手工刺绣装饰纹样',
    '可拆卸披帛设计',
    '渐变染色工艺',
    '传统缠枝莲纹样',
  ],
}))

const relatedProducts = computed(() => [
  { id: 1, title: '宋制褙子套装', category: '宋代汉服', dynasty: '宋', price: 79.99 },
  { id: 2, title: '明制立领斜襟长袄', category: '明代汉服', dynasty: '明', price: 92.99 },
  { id: 3, title: '唐风圆领袍', category: '唐代男装', dynasty: '唐', price: 89.99 },
  { id: 4, title: '汉元素改良连衣裙', category: '现代汉服', dynasty: '现代', price: 69.99 },
])
</script>
