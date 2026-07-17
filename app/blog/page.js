import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import Nav from '@/components/landing/Nav'
import Footer from '@/components/landing/Footer'

export const metadata = {
  title: "Blog — Freight Forwarding Intelligence | Susea",
  description:
    "Pricing, procurement, and AI intelligence for freight forwarders. Guides on surcharges, RFQ, ocean rates, and building a modern pricing desk.",
  alternates: { canonical: "https://susea.ai/blog" },
  openGraph: {
    title: "Susea Blog — Freight Intelligence",
    description: "Pricing, procurement, and AI guides for freight forwarders.",
    url: "https://susea.ai/blog",
    images: [
      {
        url: "/favicon.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const TOPIC_COLORS = {
  'Freight Education': 'blue',
  'AI & Automation': 'orange',
  'Pricing & Quotation': 'amber',
  'RFQ & Procurement': 'good',
  'Trade Lanes': 'blue',
}

function TopicPill({ topic }) {
  const color = TOPIC_COLORS[topic] || 'blue'
  return <span className={`pill ${color}`}>{topic}</span>
}

function PostCard({ post }) {
  const date = new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  return (
    <Link href={`/blog/${post.slug}`} className="blog-card">
      <div className="blog-card-meta">
        <TopicPill topic={post.topic} />
        <span className="blog-card-date">{date}</span>
      </div>
      <h2 className="blog-card-title">{post.title}</h2>
      <p className="blog-card-desc">{post.description}</p>
      <div className="blog-card-author">
        <div className="blog-author-avatar">{post.author?.charAt(0)}</div>
        <span>{post.author}</span>
      </div>
    </Link>
  )
}

export default function BlogPage() {
  const posts = getAllPosts()
  return (
    <>
      <Nav />
      <main>
        <section className="blog-hero">
          <div className="container">
            <span className="eyebrow"><span className="dot"></span> Freight Intelligence</span>
            <h1 className="h-display" style={{ marginTop: 20, marginBottom: 16 }}>
              Pricing, procurement &amp;<br />ocean freight — explained.
            </h1>
            <p className="lead">
              In-depth guides on surcharges, RFQ, AI tariff extraction, and building a modern pricing desk — written for freight forwarders and NVOCCs.
            </p>
          </div>
        </section>

        <section className="blog-listing">
          <div className="container">
            {posts.length === 0 ? (
              <p style={{ color: 'var(--ink-3)', textAlign: 'center', padding: '80px 0' }}>Posts coming soon.</p>
            ) : (
              <div className="blog-grid">
                {posts.map(post => <PostCard key={post.slug} post={post} />)}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
