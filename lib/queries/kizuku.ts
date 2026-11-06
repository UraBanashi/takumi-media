import type { KizukuEntry } from '@/types/database'
import { dummyKizukuEntries, dummyCompanies } from '@/lib/dummy-data'

function isSupabaseConfigured() {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://xxxxxxxxxxxxxxxxxxxx.supabase.co' &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

export async function getKizukuEntries(): Promise<(KizukuEntry & { company_name: string; company_slug: string; company_plan: string })[]> {
  if (!isSupabaseConfigured()) {
    return dummyKizukuEntries.map((e) => {
      const company = dummyCompanies.find((c) => c.id === e.company_id)
      return {
        ...e,
        company_name: company?.name ?? '',
        company_slug: company?.slug ?? '',
        company_plan: company?.plan_type ?? 'free',
      }
    })
  }

  const { createClient } = await import('@/lib/supabase/server')
  const supabase = await createClient()
  const { data } = await supabase
    .from('kizuku_entries')
    .select('*, companies(name, slug, plan_type, is_published)')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
  return (data ?? [])
    .filter((e: any) => e.companies?.is_published)
    .map((e: any) => ({
      ...e,
      company_name: e.companies?.name ?? '',
      company_slug: e.companies?.slug ?? '',
      company_plan: e.companies?.plan_type ?? 'free',
    }))
}
