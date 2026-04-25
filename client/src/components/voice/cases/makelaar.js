'use client';
import React from 'react';
import styled from 'styled-components';
import { Home, MapPin, Bed, Maximize, Calendar, User, CheckCircle } from 'lucide-react';
import { Panel, PanelHeader, PanelTitle, Badge, Subtle } from './_shared';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`;

const PropCard = styled.div`
  border: 1px solid ${(p) => (p.$dim ? '#E2E8F0' : (p.$active ? '#3B82F6' : '#E2E8F0'))};
  border-radius: 12px;
  padding: 0.85rem;
  background: ${(p) => (p.$active ? 'linear-gradient(135deg, #EFF6FF, #DBEAFE)' : 'white')};
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  opacity: ${(p) => (p.$dim ? 0.4 : 1)};
  transition: all 0.3s ease;
`;

const Address = styled.div`
  font-weight: 700;
  font-size: 0.85rem;
  color: #0F172A;
`;

const City = styled.div`
  font-size: 0.7rem;
  color: #64748B;
  display: flex;
  align-items: center;
  gap: 3px;
`;

const Specs = styled.div`
  display: flex;
  gap: 0.7rem;
  font-size: 0.72rem;
  color: #475569;
`;

const Spec = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 3px;
`;

const Price = styled.div`
  font-weight: 700;
  color: #1E40AF;
  font-size: 1rem;
`;

const Section = styled.div`
  background: #F8FAFC;
  border-radius: 12px;
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
`;

const SectionTitle = styled.div`
  font-weight: 700;
  font-size: 0.78rem;
  color: #0F172A;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const ViewingRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #334155;
  padding: 0.3rem 0;
  border-bottom: 1px dashed #E2E8F0;
  &:last-child { border-bottom: none; }
`;

const LeadRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  padding: 0.2rem 0;
  span:first-child { color: #64748B; }
  span:last-child { color: #0F172A; font-weight: 600; }
`;

export const initialState = {
  properties: [
    { id: 'WON-001', adres: 'Maliebaan 12', stad: 'Utrecht', prijs: 695000, kamers: 4, m2: 145, foto: '#3B82F6' },
    { id: 'WON-002', adres: 'Soestdijkseweg 88', stad: 'Bilthoven', prijs: 825000, kamers: 5, m2: 180, foto: '#10B981' },
    { id: 'WON-003', adres: 'Vondellaan 24', stad: 'Utrecht', prijs: 525000, kamers: 3, m2: 110, foto: '#F59E0B' },
    { id: 'WON-004', adres: 'Slotlaan 156', stad: 'Zeist', prijs: 599000, kamers: 4, m2: 130, foto: '#8B5CF6' },
    { id: 'WON-005', adres: 'Grift 7', stad: 'Utrecht', prijs: 1150000, kamers: 6, m2: 220, foto: '#EF4444' },
    { id: 'WON-006', adres: 'Korte Jansstraat 4', stad: 'Utrecht', prijs: 449000, kamers: 2, m2: 78, foto: '#14B8A6' },
  ],
  filteredIds: null,
  activeId: null,
  viewings: [],
  lead: null,
};

export function executeTool(name, args, state, setState) {
  switch (name) {
    case 'zoek_woningen': {
      const min = args.min_prijs || 0;
      const max = args.max_prijs || Infinity;
      const minK = args.min_kamers || 0;
      const stad = (args.stad || '').toLowerCase();
      const matches = state.properties.filter((p) =>
        p.prijs >= min && p.prijs <= max && p.kamers >= minK && (!stad || p.stad.toLowerCase().includes(stad))
      );
      setState((s) => ({ ...s, filteredIds: matches.map((m) => m.id), activeId: null }));
      return {
        ok: true,
        aantal: matches.length,
        woningen: matches.slice(0, 4).map((m) => ({ id: m.id, adres: m.adres, stad: m.stad, prijs: m.prijs, kamers: m.kamers, m2: m.m2 })),
      };
    }
    case 'plan_bezichtiging': {
      const woning = state.properties.find((p) => p.id.toUpperCase() === (args.woning_id || '').toUpperCase());
      if (!woning) return { ok: false, error: 'Woning niet gevonden' };
      const v = { id: Math.random().toString(36).slice(2, 8), woning_id: woning.id, adres: woning.adres, datum: args.datum, tijd: args.tijd, naam: args.naam, telefoon: args.telefoon };
      setState((s) => ({ ...s, viewings: [...s.viewings, v], activeId: woning.id }));
      return { ok: true, bevestiging: `Bezichtiging gepland voor ${args.naam} op ${args.datum} om ${args.tijd} - ${woning.adres}, ${woning.stad}` };
    }
    case 'kwalificeer_lead': {
      const lead = { naam: args.naam, email: args.email, telefoon: args.telefoon, budget: args.budget, voorkeur: args.voorkeur, urgentie: args.urgentie };
      setState((s) => ({ ...s, lead }));
      return { ok: true, bevestiging: 'Leadgegevens vastgelegd. Een makelaar neemt binnen 24 uur contact op.' };
    }
    default:
      return { ok: false, error: `Onbekende functie ${name}` };
  }
}

const URG_LABELS = { direct: 'Direct', '3_maanden': 'Binnen 3 mnd', '6_maanden': 'Binnen 6 mnd', orienterend: 'Oriënterend' };

export function Component({ state }) {
  const filtered = state.filteredIds ? new Set(state.filteredIds) : null;
  return (
    <Panel>
      <PanelHeader>
        <PanelTitle><Home size={18} color="#3B82F6" /> Makelaardij Optivaize</PanelTitle>
        <Badge $bg="#DCFCE7" $color="#065F46">{state.properties.length} woningen</Badge>
      </PanelHeader>
      <Subtle>Vraag de assistent om woningen te zoeken op budget en stad, een bezichtiging te plannen, of je gegevens vast te leggen.</Subtle>
      <Grid>
        {state.properties.map((p) => (
          <PropCard key={p.id} $active={p.id === state.activeId} $dim={filtered && !filtered.has(p.id)}>
            <div style={{ height: 50, borderRadius: 8, background: `linear-gradient(135deg, ${p.foto}, ${p.foto}88)`, display: 'flex', alignItems: 'flex-end', padding: '0.3rem 0.5rem' }}>
              <Badge $bg="rgba(255,255,255,0.85)" $color="#0F172A">{p.id}</Badge>
            </div>
            <Address>{p.adres}</Address>
            <City><MapPin size={11} /> {p.stad}</City>
            <Specs>
              <Spec><Bed size={11} /> {p.kamers} kamers</Spec>
              <Spec><Maximize size={11} /> {p.m2} m²</Spec>
            </Specs>
            <Price>€{p.prijs.toLocaleString('nl-NL')}</Price>
          </PropCard>
        ))}
      </Grid>

      {state.viewings.length > 0 && (
        <Section>
          <SectionTitle><Calendar size={13} color="#3B82F6" /> Geplande bezichtigingen</SectionTitle>
          {state.viewings.map((v) => (
            <ViewingRow key={v.id}>
              <span>{v.adres} - {v.naam}</span>
              <span>{v.datum} {v.tijd}</span>
            </ViewingRow>
          ))}
        </Section>
      )}

      {state.lead && (
        <Section>
          <SectionTitle><User size={13} color="#10B981" /> Lead vastgelegd <CheckCircle size={13} color="#10B981" /></SectionTitle>
          <LeadRow><span>Naam</span><span>{state.lead.naam}</span></LeadRow>
          {state.lead.email && <LeadRow><span>Email</span><span>{state.lead.email}</span></LeadRow>}
          {state.lead.telefoon && <LeadRow><span>Telefoon</span><span>{state.lead.telefoon}</span></LeadRow>}
          <LeadRow><span>Budget</span><span>€{state.lead.budget?.toLocaleString('nl-NL')}</span></LeadRow>
          <LeadRow><span>Urgentie</span><span>{URG_LABELS[state.lead.urgentie] || state.lead.urgentie}</span></LeadRow>
          {state.lead.voorkeur && <LeadRow><span>Wensen</span><span>{state.lead.voorkeur}</span></LeadRow>}
        </Section>
      )}
    </Panel>
  );
}
