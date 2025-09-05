<template>
  <div class="bg-[#FBF9F6]">
    <!-- Spacer for the fixed navbar -->
    <div class="h-[100px]"></div>

    <!-- Section 1: Page Header (Rewritten for Western Audience) -->
    <section class="py-20 md:py-28 text-center px-4">
      <div class="max-w-3xl mx-auto">
        <h1 class="font-serif text-5xl md:text-7xl font-bold tracking-wider text-gray-900">
          {{ t('collaboration.headerTitle') }}
        </h1>
        <p class="mt-6 text-lg md:text-xl text-gray-600">
          {{ t('collaboration.headerDesc') }}
        </p>
      </div>
    </section>

    <!-- Section 2: Success Cases (Updated to reflect new models) -->
    <section class="pb-20 md:pb-28 px-4">
      <div class="max-w-screen-xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="font-serif text-4xl md:text-5xl font-bold tracking-wider mb-4">
            {{ t('collaboration.trackRecordTitle') }}
          </h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            {{ t('collaboration.trackRecordDesc') }}
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <!-- FIX: Added transition-transform and active:scale-[.98] for mobile tap feedback -->
          <div
            v-for="item in successCases"
            :key="item.title"
            class="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row items-center active:scale-[.98]"
          >
            <div class="w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
              <img
                :src="item.image"
                :alt="t(item.title)"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div class="p-8 w-full md:w-3/5">
              <p class="text-sm font-semibold text-[#C0392B] mb-2">{{ t(item.partner) }}</p>
              <h3 class="font-serif text-2xl font-bold mb-3">{{ t(item.title) }}</h3>
              <p class="text-gray-600">{{ t(item.description) }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Collaboration Models (Rewritten) -->
    <section class="bg-white py-20 md:py-28 px-4">
      <div class="max-w-screen-xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="font-serif text-4xl md:text-5xl font-bold tracking-wider mb-4">
            {{ t('collaboration.partnerModelsTitle') }}
          </h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            {{ t('collaboration.partnerModelsDesc') }}
          </p>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <!-- Model 1: Photographers -->
          <div class="rounded-lg border border-gray-200 p-8 flex flex-col items-center text-center">
            <div class="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
              <CameraIcon class="w-10 h-10 text-[#C0392B]" />
            </div>
            <h3 class="font-serif text-3xl font-semibold mb-4">
              {{ t('collaboration.photographerTitle') }}
            </h3>
            <p class="text-gray-600 mb-6">
              {{ t('collaboration.photographerDesc') }}
            </p>
            <ul class="space-y-3 text-left mb-8">
              <li v-for="benefit in photographerBenefits" :key="benefit" class="flex items-start">
                <svg
                  class="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>{{ t(benefit) }}</span>
              </li>
            </ul>
            <button class="mt-auto btn-outline w-full max-w-xs">
              {{ t('collaboration.photographerBtn') }}
            </button>
          </div>

          <!-- Model 2: Venues (Pubs, etc.) -->
          <div class="rounded-lg border border-gray-200 p-8 flex flex-col items-center text-center">
            <div class="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
              <SparklesIcon class="w-10 h-10 text-[#C0392B]" />
            </div>
            <h3 class="font-serif text-3xl font-semibold mb-4">
              {{ t('collaboration.venueTitle') }}
            </h3>
            <p class="text-gray-600 mb-6">
              {{ t('collaboration.venueDesc') }}
            </p>
            <ul class="space-y-3 text-left mb-8">
              <li v-for="benefit in venueBenefits" :key="benefit" class="flex items-start">
                <svg
                  class="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>{{ t(benefit) }}</span>
              </li>
            </ul>
            <button class="mt-auto btn-outline w-full max-w-xs">
              {{ t('collaboration.venueBtn') }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: CTA / Contact Form -->
    <section class="py-20 md:py-28 px-4">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="font-serif text-4xl md:text-5xl font-bold tracking-wider mb-6">
          {{ t('collaboration.ctaTitle') }}
        </h2>
        <p class="text-lg text-gray-600 mb-10">
          {{ t('collaboration.ctaDesc') }}
        </p>
        <form class="max-w-xl mx-auto flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            :placeholder="t('collaboration.ctaPlaceholder')"
            class="w-full px-5 py-4 rounded-full border-gray-300 focus:ring-[#C0392B] focus:border-[#C0392B] transition"
          />
          <button type="submit" class="btn-primary px-8 py-4 rounded-full shrink-0">
            {{ t('collaboration.ctaSubmit') }}
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { CameraIcon, SparklesIcon } from '@heroicons/vue/24/outline'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const successCases = [
  {
    partner: 'collaboration.case1Partner',
    title: 'collaboration.case1Title',
    description: 'collaboration.case1Desc',
    image: '/images/collaboration/take-photo.jpeg',
  },
  {
    partner: 'collaboration.case2Partner',
    title: 'collaboration.case2Title',
    description: 'collaboration.case2Desc',
    image: '/images/collaboration/event-venue.jpeg',
  },
]

const photographerBenefits = [
  'collaboration.photographerBenefit1',
  'collaboration.photographerBenefit2',
  'collaboration.photographerBenefit3',
  'collaboration.photographerBenefit4',
]

const venueBenefits = [
  'collaboration.venueBenefit1',
  'collaboration.venueBenefit2',
  'collaboration.venueBenefit3',
  'collaboration.venueBenefit4',
]
</script>
