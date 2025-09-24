<template>
  <footer class="bg-hanfu-dark text-white pt-16 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- 导航链接 -->
        <div>
          <h3 class="text-lg font-display font-semibold mb-4">{{ t('footer.navTitle') }}</h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/" class="text-gray-300 hover:text-white transition">{{ t('navbar.home') }}</router-link>
            </li>
            <li>
              <router-link to="/gallery" class="text-gray-300 hover:text-white transition">{{ t('navbar.gallery') }}</router-link>
            </li>
            <li>
              <router-link to="/knowledge" class="text-gray-300 hover:text-white transition">{{ t('navbar.knowledge') }}</router-link>
            </li>
            <li>
              <router-link to="/about" class="text-gray-300 hover:text-white transition">{{ t('navbar.about') }}</router-link>
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
              <svg class="h-5 w-5 text-gray-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              <svg class="h-5 w-5 text-gray-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              <svg class="h-5 w-5 text-gray-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
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
            <button type="submit" class="bg-hanfu-red px-4 py-2 rounded-r-lg hover:bg-opacity-90 transition">
              {{ t('footer.subscribeBtn') }}
            </button>
          </form>
        </div>
      </div>
      <!-- 版权信息 -->
      <div class="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
        <p>&copy; 2025 {{ t('brand.name') }}. {{ t('footer.rights') }}</p>
        <div class="mt-2 flex justify-center space-x-4">
          <router-link to="/privacy" class="hover:text-white transition">{{ t('footer.privacy') }}</router-link>
          <router-link to="/terms" class="hover:text-white transition">{{ t('footer.terms') }}</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import FacebookIcon from '@/assets/icons/facebook.svg';
import InstagramIcon from '@/assets/icons/instagram.svg';
import TikTokIcon from '@/assets/icons/tiktok.svg';
const { t } = useI18n();
</script>
