<template>
  <div class="home bg-gray-50 font-sans text-gray-800">
    <!-- Banner Section -->
    <section
      class="hero relative h-screen w-full overflow-hidden flex items-center justify-center text-center bg-cover bg-center"
      style="
        background-image: url('https://placehold.co/1920x1080/E5E7EB/4B5563?text=Hanfu+Banner');
      "
    >
      <div class="absolute inset-0 bg-black opacity-40"></div>
      <div class="z-10 text-white p-6 md:p-10">
        <h1
          class="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 animate__animated animate__fadeInDown animate__fast"
        >
          {{ t('home.bannerTitle') }}
        </h1>
        <p
          class="text-lg md:text-2xl lg:text-3xl mb-8 animate__animated animate__fadeInUp animate__fast animate__delay-1s"
        >
          {{ t('home.bannerSlogan') }}
        </p>
        <div class="relative w-full max-w-lg mx-auto">
          <img
            src="https://placehold.co/800x400/D1D5DB/1F2937?text=Hanfu+Models"
            alt="Hanfu Models"
            class="rounded-3xl shadow-2xl w-full animate__animated animate__zoomIn animate__fast animate__delay-2s"
          />
          <div
            class="absolute -bottom-4 right-4 md:-bottom-8 md:right-8 bg-white p-2 rounded-full shadow-lg transform rotate-6 animate-pulse"
          >
            <svg
              class="w-8 h-8 md:w-12 md:h-12 text-pink-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5A5.5 5.5 0 017.5 3c2.25 0 4.16 1.15 5.5 3.5.55-.9 1.15-1.78 1.83-2.58A5.5 5.5 0 0122 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section with Card Effect -->
    <section class="services py-20 px-4 md:px-20 bg-gray-50">
      <h2
        class="text-3xl md:text-4xl font-extrabold text-center mb-12 text-gray-900 animate__animated animate__fadeInUp"
      >
        {{ t('home.featuresTitle') }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="(feature, index) in features"
          :key="feature.title"
          class="service-card group bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center text-center transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl animate__animated animate__fadeInUp"
          :style="{ 'animation-delay': `${index * 0.2}s` }"
        >
          <div
            class="mb-6 p-4 rounded-full bg-blue-100 transition-colors duration-300 group-hover:bg-blue-200"
          >
            <component
              :is="feature.icon"
              class="w-12 h-12 text-blue-600 transition-transform duration-300 group-hover:rotate-6"
            />
          </div>
          <h3 class="text-xl font-semibold mb-2 text-gray-900">{{ t(feature.title) }}</h3>
          <p class="text-gray-600 text-sm">{{ t(feature.desc) }}</p>
        </div>
      </div>
    </section>

    <!-- About Us Section with Parallax Effect -->
    <section
      class="about relative flex flex-col md:flex-row items-center justify-between gap-10 py-20 px-4 md:px-20 bg-gray-100 overflow-hidden"
    >
      <div
        class="flex-1 z-10 animate__animated animate__fadeInLeft animate__fast"
        style="animation-delay: 0.5s"
      >
        <h2 class="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900">
          {{ t('home.aboutTitle') }}
        </h2>
        <p class="text-gray-700 text-lg leading-relaxed">{{ t('home.aboutDesc') }}</p>
      </div>
      <img
        src="https://placehold.co/600x600/D1D5DB/1F2937?text=About+Hanfu"
        alt="About Hanfu"
        class="flex-1 rounded-3xl shadow-xl max-w-md object-cover transform translate-y-12 opacity-0 animate-slide-up-fade-in"
      />
    </section>

    <!-- Experience Steps Section -->
    <section class="steps py-20 bg-white px-4 md:px-20">
      <h2
        class="text-3xl md:text-4xl font-extrabold text-center mb-12 text-gray-900 animate__animated animate__fadeInUp"
      >
        {{ t('home.stepsTitle') }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(step, index) in steps"
          :key="step.title"
          class="step-item bg-gray-50 rounded-3xl shadow-lg p-8 flex flex-col items-center transition-transform duration-300 ease-in-out hover:-translate-y-2 animate__animated animate__fadeInUp"
          :style="{ 'animation-delay': `${index * 0.2}s` }"
        >
          <img
            :src="`https://placehold.co/240x240?text=Step+${index + 1}`"
            :alt="t(step.title)"
            class="w-32 h-32 mb-6 object-cover rounded-full border-4 border-blue-200 transition-transform duration-500 hover:scale-110"
          />
          <h3 class="text-xl font-semibold mb-2 text-gray-900">{{ t(step.title) }}</h3>
          <p class="text-gray-600 text-center text-sm">{{ t(step.desc) }}</p>
        </div>
      </div>
    </section>

    <!-- Gallery Section with Grid and Hover Effects -->
    <section class="gallery py-20 px-4 md:px-20 bg-gray-100">
      <h2
        class="text-3xl md:text-4xl font-extrabold text-center mb-12 text-gray-900 animate__animated animate__fadeInUp"
      >
        {{ t('home.galleryTitle') }}
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <img
          v-for="i in 4"
          :key="i"
          :src="`https://placehold.co/400x300/D1D5DB/1F2937?text=Hanfu+${i}`"
          class="rounded-2xl shadow-lg object-cover w-full h-56 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl animate__animated animate__fadeIn"
          :style="{ 'animation-delay': `${i * 0.2}s` }"
        />
      </div>
    </section>

    <!-- Testimonials Section with Carousel Effect -->
    <section class="testimonials py-20 bg-white px-4 md:px-20">
      <h2
        class="text-3xl md:text-4xl font-extrabold text-center mb-12 text-gray-900 animate__animated animate__fadeInUp"
      >
        {{ t('home.testimonialsTitle') }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(item, index) in testimonials"
          :key="item.name"
          class="testimonial-card group bg-blue-50 rounded-3xl shadow-lg p-8 flex flex-col items-center text-center transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl animate__animated animate__fadeInUp"
          :style="{ 'animation-delay': `${index * 0.2}s` }"
        >
          <img
            :src="`https://placehold.co/120x120/D1D5DB/1F2937?text=Avatar`"
            :alt="item.name"
            class="w-16 h-16 mb-4 rounded-full object-cover border-4 border-blue-200 transition-transform duration-500 group-hover:scale-110"
          />
          <p class="text-gray-700 italic mb-2">"{{ t(item.text) }}"</p>
          <span class="text-blue-700 font-semibold text-lg">{{ item.name }}</span>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq py-20 px-4 md:px-20 bg-gray-100">
      <h2
        class="text-3xl md:text-4xl font-extrabold text-center mb-12 text-gray-900 animate__animated animate__fadeInUp"
      >
        {{ t('home.faqTitle') }}
      </h2>
      <div class="max-w-3xl mx-auto space-y-6">
        <div
          v-for="(faq, idx) in faqs"
          :key="idx"
          class="border-b-2 border-gray-200 pb-4 animate__animated animate__fadeInUp"
          :style="{ 'animation-delay': `${idx * 0.2}s` }"
        >
          <button
            @click="toggleFaq(idx)"
            class="flex justify-between items-center w-full text-left text-lg md:text-xl font-medium text-blue-700 focus:outline-none py-2"
          >
            <span class="flex-1">{{ t(faq.q) }}</span>
            <svg
              :class="openFaq === idx ? 'rotate-180' : ''"
              class="w-6 h-6 ml-2 text-blue-500 transition-transform duration-300"
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
          <transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-96"
            leave-active-class="transition-all duration-300 ease-in"
            leave-from-class="opacity-100 max-h-96"
            leave-to-class="opacity-0 max-h-0"
          >
            <div v-show="openFaq === idx" class="mt-2 text-gray-600 text-sm md:text-base">
              {{ t(faq.a) }}
            </div>
          </transition>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact py-20 px-4 md:px-20 bg-gray-50 flex flex-col items-center">
      <h2
        class="text-3xl md:text-4xl font-extrabold mb-6 text-gray-900 animate__animated animate__fadeInUp"
      >
        {{ t('home.contactTitle') }}
      </h2>
      <p
        class="mb-8 text-gray-700 text-center animate__animated animate__fadeInUp"
        style="animation-delay: 0.2s"
      >
        {{ t('home.contactDesc') }}
      </p>
      <div
        class="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 animate__animated animate__fadeInUp"
        style="animation-delay: 0.4s"
      >
        <a
          href="mailto:info@cloudloom.com"
          class="text-blue-600 underline text-lg md:text-xl transition-colors duration-300 hover:text-blue-800"
          >info@cloudloom.com</a
        >
        <span class="text-gray-700 text-lg md:text-xl">+353 874853709</span>
        <span class="text-gray-700 text-lg md:text-xl">{{ t('footer.address') }}</span>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { AcademicCapIcon, CameraIcon, SparklesIcon, MapPinIcon } from '@heroicons/vue/24/outline'
import { useI18n } from 'vue-i18n'
import 'animate.css' // 保留这个 import

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

onMounted(() => {
  // Parallax effect for the about section image
  const aboutImage = document.querySelector('.about img') as HTMLElement
  if (aboutImage) {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const elementY = aboutImage.offsetTop
      const windowHeight = window.innerHeight
      const offset = (scrollY - (elementY - windowHeight / 2)) * 0.2
      aboutImage.style.transform = `translateY(${offset}px)`
    }
    window.addEventListener('scroll', handleScroll)

    // Clean up on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }

  // Animation on scroll
  const sections = document.querySelectorAll('section')
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate__fadeInUp')
        }
      })
    },
    { threshold: 0.2 },
  )

  sections.forEach((section) => {
    observer.observe(section)
  })
})
</script>

<style scoped>
.home {
  font-family: 'Noto Sans SC', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.animate-slide-up-fade-in {
  animation: slide-up-fade-in 1s ease-out forwards;
}

@keyframes slide-up-fade-in {
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
