export type PlanType = 'both' | 'sns' | 'kizuku' | 'free'
export type CompanyCategory =
  | '土木工事'
  | '建築工事'
  | '大工工事'
  | '左官工事'
  | 'とび・土工・コンクリート工事'
  | '石工事'
  | '屋根工事'
  | '電気工事'
  | '管工事'
  | 'タイル・れんが・ブロック工事'
  | '鋼構造物工事'
  | '鉄筋工事'
  | '舗装工事'
  | 'しゅんせつ工事'
  | '板金工事'
  | 'ガラス工事'
  | '塗装工事'
  | '防水工事'
  | '内装仕上工事'
  | '機械器具設置工事'
  | '熱絶縁工事'
  | '電気通信工事'
  | '造園工事'
  | 'さく井工事'
  | '建具工事'
  | '水道施設工事'
  | '消防施設工事'
  | '清掃施設工事'
  | '解体工事'

export interface Company {
  id: string
  slug: string
  name: string
  name_kana: string | null
  description: string | null
  logo_url: string | null
  cover_url: string | null
  short_video_url: string | null
  prefecture: string
  city: string | null
  address: string | null
  phone: string | null
  website_url: string | null
  established: number | null
  employees: number | null
  category: CompanyCategory
  plan_type: PlanType
  rank_score: number
  is_published: boolean
  created_at: string
  updated_at: string
  // JOINで付加されるフィールド
  tags?: Tag[]
  pr_videos?: PrVideo[]
  craftsmen?: Craftsman[]
  kizuku_entries?: KizukuEntry[]
}

export interface Tag {
  id: string
  name: string
}

export interface Program {
  id: string
  title: string
  description: string | null
  youtube_id: string
  thumbnail_url: string | null
  duration_sec: number | null
  published_at: string | null
  is_published: boolean
  created_at: string
}

export interface PrVideo {
  id: string
  company_id: string
  title: string
  youtube_id: string
  thumbnail_url: string | null
  sort_order: number
  created_at: string
}

export interface Craftsman {
  id: string
  company_id: string | null
  name: string
  name_kana: string | null
  specialty: string
  experience: number | null
  photo_url: string | null
  bio: string | null
  is_published: boolean
  created_at: string
}

export interface KizukuEntry {
  id: string
  company_id: string
  title: string
  description: string | null
  capacity: number | null
  schedule: string | null
  prefecture: string | null
  is_active: boolean
  created_at: string
}

// クエリ用のフィルター型
export interface CompanyFilters {
  prefecture?: string
  city?: string
  category?: CompanyCategory
  plan_type?: PlanType
  keyword?: string
  page?: number
  limit?: number
}
