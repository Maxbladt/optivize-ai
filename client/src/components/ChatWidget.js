'use client';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Phone, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';


// ─── CONSTANTS ───

const STORAGE_KEY = 'optivaize_chat';
const MAX_STORED = 20;
const PHONE = '+31 6 42 69 89 18';
const WHATSAPP = 'https://wa.me/31642698918';
const FORM_URL = 'https://cloud.teamleader.eu/optivaize/forms/ai-of-automatiseringsaanvraag/';

const TEAM = [
  {
    id: 'max',
    name: 'Max',
    role: 'CEO & AI Developer',
    avatar: '/images/max_avatar.webp',
    color: '#3B82F6',
    gradient: 'linear-gradient(135deg, #3B82F6, #10B981)',
  },
  {
    id: 'geronimo',
    name: 'Geronimo',
    role: 'Head of Operations',
    avatar: '/images/geronimo_avatar.webp',
    color: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
  },
];

// ─── HELPERS ───

function generateSessionId() {
  return 'sess_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function loadStorage() {
  if (typeof window === 'undefined') return { conversations: {}, lastVisit: null, visitCount: 0, lastAgent: 'max', sessionId: null };
  try {
    const d = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return d || { conversations: {}, lastVisit: null, visitCount: 0, lastAgent: 'max', sessionId: null };
  } catch { return { conversations: {}, lastVisit: null, visitCount: 0, lastAgent: 'max', sessionId: null }; }
}

function saveStorage(data) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

function getLastMessageTime(convos, agentId) {
  const msgs = convos[agentId] || [];
  for (let i = msgs.length - 1; i >= 0; i--) {
    if (msgs[i].timestamp) return msgs[i].timestamp;
  }
  return null;
}

function getDeviceInfo() {
  if (typeof window === 'undefined') return {};
  const ua = navigator.userAgent;
  const isMobile = /Mobile|Android|iPhone|iPad/i.test(ua);
  return {
    userAgent: ua,
    device: isMobile ? 'mobile' : 'desktop',
    pageUrl: window.location.pathname,
    referrer: document.referrer || null,
    screenWidth: window.screen?.width,
    screenHeight: window.screen?.height,
    language: navigator.language,
  };
}

function saveToDb(sessionId, agentId, messages) {
  if (!sessionId || !messages.length) return;
  fetch('/api/chat/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, agentId, messages, meta: getDeviceInfo() }),
  }).catch(() => {});
}

function stripHtml(html) {
  let t = html;
  t = t.replace(/<script[\s\S]*?<\/script>/gi, '');
  t = t.replace(/<style[\s\S]*?<\/style>/gi, '');
  t = t.replace(/<nav[\s\S]*?<\/nav>/gi, '');
  t = t.replace(/<footer[\s\S]*?<\/footer>/gi, '');
  t = t.replace(/<[^>]+>/g, ' ');
  t = t.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&#\d+;/g, '');
  t = t.replace(/\s+/g, ' ').trim();
  return t;
}

function renderMd(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>')
    // Markdown links [text](url) first
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#3B82F6;text-decoration:underline">$1</a>')
    // Then bare URLs that aren't already inside an href
    .replace(/(?<!href=")(https?:\/\/[^\s<"]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" style="color:#3B82F6;text-decoration:underline">$1</a>')
    .replace(/(\+\d[\d\s]{8,})/g, '<a href="tel:$1" style="color:#3B82F6;text-decoration:underline">$1</a>');
}

async function readStream(response, onChunk) {
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let full = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';
    for (const line of lines) {
      if (line.startsWith('data: ') && line.trim() !== 'data: [DONE]') {
        try { const { t } = JSON.parse(line.slice(6)); if (t) { full += t; onChunk(full); } } catch {}
      }
    }
  }
  return full;
}

// ─── ANIMATIONS ───

const bounce = keyframes`0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-5px)}`;
const pulseGlow = keyframes`0%{box-shadow:0 0 0 0 rgba(59,130,246,0.4)}70%{box-shadow:0 0 0 14px rgba(59,130,246,0)}100%{box-shadow:0 0 0 0 rgba(59,130,246,0)}`;
const blink = keyframes`0%,100%{opacity:1}50%{opacity:0}`;
const shimmer = keyframes`0%{background-position:-200% center}100%{background-position:200% center}`;

// ─── STYLED ───

const Wrapper = styled.div`
  position: fixed; bottom: 24px; right: 24px; z-index: 10000;
  display: flex; flex-direction: column; align-items: flex-end; gap: 12px;
  @media(max-width:480px){ bottom:16px; right:16px; }
`;

const ChatWindow = styled(motion.div)`
  width: 400px; border-radius: 24px; overflow: hidden; background: #fff;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.04);
  display: flex; flex-direction: column; max-height: 580px;
  @media(max-width:480px){ width:calc(100vw - 32px); max-height:75vh; border-radius:20px; }
`;

const Header = styled.div`
  padding: 18px 20px; background: ${p => p.$g}; color: white;
  display: flex; align-items: center; justify-content: space-between;
`;

const AgentInfo = styled.div`display:flex;align-items:center;gap:14px;`;

const HeaderAvatar = styled.div`
  position:relative; width:50px; height:50px; border-radius:50%; overflow:hidden;
  border:2.5px solid rgba(255,255,255,0.85); box-shadow:0 4px 14px rgba(0,0,0,0.2); flex-shrink:0;
  img{object-position:center 15% !important;}
`;

const StatusDot = styled.span`
  position:absolute; bottom:1px; right:1px; width:13px; height:13px;
  border-radius:50%; border:2.5px solid white; background:#22C55E; z-index:2;
`;

const AgentName = styled.h3`font-size:16px;font-weight:700;margin:0;color:white;`;
const AgentRole = styled.span`font-size:12px;color:rgba(255,255,255,0.8);`;

const CloseBtn = styled.button`
  width:34px;height:34px;border-radius:50%;border:none;
  background:rgba(255,255,255,0.2);backdrop-filter:blur(8px);
  cursor:pointer;display:flex;align-items:center;justify-content:center;color:white;
  transition:all 0.2s;&:hover{background:rgba(255,255,255,0.35);}
`;

const TeamSelector = styled.div`
  display:flex;gap:6px;padding:10px 16px;background:#F8FAFC;border-bottom:1px solid #F1F5F9;
`;

const TeamBtn = styled.button`
  flex:1;display:flex;align-items:center;justify-content:center;gap:8px;
  padding:8px 12px;border-radius:12px;font-family:inherit;cursor:pointer;transition:all 0.2s;
  border:1.5px solid ${p=>(p.$a?p.$c:'transparent')};
  background:${p=>(p.$a?'white':'transparent')};
  box-shadow:${p=>(p.$a?'0 2px 8px rgba(0,0,0,0.06)':'none')};
  &:hover{background:${p=>(p.$a?'white':'rgba(255,255,255,0.8)')};}
`;

const SmallAvatar = styled.div`
  width:28px;height:28px;border-radius:50%;overflow:hidden;flex-shrink:0;
  border:1.5px solid ${p=>(p.$a?p.$c:'#E2E8F0')};
  img{object-position:center 15% !important;}
`;

const TeamName = styled.span`
  font-size:13px;font-weight:${p=>(p.$a?'700':'500')};color:${p=>(p.$a?'#0F172A':'#94A3B8')};
`;

const ChatArea = styled.div`
  flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:14px;
  min-height:200px;max-height:300px;
  &::-webkit-scrollbar{width:4px;}
  &::-webkit-scrollbar-track{background:transparent;}
  &::-webkit-scrollbar-thumb{background:#E2E8F0;border-radius:4px;}
`;

const MsgRow = styled(motion.div)`
  display:flex;gap:10px;
  ${p=>p.$u&&css`flex-direction:row-reverse;`}
`;

const MsgAvatar = styled.div`
  width:34px;height:34px;border-radius:50%;overflow:hidden;flex-shrink:0;
  margin-top:2px;box-shadow:0 2px 8px rgba(0,0,0,0.08);
  img{object-position:center 15% !important;}
`;

const MsgBubble = styled.div`
  max-width:80%;padding:12px 16px;font-size:14px;line-height:1.6;word-break:break-word;
  a{color:#3B82F6;text-decoration:underline;} strong{font-weight:700;}
  ${p=>p.$u?css`
    background:linear-gradient(135deg,#3B82F6,#2563EB);color:white;
    border-radius:20px 20px 6px 20px;box-shadow:0 2px 8px rgba(59,130,246,0.2);
    a{color:white;}
  `:css`
    background:#F1F5F9;color:#1E293B;border-radius:20px 20px 20px 6px;
  `}
`;

const Cursor = styled.span`
  display:inline-block;width:2px;height:15px;
  background:${p=>(p.$l?'white':'#3B82F6')};margin-left:2px;
  vertical-align:text-bottom;animation:${blink} 0.8s infinite;
`;

const TypingRow = styled(motion.div)`display:flex;gap:10px;align-items:flex-end;`;

const TypingBubble = styled.div`
  display:flex;gap:5px;align-items:center;padding:14px 18px;
  background:#F1F5F9;border-radius:20px 20px 20px 6px;
`;

const Dot = styled.span`
  width:7px;height:7px;border-radius:50%;background:#94A3B8;
  animation:${bounce} 1.2s infinite;animation-delay:${p=>p.$d||'0s'};
`;

const CTABar = styled(motion.div)`display:flex;gap:6px;padding:6px 16px 2px;flex-wrap:wrap;`;

const CTABtn = styled.a`
  display:inline-flex;align-items:center;gap:5px;padding:7px 14px;border-radius:20px;
  font-size:12px;font-weight:600;text-decoration:none;cursor:pointer;
  transition:all 0.2s;border:1px solid #E2E8F0;background:white;color:#475569;font-family:inherit;
  &:hover{border-color:${p=>p.$c||'#3B82F6'};color:${p=>p.$c||'#3B82F6'};background:${p=>p.$bg||'#EFF6FF'};}
`;

const InputArea = styled.form`
  display:flex;align-items:center;gap:8px;padding:10px 16px 14px;border-top:1px solid #F1F5F9;
`;

const Input = styled.input`
  flex:1;border:1.5px solid #E2E8F0;border-radius:24px;padding:11px 18px;
  font-size:16px;outline:none;font-family:inherit;transition:all 0.2s;background:#FAFBFC;
  &:focus{border-color:#3B82F6;background:white;box-shadow:0 0 0 3px rgba(59,130,246,0.08);}
  &::placeholder{color:#94A3B8;}
`;

const SendBtnStyled = styled.button`
  width:42px;height:42px;border-radius:50%;border:none;background:${p=>p.$g};
  color:white;cursor:pointer;display:flex;align-items:center;justify-content:center;
  transition:all 0.2s;flex-shrink:0;
  &:hover:not(:disabled){transform:scale(1.06);box-shadow:0 4px 16px rgba(59,130,246,0.3);}
  &:disabled{opacity:0.3;cursor:default;}
`;

const FooterBar = styled.div`
  display:flex;align-items:center;justify-content:center;gap:6px;padding:6px 16px 12px;
`;

const StatusBullet = styled.span`
  width:6px;height:6px;border-radius:50%;background:${p=>(p.$on?'#22C55E':'#94A3B8')};flex-shrink:0;
`;

const PoweredText = styled.span`
  font-size:11px;font-weight:500;
  background:linear-gradient(90deg,#94A3B8,#3B82F6,#10B981,#94A3B8);background-size:200% auto;
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  animation:${shimmer} 4s linear infinite;
`;

const Fab = styled(motion.button)`
  width:60px;height:60px;border-radius:50%;border:none;background:${p=>p.$g};
  color:white;cursor:pointer;display:flex;align-items:center;justify-content:center;
  box-shadow:0 8px 28px rgba(59,130,246,0.35);animation:${pulseGlow} 3s infinite;
  &:hover{box-shadow:0 8px 32px rgba(59,130,246,0.5);}
`;

// ─── TIP POPUP (companion pop-out) ───

const TipWrap = styled(motion.div)`
  display:flex;align-items:flex-end;gap:0;cursor:pointer;max-width:360px;
  @media(max-width:480px){max-width:280px;}
`;

const TipAvatarFloat = styled(motion.div)`
  width:68px;height:88px;overflow:hidden;flex-shrink:0;
  position:relative;z-index:2;margin-right:-10px;margin-bottom:-4px;
  filter:drop-shadow(0 6px 12px rgba(0,0,0,0.18));
  border-radius:22px 22px 4px 4px;
  img{object-position:center 10% !important;}
`;

const TipBubble = styled.div`
  background:white;border-radius:16px 16px 16px 4px;padding:12px 36px 12px 16px;
  box-shadow:0 12px 32px rgba(0,0,0,0.12),0 0 0 1px rgba(0,0,0,0.04);
  font-size:13px;line-height:1.55;color:#334155;position:relative;max-width:260px;
`;

const TipCloseBtn = styled.button`
  position:absolute;top:6px;right:6px;width:22px;height:22px;border-radius:50%;
  border:none;background:#F1F5F9;cursor:pointer;display:flex;align-items:center;
  justify-content:center;color:#94A3B8;padding:0;
  &:hover{background:#E2E8F0;}
`;

// ─── COMPONENT ───

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [agentId, setAgentId] = useState('max');
  const [message, setMessage] = useState('');
  const [convos, setConvos] = useState({});
  const [streaming, setStreaming] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [tipText, setTipText] = useState('');
  const [tipAgentId, setTipAgentId] = useState('max');
  const [tipStreaming, setTipStreaming] = useState(false);
  const [storageData, setStorageData] = useState({ conversations: {}, lastVisit: null, visitCount: 0, lastAgent: 'max', sessionId: null });
  const [sessionId, setSessionId] = useState(null);
  const [inited, setInited] = useState({});
  const [showCTA, setShowCTA] = useState(false);
  const [apiOnline, setApiOnline] = useState(true);

  const chatRef = useRef(null);
  const tipTimer = useRef(null);
  const tipAutoHide = useRef(null);
  const tipCount = useRef(0);
  const lastTipPath = useRef('');
  const abortRef = useRef(null);
  const tipAbortRef = useRef(null);
  const pageTextRef = useRef('');
  const lastFetchedPath = useRef('');

  const pathname = usePathname();
  const agent = TEAM.find(t => t.id === agentId) || TEAM[0];
  const tipAgent = TEAM.find(t => t.id === tipAgentId) || TEAM[0];

  // ─── INIT: load from localStorage ───
  useEffect(() => {
    const data = loadStorage();
    setStorageData(data);
    const sid = data.sessionId || generateSessionId();
    setSessionId(sid);
    const lastAgent = data.lastAgent || 'max';
    setAgentId(lastAgent);
    setTipAgentId(lastAgent);
    if (data.conversations) {
      setConvos(data.conversations);
      const init = {};
      for (const id of Object.keys(data.conversations)) {
        if (data.conversations[id]?.length > 0) init[id] = true;
      }
      setInited(init);
    }
    saveStorage({ ...data, sessionId: sid, lastVisit: new Date().toISOString(), visitCount: (data.visitCount || 0) + 1 });
  }, []);

  // ─── SAVE convos to localStorage ───
  useEffect(() => {
    if (Object.keys(convos).length === 0) return;
    const data = loadStorage();
    const trimmed = {};
    for (const [id, msgs] of Object.entries(convos)) {
      trimmed[id] = msgs.slice(-MAX_STORED);
    }
    saveStorage({ ...data, conversations: trimmed });
  }, [convos]);

  // ─── AUTO-SCROLL ───
  const scrollDown = useCallback(() => {
    requestAnimationFrame(() => { if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight; });
  }, []);
  useEffect(() => { scrollDown(); }, [convos, agentId, streaming, scrollDown]);
  useEffect(() => { if (isOpen) setTimeout(scrollDown, 80); }, [isOpen, scrollDown]);

  // ─── SHOW CTA after messages ───
  useEffect(() => {
    const msgs = convos[agentId] || [];
    if (msgs.length >= 3) setShowCTA(true);
  }, [convos, agentId]);

  // ─── FETCH PAGE HTML on navigation ───
  useEffect(() => {
    if (pathname === lastFetchedPath.current) return;
    lastFetchedPath.current = pathname;
    fetch(pathname)
      .then(r => r.text())
      .then(html => { pageTextRef.current = stripHtml(html); })
      .catch(() => { pageTextRef.current = ''; });
  }, [pathname]);

  // ─── PAGE COMPANION POPUP ───
  useEffect(() => {
    if (isOpen) {
      setShowTip(false);
      if (tipAutoHide.current) clearTimeout(tipAutoHide.current);
      return;
    }
    if (tipCount.current >= 3) return;
    if (lastTipPath.current === pathname) return;
    if (pathname.startsWith('/admin') || pathname.startsWith('/stats')) return;

    if (tipTimer.current) clearTimeout(tipTimer.current);
    tipTimer.current = setTimeout(() => {
      const storage = loadStorage();
      const last = storage.lastAgent || 'max';
      setTipAgentId(last);
      lastTipPath.current = pathname;
      tipCount.current += 1;
      generateCompanionTip(last);
    }, 4500);

    return () => { if (tipTimer.current) clearTimeout(tipTimer.current); };
  }, [pathname, isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const generateCompanionTip = useCallback(async (aid) => {
    try {
      if (tipAbortRef.current) tipAbortRef.current.abort();
      const controller = new AbortController();
      tipAbortRef.current = controller;

      // Wait briefly for page content to load
      let attempts = 0;
      while (!pageTextRef.current && attempts < 10) {
        await new Promise(r => setTimeout(r, 200));
        attempts++;
      }

      // Read fresh from localStorage to avoid stale closure
      const freshData = loadStorage();
      const contextMsgs = (freshData.conversations?.[aid] || []).slice(-8).map(m => ({ role: m.role, content: m.content }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: contextMsgs,
          agentId: aid,
          currentPage: pathname,
          mode: 'page-companion',
          pageText: pageTextRef.current,
        }),
        signal: controller.signal,
      });

      if (!res.ok) throw new Error('fail');

      setTipText('');
      setShowTip(true);
      setTipStreaming(true);

      const fullText = await readStream(res, partial => setTipText(partial));
      setTipText(fullText);
      setTipStreaming(false);

      // Auto-hide 5 seconds after streaming completes
      tipAutoHide.current = setTimeout(() => setShowTip(false), 10000);
    } catch (err) {
      if (err.name === 'AbortError') return;
      setTipStreaming(false);
    }
  }, [pathname, convos]);

  // ─── GREETING ───
  const getGreeting = useCallback((aid) => {
    const a = TEAM.find(t => t.id === aid);
    // Check time since last message for this agent
    const lastTime = getLastMessageTime(convos, aid);
    const hoursSince = lastTime ? (Date.now() - lastTime) / 3600000 : Infinity;

    if (hoursSince >= 168) {
      return `Hey, lang niet gezien! Ik ben ${a.name}, ${a.role} bij Optivaize. Fijn dat je er weer bent, kan ik je ergens mee helpen?`;
    }
    if (hoursSince >= 24) {
      return `Hé, leuk je weer te zien! Ik ben ${a.name}. Waar kan ik je mee helpen vandaag?`;
    }
    if (hoursSince >= 1) {
      return `Hey, welkom terug! Ik ben ${a.name}. Kan ik je nog ergens mee helpen?`;
    }
    return `Hi, mijn naam is ${a.name}, ${a.role} bij Optivaize. Heb je een vraag over AI, automatisering of software? Stel hem gerust!`;
  }, [storageData]);

  // ─── OPEN / SWITCH ───
  const openChat = useCallback(() => {
    setIsOpen(true);
    setShowTip(false);
    if (tipAutoHide.current) clearTimeout(tipAutoHide.current);
    if (!inited[agentId]) {
      setConvos(prev => ({ ...prev, [agentId]: [...(prev[agentId] || []), { role: 'assistant', content: getGreeting(agentId) }] }));
      setInited(prev => ({ ...prev, [agentId]: true }));
    }
  }, [agentId, inited, getGreeting]);

  const switchAgent = useCallback((id) => {
    setAgentId(id);
    setShowCTA(false);
    saveStorage({ ...loadStorage(), lastAgent: id });
    if (!inited[id]) {
      setConvos(prev => ({ ...prev, [id]: [...(prev[id] || []), { role: 'assistant', content: getGreeting(id) }] }));
      setInited(prev => ({ ...prev, [id]: true }));
    }
  }, [inited, getGreeting]);

  // ─── TIP CLICK: append to conversation and open chat ───
  const handleTipClick = useCallback(() => {
    if (tipAutoHide.current) clearTimeout(tipAutoHide.current);
    const aid = tipAgentId;
    const currentTipText = tipText;

    setShowTip(false);
    setTipStreaming(false);
    if (tipAbortRef.current) { tipAbortRef.current.abort(); tipAbortRef.current = null; }

    // Switch to the tip agent and append the tip message
    setAgentId(aid);
    setInited(prev => ({ ...prev, [aid]: true }));
    saveStorage({ ...loadStorage(), lastAgent: aid });

    if (currentTipText) {
      setConvos(prev => {
        const existing = prev[aid] || [];
        return { ...prev, [aid]: [...existing, { role: 'assistant', content: currentTipText }] };
      });
    }

    // Open chat directly (don't go through openChat which would add a greeting)
    setIsOpen(true);
  }, [tipText, tipAgentId]);

  // ─── SEND MESSAGE ───
  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || streaming) return;
    const now = Date.now();
    const userMsg = { role: 'user', content: text.trim(), timestamp: now };
    setConvos(prev => ({ ...prev, [agentId]: [...(prev[agentId] || []), userMsg] }));
    setMessage('');
    setStreaming(true);
    saveStorage({ ...loadStorage(), lastAgent: agentId });

    setConvos(prev => ({ ...prev, [agentId]: [...(prev[agentId] || []), { role: 'assistant', content: '', streaming: true }] }));

    const allMsgs = [...(convos[agentId] || []), userMsg];
    const apiMsgs = allMsgs.map(m => ({ role: m.role, content: m.content }));

    try {
      const controller = new AbortController();
      abortRef.current = controller;

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMsgs,
          agentId,
          currentPage: pathname,
        }),
        signal: controller.signal,
      });

      if (!res.ok) throw new Error('Failed');
      setApiOnline(true);

      const fullText = await readStream(res, partial => {
        setConvos(prev => {
          const msgs = [...(prev[agentId] || [])];
          msgs[msgs.length - 1] = { role: 'assistant', content: partial, streaming: true };
          return { ...prev, [agentId]: msgs };
        });
      });

      const assistantMsg = { role: 'assistant', content: fullText, timestamp: Date.now() };
      setConvos(prev => {
        const msgs = [...(prev[agentId] || [])];
        msgs[msgs.length - 1] = assistantMsg;
        return { ...prev, [agentId]: msgs };
      });

      // Save to database
      saveToDb(sessionId, agentId, [userMsg, assistantMsg]);
    } catch (err) {
      if (err.name === 'AbortError') return;
      setApiOnline(false);
      const fallback = `Sorry, er ging iets mis. Bel me gerust op ${PHONE} of stuur een WhatsApp!`;
      setConvos(prev => {
        const msgs = [...(prev[agentId] || [])];
        msgs[msgs.length - 1] = { role: 'assistant', content: fallback, timestamp: Date.now() };
        return { ...prev, [agentId]: msgs };
      });
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  }, [streaming, agentId, convos, pathname, sessionId]);

  const handleSubmit = useCallback(e => { e.preventDefault(); sendMessage(message); }, [message, sendMessage]);

  const currentMsgs = convos[agentId] || [];

  return (
    <Wrapper>
      <AnimatePresence>
        {/* ─── COMPANION POPUP ─── */}
        {showTip && !isOpen && tipText && (
          <TipWrap
            key="tip"
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ type: 'spring', damping: 18, stiffness: 250 }}
            onClick={handleTipClick}
          >
            <TipAvatarFloat
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', damping: 12, stiffness: 180, delay: 0.1 }}
            >
              <Image
                src={tipAgent.avatar}
                alt={tipAgent.name}
                width={68}
                height={88}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </TipAvatarFloat>
            <TipBubble>
              <span dangerouslySetInnerHTML={{ __html: renderMd(tipText) }} />
              {tipStreaming && <Cursor />}
              <TipCloseBtn onClick={e => {
                e.stopPropagation();
                setShowTip(false);
                setTipStreaming(false);
                if (tipAutoHide.current) clearTimeout(tipAutoHide.current);
                if (tipAbortRef.current) tipAbortRef.current.abort();
              }}>
                <X size={10} />
              </TipCloseBtn>
            </TipBubble>
          </TipWrap>
        )}

        {/* ─── CHAT WINDOW ─── */}
        {isOpen && (
          <ChatWindow
            key="chat"
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 22, stiffness: 280 } }}
            exit={{ opacity: 0, y: 24, scale: 0.94, transition: { duration: 0.18 } }}
          >
            <Header $g={agent.gradient}>
              <AgentInfo>
                <HeaderAvatar>
                  <Image src={agent.avatar} alt={agent.name} width={50} height={50} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                  <StatusDot />
                </HeaderAvatar>
                <div>
                  <AgentName>{agent.name}</AgentName>
                  <AgentRole>{agent.role}</AgentRole>
                </div>
              </AgentInfo>
              <CloseBtn onClick={() => setIsOpen(false)}><X size={16} /></CloseBtn>
            </Header>

            <TeamSelector>
              {TEAM.map(t => (
                <TeamBtn key={t.id} $a={t.id===agentId} $c={t.color} onClick={() => switchAgent(t.id)}>
                  <SmallAvatar $a={t.id===agentId} $c={t.color}>
                    <Image src={t.avatar} alt={t.name} width={28} height={28} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                  </SmallAvatar>
                  <TeamName $a={t.id===agentId}>{t.name}</TeamName>
                </TeamBtn>
              ))}
            </TeamSelector>

            <ChatArea ref={chatRef}>
              {currentMsgs.map((msg, i) => {
                // Skip rendering the empty placeholder bubble (typing dots handle it)
                if (msg.streaming && !msg.content) return null;
                return (
                  <MsgRow key={`${agentId}-${i}`} $u={msg.role==='user'}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
                    {msg.role !== 'user' && (
                      <MsgAvatar>
                        <Image src={agent.avatar} alt={agent.name} width={34} height={34} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                      </MsgAvatar>
                    )}
                    <MsgBubble $u={msg.role==='user'} dangerouslySetInnerHTML={{ __html: renderMd(msg.content) }} />
                    {msg.streaming && msg.content && <Cursor $l={msg.role==='user'} />}
                  </MsgRow>
                );
              })}

              {streaming && currentMsgs.length > 0 && (!currentMsgs[currentMsgs.length-1]?.content) && (
                <TypingRow initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <MsgAvatar>
                    <Image src={agent.avatar} alt={agent.name} width={34} height={34} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                  </MsgAvatar>
                  <TypingBubble><Dot $d="0s" /><Dot $d="0.15s" /><Dot $d="0.3s" /></TypingBubble>
                </TypingRow>
              )}
            </ChatArea>

            {showCTA && (
              <CTABar initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                <CTABtn href={`tel:${PHONE.replace(/\s/g,'')}`} $c="#10B981" $bg="#ECFDF5">
                  <Phone size={12} />Bel
                </CTABtn>
                <CTABtn href={WHATSAPP} target="_blank" rel="noopener noreferrer" $c="#25D366" $bg="#F0FFF4">
                  <MessageSquare size={12} />WhatsApp
                </CTABtn>
                <CTABtn href={FORM_URL} target="_blank" rel="noopener noreferrer" $c="#3B82F6" $bg="#EFF6FF">
                  <ExternalLink size={12} />Aanvraag
                </CTABtn>
              </CTABar>
            )}

            <InputArea onSubmit={handleSubmit}>
              <Input type="text" value={message} onChange={e=>setMessage(e.target.value)}
                placeholder={`Bericht aan ${agent.name}...`}
                disabled={streaming} />
              <SendBtnStyled type="submit" disabled={!message.trim()||streaming} $g={agent.gradient}>
                <Send size={16} />
              </SendBtnStyled>
            </InputArea>

            <FooterBar>
              <StatusBullet $on={apiOnline} />
              <PoweredText>{apiOnline?'Online':'Offline'} · Powered by Optivaize AI</PoweredText>
            </FooterBar>
          </ChatWindow>
        )}
      </AnimatePresence>

      <Fab $g={agent.gradient} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.92 }}
        onClick={isOpen ? () => setIsOpen(false) : (showTip && tipText) ? handleTipClick : openChat}>
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </Fab>
    </Wrapper>
  );
}

export default ChatWidget;
