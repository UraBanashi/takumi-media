import Image from 'next/image'
import Link from 'next/link'
import { getAllPrVideos } from '@/lib/queries/videos'
import { getYoutubeThumbnail } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'PR動画' }
export const revalidate = 60

export default async function PrVideosPage() {
  const videos = await getAllPrVideos()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ページヘッダー */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-1 h-8 bg-takumi-gold rounded-full inline-block" />
          <h1 className="text-2xl font-black text-takumi-black">PR動画</h1>
        </div>
        <p className="text-gray-500 text-sm ml-4">
          掲載企業の会社紹介・採用PR動画をまとめて視聴できます
        </p>
      </div>

      {videos.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p>PR動画は準備中です</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {/* サムネイル */}
              <a
                href={`https://www.youtube.com/watch?v=${video.youtube_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative aspect-video bg-takumi-black"
              >
                <Image
                  src={getYoutubeThumbnail(video.youtube_id)}
                  alt={video.title}
                  fill
                  className="object-cover group-hover:opacity-75 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-takumi-gold/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                    <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>
              </a>

              {/* 情報 */}
              <div className="p-4">
                <p className="font-bold text-sm text-takumi-black line-clamp-2 mb-2">
                  {video.title}
                </p>
                <Link
                  href={`/companies/${video.company_slug}`}
                  className="inline-flex items-center gap-1 text-xs text-takumi-gold hover:underline"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
                  </svg>
                  {video.company_name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 掲載促進バナー */}
      <div className="mt-12 bg-takumi-black rounded-2xl p-8 text-center text-white">
        <p className="text-takumi-gold font-bold text-xs tracking-widest mb-2">PR動画掲載</p>
        <h2 className="text-xl font-black mb-3">会社紹介・採用動画を掲載しませんか？</h2>
        <p className="text-white/60 text-sm mb-6">
          SNS運用プラン・KIZUKUプランでPR動画を掲載できます。
        </p>
        <Link
          href="/contact"
          className="inline-block bg-takumi-gold hover:bg-takumi-gold-dark text-white font-bold px-8 py-3 rounded-full transition-colors"
        >
          お問い合わせ
        </Link>
      </div>
    </div>
  )
}
