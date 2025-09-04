<template>
  <div class="bg-[#FBF9F6]">
    <!-- Spacer for the fixed navbar -->
    <div class="h-[100px]"></div>

    <!-- Section 1: Page Header -->
    <section class="py-20 md:py-28 text-center px-4">
      <div class="max-w-3xl mx-auto">
        <p class="text-lg font-semibold text-[#C0392B] mb-2">A Journey Through Time</p>
        <h1 class="font-serif text-5xl md:text-7xl font-bold tracking-wider text-gray-900">
          The Story of Hanfu
        </h1>
        <p class="mt-6 text-lg md:text-xl text-gray-600">
          Discover the rich history and elegant forms of traditional Chinese clothing. Hanfu is not just a garment; it's a legacy of artistry and philosophy worn through dynasties.
        </p>
      </div>
    </section>

    <!-- Section 2: Interactive Timeline -->
    <section class="py-20 md:py-28 bg-white px-4">
      <div class="max-w-screen-xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="font-serif text-4xl md:text-5xl font-bold tracking-wider mb-4">An Evolving Silhouette</h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            Journey through the major dynasties and witness how Hanfu transformed over centuries. Click on a dynasty to learn more.
          </p>
        </div>

        <!-- Timeline Component -->
        <div class="relative">
          <!-- The line -->
          <div class="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-red-100 rounded-full"></div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 relative">
            <div v-for="(era, index) in timeline" :key="era.name" class="flex flex-col items-center text-center cursor-pointer group" @click="activeEra = era">
              <div :class="['w-8 h-8 rounded-full bg-white border-4 transition-colors duration-300 z-10', activeEra.name === era.name ? 'border-[#C0392B]' : 'border-red-100 group-hover:border-[#C0392B]']"></div>
              <p :class="['font-serif font-semibold text-xl mt-4 transition-colors duration-300', activeEra.name === era.name ? 'text-[#C0392B]' : 'text-gray-700']">{{ era.name }}</p>
              <p class="text-sm text-gray-500">{{ era.period }}</p>
            </div>
          </div>
        </div>

        <!-- Timeline Content Display -->
        <transition enter-active-class="transition-all duration-500 ease-out" enter-from-class="opacity-0 translate-y-5" enter-to-class="opacity-100 translate-y-0" mode="out-in">
          <div :key="activeEra.name" class="mt-16 bg-gray-50 rounded-lg p-8 lg:p-12 grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
            <div class="md:col-span-2 w-full h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
              <img :src="activeEra.image" :alt="activeEra.name" class="w-full h-full object-cover">
            </div>
            <div class="md:col-span-3">
              <h3 class="font-serif text-3xl font-bold mb-4">{{ activeEra.name }} Dynasty</h3>
              <p class="text-gray-600 mb-4">{{ activeEra.description }}</p>
              <ul class="space-y-2">
                <li v-for="feature in activeEra.features" :key="feature" class="flex items-start">
                   <svg class="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                  <span><strong>Key Feature:</strong> {{ feature }}</span>
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
          <h2 class="font-serif text-4xl md:text-5xl font-bold tracking-wider mb-4">Iconic Styles of Hanfu</h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            While there are hundreds of variations, here are a few fundamental styles that form the basis of Hanfu.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="style in iconicStyles" :key="style.name" class="group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white">
            <div class="h-96 overflow-hidden">
              <img :src="style.image" :alt="style.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
            </div>
            <div class="p-6">
              <h3 class="font-serif text-2xl font-bold mb-2">{{ style.name }}</h3>
              <p class="text-gray-600">{{ style.description }}</p>
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
            Common Questions
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
              <span>{{ faq.q }}</span>
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
                <p>{{ faq.a }}</p>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ChevronUpIcon } from '@heroicons/vue/24/outline';

const timeline = [
  {
    name: 'Han',
    period: '206 BC - 220 AD',
    image: 'https://images.unsplash.com/photo-1610313484953-963A2703f563?q=80&w=987&auto=format&fit=crop',
    description: 'The Han Dynasty established the foundational aesthetics of Hanfu. Garments were often voluminous and flowing, emphasizing grace and modesty. The "Shenyi" (deep robe) was a signature one-piece garment for both men and women.',
    features: ['Long, wrap-around robes (Shenyi)', 'Wide sleeves and elegant silhouettes.', 'Layering was common for formal wear.']
  },
  {
    name: 'Tang',
    period: '618 - 907 AD',
    image: 'https://images.unsplash.com/photo-1594580254394-9e36a0515124?q=80&w=870&auto=format&fit=crop',
    description: 'A golden age of culture, the Tang Dynasty saw a more open and diverse style. Influenced by the Silk Road, fabrics were vibrant and designs were bolder. Women\'s fashion, in particular, became more relaxed and expressive.',
    features: ['High-waisted skirts (Qixiong Ruqun)', 'Low-cut necklines and short jackets for women.', 'Bold colors and luxurious fabrics.']
  },
  {
    name: 'Song',
    period: '960 - 1279 AD',
    image: 'https://images.unsplash.com/photo-1588401389246-5604b1273783?q=80&w=987&auto=format&fit=crop',
    description: 'The Song Dynasty favored a more reserved and refined aesthetic. The clothing became more slender and simple, reflecting the era\'s neo-Confucian philosophies. The Beizi, a straight-cut overcoat, was popular.',
    features: ['Subtle, elegant, and slender silhouettes.', 'Popularity of the "Beizi" (parallel-collar overcoat).', 'Use of delicate and natural colors.']
  },
  {
    name: 'Ming',
    period: '1368 - 1644 AD',
    image: 'https://images.unsplash.com/photo-1629806934479-715d555c4d29?q=80&w=930&auto=format&fit=crop',
    description: 'The Ming Dynasty revived and developed upon earlier styles, especially from the Tang. It featured a wide variety of clothing, from majestic court robes to practical daily wear, known for its intricate patterns and buttons.',
    features: ['Pleated skirts and jackets with buttons.', 'Diverse styles for different social classes.', 'Rich embroidery and detailed patterns.']
  }
];

const activeEra = ref(timeline[1]); // Default to Tang as it's visually iconic

const iconicStyles = [
  {
    name: 'Ruqun (襦裙)',
    image: 'https://images.unsplash.com/photo-1614204424391-924545393896?q=80&w=870&auto=format&fit=crop',
    description: 'A two-piece outfit consisting of a top (Ru) and a skirt (Qun). The height of the waistband varied by dynasty, with the high-waisted Tang style being particularly famous.'
  },
  {
    name: 'Shenyi (深衣)',
    image: 'https://images.unsplash.com/photo-1610313484953-963A2703f563?q=80&w=987&auto=format&fit=crop',
    description: 'A long, one-piece robe that wraps around the body, symbolizing the harmony of heaven and earth. It was a formal garment, common in the Han Dynasty.'
  },
  {
    name: 'Beizi (褙子)',
    image: 'https://images.unsplash.com/photo-1588401389246-5604b1273783?q=80&w=987&auto=format&fit=crop',
    description: 'A versatile overcoat with a straight, parallel collar, worn by both men and women. It was particularly popular during the Song and Ming Dynasties for its simple elegance.'
  }
];

const faqs = [
  {
    q: 'What is the main difference between Hanfu and a Kimono?',
    a: 'While they share a common ancestor, they are very different. Hanfu is a broad category of historical Chinese clothing with many styles, typically featuring a cross-collar closed to the right and sashes. A Kimono is the traditional Japanese garment, which has a much more standardized T-shape, a wider obi (sash), and distinct sleeve styles.',
  },
  {
    q: 'Is it okay for non-Chinese people to wear Hanfu?',
    a: 'Absolutely! Wearing Hanfu is a form of cultural appreciation. We welcome everyone to experience its beauty, as long as it is worn with respect for its history and cultural significance. It\'s a wonderful way to engage with Chinese culture.',
  },
  {
    q: 'What does "Hanfu" actually mean?',
    a: 'The term translates to "clothing of the Han people." It refers to the historical clothing system of the Han ethnic majority in China, spanning thousands of years before the Qing Dynasty.',
  },
]

const openFaq = ref<number | null>(0);
const toggleFaq = (idx: number) => {
  openFaq.value = openFaq.value === idx ? null : idx
}
</script>
