'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled, { keyframes, createGlobalStyle, css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, FolderKanban, RefreshCw, ExternalLink,
  AlertCircle, Users, AlertTriangle, Circle, Globe,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════ */

const VIEWS = [
  { id: 'clocks', label: 'Wereldtijd', icon: Globe, ms: 10000 },
  { id: 'pipeline', label: 'Pipeline', icon: TrendingUp, ms: 10000 },
  { id: 'projects', label: 'Projecten', icon: FolderKanban, ms: 10000 },
  { id: 'team', label: 'Team', icon: Users, ms: 20000 },
];

const OFFICES = [
  { city: 'Utrecht', tz: 'Europe/Amsterdam', role: 'Head Center', flag: '\u{1F1F3}\u{1F1F1}', startH: 9, endH: 19 },
  { city: 'Mumbai', tz: 'Asia/Kolkata', role: 'Development', flag: '\u{1F1EE}\u{1F1F3}', startH: 12, endH: 20 },
  { city: 'Manila', tz: 'Asia/Manila', role: 'Development', flag: '\u{1F1F5}\u{1F1ED}', startH: 12, endH: 20 },
];

const PIPELINE_PHASES = [
  'Nieuw', 'Gecontacteerd', 'Meeting gepland', 'Offerte verzonden', 'Aanvaard', 'Geweigerd',
];

const PHASE_COLORS = {
  'Nieuw': '#94A3B8',
  'Gecontacteerd': '#0EA5E9',
  'Meeting gepland': '#8B5CF6',
  'Offerte verzonden': '#F59E0B',
  'Aanvaard': '#10B981',
  'Geweigerd': '#EF4444',
};


/* ═══════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════ */

const amt = v => {
  if (v == null) return 0;
  if (typeof v === 'object' && v !== null) return parseFloat(v.amount) || 0;
  return parseFloat(v) || 0;
};

const eur = v => new Intl.NumberFormat('nl-NL', {
  style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0,
}).format(amt(v));

const eurFull = v => new Intl.NumberFormat('nl-NL', {
  style: 'currency', currency: 'EUR', minimumFractionDigits: 2,
}).format(amt(v));

const fmtDate = d => {
  if (!d) return '';
  return new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'short' }).format(new Date(d));
};

const fmtHours = sec => {
  if (!sec) return '0u';
  const h = Math.floor(sec / 3600);
  const m = Math.round((sec % 3600) / 60);
  return m > 0 ? `${h}u ${m}m` : `${h}u`;
};

const isThisWeek = dateStr => {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  monday.setHours(0, 0, 0, 0);
  return d >= monday && d <= now;
};

/* ═══════════════════════════════════════════════════════
   GLOBAL STYLES  -  Sohne + JetBrains Mono
   ═══════════════════════════════════════════════════════ */

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,500;0,9..40,700;0,9..40,800;1,9..40,400&family=JetBrains+Mono:wght@400;600;700&display=swap');
  body { margin:0; padding:0; background:#F8FAFB; overflow:hidden; }
`;

/* ═══════════════════════════════════════════════════════
   ANIMATIONS
   ═══════════════════════════════════════════════════════ */

const progressAnim = keyframes`from{width:0}to{width:100%}`;
const breathe = keyframes`0%,100%{opacity:1}50%{opacity:.35}`;

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.08 } } };
const riseUp = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } } };
const fadeIn = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.35 } } };

/* ═══════════════════════════════════════════════════════
   LAYOUT
   ═══════════════════════════════════════════════════════ */

const Page = styled.div`
  height: 100vh; display: flex; flex-direction: column;
  background: #F8FAFB; overflow: hidden;
  font-family: 'DM Sans', -apple-system, sans-serif; color: #0C1824;
  position: relative;
  &::before {
    content: ''; position: fixed; inset: 0; pointer-events: none; opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
`;

const GradBar = styled.div`
  height: 3px; flex-shrink: 0;
  background: linear-gradient(90deg, #0EA5E9, #10B981, #0EA5E9);
  background-size: 200% 100%;
`;

const Header = styled.header`
  display: flex; align-items: center; justify-content: space-between;
  padding: 0.55rem 1.5rem; background: #fff;
  border-bottom: 1px solid #ECEFF3; flex-shrink: 0;
  position: relative; z-index: 5;
`;

const Logo = styled.img`height: 26px; object-fit: contain;`;

const Nav = styled.nav`display:flex; gap:2px;`;
const NavBtn = styled.button`
  all: unset; cursor: pointer;
  display: flex; align-items: center; gap: 5px;
  padding: 5px 12px; border-radius: 6px;
  font-size: 11.5px; font-weight: 700; letter-spacing: .3px;
  transition: all .2s;
  background: ${p => p.$on ? 'linear-gradient(135deg,#0EA5E9,#10B981)' : 'transparent'};
  color: ${p => p.$on ? '#fff' : '#94A3B8'};
  &:hover { color: ${p => p.$on ? '#fff' : '#475569'}; }
  svg { width: 12px; height: 12px; }
`;

const Right = styled.div`display:flex; align-items:center; gap:.55rem;`;
const Clk = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px; font-weight: 600; color: #64748B;
`;
const Live = styled.span`
  width: 6px; height: 6px; border-radius: 50%; background: #10B981;
  animation: ${breathe} 2s ease-in-out infinite;
  box-shadow: 0 0 6px #10B981;
`;
const RefBtn = styled.button`
  all: unset; cursor: pointer;
  display: flex; align-items: center; gap: 4px;
  padding: 3px 8px; background: #F1F5F9; border: 1px solid #E2E8F0;
  border-radius: 5px; font-size: 10px; font-weight: 600; color: #64748B;
  &:hover { background: #E2E8F0; }
  svg { width: 11px; height: 11px; }
`;

const ProgTrack = styled.div`height:2px; background:#ECEFF3; flex-shrink:0; overflow:hidden;`;
const ProgFill = styled.div`height:100%; background:linear-gradient(90deg,#0EA5E9,#10B981); animation:${progressAnim} ${p => p.$ms || 10000}ms linear forwards;`;

const ViewArea = styled.div`
  flex: 1; min-height: 0; padding: 1rem 1.5rem;
  overflow: hidden; position: relative;
`;

/* ═══════════════════════════════════════════════════════
   SHARED
   ═══════════════════════════════════════════════════════ */

const Card = styled(motion.div)`
  background: #fff; border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,.04), 0 0 0 1px rgba(0,0,0,.03);
`;

const SectionHead = styled.div`
  display: flex; align-items: baseline; justify-content: space-between;
  margin-bottom: .65rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 13px; font-weight: 800; color: #94A3B8;
  text-transform: uppercase; letter-spacing: 2px; margin: 0;
  display: flex; align-items: center; gap: 6px;
  svg { width: 14px; height: 14px; }
`;

const Badge = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 5px;
  background: ${p => p.$bg || '#F1F5F9'}; color: ${p => p.$c || '#64748B'};
`;

/* ═══════════════════════════════════════════════════════
   WORLD CLOCKS
   ═══════════════════════════════════════════════════════ */

const ClocksWrap = styled(motion.div)`
  height: 100%; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
`;

const ClocksGrid = styled(motion.div)`
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem; width: 100%; max-width: 1100px;
`;

const ClockCard = styled(motion.div)`
  display: flex; flex-direction: column; align-items: center;
  padding: 2.5rem 1.5rem;
  background: #fff; border-radius: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,.04), 0 0 0 1px rgba(0,0,0,.03);
  position: relative; overflow: hidden;
`;

const ClockFlag = styled.span`
  font-size: 28px; margin-bottom: .5rem;
`;

const ClockCity = styled.div`
  font-size: 18px; font-weight: 800; color: #0C1824;
  letter-spacing: .5px; margin-bottom: 2px;
`;

const ClockRole = styled.div`
  font-size: 11px; font-weight: 700; color: #94A3B8;
  text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 1.25rem;
`;

const ClockTime = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 56px; font-weight: 700; letter-spacing: -2px;
  background: linear-gradient(135deg, #0EA5E9, #10B981);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  line-height: 1;
`;

const ClockDate = styled.div`
  font-size: 13px; color: #94A3B8; margin-top: .5rem;
  font-weight: 500;
`;

const ClockStatus = styled.div`
  display: flex; align-items: center; gap: 5px;
  margin-top: .75rem; font-size: 10px; font-weight: 700;
  color: ${p => p.$active ? '#10B981' : '#94A3B8'};
  text-transform: uppercase; letter-spacing: .5px;
`;

const ClockDot = styled.span`
  width: 6px; height: 6px; border-radius: 50%;
  background: ${p => p.$active ? '#10B981' : '#CBD5E1'};
  ${p => p.$active && css`animation: ${breathe} 2s ease-in-out infinite; box-shadow: 0 0 6px #10B981;`}
`;

/* ═══════════════════════════════════════════════════════
   PIPELINE KANBAN
   ═══════════════════════════════════════════════════════ */

const KanbanWrap = styled(motion.div)`
  height: 100%; display: flex; flex-direction: column;
`;

const KanbanHeader = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: .6rem; flex-shrink: 0;
`;

const KanbanTotal = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 22px; font-weight: 700; letter-spacing: -1px;
  background: linear-gradient(135deg, #0EA5E9, #10B981);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
`;

const KanbanBoard = styled(motion.div)`
  display: grid; grid-template-columns: repeat(${PIPELINE_PHASES.length}, 1fr);
  gap: .5rem; flex: 1; min-height: 0;
`;

const KanbanCol = styled(motion.div)`
  display: flex; flex-direction: column;
  background: #F1F5F9; border-radius: 10px; overflow: hidden;
  min-height: 0;
`;

const KanbanColHead = styled.div`
  padding: .55rem .65rem; flex-shrink: 0;
  border-bottom: 2px solid ${p => p.$color || '#CBD5E1'};
  display: flex; flex-direction: column; gap: 2px;
`;

const KanbanColTitle = styled.div`
  font-size: 10.5px; font-weight: 800; color: #475569;
  text-transform: uppercase; letter-spacing: .5px;
  display: flex; align-items: center; justify-content: space-between;
`;

const KanbanColCount = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px; font-weight: 700; color: #94A3B8;
  background: #fff; padding: 1px 5px; border-radius: 3px;
`;

const KanbanColValue = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px; font-weight: 700; color: ${p => p.$color || '#64748B'};
`;

const KanbanCards = styled.div`
  flex: 1; min-height: 0; overflow-y: auto; padding: .4rem;
  display: flex; flex-direction: column; gap: .35rem;
  &::-webkit-scrollbar { width: 2px; }
  &::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 2px; }
`;

const KanbanDeal = styled(motion.div)`
  background: #fff; border-radius: 8px; padding: .55rem .65rem;
  box-shadow: 0 1px 2px rgba(0,0,0,.04);
  border-left: 3px solid ${p => p.$color || '#CBD5E1'};
`;

const KanbanDealTitle = styled.div`
  font-size: 12px; font-weight: 700; color: #0C1824; margin-bottom: 3px;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
`;

const KanbanDealMeta = styled.div`
  display: flex; align-items: center; gap: 4px; flex-wrap: wrap;
`;

const KanbanDealTag = styled.span`
  font-size: 9px; font-weight: 600; padding: 1px 5px; border-radius: 3px;
  background: ${p => p.$bg || '#F1F5F9'}; color: ${p => p.$c || '#64748B'};
  font-family: 'JetBrains Mono', monospace;
`;

const KanbanDealOwner = styled.span`
  font-size: 9.5px; color: #94A3B8; font-weight: 500;
`;

/* ═══════════════════════════════════════════════════════
   PROJECTS (row layout)
   ═══════════════════════════════════════════════════════ */

const ProjWrap = styled(motion.div)`height:100%; display:flex; flex-direction:column;`;

const ProjRowHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 2.5fr;
  gap: .5rem; padding: 0 1rem .35rem;
  font-size: 9px; font-weight: 800; color: #94A3B8;
  text-transform: uppercase; letter-spacing: .5px;
  border-bottom: 1px solid #ECEFF3; flex-shrink: 0;
`;

const ProjTable = styled(motion.div)`
  flex: 1; min-height: 0; overflow-y: auto;
  display: flex; flex-direction: column; gap: .35rem;
  &::-webkit-scrollbar { width: 3px; }
  &::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 2px; }
`;

const ProjRow = styled(motion.div)`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 2.5fr;
  gap: .5rem; padding: .55rem 1rem;
  background: #fff; border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0,0,0,.04), 0 0 0 1px rgba(0,0,0,.03);
  align-items: center; min-height: 56px;
`;

const ProjName = styled.div`
  font-size: 13.5px; font-weight: 700; color: #0C1824;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
`;

const ProjSub = styled.div`
  font-size: 10px; color: #94A3B8; margin-top: 1px;
  display: flex; gap: 6px; align-items: center;
`;

const ProjStat = styled.div`text-align: center;`;
const ProjStatNum = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px; font-weight: 700; color: ${p => p.$c || '#0C1824'};
  line-height: 1.2;
`;
const ProjStatLabel = styled.div`
  font-size: 8px; font-weight: 700; color: #94A3B8;
  text-transform: uppercase; letter-spacing: .3px; margin-top: 1px;
`;

const ProjBarBg = styled.div`height: 4px; background: #F1F5F9; border-radius: 2px; overflow: hidden; width: 100%;`;
const ProjBarFill = styled(motion.div)`height: 100%; border-radius: 2px; background: ${p => p.$c || 'linear-gradient(90deg,#0EA5E9,#10B981)'};`;

const Tag = styled.span`
  font-size: 9px; font-weight: 700; padding: 1px 5px; border-radius: 3px;
  background: ${p => p.$bg || '#F1F5F9'}; color: ${p => p.$c || '#64748B'};
  letter-spacing: .2px;
`;

const TaskLine = styled.div`
  display: flex; align-items: center; gap: 4px; padding: 2px 0;
  font-size: 10.5px; color: ${p => p.$late ? '#EF4444' : '#64748B'};
  svg { width: 11px; height: 11px; flex-shrink: 0; color: ${p => p.$late ? '#EF4444' : '#CBD5E1'}; }
`;
const TaskText = styled.span`flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`;
const TaskDate = styled.span`
  font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 600;
  flex-shrink: 0; color: ${p => p.$late ? '#EF4444' : '#CBD5E1'};
`;

const ProjTaskList = styled.div`
  display: flex; flex-direction: column; gap: 1px;
  padding-left: .5rem; border-left: 2px solid #F1F5F9;
`;

/* ═══════════════════════════════════════════════════════
   TEAM (row layout, fixed height)
   ═══════════════════════════════════════════════════════ */

const TeamWrap = styled(motion.div)`height:100%; display:flex; flex-direction:column;`;

const TeamTable = styled(motion.div)`
  flex: 1; min-height: 0; overflow-y: auto;
  display: flex; flex-direction: column; gap: .35rem;
  &::-webkit-scrollbar { width: 3px; }
  &::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 2px; }
`;

const TEAM_COLS = '180px repeat(5, 80px) 1fr';

const TeamRowHeader = styled.div`
  display: grid;
  grid-template-columns: ${TEAM_COLS};
  gap: .4rem; padding: 0 1rem .3rem;
  font-size: 9px; font-weight: 800; color: #94A3B8;
  text-transform: uppercase; letter-spacing: .5px;
  border-bottom: 1px solid #ECEFF3; flex-shrink: 0;
`;

const TeamRow = styled(motion.div)`
  display: grid;
  grid-template-columns: ${TEAM_COLS};
  gap: .4rem; padding: .75rem 1rem;
  background: #fff; border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0,0,0,.04), 0 0 0 1px rgba(0,0,0,.03);
  align-items: center;
  min-height: 130px;
`;

const Avatar = styled.div`
  width: 34px; height: 34px; border-radius: 9px;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 800; color: #fff; flex-shrink: 0;
  background: ${p => p.$bg || 'linear-gradient(135deg,#0EA5E9,#10B981)'};
`;

const TeamMemberInfo = styled.div`
  display: flex; align-items: center; gap: .5rem;
  min-width: 0;
`;

const TeamMemberName = styled.div`
  font-size: 13px; font-weight: 700; color: #0C1824;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
`;
const TeamMemberSub = styled.div`font-size: 9.5px; color: #94A3B8; margin-top: 1px;`;

const TeamStat = styled.div`text-align: center;`;
const TeamStatBig = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 16px; font-weight: 700; color: ${p => p.$c || '#0C1824'};
  line-height: 1.1;
`;
const TeamStatSmall = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; font-weight: 600; color: #94A3B8;
  line-height: 1.2;
`;
const TeamStatLabel = styled.div`
  font-size: 7.5px; font-weight: 700; color: #CBD5E1;
  text-transform: uppercase; letter-spacing: .3px; margin-top: 1px;
`;

const TeamTaskList = styled.div`
  display: flex; flex-direction: column; gap: 2px;
  padding-left: .6rem; border-left: 2px solid #F1F5F9;
`;

/* ═══════════════════════════════════════════════════════
   CONNECT
   ═══════════════════════════════════════════════════════ */

const ConnectWrap = styled(motion.div)`
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  height:100vh; gap:1.25rem; background:#F8FAFB; font-family:'DM Sans',sans-serif;
`;
const ConnectBtn = styled(motion.a)`
  display:inline-flex; align-items:center; gap:.5rem;
  padding:.875rem 1.75rem; background:linear-gradient(135deg,#0EA5E9,#10B981);
  color:#fff; font-size:15px; font-weight:700; border-radius:10px;
  text-decoration:none; cursor:pointer; box-shadow:0 8px 20px rgba(14,165,233,.25);
`;

/* ═══════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════ */

function StatsDashboard() {
  const [status, setStatus] = useState(null);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [time, setTime] = useState(new Date());
  const [view, setView] = useState(0);
  const [vKey, setVKey] = useState(0);

  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);

  useEffect(() => {
    if (status !== true) return;
    const ms = VIEWS[view]?.ms || 10000;
    const t = setTimeout(() => { setView(v => (v + 1) % VIEWS.length); setVKey(k => k + 1); }, ms);
    return () => clearTimeout(t);
  }, [status, view, vKey]);

  const fetchData = useCallback(async (isInitial = false) => {
    try {
      setError(null);
      const eps = ['invoices', 'deals', 'projects', 'tasks', 'tasks-completed', 'users', 'time-tracking', 'time-tracking-week', 'deal-phases'];
      const res = await Promise.all(eps.map(e => fetch(`/api/teamleader/${e}`).then(r => r.json()).catch(() => ({ data: [] }))));
      const [inv, deals, proj, tasks, tasksDone, users, tt, ttWeek, phases] = res;
      if (inv.error === 'not_connected' || deals.error === 'not_connected') {
        // Only show connect screen on initial load, otherwise just show error and keep old data
        if (isInitial) { setStatus(false); setLoading(false); return; }
        setError('Verbinding verloren, probeert opnieuw...');
        return;
      }
      setData({
        invoices: inv.data || [], deals: deals.data || [], included: deals.included || {},
        projects: proj.data || [], tasks: tasks.data || [], tasksDone: tasksDone.data || [],
        users: users.data || [], timeTracking: tt.data || [], timeTrackingWeek: ttWeek.data || [],
        dealPhases: phases.data || [],
      });
      setStatus(true); setLoading(false);
    } catch { setError('Kon data niet ophalen'); setLoading(false); }
  }, []);

  useEffect(() => {
    fetch('/api/teamleader/status').then(r => r.json()).then(r => {
      if (r.connected) fetchData(true); else { setStatus(false); setLoading(false); }
    }).catch(() => { setStatus(false); setLoading(false); });
  }, [fetchData]);

  useEffect(() => {
    if (status !== true) return;
    const t = setInterval(fetchData, 120000);
    return () => clearInterval(t);
  }, [status, fetchData]);

  // Derived data
  const userMap = useMemo(() => {
    const m = {};
    (data.users || []).forEach(u => { m[u.id] = `${u.first_name || ''} ${u.last_name || ''}`.trim() || 'Onbekend'; });
    return m;
  }, [data.users]);

  const resolveUser = useCallback(ref => ref ? (userMap[ref.id || ref] || null) : null, [userMap]);

  const timeByUser = useMemo(() => {
    const all = {};
    (data.timeTracking || []).forEach(t => {
      if (!t.user?.id) return;
      all[t.user.id] = (all[t.user.id] || 0) + (t.duration || 0);
    });
    const week = {};
    (data.timeTrackingWeek || []).forEach(t => {
      if (!t.user?.id) return;
      week[t.user.id] = (week[t.user.id] || 0) + (t.duration || 0);
    });
    return { all, week };
  }, [data.timeTracking, data.timeTrackingWeek]);

  const tasksByProject = useMemo(() => {
    const m = {};
    (data.tasks || []).forEach(t => { const p = t.project?.id; if (p) { (m[p] = m[p] || []).push(t); } });
    return m;
  }, [data.tasks]);

  const doneByUser = useMemo(() => {
    const month = {};
    const week = {};
    const now = new Date();
    const monday = new Date(now);
    monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
    monday.setHours(0, 0, 0, 0);
    (data.tasksDone || []).forEach(t => {
      const u = t.assignee?.id;
      if (!u) return;
      month[u] = (month[u] || 0) + 1;
      if (t.completed_at && new Date(t.completed_at) >= monday) {
        week[u] = (week[u] || 0) + 1;
      }
    });
    return { month, week };
  }, [data.tasksDone]);

  const phaseMap = useMemo(() => {
    const m = {};
    (data.dealPhases || []).forEach(p => { m[p.id] = p.name || 'Onbekend'; });
    return m;
  }, [data.dealPhases]);

  const dealsByPhase = useMemo(() => {
    const deals = data.deals || [];
    const grouped = {};
    PIPELINE_PHASES.forEach(p => { grouped[p] = []; });
    deals.forEach(d => {
      const phaseName = d.current_phase?.id ? (phaseMap[d.current_phase.id] || '') : '';
      const match = PIPELINE_PHASES.find(p => phaseName.toLowerCase().includes(p.toLowerCase()));
      if (match) grouped[match].push(d);
      else (grouped['Nieuw'] = grouped['Nieuw'] || []).push(d);
    });
    return grouped;
  }, [data.deals, phaseMap]);

  const sortedProjects = useMemo(() => [...(data.projects || [])].sort((a, b) => amt(b.amount_unbilled) - amt(a.amount_unbilled)), [data.projects]);

  const pipeline = useMemo(() => (data.deals || []).reduce((s, d) => s + amt(d.estimated_value), 0), [data.deals]);
  const weighted = useMemo(() => (data.deals || []).reduce((s, d) => s + amt(d.weighted_value), 0), [data.deals]);

  // Team workload
  const teamData = useMemo(() => {
    const byUser = {};
    (data.tasks || []).forEach(t => {
      if (!t.assignee?.id) return;
      const uid = t.assignee.id;
      if (!byUser[uid]) byUser[uid] = { open: 0, overdue: 0, deals: 0, tasks: [] };
      byUser[uid].open++;
      if (t.due_on && new Date(t.due_on) < new Date()) byUser[uid].overdue++;
      byUser[uid].tasks.push(t);
    });
    (data.deals || []).forEach(d => {
      const uid = d.responsible_user?.id;
      if (uid) { if (!byUser[uid]) byUser[uid] = { open: 0, overdue: 0, deals: 0, tasks: [] }; byUser[uid].deals++; }
    });
    const maxOpen = Math.max(1, ...Object.values(byUser).map(v => v.open));
    return Object.entries(byUser)
      .map(([id, v], i) => ({
        id, name: userMap[id] || 'Onbekend', ...v,
        doneMonth: doneByUser.month[id] || 0,
        doneWeek: doneByUser.week[id] || 0,
        hoursMonth: timeByUser.all[id] || 0,
        hoursWeek: timeByUser.week[id] || 0,
        pct: Math.round((v.open / maxOpen) * 100),
        bg: AVATARS_BG[i % AVATARS_BG.length],
      }))
      .sort((a, b) => b.open - a.open);
  }, [data.tasks, data.deals, userMap, doneByUser, timeByUser]);

  const switchView = i => { setView(i); setVKey(k => k + 1); };

  if (loading && status === null) return (
    <><GlobalStyle /><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#F8FAFB' }}>
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}><RefreshCw size={22} color="#94A3B8" /></motion.div>
    </div></>
  );

  if (status === false) return (
    <><GlobalStyle /><ConnectWrap initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Logo src="/images/optivaize_logo_new.webp" style={{ height: 44 }} alt="Optivaize" />
      <div style={{ fontSize: 22, fontWeight: 800 }}>Teamleader Verbinden</div>
      <div style={{ fontSize: 14, color: '#64748B', maxWidth: 360, lineHeight: 1.6, textAlign: 'center' }}>
        Verbind je Teamleader Focus account voor realtime inzicht in deals, projecten en team.
      </div>
      <ConnectBtn href="/api/teamleader/authorize" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <ExternalLink size={15} /> Verbinden
      </ConnectBtn>
    </ConnectWrap></>
  );

  /* ── WORLD CLOCKS VIEW ── */
  const renderClocks = () => (
    <ClocksWrap variants={stagger} initial="hidden" animate="show">
      <ClocksGrid variants={stagger}>
        {OFFICES.map(o => {
          const localTime = new Date(time.toLocaleString('en-US', { timeZone: o.tz }));
          const hour = localTime.getHours();
          const isWorkHours = hour >= o.startH && hour < o.endH;
          return (
            <ClockCard key={o.city} variants={riseUp}>
              <ClockFlag>{o.flag}</ClockFlag>
              <ClockCity>{o.city}</ClockCity>
              <ClockRole>{o.role}</ClockRole>
              <ClockTime>
                {time.toLocaleTimeString('nl-NL', { timeZone: o.tz, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </ClockTime>
              <ClockDate>
                {time.toLocaleDateString('nl-NL', { timeZone: o.tz, weekday: 'long', day: 'numeric', month: 'long' })}
              </ClockDate>
              <ClockStatus $active={isWorkHours}>
                <ClockDot $active={isWorkHours} />
                {isWorkHours ? 'Online' : 'Offline'}
              </ClockStatus>
            </ClockCard>
          );
        })}
      </ClocksGrid>
    </ClocksWrap>
  );

  /* ── PIPELINE VIEW (Kanban) ── */
  const renderPipeline = () => (
    <KanbanWrap variants={stagger} initial="hidden" animate="show">
      <KanbanHeader>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <SectionTitle variants={fadeIn}><TrendingUp /> Sales Pipeline</SectionTitle>
          <KanbanTotal>{eur(pipeline)}</KanbanTotal>
          <Badge>{(data.deals || []).length} deals</Badge>
          <Badge $bg="#EFF6FF" $c="#0EA5E9">gewogen {eur(weighted)}</Badge>
        </div>
      </KanbanHeader>
      <KanbanBoard variants={stagger}>
        {PIPELINE_PHASES.map(phase => {
          const deals = dealsByPhase[phase] || [];
          const total = deals.reduce((s, d) => s + amt(d.estimated_value), 0);
          const color = PHASE_COLORS[phase] || '#94A3B8';
          return (
            <KanbanCol key={phase} variants={riseUp}>
              <KanbanColHead $color={color}>
                <KanbanColTitle>
                  {phase} <KanbanColCount>{deals.length}</KanbanColCount>
                </KanbanColTitle>
                <KanbanColValue $color={color}>{eur(total)}</KanbanColValue>
              </KanbanColHead>
              <KanbanCards>
                {deals.map(deal => {
                  const owner = resolveUser(deal.responsible_user);
                  return (
                    <KanbanDeal key={deal.id} $color={color}
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}>
                      <KanbanDealTitle>{deal.title}</KanbanDealTitle>
                      <KanbanDealMeta>
                        <KanbanDealTag $bg={`${color}15`} $c={color}>{eurFull(deal.estimated_value)}</KanbanDealTag>
                        {deal.estimated_probability != null && (
                          <KanbanDealTag>{deal.estimated_probability}%</KanbanDealTag>
                        )}
                        {deal.estimated_closing_date && (
                          <KanbanDealTag>{fmtDate(deal.estimated_closing_date)}</KanbanDealTag>
                        )}
                      </KanbanDealMeta>
                      {owner && <KanbanDealOwner>{owner}</KanbanDealOwner>}
                    </KanbanDeal>
                  );
                })}
              </KanbanCards>
            </KanbanCol>
          );
        })}
      </KanbanBoard>
    </KanbanWrap>
  );

  /* ── PROJECTS VIEW (rows) ── */
  const renderProjects = () => (
    <ProjWrap variants={stagger} initial="hidden" animate="show">
      <SectionHead>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <SectionTitle variants={fadeIn}><FolderKanban /> Actieve Projecten</SectionTitle>
          <Badge $bg="#F0FDF4" $c="#10B981">{sortedProjects.length} actief</Badge>
        </div>
      </SectionHead>
      <ProjRowHeader>
        <span>Project</span>
        <span style={{ textAlign: 'center' }}>Marge</span>
        <span style={{ textAlign: 'center' }}>Budget</span>
        <span style={{ textAlign: 'center' }}>Niet gefact.</span>
        <span style={{ textAlign: 'center' }}>Deadline</span>
        <span>Taken</span>
      </ProjRowHeader>
      <ProjTable variants={stagger}>
        {sortedProjects.map(p => {
          const budget = amt(p.external_budget) || amt(p.price);
          const spent = amt(p.external_budget_spent) || amt(p.cost);
          const pct = budget > 0 ? Math.round((spent / budget) * 100) : 0;
          const unbilled = amt(p.amount_unbilled);
          const over = pct > 100;
          const tasks = (tasksByProject[p.id] || []).sort((a, b) =>
            new Date(a.due_on || '2099-01-01') - new Date(b.due_on || '2099-01-01')
          );
          return (
            <ProjRow key={p.id} variants={riseUp}>
              <div style={{ minWidth: 0 }}>
                <ProjName>{p.title}</ProjName>
                <ProjSub>
                  {over && <Tag $bg="#FEF2F2" $c="#EF4444">Over budget</Tag>}
                  {budget > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1 }}>
                      <ProjBarBg>
                        <ProjBarFill $c={over ? '#EF4444' : pct > 80 ? '#F59E0B' : undefined}
                          initial={{ width: 0 }} animate={{ width: `${Math.min(100, pct)}%` }}
                          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} />
                      </ProjBarBg>
                      <span style={{ fontSize: 9, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, color: '#94A3B8', flexShrink: 0 }}>{pct}%</span>
                    </div>
                  )}
                </ProjSub>
              </div>
              <ProjStat>
                <ProjStatNum $c={p.margin_percentage > 50 ? '#10B981' : p.margin_percentage > 0 ? '#F59E0B' : '#94A3B8'}>
                  {p.margin_percentage != null ? `${Math.round(p.margin_percentage)}%` : '-'}
                </ProjStatNum>
                <ProjStatLabel>Marge</ProjStatLabel>
              </ProjStat>
              <ProjStat>
                <ProjStatNum>{budget > 0 ? eur(budget) : '-'}</ProjStatNum>
                <ProjStatLabel>Budget</ProjStatLabel>
              </ProjStat>
              <ProjStat>
                <ProjStatNum $c={unbilled > 0 ? '#F59E0B' : '#CBD5E1'}>{unbilled > 0 ? eur(unbilled) : '-'}</ProjStatNum>
                <ProjStatLabel>Open</ProjStatLabel>
              </ProjStat>
              <ProjStat>
                <ProjStatNum $c={p.end_date && new Date(p.end_date) < new Date() ? '#EF4444' : '#64748B'}>
                  {p.end_date ? fmtDate(p.end_date) : '-'}
                </ProjStatNum>
                <ProjStatLabel>Deadline</ProjStatLabel>
              </ProjStat>
              <ProjTaskList>
                {tasks.length === 0 && (
                  <span style={{ fontSize: 10, color: '#CBD5E1', fontStyle: 'italic' }}>Geen taken</span>
                )}
                {tasks.slice(0, 3).map(t => {
                  const late = t.due_on && new Date(t.due_on) < new Date();
                  return (
                    <TaskLine key={t.id} $late={late}>
                      {late ? <AlertTriangle /> : <Circle />}
                      <TaskText>{t.title}</TaskText>
                      <TaskDate $late={late}>{t.due_on ? fmtDate(t.due_on) : ''}</TaskDate>
                    </TaskLine>
                  );
                })}
                {tasks.length > 3 && (
                  <span style={{ fontSize: 9, color: '#CBD5E1', fontWeight: 600 }}>+{tasks.length - 3} meer</span>
                )}
              </ProjTaskList>
            </ProjRow>
          );
        })}
      </ProjTable>
    </ProjWrap>
  );

  /* ── TEAM VIEW (rows, 2x height, week + totaal) ── */
  const renderTeam = () => {
    const totalHoursWeek = teamData.reduce((s, m) => s + m.hoursWeek, 0);
    const totalHoursMonth = teamData.reduce((s, m) => s + m.hoursMonth, 0);
    const totalDone = teamData.reduce((s, m) => s + m.doneMonth, 0);
    const totalOpen = teamData.reduce((s, m) => s + m.open, 0);
    const totalOverdue = teamData.reduce((s, m) => s + m.overdue, 0);
    return (
      <TeamWrap variants={stagger} initial="hidden" animate="show">
        <SectionHead>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <SectionTitle variants={fadeIn}><Users /> Team Overzicht</SectionTitle>
            <Badge>{teamData.length} leden</Badge>
            <Badge $bg="#F0FDF4" $c="#10B981">{totalDone} gedaan</Badge>
            <Badge $bg="#FFF7ED" $c="#F59E0B">{totalOpen} open</Badge>
            {totalOverdue > 0 && <Badge $bg="#FEF2F2" $c="#EF4444">{totalOverdue} te laat</Badge>}
            <Badge $bg="#EFF6FF" $c="#0EA5E9">{fmtHours(totalHoursWeek)} week / {fmtHours(totalHoursMonth)} maand</Badge>
          </div>
        </SectionHead>
        <TeamRowHeader>
          <span>Teamlid</span>
          <span style={{ textAlign: 'center' }}>Gedaan</span>
          <span style={{ textAlign: 'center' }}>Open</span>
          <span style={{ textAlign: 'center' }}>Te laat</span>
          <span style={{ textAlign: 'center' }}>Deals</span>
          <span style={{ textAlign: 'center' }}>Uren</span>
          <span>Taken</span>
        </TeamRowHeader>
        <TeamTable variants={stagger}>
          {teamData.map(m => {
            const initials = m.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
            const sortedTasks = [...m.tasks].sort((a, b) =>
              new Date(a.due_on || '2099-01-01') - new Date(b.due_on || '2099-01-01')
            );
            return (
              <TeamRow key={m.id} variants={riseUp}>
                <TeamMemberInfo>
                  <Avatar $bg={m.bg}>{initials}</Avatar>
                  <div style={{ minWidth: 0 }}>
                    <TeamMemberName>{m.name}</TeamMemberName>
                    <TeamMemberSub>{m.deals > 0 ? `${m.deals} deals` : ''}</TeamMemberSub>
                  </div>
                </TeamMemberInfo>
                <TeamStat>
                  <TeamStatBig $c="#10B981">{m.doneWeek}</TeamStatBig>
                  <TeamStatSmall>{m.doneMonth} totaal</TeamStatSmall>
                  <TeamStatLabel>Week / Maand</TeamStatLabel>
                </TeamStat>
                <TeamStat>
                  <TeamStatBig $c="#F59E0B">{m.open}</TeamStatBig>
                  <TeamStatLabel>Open</TeamStatLabel>
                </TeamStat>
                <TeamStat>
                  <TeamStatBig $c={m.overdue > 0 ? '#EF4444' : '#CBD5E1'}>{m.overdue}</TeamStatBig>
                  <TeamStatLabel>Te laat</TeamStatLabel>
                </TeamStat>
                <TeamStat>
                  <TeamStatBig $c="#8B5CF6">{m.deals}</TeamStatBig>
                  <TeamStatLabel>Deals</TeamStatLabel>
                </TeamStat>
                <TeamStat>
                  <TeamStatBig $c="#0EA5E9">{fmtHours(m.hoursWeek)}</TeamStatBig>
                  <TeamStatSmall>{fmtHours(m.hoursMonth)} totaal</TeamStatSmall>
                  <TeamStatLabel>Week / Maand</TeamStatLabel>
                </TeamStat>
                <TeamTaskList>
                  {sortedTasks.length === 0 && (
                    <span style={{ fontSize: 10, color: '#CBD5E1', fontStyle: 'italic' }}>Geen taken</span>
                  )}
                  {sortedTasks.slice(0, 5).map(t => {
                    const late = t.due_on && new Date(t.due_on) < new Date();
                    return (
                      <TaskLine key={t.id} $late={late}>
                        {late ? <AlertTriangle /> : <Circle />}
                        <TaskText>{t.title}</TaskText>
                        <TaskDate $late={late}>{t.due_on ? fmtDate(t.due_on) : ''}</TaskDate>
                      </TaskLine>
                    );
                  })}
                  {sortedTasks.length > 5 && (
                    <span style={{ fontSize: 9, color: '#CBD5E1', fontWeight: 600 }}>+{sortedTasks.length - 5} meer</span>
                  )}
                </TeamTaskList>
              </TeamRow>
            );
          })}
        </TeamTable>
      </TeamWrap>
    );
  };

  const views = [renderClocks, renderPipeline, renderProjects, renderTeam];

  return (
    <><GlobalStyle />
      <Page>
        <GradBar />
        <Header>
          <Logo src="/images/optivaize_logo_new.webp" alt="Optivaize" />
          <Nav>{VIEWS.map((v, i) => <NavBtn key={v.id} $on={i === view} onClick={() => switchView(i)}><v.icon /> {v.label}</NavBtn>)}</Nav>
          <Right>
            <Clk>{time.toLocaleDateString('nl-NL', { weekday: 'short', day: 'numeric', month: 'short' })}</Clk>
            <Clk style={{ color: '#0C1824' }}>{time.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</Clk>
            <Live /><span style={{ fontSize: 9, fontWeight: 800, color: '#10B981', letterSpacing: 1 }}>LIVE</span>
            <RefBtn onClick={fetchData}><RefreshCw /></RefBtn>
          </Right>
        </Header>
        <ProgTrack><ProgFill key={vKey} $ms={VIEWS[view]?.ms || 10000} /></ProgTrack>
        {error && <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 16px', margin: '4px 16px 0', background: '#FEF2F2', borderRadius: 6, fontSize: 11, color: '#EF4444' }}><AlertCircle size={12} /> {error}</div>}
        <ViewArea>
          <AnimatePresence mode="wait">
            <motion.div key={vKey} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} style={{ height: '100%' }}>
              {views[view]()}
            </motion.div>
          </AnimatePresence>
        </ViewArea>
      </Page>
    </>
  );
}

const AVATARS_BG = [
  'linear-gradient(135deg,#0EA5E9,#06B6D4)',
  'linear-gradient(135deg,#10B981,#34D399)',
  'linear-gradient(135deg,#8B5CF6,#A78BFA)',
  'linear-gradient(135deg,#F59E0B,#FBBF24)',
  'linear-gradient(135deg,#EC4899,#F472B6)',
  'linear-gradient(135deg,#EF4444,#F87171)',
  'linear-gradient(135deg,#06B6D4,#22D3EE)',
  'linear-gradient(135deg,#6366F1,#818CF8)',
];

export default StatsDashboard;
