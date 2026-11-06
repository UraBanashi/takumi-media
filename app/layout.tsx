import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: '匠 | 建設業メディア',
    template: '%s | 匠',
  },
  description: '建設業界の企業・職人・現場を深掘りするメディアサイト。企業検索・職人図鑑・建設業番組を掲載。',
  openGraph: {
    siteName: '匠',
    locale: 'ja_JP',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
