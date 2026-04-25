export const dynamic = 'force-dynamic';
import { pool } from '@lib/db';

export default async function sitemap() {
  const now = new Date();
  const staticRoutes = [
    { url: 'https://optivaize.nl', lastModified: now },
    { url: 'https://optivaize.nl/software-platforms', lastModified: now },
    { url: 'https://optivaize.nl/ai-agents-chatbots', lastModified: now },
    { url: 'https://optivaize.nl/ai-marketing', lastModified: now },
    { url: 'https://optivaize.nl/custom-software', lastModified: now },
    { url: 'https://optivaize.nl/automatisering', lastModified: now },
    { url: 'https://optivaize.nl/ai-agenten', lastModified: now },
    { url: 'https://optivaize.nl/ai-chatbot', lastModified: now },
    { url: 'https://optivaize.nl/cases', lastModified: now },
    { url: 'https://optivaize.nl/producten', lastModified: now },
    { url: 'https://optivaize.nl/ai-assistent', lastModified: now },
    { url: 'https://optivaize.nl/blog', lastModified: now },
    { url: 'https://optivaize.nl/over-ons', lastModified: now },
    { url: 'https://optivaize.nl/contact', lastModified: now },
    { url: 'https://optivaize.nl/hiring', lastModified: now },
  ];

  try {
    const [casesResult, blogsResult] = await Promise.all([
      pool.query('SELECT slug, updated_at FROM cases WHERE published = true ORDER BY created_at DESC'),
      pool.query('SELECT slug, updated_at FROM blogs WHERE published = true ORDER BY published_at DESC'),
    ]);

    const caseRoutes = casesResult.rows.map((c) => ({
      url: `https://optivaize.nl/cases/${c.slug.trim()}`,
      lastModified: c.updated_at ? new Date(c.updated_at) : undefined,
    }));

    const blogRoutes = blogsResult.rows.map((b) => ({
      url: `https://optivaize.nl/blog/${b.slug.trim()}`,
      lastModified: b.updated_at ? new Date(b.updated_at) : undefined,
    }));

    return [...staticRoutes, ...caseRoutes, ...blogRoutes];
  } catch (err) {
    console.error('Sitemap: failed to fetch dynamic routes', err);
    return staticRoutes;
  }
}
