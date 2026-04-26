'use client';
import React from 'react';
import styled from 'styled-components';
import { Calendar, Sparkles } from 'lucide-react';
import { Panel, PanelHeader, PanelTitle, Badge, Subtle, plus, ymd, dayLabel, treatmentLabel } from './_shared';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 50px repeat(10, 1fr);
  gap: 3px;
  font-size: 0.7rem;
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

export const initialState = {
  weekStart: ymd(monday),
  days: getTwoWeekDays(monday),
  appointments: [
    { id: 1, datum: ymd(monday), tijd: '10:00', naam: 'J. de Vries', behandeling: 'controle' },
    { id: 2, datum: ymd(plus(monday, 1)), tijd: '14:30', naam: 'M. Bakker', behandeling: 'vulling' },
    { id: 3, datum: ymd(plus(monday, 2)), tijd: '11:00', naam: 'K. Jansen', behandeling: 'gebitsreiniging' },
    { id: 4, datum: ymd(plus(monday, 3)), tijd: '09:00', naam: 'P. Visser', behandeling: 'controle' },
    { id: 5, datum: ymd(plus(monday, 4)), tijd: '16:30', naam: 'L. Smit', behandeling: 'kroon' },
    { id: 6, datum: ymd(plus(monday, 7)), tijd: '11:00', naam: 'A. Mulder', behandeling: 'controle' },
    { id: 7, datum: ymd(plus(monday, 9)), tijd: '15:30', naam: 'H. Peters', behandeling: 'vulling' },
  ],
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
      <Subtle style={{ marginTop: 'auto' }}>{state.appointments.length} afspraken deze week. Vraag de assistent om er een te plannen, te verzetten of te annuleren.</Subtle>
    </Panel>
  );
}
