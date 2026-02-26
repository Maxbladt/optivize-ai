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
      headline: 'Transformeer uw bedrijf met',
      subheadline: 'Wij stroomlijnen uw processen, automatiseren terugkerend werk en helpen u sneller groeien met slimme AI-oplossingen die passen bij uw organisatie.',
      callUs: 'Bel ons',
      contactUs: 'Vul het formulier in'
    },
    clientSlider: {
      title: 'Vertrouwd door vooruitstrevende bedrijven'
    },
    presentation: {
      title: 'Bewezen resultaten',
      description: 'Wij hebben bij 30+ organisaties AI geïntegreerd in processen en daarmee nieuwe omzetkansen én stevige kostenbesparingen gerealiseerd via intelligente automatisering. U kunt gerust contact opnemen met onze klanten: sterke referenties zijn het beste bewijs van de resultaten die wij leveren.',
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
          description: 'Neem uw team mee in de nieuwste AI-trends en tools. We helpen uw organisatie AI beter te begrijpen en gericht toe te passen met een presentatie en sessies op maat.',
          steps: [
            { title: 'Kick-off sessie', description: 'We brengen in kaart welke tijdrovende processen de efficiëntie drukken en waar teams vastlopen in terugkerend werk.', number: 1 },
            { title: 'Analyse & afstemming met management', description: 'Op basis van de kick-off analyseren we kansen en bespreken we de belangrijkste verbeterpunten met het management voordat we de presentatie geven.', number: 2 },
            { title: 'Presentatie op maat', description: 'We gaan in gesprek met het kernteam en bouwen draagvlak door kansen concreet te maken. Het uitgangspunt: AI helpt mensen sneller en slimmer te werken, niet om ze te vervangen.', number: 3 },
            { title: 'Afdelingssessies', description: 'Per afdeling duiken we in de specifieke werkwijze en identificeren we kansen om stappen te automatiseren met AI of direct toepasbare tools te introduceren.', number: 4 },
            { title: 'Praktische handleiding', description: 'We bundelen alle inzichten in een duidelijke handleiding: hoe u ChatGPT veilig en effectief inzet, hoe u custom GPT\'s traint voor specifieke taken en welke kansen er nog liggen.', number: 5 },
            { title: 'Opvolging', description: 'Na ongeveer een maand plannen we een follow-up om de winst te evalueren, vragen te beantwoorden en verdere optimalisaties door te voeren.', number: 6 }
          ]
        },
        {
          id: 'email-ai',
          title: 'AI Mail Agent',
          description: 'Een AI‑e-mailassistent die antwoorden voorstelt (of desgewenst automatisch verstuurt), getraind op uw historische e-mails zodat toon, stijl en beslislogica aansluiten bij u.',
          steps: [
            { title: 'E-mails verzamelen', description: 'Voor training gebruiken we uw historische e-mails, zodat het model uw communicatiestijl leert en antwoorden kan genereren die aanvoelen alsof u ze zelf schreef.', number: 1 },
            { title: 'Data opschonen & structureren', description: 'We verwijderen ruis (handtekeningen, opmaak, herhalingen) en zetten de data om naar heldere vraag‑antwoordparen (JSON), klaar voor training.', number: 2 },
            { title: 'Model trainen', description: 'We fine‑tunen een GPT‑model op uw patronen, vocabulaire en antwoordstijl, zodat het consistent e-mails opstelt in uw tone of voice.', number: 3 },
            { title: 'Valideren', description: 'We testen het model op nieuwe, realistische e-mails om te controleren of de antwoorden kloppen, professioneel blijven en uw toon goed benaderen.', number: 4 },
            { title: 'In gebruik nemen', description: 'Via een lichte integratie met Outlook, Gmail of andere clients leest het model de thread en stelt een conceptantwoord voor. Uw aanpassingen maken het model steeds beter en besparen tijd.', number: 5 }
          ]
        },
        {
          id: 'product-text',
          title: 'AI Producttekstschrijver',
          description: 'AI‑gestuurde producttekstoptimalisatie die beschrijvingen herschrijft naar meer overtuigende, SEO‑vriendelijke teksten — met behoud van uw merkstem, overal waar u publiceert.',
          steps: [
            { title: 'Productteksten verzamelen', description: 'We verzamelen uw huidige productteksten en exporteren ze naar een CSV (Excel‑formaat). Zo hebben we één overzicht en kunnen we alles consistent verbeteren, ongeacht of u Shopify, WooCommerce of een maatwerkplatform gebruikt.', number: 1 },
            { title: 'Model trainen op uw merkstem', description: 'We trainen het model op teksten die zijn afgestemd op uw tone of voice. Daardoor klinkt elke nieuwe of herschreven productbeschrijving als “uw merk”.', number: 2 },
            { title: 'Herschrijven & optimaliseren', description: 'Met het getrainde model herschrijven we alle productteksten: helderder, aantrekkelijker en meer gericht op conversie, zonder uw stijl te verliezen. U ontvangt alles in een bestand om te reviewen.', number: 3 },
            { title: 'SEO verrijken', description: 'We analyseren zoekgedrag (o.a. seizoenspatronen) en verwerken relevante keywords natuurlijk in de tekst. Zo verbeteren vindbaarheid en organisch verkeer, het hele jaar door.', number: 4 },
            { title: 'Review & live zetten', description: 'Uw team kan de nieuwe teksten controleren. Na akkoord helpen we met het terugplaatsen in uw systeem en zorgen we voor een soepele implementatie.', number: 5 }
          ]
        },
        {
          id: 'blog-writer',
          title: 'AI Blogschrijver',
          description: 'Geautomatiseerde SEO‑blogcreatie waarmee u concurreert op waardevolle zoekwoorden en advertentiekosten verlaagt via slimme content en automatische publicatie.',
          steps: [
            { title: 'Concurrentieonderzoek', description: 'We analyseren welke zoekwoorden concurrenten targeten (bijv. via Ahrefs) en waar kansen liggen om relevanter te worden voor Google.', number: 1 },
            { title: 'Zoekwoorden kiezen', description: 'We selecteren zoekwoorden die u nu veel geld kosten in SEA. Door hier organisch op te ranken, kunt u budget verschuiven naar goedkopere, minder competitieve campagnes.', number: 2 },
            { title: 'Model afstemmen', description: 'We fine‑tunen een model op uw merk en branche, zodat de content natuurlijk leest én uw keywords op een geloofwaardige manier verwerkt.', number: 3 },
            { title: 'AI‑SEO aanpak', description: 'We richten content zo in dat deze ook goed kan verschijnen in AI‑samenvattingen en featured snippets. Daarvoor passen we structuur en formuleringen strategisch toe.', number: 4 },
            { title: 'Automatisch publiceren', description: 'We koppelen een auto‑publish flow aan uw platform (maatwerk, Shopify, WordPress of WooCommerce) en publiceren volgens een strategische planning, volledig geautomatiseerd.', number: 5 }
          ]
        },
        {
          id: 'linkedin-automation',
          title: 'AI LinkedIn Sales Bot',
          description: 'Een volledig geautomatiseerd LinkedIn‑sales systeem dat prospects vindt, gepersonaliseerde campagnes uitrolt en connecties helpt omzetten naar klanten.',
          steps: [
            { title: 'Prospects bepalen', description: 'We definiëren en vinden uw ideale doelgroep op LinkedIn met slimme filters en AI‑analyse (bedrijfsgrootte, functietitel, branche, engagement).', number: 1 },
            { title: 'Campagnes & hooks', description: 'We bouwen meerdere benaderingen (bijv. waardevolle PDF, intake/consult, of directe pitch) en testen hooks die reacties uitlokken.', number: 2 },
            { title: 'LLM trainen op uw stijl', description: 'We trainen een model op uw eerdere gesprekken, zodat berichten persoonlijk, consistent en herkenbaar blijven in uw tone of voice.', number: 3 },
            { title: 'Automatisch uitvoeren & optimaliseren', description: 'Het systeem draait campagnes en stuurt bij op basis van data (acceptatie, opens, replies). Zo verbeteren resultaten continu zonder extra handwerk.', number: 4 },
            { title: 'Multi‑channel opvolging', description: 'We koppelen LinkedIn aan e‑mail opvolging en tracken de klantreis van connectie tot klant, met inzicht in conversies en ROI.', number: 5 }
          ]
        },
        {
          id: 'chatbot',
          title: 'AI Chatbot',
          description: 'Een AI‑chatbot die is getraind op uw gesprekken en daardoor uw toon en service‑stijl overneemt. Optioneel met “personal shopper” functies voor webshops.',
          steps: [
            { title: 'Data verzamelen & analyseren', description: 'We verzamelen historische gesprekken (e-mail, chat, calls, tickets, social) en analyseren patronen: vragen, oplossingen, tone of voice en service‑standaarden.', number: 1 },
            { title: 'Tone of voice in kaart', description: 'Met NLP leggen we vast hoe u reageert in verschillende situaties en welke formuleringen het beste werken—zodat de bot natuurlijk en passend klinkt.', number: 2 },
            { title: 'Model trainen & testen', description: 'We fine‑tunen het taalmodel op uw data en testen het met realistische scenario’s tot de kwaliteit en consistentie klopt.', number: 3 },
            { title: 'Personal shopper (optioneel)', description: 'Voor webshops voegen we een assistent toe die op basis van voorkeuren en context producten adviseert en combinaties voorstelt.', number: 4 },
            { title: 'Integreren in uw kanalen', description: 'We plaatsen de chatbot op uw website en andere kanalen (bijv. Shopify en social), inclusief slimme “handoff” naar een medewerker wanneer nodig.', number: 5 },
            { title: 'Doorlopend verbeteren', description: 'De bot leert bij op basis van feedback, uitkomsten en conversies, zodat prestaties en klanttevredenheid blijven stijgen.', number: 6 }
          ]
        },
        {
          id: 'tiktok-optimization',
          title: 'AI TikTok‑dominantie',
          description: 'Een AI‑systeem dat virale TikToks vroeg detecteert, sterke reacties met subtiele CTA’s genereert en ze naar de top boost voor maximale zichtbaarheid.',
          steps: [
            { title: 'Creators met hoge engagement selecteren', description: 'We bouwen een database van creators in uw niche die structureel veel bereik en interactie halen (bijv. 100K+ views per post) en monitoren deze continu.', number: 1 },
            { title: 'Viraal detecteren (real‑time)', description: 'Monitoring draait 24/7 en pikt nieuwe posts binnen minuten op. Het systeem beoordeelt vroege signalen om virale kans te voorspellen.', number: 2 },
            { title: 'LLM trainen op top‑reacties', description: 'We trainen een model op grote aantallen best presterende reacties en patronen die engagement aanjagen—zodat reacties echt “native” aanvoelen.', number: 3 },
            { title: 'Reactie + subtiele CTA genereren', description: 'Bij een virale kans analyseert het model video, stijl en sentiment en schrijft het een reactie die engagement triggert en tegelijk een zachte CTA bevat.', number: 4 },
            { title: 'Boost met strategische likes', description: 'Na plaatsing boosten we de reactie met gecontroleerde like‑patronen die organisch gedrag nabootsen, gericht op toppositie.', number: 5 },
            { title: 'Bereik × conversie meten', description: 'Als video’s viraal gaan (vaak 1–3M+ views) krijgt uw reactie enorme exposure. We tracken verkeer en resultaat zodat ROI inzichtelijk wordt.', number: 6 }
          ]
        },
        {
          id: 'featured-snippets',
          title: 'AI SEO Integratie',
          description: 'Optimalisatie voor Google’s AI‑resultaten, zodat uw content vaker wordt opgenomen in AI‑samenvattingen en featured snippets.',
          steps: [
            { title: 'AI‑algoritme analyseren', description: 'We onderzoeken welke signalen Google’s AI gebruikt om bronnen te selecteren voor samenvattingen en snippets, zodat we gericht kunnen optimaliseren.', number: 1 },
            { title: 'Vragen & intent in kaart', description: 'We brengen de belangrijkste vragen en zoekintenties van uw doelgroep in kaart—precies daar waar uw oplossing waarde toevoegt.', number: 2 },
            { title: 'Contentstructuur op autoriteit', description: 'We bouwen een contentaanpak die u positioneert als duidelijke bron, met heldere antwoorden en logische structuur die AI goed kan citeren.', number: 3 },
            { title: 'Meta & schema optimaliseren', description: 'We optimaliseren meta‑descriptions, headers en structured data zodat uw content eenvoudiger te begrijpen en te gebruiken is voor AI‑extractie.', number: 4 },
            { title: 'Concurrenten verdringen', description: 'We analyseren wie nu in AI‑resultaten staat en maken een plan om die posities over te nemen met betere, relevantere content.', number: 5 },
            { title: 'Citeerbare quotes ontwerpen', description: 'We schrijven passages die natuurlijk te citeren zijn, zodat Google’s AI uw merk als bron kan toeschrijven.', number: 6 },
            { title: 'Meten & opschalen', description: 'We monitoren prestaties (snippets, AI‑citations, CTR) en schalen wat werkt naar meer onderwerpen en zoekclusters.', number: 7 }
          ]
        }
      ]
    },
    cases: {
      title: 'Succesverhalen',
      subtitle: 'Echte veranderingen, meetbare resultaten. Bekijk hoe we organisaties in uiteenlopende sectoren hebben geholpen.',
      viewFullCase: 'Bekijk de volledige case',
      items: [
        {
          id: 'fonteyn',
          title: 'Fonteyn: AI SEO Blog Optimalisatie',
          company: 'Fonteyn',
          preview: 'SEO‑aanpak vernieuwd voor een leverancier van luxe meubels (10M+ jaaromzet) met AI‑gestuurde blogoptimalisatie.',
          results: ['Gem. rankingstijging', '3% minder Google Ads‑kosten', '4% hogere conversie'],
          description: 'Fonteyn is een van de grootste leveranciers van meubels, spa’s en alles rondom luxe wonen, met meer dan 10 miljoen omzet per jaar. We hebben ons AI‑gedreven blogoptimalisatiesysteem ingezet om betere artikelen te publiceren en organisch hogere posities te behalen.\n\nOnze aanpak startte met een concurrentieanalyse (o.a. via Ahrefs) om te begrijpen op welke zoekwoorden concurrenten inzetten. Daarna gebruikten we AI‑modellen om waardevolle zoekwoorden te vinden die Fonteyn veel geld kostten in Google Ads.\n\nIn plaats van structureel premiumprijzen te blijven betalen voor dure termen, hebben we gerichte content geschreven die juist die zoekwoorden organisch target. Zo konden ze beter scoren op de kostbare keywords en advertentiebudget verschuiven naar goedkopere, minder competitieve termen.\n\nVervolgens hebben we een model afgestemd op de merkstijl van Fonteyn, zodat zoekwoorden natuurlijk verwerkt werden in leesbare, overtuigende content. Met AI‑SEO technieken hebben we de kans vergroot dat hun content ook zichtbaar wordt in AI‑resultaten en featured snippets.',
          detailedResults: [
            { title: 'Google‑ranking', description: 'Gemiddelde verbetering in posities', value: 'Significante stijging', color: '#10B981' },
            { title: 'Google Ads‑kosten', description: 'Lagere advertentie‑uitgaven', value: '-3%', color: '#3B82F6' },
            { title: 'Conversieratio', description: 'Relatieve stijging in conversie', value: '+4%', color: '#8B5CF6' },
            { title: 'Geoptimaliseerde producten', description: 'Aantal verbeterde productpagina’s', value: '30.000+', color: '#F59E0B' },
            { title: 'Bespaarde arbeid', description: 'Uren handmatig werk vervangen', value: '3.000 uur', color: '#EF4444' }
          ]
        },
        {
          id: 'aanhuis',
          title: 'Aanhuis: AI Presentatie & Training',
          company: 'Aanhuis',
          preview: 'Efficiënter werken door AI‑training, praktische implementatie en custom GPT’s voor het team.',
          results: ['+20% efficiëntie', 'Custom GPT’s gebouwd', 'Adoptie in het hele team'],
          description: 'Voor Aanhuis.nl leverden we onze AI‑presentatie en training, met als doel: sneller en consistenter werken door slimme AI‑toepassingen. Met custom GPT’s die aansloten op hun behoeften realiseerden we onder andere ongeveer 20% tijdwinst bij e‑mailwerk.\n\nWe startten met een sessie om knelpunten en tijdvreters te identificeren. Daarna analyseerden we workflows en stemden we kansen af met het management.\n\nVervolgens gaven we presentaties op maat aan management en het kernteam. In plaats van een “standaard verhaal” gingen we in gesprek, luisterden we actief en maakten we de kansen concreet. Belangrijk daarbij: het team moest ervaren dat AI ondersteunt en versnelt — niet vervangt.\n\nNa de eerste sessies volgden afdelingsworkshops om specifieke processen door te lichten en direct toepasbare automatiseringen of tools te introduceren. Alle inzichten bundelden we in een praktische handleiding (o.a. veilig ChatGPT‑gebruik en het trainen van custom GPT’s).',
          detailedResults: [
            { title: 'E‑mail efficiëntie', description: 'Tijdwinst bij e‑mailwerk', value: '+20%', color: '#10B981' },
            { title: 'Custom GPT’s', description: 'AI‑tools op maat gebouwd', value: 'Meerdere', color: '#3B82F6' },
            { title: 'Afdelingen', description: 'Workshops uitgevoerd', value: 'Alle afdelingen', color: '#F59E0B' },
            { title: 'Opvolging', description: 'Continu verbeteren geborgd', value: 'Doorlopend', color: '#EF4444' }
          ]
        },
        {
          id: 'blosh',
          title: 'Blosh: Custom AI Oplossingen Suite',
          company: 'Blosh',
          preview: 'Maatwerk AI‑suite met SEO‑automatisering, een slimme chatbot en automatisering voor Shopify‑prijsbeheer.',
          results: ['AI SEO systeem', 'Custom chatbot', 'Shopify automatisering'],
          description: 'Blosh kwam bij ons met meerdere operationele uitdagingen die verdere groei in de weg zaten: betere vindbaarheid, sneller klantcontact en efficiënter e‑commercebeheer. In plaats van one‑size‑fits‑all oplossingen ontwikkelden we een AI‑suite die aansluit op hun manier van werken.\n\nWe startten met een AI‑SEO systeem dat content automatisch optimaliseert voor zoekmachines. Voor klantenservice bouwden we een chatbot die is getraind op historische gesprekken, zodat antwoorden snel én in de juiste toon worden gegeven.\n\nTot slot ontwikkelden we automatisering voor Shopify‑prijsbeheer. Daarmee kunnen prijzen over de volledige catalogus efficiënt worden beheerd en automatisch worden aangepast op basis van marktsignalen, concurrentie en verkoopprestaties.',
          detailedResults: [
            { title: 'AI‑SEO systeem', description: 'Automatische zoekoptimalisatie', value: 'Geïmplementeerd', color: '#10B981' },
            { title: 'Slimme chatbot', description: 'Snellere support met de juiste toon', value: 'Actief', color: '#3B82F6' },
            { title: 'Shopify‑integratie', description: 'Automatisch prijsbeheer', value: 'Operationeel', color: '#8B5CF6' },
            { title: 'Maatwerk oplossingen', description: 'Gebouwde AI‑systemen', value: '3 systemen', color: '#F59E0B' }
          ]
        }
      ]
    },
    team: {
      title: 'Maak kennis met uw AI‑innovatiepartners',
      members: [
        { name: 'Geronimo S.', title: 'Head of Operations & Marketing', bio: 'Geronimo combineert strategisch denken met sterke uitvoering. Als Head of Operations & Marketing bij Optivaize bouwt hij de organisatorische en commerciële basis die AI‑gedreven groei schaalbaar maakt. Van het inrichten van teams en interne processen tot marketingstrategie en positionering: zijn focus ligt op het vertalen van ambitie naar structuur en meetbare resultaten. Met zijn achtergrond in beleidsadvies, politieke communicatie en organisatiestrategie brengt hij helderheid en discipline in snelgroeiende omgevingen. Hij gelooft dat echte AI‑transformatie pas ontstaat wanneer technologie en organisatie even sterk zijn.', skills: ['Operations', 'Marketingstrategie', 'Organisatiestrategie', 'Communicatie'] },
        { name: 'Maximilian Bladt', title: 'Chief Executive Officer', bio: 'Na zijn rol als Head of AI Implementation bij Elevate Digital was Optivaize de logische volgende stap: bedrijven zonder belemmeringen van A tot Z helpen met AI. Maximilian werkt snel, bouwt pragmatische oplossingen en traint taalmodellen op taken die omzet verhogen en kosten verlagen. Hij gelooft niet dat AI mensen vervangt — maar wel dat mensen die AI goed inzetten, een voorsprong krijgen op mensen die dat niet doen.', skills: ['Strategie', 'Leiderschap', 'AI Engineering', 'Cloudarchitectuur'] },
        { name: 'Filip Lysiak', title: 'AI & Data Science Lead', bio: 'Filip combineert een stevige basis in finance en consulting met hands‑on ervaring in innovatie op schaal. Bij een Fortune 500‑bedrijf adviseerde hij enkele van Europa’s grootste organisaties, waardoor hij zowel strategisch inzicht als begrip van complexe business‑vraagstukken meebrengt. Met expertise in kwantitatieve finance, softwareontwikkeling en data‑analyse overbrugt hij business en technologie — en begeleidt hij bedrijven naar AI‑transformaties met concrete, meetbare impact.', skills: ['Machine learning', 'NLP', 'Data science', 'Modeltraining'] }
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
      ctaTitle: 'Klaar om uw bedrijf te transformeren?',
      ctaSubtitle: 'Bel ons direct of vul het contactformulier in',
      callUs: 'Bel ons: +31 6 42698918',
      fillForm: 'Vul het formulier in',
      copyright: '© 2026 Optivaize. Alle rechten voorbehouden. • Optimize What Matters.',
      privacyPolicy: 'Privacybeleid',
      termsOfService: 'Algemene voorwaarden',
      cookiePolicy: 'Cookiebeleid'
    },
    bedankt: {
      title: 'voor uw bericht!',
      subtitle: 'Wij hebben uw aanvraag ontvangen en nemen zo snel mogelijk contact met u op. Meestal binnen 24 uur.',
      directContact: 'Direct contact?',
      callUs: 'Bel ons: +31 6 42698918',
      linkedin: 'Geronimo op LinkedIn',
      email: 'Stuur een e-mail',
      backHome: 'Terug naar Home',
      geronimo: {
        name: 'Geronimo S.',
        role: 'Head of Operations & Marketing'
      },
      team: {
        geronimo: 'Operations & Marketing',
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
      title: 'Trusted by Forward-Thinking Companies'
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
          id: 'tiktok-optimization',
          title: 'AI TikTok Domination',
          description: 'AI system that identifies viral TikToks, generates perfect comments with hidden CTAs, and boosts them to top positions for maximum viral exposure.',
          steps: [
            { title: 'High-Engagement Creator Database Building', description: 'We deploy specialized bots to identify and continuously monitor TikTok creators in your target niche who consistently achieve substantial views and engagement (typically 100K+ views per post). Our system builds a comprehensive database of these creators, analyzing their posting patterns, peak engagement times, and audience demographics. We track creators across multiple niches to ensure we capture viral content the moment it\'s posted, giving us the crucial early positioning advantage before videos explode.', number: 1 },
            { title: 'Real-Time Viral Detection & Response System', description: 'Our advanced monitoring bots scan the feeds of identified creators 24/7, instantly detecting new posts within minutes of publication. The system analyzes early engagement signals (initial like-to-view ratios, comment velocity, share rates) to predict which posts will go viral. When a potentially viral video is detected, our system immediately triggers the comment generation process, ensuring we\'re among the first to comment before the video gains massive traction and competition increases.', number: 2 },
            { title: 'Custom LLM Training for Contextual Comment Generation', description: 'We train a specialized Large Language Model specifically on millions of top-performing TikTok comments, analyzing what makes comments go viral (humor patterns, emotional triggers, trending phrases, perfect timing). This custom LLM learns to craft comments that feel completely natural and engaging while strategically incorporating hidden calls-to-action for your product or service. The AI adapts to current trends, slang, and platform-specific communication styles to ensure maximum engagement and authenticity.', number: 3 },
            { title: 'AI-Powered Comment Creation & CTA Integration', description: 'When a viral-potential video is detected, our LLM analyzes the content, creator\'s style, audience sentiment, and current trends to generate the perfect comment. The AI crafts responses that appear genuinely engaged with the content while subtly weaving in calls-to-action that don\'t feel promotional. These CTAs are designed as natural conversation starters, curiosity gaps, or helpful suggestions that drive viewers to your profile or website without triggering TikTok\'s promotional content detection systems.', number: 4 },
            { title: 'Strategic Botnet Like Deployment', description: 'Once the perfect comment is posted, we deploy our sophisticated botnet system to strategically boost the comment with artificial likes. The system uses carefully timed like deployment patterns that mimic organic engagement to avoid detection. We scale the likes based on the video\'s performance - if a video hits 100K views, we ensure your comment gets proportional likes to reach the top position. The timing and velocity of likes are optimized to appear completely natural while guaranteeing top placement.', number: 5 },
            { title: 'Massive View Multiplication & ROI Tracking', description: 'As the targeted videos go viral (often reaching 1-3M+ views), your top-positioned comment receives massive exposure - typically 15-30% of the video\'s total views see your comment prominently. This translates to 500K-1M+ impressions of your hidden CTA for just the cost of strategic like deployment. We provide detailed analytics showing comment performance, click-through rates to your profile/website, and conversion tracking. The system continues monitoring for weeks as videos can resurge in virality, providing ongoing value.', number: 6 }
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
      items: [
        {
          id: 'fonteyn',
          title: 'Fonteyn: AI SEO Blog Optimization',
          company: 'Fonteyn',
          preview: 'Transformed SEO strategy for luxury furniture supplier generating 10+ million revenue annually through AI-powered blog optimization.',
          results: ['Avg ranking increase', '3% Google Ads reduction', '4% conversion boost'],
          description: 'Fonteyn is one of the biggest suppliers of furniture, spas, and everything for luxurious living, generating over 10 million in revenue per year. We implemented our AI-powered blog optimization system to create better posts and achieve higher rankings using organic methods.\n\nOur comprehensive approach involved competitor analysis using advanced tools like Ahrefs to understand which keywords competitors were ranking for and investing in. We then used sophisticated AI models to identify high-value keywords that were costing Fonteyn significant money in their Google Ads campaigns.\n\nInstead of continuing to pay premium prices for expensive keywords in advertising, we strategically wrote blog content targeting these costly terms. This allowed them to optimize content for expensive keywords while shifting their paid advertising budget to cheaper, less competitive terms - maximizing their overall marketing ROI.\n\nWe fine-tuned a specialized AI model specifically for Fonteyn\'s brand and industry, training the AI to seamlessly integrate target keywords into naturally flowing, engaging content that reads authentically. The model learned their brand voice, tone, and messaging style while creating keyword-rich content that didn\'t feel forced or robotic.\n\nOur AI SEO integration positioned their content to appear prominently in Google\'s AI-generated search results and featured snippets. We implemented comprehensive auto-publishing systems that work seamlessly with their platform, publishing optimized blog content on a strategic schedule with complete automation.',
          detailedResults: [
            { title: 'Google Ranking', description: 'Average ranking position improvement', value: 'Significant increase', color: '#10B981' },
            { title: 'Google Ads Cost', description: 'Reduced advertising spend', value: '-3%', color: '#3B82F6' },
            { title: 'Conversion Rate', description: 'Relative conversion increase', value: '+4%', color: '#8B5CF6' },
            { title: 'Products Optimized', description: 'Total products enhanced', value: '30,000+', color: '#F59E0B' },
            { title: 'Labor Saved', description: 'Hours of manual work eliminated', value: '3,000 hrs', color: '#EF4444' }
          ]
        },
        {
          id: 'aanhuis',
          title: 'Aanhuis: AI Presentation & Training',
          company: 'Aanhuis',
          preview: 'Transformed workplace efficiency through comprehensive AI training presentations and custom GPT implementation.',
          results: ['20% efficiency boost', 'Custom GPTs built', 'Team-wide adoption'],
          description: 'For Aanhuis.nl, we delivered our comprehensive AI presentation service, focusing on improving work efficiency through strategic AI implementation. We realized a 20% better work efficiency in writing emails by building custom GPTs tailored to their specific needs.\n\nOur engagement began with an initial session where we discussed time-consuming processes that were hindering efficiency and preventing people from working at their absolute best. We analyzed their workflows and looked for opportunities where they could improve before delivering the presentation and discussed these findings with management.\n\nWe conducted tailored presentations for both management and the core team working at Aanhuis. These weren\'t just generic AI overviews - we sat with their team for open conversations, actively listening and looking for opportunities while creating alignment. The key was ensuring that stakeholders (the people actually doing the work) felt that AI would help them work more efficiently rather than replace them.\n\nFollowing the successful initial presentation, we conducted specialized breakout sessions with different departments. In these focused sessions, we examined their specific processes and identified opportunities to automate them using AI or introduce tools they could start using directly.\n\nWe created a comprehensive guide containing all the insights from our discussions, including detailed instructions on how to use ChatGPT within their organization, how to train custom GPTs for specific tasks, and identification of additional AI opportunities. Later, we provided them with a PDF reference guide they could use whenever they had questions.\n\nThe team expressed enthusiasm about the results and told us they plan to schedule future meetings to make their processes even more efficient. This commitment to continuous improvement shows the lasting impact of our AI integration approach.',
          detailedResults: [
            { title: 'Email Efficiency', description: 'Improvement in email writing efficiency', value: '+20%', color: '#10B981' },
            { title: 'Custom GPTs', description: 'Tailored AI tools created', value: 'Multiple built', color: '#3B82F6' },
            { title: 'Department Coverage', description: 'Breakout sessions completed', value: 'All depts', color: '#F59E0B' },
            { title: 'Follow-up Planned', description: 'Continuous improvement commitment', value: 'Ongoing', color: '#EF4444' }
          ]
        },
        {
          id: 'blosh',
          title: 'Blosh: Custom AI Solutions Suite',
          company: 'Blosh',
          preview: 'Comprehensive custom AI solution development including SEO automation, intelligent chatbot, and Shopify price management.',
          results: ['AI SEO system', 'Custom chatbot', 'Shopify automation'],
          description: 'Blosh approached us with multiple operational challenges that were limiting their growth potential. They needed better search visibility, faster client support, and more efficient e-commerce management. Rather than implementing generic solutions, we developed a completely custom AI suite tailored to their specific business needs.\n\nWe started by building them an advanced AI SEO system that automatically optimizes their content for search engines. This system analyzes competitor strategies, identifies high-value keywords, and generates content that improves their search rankings while reducing advertising costs. The AI continuously monitors search trends and adjusts their content strategy to maintain competitive advantage.\n\nFor their client support challenges, we developed an intelligent chatbot trained specifically on Blosh\'s historical conversations. The chatbot learned their unique communication patterns, problem-solving approaches, and brand voice to provide instant, personalized responses that maintain the human touch their clients expect. This dramatically improved response times and client satisfaction.\n\nFinally, we created an intelligent automation system for their Shopify platform that allows them to efficiently manage pricing across their entire product catalog. The system automatically adjusts prices based on market conditions, competitor analysis, inventory levels, and sales performance, saving countless hours of manual work while optimizing revenue.\n\nThese custom solutions demonstrate our approach to building AI products that integrate perfectly with existing workflows and scale with business growth, delivering real measurable value rather than one-size-fits-all solutions.',
          detailedResults: [
            { title: 'AI SEO System', description: 'Custom search optimization automation', value: 'Deployed', color: '#10B981' },
            { title: 'Smart Chatbot', description: 'Client support automation with personality', value: 'Active', color: '#3B82F6' },
            { title: 'Shopify Integration', description: 'Automated price management system', value: 'Operational', color: '#8B5CF6' },
            { title: 'Custom Solutions', description: 'Tailored AI products built', value: '3 systems', color: '#F59E0B' }
          ]
        }
      ]
    },
    team: {
      title: 'Meet Your AI Innovation Partners',
      members: [
        { name: 'Geronimo S.', title: 'Head of Operations & Marketing', bio: 'Geronimo combines strategic thinking with operational execution. As Head of Operations & Marketing at Optivaize, he builds the organisational and commercial backbone that enables scalable AI-driven growth. From structuring teams and internal processes to driving marketing strategy and positioning, his focus is on turning ambition into structured, measurable results. With a background in policy advisory, political communication and organisational strategy, he brings clarity and discipline to fast-growing environments. He believes that real AI transformation happens when strong technology is matched with strong organisation.', skills: ['Operations', 'Marketing Strategy', 'Organisational Strategy', 'Communication'] },
        { name: 'Maximilian Bladt', title: 'Chief Executive Officer', bio: 'Coming from Elevate Digital as head of AI implementation, starting Optivaize was the next logical step as then companies could be helped to the fullest without barriers. His experience enables him to work fast and train Large Language Models to do what drives revenue and reduces costs. He doesn\'t believe AI will replace people, but people using AI will replace people not using AI.', skills: ['Strategy', 'Leadership', 'AI Engineering', 'Cloud Architecture'] },
        { name: 'Filip Lysiak', title: 'AI & Data Science Lead', bio: 'Filip combines a strong foundation in finance and consulting with hands-on experience driving innovation at scale. Having advised some of Europe\'s largest enterprises during his time at a Fortune 500 company, he brings both strategic vision and a deep understanding of complex business challenges. With expertise in quantitative finance, coding, and data analysis, Filip bridges the worlds of business and technology - making him uniquely suited to guide companies through successful AI transformations that deliver real, measurable impact.', skills: ['Machine Learning', 'NLP', 'Data Science', 'Model Training'] }
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
        role: 'Head of Operations & Marketing'
      },
      team: {
        geronimo: 'Operations & Marketing',
        max: 'CEO',
        filip: 'AI & Data Science'
      }
    }
  }
};
