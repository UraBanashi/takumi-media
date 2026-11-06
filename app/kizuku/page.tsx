import Link from 'next/link'
import { getKizukuEntries } from '@/lib/queries/kizuku'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'KIZUKU ─ 建設業体験プログラム' }
export const revalidate = 60

export default async function KizukuPage() {
  const entries = await getKizukuEntries()

  return (
    <>
      {/* ヒーロー */}
      <section className="bg-gradient-to-br from-green-800 to-green-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-green-200 text-xs font-bold tracking-[0.3em] mb-3">KIZUKU</p>
          <h1 className="font-mincho text-4xl sm:text-5xl font-black mb-4 leading-tight">
            建設業を、<br /><span className="text-takumi-gold">体験</span>から始めよう。
          </h1>
          <p className="text-green-100 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            現場で働く職人と一緒に過ごす1日。<br />
            コンクリートの重さ、鉄筋の冷たさ、チームワークの熱さを体感してください。
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#programs"
              className="bg-white text-green-700 font-bold px-8 py-3 rounded-full hover:bg-green-50 transition-colors">
              体験プログラムを見る ↓
            </a>
            <Link href="/companies?plan_type=kizuku"
              className="border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white/10 transition-colors">
              KIZUKU企業一覧
            </Link>
          </div>
        </div>
      </section>

      {/* 特徴 */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: '🏗️',
                title: '本物の現場を体験',
                desc: '実際の工事現場で職人の仕事を間近で見て、触れて、感じる。教科書では学べないリアルがあります。',
              },
              {
                icon: '👷',
                title: '職人と直接話せる',
                desc: 'ベテラン職人と1日一緒に過ごし、仕事の魅力・やりがい・キャリアパスについて直接聞けます。',
              },
              {
                icon: '📋',
                title: '就職・転職の第一歩',
                desc: '建設業に興味があるすべての方へ。学生・社会人・転職希望者、どなたでも参加できます。',
              },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 rounded-xl bg-green-50">
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="font-black text-green-800 text-lg mb-2">{item.title}</h3>
                <p className="text-green-700 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* プログラム一覧 */}
      <section id="programs" className="bg-gray-50 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-1 h-8 bg-green-500 rounded-full inline-block" />
            <h2 className="text-2xl font-black text-takumi-black">体験プログラム一覧</h2>
          </div>

          {entries.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p>体験プログラムは準備中です</p>
            </div>
          ) : (
            <div className="space-y-5">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden border-l-4 border-l-green-500"
                >
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1">
                        {/* 企業名 */}
                        <Link
                          href={`/companies/${entry.company_slug}`}
                          className="text-xs text-green-600 font-bold hover:underline mb-2 inline-flex items-center gap-1"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" />
                          </svg>
                          {entry.company_name}
                        </Link>

                        {/* プログラム名 */}
                        <h3 className="font-black text-takumi-black text-xl mb-2">
                          {entry.title}
                        </h3>

                        {/* 説明 */}
                        {entry.description && (
                          <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            {entry.description}
                          </p>
                        )}

                        {/* 詳細情報 */}
                        <div className="flex flex-wrap gap-4 text-sm">
                          {entry.schedule && (
                            <span className="flex items-center gap-1.5 text-gray-600">
                              <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {entry.schedule}
                            </span>
                          )}
                          {entry.capacity && (
                            <span className="flex items-center gap-1.5 text-gray-600">
                              <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              定員 {entry.capacity}名
                            </span>
                          )}
                          {entry.prefecture && (
                            <span className="flex items-center gap-1.5 text-gray-600">
                              <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              </svg>
                              {entry.prefecture}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* 申込みボタン */}
                      <div className="shrink-0">
                        <Link
                          href={`/companies/${entry.company_slug}`}
                          className="block text-center bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl transition-colors whitespace-nowrap"
                        >
                          詳細・申込み →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* KIZUKU参加企業への訴求 */}
      <section className="bg-takumi-black text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-green-400 font-bold text-xs tracking-widest mb-3">FOR COMPANIES</p>
          <h2 className="text-2xl font-black mb-4">KIZUKUに参加しませんか？</h2>
          <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-2xl mx-auto">
            体験プログラムを通じて若い人材に建設業の魅力を伝え、採用につなげましょう。
            KIZUKUプランでは企業ページの緑ボーダー表示＋体験プログラムの掲載ができます。
          </p>
          <Link
            href="/contact"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold px-10 py-4 rounded-full transition-colors"
          >
            KIZUKUプランの詳細を見る
          </Link>
        </div>
      </section>
    </>
  )
}
