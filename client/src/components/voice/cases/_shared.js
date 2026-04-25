import styled from 'styled-components';

export const Panel = styled.div`
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  border: 1px solid #E2E8F0;
  box-shadow: 0 8px 24px rgba(15,23,42,0.06);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 420px;
`;

export const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const PanelTitle = styled.h3`
  margin: 0;
  font-size: 1.05rem;
  color: #0F172A;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Badge = styled.span`
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  background: ${(p) => p.$bg || '#DBEAFE'};
  color: ${(p) => p.$color || '#1D4ED8'};
  padding: 3px 8px;
  border-radius: 6px;
  font-weight: 700;
`;

export const Subtle = styled.div`
  font-size: 0.78rem;
  color: #64748B;
`;

export const Empty = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  color: #94A3B8;
  font-size: 0.9rem;
  border: 2px dashed #E2E8F0;
  border-radius: 12px;
`;

const treatmentLabels = {
  controle: 'Controle',
  gebitsreiniging: 'Gebitsreiniging',
  vulling: 'Vulling',
  kies_trekken: 'Kies trekken',
  kroon: 'Kroon',
};

export function treatmentLabel(key) {
  return treatmentLabels[key] || key;
}

export function plus(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function ymd(d) {
  return d.toISOString().slice(0, 10);
}

export function dayLabel(dateStr) {
  const days = ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'];
  const d = new Date(dateStr);
  return `${days[d.getDay()]} ${d.getDate()}/${d.getMonth() + 1}`;
}
