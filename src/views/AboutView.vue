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
          <p class="text-lg font-semibold text-[#C0392B] mb-2">Our Vision</p>
          <h1
            class="font-serif text-5xl md:text-6xl font-bold tracking-wider text-gray-900 leading-tight"
          >
            A Bridge Between Cultures, Woven in Silk.
          </h1>
          <p class="mt-6 text-lg text-gray-600">
            We are more than just a Hanfu store. We are cultural ambassadors, dedicated to bringing
            the timeless elegance of ancient Chinese attire to the heart of Dublin. Our mission is
            to create an immersive space where East meets West, and history comes to life.
          </p>
        </div>
        <div class="w-full h-80 md:h-[500px] rounded-lg overflow-hidden shadow-xl">
          <img
            src="/images/about-me/girl.jpg"
            alt="A quiet tea ceremony setting"
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
            alt="Founder's Portrait"
            class="w-full h-full object-cover"
          />
        </div>
        <h2 class="font-serif text-4xl md:text-5xl font-bold tracking-wider mb-6">
          A Note from Our Founder
        </h2>
        <div class="prose prose-lg max-w-none text-gray-600">
          <p>
            "Living in Dublin for over a decade, I've always been captivated by the rich tapestry of
            Irish culture. At the same time, I felt a deep longing to share the stories woven into
            the silks of my own heritage. Hanfu is not just clothing; it’s a tangible piece of
            history, a poem you can wear. I started this journey to create a welcoming space for
            Dubliners and visitors alike to not just see, but truly experience the profound beauty
            of Chinese culture. This is my invitation to you – to step into another world, right
            here in Dublin."
          </p>
          <p class="font-serif font-semibold text-gray-800 mt-4">- Mr. Zhang, Founder</p>
        </div>
      </div>
    </section>

    <!-- Section 3: Our Philosophy -->
    <section class="py-20 md:py-28 px-4">
      <div class="max-w-screen-xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="font-serif text-4xl md:text-5xl font-bold tracking-wider mb-4">
            Our Philosophy
          </h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            Three principles guide everything we do.
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
            Meet the Curators
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
          Begin Your Journey
        </h2>
        <p class="text-lg text-gray-600 mb-10">
          Follow our story on social media or book an appointment to visit our showroom in Dublin.
          We can't wait to welcome you.
        </p>
        <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button class="btn-primary px-8 py-4 rounded-full w-full sm:w-auto">
            Book an Appointment
          </button>
          <button class="btn-outline px-8 py-4 rounded-full w-full sm:w-auto">
            Follow on Instagram
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { BookOpenIcon, SparklesIcon, HeartIcon } from '@heroicons/vue/24/outline'

const coreValues = [
  {
    icon: BookOpenIcon,
    title: 'Authenticity',
    description:
      'We honour history. Each garment is meticulously researched to ensure its form and patterns are true to its dynasty.',
  },
  {
    icon: HeartIcon,
    title: 'Quality',
    description:
      'We believe in tangible beauty. We use only the finest silks, cottons, and linens to recreate the textures of the past.',
  },
  {
    icon: SparklesIcon,
    title: 'Experience',
    description:
      'We offer more than just clothing. We provide a cultural deep-dive, from themed parties to educational workshops.',
  },
]

const team = [
  {
    name: 'Mr. Zhang',
    role: 'Founder & Cultural Director',
    bio: 'A historian at heart with a decade of experience in historical garment reproduction. His expertise ensures every piece tells an accurate and beautiful story.',
    image:
      'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1170&auto=format&fit=crop',
  },
  {
    name: 'Aoife O’Sullivan',
    role: 'Operations & Events Manager',
    bio: 'A Dublin native with a passion for cross-cultural events. Aoife bridges the gap, ensuring our experiences are both authentic and perfectly tailored for a local audience.',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop',
  },
]
</script>
