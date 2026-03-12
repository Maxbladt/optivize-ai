import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('nl');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    const bountyMessage = "If you found this value you deserve to get 15% off your first AI project. Good job. Call Maximilian Bladt at +31642698918 with code bounty-first-found to claim this.";
    if (!localStorage.getItem('bounty')) {
      localStorage.setItem('bounty', bountyMessage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'nl' ? 'en' : 'nl';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const translations = {
  nl: {
    nav: {
      home: 'Home',
      services: 'Diensten',
      cases: 'Cases',
      team: 'Team',
      contact: 'Contact'
    },
    hero: {
      headline: 'Transformeer je bedrijf met',
      subheadline: 'Wij stroomlijnen je processen, automatiseren terugkerend werk en helpen je sneller groeien met slimme AI-oplossingen die passen bij je organisatie.',
      callUs: 'Bel ons',
      contactUs: 'Vul het formulier in'
    },
    clientSlider: {
      title: 'Vertrouwd door vooruitstrevende bedrijven'
    },
    presentation: {
      title: 'Bewezen resultaten',
      description: 'Wij hebben bij 30+ organisaties AI geïntegreerd in processen en daarmee nieuwe omzetkansen én stevige kostenbesparingen gerealiseerd via intelligente automatisering. Je kunt gerust contact opnemen met onze klanten: sterke referenties zijn het beste bewijs van de resultaten die wij leveren.',
      stat1Number: '100+',
      stat1Label: 'Geautomatiseerde taken',
      stat2Number: '3M',
      stat2Label: 'Bespaard op loonkosten'
    },
    services: {
      title: 'Onze AI Oplossingen',
      subtitle: 'Klik op een dienst en ontdek hoe we dit aanpakken',
      howItWorks: 'Zo werkt het',
      items: [
        {
          id: 'ai-strategy',
          title: 'AI Presentatie',
          description: 'Neem je team mee in de nieuwste AI-trends en tools. We helpen je organisatie AI beter te begrijpen en gericht toe te passen met een presentatie en sessies op maat.',
          steps: [
            { title: 'Kick-off sessie', description: 'We brengen in kaart welke tijdrovende processen de efficiëntie drukken en waar teams vastlopen in terugkerend werk.', number: 1 },
            { title: 'Analyse & afstemming met management', description: 'Op basis van de kick-off analyseren we kansen en bespreken we de belangrijkste verbeterpunten met het management voordat we de presentatie geven.', number: 2 },
            { title: 'Presentatie op maat', description: 'We gaan in gesprek met het kernteam en bouwen draagvlak door kansen concreet te maken. Het uitgangspunt: AI helpt mensen sneller en slimmer te werken, niet om ze te vervangen.', number: 3 },
            { title: 'Afdelingssessies', description: 'Per afdeling duiken we in de specifieke werkwijze en identificeren we kansen om stappen te automatiseren met AI of direct toepasbare tools te introduceren.', number: 4 },
            { title: 'Praktische handleiding', description: 'We bundelen alle inzichten in een duidelijke handleiding: hoe je ChatGPT veilig en effectief inzet, hoe je custom GPT\'s traint voor specifieke taken en welke kansen er nog liggen.', number: 5 },
            { title: 'Opvolging', description: 'Na ongeveer een maand plannen we een follow-up om de winst te evalueren, vragen te beantwoorden en verdere optimalisaties door te voeren.', number: 6 }
          ]
        },
        {
          id: 'email-ai',
          title: 'AI Mail Agent',
          description: 'Een AI-e-mailassistent die antwoorden voorstelt (of desgewenst automatisch verstuurt), getraind op je historische e-mails zodat toon, stijl en beslislogica aansluiten bij jou.',
          steps: [
            { title: 'E-mails verzamelen', description: 'Voor training gebruiken we je historische e-mails, zodat het model je communicatiestijl leert en antwoorden kan genereren die aanvoelen alsof je ze zelf schreef.', number: 1 },
            { title: 'Data opschonen & structureren', description: 'We verwijderen ruis (handtekeningen, opmaak, herhalingen) en zetten de data om naar heldere vraag-antwoordparen (JSON), klaar voor training.', number: 2 },
            { title: 'Model trainen', description: 'We fine-tunen een GPT-model op je patronen, vocabulaire en antwoordstijl, zodat het consistent e-mails opstelt in je tone of voice.', number: 3 },
            { title: 'Valideren', description: 'We testen het model op nieuwe, realistische e-mails om te controleren of de antwoorden kloppen, professioneel blijven en je toon goed benaderen.', number: 4 },
            { title: 'In gebruik nemen', description: 'Via een lichte integratie met Outlook, Gmail of andere clients leest het model de thread en stelt een conceptantwoord voor. Je aanpassingen maken het model steeds beter en besparen tijd.', number: 5 }
          ]
        },
        {
          id: 'product-text',
          title: 'AI Producttekstschrijver',
          description: 'AI-gestuurde producttekstoptimalisatie die beschrijvingen herschrijft naar meer overtuigende, SEO-vriendelijke teksten, met behoud van je merkstem, overal waar je publiceert.',
          steps: [
            { title: 'Productteksten verzamelen', description: 'We verzamelen je huidige productteksten en exporteren ze naar een CSV (Excel-formaat). Zo hebben we één overzicht en kunnen we alles consistent verbeteren, ongeacht of je Shopify, WooCommerce of een maatwerkplatform gebruikt.', number: 1 },
            { title: 'Model trainen op je merkstem', description: 'We trainen het model op teksten die zijn afgestemd op je tone of voice. Daardoor klinkt elke nieuwe of herschreven productbeschrijving als “je merk”.', number: 2 },
            { title: 'Herschrijven & optimaliseren', description: 'Met het getrainde model herschrijven we alle productteksten: helderder, aantrekkelijker en meer gericht op conversie, zonder je stijl te verliezen. Je ontvangt alles in een bestand om te reviewen.', number: 3 },
            { title: 'SEO verrijken', description: 'We analyseren zoekgedrag (o.a. seizoenspatronen) en verwerken relevante keywords natuurlijk in de tekst. Zo verbeteren vindbaarheid en organisch verkeer, het hele jaar door.', number: 4 },
            { title: 'Review & live zetten', description: 'Je team kan de nieuwe teksten controleren. Na akkoord helpen we met het terugplaatsen in je systeem en zorgen we voor een soepele implementatie.', number: 5 }
          ]
        },
        {
          id: 'blog-writer',
          title: 'AI Blogschrijver',
          description: 'Geautomatiseerde SEO-blogcreatie waarmee je concurreert op waardevolle zoekwoorden en advertentiekosten verlaagt via slimme content en automatische publicatie.',
          steps: [
            { title: 'Concurrentieonderzoek', description: 'We analyseren welke zoekwoorden concurrenten targeten (bijv. via Ahrefs) en waar kansen liggen om relevanter te worden voor Google.', number: 1 },
            { title: 'Zoekwoorden kiezen', description: 'We selecteren zoekwoorden die je nu veel geld kosten in SEA. Door hier organisch op te ranken, kun je budget verschuiven naar goedkopere, minder competitieve campagnes.', number: 2 },
            { title: 'Model afstemmen', description: 'We fine-tunen een model op je merk en branche, zodat de content natuurlijk leest én je keywords op een geloofwaardige manier verwerkt.', number: 3 },
            { title: 'AI-SEO aanpak', description: 'We richten content zo in dat deze ook goed kan verschijnen in AI-samenvattingen en featured snippets. Daarvoor passen we structuur en formuleringen strategisch toe.', number: 4 },
            { title: 'Automatisch publiceren', description: 'We koppelen een auto-publish flow aan je platform (maatwerk, Shopify, WordPress of WooCommerce) en publiceren volgens een strategische planning, volledig geautomatiseerd.', number: 5 }
          ]
        },
        {
          id: 'linkedin-automation',
          title: 'AI LinkedIn Sales Bot',
          description: 'Een volledig geautomatiseerd LinkedIn-sales systeem dat prospects vindt, gepersonaliseerde campagnes uitrolt en connecties helpt omzetten naar klanten.',
          steps: [
            { title: 'Prospects bepalen', description: 'We definiëren en vinden je ideale doelgroep op LinkedIn met slimme filters en AI-analyse (bedrijfsgrootte, functietitel, branche, engagement).', number: 1 },
            { title: 'Campagnes & hooks', description: 'We bouwen meerdere benaderingen (bijv. waardevolle PDF, intake/consult, of directe pitch) en testen hooks die reacties uitlokken.', number: 2 },
            { title: 'LLM trainen op je stijl', description: 'We trainen een model op je eerdere gesprekken, zodat berichten persoonlijk, consistent en herkenbaar blijven in je tone of voice.', number: 3 },
            { title: 'Automatisch uitvoeren & optimaliseren', description: 'Het systeem draait campagnes en stuurt bij op basis van data (acceptatie, opens, replies). Zo verbeteren resultaten continu zonder extra handwerk.', number: 4 },
            { title: 'Multi-channel opvolging', description: 'We koppelen LinkedIn aan e-mail opvolging en tracken de klantreis van connectie tot klant, met inzicht in conversies en ROI.', number: 5 }
          ]
        },
        {
          id: 'chatbot',
          title: 'AI Chatbot',
          description: 'Een AI-chatbot die is getraind op je gesprekken en daardoor je toon en service-stijl overneemt. Optioneel met “personal shopper” functies voor webshops.',
          steps: [
            { title: 'Data verzamelen & analyseren', description: 'We verzamelen historische gesprekken (e-mail, chat, calls, tickets, social) en analyseren patronen: vragen, oplossingen, tone of voice en service-standaarden.', number: 1 },
            { title: 'Tone of voice in kaart', description: 'Met NLP leggen we vast hoe je reageert in verschillende situaties en welke formuleringen het beste werken, zodat de bot natuurlijk en passend klinkt.', number: 2 },
            { title: 'Model trainen & testen', description: 'We fine-tunen het taalmodel op je data en testen het met realistische scenario\'s tot de kwaliteit en consistentie klopt.', number: 3 },
            { title: 'Personal shopper (optioneel)', description: 'Voor webshops voegen we een assistent toe die op basis van voorkeuren en context producten adviseert en combinaties voorstelt.', number: 4 },
            { title: 'Integreren in je kanalen', description: 'We plaatsen de chatbot op je website en andere kanalen (bijv. Shopify en social), inclusief slimme “handoff” naar een medewerker wanneer nodig.', number: 5 },
            { title: 'Doorlopend verbeteren', description: 'De bot leert bij op basis van feedback, uitkomsten en conversies, zodat prestaties en klanttevredenheid blijven stijgen.', number: 6 }
          ]
        },
        {
          id: 'featured-snippets',
          title: 'AI SEO Integratie',
          description: 'Optimalisatie voor Google\'s AI-resultaten, zodat je content vaker wordt opgenomen in AI-samenvattingen en featured snippets.',
          steps: [
            { title: 'AI-algoritme analyseren', description: 'We onderzoeken welke signalen Google\'s AI gebruikt om bronnen te selecteren voor samenvattingen en snippets, zodat we gericht kunnen optimaliseren.', number: 1 },
            { title: 'Vragen & intent in kaart', description: 'We brengen de belangrijkste vragen en zoekintenties van je doelgroep in kaart. Precies daar waar je oplossing waarde toevoegt.', number: 2 },
            { title: 'Contentstructuur op autoriteit', description: 'We bouwen een contentaanpak die je positioneert als duidelijke bron, met heldere antwoorden en logische structuur die AI goed kan citeren.', number: 3 },
            { title: 'Meta & schema optimaliseren', description: 'We optimaliseren meta-descriptions, headers en structured data zodat je content eenvoudiger te begrijpen en te gebruiken is voor AI-extractie.', number: 4 },
            { title: 'Concurrenten verdringen', description: 'We analyseren wie nu in AI-resultaten staat en maken een plan om die posities over te nemen met betere, relevantere content.', number: 5 },
            { title: 'Citeerbare quotes ontwerpen', description: 'We schrijven passages die natuurlijk te citeren zijn, zodat Google\'s AI je merk als bron kan toeschrijven.', number: 6 },
            { title: 'Meten & opschalen', description: 'We monitoren prestaties (snippets, AI-citations, CTR) en schalen wat werkt naar meer onderwerpen en zoekclusters.', number: 7 }
          ]
        }
      ]
    },
    cases: {
      title: 'Succesverhalen',
      subtitle: 'Echte veranderingen, meetbare resultaten. Bekijk hoe we organisaties in uiteenlopende sectoren hebben geholpen.',
      viewFullCase: 'Bekijk de volledige case'
    },
    team: {
      title: 'Maak kennis met je AI-innovatiepartners',
      members: [
        { name: 'Maximilian Bladt', title: 'Chief Executive Officer', bio: 'Na zijn rol als Head of AI Implementation bij Elevate Digital was Optivaize de logische volgende stap: bedrijven zonder belemmeringen van A tot Z helpen met AI. Maximilian bouwt pragmatische AI-oplossingen, traint taalmodellen op taken die omzet verhogen en kosten verlagen en leidt een groeiend internationaal team aan de top van AI-ontwikkeling. Hij gelooft dat mensen die AI goed inzetten een ongrijpbare voorsprong krijgen op wie dat niet doet.', skills: ['Strategie', 'Leiderschap', 'AI Engineering', 'Cloudarchitectuur'] },
        { name: 'Geronimo Saija', title: 'Head of Operations', bio: 'Geronimo combineert strategisch denken met sterke uitvoering en houdt als Head of Operations de dagelijkse motor van Optivaize draaiend. Daarnaast is hij een ervaren prompt engineer die AI-modellen aanstuurt en optimaliseert voor klantprojecten. Van go-to-market strategie tot performance marketing en het verfijnen van prompts: zijn focus ligt op het vertalen van Optivaize\'s geavanceerde AI-technologie naar overtuigende verhalen die klanten bewegen en naar systemen die daadwerkelijk resultaat opleveren. Hij gelooft dat echte AI-transformatie pas ontstaat wanneer technologie en organisatie even sterk zijn.', skills: ['Operations', 'Prompt Engineering', 'Groeistrategie', 'Marketing'] },
        { name: 'Willem Bladt', title: 'Head of Finance', bio: 'Willem bewaakt de financiële gezondheid en schaalbaarheid van Optivaize. Met een scherp oog voor cijfers en structuur zorgt hij dat de snelle groei van het bedrijf wordt ondersteund door een solide financiële basis. Van investeerdersrelaties tot budgetbeheer en financial planning: Willem geeft Optivaize de ruggengraat om ambitieuze AI-projecten verantwoord te kunnen opschalen.', skills: ['Finance', 'Budgetbeheer', 'Investeerdersrelaties', 'Financiële planning'] }
      ]
    },
    footer: {
      tagline: '"Optimize What Matters"',
      email: 'info@optivaize.nl',
      emailLabel: 'Algemene vragen',
      phone: '+31 6 42698918',
      phoneLabel: 'Openingstijden: 9:00 - 18:00 CET',
      address: 'Groenekanseweg 70, De Bilt',
      addressDetail: '3732AG, Nederland',
      ctaTitle: 'Klaar om je bedrijf te transformeren?',
      ctaSubtitle: 'Bel ons direct of vul het contactformulier in',
      callUs: 'Bel ons: +31 6 42698918',
      fillForm: 'Vul het formulier in',
      copyright: '© 2026 Optivaize. Alle rechten voorbehouden. • Optimize What Matters.',
      privacyPolicy: 'Privacybeleid',
      termsOfService: 'Algemene voorwaarden',
      cookiePolicy: 'Cookiebeleid'
    },
    bedankt: {
      title: 'voor je bericht!',
      subtitle: 'Wij hebben je aanvraag ontvangen en nemen zo snel mogelijk contact met je op. Meestal binnen 24 uur.',
      directContact: 'Direct contact?',
      callUs: 'Bel ons: +31 6 42698918',
      linkedin: 'Geronimo op LinkedIn',
      email: 'Stuur een e-mail',
      backHome: 'Terug naar Home',
      geronimo: {
        name: 'Geronimo S.',
        role: 'Head of Operations | Prompt Engineer'
      },
      team: {
        geronimo: 'Head of Operations | Prompt Engineer',
        max: 'CEO',
        filip: 'AI & Data Science'
      }
    }
  },
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      cases: 'Cases',
      team: 'Team',
      contact: 'Contact'
    },
    hero: {
      headline: 'Transform your business with',
      subheadline: 'We optimize your operations, automate your workflows, and accelerate your growth with cutting-edge AI technology tailored to your business needs.',
      callUs: 'Call Us',
      contactUs: 'Fill in the Form'
    },
    clientSlider: {
      title: 'Trusted by forward-thinking companies'
    },
    presentation: {
      title: 'Proven Track Record of Success',
      description: 'We\'ve worked with over 30+ companies, integrating AI into their processes and creating massive revenue streams and cost reductions through intelligent automation. We welcome you to contact our clients as strong references are the best proof of the results we deliver.',
      stat1Number: '100+',
      stat1Label: 'Automated Jobs',
      stat2Number: '3M',
      stat2Label: 'Saved in Wages'
    },
    services: {
      title: 'Our AI Solutions',
      subtitle: 'Click to explore how each service transforms your business',
      howItWorks: 'How it Works',
      items: [
        {
          id: 'ai-strategy',
          title: 'AI Presentation',
          description: 'Onboard your team with the latest AI trends and tools. We help your organization understand and implement AI efficiently through tailored presentations and sessions.',
          steps: [
            { title: 'Initial Session', description: 'We sit and discuss the time-consuming processes that are bringing back efficiency and having people work their absolute best.', number: 1 },
            { title: 'Analysis & Management Discussion', description: 'From this initial session we analyze and look for opportunities where you could improve before doing the presentation and discuss them with management.', number: 2 },
            { title: 'Tailored Presentation', description: 'We sit with the core team of the company for an open conversation, looking for opportunities while listening. Creating alignment by having the stakeholders "the people working" feel like it is gonna help them work more efficiently and not replace them.', number: 3 },
            { title: 'Department Breakout Sessions', description: 'With each different department, we conduct breakout sessions where we examine their specific processes and identify opportunities to automate them using AI or introduce tools they can start using directly.', number: 4 },
            { title: 'Full Guide Creation', description: 'A comprehensive guide is made together with all the insights we discussed, including how to use ChatGPT within an organization, how to train custom GPTs for specific tasks, and more AI opportunities.', number: 5 },
            { title: 'Follow Up', description: 'Only following up is the best way to make sure people keep using AI efficiently. That is why we recommend doing after 1 month another session where we discuss the gains and also the points where we can improve.', number: 6 }
          ]
        },
        {
          id: 'email-ai',
          title: 'AI Mail Agent',
          description: 'AI email assistant that suggests or automatically sends replies trained on your historic email data to match your personal writing style and decision patterns.',
          steps: [
            { title: 'Email Collection', description: 'For training the AI model, we need to have access to your emails so the model can learn your unique communication style and make responses which feel like you wrote them. We collect and scrape your historical emails to understand your tone, language patterns, and decision-making process.', number: 1 },
            { title: 'Data Processing', description: 'We clean the emails using advanced string manipulation techniques to remove clutter, signatures, and unnecessary formatting. This ensures responses are clean and the data is properly structured into clear request-response pairs (JSON format), making it ready to be trained by the AI model (LLM).', number: 2 },
            { title: 'Model Training', description: 'We fine-tune a GPT model like ChatGPT to talk and behave exactly the same as you would communicate. By training on your specific email patterns, vocabulary, and response style, the AI learns to generate emails that feel personal and authentically from you.', number: 3 },
            { title: 'Validation', description: 'We need to test the model to ensure it\'s performing well, so we validate it against new emails in your inbox. This testing phase ensures the AI generates accurate responses that match your tone and maintains professional quality before going live.', number: 4 },
            { title: 'Using Your AI Email Companion', description: 'The most efficient way to use your AI model is through a lightweight app that integrates seamlessly with Outlook, Gmail, or other email clients. When someone sends you an email, the model automatically reads the email chain and suggests a response for you to send. If you modify the suggestion, the model becomes even smarter and saves you significant time.', number: 5 }
          ]
        },
        {
          id: 'product-text',
          title: 'AI Product Text Writer',
          description: 'AI-powered product text optimization that rewrites descriptions to be more engaging and SEO-optimized while maintaining your brand voice across all platforms.',
          steps: [
            { title: 'Product Collection', description: 'First, we collect all your existing product texts and export them into a CSV file (Excel-type format). This gives us a complete overview of your current product descriptions and allows us to transform them systematically. We handle the technical extraction process for you, whether it\'s from Shopify, WooCommerce, or custom e-commerce platforms.', number: 1 },
            { title: 'AI Model Training', description: 'We train an AI model specifically on product texts that have been manually refined to match your brand voice and style. This means the AI learns to write like your brand, understanding your tone, vocabulary, and messaging approach. When the model rewrites your old text or creates new descriptions, it feels authentically like your brand created them.', number: 2 },
            { title: 'Text Transformation', description: 'Using the trained AI model, we transform all your existing product texts into improved, optimized versions. The AI rewrites each description to be more engaging, clear, and conversion-focused while maintaining your brand\'s unique voice. We provide the updated texts in a file format that you can review before implementation.', number: 3 },
            { title: 'SEO Optimization', description: 'SEO is crucial for product visibility, and AI SEO (stay tuned if you\'re unfamiliar with this concept) is becoming increasingly important for Google rankings. We analyze seasonality patterns in how people search for your products and automatically integrate high-value keywords into the AI-generated texts. This ensures your products rank higher in search results and attract more organic traffic throughout the year.', number: 4 },
            { title: 'Review & Integration', description: 'Before going live, we provide you with the complete file of new product texts for manual review by your team. Once approved, we assist you fully in uploading the optimized texts back into your system. We have extensive experience working with various platforms including Shopify, WooCommerce, and custom e-commerce solutions, ensuring seamless integration regardless of your setup.', number: 5 }
          ]
        },
        {
          id: 'blog-writer',
          title: 'AI Blog Writer',
          description: 'Automated SEO blog creation that targets competitor keywords and reduces advertising costs through strategic content and automated publishing.',
          steps: [
            { title: 'Competitor Analysis', description: 'We start by analyzing your competitors\' keyword strategies using advanced tools like Ahrefs. By indexing and understanding which keywords your competitors are ranking for and investing in, we can identify opportunities to make your content more relevant to Google\'s algorithm. This competitive intelligence forms the foundation of our content strategy, ensuring we target the same valuable search terms that are driving traffic to your competitors.', number: 1 },
            { title: 'Keyword Selection', description: 'Using sophisticated AI models, we identify high-value keywords that are currently costing you significant money in your SEA (Google Ads) campaigns. Instead of continuing to pay premium prices for these expensive keywords in advertising, we strategically write blog content targeting these costly terms. This allows you to optimize your content for the expensive keywords while shifting your paid advertising budget to cheaper, less competitive terms - maximizing your overall marketing ROI.', number: 2 },
            { title: 'AI Model Training', description: 'We fine-tune a specialized AI model specifically for your brand and industry. This involves training the AI to seamlessly integrate your target keywords into naturally flowing, engaging content that reads authentically and provides real value to your audience. The model learns your brand voice, tone, and messaging style while mastering the art of creating keyword-rich content that doesn\'t feel forced or robotic - ensuring both search engines and human readers find your content compelling.', number: 3 },
            { title: 'AI SEO Integration', description: 'AI SEO represents the next frontier in search optimization, as Google increasingly uses AI to generate content summaries and featured snippets. We\'ve researched Google\'s AI content processing methods and developed strategic techniques to ensure your content appears prominently in these AI-generated results. By structuring your content to align with how Google\'s AI interprets and summarizes information, we position your blogs to show up first in AI-powered search features, giving you a significant competitive advantage.', number: 4 },
            { title: 'Automated Publishing', description: 'We implement comprehensive auto-publishing systems that work seamlessly across various platforms including custom websites, Shopify, WordPress, and WooCommerce. Our automated system publishes your optimized blog content on a strategic schedule, ensuring consistent content flow without manual intervention. We handle all the technical integration, from API connections to content management system plugins, making the entire process completely hands-off for your team while maintaining full control over timing and frequency.', number: 5 }
          ]
        },
        {
          id: 'linkedin-automation',
          title: 'AI Linkedin Sales Bot',
          description: 'Fully automated LinkedIn sales system that identifies prospects, creates personalized campaigns, and converts connections into customers using AI.',
          steps: [
            { title: 'Target Audience Research', description: 'We begin by identifying your ideal prospects on LinkedIn using advanced search parameters and AI-powered analysis. Our system analyzes company sizes, job titles, industries, and engagement patterns to build comprehensive prospect lists. We research their pain points, interests, and business challenges to create highly targeted outreach strategies that resonate with your specific audience segments.', number: 1 },
            { title: 'Campaign Strategy & Hook Development', description: 'Our team creates compelling campaign strategies tailored to your target audience. We develop multiple sales approaches including free PDF offers, consultation bookings, and direct sales pitches. Each campaign features carefully crafted hooks designed to capture attention and drive engagement. We analyze what resonates with your prospects and create diverse touchpoints to maximize conversion opportunities.', number: 2 },
            { title: 'Custom LLM Training', description: 'We train a custom Large Language Model specifically on your previous LinkedIn messages, sales conversations, and communication style. The AI learns your unique voice, tone, and successful messaging patterns to create authentic, personalized outreach that sounds genuinely human. This ensures every message maintains your brand personality while scaling your outreach exponentially.', number: 3 },
            { title: 'Automated Campaign Execution & Optimization', description: 'Our platform launches your campaigns and continuously optimizes performance using real-time data. We monitor connection request acceptance rates, message open rates, and response rates, then fine-tune the AI model to maximize each metric. The system automatically adjusts messaging, timing, and approach based on performance data to drive the highest conversion rates possible.', number: 4 },
            { title: 'Multi-Channel Integration & Sales Tracking', description: 'We expand successful LinkedIn connections to email marketing and create comprehensive follow-up sequences across multiple channels. Our integrated platform tracks the entire customer journey from initial LinkedIn connection to final sale, providing detailed analytics on conversion rates, revenue generated, and ROI. The system automatically creates new campaigns based on successful patterns and continuously scales your sales pipeline.', number: 5 }
          ]
        },
        {
          id: 'chatbot',
          title: 'AI Chatbot',
          description: 'AI chatbot trained on your conversations to replicate your tone and service style, with optional personal shopping features for e-commerce stores.',
          steps: [
            { title: 'Historical Data Collection & Analysis', description: 'We begin by gathering all your historical client conversations from multiple sources including email threads, live chat logs, phone call transcripts, support tickets, and social media interactions. Our AI analyzes thousands of these conversations to understand your unique communication style, common customer questions, problem-solving approaches, and brand voice. This deep analysis ensures the chatbot will respond exactly as your best customer service representatives would, maintaining the personal touch your customers expect.', number: 1 },
            { title: 'Conversation Pattern & Tone Analysis', description: 'Using advanced Natural Language Processing, we map your conversation patterns, identify your preferred responses to specific situations, and analyze the emotional tone of successful interactions. The AI learns your brand\'s personality traits, whether you\'re friendly and casual, professional and formal, or somewhere in between. We also identify your go-to phrases, problem resolution strategies, and the specific language that converts prospects into customers, ensuring authentic conversations.', number: 2 },
            { title: 'Custom Model Training & Validation', description: 'We fine-tune a specialized language model using your conversation data to create a chatbot that thinks and responds like your team. The model undergoes rigorous testing with real conversation scenarios to ensure accuracy, appropriate responses, and brand consistency. We validate the chatbot\'s performance against your historical successful interactions and continuously refine its responses until it achieves human-like conversation quality that matches your established customer service standards.', number: 3 },
            { title: 'E-commerce Personal Shopping Integration (Optional)', description: 'For online stores, we integrate an AI personal shopping assistant that analyzes customer preferences, browsing history, and conversation context to provide personalized product recommendations. The AI can suggest outfit combinations, recommend complementary items, help with sizing questions, and even create styled looks based on customer preferences. It presents recommendations in beautifully formatted cards with images, descriptions, and direct purchase links, significantly increasing average order value.', number: 4 },
            { title: 'Seamless Platform Integration', description: 'We deploy your custom chatbot across all your customer touchpoints including your website, Shopify store, social media platforms, and mobile apps. The integration includes a sophisticated handoff system that seamlessly transfers complex queries to human agents when needed, complete with full conversation context. The chatbot maintains consistent personality and knowledge across all platforms while adapting to each platform\'s unique interface and user behavior patterns.', number: 5 },
            { title: 'Continuous Learning & Optimization', description: 'The chatbot continuously improves through machine learning, analyzing customer feedback, successful conversation outcomes, and conversion rates. We implement a feedback system where customers can rate interactions, and the AI learns from both positive and negative responses. Regular performance reports show conversation success rates, customer satisfaction scores, and areas for improvement. The system automatically updates its knowledge base with new products, policies, and frequently asked questions.', number: 6 }
          ]
        },
        {
          id: 'featured-snippets',
          title: 'AI SEO Intergration',
          description: 'Reverse-engineered Google AI algorithm optimization that ensures your content gets featured prominently in AI-generated search summaries and featured snippets.',
          steps: [
            { title: 'AI Algorithm Analysis & Ranking Factor Discovery', description: 'We conduct deep analysis of Google\'s AI content selection algorithm to understand exactly what signals determine which sources get featured in AI-generated summaries. This includes studying content structure patterns, authority signals, semantic relevance markers, and citation preferences that Google\'s AI prioritizes. We reverse-engineer the specific formatting, keyword density, and content architecture that consistently gets selected for featured snippets across your industry, creating a blueprint for guaranteed inclusion.', number: 1 },
            { title: 'Strategic Question & Intent Mapping', description: 'We identify the exact questions and search intents your target audience uses when they have problems your product solves. This goes beyond basic keyword research to understand the complete customer journey - from initial problem awareness to solution comparison. We map out question variations, related searches, and semantic clusters that trigger AI summaries, ensuring we target every possible entry point where prospects might discover your solution through Google\'s AI responses.', number: 2 },
            { title: 'Authority-Based Content Architecture Development', description: 'We create a comprehensive content strategy that positions your company as the definitive expert source. This includes developing authoritative blog posts, detailed solution guides, FAQ sections, and case studies that directly answer your target questions with your company\'s methodology. Each piece is structured using the exact format patterns that Google\'s AI prefers for featured snippets, with clear problem-solution frameworks that naturally lead to your product as the recommended solution.', number: 3 },
            { title: 'Meta Description & Schema Optimization for AI Extraction', description: 'We optimize all meta descriptions, headers, and structured data markup to maximize the chances of your content being selected and quoted by Google\'s AI. This includes implementing specific schema markup that helps Google understand your content\'s authority and relevance, crafting meta descriptions that serve as perfect snippet candidates, and structuring page content with clear, quotable statements that AI systems can easily extract and attribute to your company.', number: 4 },
            { title: 'Competitive Displacement & Position Hijacking', description: 'We analyze which competitors currently appear in AI summaries for your target keywords and develop strategies to displace them. This involves creating superior content that better answers the target questions, building stronger authority signals, and optimizing for the specific content patterns that outrank existing featured snippets. We systematically target and replace competitor mentions in AI responses with your company\'s content and recommendations.', number: 5 },
            { title: 'AI Attribution & Quote Engineering', description: 'We craft content specifically designed to generate natural, quotable statements that Google\'s AI will attribute to your company. This includes developing signature methodologies, memorable frameworks, and authoritative recommendations that AI systems can easily cite. When prospects search for solutions, they\'ll consistently see phrases like "<your company> recommends this approach" or "<your company> suggests this solution" in Google\'s AI-generated responses, establishing your brand as the trusted authority.', number: 6 },
            { title: 'Performance Monitoring & Snippet Domination Scaling', description: 'We continuously monitor your featured snippet performance, tracking which content pieces are being selected by Google\'s AI and how often your company is being cited in search results. We measure click-through rates from AI snippets, brand mention frequency, and conversion rates from AI-driven traffic. Based on performance data, we scale successful content patterns and expand to capture more AI summary real estate across related keywords and topics.', number: 7 }
          ]
        }
      ]
    },
    cases: {
      title: 'Success Stories',
      subtitle: 'Real transformations, real results. See how we\'ve revolutionized businesses across industries.',
      viewFullCase: 'View Full Case Study',
    },
    team: {
      title: 'Meet Your AI Innovation Partners',
      members: [
        { name: 'Maximilian Bladt', title: 'Chief Executive Officer', bio: 'After his role as Head of AI Implementation at Elevate Digital, founding Optivaize was the logical next step, helping companies fully transform with AI, without barriers. Maximilian builds pragmatic AI solutions, trains language models on tasks that drive revenue and cut costs, and leads a growing international team at the frontier of what AI can do. He believes people who master AI gain an insurmountable edge over those who don\'t.', skills: ['Strategy', 'Leadership', 'AI Engineering', 'Cloud Architecture'] },
        { name: 'Geronimo Saija', title: 'Head of Operations', bio: 'Geronimo combines strategic thinking with strong execution and keeps the daily engine of Optivaize running smoothly as Head of Operations. He is also a skilled prompt engineer who fine-tunes and orchestrates AI models for client projects. From go-to-market strategy to performance marketing and prompt optimization, his focus is on translating Optivaize\'s cutting-edge AI technology into compelling stories that move clients to act and into systems that deliver real results. He believes real AI transformation happens when technology and organisation are equally strong.', skills: ['Operations', 'Prompt Engineering', 'Growth Strategy', 'Marketing'] },
        { name: 'Willem Bladt', title: 'Head of Finance', bio: 'Willem safeguards the financial health and scalability of Optivaize. With a sharp eye for numbers and structure, he ensures the company\'s rapid growth is supported by a solid financial foundation. From investor relations to budget management and financial planning, Willem gives Optivaize the backbone to scale ambitious AI projects responsibly and sustainably.', skills: ['Finance', 'Budget Management', 'Investor Relations', 'Financial Planning'] }
      ]
    },
    footer: {
      tagline: '"Optimize What Matters"',
      email: 'info@optivaize.nl',
      emailLabel: 'General Inquiries',
      phone: '+31 6 42698918',
      phoneLabel: 'Business Hours: 9AM - 6PM CET',
      address: 'Groenekanseweg 70, De Bilt',
      addressDetail: '3732AG, Netherlands',
      ctaTitle: 'Ready to transform your business?',
      ctaSubtitle: 'Call us directly or fill in the contact form',
      callUs: 'Call Us: +31 6 42698918',
      fillForm: 'Fill in the Form',
      copyright: '© 2026 Optivaize. All rights reserved. • Optimize What Matters.',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      cookiePolicy: 'Cookie Policy'
    },
    bedankt: {
      title: 'for your message!',
      subtitle: 'We have received your request and will contact you as soon as possible. Usually within 24 hours.',
      directContact: 'Direct contact?',
      callUs: 'Call Us: +31 6 42698918',
      linkedin: 'Geronimo on LinkedIn',
      email: 'Send an Email',
      backHome: 'Back to Home',
      geronimo: {
        name: 'Geronimo S.',
        role: 'Head of Operations | Prompt Engineer'
      },
      team: {
        geronimo: 'Head of Operations | Prompt Engineer',
        max: 'CEO',
        filip: 'AI & Data Science'
      }
    }
  }
};
