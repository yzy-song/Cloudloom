import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Booking, BookingStatus } from '@/types'
import api from '@/api/api'

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

  const createBooking = async (bookingData: any) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.post<{ code: number; message: string; data: Booking }>(
        '/bookings',
        bookingData,
      )
      const booking = response.data.data
      currentBooking.value = booking
      bookings.value.push(booking)
      return booking // 只返回业务数据
    } catch (e: any) {
      error.value = e.message || '预约失败'
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
      const index = bookings.value.findIndex((b) => String(b.id) === String(id))

      if (index !== -1) {
        bookings.value[index] = { ...bookings.value[index], status: status as BookingStatus }
      }

      if (String(currentBooking.value?.id) === String(id) && currentBooking.value) {
        currentBooking.value = {
          ...currentBooking.value,
          status: status as BookingStatus,
        } as Booking
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
