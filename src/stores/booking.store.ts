import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ApiResponse, Booking, BookingStatus, CustomerInfo } from '@/types'
import { api } from '@/api/client'

export interface BookingData {
  // 商品相关（可选）
  productId?: string
  productTitle?: string

  // 用户信息（必需）
  name: string
  contact: string // 电话
  email: string

  // 预约信息
  date: string
  time: string
  participants: number
  notes?: string

  // 预约类型
  type: 'product' | 'general' // 区分是商品预约还是通用预约
}

export const useBookingStore = defineStore('booking', () => {
  interface BookingData {
    // 商品相关（可选）
    productId?: string
    productTitle?: string

    // 用户信息（必需）
    name: string
    contact: string // 电话
    email: string

    // 预约信息
    date: string
    time: string
    participants: number
    notes?: string

    // 预约类型
    type: 'product' | 'general' // 区分是商品预约还是通用预约
  }
  // State
  const bookings = ref<Booking[]>([])
  const currentBooking = ref<Booking | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const pendingBookings = computed(() => bookings.value.filter((b) => b.status === 'pending'))
  const confirmedBookings = computed(() => bookings.value.filter((b) => b.status === 'confirmed'))
  const completedBookings = computed(() => bookings.value.filter((b) => b.status === 'completed'))
  const cancelledBookings = computed(() => bookings.value.filter((b) => b.status === 'cancelled'))

  // Actions
  const fetchBookings = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await api.get<Booking[]>('/bookings')
      bookings.value = response.data
    } catch (e: any) {
      error.value = e.message || 'Failed to fetch bookings'
      throw e
    } finally {
      loading.value = false
    }
  }

  const createBooking = async (bookingData: {
    packageId: string
    customer: CustomerInfo
    date: string
    time: string
    participants: number
    totalAmount: number
  }) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.post<Booking>('/bookings', bookingData)
      currentBooking.value = response.data
      bookings.value.push(response.data)
      return response
    } catch (e: any) {
      error.value = e.message || 'Failed to create booking'
      throw e
    } finally {
      loading.value = false
    }
  }

  const updateBookingStatus = async (id: string, status: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.patch<Booking>(`/bookings/${id}`, { status })

      // Update local state
      const index = bookings.value.findIndex((b) => b.id === id)

      if (index !== -1) {
        bookings.value[index] = { ...bookings.value[index], status: status as BookingStatus }
      }

      if (currentBooking.value?.id === id) {
        currentBooking.value = { ...currentBooking.value, status: status as BookingStatus } // 避免直接修改响应式对象属性
      }

      return response
    } catch (e: any) {
      error.value = e.message || 'Failed to update booking'
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    bookings,
    currentBooking,
    loading,
    error,

    // Getters
    pendingBookings,
    confirmedBookings,
    completedBookings,
    cancelledBookings,

    // Actions
    fetchBookings,
    createBooking,
    updateBookingStatus,
  }
})
