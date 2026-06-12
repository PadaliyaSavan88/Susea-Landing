import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const contentDir = path.join(root, 'content/blog')
const outputPath = path.join(root, 'public/llms.txt')

if (!fs.existsSync(contentDir)) {
  console.log('No content/blog directory found, skipping llms.txt build.')
  process.exit(0)
}

const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx'))
const posts = files
  .map(file => {
    const slug = file.replace(/\.mdx$/, '')
    const raw = fs.readFileSync(path.join(contentDir, file), 'utf8')
    const { data } = matter(raw)
    return { slug, ...data }
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date))

const lines = [
  '# Susea',
  '',
  '> Susea is the AI pricing and procurement operating system for ocean freight forwarders. Instant spot rates across 120+ carriers, live RFQ auctions, and branded customer quotes in under 90 seconds.',
  '',
  '## Blog',
  '',
  ...posts.map(p => `- [${p.title}](https://susea.ai/blog/${p.slug}): ${p.description}`),
  '',
]

fs.writeFileSync(outputPath, lines.join('\n'), 'utf8')
console.log(`✓ llms.txt updated — ${posts.length} posts listed.`)
