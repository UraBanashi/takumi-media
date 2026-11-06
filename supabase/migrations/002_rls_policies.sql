-- ============================================================
-- RLS ポリシー（冪等版）
-- ============================================================

ALTER TABLE companies       ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags            ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_tags    ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs        ENABLE ROW LEVEL SECURITY;
ALTER TABLE pr_videos       ENABLE ROW LEVEL SECURITY;
ALTER TABLE craftsmen       ENABLE ROW LEVEL SECURITY;
ALTER TABLE kizuku_entries  ENABLE ROW LEVEL SECURITY;

-- 既存ポリシーを削除してから再作成（冪等に）
DO $$ DECLARE r RECORD;
BEGIN
  FOR r IN SELECT policyname, tablename FROM pg_policies
    WHERE tablename IN ('companies','tags','company_tags','programs','pr_videos','craftsmen','kizuku_entries')
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I', r.policyname, r.tablename);
  END LOOP;
END $$;

-- 公開読み取り
CREATE POLICY "公開企業は誰でも閲覧可" ON companies
  FOR SELECT USING (is_published = true);

CREATE POLICY "タグは誰でも閲覧可" ON tags
  FOR SELECT USING (true);

CREATE POLICY "企業タグは誰でも閲覧可" ON company_tags
  FOR SELECT USING (true);

CREATE POLICY "公開番組は誰でも閲覧可" ON programs
  FOR SELECT USING (is_published = true);

CREATE POLICY "PR動画は誰でも閲覧可" ON pr_videos
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM companies c WHERE c.id = pr_videos.company_id AND c.is_published = true)
  );

CREATE POLICY "公開職人は誰でも閲覧可" ON craftsmen
  FOR SELECT USING (is_published = true);

CREATE POLICY "KIZUKUは誰でも閲覧可" ON kizuku_entries
  FOR SELECT USING (is_active = true);

-- 管理者（service_role）は全操作可
CREATE POLICY "管理者は企業を全操作可"      ON companies      FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "管理者はタグを全操作可"      ON tags           FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "管理者は企業タグを全操作可"  ON company_tags   FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "管理者は番組を全操作可"      ON programs       FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "管理者はPR動画を全操作可"    ON pr_videos      FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "管理者は職人を全操作可"      ON craftsmen      FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "管理者はKIZUKUを全操作可"    ON kizuku_entries FOR ALL USING (auth.role() = 'service_role');
