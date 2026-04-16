import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'

export const metadata: Metadata = {
  title: 'FeatureVote — Simple Feature Voting for SaaS Teams',
  description: 'Collect and prioritize feature requests from your users. Simple, flat-priced alternative to Canny.',
  openGraph: {
    title: 'FeatureVote — Simple Feature Voting for SaaS Teams',
    description: 'Collect and prioritize feature requests from your users. Simple, flat-priced alternative to Canny.',
    url: 'https://featurevote.bootstrapquant.com',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=cal-sans@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
