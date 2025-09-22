<template>
  <footer class="bg-hanfu-dark text-white pt-16 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- 品牌信息和描述 -->
        <div>
          <div class="flex items-center">
            <!-- 品牌 Logo，根据新首页风格调整 -->
            <div class="w-12 h-12 rounded-full bg-hanfu-red flex items-center justify-center mr-3">
              <span class="text-white font-display text-xl">C</span>
            </div>
            <div class="text-2xl font-display tracking-wider">{{ t('brand.name') }}</div>
          </div>
          <p class="mt-4 text-gray-300">
            {{ t('footer.brandDesc') }}
          </p>
          <!-- 社交媒体图标部分 -->
          <div class="mt-6 flex space-x-4">
            <a
              href="https://facebook.com/"
              class="hover:opacity-80"
              target="_blank"
              aria-label="Facebook"
            >
              <svg class="h-6 w-6" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="16" fill="#1877F2" />
                <path
                  d="M22 16.001c0-3.313-2.687-6-6-6s-6 2.687-6 6c0 2.991 2.191 5.464 5.063 5.917v-4.183h-1.522v-1.734h1.522v-1.322c0-1.507.893-2.34 2.262-2.34.656 0 1.343.117 1.343.117v1.477h-.757c-.747 0-.98.464-.98.941v1.127h1.669l-.267 1.734h-1.402v4.183C19.809 21.465 22 18.992 22 16.001z"
                  fill="#fff"
                />
              </svg>
            </a>
            <a
              href="https://instagram.com/"
              class="hover:opacity-80"
              target="_blank"
              aria-label="Instagram"
            >
              <svg class="h-6 w-6" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="16" fill="url(#insta-gradient)" />
                <path
                  d="M16 11.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 7.5a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm5.25-7.75a1.05 1.05 0 1 1-2.1 0 1.05 1.05 0 0 1 2.1 0zM22 12.25c-.047-1.006-.27-1.7-.57-2.3a3.25 3.25 0 0 0-1.38-1.38c-.6-.3-1.294-.523-2.3-.57C16.7 8 16.3 8 16 8s-.7 0-1.75.047c-1.006.047-1.7.27-2.3.57a3.25 3.25 0 0 0-1.38 1.38c-.3.6-.523 1.294-.57 2.3C8 13.3 8 13.7 8 14s0 .7.047 1.75c.047 1.006.27 1.7.57 2.3a3.25 3.25 0 0 0 1.38 1.38c.6.3 1.294.523 2.3.57C15.3 20 15.7 20 16 20s.7 0 1.75-.047c1.006-.047 1.7-.27 2.3-.57a3.25 3.25 0 0 0 1.38-1.38c.3-.6.523-1.294.57-2.3C24 15.7 24 15.3 24 15s0-.7-.047-1.75zm-1.25 5.25c-.043.93-.25 1.437-.42 1.77a2.25 2.25 0 0 1-.93.93c-.333.17-.84.377-1.77.42C17.7 20 17.3 20 16 20s-1.7 0-1.75-.047c-.93-.043-1.437-.25-1.77-.42a2.25 2.25 0 0 1-.93-.93c-.17-.333-.377-.84-.42-1.77C8 17.3 8 16.7 8 16s0-.7.047-1.75c.043-.93.25-1.437.42-1.77a2.25 2.25 0 0 1 .93-.93c.333-.17.84-.377 1.77-.42C14.3 12 14.7 12 16 12s1.7 0 1.75.047c.93.043 1.437.25 1.77.42a2.25 2.25 0 0 1 .93.93c.17.333.377.84.42 1.77C24 14.7 24 15.3 24 16s0 .7-.047 1.75z"
                  fill="#fff"
                />
                <defs>
                  <linearGradient
                    id="insta-gradient"
                    x1="16"
                    y1="0"
                    x2="16"
                    y2="32"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#FFDC80" />
                    <stop offset="0.5" stop-color="#F77737" />
                    <stop offset="1" stop-color="#C13584" />
                  </linearGradient>
                </defs>
              </svg>
            </a>
            <a
              href="https://tiktok.com/"
              class="hover:opacity-80"
              target="_blank"
              aria-label="TikTok"
            >
              <svg class="h-6 w-6" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="16" fill="#000" />
                <path
                  d="M22.5 13.5c-1.7 0-3.1-1.4-3.1-3.1V8.5h-2.1v10.1c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2c.2 0 .4 0 .6.1v-2.1c-.2 0-.4-.1-.6-.1-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4v-4.6c.9.7 2 1.1 3.1 1.1v-2.1z"
                  fill="#25F4EE"
                />
                <path
                  d="M22.5 13.5c-1.7 0-3.1-1.4-3.1-3.1V8.5h-2.1v10.1c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2c.2 0 .4 0 .6.1v-2.1c-.2 0-.4-.1-.6-.1-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4v-4.6c.9.7 2 1.1 3.1 1.1v-2.1z"
                  fill="#FE2C55"
                />
                <path
                  d="M22.5 13.5c-1.7 0-3.1-1.4-3.1-3.1V8.5h-2.1v10.1c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2c.2 0 .4 0 .6.1v-2.1c-.2 0-.4-.1-.6-.1-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4v-4.6c.9.7 2 1.1 3.1 1.1v-2.1z"
                  fill="#fff"
                />
              </svg>
            </a>
          </div>
        </div>

        <!-- 导航链接 -->
        <div>
          <h3 class="text-lg font-display font-semibold mb-4">{{ t('footer.navTitle') }}</h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/" class="text-gray-300 hover:text-white transition">{{
                t('navbar.home')
              }}</router-link>
            </li>
            <li>
              <router-link to="/gallery" class="text-gray-300 hover:text-white transition">{{
                t('navbar.gallery')
              }}</router-link>
            </li>
            <li>
              <router-link to="/knowledge" class="text-gray-300 hover:text-white transition">{{
                t('navbar.knowledge')
              }}</router-link>
            </li>
            <li>
              <router-link to="/about" class="text-gray-300 hover:text-white transition">{{
                t('navbar.about')
              }}</router-link>
            </li>
            <li>
              <router-link to="/collaboration" class="text-gray-300 hover:text-white transition">{{
                t('navbar.collaboration')
              }}</router-link>
            </li>
          </ul>
        </div>

        <!-- 联系方式 -->
        <div>
          <h3 class="text-lg font-display font-semibold mb-4">{{ t('footer.contactTitle') }}</h3>
          <ul class="space-y-3">
            <li class="flex items-center">
              <svg
                class="h-5 w-5 text-gray-300 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span class="text-gray-300">+353 874853709</span>
            </li>
            <li class="flex items-center">
              <svg
                class="h-5 w-5 text-gray-300 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span class="text-gray-300">info@cloudloom.com</span>
            </li>
            <li class="flex items-center">
              <svg
                class="h-5 w-5 text-gray-300 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span class="text-gray-300">{{ t('footer.address') }}</span>
            </li>
          </ul>
        </div>

        <!-- 订阅 -->
        <div>
          <h3 class="text-lg font-display font-semibold mb-4">{{ t('footer.subscribeTitle') }}</h3>
          <p class="mb-4 text-gray-300">{{ t('footer.subscribeDesc') }}</p>
          <form class="flex">
            <input
              type="email"
              placeholder="Email"
              class="px-4 py-2 w-full rounded-l-lg focus:outline-none focus:ring-2 focus:ring-hanfu-red text-gray-800"
            />
            <button
              type="submit"
              class="bg-hanfu-red px-4 py-2 rounded-r-lg hover:bg-opacity-90 transition"
            >
              {{ t('footer.subscribeBtn') }}
            </button>
          </form>
        </div>
      </div>
      <!-- 版权信息 -->
      <div class="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
        <p>&copy; 2025 {{ t('brand.name') }}. {{ t('footer.rights') }}</p>
        <div class="mt-2 flex justify-center space-x-4">
          <router-link to="/privacy" class="hover:text-white transition">{{
            t('footer.privacy')
          }}</router-link>
          <router-link to="/terms" class="hover:text-white transition">{{
            t('footer.terms')
          }}</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import FacebookIcon from '@/assets/icons/facebook.svg'
import InstagramIcon from '@/assets/icons/instagram.svg'
import TikTokIcon from '@/assets/icons/tiktok.svg'
const { t } = useI18n()
</script>
