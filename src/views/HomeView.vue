<!--
 * @Author: yzy
 * @Date: 2025-08-29 09:09:22
 * @LastEditors: yzy
 * @LastEditTime: 2025-09-01 17:20:11
 * @Description: 全新设计的首页，已将原有版块以新风格恢复，并添加了轮播图组件
-->
<template>
  <div class="home-view overflow-x-hidden bg-[#FBF9F6]">
    <!-- Section 1: Hero Banner with Swiper Carousel -->
    <section class="relative h-screen w-full flex items-center justify-center text-white">
      <swiper
        :modules="[Autoplay, Pagination, Navigation]"
        :loop="true"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
        :pagination="{ clickable: true }"
        :navigation="true"
        class="absolute inset-0 w-full h-full"
      >
        <swiper-slide v-for="(slide, index) in homeSlides" :key="index">
          <div class="absolute inset-0 bg-black overflow-hidden">
            <img
              :src="slide.image"
              :alt="slide.title"
              class="w-full h-full object-cover opacity-60"
            />
          </div>
          <div class="relative z-10 text-center px-4">
            <h1
              class="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider mb-4 animate-fade-in-down"
              style="text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5)"
            >
              {{ slide.title }}
            </h1>
            <p
              class="text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-fade-in-up"
              style="animation-delay: 0.3s; text-shadow: 0 1px 5px rgba(0, 0, 0, 0.5)"
            >
              {{ slide.description }}
            </p>
            <router-link
              :to="slide.action || '/'"
              class="inline-block bg-[#C0392B] text-white font-semibold tracking-wider px-8 py-3 rounded-full text-lg hover:bg-[#a53125] transition-transform hover:scale-105 duration-300 animate-fade-in-up"
              style="animation-delay: 0.6s"
            >
              {{ slide.buttonText }}
            </router-link>
          </div>
        </swiper-slide>
      </swiper>
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg class="w-8 h-8 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>

    <!-- Section 2: Our Services -->
    <section class="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div class="max-w-screen-xl mx-auto">
        <div class="text-center mb-16" v-observe-animation>
          <h2 class="font-serif text-4xl md:text-5xl font-bold tracking-wider mb-4">
            雅集·我们的服务
          </h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            从个人写真到团体派对，我们为您量身打造独一无二的汉服文化体验。
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="service-card p-8 bg-white rounded-lg shadow-lg text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            v-observe-animation
            :style="{ 'animation-delay': `${index * 150}ms` }"
          >
            <div class="flex justify-center items-center mb-5">
              <component :is="feature.icon" class="w-12 h-12 text-[#C0392B]" />
            </div>
            <h3 class="font-serif text-2xl font-semibold mb-3">{{ t(feature.title) }}</h3>
            <p class="text-gray-500">{{ t(feature.desc) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Gallery -->
    <section class="py-24 sm:py-32 bg-white px-4 sm:px-6 lg:px-8">
      <div class="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div class="text-center lg:text-left" v-observe-animation="'animate-fade-in-right'">
          <h2 class="font-serif text-4xl md:text-5xl font-bold tracking-wider mb-4">
            风华·刹那惊鸿
          </h2>
          <p class="text-lg text-gray-600 mb-8">
            每一件汉服都承载着历史的温度，每一次回眸都定格了东方的神韵。
          </p>
          <router-link to="/gallery" class="text-[#C0392B] font-semibold text-lg group">
            <span>探索更多</span>
            <span class="inline-block transition-transform duration-300 group-hover:translate-x-2"
              >→</span
            >
          </router-link>
        </div>
        <div class="grid grid-cols-2 gap-4" v-observe-animation="'animate-fade-in-left'">
          <img
            src="https://images.unsplash.com/photo-1614204424391-924545393896?q=80&w=870&auto=format&fit=crop"
            alt="Hanfu Gallery 1"
            class="rounded-lg shadow-xl aspect-[3/4] object-cover transition-transform duration-500 hover:scale-105"
          />
          <img
            src="https://images.unsplash.com/photo-1629806934479-715d555c4d29?q=80&w=930&auto=format&fit=crop"
            alt="Hanfu Gallery 2"
            class="rounded-lg shadow-xl aspect-[3/4] object-cover mt-8 transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>
    </section>

    <!-- Section 4: Experience Steps (Restored) -->
    <section class="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div class="max-w-screen-xl mx-auto">
        <div class="text-center mb-16" v-observe-animation>
          <h2 class="font-serif text-4xl md:text-5xl font-bold tracking-wider mb-4">
            流程·体验之旅
          </h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            仅需三步，即可开启您的汉服穿越之旅，简单而纯粹。
          </p>
        </div>
        <div class="relative">
          <!-- Dashed line for desktop -->
          <div
            class="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-repeat-x bg-center"
            style="
              background-image: linear-gradient(to right, #ccc 60%, transparent 40%);
              background-size: 20px 2px;
            "
          ></div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
            <div
              v-for="(step, index) in steps"
              :key="index"
              class="step-item text-center flex flex-col items-center"
              v-observe-animation
              :style="{ 'animation-delay': `${index * 150}ms` }"
            >
              <div
                class="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center text-4xl font-serif font-bold text-[#C0392B] mb-6 border-4 border-red-100"
              >
                {{ index + 1 }}
              </div>
              <h3 class="font-serif text-2xl font-semibold mb-3">{{ t(step.title) }}</h3>
              <p class="text-gray-500">{{ t(step.desc) }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 5: Testimonials (Restored) -->
    <section class="py-24 sm:py-32 bg-white px-4 sm:px-6 lg:px-8">
      <div class="max-w-screen-xl mx-auto">
        <div class="text-center mb-16" v-observe-animation>
          <h2 class="font-serif text-4xl md:text-5xl font-bold tracking-wider mb-4">
            回响·佳人佳话
          </h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            听听那些曾与我们一同追寻古典之美的朋友们怎么说。
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(item, index) in testimonials"
            :key="index"
            class="testimonial-card p-8 bg-gray-50 rounded-lg"
            v-observe-animation
            :style="{ 'animation-delay': `${index * 150}ms` }"
          >
            <p class="text-gray-600 italic mb-6">"{{ t(item.text) }}"</p>
            <div class="flex items-center">
              <img
                :src="`https://source.unsplash.com/100x100/?portrait,${item.name}`"
                :alt="item.name"
                class="w-12 h-12 rounded-full object-cover mr-4"
              />
              <span class="font-semibold text-gray-800">{{ item.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 6: FAQ (Restored) -->
    <section class="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <div class="text-center mb-16" v-observe-animation>
          <h2 class="font-serif text-4xl md:text-5xl font-bold tracking-wider mb-4">
            解惑·常见问题
          </h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">为您解答关于汉服体验的常见疑惑。</p>
        </div>
        <div class="space-y-4">
          <div
            v-for="(faq, idx) in faqs"
            :key="idx"
            class="faq-item bg-white rounded-lg shadow-sm overflow-hidden"
            v-observe-animation
            :style="{ 'animation-delay': `${idx * 100}ms` }"
          >
            <button
              @click="toggleFaq(idx)"
              class="flex justify-between items-center w-full p-6 text-left font-semibold text-lg text-gray-800"
            >
              <span>{{ t(faq.q) }}</span>
              <ChevronUpIcon
                class="w-6 h-6 text-gray-500 transition-transform duration-300"
                :class="openFaq === idx ? 'rotate-0' : 'rotate-180'"
              />
            </button>
            <transition
              enter-active-class="transition-all duration-300 ease-out"
              leave-active-class="transition-all duration-200 ease-in"
              enter-from-class="max-h-0 opacity-0"
              enter-to-class="max-h-96 opacity-100"
              leave-from-class="max-h-96 opacity-100"
              leave-to-class="max-h-0 opacity-0"
            >
              <div v-if="openFaq === idx" class="px-6 pb-6 text-gray-600">
                {{ t(faq.a) }}
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'

import { ref, type Directive } from 'vue'
import {
  SparklesIcon,
  CameraIcon,
  UserGroupIcon,
  BuildingStorefrontIcon,
  ChevronUpIcon,
} from '@heroicons/vue/24/outline'

import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import type { HeroSlide } from '@/types'

const router = useRouter()
const { t } = useI18n()

// 轮播图数据，用于展示在首页顶部
const homeSlides = ref<HeroSlide[]>([
  {
    title: '盛唐风华系列',
    description: '体验大唐盛世服饰，感受千年文化魅力',
    buttonText: '查看详情',
    action: '/gallery?filter=tang',
    image: '/images/home-banner/banner01.png',
  },
  {
    title: '汉服配饰精选',
    description: '团扇、发簪、荷包等传统配饰',
    buttonText: '探索周边',
    action: '/gallery?filter=accessories',
    image: '/images/home-banner/banner02.png',
  },
  {
    title: '文创产品上新',
    description: '传统纹样设计的日常用品与艺术品',
    buttonText: '浏览文创',
    action: '/gallery?filter=cultural',
    image: '/images/home-banner/banner03.png',
  },
  {
    title: '儿童汉服特惠',
    description: '专为儿童设计的传统服饰，传承从小开始',
    buttonText: '查看系列',
    action: '/gallery?filter=kids',
    image: '/images/home-banner/banner04.png',
  },
])

// 服务特色数据
const features = [
  { icon: SparklesIcon, title: 'home.feature1Title', desc: 'home.feature1Desc' },
  { icon: CameraIcon, title: 'home.feature2Title', desc: 'home.feature2Desc' },
  { icon: UserGroupIcon, title: 'home.feature3Title', desc: 'home.feature3Desc' },
  { icon: BuildingStorefrontIcon, title: 'home.feature4Title', desc: 'home.feature4Desc' },
]

// 体验流程数据
const steps = [
  { title: 'home.step1Title', desc: 'home.step1Desc' },
  { title: 'home.step2Title', desc: 'home.step2Desc' },
  { title: 'home.step3Title', desc: 'home.step3Desc' },
]

// 客户评价数据
const testimonials = [
  { name: 'Emily', text: 'home.testimonial1' },
  { name: 'Liam', text: 'home.testimonial2' },
  { name: 'Sophia', text: 'home.testimonial3' },
]

// FAQ 数据
const faqs = [
  { q: 'home.faq1Q', a: 'home.faq1A' },
  { q: 'home.faq2Q', a: 'home.faq2A' },
  { q: 'home.faq3Q', a: 'home.faq3A' },
]

const openFaq = ref<number | null>(null)
const toggleFaq = (idx: number) => {
  openFaq.value = openFaq.value === idx ? null : idx
}

// 自定义指令：用于元素进入视口时添加动画
const vObserveAnimation: Directive<HTMLElement, string> = {
  mounted(el, binding) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animationClass = binding.value || 'animate-fade-in-up'
            el.classList.add('opacity-100', animationClass)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.15 },
    )
    el.classList.add('opacity-0', 'transition-opacity', 'duration-1000', 'ease-out')
    observer.observe(el)
  },
}

// 处理轮播图按钮点击
function handleSlideAction(action?: string) {
  if (action) {
    router.push(action)
  }
}
</script>

<style scoped>
/* 定义各种动画效果 */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-down {
  animation: fadeInDown 1s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  transform: translateY(30px);
  animation: fadeInUp 1s ease-out forwards;
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.animate-fade-in-right {
  transform: translateX(-50px);
  animation: fadeInRight 1s ease-out forwards;
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.animate-fade-in-left {
  transform: translateX(50px);
  animation: fadeInLeft 1s ease-out forwards;
}

.swiper {
  width: 100%;
  height: 100%;
}
</style>
