/*
 * @Author: yzy
 * @Date: 2025-08-22 14:40:01
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-22 14:47:17
 */
// /*
//  * @Author: yzy
//  * @Date: 2025-08-22 14:40:01
//  * @LastEditors: yzy
//  * @LastEditTime: 2025-08-22 14:43:53
//  */
// import * as fs from 'fs'
// import * as path from 'path'
// import { dirname } from 'path'
// import { fileURLToPath } from 'url'

// // 获取当前文件的目录路径
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

// const directoryStructure = [
//   'assets/images/hero',
//   'assets/images/products/tang/product-001',
//   'assets/images/products/tang/product-002',
//   'assets/images/products/song',
//   'assets/images/products/ming',
//   'assets/images/categories',
//   'assets/images/eras/tang-era',
//   'assets/images/eras/song-era',
//   'assets/images/eras/ming-era',
//   'assets/images/about',
//   'assets/images/collaboration',
//   'assets/images/icons/dynasty',
//   'assets/images/icons/social',
//   'assets/images/icons/decorative',
//   'assets/images/logos',
//   'assets/images/placeholders',
// ]

// function createDirectories() {
//   console.log('Creating image directory structure...\n')

//   directoryStructure.forEach((dir) => {
//     const fullPath = path.join(__dirname, dir)

//     if (!fs.existsSync(fullPath)) {
//       fs.mkdirSync(fullPath, { recursive: true })
//       console.log(`✓ Created: ${dir}`)
//     } else {
//       console.log(`- Already exists: ${dir}`)
//     }
//   })

//   console.log('\n✅ Directory structure created successfully!')
//   console.log('\nNext steps:')
//   console.log('1. Add your image files to the appropriate folders')
//   console.log('2. Update your components to use the actual image paths')
// }

// // Run the script
// createDirectories()
