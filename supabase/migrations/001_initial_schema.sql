-- ============================================================
-- 匠 (Takumi) - Initial Schema（冪等版・何度実行してもOK）
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- ENUM types（存在チェック付き）
-- ============================================================

DO $$ BEGIN
  CREATE TYPE plan_type AS ENUM ('sns', 'kizuku', 'free');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE company_category AS ENUM (
    '土木工事', '建築工事', '設備工事', '電気工事',
    '管工事', '解体工事', 'リフォーム', '造園', 'その他'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ============================================================
-- companies
-- ============================================================

CREATE TABLE IF NOT EXISTS companies (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug          text UNIQUE NOT NULL,
  name          text NOT NULL,
  name_kana     text,
  description   text,
  logo_url      text,
  cover_url     text,
  prefecture    text NOT NULL,
  city          text,
  address       text,
  phone         text,
  website_url   text,
  established   int,
  employees     int,
  category      company_category NOT NULL,
  plan_type     plan_type NOT NULL DEFAULT 'free',
  rank_score    int NOT NULL DEFAULT 0,
  is_published  boolean NOT NULL DEFAULT false,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- tags & company_tags
-- ============================================================

CREATE TABLE IF NOT EXISTS tags (
  id    uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name  text UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS company_tags (
  company_id  uuid REFERENCES companies(id) ON DELETE CASCADE,
  tag_id      uuid REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (company_id, tag_id)
);

-- ============================================================
-- programs
-- ============================================================

CREATE TABLE IF NOT EXISTS programs (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title         text NOT NULL,
  description   text,
  youtube_id    text NOT NULL,
  thumbnail_url text,
  duration_sec  int,
  published_at  timestamptz,
  is_published  boolean NOT NULL DEFAULT false,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- pr_videos
-- ============================================================

CREATE TABLE IF NOT EXISTS pr_videos (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id    uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  title         text NOT NULL,
  youtube_id    text NOT NULL,
  thumbnail_url text,
  sort_order    int NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- craftsmen
-- ============================================================

CREATE TABLE IF NOT EXISTS craftsmen (
  id           uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id   uuid REFERENCES companies(id) ON DELETE SET NULL,
  name         text NOT NULL,
  name_kana    text,
  specialty    text NOT NULL,
  experience   int,
  photo_url    text,
  bio          text,
  is_published boolean NOT NULL DEFAULT false,
  created_at   timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- kizuku_entries
-- ============================================================

CREATE TABLE IF NOT EXISTS kizuku_entries (
  id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id  uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  title       text NOT NULL,
  description text,
  capacity    int,
  schedule    text,
  prefecture  text,
  is_active   boolean NOT NULL DEFAULT true,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- updated_at トリガー
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS companies_updated_at ON companies;
CREATE TRIGGER companies_updated_at
  BEFORE UPDATE ON companies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- インデックス
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_companies_plan_type    ON companies(plan_type);
CREATE INDEX IF NOT EXISTS idx_companies_prefecture   ON companies(prefecture);
CREATE INDEX IF NOT EXISTS idx_companies_category     ON companies(category);
CREATE INDEX IF NOT EXISTS idx_companies_rank_score   ON companies(rank_score DESC);
CREATE INDEX IF NOT EXISTS idx_companies_is_published ON companies(is_published);
CREATE INDEX IF NOT EXISTS idx_pr_videos_company      ON pr_videos(company_id);
CREATE INDEX IF NOT EXISTS idx_craftsmen_company      ON craftsmen(company_id);
CREATE INDEX IF NOT EXISTS idx_kizuku_company         ON kizuku_entries(company_id);
