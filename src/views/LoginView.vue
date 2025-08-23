<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center">
        <div class="w-12 h-12 rounded-full bg-hanfu-red flex items-center justify-center">
          <span class="text-white font-display text-xl">华</span>
        </div>
      </div>

      <Transition name="fade" mode="out-in">
        <div :key="isLoginMode ? 'login-title' : 'register-title'">
          <h2 class="mt-6 text-center text-3xl font-display text-gray-900">
            {{ isLoginMode ? '登录您的账户' : '创建新账户' }}
          </h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            或
            <button
              @click="toggleMode"
              class="font-medium text-hanfu-red hover:text-hanfu-blue transition-colors"
            >
              {{ isLoginMode ? '创建新账户' : '登录现有账户' }}
            </button>
          </p>
        </div>
      </Transition>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <!-- 固定高度容器，避免跳动 -->
      <div
        class="bg-white shadow sm:rounded-lg relative"
        :style="{ minHeight: containerHeight + 'px' }"
      >
        <Transition name="fade" mode="out-in">
          <div
            :key="isLoginMode ? 'login-form' : 'register-form'"
            class="py-8 px-4 sm:px-10"
            ref="formContainer"
          >
            <form class="space-y-6" @submit.prevent="handleSubmit">
              <!-- 名字字段 (注册时显示) -->
              <div v-if="!isLoginMode">
                <label for="username" class="block text-sm font-medium text-gray-700">用户名</label>
                <div class="mt-1">
                  <input
                    id="username"
                    v-model="formData.username"
                    type="text"
                    required
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-hanfu-red focus:border-hanfu-red sm:text-sm"
                    :class="{ 'border-red-500': errors.username }"
                    placeholder="请输入用户名"
                  />
                  <p v-if="errors.username" class="mt-1 text-sm text-red-600">
                    {{ errors.username }}
                  </p>
                </div>
              </div>

              <!-- 邮箱/用户名字段 -->
              <div>
                <label for="identifier" class="block text-sm font-medium text-gray-700">
                  {{ isLoginMode ? '邮箱或用户名' : '邮箱地址' }}
                </label>
                <div class="mt-1">
                  <input
                    id="identifier"
                    v-model="formData.identifier"
                    type="text"
                    required
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-hanfu-red focus:border-hanfu-red sm:text-sm"
                    :class="{ 'border-red-500': errors.identifier }"
                    :placeholder="isLoginMode ? '请输入邮箱或用户名' : '请输入邮箱地址'"
                  />
                  <p v-if="errors.identifier" class="mt-1 text-sm text-red-600">
                    {{ errors.identifier }}
                  </p>
                </div>
              </div>

              <!-- 密码字段 -->
              <div>
                <label for="password" class="block text-sm font-medium text-gray-700">密码</label>
                <div class="mt-1">
                  <input
                    id="password"
                    v-model="formData.password"
                    type="password"
                    required
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-hanfu-red focus:border-hanfu-red sm:text-sm"
                    :class="{ 'border-red-500': errors.password }"
                    :placeholder="isLoginMode ? '请输入密码' : '请设置密码'"
                  />
                  <p v-if="errors.password" class="mt-1 text-sm text-red-600">
                    {{ errors.password }}
                  </p>
                </div>
              </div>

              <!-- 确认密码字段 (注册时显示) -->
              <div v-if="!isLoginMode">
                <label for="confirmPassword" class="block text-sm font-medium text-gray-700"
                  >确认密码</label
                >
                <div class="mt-1">
                  <input
                    id="confirmPassword"
                    v-model="formData.confirmPassword"
                    type="password"
                    required
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-hanfu-red focus:border-hanfu-red sm:text-sm"
                    :class="{ 'border-red-500': errors.confirmPassword }"
                    placeholder="请再次输入密码"
                  />
                  <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600">
                    {{ errors.confirmPassword }}
                  </p>
                </div>
              </div>

              <!-- 记住我 (登录时显示) -->
              <div v-if="isLoginMode" class="flex items-center justify-between">
                <div class="flex items-center">
                  <input
                    id="remember-me"
                    v-model="formData.remember"
                    type="checkbox"
                    class="h-4 w-4 text-hanfu-red focus:ring-hanfu-red border-gray-300 rounded"
                  />
                  <label for="remember-me" class="ml-2 block text-sm text-gray-900">记住我</label>
                </div>

                <div class="text-sm">
                  <router-link
                    to="/forgot-password"
                    class="font-medium text-hanfu-red hover:text-hanfu-blue"
                  >
                    忘记密码?
                  </router-link>
                </div>
              </div>

              <!-- 错误消息 -->
              <div v-if="authStore.error" class="rounded-md bg-red-50 p-4">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <h3 class="text-sm font-medium text-red-800">{{ authStore.error }}</h3>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  :disabled="authStore.loading"
                  class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-hanfu-red hover:bg-hanfu-red/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hanfu-red transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg
                      v-if="authStore.loading"
                      class="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <LockClosedIcon
                      v-else
                      class="h-5 w-5 text-hanfu-red/50 group-hover:text-hanfu-red/30"
                    />
                  </span>
                  {{ authStore.loading ? '处理中...' : isLoginMode ? '登录' : '注册' }}
                </button>
              </div>
            </form>

            <div class="mt-6">
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-2 bg-white text-gray-500">或用其他方式登录</span>
                </div>
              </div>

              <div class="mt-6 grid grid-cols-2 gap-3">
                <div>
                  <button
                    @click="loginWithOAuth('google')"
                    class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <svg class="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
                        fill="#4285F4"
                      />
                    </svg>
                  </button>
                </div>

                <div>
                  <button
                    @click="loginWithOAuth('facebook')"
                    class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="#3B5998"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import { LockClosedIcon } from '@heroicons/vue/24/solid'
import { useRouter } from 'vue-router'
import { useAuthStore, type LoginCredentials, type RegisterData } from '@/stores/auth.store'

const router = useRouter()
const authStore = useAuthStore()
const formContainer = ref<HTMLElement | null>(null)

const isLoginMode = ref(true)
const containerHeight = ref(520) // 默认高度

const formData = reactive({
  username: '',
  identifier: '',
  password: '',
  confirmPassword: '',
  remember: false,
})

const errors = reactive({
  username: '',
  identifier: '',
  password: '',
  confirmPassword: '',
})

// 更新容器高度
const updateContainerHeight = async () => {
  await nextTick()
  if (formContainer.value) {
    const height = formContainer.value.scrollHeight
    containerHeight.value = Math.max(520, height) // 确保最小高度
  }
}

// 切换模式
const toggleMode = async () => {
  isLoginMode.value = !isLoginMode.value
  authStore.error = null

  // 重置表单数据
  formData.username = ''
  formData.identifier = ''
  formData.password = ''
  formData.confirmPassword = ''
  formData.remember = false

  // 清除错误信息
  Object.keys(errors).forEach((key) => {
    errors[key as keyof typeof errors] = ''
  })

  // 更新高度
  await updateContainerHeight()
}

// 表单验证
const validateForm = () => {
  let isValid = true
  Object.keys(errors).forEach((key) => {
    errors[key as keyof typeof errors] = ''
  })

  if (!isLoginMode.value) {
    if (!formData.username.trim()) {
      errors.username = '请输入用户名'
      isValid = false
    } else if (formData.username.length < 3) {
      errors.username = '用户名至少需要3个字符'
      isValid = false
    }
    if (!formData.identifier.trim()) {
      errors.identifier = isLoginMode.value ? '请输入邮箱或用户名' : '请输入邮箱地址'
      isValid = false
    } else if (!isLoginMode.value && !/\S+@\S+\.\S+/.test(formData.identifier)) {
      // 只在注册时验证邮箱格式
      errors.identifier = '邮箱格式不正确'
      isValid = false
    }
  }

  if (!formData.password) {
    errors.password = '请输入密码'
    isValid = false
  } else if (formData.password.length < 6) {
    errors.password = '密码至少需要6位'
    isValid = false
  }

  if (!isLoginMode.value) {
    if (!formData.confirmPassword) {
      errors.confirmPassword = '请确认密码'
      isValid = false
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = '密码不匹配'
      isValid = false
    }
  }

  return isValid
}

// 处理表单提交
const handleSubmit = async () => {
  if (!validateForm()) return

  let result

  if (isLoginMode.value) {
    const loginData: LoginCredentials = {
      identifier: formData.identifier,
      password: formData.password,
      remember: formData.remember,
    }
    result = await authStore.login(loginData)
  } else {
    const registerData: RegisterData = {
      username: formData.username,
      email: formData.identifier,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    }
    result = await authStore.register(registerData)
  }

  if (result.success) {
    logger.info('登录成功')
    logger.info('用户信息:', {
      user: authStore.user,
      token: authStore.token,
      isAuthenticated: authStore.isAuthenticated,
    })

    const redirect = (router.currentRoute.value.query.redirect as string) || '/'
    router.push(redirect)
  }
}

// OAuth 登录
const loginWithOAuth = (provider: string) => {
  console.log(`Logging in with ${provider}`)
}

// 初始化
onMounted(() => {
  authStore.initAuth()
  updateContainerHeight()

  if (authStore.isAuthenticated) {
    router.push('/')
  }
})
</script>

<style scoped>
/* 简洁的淡入淡出动画 */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* 容器平滑过渡 */
.bg-white {
  transition: min-height 0.3s ease;
}
</style>
