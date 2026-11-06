import { Suspense } from 'react'
import Image from 'next/image'
import { getCompanies, getTopRankedCompanies, getPrefectures } from '@/lib/queries/companies'
import CompanyList from '@/components/company/CompanyList'
import CompanyFilter from '@/components/company/CompanyFilter'
import CompanyRanking from '@/components/company/CompanyRanking'
import Pagination from '@/components/company/Pagination'
import type { CompanyFilters, CompanyCategory, PlanType } from '@/types/database'

const PAGE_SIZE = 20

interface PageProps {
  searchParams: Promise<{
    keyword?: string
    prefecture?: string
    city?: string
    category?: string
    plan_type?: string
    page?: string
  }>
}

export const revalidate = 60 // ISR: 60秒ごとに再生成

export default async function TopPage({ searchParams }: PageProps) {
  const sp = await searchParams
  const page = Number(sp.page ?? 1)

  const filters: CompanyFilters = {
    keyword:    sp.keyword,
    prefecture: sp.prefecture,
    city:       sp.city,
    category:   sp.category as CompanyCategory | undefined,
    plan_type:  sp.plan_type as PlanType | undefined,
    page,
    limit: PAGE_SIZE,
  }

  const [{ companies, total }, ranked, prefectures] = await Promise.all([
    getCompanies(filters),
    getTopRankedCompanies(5),
    getPrefectures(),
  ])

  const totalPages = Math.ceil(total / PAGE_SIZE)
  const hasFilters = !!(sp.keyword || sp.prefecture || sp.category || sp.plan_type)

  return (
    <>
      {/* ヒーロー */}
      <section className="bg-takumi-black text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-2">
            <h1 className="font-mincho text-3xl sm:text-4xl font-extrabold tracking-tight whitespace-nowrap shrink-0 relative z-10">
              建設業<span className="text-takumi-gold">トリセツ</span>
            </h1>
            {/* ロゴを「ツ」の真横・少しかぶせて大きく表示 */}
            <div className="-ml-4 shrink-0">
              <Image
                src="/logo.png"
                alt="匠"
                width={500}
                height={180}
                className="h-44 w-auto object-contain"
                priority
              />
            </div>
          </div>
          <p className="font-mincho text-white/60 text-sm sm:text-base">
            ～建設業界のすべてがわかるメディア～
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">

          {/* 左：メインコンテンツ */}
          <div className="min-w-0">
            {/* プラン凡例 */}
            <div className="flex flex-wrap gap-4 mb-5 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-1 h-4 bg-takumi-gold rounded-full" />
                匠認定企業
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-1 h-4 bg-green-500 rounded-full" />
                KIZUKU参加企業
              </span>
            </div>

            {/* フィルター */}
            <div className="mb-6">
              <Suspense>
                <CompanyFilter prefectures={prefectures} />
              </Suspense>
            </div>

            {/* 件数表示 */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">
                {hasFilters
                  ? <><span className="font-semibold text-takumi-black">{total}</span> 件の企業が見つかりました</>
                  : <><span className="font-semibold text-takumi-black">{total}</span> 社掲載中</>
                }
              </p>
            </div>

            {/* 企業一覧 */}
            <CompanyList companies={companies} />

            {/* ページネーション */}
            <Suspense>
              <Pagination currentPage={page} totalPages={totalPages} />
            </Suspense>
          </div>

          {/* 右：サイドバー */}
          <aside className="space-y-6">
            <CompanyRanking companies={ranked} />

            {/* KIZUKUバナー */}
            <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-5 text-white">
              <p className="text-xs font-bold tracking-widest mb-2 text-green-200">KIZUKU</p>
              <h3 className="font-bold text-lg mb-2">建設業を体験しよう</h3>
              <p className="text-sm text-green-100 mb-4">
                現場体験プログラムで職人の仕事を体感。キャリアの第一歩に。
              </p>
              <a
                href="/kizuku"
                className="block text-center bg-white text-green-700 font-bold text-sm py-2 rounded-lg hover:bg-green-50 transition-colors"
              >
                体験プログラムを見る →
              </a>
            </div>

            {/* SNS掲載バナー */}
            <div className="border border-takumi-gold/40 rounded-xl p-5">
              <p className="text-xs font-bold tracking-widest text-takumi-gold mb-2">掲載企業募集</p>
              <h3 className="font-bold text-sm mb-2 text-takumi-black">SNS運用プランで上位表示</h3>
              <p className="text-xs text-gray-500 mb-3">
                金のボーダーで目立つ掲載枠＋SNS運用サポート。
              </p>
              <a
                href="/contact"
                className="block text-center bg-takumi-gold hover:bg-takumi-gold-dark text-white font-bold text-sm py-2 rounded-lg transition-colors"
              >
                お問い合わせ
              </a>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
