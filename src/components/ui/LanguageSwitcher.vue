<!-- filepath: src/components/ui/LanguageSwitcher.vue -->
<template>
  <div class="relative inline-block text-left select-none">
    <button
      @click="toggleDropdown"
      class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition focus:outline-none"
    >
      <img :src="current.flag" class="w-5 h-5 rounded-full" :alt="current.name" />
      <span class="font-medium">{{ current.name }}</span>
      <svg
        class="w-4 h-4 ml-1 transition-transform duration-200"
        :class="{ 'rotate-180': open }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-show="open"
        class="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50"
      >
        <button
          v-for="lang in languages"
          :key="lang.code"
          @click="switchLanguage(lang.code)"
          class="flex items-center w-full px-4 py-2 gap-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition text-left"
          :class="{ 'bg-blue-100 text-blue-700 font-semibold': lang.code === current.code }"
        >
          <img :src="lang.flag" class="w-5 h-5 rounded-full" :alt="lang.name" />
          <span>{{ lang.name }}</span>
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const open = ref(false)

const languages = [
  {
    code: 'en-US',
    name: 'English',
    flag: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/us.svg',
  },
  {
    code: 'zh-CN',
    name: '中文',
    flag: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/cn.svg',
  },
]

const current = computed(() => languages.find((l) => l.code === locale.value) || languages[0])

function toggleDropdown() {
  open.value = !open.value
}

function switchLanguage(code: string) {
  locale.value = code
  open.value = false
}

// 点击外部关闭下拉
function handleClickOutside(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (!target.closest('.relative.inline-block')) {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
