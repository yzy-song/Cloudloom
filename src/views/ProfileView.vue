<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Spacer for the fixed navbar -->
    <div class="h-[100px]"></div>

    <main class="max-w-screen-xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Left Sidebar Navigation -->
        <aside class="md:col-span-1">
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex flex-col items-center mb-6">
              <div class="relative">
                <img
                  :src="
                    authStore.user?.avatarUrl || 'https://source.unsplash.com/100x100/?portrait'
                  "
                  :alt="t('profile.avatarAlt')"
                  class="h-24 w-24 rounded-full object-cover"
                />
                <button
                  class="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow hover:bg-gray-100 transition"
                >
                  <PencilIcon class="h-4 w-4 text-gray-600" />
                </button>
              </div>
              <h2 class="mt-4 text-xl font-bold font-serif text-gray-800">
                {{ profileData.nickName || 'Nickname' }}
              </h2>
              <p class="text-sm text-gray-500">{{ authStore.user?.email }}</p>
            </div>
            <nav class="space-y-2">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="[
                  'w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-200',
                  activeTab === tab.id
                    ? 'bg-red-50 text-[#C0392B]'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                ]"
              >
                <component :is="tab.icon" class="h-5 w-5 mr-3" />
                <span>{{ tab.name }}</span>
              </button>
            </nav>
          </div>
        </aside>

        <!-- Right Content Area -->
        <div class="md:col-span-3">
          <transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-3"
            enter-to-class="opacity-100 translate-y-0"
            mode="out-in"
          >
            <div :key="activeTab">
              <!-- Edit Profile Content -->
              <div v-if="activeTab === 'profile'" class="bg-white rounded-lg shadow p-6 sm:p-8">
                <h2 class="text-2xl font-bold font-serif text-gray-900 mb-6">
                  {{ t('profile.edit.title') }}
                </h2>
                <form @submit.prevent="updateProfile">
                  <div class="space-y-6">
                    <div>
                      <label for="username" class="block text-sm font-medium text-gray-700 mb-1">{{
                        t('profile.edit.nameLabel')
                      }}</label>
                      <input
                        id="username"
                        v-model="profileData.nickName"
                        type="text"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#C0392B] focus:border-[#C0392B]"
                        required
                        :placeholder="t('profile.edit.namePlaceholder')"
                      />
                    </div>

                    <div>
                      <label for="email" class="block text-sm font-medium text-gray-700 mb-1">{{
                        t('profile.edit.emailLabel')
                      }}</label>
                      <input
                        id="email"
                        v-model="profileData.email"
                        type="email"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                        required
                        :placeholder="t('profile.edit.emailPlaceholder')"
                        disabled
                      />
                    </div>

                    <div>
                      <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">{{
                        t('profile.edit.phoneLabel')
                      }}</label>
                      <input
                        id="phone"
                        v-model="profileData.phone"
                        type="tel"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#C0392B] focus:border-[#C0392B]"
                        :placeholder="t('profile.edit.phonePlaceholder')"
                      />
                    </div>

                    <div>
                      <label for="bio" class="block text-sm font-medium text-gray-700 mb-1">{{
                        t('profile.edit.bioLabel')
                      }}</label>
                      <textarea
                        id="bio"
                        v-model="profileData.description"
                        rows="4"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#C0392B] focus:border-[#C0392B]"
                        :placeholder="t('profile.edit.bioPlaceholder')"
                      ></textarea>
                    </div>
                  </div>

                  <div class="mt-8 text-right">
                    <button
                      type="submit"
                      :disabled="authStore.loading"
                      class="btn-primary px-6 py-3 disabled:opacity-50"
                    >
                      {{
                        authStore.loading ? t('profile.edit.saving') : t('profile.edit.saveChanges')
                      }}
                    </button>
                  </div>
                </form>
              </div>

              <!-- My Orders Placeholder -->
              <div
                v-if="activeTab === 'orders'"
                class="bg-white rounded-lg shadow p-6 sm:p-8 text-center"
              >
                <h2 class="text-2xl font-bold font-serif text-gray-900 mb-6">
                  {{ t('profile.orders.title') }}
                </h2>
                <div class="flex flex-col items-center text-gray-500">
                  <ArchiveBoxIcon class="h-16 w-16 text-gray-300 mb-4" />
                  <p>{{ t('profile.orders.emptyText') }}</p>
                  <router-link
                    to="/gallery"
                    class="mt-2 text-[#C0392B] font-semibold hover:underline"
                    >{{ t('profile.orders.browseLink') }}</router-link
                  >
                </div>
              </div>

              <!-- Account Settings Placeholder -->
              <div v-if="activeTab === 'settings'" class="bg-white rounded-lg shadow p-6 sm:p-8">
                <h2 class="text-2xl font-bold font-serif text-gray-900 mb-6">
                  {{ t('profile.settings.title') }}
                </h2>
                <div class="space-y-6">
                  <div>
                    <h3 class="text-lg font-medium">
                      {{ t('profile.settings.changePasswordTitle') }}
                    </h3>
                    <p class="text-sm text-gray-500 mt-1">
                      {{ t('profile.settings.changePasswordDesc') }}
                    </p>
                    <button class="mt-3 btn-outline text-sm px-4 py-2">
                      {{ t('profile.settings.changePasswordBtn') }}
                    </button>
                  </div>
                  <div class="border-t pt-6">
                    <h3 class="text-lg font-medium text-red-600">
                      {{ t('profile.settings.deleteAccountTitle') }}
                    </h3>
                    <p class="text-sm text-gray-500 mt-1">
                      {{ t('profile.settings.deleteAccountDesc') }}
                    </p>
                    <button
                      class="mt-3 btn-outline border-red-500 text-red-500 hover:bg-red-50 text-sm px-4 py-2"
                    >
                      {{ t('profile.settings.deleteAccountBtn') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import {
  UserCircleIcon,
  ArchiveBoxIcon,
  Cog6ToothIcon,
  PencilIcon,
} from '@heroicons/vue/24/outline'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth.store'

const { t } = useI18n()
const authStore = useAuthStore()
const activeTab = ref('profile')

const tabs = [
  { id: 'profile', name: t('profile.tabs.profile'), icon: UserCircleIcon },
  { id: 'orders', name: t('profile.tabs.orders'), icon: ArchiveBoxIcon },
  { id: 'settings', name: t('profile.tabs.settings'), icon: Cog6ToothIcon },
]

const profileData = reactive({
  username: authStore.user?.username || '',
  nickName: authStore.user?.nickName || '',
  email: authStore.user?.email || '',
  phone: authStore.user?.phone || '',
  description: authStore.user?.description || '', // Added description
})

// 更新个人资料
const updateProfile = async () => {
  // We only want to update fields that are part of the form
  const dataToUpdate = {
    username: profileData.username,
    nickName: profileData.nickName,
    phone: profileData.phone,
    description: profileData.description,
  }
  const result = await authStore.updateProfile(dataToUpdate)
  if (result.success) {
    alert(t('profile.updateSuccess'))
  } else {
    alert(t('profile.updateFailed', { error: result.error }))
  }
}

// 初始化表单数据
onMounted(() => {
  if (authStore.user) {
    profileData.username = authStore.user.username || authStore.user.email.split('@')[0]
    profileData.nickName = authStore.user.nickName || ''
    profileData.email = authStore.user.email
    profileData.phone = authStore.user.phone || ''
    profileData.description = authStore.user.description || ''
  }
})
</script>
