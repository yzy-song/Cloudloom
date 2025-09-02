import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import express from 'express'
import multer from 'multer'
import sharp from 'sharp'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
// 使用内存存储以便直接处理文件缓冲区
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 将 'output' 目录设为静态资源目录
const outputDir = path.resolve(__dirname, '../output')
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}
app.use('/output', express.static(outputDir))

app.post('/api/process-images', upload.array('images'), async (req, res) => {
  const files = req.files // 上传的文件在 req.files 中
  const { width, height, format = 'jpeg' } = req.body

  console.log('图片处理请求已收到')
  console.log('输出目录:', outputDir)
  console.log('接收参数:', { width, height, format })

  if (!files || files.length === 0) {
    return res.status(400).json({ error: '没有提供图片文件' })
  }

  const processedImages = []

  try {
    await Promise.all(
      files.map(async (file) => {
        let img = sharp(file.buffer) // 使用 file.buffer 处理内存中的文件
        const w = parseInt(width)
        const h = parseInt(height)
        const quality = 90 // 固定质量或从请求中获取

        // 调整尺寸
        if (w && h) {
          img = img.resize(w, h, { fit: 'cover' })
        }

        // 转换格式和设置质量
        if (format === 'jpeg') {
          img = img.jpeg({ quality })
        } else if (format === 'png') {
          img = img.png()
        } else if (format === 'webp') {
          img = img.webp({ quality })
        }

        const fileName = `${path.parse(file.originalname).name}_${Date.now()}.${format}`
        const outPath = path.join(outputDir, fileName)
        await img.toFile(outPath)

        processedImages.push({
          originalName: file.originalname,
          newUrl: `/output/${fileName}`,
        })

        console.log(`成功处理并保存: ${outPath}`)
      }),
    )

    res.json({ message: '所有图片处理成功', processedImages: processedImages })
  } catch (error) {
    console.error('图片处理失败:', error)
    res.status(500).json({ error: '图片处理失败' })
  }
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`服务器正在运行于 http://localhost:${PORT}`)
  console.log('图片处理工具     http://localhost:4000/image-tool')
  console.log(`处理后的图片将保存在: ${outputDir}`)
})
