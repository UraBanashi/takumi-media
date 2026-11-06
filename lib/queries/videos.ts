import type { Program, PrVideo } from '@/types/database'
import { dummyPrograms, dummyCompanies } from '@/lib/dummy-data'

function isSupabaseConfigured() {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://xxxxxxxxxxxxxxxxxxxx.supabase.co' &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

export async function getPrograms(limit = 20): Promise<Program[]> {
  if (!isSupabaseConfigured()) return dummyPrograms.slice(0, limit)

  const { createClient } = await import('@/lib/supabase/server')
  const supabase = await createClient()
  const { data } = await supabase
    .from('programs')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(limit)
  return (data ?? []) as Program[]
}

export async function getAllPrVideos(): Promise<(PrVideo & { company_name: string; company_slug: string })[]> {
  if (!isSupabaseConfigured()) {
    // ダミーのPR動画（companiesから生成）
    return dummyCompanies.slice(0, 3).map((c, i) => ({
      id: `v${i}`,
      company_id: c.id,
      title: `${c.name} 会社紹介動画`,
      youtube_id: 'dQw4w9WgXcQ',
      thumbnail_url: null,
      sort_order: i,
      created_at: new Date().toISOString(),
      company_name: c.name,
      company_slug: c.slug,
    }))
  }

  const { createClient } = await import('@/lib/supabase/server')
  const supabase = await createClient()
  const { data } = await supabase
    .from('pr_videos')
    .select('*, companies(name, slug, is_published)')
    .order('created_at', { ascending: false })
  return (data ?? [])
    .filter((v: any) => v.companies?.is_published)
    .map((v: any) => ({
      ...v,
      company_name: v.companies?.name ?? '',
      company_slug: v.companies?.slug ?? '',
    }))
}
