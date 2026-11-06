import Image from 'next/image'
import { getPrograms } from '@/lib/queries/videos'
import { getYoutubeThumbnail } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: '建設業番組' }
export const revalidate = 60

function formatDuration(sec: number) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export default async function ProgramsPage() {
  const programs = await getPrograms(20)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ページヘッダー */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-1 h-8 bg-takumi-gold rounded-full inline-block" />
          <h1 className="text-2xl font-black text-takumi-black">建設業番組</h1>
        </div>
        <p className="text-gray-500 text-sm ml-4">
          職人の仕事・現場の技・建設業の魅力を深掘りする動画シリーズ
        </p>
      </div>

      {programs.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p>番組は準備中です</p>
        </div>
      ) : (
        <>
          {/* 最新話フィーチャー */}
          <div className="mb-10">
            <a
              href={`https://www.youtube.com/watch?v=${programs[0].youtube_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-takumi-black rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow"
            >
              <div className="grid md:grid-cols-2">
                <div className="relative aspect-video md:aspect-auto">
                  <Image
                    src={getYoutubeThumbnail(programs[0].youtube_id)}
                    alt={programs[0].title}
                    fill
                    className="object-cover group-hover:opacity-80 transition-opacity"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-takumi-gold/90 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                  <span className="absolute top-3 left-3 bg-takumi-gold text-white text-xs font-bold px-2 py-1 rounded">
                    最新話
                  </span>
                </div>
                <div className="p-6 flex flex-col justify-center text-white">
                  <p className="text-takumi-gold text-xs font-bold tracking-widest mb-2">LATEST EPISODE</p>
                  <h2 className="text-xl font-black mb-3 group-hover:text-takumi-gold transition-colors">
                    {programs[0].title}
                  </h2>
                  {programs[0].description && (
                    <p className="text-white/60 text-sm leading-relaxed line-clamp-3">
                      {programs[0].description}
                    </p>
                  )}
                  {programs[0].duration_sec && (
                    <p className="text-white/40 text-xs mt-4">
                      再生時間 {formatDuration(programs[0].duration_sec)}
                    </p>
                  )}
                </div>
              </div>
            </a>
          </div>

          {/* 過去動画一覧 */}
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-takumi-gold rounded-full inline-block" />
            過去の番組
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {programs.slice(1).map((program) => (
              <a
                key={program.id}
                href={`https://www.youtube.com/watch?v=${program.youtube_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-video bg-takumi-black">
                  <Image
                    src={getYoutubeThumbnail(program.youtube_id)}
                    alt={program.title}
                    fill
                    className="object-cover group-hover:opacity-80 transition-opacity"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-takumi-gold/90 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                  {program.duration_sec && (
                    <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                      {formatDuration(program.duration_sec)}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm text-takumi-black group-hover:text-takumi-gold transition-colors line-clamp-2">
                    {program.title}
                  </h3>
                  {program.description && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{program.description}</p>
                  )}
                </div>
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
