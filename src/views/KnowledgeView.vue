<template>
  <div class="bg-[#FBF9F6]">
    <!-- Spacer for the fixed navbar -->
    <div class="h-[100px]"></div>

    <!-- Section 1: Page Header -->
    <section class="py-20 md:py-28 text-center px-4">
      <div class="max-w-3xl mx-auto">
        <p class="text-lg font-semibold text-[#C0392B] mb-2">
          {{ t('knowledge.header.subtitle') }}
        </p>
        <h1 class="font-serif text-5xl md:text-7xl font-bold tracking-wider text-gray-900">
          {{ t('knowledge.header.title') }}
        </h1>
        <p class="mt-6 text-lg md:text-xl text-gray-600">
          {{ t('knowledge.header.desc') }}
        </p>
      </div>
    </section>

    <!-- Section 2: Interactive Timeline -->
    <section class="py-20 md:py-28 bg-white px-4">
      <div class="max-w-screen-xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="font-serif text-4xl md:text-5xl font-bold tracking-wider mb-4">
            {{ t('knowledge.timeline.title') }}
          </h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            {{ t('knowledge.timeline.desc') }}
          </p>
        </div>

        <!-- Timeline Component -->
        <div class="relative">
          <!-- The line -->
          <div
            class="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-red-100 rounded-full"
          ></div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 relative">
            <div
              v-for="(era, index) in timeline"
              :key="era.name"
              class="flex flex-col items-center text-center cursor-pointer group"
              @click="activeEra = era"
            >
              <div
                :class="[
                  'w-8 h-8 rounded-full bg-white border-4 transition-colors duration-300 z-10',
                  activeEra.name === era.name
                    ? 'border-[#C0392B]'
                    : 'border-red-100 group-hover:border-[#C0392B]',
                ]"
              ></div>
              <p
                :class="[
                  'font-serif font-semibold text-xl mt-4 transition-colors duration-300',
                  activeEra.name === era.name ? 'text-[#C0392B]' : 'text-gray-700',
                ]"
              >
                {{ t(era.name) }}
              </p>
              <p class="text-sm text-gray-500">{{ t(era.period) }}</p>
            </div>
          </div>
        </div>

        <!-- Timeline Content Display -->
        <transition
          enter-active-class="transition-all duration-500 ease-out"
          enter-from-class="opacity-0 translate-y-5"
          enter-to-class="opacity-100 translate-y-0"
          mode="out-in"
        >
          <div
            :key="activeEra.name"
            class="mt-16 bg-gray-50 rounded-lg p-8 lg:p-12 grid grid-cols-1 md:grid-cols-5 gap-8 items-center"
          >
            <div class="md:col-span-2 w-full h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
              <img
                :src="activeEra.image"
                :alt="t(activeEra.name)"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="md:col-span-3">
              <h3 class="font-serif text-3xl font-bold mb-4">
                {{ t('knowledge.timeline.dynasty', { dynasty: t(activeEra.name) }) }}
              </h3>
              <p class="text-gray-600 mb-4">{{ t(activeEra.description) }}</p>
              <ul class="space-y-2">
                <li v-for="feature in activeEra.features" :key="feature" class="flex items-start">
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
                  <span
                    ><strong>{{ t('knowledge.keyFeature') }}</strong> {{ t(feature) }}</span
                  >
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </div>
    </section>

    <!-- Section 3: Iconic Styles -->
    <section class="py-20 md:py-28 px-4">
      <div class="max-w-screen-xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="font-serif text-4xl md:text-5xl font-bold tracking-wider mb-4">
            {{ t('knowledge.styles.title') }}
          </h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            {{ t('knowledge.styles.desc') }}
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="style in iconicStyles"
            :key="style.name"
            class="group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white"
          >
            <div class="h-96 overflow-hidden">
              <img
                :src="style.image"
                :alt="t(style.name)"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div class="p-6">
              <h3 class="font-serif text-2xl font-bold mb-2">{{ t(style.name) }}</h3>
              <p class="text-gray-600">{{ t(style.description) }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: FAQ -->
    <section class="bg-white py-20 md:py-28 px-4">
      <div class="max-w-3xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="font-serif text-4xl md:text-5xl font-bold tracking-wider mb-4">
            {{ t('knowledge.faq.title') }}
          </h2>
        </div>
        <div class="space-y-4">
          <div
            v-for="(faq, idx) in faqs"
            :key="idx"
            class="faq-item bg-gray-50 rounded-lg overflow-hidden border border-gray-200"
          >
            <button
              @click="toggleFaq(idx)"
              class="flex justify-between items-center w-full p-6 text-left font-semibold text-lg text-gray-800"
            >
              <span>{{ t(faq.q) }}</span>
              <ChevronUpIcon
                class="w-6 h-6 text-gray-500 transition-transform duration-300 shrink-0"
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
              <div v-if="openFaq === idx" class="px-6 pb-6 text-gray-600 prose">
                <p>{{ t(faq.a) }}</p>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronUpIcon } from '@heroicons/vue/24/outline'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const timeline = [
  {
    name: 'knowledge.timeline.han.name',
    period: 'knowledge.timeline.han.period',
    image:
      'https://images.unsplash.com/photo-1610313484953-963A2703f563?q=80&w=987&auto=format&fit=crop',
    description: 'knowledge.timeline.han.desc',
    features: [
      'knowledge.timeline.han.feature1',
      'knowledge.timeline.han.feature2',
      'knowledge.timeline.han.feature3',
    ],
  },
  {
    name: 'knowledge.timeline.tang.name',
    period: 'knowledge.timeline.tang.period',
    image:
      'https://images.unsplash.com/photo-1594580254394-9e36a0515124?q=80&w=870&auto=format&fit=crop',
    description: 'knowledge.timeline.tang.desc',
    features: [
      'knowledge.timeline.tang.feature1',
      'knowledge.timeline.tang.feature2',
      'knowledge.timeline.tang.feature3',
    ],
  },
  {
    name: 'knowledge.timeline.song.name',
    period: 'knowledge.timeline.song.period',
    image:
      'https://images.unsplash.com/photo-1588401389246-5604b1273783?q=80&w=987&auto=format&fit=crop',
    description: 'knowledge.timeline.song.desc',
    features: [
      'knowledge.timeline.song.feature1',
      'knowledge.timeline.song.feature2',
      'knowledge.timeline.song.feature3',
    ],
  },
  {
    name: 'knowledge.timeline.ming.name',
    period: 'knowledge.timeline.ming.period',
    image:
      'https://images.unsplash.com/photo-1629806934479-715d555c4d29?q=80&w=930&auto=format&fit=crop',
    description: 'knowledge.timeline.ming.desc',
    features: [
      'knowledge.timeline.ming.feature1',
      'knowledge.timeline.ming.feature2',
      'knowledge.timeline.ming.feature3',
    ],
  },
]

const activeEra = ref(timeline[1]) // Default to Tang as it's visually iconic

const iconicStyles = [
  {
    name: 'knowledge.styles.ruqun.name',
    image:
      'https://images.unsplash.com/photo-1614204424391-924545393896?q=80&w=870&auto=format&fit=crop',
    description: 'knowledge.styles.ruqun.desc',
  },
  {
    name: 'knowledge.styles.shenyi.name',
    image:
      'https://images.unsplash.com/photo-1610313484953-963A2703f563?q=80&w=987&auto=format&fit=crop',
    description: 'knowledge.styles.shenyi.desc',
  },
  {
    name: 'knowledge.styles.beizi.name',
    image:
      'https://images.unsplash.com/photo-1588401389246-5604b1273783?q=80&w=987&auto=format&fit=crop',
    description: 'knowledge.styles.beizi.desc',
  },
]

const faqs = [
  {
    q: 'knowledge.faq.q1',
    a: 'knowledge.faq.a1',
  },
  {
    q: 'knowledge.faq.q2',
    a: 'knowledge.faq.a2',
  },
  {
    q: 'knowledge.faq.q3',
    a: 'knowledge.faq.a3',
  },
]

const openFaq = ref<number | null>(0)
const toggleFaq = (idx: number) => {
  openFaq.value = openFaq.value === idx ? null : idx
}
</script>
