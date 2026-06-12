export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: '/api/' },
    ],
    sitemap: 'https://susea.ai/sitemap.xml',
  }
}
