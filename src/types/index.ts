/**
 * src/types/index.ts
 * * 这是项目的前端类型定义文件。
 * 它应该与后端 /src/core/entities 中的实体定义保持同步。
 */

// =================================================================
// 权限与角色 (Permissions & Roles)
// =================================================================

export interface Permission {
  id: number
  name: string
  description: string
}

export interface Role {
  id: number
  name: string
  description: string
  permissions: Permission[]
}

// =================================================================
// 用户 (User)
// =================================================================

export interface User {
  id: number
  username: string
  nickName: string
  email: string
  avatarUrl?: string
  provider: 'local' | 'google' | 'facebook'
  providerId?: string
  roles: Role[]
  createdAt: string
  updatedAt: string
}

// =================================================================
// 产品与分类 (Products & Categories)
// =================================================================

export interface Category {
  id: number
  name: string
  description: string
  subcategories: Subcategory[] // 一个主分类下有多个子分类
  createdAt: string
  updatedAt: string
}

export interface Subcategory {
  id: number
  name: string
  description: string
  category: Category // 子分类属于一个主分类
  products: Product[] // 一个子分类下有多个产品
  createdAt: string
  updatedAt: string
}

export interface Product {
  id: number
  name: string
  description: string
  mainImage: string
  images: string[]
  price: number
  stock: number
  status: 'available' | 'unavailable'
  subcategory: Subcategory // 产品属于一个子分类
  createdAt: string
  updatedAt: string
}

// =================================================================
// 用户收藏 (User Favorites)
// =================================================================

export interface UserFavorite {
  id: number
  user: User
  product: Product
  createdAt: string
}

// =================================================================
// 预定 (Booking)
// =================================================================

export interface Booking {
  id: number
  user: User
  product: Product
  bookingDate: string
  bookingTime: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  notes?: string
  createdAt: string
  updatedAt: string
}

// =================================================================
// 合作申请 (Collaboration Application)
// =================================================================

export interface CollaborationApplication {
  id: number
  name: string
  email: string
  phone?: string
  socialMediaLink?: string
  collaborationType: string
  message: string
  status: 'pending' | 'approved' | 'rejected'
  submittedAt: Date
}

/**
 * Interface for pagination state.
 */
export interface PaginationState {
  page: number
  limit: number
  total: number
  totalPages: number
}
