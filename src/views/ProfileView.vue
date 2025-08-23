<template>
  <div class="bg-white min-h-screen">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 class="text-3xl font-display text-center mb-8">个人资料</h1>

      <div class="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 md:p-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- 头像和摘要 -->
          <div class="md:col-span-1">
            <div class="flex flex-col items-center">
              <img
                :src="
                  authStore.user?.avatar ||
                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                "
                alt="用户头像"
                class="h-32 w-32 rounded-full object-cover"
              />
              <h2 class="mt-4 text-xl font-display">{{ authStore.user?.username }}</h2>
              <p class="text-gray-600">{{ authStore.user?.email }}</p>
            </div>
          </div>

          <!-- 编辑表单 -->
          <div class="md:col-span-2">
            <h2 class="text-xl font-display mb-4">编辑资料</h2>
            <form @submit.prevent="updateProfile">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                  <input
                    v-model="profileData.username"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-hanfu-red focus:border-hanfu-red"
                    required
                    placeholder="您的姓名"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                  <input
                    v-model="profileData.email"
                    type="email"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-hanfu-red focus:border-hanfu-red"
                    required
                    placeholder="您的邮箱"
                    disabled
                  />
                  <p class="mt-1 text-sm text-gray-500">邮箱地址不可修改</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">手机号码</label>
                  <input
                    v-model="profileData.phone"
                    type="tel"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-hanfu-red focus:border-hanfu-red"
                    placeholder="您的手机号码"
                  />
                </div>
              </div>

              <button
                type="submit"
                :disabled="authStore.loading"
                class="btn-primary w-full py-4 mt-6 hover:scale-[1.02] transition-transform disabled:opacity-50"
              >
                {{ authStore.loading ? '保存中...' : '保存更改' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()

const profileData = reactive({
  username: authStore.user?.username || '',
  email: authStore.user?.email || '',
  phone: authStore.user?.phone || '',
})

// 更新个人资料
const updateProfile = async () => {
  const result = await authStore.updateProfile(profileData)
  if (result.success) {
    // 可以添加成功提示
    console.log('资料更新成功')
  } else {
    // 可以添加错误提示
    console.error('资料更新失败:', result.error)
  }
}

// 初始化表单数据
onMounted(() => {
  if (authStore.user) {
    profileData.username = authStore.user.username
    profileData.email = authStore.user.email
    profileData.phone = authStore.user.phone || ''
  }
})
</script>
