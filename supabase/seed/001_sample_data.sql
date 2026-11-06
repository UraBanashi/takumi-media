-- ============================================================
-- サンプルデータ（開発用）
-- ============================================================

-- タグ
INSERT INTO tags (name) VALUES
  ('官公庁実績'),
  ('ISO認証'),
  ('女性活躍'),
  ('若手育成'),
  ('DX推進'),
  ('地域密着');

-- 企業サンプル（3パターン）
INSERT INTO companies (slug, name, name_kana, description, prefecture, city, category, plan_type, rank_score, is_published) VALUES
(
  'takumi-kensetsu',
  '匠建設株式会社',
  'タクミケンセツ',
  '創業50年の信頼と実績。地域のインフラを支え続ける総合建設会社です。',
  '東京都',
  '新宿区',
  '建築工事',
  'sns',
  100,
  true
),
(
  'kizuku-doboku',
  'KIZUKU土木工業',
  'キズクドボクコウギョウ',
  '体験型採用で若手職人を育成。建設業の魅力を次世代へ。',
  '大阪府',
  '大阪市',
  '土木工事',
  'kizuku',
  80,
  true
),
(
  'mirai-setsubi',
  '未来設備工業',
  'ミライセツビコウギョウ',
  '電気・空調・衛生設備のプロフェッショナル集団。',
  '愛知県',
  '名古屋市',
  '設備工事',
  'free',
  20,
  true
);

-- KIZUKUエントリー
INSERT INTO kizuku_entries (company_id, title, description, capacity, schedule, prefecture)
SELECT
  id,
  '現場体験1日プログラム',
  '実際の建設現場で職人の仕事を体験できます。学生・転職希望者歓迎。',
  10,
  '毎月第2・第4土曜日',
  '大阪府'
FROM companies WHERE slug = 'kizuku-doboku';

-- 番組サンプル
INSERT INTO programs (title, description, youtube_id, is_published, published_at) VALUES
(
  '匠の技 #01 ─ 型枠大工の一日',
  '型枠大工の朝から夕方まで密着。コンクリートを支える職人技に迫る。',
  'dQw4w9WgXcQ',
  true,
  now() - interval '7 days'
),
(
  '匠の技 #02 ─ 鉄筋工の世界',
  '鉄筋を組み上げる緻密な作業。強度計算から施工まで全工程を紹介。',
  'dQw4w9WgXcQ',
  true,
  now() - interval '1 day'
);
