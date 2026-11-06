'use client'

import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { Company } from '@/types/database'

interface Props {
  company: Company
}

// 左ボーダー：bothは金（匠認定優先）
const planBorder: Record<string, string> = {
  both:   'border-l-4 border-l-takumi-gold',
  sns:    'border-l-4 border-l-takumi-gold',
  kizuku: 'border-l-4 border-l-green-500',
  free:   'border-l-4 border-l-transparent',
}

const badgeSns    = { label: '匠認定', className: 'bg-takumi-gold/10 text-takumi-gold border border-takumi-gold/30' }
const badgeKizuku = { label: 'KIZUKU', className: 'bg-green-50 text-green-700 border border-green-200' }

// plan_type ごとに表示するバッジ一覧を返す
function getBadges(planType: string) {
  if (planType === 'both')   return [badgeSns, badgeKizuku]
  if (planType === 'sns')    return [badgeSns]
  if (planType === 'kizuku') return [badgeKizuku]
  return []
}

export default function CompanyCard({ company }: Props) {
  const badges = getBadges(company.plan_type)
  const showKizukuBtn = company.plan_type === 'kizuku' || company.plan_type === 'both'

  return (
    <Link
      href={`/companies/${company.slug}`}
      className={cn(
        'flex gap-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 group',
        planBorder[company.plan_type]
      )}
    >
      {/* ロゴ */}
      {/* ロゴ or ショート動画（匠認定のみ） */}
      <div className="shrink-0 w-16 h-16 rounded-md bg-gray-100 overflow-hidden flex items-center justify-center relative">
        {(company.plan_type === 'sns' || company.plan_type === 'both') && (company as any).short_video_url ? (
          <>
            <video
              src={(company as any).short_video_url}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-0.5 right-0.5 bg-takumi-gold rounded text-white text-[8px] px-0.5 font-bold leading-tight">
              ▶
            </span>
          </>
        ) : company.logo_url ? (
          <Image
            src={company.logo_url}
            alt={company.name}
            width={64}
            height={64}
            className="object-contain w-full h-full"
          />
        ) : (
          <span className="text-2xl font-bold text-gray-300">
            {company.name.charAt(0)}
          </span>
        )}
      </div>

      {/* 本文 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <h2 className="font-bold text-takumi-black group-hover:text-takumi-gold transition-colors truncate">
                {company.name}
              </h2>
              {badges.map((badge) => (
                <span
                  key={badge.label}
                  className={cn('text-xs px-1.5 py-0.5 rounded font-medium shrink-0', badge.className)}
                >
                  {badge.label}
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-500 mb-1">
              {company.prefecture}{company.city ? ` ${company.city}` : ''} ／ {company.category}
            </p>
          </div>

          {/* 体験するボタン（KIZUKU・both） */}
          {showKizukuBtn && (
            <button
              onClick={(e) => { e.preventDefault(); window.location.href = '/kizuku' }}
              className="shrink-0 text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-full font-medium transition-colors whitespace-nowrap"
            >
              体験する →
            </button>
          )}
        </div>

        {/* 説明文 */}
        {company.description && (
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {company.description}
          </p>
        )}

        {/* タグ */}
        {company.tags && company.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {company.tags.slice(0, 4).map((tag) => (
              <span
                key={tag.id}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 従業員数・設立年 */}
      <div className="hidden sm:flex flex-col items-end justify-center shrink-0 text-right text-xs text-gray-400 gap-1 min-w-[4rem]">
        {company.employees && (
          <span>{company.employees.toLocaleString()}名</span>
        )}
        {company.established && (
          <span>創業{company.established}年</span>
        )}
      </div>
    </Link>
  )
}
