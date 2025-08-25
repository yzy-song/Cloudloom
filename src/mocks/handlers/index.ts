import { http, HttpResponse } from 'msw'
import { generateProduct, generateEraInfo, generateBooking } from '../data/generators'
import type {
  ApiResponse,
  Product,
  EraInfo,
  Booking,
  CustomerInfo,
  BookingStatus,
  Category,
} from '@/types'

// 生成模拟数据
const products = Array.from({ length: 50 }, generateProduct)
const eraInfos = Array.from({ length: 3 }, generateEraInfo)
const bookings = Array.from({ length: 20 }, generateBooking)

export const handlers = [
  // 添加分类接口
  http.get('/api/categories', () => {
    const response: ApiResponse<Category[]> = {
      data: [
        {
          id: 1,
          title: '唐制汉服',
          productCount: 28,
          filterKey: 'tang',
          image: '',
          description: '唐制汉服',
        },
        {
          id: 2,
          title: '宋制汉服',
          productCount: 22,
          filterKey: 'song',
          image: '',
          description: '宋制汉服',
        },
        {
          id: 3,
          title: '明制汉服',
          productCount: 35,
          filterKey: 'ming',
          image: '',
          description: '明制汉服',
        },
        {
          id: 4,
          title: '婚服系列',
          productCount: 12,
          filterKey: 'wedding',
          image: '',
          description: '婚服',
        },
        {
          id: 5,
          title: '汉服周边',
          productCount: 15,
          filterKey: 'accessories',
          image: '',
          description: '周边',
        },
        {
          id: 6,
          title: '文创产品',
          productCount: 18,
          filterKey: 'cultural',
          image: '',
          description: '文创产品',
        },
      ],
    }
    return HttpResponse.json(response)
  }),
  // 获取产品列表
  http.get('/api/products', ({ request }) => {
    const url = new URL(request.url)
    const category = url.searchParams.get('category')
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '10')

    let filteredProducts = products

    // 分类筛选
    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter((p) => p.category === category)
    }

    // 分页
    const start = (page - 1) * limit
    const end = start + limit
    const paginatedProducts = filteredProducts.slice(start, end)

    const response: ApiResponse<Product[]> = {
      data: paginatedProducts,
      pagination: {
        total: filteredProducts.length,
        page,
        limit,
        totalPages: Math.ceil(filteredProducts.length / limit),
      },
    }

    return HttpResponse.json(response)
  }),

  // 获取单个产品
  http.get('/api/products/:id', ({ params }) => {
    const product = products.find((p) => p.id === Number(params.id))

    if (!product) {
      return HttpResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const response: ApiResponse<Product> = { data: product }
    return HttpResponse.json(response)
  }),

  // 获取相关产品
  http.get('/api/products/:id/related', ({ params }) => {
    const productId = parseInt(params.id as string)
    const currentProduct = products.find((p) => p.id === productId)

    if (!currentProduct) {
      return HttpResponse.json([], { status: 404 })
    }

    // 基于相同朝代和分类推荐
    const relatedProducts = products
      .filter((p) => p.id !== productId)
      .filter((p) => p.dynasty === currentProduct.dynasty || p.category === currentProduct.category)
      .slice(0, 4)

    return HttpResponse.json(relatedProducts)
  }),

  // 获取朝代信息
  http.get('/api/eras', () => {
    const response: ApiResponse<EraInfo[]> = { data: eraInfos }
    return HttpResponse.json(response)
  }),

  // 获取单个朝代信息
  http.get('/api/eras/:id', ({ params }) => {
    const era = eraInfos.find((e) => e.id === params.id)

    if (!era) {
      return HttpResponse.json({ error: 'Era not found' }, { status: 404 })
    }

    const response: ApiResponse<EraInfo> = { data: era }
    return HttpResponse.json(response)
  }),

  // 创建预订
  http.post('/api/bookings', async ({ request }) => {
    const bookingData = (await request.json()) as Partial<Booking>

    const newBooking: Booking = {
      id: `booking_${Date.now()}`,
      packageId: bookingData.packageId || 'package_1',
      customer: bookingData.customer || {
        username: 'Doe',
        email: 'john@example.com',
        phone: '+353123456789',
      },
      date: bookingData.date || new Date().toISOString().split('T')[0],
      time: bookingData.time || '14:00',
      participants: bookingData.participants || 1,
      status: 'pending',
      totalAmount: bookingData.totalAmount || 99.99,
      createdAt: new Date().toISOString(),
    }

    bookings.push(newBooking)

    const response: ApiResponse<Booking> = {
      data: newBooking,
      message: 'Booking created successfully',
    }
    return HttpResponse.json(response, { status: 201 })
  }),

  // 获取预订列表
  http.get('/api/bookings', () => {
    const response: ApiResponse<Booking[]> = { data: bookings }
    return HttpResponse.json(response)
  }),

  // 获取单个预订
  http.get('/api/bookings/:id', ({ params }) => {
    const booking = bookings.find((b) => b.id === params.id)

    if (!booking) {
      return HttpResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    const response: ApiResponse<Booking> = { data: booking }
    return HttpResponse.json(response)
  }),

  // 更新预订状态
  http.patch('/api/bookings/:id', async ({ params, request }) => {
    const updateData = (await request.json()) as { status?: string }
    const booking = bookings.find((b) => b.id === params.id)

    if (!booking) {
      return HttpResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    if (updateData.status) {
      booking.status = updateData.status as BookingStatus
    }

    const response: ApiResponse<Booking> = {
      data: booking,
      message: 'Booking updated successfully',
    }
    return HttpResponse.json(response)
  }),

  // 健康检查
  http.get('/api/health', () => {
    return HttpResponse.json({ status: 'OK', timestamp: new Date().toISOString() })
  }),

  // 联系表单提交
  http.post('/api/contact', async ({ request }) => {
    const formData = await request.json()

    // 模拟处理延迟
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const response: ApiResponse<{ success: boolean }> = {
      data: { success: true },
      message: 'Message sent successfully',
    }

    return HttpResponse.json(response, { status: 200 })
  }),
]
