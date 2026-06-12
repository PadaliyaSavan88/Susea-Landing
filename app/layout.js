import './globals.css'

export const metadata = {
  metadataBase: new URL('https://susea.ai'),
  title: 'Susea — AI Operating System for Ocean Freight',
  description: 'The pricing & quotation OS for freight forwarders. Get instant spot rates, run live RFQ auctions, and quote customers in under 90 seconds.',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Susea — AI Operating System for Ocean Freight',
    description: 'The pricing & quotation OS for freight forwarders.',
    url: 'https://susea.ai',
    siteName: 'Susea',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
