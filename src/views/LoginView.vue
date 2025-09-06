<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { GoogleAuthProvider } from 'firebase/auth'
import { useI18n } from 'vue-i18n'
import type { LoginUserDto, RegisterUserDto } from '@/types/dto'
import { useAuthStore } from '@/stores/auth.store'
const { t } = useI18n()
const authStore = useAuthStore()
const isLoginMode = ref(true)

const loginData = reactive<LoginUserDto>({
  identifier: '',
  password: '',
})

const registerData = reactive<RegisterUserDto>({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const errorMessage = computed(() => authStore.error)

const handleLogin = async () => {
  await authStore.login(loginData)
}

const handleRegister = async () => {
  if (registerData.password !== registerData.confirmPassword) {
    authStore.error = t('login.passwordMismatch')
    return
  }
  await authStore.register(registerData)
}

const handleGoogleSignIn = async () => {
  await authStore.loginWithOAuth(new GoogleAuthProvider())
}

const toggleMode = () => {
  isLoginMode.value = !isLoginMode.value
  authStore.error = null // 清除错误信息
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900 tracking-tight">
          {{ isLoginMode ? t('login.titleLogin') : t('login.titleRegister') }}
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          {{ isLoginMode ? t('login.or') : '' }}
          <button @click="toggleMode" class="font-medium text-[#C0392B] hover:text-[#a53125]">
            {{ isLoginMode ? t('login.createAccount') : t('login.alreadyHaveAccount') }}
          </button>
        </p>
      </div>

      <!-- Error Message Display -->
      <div v-if="errorMessage" class="p-3 text-sm text-red-800 bg-red-100 rounded-lg" role="alert">
        {{ errorMessage }}
      </div>

      <!-- Login Form -->
      <form v-if="isLoginMode" class="space-y-6" @submit.prevent="handleLogin">
        <div>
          <label for="login-identifier" class="block text-sm font-medium text-gray-700">
            {{ t('login.identifierLabel') }}
          </label>
          <div class="mt-1">
            <input
              id="login-identifier"
              v-model="loginData.identifier"
              name="identifier"
              type="text"
              autocomplete="username"
              required
              class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-[#C0392B] focus:border-[#C0392B] sm:text-sm"
              :placeholder="t('login.identifierPlaceholder')"
            />
          </div>
        </div>

        <div>
          <label for="login-password" class="block text-sm font-medium text-gray-700">
            {{ t('login.passwordLabel') }}
          </label>
          <div class="mt-1">
            <input
              id="login-password"
              v-model="loginData.password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-[#C0392B] focus:border-[#C0392B] sm:text-sm"
              :placeholder="t('login.passwordPlaceholder')"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="authStore.loading"
            class="relative flex justify-center w-full px-4 py-3 text-sm font-medium text-white bg-[#C0392B] border border-transparent rounded-md shadow-sm group hover:bg-[#a53125] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C0392B] disabled:bg-red-300 disabled:cursor-not-allowed"
          >
            {{ authStore.loading ? t('login.processing') : t('login.loginButton') }}
          </button>
        </div>
      </form>

      <!-- Registration Form -->
      <form v-else class="space-y-6" @submit.prevent="handleRegister">
        <div>
          <label for="register-username" class="block text-sm font-medium text-gray-700">
            {{ t('login.usernameLabel') }}
          </label>
          <div class="mt-1">
            <input
              id="register-username"
              v-model="registerData.username"
              name="username"
              type="text"
              required
              class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-[#C0392B] focus:border-[#C0392B] sm:text-sm"
              :placeholder="t('login.usernamePlaceholder')"
            />
          </div>
        </div>
        <div>
          <label for="register-email" class="block text-sm font-medium text-gray-700">
            {{ t('login.emailLabel') }}
          </label>
          <div class="mt-1">
            <input
              id="register-email"
              v-model="registerData.email"
              name="email"
              type="email"
              required
              class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-[#C0392B] focus:border-[#C0392B] sm:text-sm"
              :placeholder="t('login.emailPlaceholder')"
            />
          </div>
        </div>
        <div>
          <label for="register-password" class="block text-sm font-medium text-gray-700">
            {{ t('login.passwordLabel') }}
          </label>
          <div class="mt-1">
            <input
              id="register-password"
              v-model="registerData.password"
              name="password"
              type="password"
              required
              class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-[#C0392B] focus:border-[#C0392B] sm:text-sm"
              :placeholder="t('login.passwordPlaceholder')"
            />
          </div>
        </div>
        <div>
          <label for="register-confirm-password" class="block text-sm font-medium text-gray-700">
            {{ t('login.confirmPasswordLabel') }}
          </label>
          <div class="mt-1">
            <input
              id="register-confirm-password"
              v-model="registerData.confirmPassword"
              name="confirmPassword"
              type="password"
              required
              class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-[#C0392B] focus:border-[#C0392B] sm:text-sm"
              :placeholder="t('login.confirmPasswordPlaceholder')"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="authStore.loading"
            class="relative flex justify-center w-full px-4 py-3 text-sm font-medium text-white bg-[#C0392B] border border-transparent rounded-md shadow-sm group hover:bg-[#a53125] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C0392B] disabled:bg-red-300 disabled:cursor-not-allowed"
          >
            {{ authStore.loading ? t('login.processing') : t('login.registerButton') }}
          </button>
        </div>
      </form>

      <!-- Divider -->
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 text-gray-500 bg-white"> {{ t('login.continueWith') }} </span>
        </div>
      </div>

      <!-- Social Login -->
      <div>
        <button
          @click="handleGoogleSignIn"
          :disabled="authStore.loading"
          class="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C0392B]"
        >
          <img
            class="w-5 h-5"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google icon"
          />
          <span class="ml-2">{{ t('login.googleSignIn') }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
