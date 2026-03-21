import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Instrument_Serif } from 'next/font/google'
import './globals.css'

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://sm.idoevergreen.me'),
  title: 'Prompt Skill Manager — Universal AI Agent Skills',
  description:
    'Browse, install, enable, and share AI agent skills across all major coding agents in one desktop app.',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/prompt-skill-manger-1.0.jpg',
    apple: '/prompt-skill-manger-1.0.jpg',
  },
  openGraph: {
    title: 'Prompt Skill Manager — Universal AI Agent Skills',
    description: 'Universal AI agent skills manager for Claude Code, Cursor, Copilot, and more.',
    url: 'https://sm.idoevergreen.me',
    siteName: 'Prompt Skill Manager',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Prompt Skill Manager — One place for all your AI skills',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prompt Skill Manager — Universal AI Agent Skills',
    description: 'Universal AI agent skills manager for Claude Code, Cursor, Copilot, and more.',
    images: ['/opengraph-image'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${instrumentSerif.variable}`}>
      <body className="font-sans antialiased">{children}<Analytics /></body>
    </html>
  )
}
