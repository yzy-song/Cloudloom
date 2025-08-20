<!--
 * @Author: yzy
 * @Date: 2025-08-20 16:49:16
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-20 16:50:11
-->
<template>
  <Transition name="modal">
    <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        <!-- Background overlay -->
        <div
          class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          @click="close"
        ></div>

        <!-- Modal panel -->
        <div
          class="relative inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg"
        >
          <!-- Close button -->
          <button
            @click="close"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <!-- Header -->
          <div v-if="$slots.header || title" class="mb-4">
            <slot name="header">
              <h3 class="text-lg font-medium text-gray-900">{{ title }}</h3>
            </slot>
          </div>

          <!-- Content -->
          <div class="mb-6">
            <slot></slot>
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="flex justify-end space-x-3">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
interface Props {
  isOpen: boolean
  title?: string
}

interface Emits {
  (e: 'update:isOpen', value: boolean): void
  (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const close = () => {
  emit('update:isOpen', false)
  emit('close')
}

// Close modal on ESC key
const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.isOpen) {
    close()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
