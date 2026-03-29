'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Brain, 
  Mail, 
  ShoppingBag, 
  FileText, 
  MessageCircle, 
  TrendingUp, 
  Target,
  Crown,
  ChevronDown,
  X
} from 'lucide-react';

const ServicesSection = styled.section`
  id: services;
  padding: 6rem 0;
  background: white;
`;

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 42px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 18px;
  color: #64748B;
  max-width: 600px;
  margin: 0 auto;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  border: 2px solid transparent;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    border-color: rgba(59, 130, 246, 0.3);
  }
`;

const FullscreenModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(10px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 20px;
  max-width: 900px;
  max-height: 90vh;
  width: 100%;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(15, 23, 42, 0.1);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10001;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(15, 23, 42, 0.2);
    transform: scale(1.1);
  }
`;

const CardHeader = styled.div`
  padding: 2rem;
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
`;

const IconContainer = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: linear-gradient(135deg, ${props => props.primaryColor}, ${props => props.secondaryColor});
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const CardContent = styled.div`
  flex: 1;
`;

const CardTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 0.5rem;
`;

const ServiceDescription = styled.div`
  font-size: 16px;
  color: #3B82F6;
  font-weight: 600;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 8px;
  border-left: 4px solid #3B82F6;
`;

const ExpandButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 14px;
  font-weight: 600;
  color: #3B82F6;
`;

const InfographicContainer = styled.div`
  padding: 2rem 0;
`;

const ProcessFlow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  max-width: 800px;
  margin: 0 auto;
`;

const ProcessStep = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  background: ${props => props.background || '#F8FAFC'};
  position: relative;
  border-radius: 16px;
  margin-bottom: 2.5rem;
  border: 2px solid ${props => props.accent || '#3B82F6'};
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2rem;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 15px solid ${props => props.accent || '#3B82F6'};
  }
  
  &:last-child::after {
    display: none;
  }
  
  &:last-child {
    margin-bottom: 1rem;
  }
`;

const StepNumber = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.color || '#3B82F6'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.h4`
  font-size: 20px;
  font-weight: 600;
  color: #0F172A;
  margin-bottom: 0.5rem;
`;

const StepDescription = styled.p`
  font-size: 16px;
  color: #64748B;
  line-height: 1.5;
`;

const servicesData = [
  {
    id: 'ai-strategy',
    icon: Brain,
    primaryColor: '#3B82F6',
    secondaryColor: '#1D4ED8',
    title: 'AI Presentatie',
    description: 'Neem je team mee in de nieuwste AI-trends en tools. We helpen je organisatie AI beter te begrijpen en gericht toe te passen met een presentatie en sessies op maat.',
    steps: [
      { title: 'Kick-off sessie', description: 'We brengen in kaart welke tijdrovende processen de effici\u00ebntie drukken en waar teams vastlopen in terugkerend werk.', number: 1 },
      { title: 'Analyse & afstemming met management', description: 'Op basis van de kick-off analyseren we kansen en bespreken we de belangrijkste verbeterpunten met het management voordat we de presentatie geven.', number: 2 },
      { title: 'Presentatie op maat', description: 'We gaan in gesprek met het kernteam en bouwen draagvlak door kansen concreet te maken. Het uitgangspunt: AI helpt mensen sneller en slimmer te werken, niet om ze te vervangen.', number: 3 },
      { title: 'Afdelingssessies', description: 'Per afdeling duiken we in de specifieke werkwijze en identificeren we kansen om stappen te automatiseren met AI of direct toepasbare tools te introduceren.', number: 4 },
      { title: 'Praktische handleiding', description: 'We bundelen alle inzichten in een duidelijke handleiding: hoe je ChatGPT veilig en effectief inzet, hoe je custom GPT\'s traint voor specifieke taken en welke kansen er nog liggen.', number: 5 },
      { title: 'Opvolging', description: 'Na ongeveer een maand plannen we een follow-up om de winst te evalueren, vragen te beantwoorden en verdere optimalisaties door te voeren.', number: 6 }
    ]
  },
  {
    id: 'email-ai',
    icon: Mail,
    primaryColor: '#10B981',
    secondaryColor: '#059669',
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
    icon: ShoppingBag,
    primaryColor: '#8B5CF6',
    secondaryColor: '#7C3AED',
    title: 'AI Producttekstschrijver',
    description: 'AI-gestuurde producttekstoptimalisatie die beschrijvingen herschrijft naar meer overtuigende, SEO-vriendelijke teksten, met behoud van je merkstem, overal waar je publiceert.',
    steps: [
      { title: 'Productteksten verzamelen', description: 'We verzamelen je huidige productteksten en exporteren ze naar een CSV (Excel-formaat). Zo hebben we \u00e9\u00e9n overzicht en kunnen we alles consistent verbeteren, ongeacht of je Shopify, WooCommerce of een maatwerkplatform gebruikt.', number: 1 },
      { title: 'Model trainen op je merkstem', description: 'We trainen het model op teksten die zijn afgestemd op je tone of voice. Daardoor klinkt elke nieuwe of herschreven productbeschrijving als "je merk".', number: 2 },
      { title: 'Herschrijven & optimaliseren', description: 'Met het getrainde model herschrijven we alle productteksten: helderder, aantrekkelijker en meer gericht op conversie, zonder je stijl te verliezen. Je ontvangt alles in een bestand om te reviewen.', number: 3 },
      { title: 'SEO verrijken', description: 'We analyseren zoekgedrag (o.a. seizoenspatronen) en verwerken relevante keywords natuurlijk in de tekst. Zo verbeteren vindbaarheid en organisch verkeer, het hele jaar door.', number: 4 },
      { title: 'Review & live zetten', description: 'Je team kan de nieuwe teksten controleren. Na akkoord helpen we met het terugplaatsen in je systeem en zorgen we voor een soepele implementatie.', number: 5 }
    ]
  },
  {
    id: 'blog-writer',
    icon: FileText,
    primaryColor: '#F59E0B',
    secondaryColor: '#D97706',
    title: 'AI Blogschrijver',
    description: 'Geautomatiseerde SEO-blogcreatie waarmee je concurreert op waardevolle zoekwoorden en advertentiekosten verlaagt via slimme content en automatische publicatie.',
    steps: [
      { title: 'Concurrentieonderzoek', description: 'We analyseren welke zoekwoorden concurrenten targeten (bijv. via Ahrefs) en waar kansen liggen om relevanter te worden voor Google.', number: 1 },
      { title: 'Zoekwoorden kiezen', description: 'We selecteren zoekwoorden die je nu veel geld kosten in SEA. Door hier organisch op te ranken, kun je budget verschuiven naar goedkopere, minder competitieve campagnes.', number: 2 },
      { title: 'Model afstemmen', description: 'We fine-tunen een model op je merk en branche, zodat de content natuurlijk leest \u00e9n je keywords op een geloofwaardige manier verwerkt.', number: 3 },
      { title: 'AI-SEO aanpak', description: 'We richten content zo in dat deze ook goed kan verschijnen in AI-samenvattingen en featured snippets. Daarvoor passen we structuur en formuleringen strategisch toe.', number: 4 },
      { title: 'Automatisch publiceren', description: 'We koppelen een auto-publish flow aan je platform (maatwerk, Shopify, WordPress of WooCommerce) en publiceren volgens een strategische planning, volledig geautomatiseerd.', number: 5 }
    ]
  },
  {
    id: 'linkedin-automation',
    icon: Target,
    primaryColor: '#EF4444',
    secondaryColor: '#DC2626',
    title: 'AI LinkedIn Sales Bot',
    description: 'Een volledig geautomatiseerd LinkedIn-sales systeem dat prospects vindt, gepersonaliseerde campagnes uitrolt en connecties helpt omzetten naar klanten.',
    steps: [
      { title: 'Prospects bepalen', description: 'We defini\u00ebren en vinden je ideale doelgroep op LinkedIn met slimme filters en AI-analyse (bedrijfsgrootte, functietitel, branche, engagement).', number: 1 },
      { title: 'Campagnes & hooks', description: 'We bouwen meerdere benaderingen (bijv. waardevolle PDF, intake/consult, of directe pitch) en testen hooks die reacties uitlokken.', number: 2 },
      { title: 'LLM trainen op je stijl', description: 'We trainen een model op je eerdere gesprekken, zodat berichten persoonlijk, consistent en herkenbaar blijven in je tone of voice.', number: 3 },
      { title: 'Automatisch uitvoeren & optimaliseren', description: 'Het systeem draait campagnes en stuurt bij op basis van data (acceptatie, opens, replies). Zo verbeteren resultaten continu zonder extra handwerk.', number: 4 },
      { title: 'Multi-channel opvolging', description: 'We koppelen LinkedIn aan e-mail opvolging en tracken de klantreis van connectie tot klant, met inzicht in conversies en ROI.', number: 5 }
    ]
  },
  {
    id: 'chatbot',
    icon: MessageCircle,
    primaryColor: '#06B6D4',
    secondaryColor: '#0891B2',
    title: 'AI Chatbot',
    description: 'Een AI-chatbot die is getraind op je gesprekken en daardoor je toon en service-stijl overneemt. Optioneel met "personal shopper" functies voor webshops.',
    steps: [
      { title: 'Data verzamelen & analyseren', description: 'We verzamelen historische gesprekken (e-mail, chat, calls, tickets, social) en analyseren patronen: vragen, oplossingen, tone of voice en service-standaarden.', number: 1 },
      { title: 'Tone of voice in kaart', description: 'Met NLP leggen we vast hoe je reageert in verschillende situaties en welke formuleringen het beste werken, zodat de bot natuurlijk en passend klinkt.', number: 2 },
      { title: 'Model trainen & testen', description: 'We fine-tunen het taalmodel op je data en testen het met realistische scenario\'s tot de kwaliteit en consistentie klopt.', number: 3 },
      { title: 'Personal shopper (optioneel)', description: 'Voor webshops voegen we een assistent toe die op basis van voorkeuren en context producten adviseert en combinaties voorstelt.', number: 4 },
      { title: 'Integreren in je kanalen', description: 'We plaatsen de chatbot op je website en andere kanalen (bijv. Shopify en social), inclusief slimme "handoff" naar een medewerker wanneer nodig.', number: 5 },
      { title: 'Doorlopend verbeteren', description: 'De bot leert bij op basis van feedback, uitkomsten en conversies, zodat prestaties en klanttevredenheid blijven stijgen.', number: 6 }
    ]
  },
  {
    id: 'featured-snippets',
    icon: Crown,
    primaryColor: '#F97316',
    secondaryColor: '#EA580C',
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
];

function Services() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [selectedService, setSelectedService] = useState(null);

  const handleCardClick = (service) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  return (
    <ServicesSection id="services" ref={ref}>
      <Container>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            Onze AI Oplossingen
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          >
            Klik op een dienst en ontdek hoe we dit aanpakken
          </SectionSubtitle>
        </SectionHeader>

        <ServicesGrid>
          {servicesData.map((service, index) => {
            const Icon = service.icon;

            return (
              <ServiceCard
                key={service.id}
                onClick={() => handleCardClick(service)}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.05,
                  ease: [0.4, 0, 0.2, 1] 
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <CardHeader>
                  <IconContainer 
                    primaryColor={service.primaryColor}
                    secondaryColor={service.secondaryColor}
                  >
                    <Icon size={32} />
                  </IconContainer>
                  <CardContent>
                    <CardTitle>{service.title}</CardTitle>
                    <ServiceDescription>
                      {service.description}
                    </ServiceDescription>
                    <ExpandButton>
                      Zo werkt het
                      <ChevronDown size={16} />
                    </ExpandButton>
                  </CardContent>
                </CardHeader>
              </ServiceCard>
            );
          })}
        </ServicesGrid>

        <AnimatePresence>
          {selectedService && (
            <FullscreenModal
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeModal}
            >
              <ModalContent
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                <CloseButton
                  onClick={closeModal}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={24} />
                </CloseButton>

                <CardHeader>
                  <IconContainer 
                    primaryColor={selectedService.primaryColor}
                    secondaryColor={selectedService.secondaryColor}
                  >
                    {React.createElement(selectedService.icon, { size: 32 })}
                  </IconContainer>
                  <CardContent>
                    <CardTitle>{selectedService.title}</CardTitle>
                    <ServiceDescription>
                      {selectedService.description}
                    </ServiceDescription>
                  </CardContent>
                </CardHeader>

                <InfographicContainer style={{ padding: '0 2rem 2rem' }}>
                  <ProcessFlow>
                    {selectedService.steps.map((step, stepIndex) => (
                      <ProcessStep
                        key={step.number}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: stepIndex * 0.05 
                        }}
                        background={`${selectedService.primaryColor}10`}
                        accent={selectedService.primaryColor}
                      >
                        <StepNumber color={selectedService.primaryColor}>
                          {step.number}
                        </StepNumber>
                        <StepContent>
                          <StepTitle>{step.title}</StepTitle>
                          <StepDescription>{step.description}</StepDescription>
                        </StepContent>
                      </ProcessStep>
                    ))}
                  </ProcessFlow>

                </InfographicContainer>
              </ModalContent>
            </FullscreenModal>
          )}
        </AnimatePresence>
      </Container>
    </ServicesSection>
  );
}

export default Services;