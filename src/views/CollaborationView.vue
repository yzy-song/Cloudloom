<template>
  <div class="bg-[#FBF9F6]">
    <!-- Spacer for the fixed navbar -->
    <div class="h-[100px]"></div>

    <!-- Section 1: Page Header (Rewritten for Western Audience) -->
    <section class="py-20 md:py-28 text-center px-4">
      <div class="max-w-3xl mx-auto">
        <h1 class="font-serif text-5xl md:text-7xl font-bold tracking-wider text-gray-900">
          Partner With Us
        </h1>
        <p class="mt-6 text-lg md:text-xl text-gray-600">
          Introduce an unforgettable touch of ancient culture to your Dublin-based business. We
          provide unique Hanfu-themed experiences that captivate audiences and create lasting
          memories. Let's collaborate.
        </p>
      </div>
    </section>

    <!-- Section 2: Success Cases (Updated to reflect new models) -->
    <section class="pb-20 md:pb-28 px-4">
      <div class="max-w-screen-xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="font-serif text-4xl md:text-5xl font-bold tracking-wider mb-4">
            Our Track Record
          </h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            We've already created amazing experiences with fantastic local partners.
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
                :alt="item.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div class="p-8 w-full md:w-3/5">
              <p class="text-sm font-semibold text-[#C0392B] mb-2">{{ item.partner }}</p>
              <h3 class="font-serif text-2xl font-bold mb-3">{{ item.title }}</h3>
              <p class="text-gray-600">{{ item.description }}</p>
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
            Ways to Partner
          </h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            We offer two core partnership programs designed for mutual success.
          </p>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <!-- Model 1: Photographers -->
          <div class="rounded-lg border border-gray-200 p-8 flex flex-col items-center text-center">
            <div class="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
              <CameraIcon class="w-10 h-10 text-[#C0392B]" />
            </div>
            <h3 class="font-serif text-3xl font-semibold mb-4">For Creators & Photographers</h3>
            <p class="text-gray-600 mb-6">
              Elevate your portfolio with the timeless beauty of Hanfu. We provide access to our
              extensive collection, helping you create stunning, culturally rich visuals that stand
              out.
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
                <span>{{ benefit }}</span>
              </li>
            </ul>
            <button class="mt-auto btn-outline w-full max-w-xs">Become a Photo Partner</button>
          </div>

          <!-- Model 2: Venues (Pubs, etc.) -->
          <div class="rounded-lg border border-gray-200 p-8 flex flex-col items-center text-center">
            <div class="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
              <SparklesIcon class="w-10 h-10 text-[#C0392B]" />
            </div>
            <h3 class="font-serif text-3xl font-semibold mb-4">For Pubs & Event Venues</h3>
            <p class="text-gray-600 mb-6">
              Host a unique "Hanfu Night" and offer your patrons an extraordinary experience. We
              provide a turnkey themed party package, driving new footfall and generating buzz for
              your venue.
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
                <span>{{ benefit }}</span>
              </li>
            </ul>
            <button class="mt-auto btn-outline w-full max-w-xs">Host a Hanfu Night</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: CTA / Contact Form -->
    <section class="py-20 md:py-28 px-4">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="font-serif text-4xl md:text-5xl font-bold tracking-wider mb-6">
          Start Your Journey With Us
        </h2>
        <p class="text-lg text-gray-600 mb-10">
          Ready to explore a partnership? Leave your email below, and our collaboration specialist
          will get in touch within 24 hours.
        </p>
        <form class="max-w-xl mx-auto flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email address"
            class="w-full px-5 py-4 rounded-full border-gray-300 focus:ring-[#C0392B] focus:border-[#C0392B] transition"
          />
          <button type="submit" class="btn-primary px-8 py-4 rounded-full shrink-0">Submit</button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { CameraIcon, SparklesIcon } from '@heroicons/vue/24/outline'

const successCases = [
  {
    partner: 'Collaboration with "Dublin Creatives" Studio',
    title: '"Dynasty Portraits" Photoshoot',
    description:
      'We provided a full range of Tang Dynasty costumes for their quarterly feature project. The series gained over 50k likes on Instagram and was featured in a local art blog.',
    image: '/images/collaboration/take-photo.jpeg',
  },
  {
    partner: 'Themed Night at "The Temple Bar"',
    title: 'Hanfu Culture Night',
    description:
      "We co-hosted a cultural theme night, providing costumes and interactive activities. The event was sold out and increased the venue's social media engagement by 300% that week.",
    image: '/images/collaboration/event-venue.jpeg',
  },
]

const photographerBenefits = [
  'Exclusive discounts on our entire Hanfu collection for your shoots.',
  'First access to our newest and most elaborate outfits.',
  'Co-promotion opportunities on our social media channels.',
  'Priority consideration for our official commercial projects.',
]

const venueBenefits = [
  'A complete, all-inclusive event package: costumes, host, and activities.',
  "Attract new customers and significantly boost your venue's profile.",
  'Cross-promotion on our platforms to a culturally-engaged audience.',
  'A generous revenue-sharing model.',
]
</script>
