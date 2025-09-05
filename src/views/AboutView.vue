<template>
  <div class="bg-[#FBF9F6]">
    <!-- Spacer for the fixed navbar -->
    <div class="h-[100px]"></div>

    <!-- Section 1: The Vision -->
    <section class="py-20 md:py-28 px-4">
      <div
        class="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
      >
        <div class="text-center lg:text-left">
          <p class="text-lg font-semibold text-[#C0392B] mb-2">{{ $t('about.vision.subtitle') }}</p>
          <h1
            class="font-serif text-5xl md:text-6xl font-bold tracking-wider text-gray-900 leading-tight"
          >
            {{ $t('about.vision.title') }}
          </h1>
          <p class="mt-6 text-lg text-gray-600">
            {{ $t('about.vision.desc') }}
          </p>
        </div>
        <div class="w-full h-80 md:h-[500px] rounded-lg overflow-hidden shadow-xl">
          <img
            src="/images/about-me/girl.jpg"
            :alt="$t('about.vision.imageAlt')"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>

    <!-- Section 2: The Founder's Journey -->
    <section class="bg-white py-20 md:py-28 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <div
          class="w-24 h-24 rounded-full mx-auto mb-6 overflow-hidden border-4 border-red-100 shadow-lg"
        >
          <img
            src="/images/about-me/founder.jpeg"
            :alt="$t('about.founder.imageAlt')"
            class="w-full h-full object-cover"
          />
        </div>
        <h2 class="font-serif text-4xl md:text-5xl font-bold tracking-wider mb-6">
          {{ $t('about.founder.title') }}
        </h2>
        <div class="prose prose-lg max-w-none text-gray-600">
          <p>"{{ $t('about.founder.quote') }}"</p>
          <p class="font-serif font-semibold text-gray-800 mt-4">
            {{ $t('about.founder.signature') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Section 3: Our Philosophy -->
    <section class="py-20 md:py-28 px-4">
      <div class="max-w-screen-xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="font-serif text-4xl md:text-5xl font-bold tracking-wider mb-4">
            {{ $t('about.philosophy.title') }}
          </h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            {{ $t('about.philosophy.desc') }}
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div v-for="value in coreValues" :key="value.title" class="text-center p-6">
            <div class="flex justify-center items-center mb-5">
              <component :is="value.icon" class="w-12 h-12 text-[#C0392B]" />
            </div>
            <h3 class="font-serif text-2xl font-semibold mb-3">{{ value.title }}</h3>
            <p class="text-gray-500">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: Meet the Team -->
    <section class="bg-white py-20 md:py-28 px-4">
      <div class="max-w-screen-xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="font-serif text-4xl md:text-5xl font-bold tracking-wider mb-4">
            {{ $t('about.team.title') }}
          </h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div
            v-for="member in team"
            :key="member.name"
            class="flex flex-col sm:flex-row items-center text-center sm:text-left gap-8"
          >
            <div class="w-32 h-32 rounded-full shrink-0 overflow-hidden shadow-lg">
              <img :src="member.image" :alt="member.name" class="w-full h-full object-cover" />
            </div>
            <div>
              <h3 class="font-serif text-2xl font-semibold">{{ member.name }}</h3>
              <p class="text-md font-semibold text-[#C0392B] mb-2">{{ member.role }}</p>
              <p class="text-gray-600">{{ member.bio }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 5: Join Us -->
    <section class="py-20 md:py-28 px-4">
      <div class="max-w-3xl mx-auto text-center bg-white p-12 rounded-lg shadow-xl">
        <h2 class="font-serif text-4xl md:text-5xl font-bold tracking-wider mb-6">
          {{ $t('about.join.title') }}
        </h2>
        <p class="text-lg text-gray-600 mb-10">
          {{ $t('about.join.desc') }}
        </p>
        <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button class="btn-primary px-8 py-4 rounded-full w-full sm:w-auto">
            {{ $t('about.join.bookBtn') }}
          </button>
          <button class="btn-outline px-8 py-4 rounded-full w-full sm:w-auto">
            {{ $t('about.join.followBtn') }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { BookOpenIcon, SparklesIcon, HeartIcon } from '@heroicons/vue/24/outline'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const coreValues = computed(() => [
  {
    icon: BookOpenIcon,
    title: t('about.philosophy.values.authenticity.title'),
    description: t('about.philosophy.values.authenticity.desc'),
  },
  {
    icon: HeartIcon,
    title: t('about.philosophy.values.quality.title'),
    description: t('about.philosophy.values.quality.desc'),
  },
  {
    icon: SparklesIcon,
    title: t('about.philosophy.values.experience.title'),
    description: t('about.philosophy.values.experience.desc'),
  },
])

const team = computed(() => [
  {
    name: t('about.team.members.zhang.name'),
    role: t('about.team.members.zhang.role'),
    bio: t('about.team.members.zhang.bio'),
    image:
      'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1170&auto=format&fit=crop',
  },
  {
    name: t('about.team.members.osullivan.name'),
    role: t('about.team.members.osullivan.role'),
    bio: t('about.team.members.osullivan.bio'),
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop',
  },
])
</script>
