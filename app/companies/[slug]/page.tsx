import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getCompanyBySlug } from '@/lib/queries/companies'
import { cn, getYoutubeThumbnail } from '@/lib/utils'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const company = await getCompanyBySlug(slug)
  if (!company) return {}
  return {
    title: company.name,
    description: company.description ?? undefined,
  }
}

export const revalidate = 60

const planBorder: Record<string, string> = {
  sns:    'border-l-4 border-l-takumi-gold',
  kizuku: 'border-l-4 border-l-green-500',
  free:   '',
}

export default async function CompanyDetailPage({ params }: Props) {
  const { slug } = await params
  const company = await getCompanyBySlug(slug)
  if (!company) notFound()

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* パンくず */}
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-1">
        <Link href="/" className="hover:text-takumi-gold transition-colors">企業一覧</Link>
        <span>/</span>
        <span className="text-takumi-black">{company.name}</span>
      </nav>

      {/* 企業ヘッダー */}
      <div className={cn('bg-white rounded-xl shadow-sm p-6 mb-6', planBorder[company.plan_type])}>
        <div className="flex items-start gap-5">
          <div className="w-20 h-20 rounded-xl bg-gray-100 overflow-hidden shrink-0 flex items-center justify-center relative">
            {(company.plan_type === 'sns' || company.plan_type === 'both') && company.short_video_url ? (
              <>
                <video
                  src={company.short_video_url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0.5 right-0.5 bg-takumi-gold rounded text-white text-[8px] px-0.5 font-bold leading-tight">▶</span>
              </>
            ) : company.logo_url ? (
              <Image src={company.logo_url} alt={company.name} width={80} height={80} className="object-contain" />
            ) : (
              <span className="text-3xl font-black text-gray-200">{company.name.charAt(0)}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h1 className="text-2xl font-black text-takumi-black">{company.name}</h1>
              {(company.plan_type === 'sns' || company.plan_type === 'both') && (
                <span className="text-xs bg-takumi-gold/10 text-takumi-gold border border-takumi-gold/30 px-2 py-0.5 rounded font-medium">匠認定</span>
              )}
              {(company.plan_type === 'kizuku' || company.plan_type === 'both') && (
                <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded font-medium">KIZUKU</span>
              )}
            </div>
            <p className="text-gray-500 text-sm mb-3">
              {company.prefecture}{company.city} ／ {company.category}
            </p>
            <div className="flex flex-wrap gap-2 items-center">
              {company.tags?.map((tag) => (
                <span key={tag.id} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                  {tag.name}
                </span>
              ))}
              {company.website_url && (
                <a href={company.website_url} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-takumi-gold hover:underline flex items-center gap-1">
                  公式サイト ↗
                </a>
              )}
            </div>
          </div>
          {(company.plan_type === 'kizuku' || company.plan_type === 'both') && (
            <Link href="/kizuku"
              className="shrink-0 bg-green-600 hover:bg-green-700 text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors">
              体験する →
            </Link>
          )}
        </div>

        {company.description && (
          <p className="mt-4 text-gray-600 leading-relaxed text-sm border-t border-gray-100 pt-4">
            {company.description}
          </p>
        )}

        {/* 会社情報グリッド */}
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-100 text-sm">
          {company.established && (
            <div>
              <dt className="text-xs text-gray-400 mb-0.5">設立年</dt>
              <dd className="font-medium">{company.established}年</dd>
            </div>
          )}
          {company.employees && (
            <div>
              <dt className="text-xs text-gray-400 mb-0.5">従業員数</dt>
              <dd className="font-medium">{company.employees.toLocaleString()}名</dd>
            </div>
          )}
          {company.phone && (
            <div>
              <dt className="text-xs text-gray-400 mb-0.5">電話番号</dt>
              <dd className="font-medium">{company.phone}</dd>
            </div>
          )}
          {company.address && (
            <div>
              <dt className="text-xs text-gray-400 mb-0.5">住所</dt>
              <dd className="font-medium text-xs">{company.address}</dd>
            </div>
          )}
        </dl>
      </div>

      {/* PR動画 */}
      {company.pr_videos && company.pr_videos.length > 0 && (
        <section className="mb-6">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-takumi-gold rounded-full inline-block" />
            PR動画
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {company.pr_videos.map((video) => (
              <a
                key={video.id}
                href={`https://www.youtube.com/watch?v=${video.youtube_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl overflow-hidden bg-takumi-black shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-video">
                  <Image
                    src={getYoutubeThumbnail(video.youtube_id)}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:opacity-80 transition-opacity"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-takumi-gold/90 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="text-white text-sm font-medium px-3 py-2 truncate">{video.title}</p>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* 職人 */}
      {company.craftsmen && company.craftsmen.length > 0 && (
        <section className="mb-6">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-takumi-gold rounded-full inline-block" />
            在籍職人
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {company.craftsmen.filter(c => c.is_published).map((craftsman) => (
              <Link key={craftsman.id} href={`/craftsmen#${craftsman.id}`}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto mb-2 overflow-hidden flex items-center justify-center">
                  {craftsman.photo_url ? (
                    <Image src={craftsman.photo_url} alt={craftsman.name} width={64} height={64} className="object-cover" />
                  ) : (
                    <span className="text-2xl font-bold text-gray-300">{craftsman.name.charAt(0)}</span>
                  )}
                </div>
                <p className="font-bold text-sm">{craftsman.name}</p>
                <p className="text-xs text-gray-500">{craftsman.specialty}</p>
                {craftsman.experience && (
                  <p className="text-xs text-takumi-gold mt-1">経験{craftsman.experience}年</p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* KIZUKU体験プログラム */}
      {company.kizuku_entries && company.kizuku_entries.length > 0 && (
        <section>
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-green-500 rounded-full inline-block" />
            体験プログラム
          </h2>
          <div className="space-y-3">
            {company.kizuku_entries.filter(e => e.is_active).map((entry) => (
              <div key={entry.id} className="bg-green-50 border border-green-200 rounded-xl p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-green-800 mb-1">{entry.title}</h3>
                    {entry.description && <p className="text-sm text-green-700">{entry.description}</p>}
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-green-600">
                      {entry.schedule && <span>📅 {entry.schedule}</span>}
                      {entry.capacity && <span>👥 定員{entry.capacity}名</span>}
                      {entry.prefecture && <span>📍 {entry.prefecture}</span>}
                    </div>
                  </div>
                  <Link href="/kizuku"
                    className="shrink-0 bg-green-600 hover:bg-green-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
                    申し込む
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
