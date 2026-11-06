'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Company, CompanyCategory, PlanType } from '@/types/database'

const CATEGORIES: CompanyCategory[] = [
  '土木工事',
  '建築工事',
  '大工工事',
  '左官工事',
  'とび・土工・コンクリート工事',
  '石工事',
  '屋根工事',
  '電気工事',
  '管工事',
  'タイル・れんが・ブロック工事',
  '鋼構造物工事',
  '鉄筋工事',
  '舗装工事',
  'しゅんせつ工事',
  '板金工事',
  'ガラス工事',
  '塗装工事',
  '防水工事',
  '内装仕上工事',
  '機械器具設置工事',
  '熱絶縁工事',
  '電気通信工事',
  '造園工事',
  'さく井工事',
  '建具工事',
  '水道施設工事',
  '消防施設工事',
  '清掃施設工事',
  '解体工事',
]

type FormData = {
  slug: string
  name: string
  name_kana: string
  description: string
  prefecture: string
  city: string
  address: string
  phone: string
  website_url: string
  established: string
  employees: string
  category: CompanyCategory
  plan_type: PlanType
  rank_score: string
  is_published: boolean
  short_video_url: string
}

interface Props {
  company?: Company
}

function toFormData(company?: Company): FormData {
  return {
    slug:        company?.slug        ?? '',
    name:        company?.name        ?? '',
    name_kana:   company?.name_kana   ?? '',
    description: company?.description ?? '',
    prefecture:  company?.prefecture  ?? '',
    city:        company?.city        ?? '',
    address:     company?.address     ?? '',
    phone:       company?.phone       ?? '',
    website_url: company?.website_url ?? '',
    established: company?.established?.toString() ?? '',
    employees:   company?.employees?.toString()   ?? '',
    category:    company?.category    ?? '建築工事',
    plan_type:   company?.plan_type   ?? 'free',
    rank_score:      company?.rank_score?.toString() ?? '0',
    is_published:    company?.is_published ?? false,
    short_video_url: company?.short_video_url ?? '',
  }
}

export default function CompanyForm({ company }: Props) {
  const router = useRouter()
  const isEdit = !!company
  const [form, setForm] = useState<FormData>(toFormData(company))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function set(key: keyof FormData, value: string | boolean) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const payload = {
      slug:        form.slug.trim(),
      name:        form.name.trim(),
      name_kana:   form.name_kana.trim() || null,
      description: form.description.trim() || null,
      prefecture:  form.prefecture.trim(),
      city:        form.city.trim() || null,
      address:     form.address.trim() || null,
      phone:       form.phone.trim() || null,
      website_url: form.website_url.trim() || null,
      established: form.established ? Number(form.established) : null,
      employees:   form.employees   ? Number(form.employees)   : null,
      category:        form.category,
      plan_type:       form.plan_type,
      rank_score:      Number(form.rank_score),
      short_video_url: form.short_video_url.trim() || null,
      is_published: form.is_published,
    }

    const supabase = createClient()

    if (isEdit) {
      const { error } = await supabase.from('companies').update(payload).eq('id', company.id)
      if (error) { setError(error.message); setLoading(false); return }
    } else {
      const { error } = await supabase.from('companies').insert(payload)
      if (error) { setError(error.message); setLoading(false); return }
    }

    router.push('/admin/dashboard/companies')
    router.refresh()
  }

  async function handleDelete() {
    if (!company || !confirm(`「${company.name}」を削除しますか？この操作は取り消せません。`)) return
    const supabase = createClient()
    await supabase.from('companies').delete().eq('id', company.id)
    router.push('/admin/dashboard/companies')
    router.refresh()
  }

  const inputClass = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-takumi-gold/40 focus:border-takumi-gold'
  const labelClass = 'block text-xs font-medium text-gray-600 mb-1'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-700 text-sm">{error}</div>
      )}

      {/* 基本情報 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="font-bold text-sm text-gray-700 mb-4 pb-2 border-b border-gray-100">基本情報</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>企業名 *</label>
            <input type="text" value={form.name} onChange={(e) => set('name', e.target.value)}
              required className={inputClass} placeholder="匠建設株式会社" />
          </div>
          <div>
            <label className={labelClass}>企業名（かな）</label>
            <input type="text" value={form.name_kana} onChange={(e) => set('name_kana', e.target.value)}
              className={inputClass} placeholder="タクミケンセツ" />
          </div>
          <div>
            <label className={labelClass}>スラッグ（URL用） *</label>
            <input type="text" value={form.slug} onChange={(e) => set('slug', e.target.value)}
              required className={inputClass} placeholder="takumi-kensetsu" pattern="[a-z0-9\-]+" />
            <p className="text-xs text-gray-400 mt-1">英小文字・数字・ハイフンのみ</p>
          </div>
          <div>
            <label className={labelClass}>業種 *</label>
            <select value={form.category} onChange={(e) => set('category', e.target.value)}
              className={inputClass}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>企業説明</label>
            <textarea value={form.description} onChange={(e) => set('description', e.target.value)}
              rows={3} className={inputClass} placeholder="企業の特徴・強みを入力してください" />
          </div>

          {/* ショート動画（匠認定のみ表示） */}
          {(form.plan_type === 'sns' || form.plan_type === 'both') && (
            <div className="sm:col-span-2">
              <label className={labelClass}>
                ショート動画URL
                <span className="ml-2 text-takumi-gold font-normal">※ 匠認定プランのみ</span>
              </label>
              <input
                type="url"
                value={form.short_video_url}
                onChange={(e) => set('short_video_url', e.target.value)}
                className={inputClass}
                placeholder="https://... （Supabase StorageのMP4ファイルURL）"
              />
              <p className="text-xs text-gray-400 mt-1">
                企業カードのロゴ欄に代わって自動再生されます（MP4推奨・15秒以内）
              </p>
              {form.short_video_url && (
                <video
                  src={form.short_video_url}
                  controls
                  muted
                  className="mt-2 h-24 rounded-lg border border-gray-200"
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* 所在地・連絡先 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="font-bold text-sm text-gray-700 mb-4 pb-2 border-b border-gray-100">所在地・連絡先</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>都道府県 *</label>
            <input type="text" value={form.prefecture} onChange={(e) => set('prefecture', e.target.value)}
              required className={inputClass} placeholder="東京都" />
          </div>
          <div>
            <label className={labelClass}>市区町村</label>
            <input type="text" value={form.city} onChange={(e) => set('city', e.target.value)}
              className={inputClass} placeholder="新宿区" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>住所</label>
            <input type="text" value={form.address} onChange={(e) => set('address', e.target.value)}
              className={inputClass} placeholder="東京都新宿区西新宿1-1-1" />
          </div>
          <div>
            <label className={labelClass}>電話番号</label>
            <input type="text" value={form.phone} onChange={(e) => set('phone', e.target.value)}
              className={inputClass} placeholder="03-1234-5678" />
          </div>
          <div>
            <label className={labelClass}>公式サイトURL</label>
            <input type="url" value={form.website_url} onChange={(e) => set('website_url', e.target.value)}
              className={inputClass} placeholder="https://example.com" />
          </div>
        </div>
      </div>

      {/* 会社情報 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="font-bold text-sm text-gray-700 mb-4 pb-2 border-b border-gray-100">会社情報</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className={labelClass}>設立年</label>
            <input type="number" value={form.established} onChange={(e) => set('established', e.target.value)}
              className={inputClass} placeholder="1990" min="1800" max="2030" />
          </div>
          <div>
            <label className={labelClass}>従業員数</label>
            <input type="number" value={form.employees} onChange={(e) => set('employees', e.target.value)}
              className={inputClass} placeholder="50" min="1" />
          </div>
        </div>
      </div>

      {/* 掲載設定 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="font-bold text-sm text-gray-700 mb-4 pb-2 border-b border-gray-100">掲載設定</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>プラン</label>
            <select value={form.plan_type} onChange={(e) => set('plan_type', e.target.value)}
              className={inputClass}>
              <option value="free">無料掲載</option>
              <option value="kizuku">KIZUKU</option>
              <option value="sns">匠認定</option>
              <option value="both">匠認定＋KIZUKU</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>ランキングスコア</label>
            <input type="number" value={form.rank_score} onChange={(e) => set('rank_score', e.target.value)}
              className={inputClass} min="0" max="9999" />
            <p className="text-xs text-gray-400 mt-1">数値が高いほど上位表示</p>
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <div
                onClick={() => set('is_published', !form.is_published)}
                className={`relative w-10 h-6 rounded-full transition-colors ${form.is_published ? 'bg-green-500' : 'bg-gray-300'}`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.is_published ? 'translate-x-5' : 'translate-x-1'}`} />
              </div>
              <span className="text-sm font-medium text-gray-700">
                {form.is_published ? '公開中' : '非公開'}
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* ボタン */}
      <div className="flex items-center justify-between">
        <div>
          {isEdit && (
            <button type="button" onClick={handleDelete}
              className="text-sm text-red-500 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors">
              削除する
            </button>
          )}
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => router.back()}
            className="px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            キャンセル
          </button>
          <button type="submit" disabled={loading}
            className="px-6 py-2.5 bg-takumi-gold hover:bg-takumi-gold-dark text-white font-bold text-sm rounded-lg transition-colors disabled:opacity-50">
            {loading ? '保存中...' : (isEdit ? '更新する' : '登録する')}
          </button>
        </div>
      </div>
    </form>
  )
}
