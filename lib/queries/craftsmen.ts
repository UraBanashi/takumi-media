import type { Craftsman } from '@/types/database'
import { dummyCraftsmen } from '@/lib/dummy-data'

function isSupabaseConfigured() {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://xxxxxxxxxxxxxxxxxxxx.supabase.co' &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

export async function getCraftsmen(): Promise<(Craftsman & { company_name?: string; company_slug?: string })[]> {
  if (!isSupabaseConfigured()) {
    const { dummyCompanies } = await import('@/lib/dummy-data')
    return dummyCraftsmen.map((c) => ({
      ...c,
      company_name: dummyCompanies.find((co) => co.id === c.company_id)?.name,
      company_slug: dummyCompanies.find((co) => co.id === c.company_id)?.slug,
    }))
  }

  const { createClient } = await import('@/lib/supabase/server')
  const supabase = await createClient()
  const { data } = await supabase
    .from('craftsmen')
    .select('*, companies(name, slug)')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
  return (data ?? []).map((c: any) => ({
    ...c,
    company_name: c.companies?.name,
    company_slug: c.companies?.slug,
  }))
}
