'use client';
import React from 'react';
import styled from 'styled-components';
import { Package, ShoppingBag, Truck, RotateCcw, MapPin } from 'lucide-react';
import { Panel, PanelHeader, PanelTitle, Badge, Subtle, Empty } from './_shared';

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  overflow-y: auto;
  max-height: 420px;
`;

const Card = styled.div`
  border: 1px solid ${(p) => (p.$active ? '#3B82F6' : '#E2E8F0')};
  border-radius: 12px;
  padding: 0.85rem 1rem;
  background: ${(p) => (p.$active ? 'linear-gradient(135deg, #EFF6FF, #DBEAFE)' : 'white')};
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  transition: all 0.25s ease;
  ${(p) => p.$active && 'box-shadow: 0 4px 16px rgba(59,130,246,0.18);'}
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
`;

const OrderId = styled.div`
  font-weight: 700;
  color: #0F172A;
  font-family: monospace;
`;

const Items = styled.div`
  font-size: 0.78rem;
  color: #475569;
`;

const Tracking = styled.div`
  background: #F8FAFC;
  border-radius: 8px;
  padding: 0.6rem 0.8rem;
  margin-top: 0.4rem;
  font-size: 0.78rem;
  color: #334155;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const STATUS_META = {
  in_behandeling: { label: 'In behandeling', bg: '#FEF3C7', color: '#92400E' },
  verzonden: { label: 'Verzonden', bg: '#DBEAFE', color: '#1E3A8A' },
  bezorgd: { label: 'Bezorgd', bg: '#DCFCE7', color: '#065F46' },
  retour_aangevraagd: { label: 'Retour aangevraagd', bg: '#FCE7F3', color: '#9D174D' },
  geannuleerd: { label: 'Geannuleerd', bg: '#FEE2E2', color: '#991B1B' },
};

export const initialState = {
  orders: [
    { nummer: 'OPT-100234', datum: '2026-04-22', items: 'Sony WH-1000XM5 koptelefoon', totaal: 379, status: 'verzonden', adres: 'Hoofdstraat 12, 3511 AA Utrecht', tracking: ['22-04 ontvangen', '23-04 verwerkt in distributiecentrum', '24-04 onderweg naar PostNL'] },
    { nummer: 'OPT-100256', datum: '2026-04-23', items: 'Apple AirPods Pro 2', totaal: 279, status: 'bezorgd', adres: 'Stationsplein 4, 3511 ED Utrecht', tracking: ['23-04 verzonden', '24-04 bezorgd om 11:42 door PostNL'] },
    { nummer: 'OPT-100271', datum: '2026-04-24', items: 'Logitech MX Master 3S muis, USB-C kabel 2m', totaal: 134, status: 'in_behandeling', adres: 'Kerkstraat 88, 3581 RV Utrecht', tracking: ['Bestelling ontvangen, wordt voorbereid voor verzending'] },
    { nummer: 'OPT-100289', datum: '2026-04-25', items: 'Samsung Galaxy Tab S9 256GB', totaal: 849, status: 'in_behandeling', adres: 'Maliebaan 50, 3581 CB Utrecht', tracking: ['Bestelling ontvangen, op voorraad'] },
    { nummer: 'OPT-100190', datum: '2026-04-19', items: 'Dell XPS 15 laptop', totaal: 2199, status: 'bezorgd', adres: 'Domplein 1, 3512 JC Utrecht', tracking: ['19-04 verzonden', '20-04 bezorgd om 09:18'] },
    { nummer: 'OPT-100150', datum: '2026-04-15', items: 'Nintendo Switch OLED', totaal: 349, status: 'retour_aangevraagd', adres: 'Lange Nieuwstraat 22, 3512 PG Utrecht', tracking: ['15-04 verzonden', '16-04 bezorgd', '23-04 retourlabel verstuurd per email'] },
  ],
  activeNummer: null,
  showTracking: false,
};

function findOrder(orders, nummer) {
  if (!nummer) return -1;
  const n = nummer.toUpperCase().trim();
  return orders.findIndex((o) => o.nummer.toUpperCase() === n);
}

export function executeTool(name, args, state, setState) {
  const idx = findOrder(state.orders, args.bestelnummer);
  switch (name) {
    case 'zoek_bestelling': {
      if (idx < 0) return { ok: false, error: `Geen bestelling gevonden met nummer ${args.bestelnummer}` };
      setState((s) => ({ ...s, activeNummer: s.orders[idx].nummer, showTracking: false }));
      const o = state.orders[idx];
      return { ok: true, nummer: o.nummer, datum: o.datum, items: o.items, totaal: o.totaal, status: STATUS_META[o.status].label, adres: o.adres };
    }
    case 'track_pakket': {
      if (idx < 0) return { ok: false, error: 'Geen bestelling gevonden' };
      setState((s) => ({ ...s, activeNummer: s.orders[idx].nummer, showTracking: true }));
      return { ok: true, status: STATUS_META[state.orders[idx].status].label, tracking: state.orders[idx].tracking };
    }
    case 'start_retour': {
      if (idx < 0) return { ok: false, error: 'Geen bestelling gevonden' };
      setState((s) => {
        const orders = [...s.orders];
        orders[idx] = { ...orders[idx], status: 'retour_aangevraagd', tracking: [...orders[idx].tracking, `${new Date().toISOString().slice(0,10)} retour gestart - reden: ${args.reden}`] };
        return { ...s, orders, activeNummer: orders[idx].nummer, showTracking: true };
      });
      return { ok: true, bevestiging: 'Retour gestart, retourlabel wordt per email verstuurd binnen 24 uur' };
    }
    case 'wijzig_adres': {
      if (idx < 0) return { ok: false, error: 'Geen bestelling gevonden' };
      const o = state.orders[idx];
      if (o.status !== 'in_behandeling') {
        return { ok: false, error: 'Adres kan niet meer gewijzigd worden, bestelling is al verzonden' };
      }
      setState((s) => {
        const orders = [...s.orders];
        orders[idx] = { ...orders[idx], adres: args.nieuw_adres };
        return { ...s, orders, activeNummer: orders[idx].nummer };
      });
      return { ok: true, bevestiging: `Adres gewijzigd naar ${args.nieuw_adres}` };
    }
    default:
      return { ok: false, error: `Onbekende functie ${name}` };
  }
}

export function Component({ state }) {
  return (
    <Panel>
      <PanelHeader>
        <PanelTitle><ShoppingBag size={18} color="#3B82F6" /> OptiStore klantportaal</PanelTitle>
        <Badge $bg="#DCFCE7" $color="#065F46">{state.orders.length} bestellingen</Badge>
      </PanelHeader>
      <Subtle>Vraag de assistent een bestelling op te zoeken (bijv. OPT-100234), pakket te tracken, retour te starten of adres te wijzigen.</Subtle>
      <List>
        {state.orders.map((o) => {
          const meta = STATUS_META[o.status];
          const active = o.nummer === state.activeNummer;
          return (
            <Card key={o.nummer} $active={active}>
              <Row>
                <OrderId>{o.nummer}</OrderId>
                <Badge $bg={meta.bg} $color={meta.color}>{meta.label}</Badge>
              </Row>
              <Items>{o.items}</Items>
              <Row>
                <span style={{ color: '#64748B', fontSize: '0.78rem' }}>{o.datum} - €{o.totaal}</span>
                <span style={{ color: '#64748B', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={11} /> {o.adres.split(',')[0]}</span>
              </Row>
              {active && state.showTracking && (
                <Tracking>
                  <strong style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#0F172A' }}>
                    {o.status === 'retour_aangevraagd' ? <RotateCcw size={12} /> : <Truck size={12} />} Track & trace
                  </strong>
                  {o.tracking.map((t, i) => (
                    <div key={i}>- {t}</div>
                  ))}
                </Tracking>
              )}
            </Card>
          );
        })}
      </List>
    </Panel>
  );
}
