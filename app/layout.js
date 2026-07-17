import './globals.css'
import Script from 'next/script'

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
    images: [
      {
        url: '/api/og?title=AI%20Operating%20System%20for%20Ocean%20Freight&topic=Susea',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Susea — AI Operating System for Ocean Freight',
    description: 'The pricing & quotation OS for freight forwarders.',
    images: ['/api/og?title=AI%20Operating%20System%20for%20Ocean%20Freight&topic=Susea'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          id="gtm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KN72RX7F');`,
          }}
        />
        <Script
          id="gtag-js"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-D8W1DC2Y35"
        />
        <Script
          id="gtag-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-D8W1DC2Y35');`,
          }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KN72RX7F"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
        <Script
          type="text/javascript"
          id="hs-script-loader"
          async
          defer
          src="https://js.hs-scripts.com/246430647.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
