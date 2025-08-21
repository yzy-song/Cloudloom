<template>
  <div class="overflow-hidden relative">
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
              <button
                class="btn-primary hover:scale-[1.03] transition-transform"
                @click="navigateToBooking"
              >
                预约体验
              </button>
              <router-link
                to="/gallery"
                class="btn-outline hover:scale-[1.03] transition-transform"
              >
                查看汉服
              </router-link>
            </div>
          </div>

          <!-- 轮播图区域 -->
          <div class="relative">
            <!-- 装饰性元素 -->
            <div
              class="absolute -top-6 -right-6 w-32 h-32 bg-hanfu-gold rounded-full opacity-20"
            ></div>
            <div
              class="absolute -bottom-6 -left-6 w-48 h-48 bg-hanfu-blue rounded-full opacity-10"
            ></div>

            <!-- Swiper轮播图 -->
            <div class="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
              <Swiper
                :modules="[SwiperAutoplay, SwiperNavigation, SwiperPagination]"
                :slides-per-view="1"
                :loop="true"
                :autoplay="{
                  delay: 5000,
                  disableOnInteraction: false,
                }"
                :pagination="{
                  clickable: true,
                  el: '.swiper-pagination',
                  type: 'bullets',
                }"
                :navigation="{
                  prevEl: '.swiper-button-prev',
                  nextEl: '.swiper-button-next',
                }"
                class="w-full h-full"
              >
                <SwiperSlide v-for="(slide, index) in heroSlides" :key="index">
                  <div class="relative w-full h-full">
                    <!-- 占位图片 -->
                    <div class="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />

                    <!-- 轮播内容 -->
                    <div class="absolute inset-0 flex items-center justify-center p-6">
                      <div
                        class="text-center text-white bg-black/30 backdrop-blur-sm rounded-xl p-6 max-w-xs"
                      >
                        <h3 class="text-xl font-display font-bold">{{ slide.title }}</h3>
                        <p class="mt-2 text-sm">{{ slide.description }}</p>
                        <button
                          v-if="slide.buttonText"
                          class="mt-4 btn-outline bg-white/10 hover:bg-white/20 transition-colors"
                          @click="handleSlideAction(slide.action)"
                        >
                          {{ slide.buttonText }}
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>

              <!-- 自定义分页器 -->
              <div class="swiper-pagination !bottom-4 !left-1/2 !-translate-x-1/2"></div>

              <!-- 自定义导航按钮 -->
              <div
                class="swiper-button-prev !left-2 !text-white !bg-black/30 !w-10 !h-10 !rounded-full after:!text-sm hover:!bg-black/50 transition"
              ></div>
              <div
                class="swiper-button-next !right-2 !text-white !bg-black/30 !w-10 !h-10 !rounded-full after:!text-sm hover:!bg-black/50 transition"
              ></div>
            </div>

            <!-- 装饰性标签 -->
            <div class="absolute -bottom-4 -right-4 bg-white px-6 py-3 rounded-full shadow-lg z-10">
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
          <div
            v-for="category in categories"
            :key="category.id"
            class="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            @click="navigateToGallery(category.filterKey)"
          >
            <div class="bg-gray-200 border-2 border-dashed rounded-2xl aspect-[4/3] w-full"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-6 w-full">
              <h3 class="text-xl font-display font-bold text-white">{{ category.title }}</h3>
              <p class="mt-1 text-white/90">{{ category.productCount }} 件汉服</p>
              <button
                class="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white border border-white px-4 py-2 rounded-full hover:bg-white/10"
              >
                查看系列
              </button>
            </div>
          </div>
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

        <!-- 加载状态 -->
        <div v-if="loading" class="text-center py-12">加载中...</div>

        <!-- 错误状态 -->
        <div v-if="error" class="text-center py-12 text-red-500">{{ error }}</div>

        <!-- 正常显示 -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="product in featuredProducts"
            :key="product.id"
            class="hanfu-card cursor-pointer transform hover:-translate-y-1 transition-transform duration-300"
            @click="navigateToProduct(product.id)"
          >
            <div class="bg-gray-200 border-2 border-dashed rounded-t-2xl aspect-[3/4] w-full"></div>
            <div class="p-5">
              <div class="flex justify-between items-start">
                <h3 class="hanfu-card-title">{{ product.title }}</h3>
                <span class="px-2 py-1 bg-hanfu-blue/10 text-hanfu-blue text-xs rounded-full">
                  {{ product.dynasty }}
                </span>
              </div>
              <p class="text-gray-600 mt-2 text-sm line-clamp-2">
                {{ product.description }}
              </p>
              <div class="mt-4 flex justify-between items-center">
                <span class="text-hanfu-red font-medium">€{{ product.price.toFixed(2) }}</span>
                <span class="text-sm text-hanfu-blue hover:underline">查看详情</span>
              </div>
            </div>
          </div>
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
                <button
                  class="btn-primary hover:scale-[1.03] transition-transform"
                  @click="navigateToCollaboration"
                >
                  了解合作详情
                </button>
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
    <DevAccessInfo />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { CheckCircleIcon } from '@heroicons/vue/24/outline'
import {
  Autoplay as SwiperAutoplay,
  Navigation as SwiperNavigation,
  Pagination as SwiperPagination,
} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useRouter } from 'vue-router'
import type { Category, HeroSlide, Product } from '@/types'
import DevAccessInfo from '@/components/DevAccessInfo.vue'
import { useApi } from '@/composables/useApi'

const router = useRouter()
const { get, loading, error } = useApi()

const categories = ref<Category[]>([])
const featuredProducts = ref<Product[]>([])

// 轮播图数据 - 包含汉服、周边和文创产品
const heroSlides: HeroSlide[] = [
  {
    title: '盛唐风华系列',
    description: '体验大唐盛世服饰，感受千年文化魅力',
    buttonText: '查看详情',
    action: '/gallery?filter=tang',
  },
  {
    title: '汉服配饰精选',
    description: '团扇、发簪、荷包等传统配饰',
    buttonText: '探索周边',
    action: '/gallery?filter=accessories',
  },
  {
    title: '文创产品上新',
    description: '传统纹样设计的日常用品与艺术品',
    buttonText: '浏览文创',
    action: '/gallery?filter=cultural',
  },
  {
    title: '儿童汉服特惠',
    description: '专为儿童设计的传统服饰，传承从小开始',
    buttonText: '查看系列',
    action: '/gallery?filter=kids',
  },
]

// 获取分类数据
const fetchCategories = async () => {
  try {
    const data = await get<Category[]>('/categories')
    if (data) {
      categories.value = data
    }
  } catch (err) {
    console.error('Failed to fetch categories:', err)
  }
}

// 获取精选产品数据
const fetchFeaturedProducts = async () => {
  try {
    const data = await get<Product[]>('/products?featured=true&limit=6')
    if (data) {
      featuredProducts.value = data
    }
  } catch (err) {
    console.error('Failed to fetch featured products:', err)
  }
}

onMounted(() => {
  fetchCategories()
  fetchFeaturedProducts()
})
// 导航方法
function navigateToGallery(filter: string) {
  router.push({ path: '/gallery', query: { filter } })
}

function navigateToProduct(id: number) {
  router.push(`/product/${id}`)
}

function navigateToCollaboration() {
  router.push('/collaboration')
}

function navigateToBooking() {
  router.push('/booking')
}

// 处理轮播图按钮点击
function handleSlideAction(action?: string) {
  if (action) {
    router.push(action)
  }
}
</script>

<style scoped></style>
