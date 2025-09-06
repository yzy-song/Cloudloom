<template>
  <div class="home-view overflow-x-hidden bg-[#FBF9F6]">
    <!-- Section 1: Hero Banner with Swiper Carousel -->
    <section
      class="relative w-full h-[60vh] md:h-[800px] flex items-center justify-center text-white"
    >
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
          <div class="relative z-10 text-center px-4 pt-128">
            <h1
              class="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider mb-4 animate-fade-in-down"
              style="text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5)"
            >
              {{ t(slide.title) }}
            </h1>
            <p
              class="text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-fade-in-up"
              style="animation-delay: 0.3s; text-shadow: 0 1px 5px rgba(0, 0, 0, 0.5)"
            >
              {{ t(slide.description) }}
            </p>
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
            {{ t('home.servicesTitle') }}
          </h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            {{ t('home.servicesDesc') }}
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="service-card p-8 bg-white rounded-lg shadow-lg text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
            v-observe-animation
            :style="{ 'animation-delay': `${index * 150}ms` }"
            @click="navigateTo(feature.link)"
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
            {{ t('home.galleryTitle') }}
          </h2>
          <p class="text-lg text-gray-600 mb-8">
            {{ t('home.galleryDesc') }}
          </p>
          <router-link to="/gallery" class="text-[#C0392B] font-semibold text-lg group">
            <span>{{ t('home.exploreMore') }}</span>
            <span class="inline-block transition-transform duration-300 group-hover:translate-x-2"
              >→</span
            >
          </router-link>
        </div>
        <div
          class="grid grid-cols-2 gap-4"
          style="perspective: 1000px"
          v-observe-animation="'animate-fade-in-left'"
        >
          <router-link to="/gallery">
            <img
              src="/images/home-others/hanfu01.jpeg"
              alt="Hanfu Gallery 1"
              class="rounded-lg shadow-xl aspect-[3/4] object-cover w-full h-full"
              :style="image1Style"
              @mousemove="handleMouseMove1"
              @mouseleave="handleMouseLeave1"
            />
          </router-link>
          <router-link to="/gallery">
            <img
              src="/images/home-others/hanfu02.jpeg"
              alt="Hanfu Gallery 2"
              class="rounded-lg shadow-xl aspect-[3/4] object-cover mt-8 w-full h-full"
              :style="image2Style"
              @mousemove="handleMouseMove2"
              @mouseleave="handleMouseLeave2"
            />
          </router-link>
        </div>
      </div>
    </section>

    <!-- Section 4: Experience Steps (Restored) -->
    <section class="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div class="max-w-screen-xl mx-auto">
        <div class="text-center mb-16" v-observe-animation>
          <h2 class="font-serif text-4xl md:text-5xl font-bold tracking-wider mb-4">
            {{ t('home.stepsTitle') }}
          </h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            {{ t('home.stepsDesc') }}
          </p>
        </div>
        <div class="relative">
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

    <!-- Section 5: Testimonials (REDESIGNED) -->
    <section class="py-24 sm:py-32 bg-white px-4 sm:px-6 lg:px-8">
      <div class="max-w-screen-xl mx-auto">
        <div class="text-center mb-16" v-observe-animation>
          <h2 class="font-serif text-4xl md:text-5xl font-bold tracking-wider mb-4">
            {{ t('home.testimonialsTitle') }}
          </h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            {{ t('home.testimonialsDesc') }}
          </p>
        </div>

        <div class="relative" v-observe-animation>
          <swiper
            :modules="[Navigation, Pagination, Autoplay]"
            :loop="true"
            :autoplay="{ delay: 7000, disableOnInteraction: false }"
            :pagination="{ el: '.testimonial-pagination', clickable: true }"
            :navigation="{ nextEl: '.testimonial-next', prevEl: '.testimonial-prev' }"
            :slides-per-view="1"
            :space-between="30"
            :breakpoints="{
              '768': { slidesPerView: 2 },
              '1024': { slidesPerView: 3 },
            }"
            class="pb-16"
          >
            <swiper-slide v-for="(item, index) in testimonials" :key="index" class="h-auto">
              <div class="testimonial-card bg-gray-50 rounded-lg p-8 h-full flex flex-col">
                <svg
                  class="w-12 h-12 text-red-100 mb-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 448 512"
                >
                  <path
                    d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h112c17.7 0 32 14.3 32 32s-14.3 32-32 32H64v32c0 30.9-25.1 56-56 56h-8c-17.7 0-32-14.3-32-32s14.3-32 32-32h8c13.3 0 24-10.7 24-24v-32H0V216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h112c17.7 0 32 14.3 32 32s-14.3 32-32 32H320v32c0 30.9-25.1 56-56 56h-8c-17.7 0-32-14.3-32-32s14.3-32 32-32h8c13.3 0 24-10.7 24-24v-32H256V216z"
                  />
                </svg>
                <p class="text-gray-600 italic mb-6 flex-grow">"{{ t(item.text) }}"</p>
                <div class="flex items-center mt-auto pt-4 border-t border-gray-200">
                  <img
                    :src="item.avatar"
                    :alt="t(item.name)"
                    class="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <span class="font-semibold text-gray-800">{{ t(item.name) }}</span>
                    <span class="text-sm text-gray-500 block">{{ t(item.role) }}</span>
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper>

          <!-- Custom Navigation & Pagination -->
          <div
            class="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center w-full"
          >
            <div class="testimonial-pagination flex space-x-2"></div>
          </div>
          <button
            class="testimonial-prev absolute top-1/2 -left-4 md:-left-6 transform -translate-y-1/2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition duration-300 z-10"
          >
            <ChevronLeftIcon class="w-6 h-6 text-gray-600" />
          </button>
          <button
            class="testimonial-next absolute top-1/2 -right-4 md:-right-6 transform -translate-y-1/2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition duration-300 z-10"
          >
            <ChevronRightIcon class="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </section>

    <!-- Section 6: FAQ (Restored) -->
    <section class="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <div class="text-center mb-16" v-observe-animation>
          <h2 class="font-serif text-4xl md:text-5xl font-bold tracking-wider mb-4">
            {{ t('home.faqTitle') }}
          </h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">{{ t('home.faqDesc') }}</p>
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

import { ref, onMounted, computed, onUnmounted } from 'vue'
import type { Directive } from 'vue'
import {
  SparklesIcon,
  CameraIcon,
  UserGroupIcon,
  BuildingStorefrontIcon,
  ChevronUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/vue/24/outline'

import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useI18n } from 'vue-i18n'
import { useDeviceCheck } from '@/composables/useDeviceCheck'
import router from '@/router'

const { t } = useI18n()

// --- 修正后的轮播图数据和逻辑 ---
const { isMobile } = useDeviceCheck()
const baseHomeSlides = [
  {
    key: 'tang',
    action: '/gallery?filter=tang',
    imageFileName: 'slide_001.jpeg',
  },
  {
    key: 'accessories',
    action: '/gallery?filter=accessories',
    imageFileName: 'slide_002.jpeg',
  },
  {
    key: 'cultural',
    action: '/gallery?filter=cultural',
    imageFileName: 'slide_003.jpeg',
  },
  {
    key: 'kids',
    action: '/gallery?filter=kids',
    imageFileName: 'slide_004.jpeg',
  },
  {
    key: 'tang',
    action: '/gallery?filter=tang',
    imageFileName: 'slide_005.jpeg',
  },
  {
    key: 'accessories',
    action: '/gallery?filter=accessories',
    imageFileName: 'slide_006.jpeg',
  },
  {
    key: 'cultural',
    action: '/gallery?filter=cultural',
    imageFileName: 'slide_007.jpeg',
  },
  {
    key: 'kids',
    action: '/gallery?filter=kids',
    imageFileName: 'slide_008.jpeg',
  },
  {
    key: 'tang',
    action: '/gallery?filter=tang',
    imageFileName: 'slide_009.jpeg',
  },
  {
    key: 'accessories',
    action: '/gallery?filter=accessories',
    imageFileName: 'slide_010.jpeg',
  },
  {
    key: 'cultural',
    action: '/gallery?filter=cultural',
    imageFileName: 'slide_011.jpeg',
  },
  {
    key: 'kids',
    action: '/gallery?filter=kids',
    imageFileName: 'slide_012.jpeg',
  },
  {
    key: 'tang',
    action: '/gallery?filter=tang',
    imageFileName: 'slide_013.jpeg',
  },
  {
    key: 'accessories',
    action: '/gallery?filter=accessories',
    imageFileName: 'slide_014.jpeg',
  },
  {
    key: 'cultural',
    action: '/gallery?filter=cultural',
    imageFileName: 'slide_015.jpeg',
  },
]
const shuffledBaseSlides = shuffle([...baseHomeSlides])
const homeSlides = computed(() => {
  const imagePath = isMobile.value ? '/images/home-banner/mobile/' : '/images/home-banner/pc/'
  return shuffledBaseSlides.map((slide) => ({
    title: `home.slides.${slide.key}.title`,
    description: `home.slides.${slide.key}.description`,
    image: `${imagePath}${slide.imageFileName}`,
  }))
})

// 服务特色数据 - 已根据你的需求更新
const features = [
  {
    icon: BuildingStorefrontIcon,
    title: 'home.feature1Title',
    desc: 'home.feature1Desc',
    link: '/gallery',
  },
  {
    icon: UserGroupIcon,
    title: 'home.feature2Title',
    desc: 'home.feature2Desc',
    link: '/parties',
  },
  {
    icon: SparklesIcon,
    title: 'home.feature3Title',
    desc: 'home.feature3Desc',
    link: '/gallery',
  },
  {
    icon: CameraIcon,
    title: 'home.feature4Title',
    desc: 'home.feature4Desc',
    link: '/photos',
  },
]

// 体验流程数据
const steps = [
  { title: 'home.step1Title', desc: 'home.step1Desc' },
  { title: 'home.step2Title', desc: 'home.step2Desc' },
  { title: 'home.step3Title', desc: 'home.step3Desc' },
]

// 客户评价数据 (UPDATED)
const testimonials = [
  {
    name: 'home.testimonials.names.chenxi',
    role: 'home.testimonial1Role',
    text: 'home.testimonial1',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=464&auto=format&fit=crop',
  },
  {
    name: 'home.testimonials.names.ajie',
    role: 'home.testimonial2Role',
    text: 'home.testimonial2',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=387&auto=format&fit=crop',
  },
  {
    name: 'home.testimonials.names.siyue',
    role: 'home.testimonial3Role',
    text: 'home.testimonial3',
    avatar:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=461&auto=format&fit=crop',
  },
  {
    name: 'home.testimonials.names.lin',
    role: 'home.testimonial4Role',
    text: 'home.testimonial4',
    avatar:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=387&auto=format&fit=crop',
  },
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

const navigateTo = (path: string) => {
  router.push(path)
}

// --- REFACTORED: Logic for INDEPENDENT 3D Parallax Hover Effect ---
const isHovered1 = ref(false)
const rotateX1 = ref(0)
const rotateY1 = ref(0)
const isHovered2 = ref(false)
const rotateX2 = ref(0)
const rotateY2 = ref(0)
const image1Style = computed(() => ({
  transform: `rotateX(${rotateX1.value}deg) rotateY(${rotateY1.value}deg) scale(${isHovered1.value ? 1.05 : 1})`,
  transition: 'transform 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
}))
const image2Style = computed(() => ({
  transform: `rotateX(${rotateX2.value}deg) rotateY(${rotateY2.value}deg) scale(${isHovered2.value ? 1.05 : 1})`,
  transition: 'transform 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
}))
const handleMouseMove = (e: MouseEvent, isHovered: any, rotateX: any, rotateY: any) => {
  isHovered.value = true
  const el = e.currentTarget as HTMLElement
  if (!el) return
  const rect = el.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const { width, height } = rect
  const mouseX = x / width - 0.5
  const mouseY = y / height - 0.5
  const maxRotate = 10
  rotateY.value = mouseX * maxRotate
  rotateX.value = -mouseY * maxRotate
}
const handleMouseLeave = (isHovered: any, rotateX: any, rotateY: any) => {
  isHovered.value = false
  rotateX.value = 0
  rotateY.value = 0
}
const handleMouseMove1 = (e: MouseEvent) => handleMouseMove(e, isHovered1, rotateX1, rotateY1)
const handleMouseLeave1 = () => handleMouseLeave(isHovered1, rotateX1, rotateY1)
const handleMouseMove2 = (e: MouseEvent) => handleMouseMove(e, isHovered2, rotateX2, rotateY2)
const handleMouseLeave2 = () => handleMouseLeave(isHovered2, rotateX2, rotateY2)
// --- END of refactored logic ---

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

// 洗牌函数
function shuffle<T>(arr: T[]): T[] {
  return arr
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item)
}
</script>

<style>
/* NOTE: Animations are moved to main.css */

.swiper {
  width: 100%;
  height: 100%;
}
</style>
