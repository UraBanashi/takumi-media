import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-takumi-black text-white/60 text-sm mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <p className="text-takumi-gold font-bold text-lg mb-3">匠</p>
            <p className="text-xs leading-relaxed">
              建設業界の企業・職人・現場を深掘りするメディア
            </p>
          </div>
          <div>
            <p className="text-white font-medium mb-3">コンテンツ</p>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-takumi-gold transition-colors">企業一覧</Link></li>
              <li><Link href="/programs" className="hover:text-takumi-gold transition-colors">番組</Link></li>
              <li><Link href="/pr-videos" className="hover:text-takumi-gold transition-colors">PR動画</Link></li>
              <li><Link href="/craftsmen" className="hover:text-takumi-gold transition-colors">職人図鑑</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-white font-medium mb-3">サービス</p>
            <ul className="space-y-2">
              <li><Link href="/kizuku" className="hover:text-takumi-gold transition-colors">KIZUKU</Link></li>
              <li><Link href="/admin" className="hover:text-takumi-gold transition-colors">管理画面</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-white font-medium mb-3">掲載について</p>
            <ul className="space-y-2">
              <li><span className="flex items-center gap-1.5"><span className="inline-block w-2 h-4 bg-takumi-gold rounded-sm" />匠認定プラン</span></li>
              <li><span className="flex items-center gap-1.5"><span className="inline-block w-2 h-4 bg-green-500 rounded-sm" />KIZUKUプラン</span></li>
              <li><span className="flex items-center gap-1.5"><span className="inline-block w-2 h-4 bg-white/20 rounded-sm" />無料掲載</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center text-xs">
          © {new Date().getFullYear()} 匠 All rights reserved.
        </div>
      </div>
    </footer>
  )
}
