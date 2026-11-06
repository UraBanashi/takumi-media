import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { Company } from '@/types/database'

interface Props {
  companies: Company[]
}

const rankColors = [
  'text-yellow-500',  // 1位
  'text-gray-400',    // 2位
  'text-amber-600',   // 3位
]

export default function CompanyRanking({ companies }: Props) {
  return (
    <div className="bg-takumi-black rounded-xl p-5 text-white">
      <h2 className="text-takumi-gold font-bold text-sm tracking-widest mb-4 flex items-center gap-2">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        ランキング
      </h2>
      <ol className="space-y-3">
        {companies.map((company, i) => (
          <li key={company.id}>
            <Link
              href={`/companies/${company.slug}`}
              className="flex items-center gap-3 group hover:bg-white/5 rounded-lg p-1.5 -mx-1.5 transition-colors"
            >
              <span className={cn('font-black text-lg w-6 text-center shrink-0', rankColors[i] ?? 'text-white/50')}>
                {i + 1}
              </span>
              <div className="w-8 h-8 rounded-md bg-white/10 overflow-hidden shrink-0 flex items-center justify-center">
                {company.logo_url ? (
                  <Image src={company.logo_url} alt={company.name} width={32} height={32} className="object-contain" />
                ) : (
                  <span className="text-sm font-bold text-white/40">{company.name.charAt(0)}</span>
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white group-hover:text-takumi-gold transition-colors truncate">
                  {company.name}
                </p>
                <p className="text-xs text-white/40 truncate">{company.prefecture} / {company.category}</p>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}
