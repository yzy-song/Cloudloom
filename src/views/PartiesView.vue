<template>
  <div class="bg-[#FBF9F6]">
    <!-- Spacer for the fixed navbar -->
    <div class="h-[100px]"></div>

    <!-- Section 1: Hero Banner -->
    <section
      class="relative h-[60vh] md:h-[70vh] text-white flex items-center justify-center overflow-hidden"
    >
      <div class="absolute inset-0 bg-black z-0">
        <img
          src="https://images.unsplash.com/photo-1542042161-d195a8b41432?q=80&w=1932&auto-format=fit-crop"
          :alt="t('parties.heroAlt')"
          class="w-full h-full object-cover opacity-50"
        />
      </div>
      <div class="relative z-10 text-center p-4">
        <h1
          class="font-serif text-5xl md:text-7xl font-bold tracking-wider"
          style="text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6)"
        >
          {{ t('parties.heroTitle') }}
        </h1>
        <p
          class="mt-4 text-lg md:text-xl max-w-2xl mx-auto"
          style="text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6)"
        >
          {{ t('parties.heroDesc') }}
        </p>
      </div>
    </section>

    <!-- Section 2: Why Choose Us -->
    <section class="py-20 md:py-28 px-4">
      <div class="max-w-screen-xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="font-serif text-4xl md:text-5xl font-bold tracking-wider mb-4">
            {{ t('parties.whyTitle') }}
          </h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            {{ t('parties.whyDesc') }}
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div v-for="(feature, index) in features" :key="index" class="text-center p-6">
            <div class="flex justify-center items-center mb-5">
              <component :is="feature.icon" class="w-12 h-12 text-[#C0392B]" />
            </div>
            <h3 class="font-serif text-2xl font-semibold mb-3">{{ t(feature.title) }}</h3>
            <p class="text-gray-500">{{ t(feature.description) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Our Themes -->
    <section class="bg-white py-20 md:py-28 px-4">
      <div class="max-w-screen-xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="font-serif text-4xl md:text-5xl font-bold tracking-wider mb-4">
            {{ t('parties.themesTitle') }}
          </h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            {{ t('parties.themesDesc') }}
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="theme in themes"
            :key="theme.title"
            class="group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <div class="relative h-64 overflow-hidden">
              <img
                :src="theme.image"
                :alt="t(theme.title)"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <h3 class="absolute bottom-4 left-4 font-serif text-3xl font-bold text-white">
                {{ t(theme.title) }}
              </h3>
            </div>
            <div class="p-6 bg-white">
              <p class="text-gray-600 mb-4 h-24">{{ t(theme.description) }}</p>
              <ul class="space-y-2 text-sm text-gray-500">
                <li v-for="item in theme.features" :key="item" class="flex items-center">
                  <svg
                    class="w-4 h-4 text-green-500 mr-2 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span>{{ t(item) }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: Booking Process -->
    <section class="py-20 md:py-28 px-4">
      <div class="max-w-screen-xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="font-serif text-4xl md:text-5xl font-bold tracking-wider mb-4">
            {{ t('parties.bookingTitle') }}
          </h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">{{ t('parties.bookingDesc') }}</p>
        </div>
        <div class="relative">
          <div
            class="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-repeat-x bg-center"
            style="
              background-image: linear-gradient(to right, #ccc 60%, transparent 40%);
              background-size: 20px 2px;
            "
          ></div>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-16 relative">
            <div
              v-for="(step, index) in bookingSteps"
              :key="index"
              class="text-center flex flex-col items-center"
            >
              <div
                class="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center text-4xl font-serif font-bold text-[#C0392B] mb-6 border-4 border-red-100"
              >
                {{ index + 1 }}
              </div>
              <h3 class="font-serif text-2xl font-semibold mb-3">{{ t(step.title) }}</h3>
              <p class="text-gray-500">{{ t(step.description) }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 5: CTA -->
    <section class="bg-white py-20 md:py-28 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="font-serif text-4xl md:text-5xl font-bold tracking-wider mb-6">
          {{ t('parties.ctaTitle') }}
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          {{ t('parties.ctaDesc') }}
        </p>
        <button
          class="bg-[#C0392B] text-white font-semibold tracking-wider px-10 py-4 rounded-full text-lg hover:bg-[#a53125] transition-transform hover:scale-105 duration-300 shadow-lg"
        >
          {{ t('parties.ctaBtn') }}
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { PaintBrushIcon, RectangleGroupIcon, CameraIcon } from '@heroicons/vue/24/outline'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const features = [
  {
    icon: RectangleGroupIcon,
    title: 'parties.feature1Title',
    description: 'parties.feature1Desc',
  },
  {
    icon: PaintBrushIcon,
    title: 'parties.feature2Title',
    description: 'parties.feature2Desc',
  },
  {
    icon: CameraIcon,
    title: 'parties.feature3Title',
    description: 'parties.feature3Desc',
  },
]

const themes = [
  {
    title: 'parties.theme1Title',
    image:
      'https://images.unsplash.com/photo-1588401389246-5604b1273783?q=80&w=1740&auto-format=fit-crop',
    description: 'parties.theme1Desc',
    features: ['parties.theme1Feature1', 'parties.theme1Feature2', 'parties.theme1Feature3'],
  },
  {
    title: 'parties.theme2Title',
    image:
      'https://images.unsplash.com/photo-1634433433831-29a3b198bad4?q=80&w=1804&auto-format=fit-crop',
    description: 'parties.theme2Desc',
    features: ['parties.theme2Feature1', 'parties.theme2Feature2', 'parties.theme2Feature3'],
  },
  {
    title: 'parties.theme3Title',
    image:
      'https://images.unsplash.com/photo-1594580254394-9e36a0515124?q=80&w=1740&auto-format=fit-crop',
    description: 'parties.theme3Desc',
    features: ['parties.theme3Feature1', 'parties.theme3Feature2', 'parties.theme3Feature3'],
  },
]

const bookingSteps = [
  {
    title: 'parties.step1Title',
    description: 'parties.step1Desc',
  },
  {
    title: 'parties.step2Title',
    description: 'parties.step2Desc',
  },
  {
    title: 'parties.step3Title',
    description: 'parties.step3Desc',
  },
  {
    title: 'parties.step4Title',
    description: 'parties.step4Desc',
  },
]
</script>

<style scoped>
/* You can add any additional custom styles here if needed */
</style>
