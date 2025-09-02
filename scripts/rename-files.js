// rename-files.js

import fs from 'fs'
import path from 'path'

/**
 * 批量重命名某个目录下的文件
 * @param {string} dirPath 要处理的目录，如 './src/assets/images'
 * @param {string} prefix 文件名前缀，如 'img'
 * @param {number} startNumber 起始序号，如 1
 * @param {number} padLength 序号补零长度，如 3 → '001'
 * @param {string[]} filterExtensions 只处理哪些扩展名，如 ['.jpg', '.png']，空数组则处理全部
 */
function batchRenameFiles(
  dirPath,
  prefix = 'img',
  startNumber = 1,
  padLength = 3,
  filterExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.svg'],
) {
  try {
    // 检查目录是否存在
    if (!fs.existsSync(dirPath)) {
      console.error(`❌ 目录不存在: ${dirPath}`)
      return
    }

    // 读取目录中的所有文件
    const files = fs.readdirSync(dirPath)

    let currentNumber = startNumber

    files.forEach((originalName) => {
      const filePath = path.join(dirPath, originalName)
      const fileStat = fs.statSync(filePath)

      // 只处理文件，不处理文件夹
      if (!fileStat.isFile()) {
        console.log(`⏩ 跳过（非文件）: ${originalName}`)
        return
      }

      const ext = path.extname(originalName).toLowerCase() // 如 .jpg
      const basename = path.basename(originalName, ext) // 去掉扩展名的文件名

      // 如果设置了扩展名过滤，且当前文件扩展名不在列表中，则跳过
      if (filterExtensions.length > 0 && !filterExtensions.includes(ext)) {
        console.log(`⏩ 跳过（非目标扩展名）: ${originalName}`)
        return
      }

      // 按规则生成新文件名，如：img_001.jpg
      const paddedNumber = currentNumber.toString().padStart(padLength, '0')
      const newFilename = `${prefix}_${paddedNumber}${ext}`
      const newPath = path.join(dirPath, newFilename)

      // 执行重命名
      fs.renameSync(filePath, newPath)

      console.log(`✅ 重命名: "${originalName}" → "${newFilename}"`)

      currentNumber++
    })

    console.log(`🎉 批量重命名完成！共处理了 ${currentNumber - startNumber} 个文件。`)
  } catch (error) {
    console.error('❌ 发生错误:', error)
  }
}

// =========================
// 🎯 在这里配置你的参数并运行
// =========================

// 📂 你要处理的目录，比如 Vue 项目中的图片文件夹
const targetDir = './public/images/home-banner/pc' // ← 请根据你的实际情况修改！

// 🧩 重命名配置
batchRenameFiles(
  targetDir, // 目标目录
  'slide', // 文件名前缀，比如 'banner', 'hero', 'img'
  1, // 从数字 1 开始
  3, // 序号补零到 3 位，比如 001
  ['.jpg', '.jpeg', '.png', '.webp', '.svg'], // 只处理这些格式，可以改成 [] 处理所有文件
)
