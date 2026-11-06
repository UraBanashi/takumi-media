import type { Company, Program, Craftsman, KizukuEntry } from '@/types/database'

export const dummyCompanies: Company[] = [
  {
    id: '1',
    slug: 'takumi-kensetsu',
    name: '匠建設株式会社',
    name_kana: 'タクミケンセツ',
    description: '創業50年の信頼と実績。地域のインフラを支え続ける総合建設会社です。官公庁工事から民間工事まで幅広く対応しています。',
    logo_url: null,
    cover_url: null,
    short_video_url: null,
    prefecture: '東京都',
    city: '新宿区',
    address: '東京都新宿区西新宿1-1-1',
    phone: '03-1234-5678',
    website_url: 'https://example.com',
    established: 1974,
    employees: 280,
    category: '建築工事',
    plan_type: 'sns',
    rank_score: 100,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tags: [{ id: 't1', name: '官公庁実績' }, { id: 't2', name: 'ISO認証' }, { id: 't3', name: '若手育成' }],
  },
  {
    id: '2',
    slug: 'kizuku-doboku',
    name: 'KIZUKU土木工業',
    name_kana: 'キズクドボクコウギョウ',
    description: '体験型採用で若手職人を育成。建設業の魅力を次世代へ伝える活動を積極的に行っています。',
    logo_url: null, cover_url: null, short_video_url: null,
    prefecture: '大阪府', city: '大阪市', address: null, phone: '06-9876-5432', website_url: null,
    established: 1998, employees: 95, category: '土木工事', plan_type: 'kizuku', rank_score: 80,
    is_published: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    tags: [{ id: 't4', name: '女性活躍' }, { id: 't5', name: 'DX推進' }],
  },
  {
    id: '3',
    slug: 'mirai-setsubi',
    name: '未来設備工業株式会社',
    name_kana: 'ミライセツビコウギョウ',
    description: '電気・空調・衛生設備のプロフェッショナル集団。最新技術で快適な環境を創造します。',
    logo_url: null, cover_url: null, short_video_url: null,
    prefecture: '愛知県', city: '名古屋市', address: null, phone: null, website_url: null,
    established: 2005, employees: 42, category: '管工事', plan_type: 'free', rank_score: 20,
    is_published: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    tags: [{ id: 't6', name: '地域密着' }],
  },
  {
    id: '4', slug: 'hokuei-kensetsu', name: '北栄建設株式会社', name_kana: 'ホクエイケンセツ',
    description: '北海道を拠点に道路・橋梁工事を手がける総合建設会社。厳しい寒冷地工事に強みを持ちます。',
    logo_url: null, cover_url: null, short_video_url: null, prefecture: '北海道', city: '札幌市', address: null, phone: null, website_url: null,
    established: 1962, employees: 150, category: '土木工事', plan_type: 'free', rank_score: 30,
    is_published: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), tags: [],
  },
  {
    id: '5', slug: 'kyushu-reform', name: '九州リフォーム工房', name_kana: 'キュウシュウリフォームコウボウ',
    description: 'リフォーム・リノベーション専門。住まいの悩みをワンストップで解決します。',
    logo_url: null, cover_url: null, short_video_url: null, prefecture: '福岡県', city: '福岡市', address: null, phone: null, website_url: null,
    established: 2010, employees: 28, category: '内装仕上工事', plan_type: 'kizuku', rank_score: 60,
    is_published: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    tags: [{ id: 't7', name: '地域密着' }],
  },
]

export const dummyPrefectures = ['東京都', '大阪府', '愛知県', '北海道', '福岡県']

export const dummyPrograms: Program[] = [
  {
    id: 'p1', title: '匠の技 #01 ─ 型枠大工の一日',
    description: '型枠大工の朝から夕方まで密着。コンクリートを支える職人技と段取りの美学に迫る30分。',
    youtube_id: 'dQw4w9WgXcQ', thumbnail_url: null, duration_sec: 1820,
    published_at: '2024-05-01T09:00:00Z', is_published: true, created_at: new Date().toISOString(),
  },
  {
    id: 'p2', title: '匠の技 #02 ─ 鉄筋工の世界',
    description: '鉄筋を組み上げる緻密な作業。強度計算から施工まで全工程を追う。',
    youtube_id: 'dQw4w9WgXcQ', thumbnail_url: null, duration_sec: 2100,
    published_at: '2024-05-15T09:00:00Z', is_published: true, created_at: new Date().toISOString(),
  },
  {
    id: 'p3', title: '匠の技 #03 ─ 左官職人の美',
    description: 'モルタル・漆喰を手で塗り上げる左官職人の技。現代建築に息づく伝統工法を紹介。',
    youtube_id: 'dQw4w9WgXcQ', thumbnail_url: null, duration_sec: 1680,
    published_at: '2024-06-01T09:00:00Z', is_published: true, created_at: new Date().toISOString(),
  },
  {
    id: 'p4', title: '匠の技 #04 ─ 高所作業の職人',
    description: '足場鳶・とび職が語る高所での仕事の魅力と安全管理の徹底。',
    youtube_id: 'dQw4w9WgXcQ', thumbnail_url: null, duration_sec: 1950,
    published_at: '2024-06-15T09:00:00Z', is_published: true, created_at: new Date().toISOString(),
  },
]

export const dummyCraftsmen: Craftsman[] = [
  {
    id: 'c1', company_id: '1', name: '田中 誠一', name_kana: 'タナカ セイイチ',
    specialty: '型枠大工', experience: 28, photo_url: null,
    bio: '大工一筋28年。難しい曲面型枠も得意とし、後進の育成にも力を入れる。',
    is_published: true, created_at: new Date().toISOString(),
  },
  {
    id: 'c2', company_id: '1', name: '佐藤 美咲', name_kana: 'サトウ ミサキ',
    specialty: '施工管理', experience: 12, photo_url: null,
    bio: '女性施工管理士のパイオニア。現場の働き方改革を推進中。',
    is_published: true, created_at: new Date().toISOString(),
  },
  {
    id: 'c3', company_id: '2', name: '山本 剛', name_kana: 'ヤマモト ゴウ',
    specialty: '鉄筋工', experience: 20, photo_url: null,
    bio: '鉄筋組み立て20年のベテラン。正確さとスピードが持ち味。',
    is_published: true, created_at: new Date().toISOString(),
  },
  {
    id: 'c4', company_id: '3', name: '伊藤 浩二', name_kana: 'イトウ コウジ',
    specialty: '電気工事士', experience: 15, photo_url: null,
    bio: '第一種電気工事士。太陽光・蓄電池システムの設計施工も対応。',
    is_published: true, created_at: new Date().toISOString(),
  },
  {
    id: 'c5', company_id: '4', name: '鈴木 大輔', name_kana: 'スズキ ダイスケ',
    specialty: '土木施工管理', experience: 18, photo_url: null,
    bio: '北海道の厳しい気候条件での施工を知り尽くした土木のスペシャリスト。',
    is_published: true, created_at: new Date().toISOString(),
  },
  {
    id: 'c6', company_id: '5', name: '高橋 久美子', name_kana: 'タカハシ クミコ',
    specialty: 'リフォームプランナー', experience: 10, photo_url: null,
    bio: '住まいの悩みを聞き、最適なリノベーション提案を行う。資格：二級建築士。',
    is_published: true, created_at: new Date().toISOString(),
  },
]

export const dummyKizukuEntries: KizukuEntry[] = [
  {
    id: 'k1', company_id: '2', title: '現場体験1日プログラム',
    description: '実際の建設現場で職人の仕事を体験できます。土木工事の基礎から安全管理まで。学生・転職希望者歓迎。',
    capacity: 10, schedule: '毎月第2・第4土曜日', prefecture: '大阪府',
    is_active: true, created_at: new Date().toISOString(),
  },
  {
    id: 'k2', company_id: '5', title: 'リフォーム体験ワークショップ',
    description: 'タイル貼り・壁紙張り替えなどDIYの基礎を職人から学べます。家族参加OK。',
    capacity: 8, schedule: '毎月第1日曜日', prefecture: '福岡県',
    is_active: true, created_at: new Date().toISOString(),
  },
]
