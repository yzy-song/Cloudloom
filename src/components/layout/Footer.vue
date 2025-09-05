<template>
  <footer class="bg-hanfu-dark-blue text-white pt-16 pb-8">
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
          <div class="mt-6 flex space-x-4">
            <!-- 社交媒体图标 - 使用 SVG 以避免资源路径问题 -->
            <a
              href="https://facebook.com/"
              class="text-gray-300 hover:text-white"
              target="_blank"
              aria-label="Facebook"
            >
              <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path
                  d="M13.397 20.997v-8.199h2.76l.413-3.205h-3.173V7.5c0-.927.257-1.558 1.587-1.558h1.693V2.997c-.313-.042-1.385-.134-2.63-.134C9.845 2.863 8 4.673 8 7.97v2.628H5.215v3.205h2.785v8.199H13.397z"
                />
              </svg>
            </a>
            <a
              href="https://instagram.com/"
              class="text-gray-300 hover:text-white"
              target="_blank"
              aria-label="Instagram"
            >
              <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path
                  d="M12 2c2.71 0 3.058.01 4.123.06L18 2.115c.57.02 1.09.09 1.58.28.49.19.86.46 1.15.75.29.29.56.66.75 1.15.19.49.26 1.01.28 1.58.05 1.065.06 1.413.06 4.123s-.01 3.058-.06 4.123L22 18c-.02.57-.09 1.09-.28 1.58-.19.49-.46.86-.75 1.15-.29.29-.66.56-1.15.75-.49.19-1.01.26-1.58.28-1.065.05-1.413.06-4.123.06s-3.058-.01-4.123-.06L6 21.885c-.57-.02-1.09-.09-1.58-.28-.49-.19-.86-.46-1.15-.75-.29-.29-.56-.66-.75-1.15-.19-.49-.26-1.01-.28-1.58-.05-1.065-.06-1.413-.06-4.123s.01-3.058.06-4.123L2.115 6c.02-.57.09-1.09.28-1.58.19-.49.46-.86.75-1.15.29-.29.66-.56 1.15-.75.49-.19 1.01-.26 1.58-.28L6 2.115c1.065-.05 1.413-.06 4.123-.06s3.058.01 4.123.06zM12 11a3 3 0 100 6 3 3 0 000-6zm0 2a1 1 0 110 2 1 1 0 010-2zm5.5-5.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
                />
              </svg>
            </a>
            <a
              href="https://tiktok.com/"
              class="text-gray-300 hover:text-white"
              target="_blank"
              aria-label="TikTok"
            >
              <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path
                  d="M12.396 2.682A.625.625 0 0012.103 2c-1.785.06-3.488.995-4.664 2.508-1.226 1.573-1.85 3.52-1.666 5.534.116 1.25.688 2.454 1.637 3.399.95.945 2.149 1.517 3.399 1.636 2.014.184 3.961-.44 5.534-1.666 1.513-1.176 2.448-2.88 2.508-4.664a.625.625 0 00-.779-.76l-1.687-.417a.625.625 0 00-.76.778c-.06 1.785.995 3.488 2.508 4.664 1.573 1.226 3.52 1.85 5.534 1.666 1.25-.116 2.454-.688 3.399-1.637.945-.95 1.517-2.149 1.636-3.399.184-2.014-.44-3.961-1.666-5.534-1.176-1.513-2.88-2.448-4.664-2.508a.625.625 0 00-.778.76l-.417 1.687a.625.625 0 00.778.76l.417-1.687z"
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
const { t } = useI18n()
</script>
