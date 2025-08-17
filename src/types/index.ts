/*
 * @Author: yzy
 * @Date: 2025-08-16 11:09:37
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-17 12:18:43
 */
// 产品类型
export interface Product {
  id: number
  title: string
  description: string
  price: number
  category: string
  dynasty: string
  tags: string[]
  images: string[]
  material: string
  sizeOptions: string[]
  careInstructions: string
  createdAt: string
  updatedAt: string
  details: string[]
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
