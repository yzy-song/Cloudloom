<template>
  <!-- 减小了垂直间距 y -->
  <div class="space-y-4 sm:space-y-6">
    <!-- 为标题和描述添加了响应式字体大小和间距 -->
    <h2 class="text-xl sm:text-2xl font-semibold text-emerald-800">{{ t('preferences.title') }}</h2>
    <p class="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
      {{ t('preferences.description') }}
    </p>
    <!-- 减小了垂直间距 y -->
    <div class="space-y-6 sm:space-y-8">
      <div>
        <!-- 为问题添加了响应式字体大小和间距 -->
        <h3 class="text-lg sm:text-xl font-medium text-gray-800 mb-3 sm:mb-4">
          {{ t('preferences.style_question') }}
        </h3>
        <div class="grid md:grid-cols-3 gap-4">
          <div
            v-for="style in hanfuStyles"
            :key="style.id"
            @click="update('hanfuStyle', style.id)"
            :class="[
              'p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer',
              modelValue.hanfuStyle === style.id
                ? 'border-emerald-600 bg-emerald-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-emerald-300',
            ]"
          >
            <img class="w-12 h-12 rounded-lg mb-3 mx-auto" :src="style.image" :alt="style.name" />
            <p class="text-center font-medium text-gray-700">{{ style.name }}</p>
          </div>
        </div>
      </div>
      <div>
        <!-- 为问题添加了响应式字体大小和间距 -->
        <h3 class="text-lg sm:text-xl font-medium text-gray-800 mb-3 sm:mb-4">
          {{ t('preferences.activity_question') }}
        </h3>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            v-for="activity in activities"
            :key="activity.id"
            class="flex items-center space-x-2 p-4 rounded-xl border-2 border-gray-200 bg-white"
          >
            <input
              type="checkbox"
              :id="activity.id"
              name="activities"
              :value="activity.id"
              :checked="modelValue.activities.includes(activity.id)"
              @change="toggleActivity(activity.id)"
              class="form-checkbox text-emerald-600 w-5 h-5 rounded-md focus:ring-emerald-500"
            />
            <label :for="activity.id" class="text-gray-700 flex items-center space-x-3">
              <span v-html="activity.icon"></span>
              <span>{{ activity.name }}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const hanfuStyles = computed(() => [
  {
    id: 'elegant',
    name: t('preferences.styles.elegant'),
    image: 'https://placehold.co/100x100/7C6F56/FFFFFF?text=Elegant',
  },
  {
    id: 'casual',
    name: t('preferences.styles.casual'),
    image: 'https://placehold.co/100x100/964B00/FFFFFF?text=Casual',
  },
  {
    id: 'heroic',
    name: t('preferences.styles.heroic'),
    image: 'https://placehold.co/100x100/224F3F/FFFFFF?text=Heroic',
  },
])

const activities = computed(() => [
  {
    id: 'photoshoot',
    name: t('preferences.activities.photoshoot'),
    icon: `<svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.865-1.538A2 2 0 019.297 3h5.405a2 2 0 011.664.89l.865 1.538A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
  },
  {
    id: 'tea',
    name: t('preferences.activities.tea'),
    icon: `<svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>`,
  },
  {
    id: 'workshop',
    name: t('preferences.activities.workshop'),
    icon: `<svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.46 9.227 5.093 7.828 5.46c-1.4.367-2.738 1.137-3.954 2.353s-1.986 2.554-2.353 3.954c-.367 1.4.007 2.995.89 4.298"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C13.168 5.46 14.773 5.093 16.172 5.46c1.4.367 2.738 1.137 3.954 2.353s1.986 2.554 2.353 3.954c.367 1.4.007 2.995.89 4.298"/></svg>`,
  },
  {
    id: 'games',
    name: t('preferences.activities.games'),
    icon: `<svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  },
])

function update(key: string, value: any) {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}
function toggleActivity(id: string) {
  const arr = props.modelValue.activities.includes(id)
    ? props.modelValue.activities.filter((a: string) => a !== id)
    : [...props.modelValue.activities, id]
  emit('update:modelValue', { ...props.modelValue, activities: arr })
}
</script>
