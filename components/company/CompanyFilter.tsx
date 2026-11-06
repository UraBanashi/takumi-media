'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition, useRef } from 'react'
import { cn } from '@/lib/utils'
import type { CompanyCategory, PlanType } from '@/types/database'

const PLAN_FILTERS: { value: string; label: string; activeClass: string; inactiveClass: string }[] = [
  {
    value: '',
    label: 'すべて',
    activeClass:   'bg-takumi-black text-white border-takumi-black',
    inactiveClass: 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50',
  },
  {
    value: 'sns',
    label: '匠認定',
    activeClass:   'bg-takumi-gold text-white border-takumi-gold',
    inactiveClass: 'bg-takumi-gold/5 text-takumi-gold border-takumi-gold/30 hover:bg-takumi-gold/10',
  },
  {
    value: 'kizuku',
    label: 'KIZUKU',
    activeClass:   'bg-green-600 text-white border-green-600',
    inactiveClass: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100',
  },
]

const CATEGORIES: CompanyCategory[] = [
  '土木工事',
  '建築工事',
  '大工工事',
  '左官工事',
  'とび・土工・コンクリート工事',
  '石工事',
  '屋根工事',
  '電気工事',
  '管工事',
  'タイル・れんが・ブロック工事',
  '鋼構造物工事',
  '鉄筋工事',
  '舗装工事',
  'しゅんせつ工事',
  '板金工事',
  'ガラス工事',
  '塗装工事',
  '防水工事',
  '内装仕上工事',
  '機械器具設置工事',
  '熱絶縁工事',
  '電気通信工事',
  '造園工事',
  'さく井工事',
  '建具工事',
  '水道施設工事',
  '消防施設工事',
  '清掃施設工事',
  '解体工事',
]

interface Props {
  prefectures: string[]
}

export default function CompanyFilter({ prefectures }: Props) {
  const router = useRouter()
  const params = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const keywordRef = useRef<HTMLInputElement>(null)
  const cityRef    = useRef<HTMLInputElement>(null)

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString())
    if (value) { next.set(key, value) } else { next.delete(key) }
    next.delete('page')
    startTransition(() => { router.push(`/?${next.toString()}`) })
  }

  function handleSearch() {
    const next = new URLSearchParams(params.toString())
    const keyword = keywordRef.current?.value.trim() ?? ''
    const city    = cityRef.current?.value.trim() ?? ''
    if (keyword) { next.set('keyword', keyword) } else { next.delete('keyword') }
    if (city)    { next.set('city', city) }       else { next.delete('city') }
    next.delete('page')
    startTransition(() => { router.push(`/?${next.toString()}`) })
  }

  const currentPref     = params.get('prefecture') ?? ''
  const currentCity     = params.get('city')       ?? ''
  const currentCategory = params.get('category')   ?? ''
  const currentKeyword  = params.get('keyword')    ?? ''
  const currentPlan     = params.get('plan_type')  ?? ''
  const hasFilter       = !!(currentKeyword || currentPref || currentCity || currentCategory || currentPlan)

  return (
    <div className={cn('space-y-3', isPending && 'opacity-60 pointer-events-none transition-opacity')}>
      {/* キーワード・市区町村 */}
      <div className="flex gap-2 flex-wrap sm:flex-nowrap">
        <input
          ref={keywordRef}
          type="text"
          placeholder="企業名・キーワード"
          defaultValue={currentKeyword}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="flex-1 min-w-0 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-takumi-gold/40 focus:border-takumi-gold"
        />
        <input
          ref={cityRef}
          type="text"
          placeholder="市区町村"
          defaultValue={currentCity}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="w-36 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-takumi-gold/40 focus:border-takumi-gold"
        />
        <button
          onClick={handleSearch}
          className="bg-takumi-gold hover:bg-takumi-gold-dark text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shrink-0"
        >
          検索
        </button>
        {hasFilter && (
          <button
            onClick={() => router.push('/')}
            className="text-sm text-gray-500 hover:text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors shrink-0"
          >
            クリア
          </button>
        )}
      </div>

      {/* 都道府県・業種・プランフィルター */}
      <div className="flex flex-wrap gap-3">
        <select
          value={currentPref}
          onChange={(e) => update('prefecture', e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-takumi-gold/40 focus:border-takumi-gold"
        >
          <option value="">都道府県</option>
          {prefectures.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        <select
          value={currentCategory}
          onChange={(e) => update('category', e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-takumi-gold/40 focus:border-takumi-gold"
        >
          <option value="">業種</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* プランフィルター */}
        <div className="flex gap-1.5 flex-wrap">
          {PLAN_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => update('plan_type', f.value)}
              className={cn(
                'px-3 py-1.5 text-xs font-bold rounded-full border transition-all whitespace-nowrap',
                currentPlan === f.value ? f.activeClass : f.inactiveClass
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* アクティブフィルター表示 */}
      {hasFilter && (
        <div className="flex flex-wrap gap-2 text-xs">
          {currentKeyword && (
            <span className="bg-takumi-gold/10 text-takumi-gold border border-takumi-gold/30 px-2 py-1 rounded-full">
              「{currentKeyword}」
            </span>
          )}
          {currentCity && (
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{currentCity}</span>
          )}
          {currentPref && (
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{currentPref}</span>
          )}
          {currentCategory && (
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{currentCategory}</span>
          )}
        </div>
      )}
    </div>
  )
}
