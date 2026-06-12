import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllSlugs, getPost, getAllPosts } from '@/lib/blog'
import Nav from '@/components/landing/Nav'
import Footer from '@/components/landing/Footer'

export const dynamicParams = false

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} | Susea`,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    alternates: { canonical: `https://susea.ai/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://susea.ai/blog/${slug}`,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.dateModified,
      authors: [post.author],
      images: [`/api/og?title=${encodeURIComponent(post.title)}&topic=${encodeURIComponent(post.topic || '')}`],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [`/api/og?title=${encodeURIComponent(post.title)}&topic=${encodeURIComponent(post.topic || '')}`],
    },
  }
}

function buildJsonLd(post, slug) {
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.dateModified || post.date,
    author: { '@type': 'Person', name: post.author, url: 'https://susea.ai' },
    publisher: { '@type': 'Organization', name: 'Susea', url: 'https://susea.ai', logo: { '@type': 'ImageObject', url: 'https://susea.ai/favicon.png' } },
    url: `https://susea.ai/blog/${slug}`,
    image: `https://susea.ai/api/og?title=${encodeURIComponent(post.title)}&topic=${encodeURIComponent(post.topic || '')}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://susea.ai/blog/${slug}` },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://susea.ai' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://susea.ai/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://susea.ai/blog/${slug}` },
    ],
  }

  const schemas = [articleLd, breadcrumbLd]

  if (post.faq && post.faq.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: post.faq.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    })
  }

  return schemas
}

export default async function BlogPost({ params }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const { default: Content } = await import(`@/content/blog/${slug}.mdx`)
  const schemas = buildJsonLd(post, slug)

  const related = getAllPosts()
    .filter(p => p.slug !== slug && p.topic === post.topic)
    .slice(0, 3)

  const date = new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  const readingTime = Math.ceil((post.wordCount || 2000) / 200)

  return (
    <>
      <Nav />
      {schemas.map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, '\\u003c') }} />
      ))}
      <main className="post-main">
        <article className="post-article">
          <header className="post-header">
            <div className="container post-header-inner">
              <nav className="post-breadcrumb">
                <Link href="/">Home</Link>
                <span>/</span>
                <Link href="/blog">Blog</Link>
                <span>/</span>
                <span>{post.topic}</span>
              </nav>
              <div className="post-eyebrow">
                <span className={`pill ${post.topic === 'AI & Automation' ? 'orange' : post.topic === 'Pricing & Quotation' ? 'amber' : 'blue'}`}>{post.topic}</span>
                <span className="post-read-time">{readingTime} min read</span>
              </div>
              <h1 className="post-title">{post.title}</h1>
              <p className="post-desc">{post.description}</p>
              <div className="post-author-row">
                <div className="blog-author-avatar lg">{post.author?.charAt(0)}</div>
                <div>
                  <div className="post-author-name">{post.author}</div>
                  <div className="post-date">{date}</div>
                </div>
              </div>
            </div>
          </header>

          <div className="container post-body-wrap">
            <div className="post-content prose">
              <Content />
            </div>
            <aside className="post-sidebar">
              <div className="post-cta-card">
                <div className="post-cta-icon">S</div>
                <h4>Quote in 90 seconds</h4>
                <p>Susea is the AI pricing OS for freight forwarders. Spot rates, RFQ auctions, and branded quotes — in one platform.</p>
                <Link href="/#waitlist" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Join the waitlist</Link>
              </div>
              {related.length > 0 && (
                <div className="post-related">
                  <h4>Related posts</h4>
                  <ul>
                    {related.map(r => (
                      <li key={r.slug}>
                        <Link href={`/blog/${r.slug}`}>{r.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
