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
          id: 'tiktok-optimization',
          title: 'AI TikTok-dominantie',
          description: 'Een AI-systeem dat virale TikToks vroeg detecteert, sterke reacties met subtiele CTA\'s genereert en ze naar de top boost voor maximale zichtbaarheid.',
          steps: [
            { title: 'Creators met hoge engagement selecteren', description: 'We bouwen een database van creators in je niche die structureel veel bereik en interactie halen (bijv. 100K+ views per post) en monitoren deze continu.', number: 1 },
            { title: 'Viraal detecteren (real-time)', description: 'Monitoring draait 24/7 en pikt nieuwe posts binnen minuten op. Het systeem beoordeelt vroege signalen om virale kans te voorspellen.', number: 2 },
            { title: 'LLM trainen op top-reacties', description: 'We trainen een model op grote aantallen best presterende reacties en patronen die engagement aanjagen, zodat reacties echt “native” aanvoelen.', number: 3 },
            { title: 'Reactie + subtiele CTA genereren', description: 'Bij een virale kans analyseert het model video, stijl en sentiment en schrijft het een reactie die engagement triggert en tegelijk een zachte CTA bevat.', number: 4 },
            { title: 'Boost met strategische likes', description: 'Na plaatsing boosten we de reactie met gecontroleerde like-patronen die organisch gedrag nabootsen, gericht op toppositie.', number: 5 },
            { title: 'Bereik × conversie meten', description: 'Als video\'s viraal gaan (vaak 1–3M+ views) krijgt je reactie enorme exposure. We tracken verkeer en resultaat zodat ROI inzichtelijk wordt.', number: 6 }
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
      viewFullCase: 'Bekijk de volledige case',
      items: [
        {
          id: 'fonteyn',
          title: 'Fonteyn: AI SEO Blog Optimalisatie',
          company: 'Fonteyn',
          preview: 'Voor Fonteyn, een van de grootste leveranciers van luxe meubels met meer dan 10 miljoen jaaromzet, hebben wij de volledige SEO-aanpak vernieuwd met AI-gestuurde blogoptimalisatie. Door concurrentieanalyse en slimme keyword-targeting realiseerden we lagere advertentiekosten en hogere organische posities.',
          results: ['Gem. rankingstijging', '3% minder Google Ads-kosten', '4% hogere conversie'],
          description: 'Fonteyn is een van de grootste leveranciers van meubels, spa\'s en alles rondom luxe wonen, met meer dan 10 miljoen omzet per jaar. We hebben ons AI-gedreven blogoptimalisatiesysteem ingezet om betere artikelen te publiceren en organisch hogere posities te behalen. Onze aanpak startte met een uitgebreide concurrentieanalyse via tools als Ahrefs, waarmee we precies in kaart brachten op welke zoekwoorden de concurrentie investeerde en waar de grootste kansen lagen. Vervolgens gebruikten we geavanceerde AI-modellen om de zoekwoorden te identificeren die Fonteyn het meeste geld kostten in Google Ads, zodat we wisten waar organische content het grootste rendement zou opleveren.\n\nIn plaats van structureel premiumprijzen te blijven betalen voor dure termen, schreven we gerichte blogcontent die juist die zoekwoorden organisch targette. Dit stelde Fonteyn in staat om beter te scoren op kostbare keywords en tegelijk advertentiebudget te verschuiven naar goedkopere, minder competitieve termen, waardoor de totale marketing-ROI aanzienlijk verbeterde. We hebben daarnaast een AI-model afgestemd op de merkstijl van Fonteyn, zodat zoekwoorden natuurlijk verwerkt werden in leesbare, overtuigende content die volledig aansloot bij hun tone of voice. Met AI-SEO technieken hebben we de kans vergroot dat hun content ook zichtbaar wordt in AI-gegenereerde zoekresultaten en featured snippets, en we hebben een volledig geautomatiseerd publicatiesysteem opgezet dat content volgens een strategische planning plaatst zonder enig handmatig werk.',
          detailedResults: [
            { title: 'Google-ranking', description: 'Gemiddelde verbetering in posities', value: 'Significante stijging', color: '#10B981' },
            { title: 'Google Ads-kosten', description: 'Lagere advertentie-uitgaven', value: '-3%', color: '#3B82F6' },
            { title: 'Conversieratio', description: 'Relatieve stijging in conversie', value: '+4%', color: '#8B5CF6' },
            { title: 'Geoptimaliseerde producten', description: 'Aantal verbeterde productpagina\'s', value: '30.000+', color: '#F59E0B' },
            { title: 'Bespaarde arbeid', description: 'Uren handmatig werk vervangen', value: '3.000 uur', color: '#EF4444' }
          ]
        },
        {
          id: 'aanhuis',
          title: 'Aanhuis: AI Presentatie & Training',
          company: 'Aanhuis',
          preview: 'Voor Aanhuis hebben wij een complete AI-training en implementatie verzorgd. Van management-presentatie tot afdelingsworkshops, inclusief custom GPT\'s voor e-mail en rapportages. Het resultaat: 20% tijdwinst op e-mailwerk en volledige team-adoptie binnen zes weken.',
          results: ['+20% efficiëntie', 'Custom GPT\'s gebouwd', 'Adoptie in het hele team'],
          description: 'Voor Aanhuis.nl leverden we een complete AI-presentatie en training met als doel sneller en consistenter werken door slimme AI-toepassingen. We startten met een uitgebreide sessie om knelpunten en tijdvreters te identificeren, analyseerden de bestaande workflows en stemden de belangrijkste kansen af met het management. Op basis daarvan ontwikkelden we custom GPT\'s die naadloos aansloten op hun dagelijkse werkprocessen, waarmee we onder andere ongeveer 20% tijdwinst realiseerden bij het schrijven en beantwoorden van e-mails.\n\nVervolgens gaven we presentaties op maat aan zowel het management als het kernteam. In plaats van een standaardverhaal af te draaien, gingen we in gesprek, luisterden we actief naar de specifieke uitdagingen per afdeling en maakten we de kansen concreet met live demonstraties. Cruciaal daarbij was dat het team ervaarde dat AI hen ondersteunt en versnelt in hun werk, niet vervangt. Na de eerste sessies volgden gerichte afdelingsworkshops om specifieke processen door te lichten en direct toepasbare automatiseringen te introduceren. Alle inzichten bundelden we in een uitgebreide praktische handleiding met onder andere instructies voor veilig ChatGPT-gebruik, het trainen van custom GPT\'s en een overzicht van verdere AI-kansen die we samen geidentificeerd hadden.',
          detailedResults: [
            { title: 'E-mail efficiëntie', description: 'Tijdwinst bij e-mailwerk', value: '+20%', color: '#10B981' },
            { title: 'Custom GPT\'s', description: 'AI-tools op maat gebouwd', value: 'Meerdere', color: '#3B82F6' },
            { title: 'Afdelingen', description: 'Workshops uitgevoerd', value: 'Alle afdelingen', color: '#F59E0B' },
            { title: 'Opvolging', description: 'Continu verbeteren geborgd', value: 'Doorlopend', color: '#EF4444' }
          ]
        },
        {
          id: 'blosh',
          title: 'Blosh: Custom AI Oplossingen Suite',
          company: 'Blosh',
          preview: 'Voor Blosh ontwikkelden wij een complete maatwerk AI-suite bestaande uit een SEO-automatiseringssysteem, een slimme chatbot getraind op historische gesprekken en een Shopify-prijsbeheermodule. Drie op maat gebouwde systemen die samen hun groei versnellen.',
          results: ['AI SEO systeem', 'Custom chatbot', 'Shopify automatisering'],
          description: 'Blosh kwam bij ons met meerdere operationele uitdagingen die verdere groei in de weg zaten: betere vindbaarheid in zoekmachines, sneller en persoonlijker klantcontact en efficiënter e-commercebeheer. In plaats van standaardoplossingen te implementeren, ontwikkelden we een complete maatwerk AI-suite die naadloos aansluit op hun bestaande manier van werken en specifiek is afgestemd op hun merk en doelgroep.\n\nWe begonnen met een AI-SEO systeem dat content automatisch optimaliseert voor zoekmachines, concurrentiestrategieën analyseert en waardevolle zoekwoorden identificeert om organisch verkeer te verhogen. Voor klantenservice bouwden we een intelligente chatbot die is getraind op hun historische gesprekken, waardoor antwoorden niet alleen razendsnel worden gegeven maar ook perfect aansluiten bij de toon en service-standaard die klanten van Blosh verwachten. Tot slot ontwikkelden we een slimme automatisering voor Shopify-prijsbeheer waarmee prijzen over de volledige productcatalogus efficiënt worden beheerd en automatisch worden aangepast op basis van marktsignalen, concurrentie en verkoopprestaties, wat het team uren handmatig werk per week bespaart.',
          detailedResults: [
            { title: 'AI-SEO systeem', description: 'Automatische zoekoptimalisatie', value: 'Geïmplementeerd', color: '#10B981' },
            { title: 'Slimme chatbot', description: 'Snellere support met de juiste toon', value: 'Actief', color: '#3B82F6' },
            { title: 'Shopify-integratie', description: 'Automatisch prijsbeheer', value: 'Operationeel', color: '#8B5CF6' },
            { title: 'Maatwerk oplossingen', description: 'Gebouwde AI-systemen', value: '3 systemen', color: '#F59E0B' }
          ]
        },
        {
          id: 'redbutton',
          title: 'Red Button: Sage Intacct & Becosoft Integratie',
          company: 'Red Button / Magic Apparels',
          preview: 'Voor Magic Apparels en dochtermerk Red Button bouwden wij een volledige real-time integratie tussen boekhoudplatform Sage Intacct en ordersysteem Becosoft. Inclusief synchronisatie van honderden items, automatische Europese BTW-logica en uitgebreide foutafhandeling.',
          results: ['Volledige sync', 'Factuurregels', 'Europese BTW-logica'],
          description: 'Red Button is een dochtermerk van Magic Apparels dat orders ontvangt via ordersysteem Becosoft, maar deze moest koppelen aan hun boekhoudplatform Sage Intacct om een naadloze administratieve workflow te realiseren. Voordat de integratie live kon gaan, moesten honderden bestaande items worden gesynchroniseerd, waaronder facturen, klantgegevens en productdata, elk met hun eigen structuur en validatieregels die correct moesten worden vertaald tussen beide systemen.\n\nEen van de grootste uitdagingen was het correct verwerken van Europese factureringsregels: wanneer een factuur binnen de EU werd verstuurd, moest deze zonder BTW worden verwerkt, terwijl voor Engelse facturen juist wel BTW gold. Deze complexe regels moesten volautomatisch worden toegepast op basis van het land van de klant, zonder ruimte voor fouten. We hebben een robuuste real-time integratie gebouwd die continu synchroniseert tussen beide systemen, inclusief uitgebreide foutafhandeling, automatische retry-mechanismen en gedetailleerde logging zodat het team op elk moment volledig inzicht heeft in de status van elke synchronisatie en direct kan ingrijpen wanneer dat nodig is.',
          detailedResults: [
            { title: 'Synchronisatie', description: 'Bestaande items gesynchroniseerd', value: 'Honderden items', color: '#10B981' },
            { title: 'Factureringsregels', description: 'Automatische BTW-logica', value: 'EU & UK regels', color: '#3B82F6' },
            { title: 'Real-time sync', description: 'Orders automatisch verwerkt', value: 'Operationeel', color: '#8B5CF6' },
            { title: 'Systemen gekoppeld', description: 'Sage Intacct & Becosoft', value: '2 platformen', color: '#F59E0B' }
          ]
        },
        {
          id: 'stakepvp',
          title: 'StakePVP: Game Platform & Blockchain Integratie',
          company: 'StakePVP',
          preview: 'Wij bouwden een compleet game platform met drie volledig functionele games, blockchain-integratie op de Solana blockchain en crypto wallets via Privy. Een technisch uitdagend project met multi-container hosting, load balancing en real-time multiplayer functionaliteit.',
          results: ['3 games gebouwd', 'Solana blockchain', 'Multi-container hosting'],
          description: 'Optivaize heeft een compleet game platform gebouwd inclusief drie volledig functionele games en een diepgaande blockchain-integratie op de Solana blockchain. Dit project was bijzonder uitdagend vanwege de technische complexiteit: elke game draaide in een eigen container, met gedeelde hosting-infrastructuur, load balancing om pieken in spelerverkeer op te vangen en volledige crypto-functionaliteit voor in-game transacties en beloningen.\n\nVoor de wallet-integratie hebben we Privy ingezet, waarmee spelers op een laagdrempelige manier crypto wallets konden aanmaken en beheren zonder diepgaande blockchain-kennis nodig te hebben. De Solana blockchain zorgde voor snelle, goedkope transacties die essentieel waren voor de game-ervaring. Dit project demonstreert de kracht van Optivaize op het gebied van complexe custom software: van schaalbare game-architectuur en blockchain-integratie tot multi-container orchestratie en real-time multiplayer functionaliteit, alles gebouwd met een focus op performance en betrouwbaarheid.',
          detailedResults: [
            { title: 'Games', description: 'Volledig functionele games gebouwd', value: '3 games', color: '#10B981' },
            { title: 'Blockchain', description: 'Solana integratie met Privy wallets', value: 'Volledig operationeel', color: '#3B82F6' },
            { title: 'Infrastructuur', description: 'Multi-container met load balancing', value: 'Schaalbaar', color: '#8B5CF6' },
            { title: 'Technologieen', description: 'Privy, Solana, Helius', value: '10+ services', color: '#F59E0B' }
          ]
        },
        {
          id: 'passion',
          title: 'Passion Ice Baths: AI SEO & Shopify App',
          company: 'Passion Ice Baths',
          preview: 'Voor Passion Ice Baths, het merk van Wim Hof, schrijven wij SEO-geoptimaliseerde blogs op basis van GA4 en Search Console data. Daarnaast hebben we een eigen AI-model getraind op hun merkstijl en bouwen we momenteel een custom Shopify app.',
          results: ['AI SEO blogs', 'GA4 & Search Console', 'Shopify app'],
          description: 'Passion Ice Baths, het merk waar Wim Hof aan verbonden is, kwam bij ons voor hulp met hun online vindbaarheid en digitale groeistrategie. We hebben SEO-geoptimaliseerde blogs geschreven op basis van GA4 data en Google Search Console data, waarmee we precies konden vaststellen welke zoekwoorden het meeste potentieel hadden en waar de grootste kansen lagen om organisch verkeer te laten groeien. Op basis van die data-analyse trainden we een eigen AI-model dat specifiek is afgestemd op hun merkstijl en doelgroep, zodat de gegenereerde content niet alleen technisch geoptimaliseerd is voor zoekmachines maar ook authentiek en herkenbaar aanvoelt voor hun community van koude-enthousiastelingen.\n\nDaarnaast zijn we momenteel een custom Shopify app aan het bouwen die hun e-commerce ervaring naar een hoger niveau tilt, met functies die specifiek zijn ontworpen voor hun productcategorie en klantbeleving. De combinatie van data-gedreven SEO, een op maat getraind AI-model en custom app-ontwikkeling maakt dit project een uitstekend voorbeeld van hoe wij merken helpen groeien door technologie en content naadloos te integreren.',
          detailedResults: [
            { title: 'AI SEO', description: 'Blogs met GA4 & Search Console data', value: 'Geimplementeerd', color: '#10B981' },
            { title: 'Custom AI Model', description: 'Getraind op merkstijl', value: 'Operationeel', color: '#3B82F6' },
            { title: 'Shopify App', description: 'Custom app in ontwikkeling', value: 'In progress', color: '#8B5CF6' },
            { title: 'Wim Hof', description: 'Merk ambassadeur', value: 'Partnership', color: '#F59E0B' }
          ]
        }
      ]
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
          preview: 'For Fonteyn, one of the largest luxury furniture suppliers with over 10 million in annual revenue, we transformed their entire SEO strategy with AI-powered blog optimization. Through competitor analysis and smart keyword targeting we achieved lower ad costs and higher organic rankings.',
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
          preview: 'For Aanhuis we delivered a complete AI training and implementation programme. From management presentations to department workshops, including custom GPTs for email and reports. The result: 20% time savings on email work and full team-wide adoption within six weeks.',
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
          preview: 'For Blosh we developed a complete custom AI suite consisting of an SEO automation system, an intelligent chatbot trained on historical conversations, and a Shopify price management module. Three tailored systems that together accelerate their growth.',
          results: ['AI SEO system', 'Custom chatbot', 'Shopify automation'],
          description: 'Blosh approached us with multiple operational challenges that were limiting their growth potential. They needed better search visibility, faster client support, and more efficient e-commerce management. Rather than implementing generic solutions, we developed a completely custom AI suite tailored to their specific business needs.\n\nWe started by building them an advanced AI SEO system that automatically optimizes their content for search engines. This system analyzes competitor strategies, identifies high-value keywords, and generates content that improves their search rankings while reducing advertising costs. The AI continuously monitors search trends and adjusts their content strategy to maintain competitive advantage.\n\nFor their client support challenges, we developed an intelligent chatbot trained specifically on Blosh\'s historical conversations. The chatbot learned their unique communication patterns, problem-solving approaches, and brand voice to provide instant, personalized responses that maintain the human touch their clients expect. This dramatically improved response times and client satisfaction.\n\nFinally, we created an intelligent automation system for their Shopify platform that allows them to efficiently manage pricing across their entire product catalog. The system automatically adjusts prices based on market conditions, competitor analysis, inventory levels, and sales performance, saving countless hours of manual work while optimizing revenue.\n\nThese custom solutions demonstrate our approach to building AI products that integrate perfectly with existing workflows and scale with business growth, delivering real measurable value rather than one-size-fits-all solutions.',
          detailedResults: [
            { title: 'AI SEO System', description: 'Custom search optimization automation', value: 'Deployed', color: '#10B981' },
            { title: 'Smart Chatbot', description: 'Client support automation with personality', value: 'Active', color: '#3B82F6' },
            { title: 'Shopify Integration', description: 'Automated price management system', value: 'Operational', color: '#8B5CF6' },
            { title: 'Custom Solutions', description: 'Tailored AI products built', value: '3 systems', color: '#F59E0B' }
          ]
        },
        {
          id: 'redbutton',
          title: 'Red Button: Sage Intacct & Becosoft Integration',
          company: 'Red Button / Magic Apparels',
          preview: 'For Magic Apparels and subsidiary brand Red Button we built a full real-time integration between accounting platform Sage Intacct and order system Becosoft. Including synchronization of hundreds of items, automatic European VAT logic and extensive error handling.',
          results: ['Full sync', 'Invoice rules', 'European VAT logic'],
          description: 'Red Button is a subsidiary brand of Magic Apparels that receives orders through the Becosoft order system but needed to seamlessly connect these to their accounting platform Sage Intacct for a fully integrated administrative workflow. Before the integration could go live, hundreds of existing items needed to be synchronized, including invoices, customer data and product information, each with their own structure and validation rules that had to be correctly translated between the two systems.\n\nOne of the biggest challenges was correctly processing European invoicing rules: when an invoice was sent within the EU, it had to be processed without VAT, while UK invoices did require VAT. These complex rules had to be automatically applied based on the customer\'s country, leaving no room for errors. We built a robust real-time integration that continuously synchronizes between both systems, with extensive error handling, automatic retry mechanisms and detailed logging so the team always has full visibility into the status of every synchronization and can intervene immediately when needed.',
          detailedResults: [
            { title: 'Synchronization', description: 'Existing items synchronized', value: 'Hundreds of items', color: '#10B981' },
            { title: 'Invoice Rules', description: 'Automatic VAT logic', value: 'EU & UK rules', color: '#3B82F6' },
            { title: 'Real-time Sync', description: 'Orders automatically processed', value: 'Operational', color: '#8B5CF6' },
            { title: 'Systems Connected', description: 'Sage Intacct & Becosoft', value: '2 platforms', color: '#F59E0B' }
          ]
        },
        {
          id: 'stakepvp',
          title: 'StakePVP: Game Platform & Blockchain Integration',
          company: 'StakePVP',
          preview: 'We built a complete game platform with three fully functional games, blockchain integration on the Solana blockchain and crypto wallets via Privy. A technically challenging project featuring multi-container hosting, load balancing and real-time multiplayer functionality.',
          results: ['3 games built', 'Solana blockchain', 'Multi-container hosting'],
          description: 'Optivaize built a complete game platform including three fully functional games and a deep blockchain integration on the Solana blockchain. This project was particularly challenging due to its technical complexity: each game ran in its own container with shared hosting infrastructure, load balancing to handle spikes in player traffic and full crypto functionality for in-game transactions and rewards.\n\nFor wallet integration we used Privy, allowing players to easily create and manage crypto wallets without needing deep blockchain knowledge. The Solana blockchain provided fast, low-cost transactions that were essential for the gaming experience. This project demonstrates the strength of Optivaize in complex custom software: from scalable game architecture and blockchain integration to multi-container orchestration and real-time multiplayer functionality, all built with a focus on performance and reliability.',
          detailedResults: [
            { title: 'Games', description: 'Fully functional games built', value: '3 games', color: '#10B981' },
            { title: 'Blockchain', description: 'Solana integration with Privy wallets', value: 'Fully operational', color: '#3B82F6' },
            { title: 'Infrastructure', description: 'Multi-container with load balancing', value: 'Scalable', color: '#8B5CF6' },
            { title: 'Technologies', description: 'Privy, Solana, Helius', value: '10+ services', color: '#F59E0B' }
          ]
        },
        {
          id: 'passion',
          title: 'Passion Ice Baths: AI SEO & Shopify App',
          company: 'Passion Ice Baths',
          preview: 'For Passion Ice Baths, the brand of Wim Hof, we write SEO-optimized blogs based on GA4 and Search Console data. We also trained a custom AI model on their brand style and are currently building a custom Shopify app.',
          results: ['AI SEO blogs', 'GA4 & Search Console', 'Shopify app'],
          description: 'Passion Ice Baths, the brand associated with Wim Hof, came to us for help with their online visibility and digital growth strategy. We wrote SEO-optimized blogs based on GA4 data and Google Search Console insights, enabling us to pinpoint exactly which keywords had the most potential and where the biggest opportunities lay to grow organic traffic. Based on that data analysis we trained a custom AI model specifically tailored to their brand style and target audience, ensuring that the generated content is not only technically optimized for search engines but also feels authentic and recognisable to their community of cold exposure enthusiasts.\n\nAdditionally, we are currently building a custom Shopify app that will take their e-commerce experience to the next level, with features specifically designed for their product category and customer journey. The combination of data-driven SEO, a custom-trained AI model and bespoke app development makes this project an excellent example of how we help brands grow by seamlessly integrating technology and content.',
          detailedResults: [
            { title: 'AI SEO', description: 'Blogs with GA4 & Search Console data', value: 'Implemented', color: '#10B981' },
            { title: 'Custom AI Model', description: 'Trained on brand style', value: 'Operational', color: '#3B82F6' },
            { title: 'Shopify App', description: 'Custom app in development', value: 'In progress', color: '#8B5CF6' },
            { title: 'Wim Hof', description: 'Brand ambassador', value: 'Partnership', color: '#F59E0B' }
          ]
        }
      ]
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
