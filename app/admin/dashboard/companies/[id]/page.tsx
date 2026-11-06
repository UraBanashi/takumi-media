import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminShell from '@/components/admin/AdminShell'
import CompanyForm from '@/components/admin/CompanyForm'
import Link from 'next/link'
import type { Company } from '@/types/database'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditCompanyPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('companies').select('*').eq('id', id).single()
  if (!data) notFound()

  return (
    <AdminShell>
      <div className="p-8 max-w-3xl">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link href="/admin/dashboard/companies" className="hover:text-takumi-gold transition-colors">企業管理</Link>
          <span>/</span>
          <span className="text-takumi-black">{data.name}</span>
        </div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-black text-takumi-black">企業を編集</h1>
          <Link href={`/companies/${data.slug}`} target="_blank"
            className="text-xs text-takumi-gold hover:underline flex items-center gap-1">
            公開ページを見る ↗
          </Link>
        </div>
        <CompanyForm company={data as Company} />
      </div>
    </AdminShell>
  )
}
