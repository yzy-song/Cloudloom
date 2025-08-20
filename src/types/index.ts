/*
 * @Author: yzy
 * @Date: 2025-08-16 11:09:37
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-20 16:16:26
 */
// 产品类型
export interface Product {
  id: string | number
  title: string
  description: string
  price: number
  category: string
  colors?: ProductColor[]
  dynasty: string
  dynastyLabel: string
  tags: string[]
  images: string[]
  material: string
  sizeOptions: string[]
  careInstructions: string
  createdAt: string
  updatedAt: string
  rentalPrice: number
  rentalPeriods: RentalPeriod[]
  details: string[]
  reviews: number
}

// 分类类型
export interface Category {
  id: number
  name: string
  description: string
  productCount: number
  image: string
}

// 合作类型
export interface CollaborationOption {
  id: number
  name: string
  description: string
  benefits: string[]
}

export interface ProductColor {
  id: string
  name: string
  value: string
  inStock: boolean
}

export interface RentalPeriod {
  id: string
  name: string
  duration: number
  unit: 'hour' | 'day'
  price: number
}

export type ProductCategory =
  | 'tang'
  | 'song'
  | 'ming'
  | 'male'
  | 'female'
  | 'kids'
  | 'wedding'
  | 'accessories'
  | 'cultural'

export interface EraInfo {
  id: string
  name: string
  period: string
  description: string
  characteristics: string[]
  typicalOutfits: string[]
  historicalBackground: string
  images: string[]
  timeline: TimelineEvent[]
}

export interface TimelineEvent {
  year: string
  event: string
  description: string
}

export interface Booking {
  id: string
  packageId: string
  customer: CustomerInfo
  date: string
  time: string
  participants: number
  status: BookingStatus
  totalAmount: number
  createdAt: string
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'

export interface CustomerInfo {
  id?: string
  firstName: string
  lastName: string
  email: string
  phone: string
  notes?: string
}

export interface ApiResponse<T> {
  data: T
  message?: string
  pagination?: PaginationMeta
}

export interface PaginationMeta {
  total: number
  page: number
  limit: number
  totalPages: number
}
