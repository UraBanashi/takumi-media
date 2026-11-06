import AdminShell from '@/components/admin/AdminShell'
import CompanyForm from '@/components/admin/CompanyForm'
import Link from 'next/link'

export default function NewCompanyPage() {
  return (
    <AdminShell>
      <div className="p-8 max-w-3xl">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link href="/admin/dashboard/companies" className="hover:text-takumi-gold transition-colors">企業管理</Link>
          <span>/</span>
          <span className="text-takumi-black">新規追加</span>
        </div>
        <h1 className="text-2xl font-black text-takumi-black mb-8">企業を追加</h1>
        <CompanyForm />
      </div>
    </AdminShell>
  )
}
