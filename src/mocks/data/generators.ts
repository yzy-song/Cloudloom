import { fa, faker } from '@faker-js/faker'
import type {
  Product,
  ProductCategory,
  ProductColor,
  RentalPeriod,
  EraInfo,
  Booking,
  CustomerInfo,
  TimelineEvent,
} from '@/types'

// 产品颜色配置
export const productColors: ProductColor[] = [
  { id: '1', name: '红色', value: '#dc2626', inStock: true },
  { id: '2', name: '蓝色', value: '#2563eb', inStock: true },
  { id: '3', name: '绿色', value: '#16a34a', inStock: true },
  { id: '4', name: '金色', value: '#ca8a04', inStock: false },
  { id: '5', name: '紫色', value: '#9333ea', inStock: true },
  { id: '6', name: '粉色', value: '#db2777', inStock: true },
]

// 租赁周期配置
export const rentalPeriods: RentalPeriod[] = [
  { id: '1', name: '2小时', duration: 2, unit: 'hour', price: 25 },
  { id: '2', name: '4小时', duration: 4, unit: 'hour', price: 45 },
  { id: '3', name: '1天', duration: 1, unit: 'day', price: 80 },
  { id: '4', name: '2天', duration: 2, unit: 'day', price: 150 },
  { id: '5', name: '3天', duration: 3, unit: 'day', price: 210 },
]

export const generateProduct = (): Product => {
  const categories: ProductCategory[] = [
    'tang',
    'song',
    'ming',
    'male',
    'female',
    'kids',
    'wedding',
  ]
  const category = faker.helpers.arrayElement(categories)

  const eraNames = {
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

  const outfitTypes = ['齐胸襦裙', '直裾', '曲裾', '袄裙', '道袍', '比甲', '马面裙']

  return {
    id: faker.number.int(),
    title: `${faker.helpers.arrayElement(Object.values(eraNames))} · ${faker.helpers.arrayElement(outfitTypes)}`,
    description: faker.lorem.paragraphs(2),
    price: parseFloat(faker.number.int({ min: 50, max: 300 }).toString()),
    images: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }, () =>
      faker.image.urlPicsumPhotos({ width: 400, height: 600 }),
    ),
    category,
    sizeOptions: ['XS', 'S', 'M', 'L', 'XL'],
    careInstructions: faker.lorem.sentence(),
    colors: faker.helpers.arrayElements(productColors, faker.number.int({ min: 2, max: 4 })),
    tags: [category, faker.helpers.arrayElement(['豪华', '经典', '新款', '限量'])],
    createdAt: faker.date.past({ years: 1 }).toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    rentalPrice: parseFloat(faker.commerce.price({ min: 20, max: 100 })),
    rentalPeriods: faker.helpers.arrayElements(rentalPeriods, faker.number.int({ min: 2, max: 4 })),

    // 新增字段
    dynasty: category as string,
    dynastyLabel: eraNames[category] || '未知朝代',
    material: faker.helpers.arrayElement(['丝绸', '棉麻', '纱绸', '锦缎']),
    details: [faker.lorem.sentence(), faker.lorem.sentence(), faker.lorem.sentence()],
    reviews: faker.number.int({ min: 0, max: 5 }),
  }
}

export const generateEraInfo = (): EraInfo => {
  const eras = [
    { name: '唐代', period: '618-907 AD', id: 'tang' },
    { name: '宋代', period: '960-1279 AD', id: 'song' },
    { name: '明代', period: '1368-1644 AD', id: 'ming' },
  ]

  const era = faker.helpers.arrayElement(eras)

  return {
    id: era.id,
    name: `${era.name}汉服`,
    period: era.period,
    description: faker.lorem.paragraphs(2),
    characteristics: Array.from({ length: 4 }, () => faker.lorem.words(3)),
    typicalOutfits: Array.from({ length: 3 }, () => faker.lorem.words(2)),
    historicalBackground: faker.lorem.paragraphs(3),
    images: Array.from({ length: 3 }, () =>
      faker.image.urlPicsumPhotos({ width: 600, height: 400 }),
    ),
    timeline: Array.from({ length: 5 }, (_, i) => ({
      year: (i * 50 + 600).toString(),
      event: faker.lorem.words(2),
      description: faker.lorem.sentence(),
    })),
  }
}

export const generateBooking = (): Booking => ({
  id: `booking_${faker.string.uuid()}`,
  packageId: `package_${faker.number.int({ min: 1, max: 5 })}`,
  customer: {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    // 替换第116行及类似行：
    phone: faker.phone.number({ style: 'international' }),
    notes: faker.lorem.sentence(),
  },
  date: faker.date.future().toISOString().split('T')[0],
  time: `${faker.number.int({ min: 9, max: 17 })}:00`,
  participants: faker.number.int({ min: 1, max: 10 }),
  status: faker.helpers.arrayElement(['pending', 'confirmed', 'cancelled', 'completed']),
  totalAmount: parseFloat(faker.commerce.price({ min: 50, max: 500 })),
  createdAt: faker.date.past().toISOString(),
})

export const generateCustomer = (): CustomerInfo => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  phone: faker.phone.number({ style: 'international' }),
  notes: faker.lorem.sentence(),
})
