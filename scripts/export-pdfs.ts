import fs from 'fs'
import path from 'path'
import { chromium } from 'playwright'
import { subjects } from '@/data/chapters.generated'

const BASE_URL = 'http://localhost:3000'
async function exportPDFs() {
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()

  for (const subject of subjects) {
    for (const chapter of subject.chapters) {
      const url = `${BASE_URL}/${subject.slug}/${chapter.chapter}`
      const outputPath = path.join('output-pdf', subject.slug, `${chapter.chapter}.pdf`)
      fs.mkdirSync(path.dirname(outputPath), { recursive: true })

      console.log(`Exporting: ${url}`)
      await page.goto(url, { waitUntil: 'networkidle' })

      await page.pdf({
        path: outputPath,
        format: 'A4',
        margin: { top: '40px', bottom: '40px', left: '30px', right: '30px' },
        printBackground: true,
      })

      console.log(`✅ Saved: ${outputPath}`)
    }
  }

  await browser.close()
}

exportPDFs()
