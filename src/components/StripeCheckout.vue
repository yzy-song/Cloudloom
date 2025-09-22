<template>
  <div class="stripe-checkout-container">
    <h2 class="text-xl font-semibold mb-4">完成您的支付</h2>
    <p class="mb-4">您将被重定向到我们的安全支付合作伙伴 Stripe 以完成您的购买。</p>

    <div v-if="loading" class="loading-spinner">
      <p>正在重定向到支付页面...</p>
    </div>

    <!-- 改进的错误显示 -->
    <div v-if="error" class="my-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
      <h3 class="font-bold">出现错误！</h3>
      <p>{{ error }}</p>
      <p class="mt-2 text-sm">
        请检查您的后端服务日志以获取详细信息。一个常见的原因是服务器上缺少 `STRIPE_SECRET_KEY`
        环境变量。
      </p>
    </div>

    <button
      @click="redirectToCheckout"
      :disabled="loading"
      class="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 disabled:bg-gray-400 transition-colors"
    >
      前往支付
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { loadStripe } from '@stripe/stripe-js'
import { useApi } from '@/composables/useApi'

const props = defineProps({
  bookingDetails: {
    type: Object,
    required: true,
  },
})

const api = useApi()
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
const loading = ref(false)
const error = ref<string | null>(null)

const redirectToCheckout = async () => {
  loading.value = true
  error.value = null

  try {
    // 1. Get Stripe instance
    const stripe = await stripePromise

    // 2. Prepare payload for the backend
    const payload = {
      bookingNumber: props.bookingDetails.bookingNumber,
      items: [
        {
          name: `Booking for ${props.bookingDetails.serviceName}`,
          amount: props.bookingDetails.totalAmount,
          quantity: 1,
        },
      ],
    }

    // 3. Call your backend to create a checkout session.
    // The screenshot shows this request is failing with a 500 error.
    // This is a server-side issue. Please check your backend logs.
    // A common cause is a missing STRIPE_SECRET_KEY in the .env file on the server.
    interface CheckoutSessionResponse {
      data: {
        sessionId: string
      }
    }
    const response = await api.post<CheckoutSessionResponse>(
      '/payments/create-checkout-session',
      payload,
    )

    const sessionId = response?.data?.sessionId
    if (!sessionId) {
      throw new Error('未能从服务器获取有效的支付会话。请检查后端服务。')
    }

    // 4. Redirect to Stripe Checkout page using the session ID
    if (!stripe) {
      throw new Error('Stripe 加载失败，请检查您的 Stripe 公钥配置。')
    }
    const { error: stripeError } = await stripe.redirectToCheckout({
      sessionId,
    })

    if (stripeError) {
      console.error('Stripe redirection error:', stripeError)
      error.value = stripeError.message ?? '发生未知错误'
    }
  } catch (err) {
    console.error('创建支付会话失败:', err)
    // Display the specific error from the backend if available
    error.value = (err as any).response?.data?.message || '无法连接到支付服务，请稍后再试。'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.stripe-checkout-container {
  background: #ffffff;
  max-width: 400px;
  margin: auto;
  padding: 2rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
}
.loading-spinner {
  text-align: center;
  padding: 1rem;
}
</style>
