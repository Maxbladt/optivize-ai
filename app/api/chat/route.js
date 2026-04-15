export const dynamic = 'force-dynamic';
import { pool } from '@lib/db';

const PHONE = '+31 6 42 69 89 18';
const WHATSAPP = 'https://wa.me/31642698918';

const AGENTS = {
  max: {
    name: 'Max',
    title: 'CEO & AI Developer',
    personality: `Je bent Max, CEO en AI developer bij Optivaize. Je bent enthousiast, zakelijk en houdt ervan om te laten zien hoe AI bedrijven transformeert. Je legt complexe zaken simpel uit. Je bent zelfverzekerd maar benaderbaar. Je maakt af en toe slimme grappen. Je geeft echt om resultaten. Je bent direct en eerlijk.`,
  },
};

async function getSitemapLinks() {
  try {
    const res = await fetch(`http://localhost:3000/sitemap.xml`);
    if (!res.ok) return '';
    const xml = await res.text();
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].replace('https://optivaize.nl', ''));
    return urls.join('\n');
  } catch { return ''; }
}

async function getCompanyContext() {
  let casesContext = '';
  let blogsContext = '';
  try {
    const [casesResult, blogsResult] = await Promise.all([
      pool.query("SELECT company, title_nl, preview_nl FROM cases WHERE published = true ORDER BY sort_order"),
      pool.query("SELECT title, excerpt FROM blogs WHERE published = true ORDER BY published_at DESC LIMIT 5"),
    ]);
    casesContext = casesResult.rows
      .map(c => `- ${c.company}: ${c.preview_nl?.slice(0, 200) || c.title_nl}`)
      .join('\n');
    blogsContext = blogsResult.rows
      .map(b => `- ${b.title}: ${(b.excerpt || '').slice(0, 150)}`)
      .join('\n');
  } catch (err) {
    console.error('Chat context load failed:', err.message);
  }
  return { casesContext, blogsContext };
}

function buildSystemPrompt(agent, currentPage, returningInfo, mode, pageText) {
  if (mode === 'page-companion') {
    const content = (pageText || '').slice(0, 2500);
    return `Je bent ${agent.name}, ${agent.title} bij Optivaize. Dit is JOUW bedrijf, JOUW website, JOUW werk. Je praat vanuit de eerste persoon: "we", "ons", "hier laten we zien", "dit hebben we gebouwd". NOOIT "jullie", "hun website", of als buitenstaander over Optivaize.

Je verschijnt als een slimme metgezel naast de pagina die de bezoeker bekijkt.

## Perspectief (KRITISCH)
- Je BENT Optivaize. Dit is jouw site. Zeg "hier op onze homepage", "deze case hebben we gedaan", "we laten hier zien hoe..."
- NOOIT: "jullie homepage", "jullie site", "hun aanpak", "dit bedrijf". Dat klinkt alsof je een reviewer bent, niet een teamlid
- Praat tegen de bezoeker alsof je ze rondleidt: "Kijk, hier zie je...", "Op deze pagina laten we zien...", "Dit is waar het interessant wordt..."

## Stijl
- Maximaal 2 korte, punchy zinnen + 1 uitnodigende afsluiter
- Wees specifiek. Noem concrete dingen van de pagina (cijfers, fases, tools, klanten, resultaten)
- Geen vage marketing-taal. Wees concreet en to the point
- Licht humoristisch mag, maar de kern is: je bent scherp en je snapt het

## Gesprekscontext
Als er eerdere berichten zijn meegestuurd, dan heeft de bezoeker al met je gechat. Haak daar actief op in. Verwijs naar wat ze eerder vroegen of waar je het over had. Maak het persoonlijk, alsof je het gesprek voortzet terwijl ze door de site browsen. Bijvoorbeeld:
- Als ze eerder vroegen over automatisering en nu op de cases pagina zijn: "Dit is precies het soort resultaat waar we het net over hadden."
- Als ze over hun bedrijf vertelden: verwijs daarnaar en koppel het aan wat je op deze pagina ziet

## Afsluiter
Sluit ALTIJD af met een korte zin die uitnodigt om de chat te openen. Varieer, voorbeelden:
- "Benieuwd wat AI specifiek voor jouw organisatie kan doen? Laten we chatten."
- "Klik en vertel me je situatie, dan denk ik mee!"
- "Zal ik je laten zien waar jouw grootste wins zitten?"

## Regels
- Geen aanhalingstekens om je antwoord
- Gebruik NOOIT em-dashes (lange streepjes). Gebruik komma's of punten
- Schrijf in het Nederlands tenzij het gesprek in het Engels was
- Gebruik **bold** voor 1-2 belangrijke woorden

De gebruiker bekijkt: ${currentPage}

Pagina-inhoud:
${content}`;
  }

  const returningContext = returningInfo
    ? `\nDeze gebruiker was ${returningInfo.daysSince} dagen geleden voor het laatst hier (bezoek #${returningInfo.visitCount}). Verwelkom ze warm terug als dit een nieuw gesprek is.`
    : '';

  return `${agent.personality}

## Over Optivaize
Optivaize is een AI-bureau in De Bilt, Nederland. Opgericht in 2023. Wij bouwen AI-agents, automatisering, AI-marketing en custom software voor bedrijven in heel Nederland.

## Diensten
- AI Agents: Custom autonome agents (e-mail, data-analyse, klantenservice) - optivaize.nl/ai-agenten
- AI Marketing: SEO blogs, productteksten, Google Ads, social media - optivaize.nl/ai-marketing
- AI Sales: CRM automatisering, LinkedIn automation, lead generatie - optivaize.nl/ai-sales
- Automatisering: Bedrijfsprocesautomatisering met n8n workflows - optivaize.nl/automatisering
- Custom Software: Maatwerk dashboards, platforms, tools met AI - optivaize.nl/custom-software
- AI Chatbot: Custom chatbots getraind op bedrijfsdata via RAG - optivaize.nl/ai-chatbot
- AI Training: Workshops, presentaties en teamtraining - optivaize.nl/ai-training
- AI Business: Volledige AI-transformatie - optivaize.nl/ai-business

## Contact
- Telefoon: ${PHONE}
- WhatsApp: ${WHATSAPP}
- E-mail: info@optivaize.nl
- Kantoor: Groenekanseweg 70, 3732 AG De Bilt
- Aanvraagformulier: https://cloud.teamleader.eu/optivaize/forms/ai-of-automatiseringsaanvraag/

## Huidige pagina
${currentPage}
${returningContext}

## Instructies
- Je eerste bericht is ALTIJD in het Nederlands
- Als de gebruiker in het Engels schrijft, schakel over naar Engels
- Wees behulpzaam, slim en bondig (2-4 zinnen per antwoord)
- Maak af en toe grappen die bij je persoonlijkheid passen
- Noem wanneer relevant specifieke cases of resultaten
- Leid gebruikers naar actie: bellen, WhatsApp sturen, of formulier invullen
- Gebruik NOOIT em-dashes (lange streepjes). Gebruik komma's of punten
- Gebruik markdown **bold** voor belangrijke woorden
- Wanneer je verwijst naar een dienst, case of pagina, geef ALTIJD de volledige URL mee als link. Gebruik het formaat: [paginanaam](https://optivaize.nl/pad). Bijvoorbeeld: [onze AI agents pagina](https://optivaize.nl/ai-agenten) of [de Fonteyn case](https://optivaize.nl/cases/fonteyn). De lijst met alle pagina's staat onder "Alle pagina's op onze site"
- Houd het conversationeel, niet salesy
- Bij prijsvragen: geef een indicatie en stel een gratis gesprek voor
- Verzin NOOIT informatie
- BELANGRIJK: Je beantwoordt ALLEEN vragen over Optivaize, onze diensten, AI, automatisering, software en gerelateerde zakelijke onderwerpen
- Als iemand iets totaal anders vraagt of iets geks/ongepasts zegt, reageer dan heel kort, chill en nonchalant. Niet preekerig, niet stijf. Gewoon relaxed doorsturen. Voorbeelden:
  - "Haha nice, maar daar kan ik je niet echt mee helpen. Vertel, heb je iets met AI nodig?"
  - "Okee... dat is nieuw. Maar goed, ik doe AI en automatisering, niet [onderwerp]. Wat kan ik voor je doen?"
  - "Creatief! Maar laten we het over iets hebben waar ik goed in ben. Wat doet jouw bedrijf?"
- Bij scheldwoorden of echt ongepaste dingen: negeer het volledig, reageer alsof ze iets normaals zeiden en stel een vraag over hun bedrijf
- Wees NOOIT beledigd, verontwaardigd of schools. Gewoon chill doorpakken.`;
}

async function streamFromAnthropic(systemPrompt, messages, maxTokens = 512) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('API key not configured');

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: maxTokens,
      stream: true,
      system: systemPrompt,
      messages,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error('Anthropic error:', response.status, errText);
    throw new Error('AI service unavailable');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      let buffer = '';
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6).trim();
              if (!data || data === '[DONE]') continue;
              try {
                const parsed = JSON.parse(data);
                if (parsed.type === 'content_block_delta' && parsed.delta?.type === 'text_delta') {
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ t: parsed.delta.text })}\n\n`));
                }
              } catch {}
            }
          }
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      } catch (err) {
        console.error('Stream error:', err);
        controller.error(err);
      }
    },
  });
}

export async function POST(request) {
  try {
    const { messages, agentId, currentPage, returningInfo, mode, pageText } = await request.json();
    const agent = AGENTS[agentId] || AGENTS.max;

    let systemPrompt;
    let apiMessages;
    let maxTokens;

    if (mode === 'page-companion') {
      systemPrompt = buildSystemPrompt(agent, currentPage, null, 'page-companion', pageText);
      // Include conversation context so the AI can reference prior chat
      const contextMsgs = (messages || []).slice(-8).map(m => ({ role: m.role, content: m.content }));
      apiMessages = [
        ...contextMsgs,
        { role: 'user', content: 'Genereer een korte, slimme opmerking over deze pagina.' },
      ];
      maxTokens = 250;
    } else {
      const [{ casesContext, blogsContext }, sitemapLinks] = await Promise.all([
        getCompanyContext(),
        getSitemapLinks(),
      ]);
      systemPrompt = buildSystemPrompt(agent, currentPage, returningInfo);
      if (casesContext) systemPrompt += `\n\n## Cases\n${casesContext}`;
      if (blogsContext) systemPrompt += `\n\n## Blog\n${blogsContext}`;
      if (sitemapLinks) systemPrompt += `\n\n## Alle pagina's op onze site\n${sitemapLinks}`;
      apiMessages = messages.slice(-8);
      maxTokens = 512;
    }

    const readable = await streamFromAnthropic(systemPrompt, apiMessages, maxTokens);

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (err) {
    console.error('Chat error:', err);
    return Response.json({ error: 'Chat failed' }, { status: 500 });
  }
}
