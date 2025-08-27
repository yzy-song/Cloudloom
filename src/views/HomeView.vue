<!--
 * @Author: yzy
 * @Date: 2025-08-18 12:36:27
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-27 00:03:47
-->
<template>
  <div class="home">
    <!-- Banner -->
    <section
      class="hero flex flex-col items-center justify-center text-center py-16 bg-gradient-to-b from-white to-blue-50"
    >
      <h1 class="text-4xl md:text-6xl font-bold mb-4 text-gray-900">{{ t('home.bannerTitle') }}</h1>
      <p class="text-lg md:text-2xl mb-8 text-gray-600">{{ t('home.bannerSlogan') }}</p>
      <router-link
        to="/booking"
        class="px-8 py-3 rounded-full bg-blue-600 text-white text-lg font-semibold shadow-lg hover:bg-blue-700 transition"
      >
        {{ t('home.bookNow') }}
      </router-link>
      <img
        src="https://placehold.co/1200x400?text=Hanfu+Banner"
        alt="Hanfu Experience"
        class="mt-10 rounded-xl shadow-lg w-full max-w-3xl object-cover"
      />
    </section>

    <!-- 特色服务/亮点 -->
    <section class="features py-16 px-4 md:px-20 bg-white">
      <h2 class="text-2xl md:text-3xl font-bold mb-10 text-center text-gray-900">
        {{ t('home.featuresTitle') }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="flex flex-col items-center text-center"
        >
          <div class="mb-4 text-blue-600">
            <component :is="feature.icon" class="w-12 h-12" />
          </div>
          <h3 class="text-xl font-semibold mb-2">{{ t(feature.title) }}</h3>
          <p class="text-gray-600">{{ t(feature.desc) }}</p>
        </div>
      </div>
    </section>

    <!-- 品牌故事 -->
    <section
      class="about flex flex-col md:flex-row items-center justify-between gap-10 py-16 px-4 md:px-20 bg-white"
    >
      <div class="flex-1">
        <h2 class="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
          {{ t('home.aboutTitle') }}
        </h2>
        <p class="text-gray-700 text-lg">{{ t('home.aboutDesc') }}</p>
      </div>
      <img
        src="https://placehold.co/600x600?text=About+Hanfu"
        alt="About Cloudloom"
        class="flex-1 rounded-xl shadow-lg max-w-md object-cover"
      />
    </section>

    <!-- 体验流程 -->
    <section class="steps py-16 bg-blue-50 px-4 md:px-20">
      <h2 class="text-2xl md:text-3xl font-bold mb-10 text-center text-gray-900">
        {{ t('home.stepsTitle') }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(step, idx) in steps"
          :key="step.title"
          class="bg-white rounded-xl shadow-md p-6 flex flex-col items-center"
        >
          <img
            :src="`https://placehold.co/240x240?text=Step+${idx + 1}`"
            :alt="t(step.title)"
            class="w-24 h-24 mb-4 object-cover rounded-full border-4 border-blue-100"
          />
          <h3 class="text-xl font-semibold mb-2">{{ t(step.title) }}</h3>
          <p class="text-gray-600 text-center">{{ t(step.desc) }}</p>
        </div>
      </div>
    </section>

    <!-- 汉服展示 -->
    <section class="gallery py-16 px-4 md:px-20 bg-white">
      <h2 class="text-2xl md:text-3xl font-bold mb-10 text-center text-gray-900">
        {{ t('home.galleryTitle') }}
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <img
          v-for="i in 4"
          :key="i"
          :src="`https://placehold.co/400x300?text=Hanfu+${i}`"
          class="rounded-lg shadow object-cover w-full h-56"
        />
      </div>
    </section>

    <!-- 用户评价 -->
    <section class="testimonials py-16 bg-blue-50 px-4 md:px-20">
      <h2 class="text-2xl md:text-3xl font-bold mb-10 text-center text-gray-900">
        {{ t('home.testimonialsTitle') }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="item in testimonials"
          :key="item.name"
          class="bg-white rounded-xl shadow-md p-6 flex flex-col items-center"
        >
          <img
            :src="`https://placehold.co/120x120?text=Avatar`"
            :alt="item.name"
            class="w-16 h-16 mb-4 rounded-full object-cover border-2 border-blue-200"
          />
          <p class="text-gray-700 italic mb-2">"{{ t(item.text) }}"</p>
          <span class="text-blue-700 font-semibold">{{ item.name }}</span>
        </div>
      </div>
    </section>

    <!-- FAQ 常见问题 -->
    <section class="faq py-16 px-4 md:px-20 bg-white">
      <h2 class="text-2xl md:text-3xl font-bold mb-10 text-center text-gray-900">
        {{ t('home.faqTitle') }}
      </h2>
      <div class="max-w-3xl mx-auto space-y-6">
        <div v-for="(faq, idx) in faqs" :key="idx" class="border-b pb-4">
          <button
            @click="toggleFaq(idx)"
            class="flex justify-between items-center w-full text-left text-lg font-medium text-blue-700 focus:outline-none"
          >
            <span>{{ t(faq.q) }}</span>
            <svg
              :class="openFaq === idx ? 'rotate-180' : ''"
              class="w-5 h-5 ml-2 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div v-show="openFaq === idx" class="mt-2 text-gray-600 transition-all duration-200">
            {{ t(faq.a) }}
          </div>
        </div>
      </div>
    </section>

    <!-- 联系方式/预约 -->
    <section class="contact py-16 px-4 md:px-20 bg-white flex flex-col items-center">
      <h2 class="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
        {{ t('home.contactTitle') }}
      </h2>
      <p class="mb-4 text-gray-700">{{ t('home.contactDesc') }}</p>
      <a href="mailto:info@cloudloom.com" class="text-blue-600 underline mb-2"
        >info@cloudloom.com</a
      >
      <span class="text-gray-700 mt-2">+353 874853709</span>
      <span class="text-gray-700 mt-2">{{ t('footer.address') }}</span>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AcademicCapIcon, CameraIcon, SparklesIcon, MapPinIcon } from '@heroicons/vue/24/outline'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const features = [
  { icon: AcademicCapIcon, title: 'home.feature1Title', desc: 'home.feature1Desc' },
  { icon: CameraIcon, title: 'home.feature2Title', desc: 'home.feature2Desc' },
  { icon: SparklesIcon, title: 'home.feature3Title', desc: 'home.feature3Desc' },
  { icon: MapPinIcon, title: 'home.feature4Title', desc: 'home.feature4Desc' },
]

const steps = [
  { title: 'home.step1Title', desc: 'home.step1Desc' },
  { title: 'home.step2Title', desc: 'home.step2Desc' },
  { title: 'home.step3Title', desc: 'home.step3Desc' },
]

const testimonials = [
  { name: 'Emily', text: 'home.testimonial1' },
  { name: 'Liam', text: 'home.testimonial2' },
  { name: 'Sophia', text: 'home.testimonial3' },
]

const faqs = [
  { q: 'home.faq1Q', a: 'home.faq1A' },
  { q: 'home.faq2Q', a: 'home.faq2A' },
  { q: 'home.faq3Q', a: 'home.faq3A' },
]

const openFaq = ref(-1)
function toggleFaq(idx: number) {
  openFaq.value = openFaq.value === idx ? -1 : idx
}
</script>

<style scoped>
.home {
  font-family: 'Noto Sans', 'Segoe UI', Arial, sans-serif;
}
</style>
