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
  title: string // 修正: name -> title
  description: string
  dynasty: string // 新增
  dynastyLabel: string // 新增
  price: number
  stockQuantity: number // 修正: stock -> stockQuantity
  material: string // 新增
  images: string[]
  tags: string[] // 新增
  sizeOptions: string[] // 新增 (具体类型根据后端确定)
  details: { key: string; value: string }[] // 新增
  careInstructions: string // 新增
  gender: 'male' | 'female' | 'unisex' // 新增
  reviews: number // 新增
  isActive: boolean // 新增
  createdAt: string
  updatedAt: string
  subcategory: Subcategory // 这个保持不变，假设后端返回的 subcategory 结构与您的定义一致
  subcategoryId: number // 新增
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
