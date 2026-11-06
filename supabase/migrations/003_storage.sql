-- ============================================================
-- Supabase Storage バケット設定
-- ============================================================

-- ロゴ・カバー画像バケット
INSERT INTO storage.buckets (id, name, public)
VALUES ('company-images', 'company-images', true);

-- 職人写真バケット
INSERT INTO storage.buckets (id, name, public)
VALUES ('craftsman-photos', 'craftsman-photos', true);

-- ============================================================
-- Storage ポリシー
-- ============================================================

-- 公開読み取り
CREATE POLICY "company-images は公開" ON storage.objects
  FOR SELECT USING (bucket_id = 'company-images');

CREATE POLICY "craftsman-photos は公開" ON storage.objects
  FOR SELECT USING (bucket_id = 'craftsman-photos');

-- アップロード・削除は service_role のみ
CREATE POLICY "company-images アップロードは管理者のみ" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'company-images' AND auth.role() = 'service_role'
  );

CREATE POLICY "craftsman-photos アップロードは管理者のみ" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'craftsman-photos' AND auth.role() = 'service_role'
  );

CREATE POLICY "company-images 削除は管理者のみ" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'company-images' AND auth.role() = 'service_role'
  );

CREATE POLICY "craftsman-photos 削除は管理者のみ" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'craftsman-photos' AND auth.role() = 'service_role'
  );
