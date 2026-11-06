import { createClient } from '@/lib/supabase/server'
import AdminShell from '@/components/admin/AdminShell'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()

  const [
    { count: total },
    { count: sns },
    { count: kizuku },
    { count: free },
  ] = await Promise.all([
    supabase.from('companies').select('*', { count: 'exact', head: true }),
    supabase.from('companies').select('*', { count: 'exact', head: true }).eq('plan_type', 'sns'),
    supabase.from('companies').select('*', { count: 'exact', head: true }).eq('plan_type', 'kizuku'),
    supabase.from('companies').select('*', { count: 'exact', head: true }).eq('plan_type', 'free'),
  ])

  const stats = [
    { label: '全企業数',       value: total ?? 0, color: 'text-takumi-black' },
    { label: 'SNS運用',        value: sns ?? 0,   color: 'text-takumi-gold' },
    { label: 'KIZUKU',         value: kizuku ?? 0, color: 'text-green-600' },
    { label: '無料掲載',       value: free ?? 0,  color: 'text-gray-500' },
  ]

  return (
    <AdminShell>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-takumi-black">ダッシュボード</h1>
          <p className="text-gray-500 text-sm mt-1">匠 管理画面</p>
        </div>

        {/* 統計カード */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm">
              <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
              <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-gray-400 mt-1">社</p>
            </div>
          ))}
        </div>

        {/* クイックアクション */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/admin/dashboard/companies/new"
            className="bg-takumi-gold hover:bg-takumi-gold-dark text-white rounded-xl p-6 transition-colors group">
            <div className="flex items-center gap-3 mb-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="font-bold text-lg">企業を追加</span>
            </div>
            <p className="text-white/80 text-sm">新しい企業情報を登録します</p>
          </Link>

          <Link href="/admin/dashboard/companies"
            className="bg-white hover:bg-gray-50 text-takumi-black rounded-xl p-6 shadow-sm transition-colors group border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <svg className="w-6 h-6 text-takumi-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              <span className="font-bold text-lg">企業一覧を管理</span>
            </div>
            <p className="text-gray-500 text-sm">掲載企業の編集・公開設定</p>
          </Link>
        </div>
      </div>
    </AdminShell>
  )
}
