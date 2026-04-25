'use client';
import React from 'react';
import styled from 'styled-components';
import { UtensilsCrossed, Users, Sparkles } from 'lucide-react';
import { Panel, PanelHeader, PanelTitle, Badge, Subtle, plus, ymd } from './_shared';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 70px repeat(4, 1fr);
  gap: 4px;
  font-size: 0.78rem;
`;

const HeaderCell = styled.div`
  padding: 8px 6px;
  font-weight: 700;
  color: #475569;
  text-align: center;
  background: #F1F5F9;
  border-radius: 6px;
`;

const TimeCell = styled.div`
  padding: 6px 4px;
  text-align: right;
  color: #94A3B8;
  font-variant-numeric: tabular-nums;
`;

const Slot = styled.div`
  padding: 6px 4px;
  border-radius: 6px;
  background: ${(p) => (p.$booked ? 'linear-gradient(135deg, #FEF3C7, #FDE68A)' : '#F8FAFC')};
  border: 1px solid ${(p) => (p.$booked ? '#F59E0B' : '#E2E8F0')};
  font-size: 0.7rem;
  color: ${(p) => (p.$booked ? '#7C2D12' : '#CBD5E1')};
  text-align: center;
  min-height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${(p) => (p.$booked ? 700 : 400)};
  ${(p) => p.$justBooked && `animation: glow 1.2s ease;`}
  @keyframes glow {
    0% { background: #FEE68A; transform: scale(1.1); box-shadow: 0 0 0 0 rgba(245,158,11,0.5); }
    100% { background: linear-gradient(135deg, #FEF3C7, #FDE68A); transform: scale(1); box-shadow: none; }
  }
`;

const TIMES = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'];
const TABLES = [
  { id: 'T1', personen: 2 },
  { id: 'T2', personen: 4 },
  { id: 'T3', personen: 4 },
  { id: 'T4', personen: 2 },
];

const today = new Date();

export const initialState = {
  datum: ymd(today),
  reservations: [
    { id: 1, datum: ymd(today), tijd: '19:00', tafel: 'T2', naam: 'Familie de Wit', personen: 4 },
    { id: 2, datum: ymd(today), tijd: '20:00', tafel: 'T3', naam: 'M. van Dijk', personen: 3 },
    { id: 3, datum: ymd(today), tijd: '18:30', tafel: 'T1', naam: 'L. Hendriks', personen: 2 },
    { id: 4, datum: ymd(plus(today, 1)), tijd: '19:30', tafel: 'T4', naam: 'P. Bos', personen: 2 },
  ],
  lastBookedId: null,
};

function findFreeTable(reservations, datum, tijd, personen) {
  for (const t of TABLES) {
    if (t.personen < personen) continue;
    const taken = reservations.find((r) => r.datum === datum && r.tijd === tijd && r.tafel === t.id);
    if (!taken) return t;
  }
  return null;
}

export function executeTool(name, args, state, setState) {
  switch (name) {
    case 'vrije_tafels': {
      const table = findFreeTable(state.reservations, args.datum, args.tijd, args.aantal_personen);
      if (!table) return { beschikbaar: false, alternatief: 'Geen tafel vrij op dat tijdstip - probeer 30 minuten eerder of later' };
      return { beschikbaar: true, tafel: table.id, capaciteit: table.personen };
    }
    case 'boek_tafel': {
      const table = findFreeTable(state.reservations, args.datum, args.tijd, args.aantal_personen);
      if (!table) return { ok: false, error: 'Geen tafel beschikbaar voor dat tijdstip' };
      const id = Math.floor(Math.random() * 100000);
      const r = { id, datum: args.datum, tijd: args.tijd, tafel: table.id, naam: args.naam, personen: args.aantal_personen, opmerking: args.opmerking };
      setState((s) => ({ ...s, reservations: [...s.reservations, r], datum: args.datum, lastBookedId: id }));
      return { ok: true, bevestiging: `Tafel ${table.id} gereserveerd voor ${args.naam}, ${args.aantal_personen} personen, ${args.datum} om ${args.tijd}` };
    }
    case 'verzet_reservering': {
      let moved = null;
      setState((s) => {
        const reservations = s.reservations.map((r) => {
          if (!moved && r.naam.toLowerCase().includes(args.naam.toLowerCase())) {
            const table = findFreeTable(s.reservations.filter((x) => x.id !== r.id), args.nieuwe_datum, args.nieuwe_tijd, r.personen);
            if (table) {
              moved = r;
              return { ...r, datum: args.nieuwe_datum, tijd: args.nieuwe_tijd, tafel: table.id };
            }
          }
          return r;
        });
        return { ...s, reservations, datum: args.nieuwe_datum };
      });
      return moved ? { ok: true, bevestiging: `Reservering verzet naar ${args.nieuwe_datum} om ${args.nieuwe_tijd}` } : { ok: false, error: 'Geen reservering gevonden of geen plek op nieuwe tijd' };
    }
    case 'annuleer_reservering': {
      let cancelled = false;
      setState((s) => ({
        ...s,
        reservations: s.reservations.filter((r) => {
          if (!cancelled && r.naam.toLowerCase().includes(args.naam.toLowerCase())) {
            cancelled = true;
            return false;
          }
          return true;
        }),
      }));
      return cancelled ? { ok: true, bevestiging: 'Reservering geannuleerd' } : { ok: false, error: 'Geen reservering gevonden' };
    }
    default:
      return { ok: false, error: `Onbekende functie ${name}` };
  }
}

export function Component({ state }) {
  return (
    <Panel>
      <PanelHeader>
        <PanelTitle><UtensilsCrossed size={18} color="#3B82F6" /> Restaurant De Nederlanden</PanelTitle>
        <Badge $bg="#DCFCE7" $color="#065F46"><Sparkles size={10} style={{ marginRight: 4 }} /> Live</Badge>
      </PanelHeader>
      <Subtle>Reserveringen voor {state.datum}. Vraag de assistent om een tafel te boeken.</Subtle>
      <Grid>
        <HeaderCell></HeaderCell>
        {TABLES.map((t) => (
          <HeaderCell key={t.id} title={`Capaciteit ${t.personen}`}>
            {t.id} <span style={{ opacity: 0.6, fontWeight: 400 }}>({t.personen}p)</span>
          </HeaderCell>
        ))}
        {TIMES.map((tijd) => (
          <React.Fragment key={tijd}>
            <TimeCell>{tijd}</TimeCell>
            {TABLES.map((t) => {
              const r = state.reservations.find((x) => x.datum === state.datum && x.tijd === tijd && x.tafel === t.id);
              return (
                <Slot key={`${tijd}-${t.id}`} $booked={!!r} $justBooked={r && r.id === state.lastBookedId}>
                  {r ? (
                    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
                      <span>{r.naam}</span>
                      <span style={{ opacity: 0.7, fontSize: 9, display: 'inline-flex', alignItems: 'center', gap: 2, justifyContent: 'center' }}><Users size={9} /> {r.personen}</span>
                    </div>
                  ) : '-'}
                </Slot>
              );
            })}
          </React.Fragment>
        ))}
      </Grid>
      <Subtle style={{ marginTop: 'auto' }}>{state.reservations.filter((r) => r.datum === state.datum).length} reserveringen vandaag - capaciteit 4 tafels.</Subtle>
    </Panel>
  );
}
