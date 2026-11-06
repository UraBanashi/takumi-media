'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const nav = [
  { href: '/',            label: '企業一覧' },
  { href: '/programs',   label: '番組' },
  { href: '/pr-videos',  label: 'PR動画' },
  { href: '/craftsmen',  label: '職人図鑑' },
  { href: '/kizuku',     label: 'KIZUKU' },
]

export default function Header() {
  const pathname = usePathname()
  const isTop = pathname === '/'

  return (
    <header className="bg-takumi-black text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ：トップページでは非表示 */}
          <Link href="/" className={`flex items-center gap-2 shrink-0 ${isTop ? 'invisible' : ''}`}>
            <Image
              src="/logo.png"
              alt="匠"
              width={120}
              height={40}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* ナビゲーション */}
          <nav className="hidden md:flex items-center gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm text-white/80 hover:text-takumi-gold hover:bg-white/5 rounded transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* モバイルメニューは後実装 */}
          <button className="md:hidden p-2 text-white/80 hover:text-takumi-gold">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
