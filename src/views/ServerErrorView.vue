<template>
  <div
    class="min-h-screen bg-gradient-to-b from-hanfu-blue/10 to-hanfu-red/10 flex flex-col items-center justify-center px-4"
  >
    <div class="max-w-3xl w-full">
      <!-- 古代织布机故障主题 -->
      <div class="relative bg-amber-50 border-8 border-amber-200 rounded-lg shadow-xl p-8 md:p-12">
        <!-- 卷轴顶部装饰 -->
        <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div class="w-24 h-12 bg-amber-300 rounded-full flex items-center justify-center">
            <div class="w-16 h-8 bg-amber-200 rounded-full"></div>
          </div>
        </div>

        <!-- 内容区域 -->
        <div class="mt-6">
          <h1 class="text-6xl md:text-8xl font-display text-hanfu-red text-center mb-4">五〇〇</h1>
          <h2 class="text-2xl md:text-3xl font-display text-gray-800 text-center mb-6">
            织机有恙，锦缎难成
          </h2>

          <div class="flex justify-center mb-8">
            <div class="w-32 h-1 bg-hanfu-gold rounded-full"></div>
          </div>

          <p class="text-lg text-gray-600 mb-8 text-center max-w-xl mx-auto">
            我们的织布机暂时出了点问题，工匠们正在紧急修复中。请稍后再试，或返回首页继续浏览。
          </p>

          <div class="flex justify-center gap-4">
            <router-link to="/" class="flex items-center justify-center px-8 py-3 text-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clip-rule="evenodd"
                />
              </svg>
              返回首页
            </router-link>

            <button
              @click="reloadPage"
              class="btn-outline flex items-center justify-center px-8 py-3 text-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clip-rule="evenodd"
                />
              </svg>
              重新加载
            </button>
          </div>
        </div>

        <!-- 卷轴底部装饰 -->
        <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div class="w-24 h-12 bg-amber-300 rounded-full flex items-center justify-center">
            <div class="w-16 h-8 bg-amber-200 rounded-full"></div>
          </div>
        </div>
      </div>

      <!-- 织布机插画 -->
      <div class="mt-12 flex justify-center">
        <div class="relative">
          <div class="bg-gray-200 border-2 border-dashed rounded-xl w-64 h-64 mx-auto"></div>
          <div
            class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-6 py-2 rounded-full shadow-md"
          >
            <span class="text-hanfu-blue font-medium">织锦复织锦，当户理丝纶</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'

useHead({
  title: '服务器错误 - 云织',
})

function reloadPage() {
  window.location.reload()
}
</script>

<style scoped>
/* 卷轴效果 */
.relative {
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>
