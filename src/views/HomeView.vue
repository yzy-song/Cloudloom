<template>
  <div>
    <div class="overflow-hidden">
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
              <div
                class="absolute -top-6 -right-6 w-32 h-32 bg-hanfu-gold rounded-full opacity-20"
              ></div>
              <div
                class="absolute -bottom-6 -left-6 w-48 h-48 bg-hanfu-blue rounded-full opacity-10"
              ></div>

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
                      <div class="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />

                      <div class="absolute inset-0 flex items-center justify-center p-6">
                        <div
                          class="text-center text-white bg-black/30 backdrop-blur-sm rounded-xl p-6 max-w-xs"
                        >
                          <h3 class="text-xl font-display font-bold">{{ slide.title }}</h3>
                          <p class="mt-2 text-sm">{{ slide.description }}</p>
                          <button
                            v-if="slide.buttonText"
                            class="mt-4 btn-outline bg-white/10 hover:bg-white/20"
                            @click="handleSlideAction(slide.action)"
                          >
                            {{ slide.buttonText }}
                          </button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>

                <div class="swiper-pagination !bottom-4 !left-1/2 !-translate-x-1/2"></div>

                <div
                  class="swiper-button-prev !left-2 !text-white !bg-black/30 !w-10 !h-10 !rounded-full after:!text-sm"
                ></div>
                <div
                  class="swiper-button-next !right-2 !text-white !bg-black/30 !w-10 !h-10 !rounded-full after:!text-sm"
                ></div>
              </div>

              <div
                class="absolute -bottom-4 -right-4 bg-white px-6 py-3 rounded-full shadow-lg z-10"
              >
                <span class="font-medium text-hanfu-blue">始于衣冠 · 达于博远</span>
              </div>
            </div>
          </div>
        </div>
      </section>

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
              :routePath="category.routePath"
              :filterKey="category.filterKey"
            />
          </div>
        </div>
      </section>

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
              :id="product.id"
            />
          </div>
        </div>
      </section>

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

    <DevAccessInfo ref="devPanel" />
  </div>
</template>

<script setup lang="ts">
import CategoryCard from '@/components/ui/card/CategoryCard.vue'
import ProductCard from '@/components/ui/card/ProductCard.vue'
import { CheckCircleIcon } from '@heroicons/vue/24/outline'
import { ref, onMounted } from 'vue'
import DevAccessInfo from '@/components/DevAccessInfo.vue'

// 导入Swiper组件
import { Swiper, SwiperSlide } from 'swiper/vue'
import {
  Autoplay as SwiperAutoplay,
  Navigation as SwiperNavigation,
  Pagination as SwiperPagination,
} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

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
  id: number
}

interface HeroSlide {
  title: string
  description: string
  buttonText?: string
  action?: string
}

const categories = ref([
  {
    title: '唐制汉服',
    count: 28,
    routePath: '/gallery?dynasty=tang',
    filterKey: 'tang',
  },
  {
    title: '宋制汉服',
    count: 22,
    routePath: '/gallery?dynasty=song',
    filterKey: 'song',
  },
  {
    title: '明制汉服',
    count: 35,
    routePath: '/gallery?dynasty=ming',
    filterKey: 'ming',
  },
  {
    title: '男装',
    count: 35,
    routePath: '/gallery?dynasty=male',
    filterKey: 'male',
  },
  {
    title: '女装',
    count: 35,
    routePath: '/gallery?dynasty=female',
    filterKey: 'female',
  },
  {
    title: '婚服系列',
    count: 12,
    routePath: '/gallery?category=wedding',
    filterKey: 'wedding',
  },
  {
    title: '汉服周边',
    count: 15,
    routePath: '/gallery?category=accessories',
    filterKey: 'accessories',
  },
  {
    title: '文创产品',
    count: 18,
    routePath: '/gallery?category=cultural',
    filterKey: 'cultural',
  },
])

const featuredProducts: Product[] = [
  { id: 1, title: '唐风齐胸襦裙', category: '盛唐风华', dynasty: '唐', price: 89.99 },
  { id: 2, title: '宋制百迭裙', category: '雅致宋韵', dynasty: '宋', price: 79.99 },
  { id: 3, title: '明制马面裙', category: '端庄明风', dynasty: '明', price: 99.99 },
  { id: 4, title: '汉服刺绣团扇', category: '汉服配饰', dynasty: '通用', price: 24.99 }, // 新增周边
  { id: 5, title: '传统纹样笔记本', category: '文创产品', dynasty: '通用', price: 12.99 }, // 新增文创
]

// 轮播图数据 - 包含汉服、周边和文创产品
const heroSlides: HeroSlide[] = [
  {
    title: '盛唐风华系列',
    description: '体验大唐盛世服饰，感受千年文化魅力',
    buttonText: '查看详情',
    action: '/gallery?dynasty=tang',
  },
  {
    title: '汉服配饰精选',
    description: '团扇、发簪、荷包等传统配饰',
    buttonText: '探索周边',
    action: '/gallery?category=accessories',
  },
  {
    title: '文创产品上新',
    description: '传统纹样设计的日常用品与艺术品',
    buttonText: '浏览文创',
    action: '/gallery?category=cultural',
  },
  {
    title: '儿童汉服特惠',
    description: '专为儿童设计的传统服饰，传承从小开始',
    buttonText: '查看系列',
    action: '/gallery?tag=kids',
  },
]

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

// 处理轮播图按钮点击
function handleSlideAction(action?: string) {
  if (action) {
    // 这里可以添加路由跳转或其他操作
    console.log('Slide action triggered:', action)
    // 实际项目中可以这样跳转：
    // router.push(action)
  }
}
</script>

<style></style>
