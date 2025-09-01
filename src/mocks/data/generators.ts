import { faker } from '@faker-js/faker'
import type { Product, ProductColor, RentalPeriod, HeroSlide } from '@/types'

// 颜色
export const productColors: ProductColor[] = [
  { id: '1', name: '红色', value: '#dc2626', inStock: true },
  { id: '2', name: '蓝色', value: '#2563eb', inStock: true },
  { id: '3', name: '绿色', value: '#16a34a', inStock: true },
  { id: '4', name: '金色', value: '#ca8a04', inStock: false },
  { id: '5', name: '紫色', value: '#9333ea', inStock: true },
  { id: '6', name: '粉色', value: '#db2777', inStock: true },
]

// 租赁周期
export const rentalPeriods: RentalPeriod[] = [
  { id: '1', name: '2小时', duration: 2, unit: 'hour', price: 25 },
  { id: '2', name: '4小时', duration: 4, unit: 'hour', price: 45 },
  { id: '3', name: '1天', duration: 1, unit: 'day', price: 80 },
  { id: '4', name: '2天', duration: 2, unit: 'day', price: 150 },
  { id: '5', name: '3天', duration: 3, unit: 'day', price: 210 },
]

// 单个产品生成器
export const generateProduct = (): Product => {
  const categories = [
    'tang',
    'song',
    'ming',
    'male',
    'female',
    'kids',
    'wedding',
    'accessories',
    'cultural',
  ] as const

  const category = faker.helpers.arrayElement(categories)
  const dynastyLabels = {
    tang: '唐制',
    song: '宋制',
    ming: '明制',
    male: '男装',
    female: '女装',
    kids: '儿童',
    wedding: '婚服',
    accessories: '周边',
    cultural: '文创',
  }

  return {
    id: faker.number.int({ min: 1000, max: 9999 }),
    title: `${dynastyLabels[category]}·${faker.commerce.productName()}`,
    description: faker.lorem.paragraph(),
    price: faker.number.int({ min: 50, max: 300 }),
    category,
    colors: faker.helpers.arrayElements(productColors, faker.number.int({ min: 2, max: 4 })),
    dynasty: category,
    dynastyLabel: dynastyLabels[category],
    tags: [category, faker.commerce.productAdjective()],
    images: Array.from({ length: 3 }, (_, i) => `/images/gallery-carousel/mock${i + 1}.jpg`),
    material: faker.helpers.arrayElement(['丝绸', '棉麻', '纱绸', '锦缎']),
    sizeOptions: ['XS', 'S', 'M', 'L', 'XL'],
    careInstructions: faker.lorem.sentence(),
    createdAt: faker.date.past({ years: 1 }).toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    rentalPrice: faker.number.int({ min: 20, max: 100 }),
    rentalPeriods: faker.helpers.arrayElements(rentalPeriods, faker.number.int({ min: 2, max: 4 })),
    details: [faker.lorem.sentence(), faker.lorem.sentence()],
    reviews: faker.number.int({ min: 0, max: 5 }),
    subcategoryId: faker.string.uuid(),
    // subcategory 可选，不生成
  }
}

// 主页轮播图生成器
export const generateHeroSlides = (): HeroSlide[] => [
  {
    title: '云织汉服',
    description: '在翡翠岛国，邂逅千年华裳。我们提供汉服租赁、销售及文化体验，连接传统与现代之美。',
    buttonText: '立即预约',
    action: '/booking',
    image: '/images/home-banner/banner01.png',
  },
  {
    title: '正品汉服',
    description: '所有服饰均为高品质正品汉服。',
    buttonText: '了解更多',
    action: '/gallery',
    image: '/images/home-banner/banner02.png',
  },
  {
    title: '专业摄影',
    description: '每位顾客均可享受免费专业拍照。',
    buttonText: '查看服务',
    action: '/service',
    image: '/images/home-banner/banner03.png',
  },
]

export const mockProducts = Array.from({ length: 20 }, generateProduct)
export const mockHeroSlides = generateHeroSlides()
