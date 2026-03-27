const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'optivaize',
  user: process.env.DB_USER || 'optivaize',
  password: process.env.DB_PASSWORD || 'optivaize123',
});

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Groenekanseweg12!';

async function seed() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Seed admin user
    const userCount = await client.query('SELECT COUNT(*) FROM users');
    if (parseInt(userCount.rows[0].count) === 0) {
      const hash = await bcrypt.hash(ADMIN_PASSWORD, 10);
      await client.query(
        'INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3)',
        ['admin@optivaize.nl', hash, 'Admin']
      );
      console.log('Admin user created');
    } else {
      console.log('Users table not empty, skipping user seed');
    }

    // Seed cases
    const caseCount = await client.query('SELECT COUNT(*) FROM cases');
    if (parseInt(caseCount.rows[0].count) === 0) {
      const cases = getCaseSeedData();
      for (let i = 0; i < cases.length; i++) {
        const c = cases[i];
        await client.query(
          `INSERT INTO cases (slug, title_nl, title_en, company, preview_nl, preview_en,
            description_nl, description_en, results_nl, results_en,
            detailed_results_nl, detailed_results_en,
            logo, image, partner_logos, published, sort_order)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)`,
          [c.slug, c.title_nl, c.title_en, c.company, c.preview_nl, c.preview_en,
            c.description_nl, c.description_en,
            JSON.stringify(c.results_nl), JSON.stringify(c.results_en),
            JSON.stringify(c.detailed_results_nl), JSON.stringify(c.detailed_results_en),
            c.logo, c.image, JSON.stringify(c.partner_logos), true, i]
        );
      }
      console.log(`Seeded ${cases.length} cases`);
    } else {
      console.log('Cases table not empty, skipping case seed');
    }

    await client.query('COMMIT');
    console.log('Seed completed successfully');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Seed failed:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

function getCaseSeedData() {
  return [
    {
      slug: 'fonteyn',
      company: 'Fonteyn',
      title_nl: 'Fonteyn: AI SEO Blog Optimalisatie',
      title_en: 'Fonteyn: AI SEO Blog Optimization',
      preview_nl: 'Voor Fonteyn, een van de grootste leveranciers van luxe meubels met meer dan 10 miljoen jaaromzet, hebben wij de volledige SEO-aanpak vernieuwd met AI-gestuurde blogoptimalisatie. Door concurrentieanalyse en slimme keyword-targeting realiseerden we lagere advertentiekosten en hogere organische posities.',
      preview_en: 'For Fonteyn, one of the largest luxury furniture suppliers with over 10 million in annual revenue, we transformed their entire SEO strategy with AI-powered blog optimization. Through competitor analysis and smart keyword targeting we achieved lower ad costs and higher organic rankings.',
      description_nl: 'Fonteyn is een van de grootste leveranciers van meubels, spa\'s en alles rondom luxe wonen, met meer dan 10 miljoen omzet per jaar. We hebben ons AI-gedreven blogoptimalisatiesysteem ingezet om betere artikelen te publiceren en organisch hogere posities te behalen. Onze aanpak startte met een uitgebreide concurrentieanalyse via tools als Ahrefs, waarmee we precies in kaart brachten op welke zoekwoorden de concurrentie investeerde en waar de grootste kansen lagen. Vervolgens gebruikten we geavanceerde AI-modellen om de zoekwoorden te identificeren die Fonteyn het meeste geld kostten in Google Ads, zodat we wisten waar organische content het grootste rendement zou opleveren.\n\nIn plaats van structureel premiumprijzen te blijven betalen voor dure termen, schreven we gerichte blogcontent die juist die zoekwoorden organisch targette. Dit stelde Fonteyn in staat om beter te scoren op kostbare keywords en tegelijk advertentiebudget te verschuiven naar goedkopere, minder competitieve termen, waardoor de totale marketing-ROI aanzienlijk verbeterde. We hebben daarnaast een AI-model afgestemd op de merkstijl van Fonteyn, zodat zoekwoorden natuurlijk verwerkt werden in leesbare, overtuigende content die volledig aansloot bij hun tone of voice. Met AI-SEO technieken hebben we de kans vergroot dat hun content ook zichtbaar wordt in AI-gegenereerde zoekresultaten en featured snippets, en we hebben een volledig geautomatiseerd publicatiesysteem opgezet dat content volgens een strategische planning plaatst zonder enig handmatig werk.',
      description_en: 'Fonteyn is one of the biggest suppliers of furniture, spas, and everything for luxurious living, generating over 10 million in revenue per year. We implemented our AI-powered blog optimization system to create better posts and achieve higher rankings using organic methods.\n\nOur comprehensive approach involved competitor analysis using advanced tools like Ahrefs to understand which keywords competitors were ranking for and investing in. We then used sophisticated AI models to identify high-value keywords that were costing Fonteyn significant money in their Google Ads campaigns.\n\nInstead of continuing to pay premium prices for expensive keywords in advertising, we strategically wrote blog content targeting these costly terms. This allowed them to optimize content for expensive keywords while shifting their paid advertising budget to cheaper, less competitive terms - maximizing their overall marketing ROI.\n\nWe fine-tuned a specialized AI model specifically for Fonteyn\'s brand and industry, training the AI to seamlessly integrate target keywords into naturally flowing, engaging content that reads authentically. The model learned their brand voice, tone, and messaging style while creating keyword-rich content that didn\'t feel forced or robotic.\n\nOur AI SEO integration positioned their content to appear prominently in Google\'s AI-generated search results and featured snippets. We implemented comprehensive auto-publishing systems that work seamlessly with their platform, publishing optimized blog content on a strategic schedule with complete automation.',
      results_nl: ['Gem. rankingstijging', '3% minder Google Ads-kosten', '4% hogere conversie'],
      results_en: ['Avg ranking increase', '3% Google Ads reduction', '4% conversion boost'],
      detailed_results_nl: [
        { title: 'Google-ranking', description: 'Gemiddelde verbetering in posities', value: 'Significante stijging', color: '#10B981' },
        { title: 'Google Ads-kosten', description: 'Lagere advertentie-uitgaven', value: '-3%', color: '#3B82F6' },
        { title: 'Conversieratio', description: 'Relatieve stijging in conversie', value: '+4%', color: '#8B5CF6' },
        { title: 'Geoptimaliseerde producten', description: 'Aantal verbeterde productpagina\'s', value: '30.000+', color: '#F59E0B' },
        { title: 'Bespaarde arbeid', description: 'Uren handmatig werk vervangen', value: '3.000 uur', color: '#EF4444' }
      ],
      detailed_results_en: [
        { title: 'Google Ranking', description: 'Average ranking position improvement', value: 'Significant increase', color: '#10B981' },
        { title: 'Google Ads Cost', description: 'Reduced advertising spend', value: '-3%', color: '#3B82F6' },
        { title: 'Conversion Rate', description: 'Relative conversion increase', value: '+4%', color: '#8B5CF6' },
        { title: 'Products Optimized', description: 'Total products enhanced', value: '30,000+', color: '#F59E0B' },
        { title: 'Labor Saved', description: 'Hours of manual work eliminated', value: '3,000 hrs', color: '#EF4444' }
      ],
      logo: '/images/fonteyn_logo.webp',
      image: '/images/fonteyn_dashboard.webp',
      partner_logos: [],
    },
    {
      slug: 'aanhuis',
      company: 'Aanhuis',
      title_nl: 'Aanhuis: AI Presentatie & Training',
      title_en: 'Aanhuis: AI Presentation & Training',
      preview_nl: 'Voor Aanhuis hebben wij een complete AI-training en implementatie verzorgd. Van management-presentatie tot afdelingsworkshops, inclusief custom GPT\'s voor e-mail en rapportages. Het resultaat: 20% tijdwinst op e-mailwerk en volledige team-adoptie binnen zes weken.',
      preview_en: 'For Aanhuis we delivered a complete AI training and implementation programme. From management presentations to department workshops, including custom GPTs for email and reports. The result: 20% time savings on email work and full team-wide adoption within six weeks.',
      description_nl: 'Voor Aanhuis.nl leverden we een complete AI-presentatie en training met als doel sneller en consistenter werken door slimme AI-toepassingen. We startten met een uitgebreide sessie om knelpunten en tijdvreters te identificeren, analyseerden de bestaande workflows en stemden de belangrijkste kansen af met het management. Op basis daarvan ontwikkelden we custom GPT\'s die naadloos aansloten op hun dagelijkse werkprocessen, waarmee we onder andere ongeveer 20% tijdwinst realiseerden bij het schrijven en beantwoorden van e-mails.\n\nVervolgens gaven we presentaties op maat aan zowel het management als het kernteam. In plaats van een standaardverhaal af te draaien, gingen we in gesprek, luisterden we actief naar de specifieke uitdagingen per afdeling en maakten we de kansen concreet met live demonstraties. Cruciaal daarbij was dat het team ervaarde dat AI hen ondersteunt en versnelt in hun werk, niet vervangt. Na de eerste sessies volgden gerichte afdelingsworkshops om specifieke processen door te lichten en direct toepasbare automatiseringen te introduceren. Alle inzichten bundelden we in een uitgebreide praktische handleiding met onder andere instructies voor veilig ChatGPT-gebruik, het trainen van custom GPT\'s en een overzicht van verdere AI-kansen die we samen geidentificeerd hadden.',
      description_en: 'For Aanhuis.nl, we delivered our comprehensive AI presentation service, focusing on improving work efficiency through strategic AI implementation. We realized a 20% better work efficiency in writing emails by building custom GPTs tailored to their specific needs.\n\nOur engagement began with an initial session where we discussed time-consuming processes that were hindering efficiency and preventing people from working at their absolute best. We analyzed their workflows and looked for opportunities where they could improve before delivering the presentation and discussed these findings with management.\n\nWe conducted tailored presentations for both management and the core team working at Aanhuis. These weren\'t just generic AI overviews - we sat with their team for open conversations, actively listening and looking for opportunities while creating alignment. The key was ensuring that stakeholders (the people actually doing the work) felt that AI would help them work more efficiently rather than replace them.\n\nFollowing the successful initial presentation, we conducted specialized breakout sessions with different departments. In these focused sessions, we examined their specific processes and identified opportunities to automate them using AI or introduce tools they could start using directly.\n\nWe created a comprehensive guide containing all the insights from our discussions, including detailed instructions on how to use ChatGPT within their organization, how to train custom GPTs for specific tasks, and identification of additional AI opportunities. Later, we provided them with a PDF reference guide they could use whenever they had questions.\n\nThe team expressed enthusiasm about the results and told us they plan to schedule future meetings to make their processes even more efficient. This commitment to continuous improvement shows the lasting impact of our AI integration approach.',
      results_nl: ['+20% effici\u00ebntie', 'Custom GPT\'s gebouwd', 'Adoptie in het hele team'],
      results_en: ['20% efficiency boost', 'Custom GPTs built', 'Team-wide adoption'],
      detailed_results_nl: [
        { title: 'E-mail effici\u00ebntie', description: 'Tijdwinst bij e-mailwerk', value: '+20%', color: '#10B981' },
        { title: 'Custom GPT\'s', description: 'AI-tools op maat gebouwd', value: 'Meerdere', color: '#3B82F6' },
        { title: 'Afdelingen', description: 'Workshops uitgevoerd', value: 'Alle afdelingen', color: '#F59E0B' },
        { title: 'Opvolging', description: 'Continu verbeteren geborgd', value: 'Doorlopend', color: '#EF4444' }
      ],
      detailed_results_en: [
        { title: 'Email Efficiency', description: 'Improvement in email writing efficiency', value: '+20%', color: '#10B981' },
        { title: 'Custom GPTs', description: 'Tailored AI tools created', value: 'Multiple built', color: '#3B82F6' },
        { title: 'Department Coverage', description: 'Breakout sessions completed', value: 'All depts', color: '#F59E0B' },
        { title: 'Follow-up Planned', description: 'Continuous improvement commitment', value: 'Ongoing', color: '#EF4444' }
      ],
      logo: '/images/aanhuis.webp',
      image: '/images/aanhuis_voorkant.webp',
      partner_logos: [],
    },
    {
      slug: 'blosh',
      company: 'Blosh',
      title_nl: 'Blosh: Custom AI Oplossingen Suite',
      title_en: 'Blosh: Custom AI Solutions Suite',
      preview_nl: 'Voor Blosh ontwikkelden wij een complete maatwerk AI-suite bestaande uit een SEO-automatiseringssysteem, een slimme chatbot getraind op historische gesprekken en een Shopify-prijsbeheermodule. Drie op maat gebouwde systemen die samen hun groei versnellen.',
      preview_en: 'For Blosh we developed a complete custom AI suite consisting of an SEO automation system, an intelligent chatbot trained on historical conversations, and a Shopify price management module. Three tailored systems that together accelerate their growth.',
      description_nl: 'Blosh kwam bij ons met meerdere operationele uitdagingen die verdere groei in de weg zaten: betere vindbaarheid in zoekmachines, sneller en persoonlijker klantcontact en effici\u00ebnter e-commercebeheer. In plaats van standaardoplossingen te implementeren, ontwikkelden we een complete maatwerk AI-suite die naadloos aansluit op hun bestaande manier van werken en specifiek is afgestemd op hun merk en doelgroep.\n\nWe begonnen met een AI-SEO systeem dat content automatisch optimaliseert voor zoekmachines, concurrentiestrategieën analyseert en waardevolle zoekwoorden identificeert om organisch verkeer te verhogen. Voor klantenservice bouwden we een intelligente chatbot die is getraind op hun historische gesprekken, waardoor antwoorden niet alleen razendsnel worden gegeven maar ook perfect aansluiten bij de toon en service-standaard die klanten van Blosh verwachten. Tot slot ontwikkelden we een slimme automatisering voor Shopify-prijsbeheer waarmee prijzen over de volledige productcatalogus effici\u00ebnt worden beheerd en automatisch worden aangepast op basis van marktsignalen, concurrentie en verkoopprestaties, wat het team uren handmatig werk per week bespaart.',
      description_en: 'Blosh approached us with multiple operational challenges that were limiting their growth potential. They needed better search visibility, faster client support, and more efficient e-commerce management. Rather than implementing generic solutions, we developed a completely custom AI suite tailored to their specific business needs.\n\nWe started by building them an advanced AI SEO system that automatically optimizes their content for search engines. This system analyzes competitor strategies, identifies high-value keywords, and generates content that improves their search rankings while reducing advertising costs. The AI continuously monitors search trends and adjusts their content strategy to maintain competitive advantage.\n\nFor their client support challenges, we developed an intelligent chatbot trained specifically on Blosh\'s historical conversations. The chatbot learned their unique communication patterns, problem-solving approaches, and brand voice to provide instant, personalized responses that maintain the human touch their clients expect. This dramatically improved response times and client satisfaction.\n\nFinally, we created an intelligent automation system for their Shopify platform that allows them to efficiently manage pricing across their entire product catalog. The system automatically adjusts prices based on market conditions, competitor analysis, inventory levels, and sales performance, saving countless hours of manual work while optimizing revenue.\n\nThese custom solutions demonstrate our approach to building AI products that integrate perfectly with existing workflows and scale with business growth, delivering real measurable value rather than one-size-fits-all solutions.',
      results_nl: ['AI SEO systeem', 'Custom chatbot', 'Shopify automatisering'],
      results_en: ['AI SEO system', 'Custom chatbot', 'Shopify automation'],
      detailed_results_nl: [
        { title: 'AI-SEO systeem', description: 'Automatische zoekoptimalisatie', value: 'Ge\u00efmplementeerd', color: '#10B981' },
        { title: 'Slimme chatbot', description: 'Snellere support met de juiste toon', value: 'Actief', color: '#3B82F6' },
        { title: 'Shopify-integratie', description: 'Automatisch prijsbeheer', value: 'Operationeel', color: '#8B5CF6' },
        { title: 'Maatwerk oplossingen', description: 'Gebouwde AI-systemen', value: '3 systemen', color: '#F59E0B' }
      ],
      detailed_results_en: [
        { title: 'AI SEO System', description: 'Custom search optimization automation', value: 'Deployed', color: '#10B981' },
        { title: 'Smart Chatbot', description: 'Client support automation with personality', value: 'Active', color: '#3B82F6' },
        { title: 'Shopify Integration', description: 'Automated price management system', value: 'Operational', color: '#8B5CF6' },
        { title: 'Custom Solutions', description: 'Tailored AI products built', value: '3 systems', color: '#F59E0B' }
      ],
      logo: '/images/blosh.webp',
      image: '/images/blosh_office.webp',
      partner_logos: [],
    },
    {
      slug: 'red-button',
      company: 'Red Button / Magic Apparels',
      title_nl: 'Red Button: Sage Intacct & Becosoft Integratie',
      title_en: 'Red Button: Sage Intacct & Becosoft Integration',
      preview_nl: 'Voor Magic Apparels en dochtermerk Red Button bouwden wij een volledige real-time integratie tussen boekhoudplatform Sage Intacct en ordersysteem Becosoft. Inclusief synchronisatie van honderden items, automatische Europese BTW-logica en uitgebreide foutafhandeling.',
      preview_en: 'For Magic Apparels and subsidiary brand Red Button we built a full real-time integration between accounting platform Sage Intacct and order system Becosoft. Including synchronization of hundreds of items, automatic European VAT logic and extensive error handling.',
      description_nl: 'Red Button is een dochtermerk van Magic Apparels dat orders ontvangt via ordersysteem Becosoft, maar deze moest koppelen aan hun boekhoudplatform Sage Intacct om een naadloze administratieve workflow te realiseren. Voordat de integratie live kon gaan, moesten honderden bestaande items worden gesynchroniseerd, waaronder facturen, klantgegevens en productdata, elk met hun eigen structuur en validatieregels die correct moesten worden vertaald tussen beide systemen.\n\nEen van de grootste uitdagingen was het correct verwerken van Europese factureringsregels: wanneer een factuur binnen de EU werd verstuurd, moest deze zonder BTW worden verwerkt, terwijl voor Engelse facturen juist wel BTW gold. Deze complexe regels moesten volautomatisch worden toegepast op basis van het land van de klant, zonder ruimte voor fouten. We hebben een robuuste real-time integratie gebouwd die continu synchroniseert tussen beide systemen, inclusief uitgebreide foutafhandeling, automatische retry-mechanismen en gedetailleerde logging zodat het team op elk moment volledig inzicht heeft in de status van elke synchronisatie en direct kan ingrijpen wanneer dat nodig is.',
      description_en: 'Red Button is a subsidiary brand of Magic Apparels that receives orders through the Becosoft order system but needed to seamlessly connect these to their accounting platform Sage Intacct for a fully integrated administrative workflow. Before the integration could go live, hundreds of existing items needed to be synchronized, including invoices, customer data and product information, each with their own structure and validation rules that had to be correctly translated between the two systems.\n\nOne of the biggest challenges was correctly processing European invoicing rules: when an invoice was sent within the EU, it had to be processed without VAT, while UK invoices did require VAT. These complex rules had to be automatically applied based on the customer\'s country, leaving no room for errors. We built a robust real-time integration that continuously synchronizes between both systems, with extensive error handling, automatic retry mechanisms and detailed logging so the team always has full visibility into the status of every synchronization and can intervene immediately when needed.',
      results_nl: ['Volledige sync', 'Factuurregels', 'Europese BTW-logica'],
      results_en: ['Full sync', 'Invoice rules', 'European VAT logic'],
      detailed_results_nl: [
        { title: 'Synchronisatie', description: 'Bestaande items gesynchroniseerd', value: 'Honderden items', color: '#10B981' },
        { title: 'Factureringsregels', description: 'Automatische BTW-logica', value: 'EU & UK regels', color: '#3B82F6' },
        { title: 'Real-time sync', description: 'Orders automatisch verwerkt', value: 'Operationeel', color: '#8B5CF6' },
        { title: 'Systemen gekoppeld', description: 'Sage Intacct & Becosoft', value: '2 platformen', color: '#F59E0B' }
      ],
      detailed_results_en: [
        { title: 'Synchronization', description: 'Existing items synchronized', value: 'Hundreds of items', color: '#10B981' },
        { title: 'Invoice Rules', description: 'Automatic VAT logic', value: 'EU & UK rules', color: '#3B82F6' },
        { title: 'Real-time Sync', description: 'Orders automatically processed', value: 'Operational', color: '#8B5CF6' },
        { title: 'Systems Connected', description: 'Sage Intacct & Becosoft', value: '2 platforms', color: '#F59E0B' }
      ],
      logo: '/images/red_button_logo.webp',
      image: '/images/magic_apparels_dashboard.webp',
      partner_logos: ['/images/sage_intacct_logo.webp', '/images/becosoft_logo.webp'],
    },
    {
      slug: 'stakepvp',
      company: 'StakePVP',
      title_nl: 'StakePVP: Game Platform & Blockchain Integratie',
      title_en: 'StakePVP: Game Platform & Blockchain Integration',
      preview_nl: 'Wij bouwden een compleet game platform met drie volledig functionele games, blockchain-integratie op de Solana blockchain en crypto wallets via Privy. Een technisch uitdagend project met multi-container hosting, load balancing en real-time multiplayer functionaliteit.',
      preview_en: 'We built a complete game platform with three fully functional games, blockchain integration on the Solana blockchain and crypto wallets via Privy. A technically challenging project featuring multi-container hosting, load balancing and real-time multiplayer functionality.',
      description_nl: 'Optivaize heeft een compleet game platform gebouwd inclusief drie volledig functionele games en een diepgaande blockchain-integratie op de Solana blockchain. Dit project was bijzonder uitdagend vanwege de technische complexiteit: elke game draaide in een eigen container, met gedeelde hosting-infrastructuur, load balancing om pieken in spelerverkeer op te vangen en volledige crypto-functionaliteit voor in-game transacties en beloningen.\n\nVoor de wallet-integratie hebben we Privy ingezet, waarmee spelers op een laagdrempelige manier crypto wallets konden aanmaken en beheren zonder diepgaande blockchain-kennis nodig te hebben. De Solana blockchain zorgde voor snelle, goedkope transacties die essentieel waren voor de game-ervaring. Dit project demonstreert de kracht van Optivaize op het gebied van complexe custom software: van schaalbare game-architectuur en blockchain-integratie tot multi-container orchestratie en real-time multiplayer functionaliteit, alles gebouwd met een focus op performance en betrouwbaarheid.',
      description_en: 'Optivaize built a complete game platform including three fully functional games and a deep blockchain integration on the Solana blockchain. This project was particularly challenging due to its technical complexity: each game ran in its own container with shared hosting infrastructure, load balancing to handle spikes in player traffic and full crypto functionality for in-game transactions and rewards.\n\nFor wallet integration we used Privy, allowing players to easily create and manage crypto wallets without needing deep blockchain knowledge. The Solana blockchain provided fast, low-cost transactions that were essential for the gaming experience. This project demonstrates the strength of Optivaize in complex custom software: from scalable game architecture and blockchain integration to multi-container orchestration and real-time multiplayer functionality, all built with a focus on performance and reliability.',
      results_nl: ['3 games gebouwd', 'Solana blockchain', 'Multi-container hosting'],
      results_en: ['3 games built', 'Solana blockchain', 'Multi-container hosting'],
      detailed_results_nl: [
        { title: 'Games', description: 'Volledig functionele games gebouwd', value: '3 games', color: '#10B981' },
        { title: 'Blockchain', description: 'Solana integratie met Privy wallets', value: 'Volledig operationeel', color: '#3B82F6' },
        { title: 'Infrastructuur', description: 'Multi-container met load balancing', value: 'Schaalbaar', color: '#8B5CF6' },
        { title: 'Technologieen', description: 'Privy, Solana, Helius', value: '10+ services', color: '#F59E0B' }
      ],
      detailed_results_en: [
        { title: 'Games', description: 'Fully functional games built', value: '3 games', color: '#10B981' },
        { title: 'Blockchain', description: 'Solana integration with Privy wallets', value: 'Fully operational', color: '#3B82F6' },
        { title: 'Infrastructure', description: 'Multi-container with load balancing', value: 'Scalable', color: '#8B5CF6' },
        { title: 'Technologies', description: 'Privy, Solana, Helius', value: '10+ services', color: '#F59E0B' }
      ],
      logo: '/images/stakepvp_logo.webp',
      image: '/images/stakepvp_logo.webp',
      partner_logos: ['/images/privy_logo.webp', '/images/helius_logo.webp'],
    },
    {
      slug: 'passion-ice-baths',
      company: 'Passion Ice Baths',
      title_nl: 'Passion Ice Baths: AI SEO & Shopify App',
      title_en: 'Passion Ice Baths: AI SEO & Shopify App',
      preview_nl: 'Voor Passion Ice Baths, het merk van Wim Hof, schrijven wij SEO-geoptimaliseerde blogs op basis van GA4 en Search Console data. Daarnaast hebben we een eigen AI-model getraind op hun merkstijl en bouwen we momenteel een custom Shopify app.',
      preview_en: 'For Passion Ice Baths, the brand of Wim Hof, we write SEO-optimized blogs based on GA4 and Search Console data. We also trained a custom AI model on their brand style and are currently building a custom Shopify app.',
      description_nl: 'Passion Ice Baths, het merk waar Wim Hof aan verbonden is, kwam bij ons voor hulp met hun online vindbaarheid en digitale groeistrategie. We hebben SEO-geoptimaliseerde blogs geschreven op basis van GA4 data en Google Search Console data, waarmee we precies konden vaststellen welke zoekwoorden het meeste potentieel hadden en waar de grootste kansen lagen om organisch verkeer te laten groeien. Op basis van die data-analyse trainden we een eigen AI-model dat specifiek is afgestemd op hun merkstijl en doelgroep, zodat de gegenereerde content niet alleen technisch geoptimaliseerd is voor zoekmachines maar ook authentiek en herkenbaar aanvoelt voor hun community van koude-enthousiastelingen.\n\nDaarnaast zijn we momenteel een custom Shopify app aan het bouwen die hun e-commerce ervaring naar een hoger niveau tilt, met functies die specifiek zijn ontworpen voor hun productcategorie en klantbeleving. De combinatie van data-gedreven SEO, een op maat getraind AI-model en custom app-ontwikkeling maakt dit project een uitstekend voorbeeld van hoe wij merken helpen groeien door technologie en content naadloos te integreren.',
      description_en: 'Passion Ice Baths, the brand associated with Wim Hof, came to us for help with their online visibility and digital growth strategy. We wrote SEO-optimized blogs based on GA4 data and Google Search Console insights, enabling us to pinpoint exactly which keywords had the most potential and where the biggest opportunities lay to grow organic traffic. Based on that data analysis we trained a custom AI model specifically tailored to their brand style and target audience, ensuring that the generated content is not only technically optimized for search engines but also feels authentic and recognisable to their community of cold exposure enthusiasts.\n\nAdditionally, we are currently building a custom Shopify app that will take their e-commerce experience to the next level, with features specifically designed for their product category and customer journey. The combination of data-driven SEO, a custom-trained AI model and bespoke app development makes this project an excellent example of how we help brands grow by seamlessly integrating technology and content.',
      results_nl: ['AI SEO blogs', 'GA4 & Search Console', 'Shopify app'],
      results_en: ['AI SEO blogs', 'GA4 & Search Console', 'Shopify app'],
      detailed_results_nl: [
        { title: 'AI SEO', description: 'Blogs met GA4 & Search Console data', value: 'Geimplementeerd', color: '#10B981' },
        { title: 'Custom AI Model', description: 'Getraind op merkstijl', value: 'Operationeel', color: '#3B82F6' },
        { title: 'Shopify App', description: 'Custom app in ontwikkeling', value: 'In progress', color: '#8B5CF6' },
        { title: 'Wim Hof', description: 'Merk ambassadeur', value: 'Partnership', color: '#F59E0B' }
      ],
      detailed_results_en: [
        { title: 'AI SEO', description: 'Blogs with GA4 & Search Console data', value: 'Implemented', color: '#10B981' },
        { title: 'Custom AI Model', description: 'Trained on brand style', value: 'Operational', color: '#3B82F6' },
        { title: 'Shopify App', description: 'Custom app in development', value: 'In progress', color: '#8B5CF6' },
        { title: 'Wim Hof', description: 'Brand ambassador', value: 'Partnership', color: '#F59E0B' }
      ],
      logo: '/images/passion_icebaths_logo.webp',
      image: '/images/passion_icebaths.webp',
      partner_logos: [],
    },
  ];
}

seed().catch(() => process.exit(1));
