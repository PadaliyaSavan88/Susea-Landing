import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/freight-forwarding',
        destination: '/',
        permanent: true,
      },
    ];
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-gfm', 'remark-frontmatter'],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
