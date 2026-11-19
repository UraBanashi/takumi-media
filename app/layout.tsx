import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: '建設業トリセツ 匠 | 建設業界のすべてがわかるメディア',
    template: '%s | 建設業トリセツ 匠',
  },
  description: '建設業界のすべてがわかるメディア「匠」。建設会社の検索・職人図鑑・KIZUKU体験プログラムを掲載。名古屋・北海道など全国の建設業者情報を発信。',
  keywords: ['建設業', '建設会社', '建設業求人', '建設業 未経験', '建設業 名古屋', '建設業 北海道', '職人', '建設業トリセツ'],
  metadataBase: new URL('https://takumi.urabanashi.com'),
  openGraph: {
    siteName: '建設業トリセツ 匠',
    locale: 'ja_JP',
    type: 'website',
    url: 'https://takumi.urabanashi.com',
    title: '建設業トリセツ 匠 | 建設業界のすべてがわかるメディア',
    description: '建設業界のすべてがわかるメディア「匠」。建設会社の検索・職人図鑑・KIZUKU体験プログラムを掲載。',
  },
  twitter: {
    card: 'summary_large_image',
    title: '建設業トリセツ 匠',
    description: '建設業界のすべてがわかるメディア',
  },
  alternates: {
    canonical: 'https://takumi.urabanashi.com',
  },
  verification: {
    google: 'Uscjv-jQ_cKa5tbNlYZT85w8s4haE1Gk-pWLCq2f3Z4',
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
