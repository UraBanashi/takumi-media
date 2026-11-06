# Supabase セットアップ手順

## 1. Supabaseプロジェクト作成

1. https://supabase.com にアクセス → 新規プロジェクト作成
2. Project Name: `takumi`
3. Database Password: 安全なパスワードを設定（メモしておく）
4. Region: `Northeast Asia (Tokyo)` を選択

## 2. SQLの実行順序

Supabaseダッシュボード → SQL Editor で以下を順番に実行：

```
supabase/migrations/001_initial_schema.sql  ← テーブル・インデックス作成
supabase/migrations/002_rls_policies.sql    ← RLSポリシー設定
supabase/migrations/003_storage.sql         ← Storageバケット設定
supabase/seed/001_sample_data.sql           ← サンプルデータ（開発時のみ）
```

## 3. 環境変数の設定

```bash
cp .env.local.example .env.local
```

SupabaseダッシュボードのProject Settings > API から：
- `NEXT_PUBLIC_SUPABASE_URL` → Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` → anon / public
- `SUPABASE_SERVICE_ROLE_KEY` → service_role（管理画面用）

## 4. 管理者アカウントの作成

Supabaseダッシュボード → Authentication → Users → Add user から
管理画面ログイン用のメール・パスワードを登録する。

## 5. Node.js & パッケージのインストール

```bash
# Node.jsがない場合：https://nodejs.org からLTS版をインストール
node -v  # v20以上推奨

# プロジェクト作成（初回のみ）
npx create-next-app@latest . --typescript --tailwind --eslint --app

# Supabase関連パッケージ
npm install @supabase/supabase-js @supabase/ssr

# 開発サーバー起動
npm run dev
```

## DBスキーマ概要

| テーブル | 用途 |
|---|---|
| companies | 企業マスタ（plan_type で表示分け） |
| tags / company_tags | 企業タグ（多対多） |
| programs | 建設業番組（YouTube） |
| pr_videos | 企業PR動画 |
| craftsmen | 職人図鑑 |
| kizuku_entries | KIZUKU体験プログラム |

## plan_type の表示ルール

| 値 | 意味 | 表示 |
|---|---|---|
| `sns` | SNS運用契約企業 | 金の左ボーダー + 上位表示 |
| `kizuku` | KIZUKU参加企業 | 緑の左ボーダー + 体験するボタン |
| `free` | 無料掲載 | 通常表示 |
