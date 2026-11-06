import { createClient } from '@/lib/supabase/server'
import AdminShell from '@/components/admin/AdminShell'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const planLabel: Record<string, { label: string; className: string }> = {
  both:   { label: '匠認定＋KIZUKU', className: 'bg-takumi-gold/10 text-takumi-gold border border-takumi-gold/30' },
  sns:    { label: '匠認定',          className: 'bg-takumi-gold/10 text-takumi-gold border border-takumi-gold/30' },
  kizuku: { label: 'KIZUKU',          className: 'bg-green-50 text-green-700 border border-green-200' },
  free:   { label: '無料',            className: 'bg-gray-100 text-gray-500 border border-gray-200' },
}

export default async function AdminCompaniesPage() {
  const supabase = await createClient()
  const { data: companies } = await supabase
    .from('companies')
    .select('id, slug, name, prefecture, category, plan_type, rank_score, is_published, created_at')
    .order('created_at', { ascending: false })

  return (
    <AdminShell>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-takumi-black">企業管理</h1>
            <p className="text-gray-500 text-sm mt-1">{companies?.length ?? 0} 社登録済み</p>
          </div>
          <Link href="/admin/dashboard/companies/new"
            className="flex items-center gap-2 bg-takumi-gold hover:bg-takumi-gold-dark text-white font-bold px-5 py-2.5 rounded-lg transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            企業を追加
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 font-medium text-gray-500">企業名</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 hidden sm:table-cell">都道府県</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 hidden md:table-cell">業種</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">プラン</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 hidden lg:table-cell">スコア</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">公開</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {(companies ?? []).map((company) => {
                const plan = planLabel[company.plan_type]
                return (
                  <tr key={company.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-takumi-black">{company.name}</p>
                      <p className="text-xs text-gray-400">{company.slug}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">{company.prefecture}</td>
                    <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{company.category}</td>
                    <td className="px-4 py-3">
                      <span className={cn('text-xs px-2 py-0.5 rounded font-medium', plan.className)}>
                        {plan.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 hidden lg:table-cell">{company.rank_score}</td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        'inline-flex items-center gap-1 text-xs font-medium',
                        company.is_published ? 'text-green-600' : 'text-gray-400'
                      )}>
                        <span className={cn('w-1.5 h-1.5 rounded-full', company.is_published ? 'bg-green-500' : 'bg-gray-300')} />
                        {company.is_published ? '公開' : '非公開'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/admin/dashboard/companies/${company.id}`}
                        className="text-xs text-takumi-gold hover:underline font-medium">
                        編集
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  )
}
