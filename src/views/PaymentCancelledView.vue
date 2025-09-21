<template>
  <div class="payment-status-container flex items-center justify-center py-20">
    <div class="text-center p-10 bg-white rounded-lg shadow-xl">
      <svg
        class="w-16 h-16 text-red-500 mx-auto mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <h1 class="text-3xl font-bold text-gray-800 mb-2">支付已取消</h1>
      <p class="text-gray-600 mb-6">您的支付流程已被取消。您的订单尚未完成。</p>
      <div>
        <router-link
          to="/booking"
          class="bg-indigo-600 text-white font-bold py-3 px-6 rounded-md hover:bg-indigo-700 transition-colors mr-4"
        >
          重试支付
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
// 这个组件目前不需要特定的逻辑，但 setup 脚本是为将来扩展保留的
</script>

<style scoped>
.payment-status-container {
  min-height: 60vh;
  background-color: #f9fafb;
}
</style>
