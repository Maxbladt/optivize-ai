// Per-niche content for the AI assistant landing pages.
// Multiple curated Unsplash images per niche + real brand logos via simpleicons / wordmarks.

const unsplash = (id, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

// Logo helpers
// si: simpleicons.org CDN - returns brand-colored SVG for famous brands
// wm: hand-styled wordmark - actual brand color, brand text, looks intentional
const si = (slug) => ({ type: 'si', slug });
const wm = (text, bg, color = 'white') => ({ type: 'wm', text, bg, color });

export const NICHES = {
  tandarts: {
    key: 'tandarts',
    short: 'Tandarts',
    pretty: 'tandartspraktijken',
    callerName: 'Tandartspraktijk Optivaize',
    callerSub: 'Inkomend gesprek - Live demo',
    seo: {
      title: 'AI receptionist voor tandartspraktijken | Optivaize',
      description: 'AI assistent die 24/7 afspraken plant en patiëntvragen beantwoordt voor tandartspraktijken. Koppelt aan Exquise, Promedico en OASE. Live binnen 1-3 dagen.',
      keywords: 'AI receptionist tandarts, tandarts agenda automatiseren, virtuele assistent tandartspraktijk, Exquise koppeling, Promedico AI',
    },
    hero: {
      eyebrow: 'Voor tandartspraktijken',
      h1Lead: 'Een AI receptioniste die jouw',
      h1Highlight: 'tandartspraktijk',
      h1Tail: '24/7 bemand',
      sub: 'Boekt afspraken, beantwoordt patiëntvragen over behandelingen en prijzen, verzet of annuleert. Spreekt vloeiend Nederlands en koppelt direct aan jouw bestaande praktijksoftware.',
      image: unsplash('photo-1588776814546-1ffcf47267a5'), // modern dental treatment room with chair
      imageAlt: 'Moderne tandartspraktijk',
    },
    images: {
      bewezen: unsplash('photo-1606811841689-23dfddce3e95', 800),  // dentist gloved hands working
      flow: unsplash('photo-1581595220892-b0739db3ba8c', 800),     // patient smiling in dental chair
      story: unsplash('photo-1629909613654-28e377c37b09', 1200),   // happy receptionist on phone
    },
    bewezen: {
      title: 'Bewezen in echte praktijken',
      sub: 'Robin draait al dagelijks mee bij Nederlandse tandartsen en koppelt naadloos aan de software die jouw praktijk al gebruikt.',
      platforms: [
        { name: 'Exquise', logo: wm('exquise', '#0A4A8A') },
        { name: 'Promedico', logo: wm('Promedico', '#C8102E') },
        { name: 'OASE', logo: wm('OASE', '#00A88E') },
        { name: 'Wincare', logo: wm('WinCare', '#1F3A5F') },
        { name: 'Google Calendar', logo: si('googlecalendar') },
        { name: 'Outlook', logo: si('microsoftoutlook') },
      ],
    },
    flow: {
      pickup: 100,
      pickupLabel: 'Robin neemt direct op',
      pickupSub: 'Geen wachtrij meer voor je patiënten - 24/7, ook \'s avonds en in het weekend',
      solved: 87,
      solvedLabel: 'Direct opgelost door Robin',
      solvedSub: 'Boekt, verzet of annuleert afspraken. Beantwoordt vragen over prijzen, behandelingen en openingstijden.',
      escalated: 13,
      escalatedLabel: 'Met context doorgestuurd',
      escalatedSub: 'Spoedgevallen of complexe vragen gaan met volledige gespreksinfo naar jouw assistent.',
    },
    benefits: [
      { title: 'Van 3 receptionisten naar 1', text: 'Dezelfde service, een derde van de bezetting. Je team kan zich richten op patiëntenzorg.' },
      { title: 'Geen no-shows meer', text: 'Robin belt automatisch een dag van tevoren om afspraken te bevestigen of te verzetten.' },
      { title: '24/7 bereikbaar', text: 'Patiënten plannen ook \'s avonds een controle in. Geen telefoon meer in de weekenden.' },
    ],
    storyQuote: {
      text: '"Robin nam binnen één week 80% van onze inkomende telefoontjes over. Onze receptie kan zich nu richten op de patiënten in de praktijk."',
      author: 'Drs. Marieke van den Berg',
      role: 'Praktijkhouder, Tandartspraktijk Utrecht-West',
    },
    examples: [
      '"Hoi, ik wil graag een controle inplannen voor donderdag rond 11 uur."',
      '"Mijn afspraak voor van Bakker wil ik verzetten naar volgende week vrijdag."',
      '"Wat kost een gebitsreiniging en hoe lang duurt dat?"',
      '"Hebben jullie nog plek voor een spoedgeval vandaag?"',
    ],
    faqs: [
      { q: 'Welke tandartssoftware kunnen jullie koppelen?', a: 'We hebben out-of-the-box koppelingen met Exquise, Promedico-ASP, OASE en Wincare. Andere systemen koppelen we via API of webhook - in 9 van de 10 gevallen geen probleem. Tijdens het intakegesprek bekijken we jouw setup.' },
      { q: 'Hoe wordt een spoedgeval afgehandeld?', a: 'Robin herkent de toon en urgentie. Bij een spoedgeval verbindt hij direct door naar jouw dienstdoende tandarts of mobiel - zonder dat de patiënt het verschil merkt.' },
      { q: 'Voldoet dit aan de AVG en patiëntprivacy?', a: 'Ja. Alle gesprekken zijn versleuteld, data blijft binnen de EU, we ondertekenen een verwerkersovereenkomst. Patiëntgegevens worden alleen gebruikt voor het verlenen van de dienst.' },
      { q: 'Wat als de AI iets niet weet?', a: 'Dan zegt hij dat eerlijk, biedt aan om door te verbinden of een terugbelverzoek te plannen. Hij verzint nooit antwoorden. Tijdens setup leren we hem alle veelgestelde vragen van jouw praktijk.' },
      { q: 'Kost het echt €100 per maand voor onbeperkt gesprekken?', a: 'Ja, ongeacht het aantal patiëntcontacten. Pas bij extreem hoog volume (10.000+ gesprekken/maand) bespreken we een aangepast pakket. Dat is voor de meeste praktijken niet nodig.' },
    ],
  },

  webshop: {
    key: 'webshop',
    short: 'Webshop',
    pretty: 'webshops & e-commerce',
    callerName: 'OptiStore Klantenservice',
    callerSub: 'Inkomend gesprek - Live demo',
    seo: {
      title: 'AI klantenservice voor webshops | Optivaize',
      description: 'AI assistent die 24/7 bestellingen opzoekt, retouren start en pakketten tracked. Koppelt aan Shopify, WooCommerce, Lightspeed en meer. Live binnen 1-3 dagen.',
      keywords: 'AI klantenservice webshop, e-commerce automatisering, Shopify AI, WooCommerce chatbot, virtuele klantenservice',
    },
    hero: {
      eyebrow: 'Voor webshops & e-commerce',
      h1Lead: 'Een AI klantenservice die elke',
      h1Highlight: 'bestelvraag',
      h1Tail: 'binnen seconden oplost',
      sub: 'Zoekt bestellingen op, tracked pakketten, start retouren en wijzigt adressen. Werkt direct samen met Shopify, WooCommerce, Lightspeed en je verzendpartner.',
      image: unsplash('photo-1556742111-a301076d9d18'), // package on doorstep
      imageAlt: 'Webshop bezorging',
    },
    images: {
      bewezen: unsplash('photo-1607082348824-0a96f2a4b9da', 800),  // warehouse boxes
      flow: unsplash('photo-1556742205-e10c9486e506', 800),         // happy customer with package
      story: unsplash('photo-1556909114-f6e7ad7d3136', 1200),       // online shopping concept
    },
    bewezen: {
      title: 'Bewezen in echte webshops',
      sub: 'Robin draait al mee bij Nederlandse webshops en is gekoppeld aan de tools die jouw store gebruikt voor checkout, betaling en verzending.',
      platforms: [
        { name: 'Shopify', logo: si('shopify') },
        { name: 'WooCommerce', logo: si('woocommerce') },
        { name: 'Magento', logo: si('magento') },
        { name: 'Mollie', logo: si('mollie') },
        { name: 'Klarna', logo: si('klarna') },
        { name: 'PostNL', logo: wm('PostNL', '#FF6600') },
        { name: 'Sendcloud', logo: wm('sendcloud', '#1B73B4') },
        { name: 'Lightspeed', logo: wm('Lightspeed', '#F1623A') },
      ],
    },
    flow: {
      pickup: 100,
      pickupLabel: 'Robin neemt direct op',
      pickupSub: 'Geen wachttijden, geen "u bent nummer 7 in de wachtrij". 24/7 bereikbaar via chat én telefoon.',
      solved: 92,
      solvedLabel: 'Direct opgelost door Robin',
      solvedSub: 'Bestellingen opzoeken, pakket tracken, retouren starten, adressen wijzigen, productvragen beantwoorden.',
      escalated: 8,
      escalatedLabel: 'Met context doorgestuurd',
      escalatedSub: 'Klachten en complexe gevallen gaan met volledige bestelhistorie naar jouw klantenservice.',
    },
    benefits: [
      { title: '92% van vragen automatisch', text: 'Alleen de complexe gevallen bereiken jouw team. Schaal zonder mensen aan te nemen.' },
      { title: 'Geen verloren omzet \'s avonds', text: 'Klanten krijgen direct antwoord op productvragen, ook na sluitingstijd. Conversie omhoog.' },
      { title: 'Gemiddelde reactietijd: 2 sec', text: 'Geen tickets, geen wachten op email. Klant blij, support backlog leeg.' },
    ],
    storyQuote: {
      text: '"Onze chat-tickets zijn met 80% gedaald sinds Robin ze afhandelt. Ons team beantwoordt nu alleen de echt complexe vragen, en sneller."',
      author: 'Tom Janssen',
      role: 'Operations Manager, Nederlandse fashion webshop',
    },
    examples: [
      '"Waar blijft mijn bestelling OPT-100234?"',
      '"Ik wil bestelling OPT-100256 retourneren, hij is beschadigd."',
      '"Kan ik het bezorgadres van OPT-100271 nog wijzigen?"',
      '"Wanneer komt de Sony WH-1000XM5 weer op voorraad?"',
    ],
    faqs: [
      { q: 'Aan welke webshop platforms kunnen jullie koppelen?', a: 'Out-of-the-box: Shopify, WooCommerce, Magento, Lightspeed, CCV Shop. Voor andere platforms koppelen we via API of webhook. We koppelen ook aan je verzendpartner (PostNL, DHL, DPD, Sendcloud) en betaalsystemen (Mollie, Klarna).' },
      { q: 'Werkt het voor zowel telefoon als webchat?', a: 'Ja. Dezelfde assistent kan via een telefoonnummer (VoIP), via de chat-widget op je website, en via WhatsApp Business werken. Je krijgt één assistent voor alle kanalen.' },
      { q: 'Wat als er een klacht binnenkomt?', a: 'Robin herkent klachten en escaleert automatisch met de volledige gespreksgeschiedenis en bestelinfo naar jouw team. De klant hoeft niet opnieuw uit te leggen.' },
      { q: 'Hoe zit het met productvragen waarop hij geen antwoord weet?', a: 'Tijdens setup importeren we je productcatalogus. Voor specifieke vragen biedt hij aan om je terug te bellen of door te verbinden naar verkoop. Hij verzint nooit specs.' },
      { q: 'Schaalt het mee als ik groei?', a: 'Ja - €100/maand blijft hetzelfde of je nu 100 of 5.000 contacten per maand hebt. Geen per-seat of per-ticket kosten.' },
    ],
  },

  restaurant: {
    key: 'restaurant',
    short: 'Restaurant',
    pretty: 'restaurants & horeca',
    callerName: 'Restaurant De Nederlanden',
    callerSub: 'Inkomend gesprek - Live demo',
    seo: {
      title: 'AI reserveringsassistent voor restaurants | Optivaize',
      description: 'AI gastvrouw die 24/7 reserveringen aanneemt, verzet en annuleert. Koppelt aan Untill, Formitable en TheFork. Live binnen 1-3 dagen.',
      keywords: 'AI restaurant reserveringen, virtuele gastvrouw, restaurant automatisering, Untill koppeling, Formitable AI',
    },
    hero: {
      eyebrow: 'Voor restaurants & horeca',
      h1Lead: 'Een AI gastvrouw die jouw',
      h1Highlight: 'restaurant',
      h1Tail: '24/7 aan de telefoon heeft',
      sub: 'Neemt reserveringen aan, beantwoordt vragen over het menu, verzet of annuleert. Ook \'s middags tijdens de lunch en \'s avonds tijdens de drukte. Werkt naadloos met je tafelplanning.',
      image: unsplash('photo-1414235077428-338989a2e8c0'), // elegant restaurant interior
      imageAlt: 'Restaurant interieur',
    },
    images: {
      bewezen: unsplash('photo-1551782450-a2132b4ba21d', 800),     // chef plating
      flow: unsplash('photo-1559339352-11d035aa65de', 800),         // waiter at table
      story: unsplash('photo-1559329007-40df8a9345d8', 1200),       // dining couple cheering
    },
    bewezen: {
      title: 'Bewezen in echte restaurants',
      sub: 'Robin draait mee bij Nederlandse restaurants en koppelt aan de reserverings- en kassasystemen die je al gebruikt.',
      platforms: [
        { name: 'OpenTable', logo: si('opentable') },
        { name: 'Untill', logo: wm('untill', '#E5322D') },
        { name: 'Formitable', logo: wm('formitable', '#1A4731') },
        { name: 'Lightspeed', logo: wm('Lightspeed', '#F1623A') },
        { name: 'ResDiary', logo: wm('ResDiary', '#003B5C') },
        { name: 'TheFork', logo: wm('TheFork', '#7AC143') },
        { name: 'Eet.nu', logo: wm('eet.nu', '#E32119') },
      ],
    },
    flow: {
      pickup: 100,
      pickupLabel: 'Robin neemt direct op',
      pickupSub: 'Niemand meer aan de telefoon tijdens de lunch- of dinershift. Reserveringen lopen door als je team aan tafel staat.',
      solved: 84,
      solvedLabel: 'Direct opgelost door Robin',
      solvedSub: 'Tafel boeken, verzetten, annuleren. Vragen over menu, allergenen, dieetwensen, openingstijden en parkeren.',
      escalated: 16,
      escalatedLabel: 'Met context doorgestuurd',
      escalatedSub: 'Grote groepen, privé-events of allergie-overleg gaan met volledige info naar de manager.',
    },
    benefits: [
      { title: '20+ uur per week tijd terug', text: 'Geen telefoononderbrekingen meer tijdens shifts. Je team blijft bij de gasten in de zaal.' },
      { title: 'Reserveringen ook \'s nachts', text: 'Mensen plannen \'s avonds laat een diner voor het weekend. Voortaan loopt dat gewoon door.' },
      { title: 'Geen no-shows', text: 'Robin belt automatisch terug om reserveringen te bevestigen en biedt een verzetoptie aan.' },
    ],
    storyQuote: {
      text: '"De telefoon ging vroeger 30 keer per dienst. Nu nog 5. Mijn gastvrouw kan eindelijk gewoon gastvrouw zijn."',
      author: 'Pieter Hofman',
      role: 'Eigenaar, restaurant in Amsterdam',
    },
    examples: [
      '"Ik wil graag reserveren voor zaterdag, met 4 personen om 19:00."',
      '"Kunnen jullie ook vegetarisch koken? Eén persoon is glutenvrij."',
      '"Mijn reservering op naam van Hendriks wil ik annuleren."',
      '"Hebben jullie nog plek vanavond voor 2 personen?"',
    ],
    faqs: [
      { q: 'Welke reserveringssystemen zijn ondersteund?', a: 'Untill, Formitable, Lightspeed K-Series, ResDiary, TheFork, OpenTable. Andere systemen koppelen we op aanvraag. Reserveringen verschijnen direct in jouw bestaande tafelplan.' },
      { q: 'Wat met grote groepen of privé-events?', a: 'Robin herkent grotere boekingen (>6 personen) en complexe events en draagt die over aan jouw manager. De gast voelt geen drempel.' },
      { q: 'Hoe gaat hij om met allergieën?', a: 'Hij vraagt expliciet naar allergenen en dieetwensen, noteert die bij de reservering en seint indien nodig de keuken in. Bij ernstige allergieën verbindt hij door met de chef.' },
      { q: 'Kan hij ook in andere talen?', a: 'Standaard Nederlands, op verzoek ook Engels en Duits voor restaurants in toeristische gebieden. Hij switcht automatisch op basis van de taal van de beller.' },
      { q: 'Hoe wordt no-show verminderd?', a: 'Robin belt of WhatsApp\'t automatisch een dag van tevoren om de reservering te bevestigen. Geen reactie binnen 24u? Hij belt opnieuw of stelt verzetten voor. Bewezen 30-50% minder no-shows.' },
    ],
  },

  makelaar: {
    key: 'makelaar',
    short: 'Makelaar',
    pretty: 'makelaardij & vastgoed',
    callerName: 'Makelaardij Optivaize',
    callerSub: 'Inkomend gesprek - Live demo',
    seo: {
      title: 'AI assistent voor makelaars en vastgoedkantoren | Optivaize',
      description: 'AI assistent die leads kwalificeert, bezichtigingen plant en woningvragen beantwoordt. Koppelt aan Realworks, Funda en je CRM. Live binnen 1-3 dagen.',
      keywords: 'AI makelaar, vastgoed automatisering, Realworks koppeling, Funda AI, leadkwalificatie makelaar',
    },
    hero: {
      eyebrow: 'Voor makelaars & vastgoed',
      h1Lead: 'Een AI assistent die elke',
      h1Highlight: 'lead',
      h1Tail: 'kwalificeert - ook \'s avonds',
      sub: 'Plant bezichtigingen, beantwoordt woningvragen, kwalificeert leads en vraagt budget en wensen uit. Direct gekoppeld aan jouw CRM en aan Funda.',
      image: unsplash('photo-1564013799919-ab600027ffc6'), // contemporary house exterior
      imageAlt: 'Moderne woning te koop',
    },
    images: {
      bewezen: unsplash('photo-1600585154340-be6161a56a0c', 800),  // modern living room
      flow: unsplash('photo-1582268611958-ebfd161ef9cf', 800),      // keys handover
      story: unsplash('photo-1560518883-ce09059eeffa', 1200),       // family in front of new home
    },
    bewezen: {
      title: 'Bewezen in echte makelaarskantoren',
      sub: 'Robin werkt al voor Nederlandse makelaars en koppelt aan de tools die je dagelijks gebruikt voor woningbeheer en leadopvolging.',
      platforms: [
        { name: 'Realworks', logo: wm('Realworks', '#003E7E') },
        { name: 'Funda', logo: wm('funda', '#E2231A') },
        { name: 'Skarabee', logo: wm('Skarabee', '#1A4FB0') },
        { name: 'Move.it', logo: wm('Move.it', '#0F766E') },
        { name: 'HubSpot', logo: si('hubspot') },
        { name: 'Pipedrive', logo: si('pipedrive') },
        { name: 'Pro6PP', logo: wm('Pro6PP', '#FF6F3C') },
      ],
    },
    flow: {
      pickup: 100,
      pickupLabel: 'Robin neemt direct op',
      pickupSub: 'Mensen bellen ook \'s avonds en in het weekend - juist dan zijn ze thuis aan het zoeken. De assistent staat altijd aan.',
      solved: 88,
      solvedLabel: 'Direct gekwalificeerd door Robin',
      solvedSub: 'Vraagt budget, wensen, urgentie en contactgegevens uit. Plant bezichtigingen direct in jouw agenda.',
      escalated: 12,
      escalatedLabel: 'Met volledig profiel doorgestuurd',
      escalatedSub: 'Bod uitbrengen of onderhandelen gaat naar de makelaar - met volledig leadprofiel én transcriptie.',
    },
    benefits: [
      { title: '88% van leads gekwalificeerd', text: 'Geen tijd meer aan onbruikbare leads. Je makelaars zien alleen serieuze kopers met budget.' },
      { title: 'Bezichtigingen direct in agenda', text: 'Robin kijkt in jouw agenda, stelt opties voor en boekt direct. Geen heen-en-weer meer.' },
      { title: 'Funda-leads niet verloren', text: 'Een Funda-lead is binnen 5 minuten gebeld. Geen email-tickets meer die een dag later worden opgepakt.' },
    ],
    storyQuote: {
      text: '"Onze makelaars zien nu alleen leads met budget en urgentie. Geen koffieafspraken meer met mensen die toch nog niets willen kopen."',
      author: 'Sandra de Vries',
      role: 'Vestigingsmanager, makelaarskantoor Utrecht',
    },
    examples: [
      '"Ik zoek een huis in Utrecht tot 700.000 met minimaal 3 kamers."',
      '"Kan ik volgende week een bezichtiging plannen voor Maliebaan 12?"',
      '"Mijn naam is Jan, budget 800k, ik wil binnen 3 maanden iets vinden."',
      '"Welke woningen hebben jullie in Bilthoven boven de 4 ton?"',
    ],
    faqs: [
      { q: 'Welke makelaarssystemen ondersteunen jullie?', a: 'Realworks, Skarabee, Move.it. We koppelen direct aan Funda voor woninginfo, en aan Pro6PP voor postcode-validatie. CRM\'s zoals Hubspot en Pipedrive werken via API.' },
      { q: 'Kan hij ook bod uitbrengen of onderhandelen?', a: 'Nee, en dat is met opzet. Onderhandelen blijft mensenwerk. Hij kwalificeert, geeft info, plant bezichtigingen - en draagt serieuze interesse over aan jouw makelaar.' },
      { q: 'Hoe wordt een lead gescoord?', a: 'Robin vraagt budget, urgentie (direct/3-6mnd/oriënterend), gewenste regio en type woning uit. Je krijgt een volledig profiel in je CRM, niet alleen "iemand belde".' },
      { q: 'Werkt het ook voor verkopers (taxatie/intake)?', a: 'Ja. Voor taxatie-aanvragen of verkopers die een waardebepaling willen, plant hij een intakegesprek met jouw makelaar in. Werkt voor zowel koop als verkoop.' },
      { q: 'Wat als de woning al verkocht is?', a: 'Hij ziet realtime de status in Funda/Realworks. Bij verkochte woningen biedt hij vergelijkbare alternatieven aan en kwalificeert alsnog de lead voor toekomstige aanbod.' },
    ],
  },
};

export const NICHE_KEYS = Object.keys(NICHES);

export function getNiche(key) {
  return NICHES[key] || null;
}

// Site-wide CTA contact info, used on all niche pages
export const CTA_CONTACT = {
  phone: '+31 6 42 69 89 18',
  phoneHref: 'tel:+31642698918',
  email: 'info@optivaize.nl',
  emailHref: 'mailto:info@optivaize.nl',
};
