export const dynamic = 'force-dynamic';
import { pool } from '@lib/db';

export async function GET() {
  let blogLines = '';
  let caseLines = '';

  try {
    const [blogsResult, casesResult] = await Promise.all([
      pool.query("SELECT title, slug, excerpt FROM blogs WHERE published = true ORDER BY published_at DESC"),
      pool.query("SELECT title_nl, title_en, slug, preview_nl, preview_en, company FROM cases WHERE published = true ORDER BY created_at DESC"),
    ]);

    if (casesResult.rows.length > 0) {
      caseLines = casesResult.rows
        .map(c => {
          const title = c.company || c.title_nl || c.title_en || 'Case';
          const preview = (c.preview_nl || c.preview_en || '').slice(0, 150).replace(/\n/g, ' ');
          return `- [${title}](https://optivaize.nl/cases/${c.slug.trim()}): ${preview}`;
        })
        .join('\n');
    }

    if (blogsResult.rows.length > 0) {
      blogLines = blogsResult.rows
        .map(b => {
          const title = b.title || 'Blog';
          const preview = (b.excerpt || '').slice(0, 150).replace(/\n/g, ' ');
          return `- [${title}](https://optivaize.nl/blog/${b.slug.trim()}): ${preview}`;
        })
        .join('\n');
    }
  } catch (err) {
    console.error('llms.txt: failed to fetch dynamic content', err);
  }

  const content = `# Optivaize
> AI-bureau in De Bilt, Nederland. Bouwt AI-agents, automatisering, marketing en custom software voor bedrijven in heel Nederland.

## Kerngegevens
- Naam: Optivaize
- Type: AI-bureau / Professional Service
- Opgericht: 2023
- Locatie: Groenekanseweg 70, 3732 AG De Bilt, Utrecht, Nederland
- Talen: Nederlands, Engels
- Specialisatie: AI-agents, bedrijfsautomatisering, AI marketing, custom software
- Doelgroep: MKB en enterprise bedrijven in Nederland
- Website: https://optivaize.nl

## Diensten
- [AI Agents](https://optivaize.nl/ai-agenten): Custom AI agent development, autonome agents die taken volledig overnemen. Van e-mail agents tot data-analyse.
- [AI Marketing](https://optivaize.nl/ai-marketing): AI-gestuurde SEO blogs, productteksten, Google Ads en social media automatisering.
- [AI Sales](https://optivaize.nl/ai-sales): CRM automatisering, LinkedIn automation en AI-gestuurde lead generatie.
- [Automatisering](https://optivaize.nl/automatisering): Bedrijfsprocesautomatisering met n8n workflows en platform integraties.
- [Custom Software](https://optivaize.nl/custom-software): Maatwerk software ontwikkeling met AI-integratie. Dashboards, platforms en tools.
- [AI Business](https://optivaize.nl/ai-business): Volledige AI-transformatie van strategie tot uitvoering op langetermijnbasis.
- [AI Chatbot](https://optivaize.nl/ai-chatbot): Custom chatbots getraind op bedrijfsdata via RAG, multi-channel (WhatsApp, Slack, web).
- [AI Training](https://optivaize.nl/ai-training): AI workshops, presentaties en team training op maat.
- [Crypto & Blockchain](https://optivaize.nl/crypto-blockchain): Smart contracts en blockchain development.

## Klanten en Cases
${caseLines || '- Neem contact op voor case studies en referenties.'}

## Blog (kennisbank)
${blogLines || '- Bezoek https://optivaize.nl/blog voor de laatste artikelen.'}

## Technologiestack
- Frontend: React, Next.js, styled-components
- Backend: Node.js, Python, PostgreSQL
- AI: OpenAI, Anthropic Claude, open-source modellen
- Automatisering: n8n, custom API integraties
- Deployment: Docker, Cloudflare

## Contact
- Email: info@optivaize.nl
- Telefoon: +31 6 42 69 89 18
- WhatsApp: https://wa.me/31642698918
- Adres: Groenekanseweg 70, 3732 AG De Bilt, Nederland
- KvK: 97569186
- BTW: NL868115769B01
- LinkedIn: https://www.linkedin.com/company/optivaize
- Instagram: https://www.instagram.com/optivaize
- YouTube: https://www.youtube.com/@Optivaize
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
