import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'お問い合わせ | 建設業トリセツ 匠',
}

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="font-mincho text-2xl font-bold text-takumi-black mb-2">お問い合わせ</h1>
      <p className="text-gray-500 text-sm mb-8">掲載に関するご相談・ご質問はこちらからお気軽にどうぞ。</p>

      <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        {/* 掲載案内 */}
        <div className="border border-takumi-gold/30 rounded-lg p-4 bg-takumi-gold/5">
          <h2 className="font-bold text-takumi-gold text-sm mb-1">掲載をご検討の方へ</h2>
          <p className="text-sm text-gray-600">
            匠認定プラン・KIZUKUプランの詳細は、下記メールアドレスまたはLINEよりお問い合わせください。
          </p>
        </div>

        {/* 連絡先 */}
        <dl className="space-y-4 text-sm">
          <div>
            <dt className="text-xs font-medium text-gray-400 mb-0.5">メール</dt>
            <dd>
              <a href="mailto:mtmt.inb.2525@gmail.com" className="text-takumi-gold hover:underline">
                mtmt.inb.2525@gmail.com
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-gray-400 mb-0.5">受付時間</dt>
            <dd className="text-gray-700">平日 9:00〜18:00（土日祝を除く）</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-gray-400 mb-0.5">返信</dt>
            <dd className="text-gray-700">2営業日以内にご返信いたします。</dd>
          </div>
        </dl>

        <div className="pt-4 border-t border-gray-100 text-center">
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
            ← トップページへ戻る
          </Link>
        </div>
      </div>
    </div>
  )
}
