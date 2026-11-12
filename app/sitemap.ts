import type { MetadataRoute } from 'next'
import { getCompanies } from '@/lib/queries/companies'

const BASE_URL = 'https://takumi.urabanashi.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { companies } = await getCompanies({ limit: 1000 })

  const companyUrls: MetadataRoute.Sitemap = companies.map((c) => ({
    url: `${BASE_URL}/companies/${c.slug}`,
    lastModified: new Date(c.created_at),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/companies`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/kizuku`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    ...companyUrls,
  ]
}
