export const dynamic = 'force-dynamic';
import { pool } from '@lib/db';

export default async function sitemap() {
  const staticRoutes = [
    { url: 'https://optivaize.nl', changeFrequency: 'weekly', priority: 1.0 },
    { url: 'https://optivaize.nl/ai-agenten', changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://optivaize.nl/ai-marketing', changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://optivaize.nl/ai-sales', changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://optivaize.nl/automatisering', changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://optivaize.nl/custom-software', changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://optivaize.nl/ai-business', changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://optivaize.nl/ai-chatbot', changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://optivaize.nl/ai-training', changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://optivaize.nl/crypto-blockchain', changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://optivaize.nl/cases', changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://optivaize.nl/blog', changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://optivaize.nl/over-ons', changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://optivaize.nl/contact', changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://optivaize.nl/hiring', changeFrequency: 'monthly', priority: 0.6 },
  ];

  try {
    const [casesResult, blogsResult] = await Promise.all([
      pool.query('SELECT slug, updated_at FROM cases WHERE published = true ORDER BY created_at DESC'),
      pool.query('SELECT slug, updated_at FROM blogs WHERE published = true ORDER BY published_at DESC'),
    ]);

    const caseRoutes = casesResult.rows.map((c) => ({
      url: `https://optivaize.nl/cases/${c.slug}`,
      lastModified: c.updated_at ? new Date(c.updated_at) : undefined,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

    const blogRoutes = blogsResult.rows.map((b) => ({
      url: `https://optivaize.nl/blog/${b.slug}`,
      lastModified: b.updated_at ? new Date(b.updated_at) : undefined,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

    return [...staticRoutes, ...caseRoutes, ...blogRoutes];
  } catch {
    return staticRoutes;
  }
}
