<template>
  <div class="payment-status-container flex items-center justify-center py-20">
    <div class="text-center p-10 bg-white rounded-lg shadow-xl">
      <svg
        class="w-16 h-16 text-green-500 mx-auto mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <h1 class="text-3xl font-bold text-gray-800 mb-2">支付成功！</h1>
      <p class="text-gray-600 mb-6">感谢您的预订。我们已经收到了您的付款。</p>
      <div v-if="bookingId" class="mb-6">
        <p class="text-gray-700">
          您的预订号是:
          <span class="font-semibold text-indigo-600">{{ bookingId }}</span>
        </p>
      </div>
      <div>
        <router-link
          to="/orders"
          class="bg-indigo-600 text-white font-bold py-3 px-6 rounded-md hover:bg-indigo-700 transition-colors mr-4"
        >
          查看我的订单
        </router-link>
        <router-link
          to="/"
          class="bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-md hover:bg-gray-300 transition-colors"
        >
          返回首页
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const bookingId = ref<string | null>(null)

onMounted(() => {
  // 从 URL 查询参数中获取 bookingId
  const queryValue = route.query.bookingId
  if (typeof queryValue === 'string') {
    bookingId.value = queryValue
  } else if (Array.isArray(queryValue) && queryValue.length > 0) {
    bookingId.value = queryValue[0]
  } else {
    bookingId.value = null
  }
  // 在这里你也可以调用一个 API 来验证订单状态
})
</script>

<style scoped>
.payment-status-container {
  min-height: 60vh;
  background-color: #f9fafb;
}
</style>
