import { getAllPosts } from '@/lib/blog'

export default function sitemap() {
  const posts = getAllPosts()
  const blogUrls = posts.map(post => ({
    url: `https://susea.ai/blog/${post.slug}`,
    lastModified: new Date(post.dateModified || post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    { url: 'https://susea.ai', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://susea.ai/blog', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://susea.ai/privacy', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: 'https://susea.ai/terms', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    ...blogUrls,
  ]
}
