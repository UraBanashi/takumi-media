import Image from 'next/image'
import Link from 'next/link'
import { getCraftsmen } from '@/lib/queries/craftsmen'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: '職人図鑑' }
export const revalidate = 60

const specialtyColors: Record<string, string> = {
  '型枠大工':       'bg-amber-100 text-amber-800',
  '鉄筋工':         'bg-red-100 text-red-800',
  '施工管理':       'bg-blue-100 text-blue-800',
  '電気工事士':     'bg-yellow-100 text-yellow-800',
  '土木施工管理':   'bg-green-100 text-green-800',
  'リフォームプランナー': 'bg-purple-100 text-purple-800',
}

export default async function CraftsmenPage() {
  const craftsmen = await getCraftsmen()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ページヘッダー */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-1 h-8 bg-takumi-gold rounded-full inline-block" />
          <h1 className="text-2xl font-black text-takumi-black">職人図鑑</h1>
        </div>
        <p className="text-gray-500 text-sm ml-4">
          建設業を支えるプロフェッショナルたちを紹介します
        </p>
      </div>

      {/* 統計バー */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: '掲載職人数', value: `${craftsmen.length}名` },
          { label: '職種数', value: `${new Set(craftsmen.map(c => c.specialty)).size}種` },
          { label: '平均経験年数', value: `${Math.round(craftsmen.reduce((s, c) => s + (c.experience ?? 0), 0) / craftsmen.length)}年` },
        ].map((stat) => (
          <div key={stat.label} className="bg-takumi-black rounded-xl p-4 text-center text-white">
            <p className="text-takumi-gold font-black text-2xl">{stat.value}</p>
            <p className="text-white/60 text-xs mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {craftsmen.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p>職人情報は準備中です</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {craftsmen.map((craftsman) => (
            <div
              key={craftsman.id}
              id={craftsman.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              {/* 上部カラーバー */}
              <div className="h-1.5 bg-gradient-to-r from-takumi-gold to-takumi-gold-light" />

              <div className="p-5">
                <div className="flex items-start gap-4 mb-4">
                  {/* アバター */}
                  <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden shrink-0 flex items-center justify-center ring-2 ring-takumi-gold/20">
                    {craftsman.photo_url ? (
                      <Image
                        src={craftsman.photo_url}
                        alt={craftsman.name}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-black text-gray-300">
                        {craftsman.name.charAt(0)}
                      </span>
                    )}
                  </div>

                  {/* 基本情報 */}
                  <div className="min-w-0">
                    <h2 className="font-black text-takumi-black text-lg leading-tight">
                      {craftsman.name}
                    </h2>
                    {craftsman.name_kana && (
                      <p className="text-xs text-gray-400 mb-1">{craftsman.name_kana}</p>
                    )}
                    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${specialtyColors[craftsman.specialty] ?? 'bg-gray-100 text-gray-600'}`}>
                      {craftsman.specialty}
                    </span>
                  </div>
                </div>

                {/* 経験年数 */}
                {craftsman.experience && (
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                      <div
                        className="bg-takumi-gold h-1.5 rounded-full"
                        style={{ width: `${Math.min(craftsman.experience / 40 * 100, 100)}%` }}
                      />
                    </div>
                    <span className="text-xs text-takumi-gold font-bold shrink-0">
                      経験 {craftsman.experience}年
                    </span>
                  </div>
                )}

                {/* 自己紹介 */}
                {craftsman.bio && (
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-3">
                    {craftsman.bio}
                  </p>
                )}

                {/* 所属企業 */}
                {craftsman.company_slug && (
                  <Link
                    href={`/companies/${craftsman.company_slug}`}
                    className="flex items-center gap-1.5 text-xs text-takumi-gold hover:underline border-t border-gray-100 pt-3"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
                    </svg>
                    {craftsman.company_name}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 職人登録促進 */}
      <div className="mt-12 border border-takumi-gold/30 rounded-2xl p-8 text-center">
        <p className="text-takumi-gold font-bold text-xs tracking-widest mb-2">職人登録</p>
        <h2 className="text-xl font-black mb-3">あなたの技を紹介しませんか？</h2>
        <p className="text-gray-500 text-sm mb-6">
          SNS運用プランで職人プロフィールを掲載できます。
        </p>
        <Link
          href="/contact"
          className="inline-block bg-takumi-black hover:bg-takumi-gold text-white font-bold px-8 py-3 rounded-full transition-colors"
        >
          お問い合わせ
        </Link>
      </div>
    </div>
  )
}
