import PricingPage from '@/components/pricing/PricingPage'

export const metadata = {
  title: 'Pricing | Susea',
  description: 'Simple pricing for modern freight forwarders. Search Spot Rates, manage RFQs, and create quotations faster — Starter, Pro, and Enterprise plans.',
  alternates: { canonical: 'https://susea.ai/pricing' },
  openGraph: {
    title: 'Susea Pricing',
    description: 'Simple, transparent pricing for modern freight forwarders. Start free, upgrade as you grow.',
    url: 'https://susea.ai/pricing',
    images: [
      {
        url: '/api/og?title=Susea%20Pricing&topic=Susea',
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function Page() {
  return <PricingPage />
}
