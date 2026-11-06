import type { Company, CompanyFilters, CompanyCategory, PlanType } from '@/types/database'
import { dummyCompanies, dummyPrefectures } from '@/lib/dummy-data'

const PAGE_SIZE = 20

// Supabaseが設定済みかどうか
function isSupabaseConfigured() {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://xxxxxxxxxxxxxxxxxxxx.supabase.co' &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

// 企業一覧
export async function getCompanies(filters: CompanyFilters = {}): Promise<{
  companies: Company[]
  total: number
}> {
  if (!isSupabaseConfigured()) {
    return getCompaniesDummy(filters)
  }

  const { createClient } = await import('@/lib/supabase/server')
  const supabase = await createClient()
  const { prefecture, city, category, plan_type, keyword, page = 1, limit = PAGE_SIZE } = filters

  let query = supabase
    .from('companies')
    .select('*, company_tags(tag_id, tags(id, name))', { count: 'exact' })
    .eq('is_published', true)
    .order('rank_score', { ascending: false })
    .range((page - 1) * limit, page * limit - 1)

  if (prefecture) query = query.eq('prefecture', prefecture)
  if (city)       query = query.ilike('city', `%${city}%`)
  if (category)   query = query.eq('category', category)
  // sns → sns＋both、kizuku → kizuku＋both を表示
  if (plan_type === 'sns')    query = query.in('plan_type', ['sns', 'both'])
  else if (plan_type === 'kizuku') query = query.in('plan_type', ['kizuku', 'both'])
  else if (plan_type)         query = query.eq('plan_type', plan_type)
  if (keyword)    query = query.or(`name.ilike.%${keyword}%,description.ilike.%${keyword}%`)

  const { data, error, count } = await query
  if (error) throw error

  // both > sns > kizuku > free、同一グループ内は契約順（created_at昇順）
  const planOrder: Record<string, number> = { both: 0, sns: 1, kizuku: 2, free: 3 }
  const companies = (data ?? [])
    .sort((a, b) => {
      const planDiff = planOrder[a.plan_type] - planOrder[b.plan_type]
      if (planDiff !== 0) return planDiff
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    })
    .map((c) => ({
      ...c,
      tags: c.company_tags?.map((ct: any) => ct.tags).filter(Boolean) ?? [],
    })) as Company[]

  return { companies, total: count ?? 0 }
}

// ダミーデータ版（Supabase未設定時）
function getCompaniesDummy(filters: CompanyFilters): { companies: Company[]; total: number } {
  const { prefecture, city, category, plan_type, keyword, page = 1, limit = PAGE_SIZE } = filters
  const planOrder: Record<string, number> = { both: 0, sns: 1, kizuku: 2, free: 3 }

  let result = [...dummyCompanies]
  if (prefecture) result = result.filter((c) => c.prefecture === prefecture)
  if (city)       result = result.filter((c) => c.city?.includes(city))
  if (category)   result = result.filter((c) => c.category === category)
  if (plan_type === 'sns')         result = result.filter((c) => c.plan_type === 'sns'    || c.plan_type === 'both')
  else if (plan_type === 'kizuku') result = result.filter((c) => c.plan_type === 'kizuku' || c.plan_type === 'both')
  else if (plan_type)              result = result.filter((c) => c.plan_type === plan_type)
  if (keyword)    result = result.filter((c) =>
    c.name.includes(keyword) || c.description?.includes(keyword)
  )

  result.sort((a, b) => {
    const planDiff = planOrder[a.plan_type] - planOrder[b.plan_type]
    if (planDiff !== 0) return planDiff
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  })

  const total = result.length
  const companies = result.slice((page - 1) * limit, page * limit)
  return { companies, total }
}

// 企業詳細
export async function getCompanyBySlug(slug: string): Promise<Company | null> {
  if (!isSupabaseConfigured()) {
    return dummyCompanies.find((c) => c.slug === slug) ?? null
  }

  const { createClient } = await import('@/lib/supabase/server')
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('companies')
    .select('*, company_tags(tag_id, tags(id, name)), pr_videos(*), craftsmen(*), kizuku_entries(*)')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error) return null

  return {
    ...data,
    tags: data.company_tags?.map((ct: any) => ct.tags).filter(Boolean) ?? [],
  } as Company
}

// ランキング上位
export async function getTopRankedCompanies(limit = 5): Promise<Company[]> {
  if (!isSupabaseConfigured()) {
    return [...dummyCompanies]
      .sort((a, b) => b.rank_score - a.rank_score)
      .slice(0, limit)
  }

  const { createClient } = await import('@/lib/supabase/server')
  const supabase = await createClient()

  const { data } = await supabase
    .from('companies')
    .select('id, slug, name, logo_url, prefecture, category, plan_type, rank_score')
    .eq('is_published', true)
    .order('rank_score', { ascending: false })
    .limit(limit)

  return (data ?? []) as Company[]
}

// 都道府県一覧
export async function getPrefectures(): Promise<string[]> {
  if (!isSupabaseConfigured()) {
    return dummyPrefectures
  }

  const { createClient } = await import('@/lib/supabase/server')
  const supabase = await createClient()

  const { data } = await supabase
    .from('companies')
    .select('prefecture')
    .eq('is_published', true)

  return Array.from(new Set((data ?? []).map((d) => d.prefecture))).sort()
}
