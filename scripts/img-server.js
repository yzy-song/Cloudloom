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
// Use memory storage to process files directly in memory
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Make the 'output' directory available as a static web server
const outputDir = path.resolve(__dirname, '../output')
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}
app.use('/output', express.static(outputDir))

app.post('/api/process-images', upload.array('images'), async (req, res) => {
  const files = req.files // Uploaded files are in req.files
  const { width, height, format, quality, crop, keepRatio } = req.body
  console.log('Output directory:', outputDir)
  console.log('Received parameters:', { width, height, format, quality, crop, keepRatio })

  const processedImages = []

  // Ensure output directory exists before processing
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  try {
    await Promise.all(
      files.map(async (file) => {
        let img = sharp(file.buffer) // Use file.buffer for memory-based processing
        const w = parseInt(width)
        const h = parseInt(height)
        const q = parseInt(quality)

        // Resize based on parameters
        if (crop === 'true') {
          img = img.resize(w, h, { fit: 'cover' })
        } else if (keepRatio === 'true') {
          img = img.resize(w, h, { fit: 'inside' })
        } else {
          img = img.resize(w, h, { fit: 'fill' })
        }

        // Convert format and set quality
        if (format === 'jpeg') {
          img = img.jpeg({ quality: q })
        } else if (format === 'png') {
          const compressionLevel = Math.max(0, Math.min(9, Math.round(9 * (1 - (q - 1) / 99))))
          img = img.png({ compressionLevel, effort: 8 })
        } else if (format === 'webp') {
          img = img.webp({ quality: q })
        }

        const fileName = `${path.parse(file.originalname).name}_out.${format}`
        const outPath = path.join(outputDir, fileName)
        await img.toFile(outPath)

        processedImages.push({
          originalName: file.originalname,
          newUrl: `/output/${fileName}`,
        })

        console.log(`Successfully processed and saved: ${outPath}`)
      }),
    )

    res.json({ message: 'All images processed successfully', processedImages: processedImages })
  } catch (error) {
    console.error('Image processing failed:', error)
    res.status(500).json({ error: 'Image processing failed' })
  }
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
