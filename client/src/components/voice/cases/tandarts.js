'use client';
import React from 'react';
import styled from 'styled-components';
import { Calendar, Sparkles } from 'lucide-react';
import { Panel, PanelHeader, PanelTitle, Badge, Subtle, plus, ymd, dayLabel, treatmentLabel } from './_shared';

const ScrollWrap = styled.div`
  overflow-x: auto;
  margin: 0 -0.5rem;
  padding: 0 0.5rem;
  -webkit-overflow-scrolling: touch;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 50px repeat(10, 1fr);
  gap: 3px;
  font-size: 0.7rem;
  min-width: 560px;
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
  background: ${(p) => (p.$booked ? 'linear-gradient(135deg, #DBEAFE, #BFDBFE)' : '#F8FAFC')};
  border: 1px solid ${(p) => (p.$booked ? '#3B82F6' : '#E2E8F0')};
  font-size: 0.7rem;
  color: ${(p) => (p.$booked ? '#1E3A8A' : '#CBD5E1')};
  text-align: center;
  min-height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${(p) => (p.$booked ? 700 : 400)};
  transition: background 0.3s ease;
  ${(p) => p.$justBooked && `animation: flash 1s ease;`}
  @keyframes flash {
    0% { background: #FEF3C7; transform: scale(1.05); }
    100% { background: linear-gradient(135deg, #DBEAFE, #BFDBFE); transform: scale(1); }
  }
`;

const TIMES = ['09:00','10:00','11:00','12:00','13:30','14:30','15:30','16:30'];

function getTwoWeekDays(weekStart) {
  // Two work weeks (Mon-Fri x 2 = 10 days), skipping weekends
  const days = [];
  let cursor = new Date(weekStart);
  while (days.length < 10) {
    const d = cursor.getDay();
    if (d !== 0 && d !== 6) days.push(ymd(cursor));
    cursor = plus(cursor, 1);
  }
  return days;
}

const today = new Date();
const monday = (() => {
  const d = new Date(today);
  const day = d.getDay() || 7;
  if (day !== 1) d.setHours(-24 * (day - 1));
  return d;
})();

// Pre-fill the calendar so each day has 5-6 booked slots out of 8 -
// only 2-3 free spots remain, makes the demo feel like a real busy practice.
const SEED_NAMES = [
  'de Vries', 'Bakker', 'Jansen', 'Visser', 'Smit', 'Mulder', 'Peters', 'de Wit',
  'van Dijk', 'Hendriks', 'Bos', 'de Boer', 'Dekker', 'Brouwer', 'de Graaf',
  'Meijer', 'van Leeuwen', 'Klein', 'van der Berg', 'Willems', 'van Beek',
  'Kuipers', 'Hoekstra', 'de Jong', 'Vermeer', 'Schipper', 'Koster', 'Vos',
  'Maas', 'Postma', 'Kramer', 'Verhoeven', 'van Dam', 'Bouwman', 'Bakkers',
  'Timmer', 'Knoop', 'Sanders', 'Driessen', 'van Vliet', 'Geerts', 'Roos',
];
const SEED_FIRST = ['J.', 'M.', 'K.', 'P.', 'L.', 'A.', 'H.', 'R.', 'T.', 'E.', 'S.', 'D.', 'B.', 'F.', 'C.'];
const SEED_TREATMENTS = ['controle', 'controle', 'gebitsreiniging', 'vulling', 'controle', 'gebitsreiniging', 'kroon', 'vulling'];

// Fixed pseudo-random pattern of which slots to book per day (out of 8 times),
// 5-6 per day, leaving 2-3 free. Indices into TIMES.
const DAILY_BOOKINGS = [
  [0, 1, 2, 4, 6, 7],     // day 0: free 11:00, 13:30
  [0, 1, 3, 4, 5, 7],     // day 1: free 11:00, 15:30
  [1, 2, 3, 4, 6, 7],     // day 2: free 09:00, 14:30
  [0, 2, 3, 5, 6, 7],     // day 3: free 10:00, 13:30
  [0, 1, 2, 5, 6],        // day 4: free 11:00, 13:30, 16:30
  [0, 1, 3, 4, 6, 7],     // day 5: free 11:00, 14:30
  [0, 2, 3, 4, 5, 7],     // day 6: free 10:00, 16:30
  [1, 2, 4, 5, 6, 7],     // day 7: free 09:00, 12:00
  [0, 1, 2, 4, 5, 7],     // day 8: free 13:30, 14:30
  [0, 1, 3, 4, 6],        // day 9: free 11:00, 13:30, 16:30
];

function buildSeedAppointments(days) {
  const out = [];
  let id = 1;
  for (let d = 0; d < days.length && d < DAILY_BOOKINGS.length; d++) {
    const slots = DAILY_BOOKINGS[d];
    for (const slotIdx of slots) {
      const fi = (id * 7) % SEED_FIRST.length;
      const ni = (id * 13) % SEED_NAMES.length;
      const ti = (id * 5) % SEED_TREATMENTS.length;
      out.push({
        id,
        datum: days[d],
        tijd: TIMES[slotIdx],
        naam: `${SEED_FIRST[fi]} ${SEED_NAMES[ni]}`,
        behandeling: SEED_TREATMENTS[ti],
      });
      id++;
    }
  }
  return out;
}

const SEED_DAYS = getTwoWeekDays(monday);

export const initialState = {
  weekStart: ymd(monday),
  days: SEED_DAYS,
  appointments: buildSeedAppointments(SEED_DAYS),
  lastBookedId: null,
};

export function executeTool(name, args, state, setState) {
  switch (name) {
    case 'vrije_tijden_opvragen': {
      const datum = args.datum;
      const booked = new Set(state.appointments.filter((a) => a.datum === datum).map((a) => a.tijd));
      const free = TIMES.filter((t) => !booked.has(t));
      return { datum, vrije_tijden: free.slice(0, 8) };
    }
    case 'boek_afspraak': {
      const id = Math.floor(Math.random() * 100000);
      const appt = {
        id,
        datum: args.datum,
        tijd: args.tijd,
        naam: args.patient_naam,
        behandeling: args.behandeling,
      };
      setState((s) => ({ ...s, appointments: [...s.appointments, appt], lastBookedId: id }));
      return { ok: true, bevestiging: `Afspraak ingepland voor ${args.patient_naam} op ${args.datum} om ${args.tijd}` };
    }
    case 'verzet_afspraak': {
      let found = false;
      setState((s) => {
        const appointments = s.appointments.map((a) => {
          if (!found && a.naam.toLowerCase().includes(args.patient_naam.toLowerCase())) {
            found = true;
            return { ...a, datum: args.nieuwe_datum, tijd: args.nieuwe_tijd };
          }
          return a;
        });
        return { ...s, appointments };
      });
      return found
        ? { ok: true, bevestiging: `Afspraak verzet naar ${args.nieuwe_datum} om ${args.nieuwe_tijd}` }
        : { ok: false, error: `Geen afspraak gevonden voor ${args.patient_naam}` };
    }
    case 'annuleer_afspraak': {
      let found = false;
      setState((s) => {
        const appointments = s.appointments.filter((a) => {
          if (!found && a.naam.toLowerCase().includes(args.patient_naam.toLowerCase())) {
            found = true;
            return false;
          }
          return true;
        });
        return { ...s, appointments };
      });
      return found ? { ok: true, bevestiging: 'Afspraak geannuleerd' } : { ok: false, error: 'Geen afspraak gevonden' };
    }
    default:
      return { ok: false, error: `Onbekende functie ${name}` };
  }
}

export function Component({ state }) {
  const days = state.days;
  return (
    <Panel>
      <PanelHeader>
        <PanelTitle><Calendar size={18} color="#3B82F6" /> Praktijkagenda</PanelTitle>
        <Badge $bg="#DCFCE7" $color="#065F46"><Sparkles size={10} style={{ marginRight: 4 }} /> Live</Badge>
      </PanelHeader>
      <Subtle>Tandartspraktijk Optivaize - 2 weken vooruit ({dayLabel(days[0]).split(' ')[1]} - {dayLabel(days[days.length-1]).split(' ')[1]})</Subtle>
      <ScrollWrap>
      <Grid>
        <HeaderCell></HeaderCell>
        {days.map((d) => (
          <HeaderCell key={d}>{dayLabel(d)}</HeaderCell>
        ))}
        {TIMES.map((tijd) => (
          <React.Fragment key={tijd}>
            <TimeCell>{tijd}</TimeCell>
            {days.map((datum) => {
              const appt = state.appointments.find((a) => a.datum === datum && a.tijd === tijd);
              return (
                <Slot key={`${datum}-${tijd}`} $booked={!!appt} $justBooked={appt && appt.id === state.lastBookedId}>
                  {appt ? (
                    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05, padding: '1px 0', overflow: 'hidden', width: '100%' }} title={`${appt.naam} - ${treatmentLabel(appt.behandeling)}`}>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 9 }}>{appt.naam.split(' ').pop()}</span>
                    </div>
                  ) : ''}
                </Slot>
              );
            })}
          </React.Fragment>
        ))}
      </Grid>
      </ScrollWrap>
      <Subtle style={{ marginTop: 'auto' }}>{state.appointments.length} afspraken in deze 2 weken - meestal 2-3 plekken vrij per dag. Vraag de assistent om er een te plannen, te verzetten of te annuleren.</Subtle>
    </Panel>
  );
}
