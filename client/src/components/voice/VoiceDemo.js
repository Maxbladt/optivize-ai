'use client';
import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Mic, MicOff, PhoneOff, Phone, Loader2, AlertCircle, CheckCircle2, Activity, PhoneForwarded } from 'lucide-react';

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.08); opacity: 0.85; }
`;

const ringWave = keyframes`
  0% { transform: scale(0.95); opacity: 0.7; }
  100% { transform: scale(1.6); opacity: 0; }
`;

const speak = keyframes`
  0%, 100% { transform: scaleY(0.4); }
  50% { transform: scaleY(1); }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: linear-gradient(180deg, #0F172A, #1E293B);
  border-radius: 22px;
  padding: 0;
  border: 1px solid rgba(59,130,246,0.18);
  color: white;
  overflow: hidden;
  box-shadow: 0 24px 50px rgba(15,23,42,0.18);
`;

/* Idle state - the "call to action" surface */
const IdlePane = styled.div`
  padding: 2rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  align-items: center;
  text-align: center;
`;

const IdleAvatar = styled.div`
  width: 92px;
  height: 92px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3B82F6, #10B981);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12px 36px rgba(16,185,129,0.35);
  flex-shrink: 0;
`;

const IdleTitle = styled.div`
  font-size: 1.15rem;
  font-weight: 700;
  color: white;
`;

const IdleSub = styled.div`
  font-size: 0.85rem;
  color: #94A3B8;
  max-width: 320px;
  line-height: 1.5;
`;

const StartButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: linear-gradient(135deg, #10B981, #059669);
  color: white;
  border: none;
  padding: 1rem 1.85rem;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 12px 32px rgba(16,185,129,0.4);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  &:hover { transform: translateY(-2px); box-shadow: 0 18px 40px rgba(16,185,129,0.55); }
  &:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
`;

/* Active call UI - looks like a real phone call */
const CallPane = styled.div`
  padding: 1.5rem 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: linear-gradient(180deg, rgba(16,185,129,0.08), transparent 70%);
`;

const CallTopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.78rem;
  color: #94A3B8;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-weight: 600;
`;

const LiveDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10B981;
  animation: ${pulse} 1.4s infinite;
`;

const CallerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CallerAvatar = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3B82F6, #10B981);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  &::before, &::after {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 50%;
    border: 2px solid rgba(16,185,129,0.4);
    ${(p) => p.$active && css`animation: ${ringWave} 1.8s ease-out infinite;`}
  }
  &::after { animation-delay: 0.6s; }
`;

const CallerName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  flex: 1;
  min-width: 0;
`;

const CallerTitle = styled.div`
  font-size: 1.05rem;
  font-weight: 700;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CallerSub = styled.div`
  font-size: 0.78rem;
  color: #94A3B8;
`;

const CallTimer = styled.div`
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  font-size: 1.1rem;
  color: ${(p) => (p.$warn ? '#FBBF24' : '#94A3B8')};
`;

const SpeakerVis = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 28px;
  margin: 0.25rem 0;
`;

const Bar = styled.span`
  display: inline-block;
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, #10B981, #3B82F6);
  border-radius: 2px;
  transform-origin: center;
  animation: ${speak} ${(p) => p.$dur || '0.7s'} ease-in-out infinite;
  animation-delay: ${(p) => p.$delay || '0s'};
  opacity: ${(p) => (p.$on ? 1 : 0.25)};
`;

const CallButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.85rem;
`;

const EndButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #EF4444;
  color: white;
  border: none;
  padding: 0.85rem 1.6rem;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 22px rgba(239,68,68,0.35);
  transition: transform 0.15s;
  &:hover { transform: translateY(-1px); }
`;

/* Transcript */
const TranscriptArea = styled.div`
  background: rgba(0,0,0,0.28);
  border-top: 1px solid rgba(255,255,255,0.05);
  padding: 1rem 1.25rem;
  max-height: 200px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

const Line = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.18rem;
  font-size: 0.9rem;
  color: ${(p) => (p.$role === 'user' ? '#FDE68A' : '#A7F3D0')};
  & > .lbl {
    font-size: 0.66rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.7;
    font-weight: 700;
  }
`;

/* Tool call activity feed */
const FeedArea = styled.div`
  background: rgba(0,0,0,0.32);
  border-top: 1px solid rgba(255,255,255,0.05);
  padding: 0.85rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  max-height: 130px;
  overflow-y: auto;
`;

const FeedHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #64748B;
  font-weight: 700;
`;

const FeedItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.82rem;
  color: #CBD5E1;
  line-height: 1.4;
  & > svg { flex-shrink: 0; margin-top: 2px; }
`;

const ErrorBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  background: rgba(239,68,68,0.1);
  border: 1px solid rgba(239,68,68,0.3);
  color: #FCA5A5;
  padding: 0.85rem 1rem;
  margin: 0 1.25rem 1.25rem;
  border-radius: 12px;
  font-size: 0.88rem;
`;

const Hint = styled.div`
  font-size: 0.72rem;
  color: #64748B;
  text-align: center;
  padding: 0 1.25rem 0.85rem;
`;

const EndedPane = styled.div`
  padding: 1.75rem 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  align-items: center;
  text-align: center;
`;

const EndedIcon = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(239,68,68,0.18);
  color: #FCA5A5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function fmt(s) {
  const m = Math.floor(s / 60);
  const sec = String(s % 60).padStart(2, '0');
  return `${m}:${sec}`;
}

const FRIENDLY_LABELS = {
  // tandarts
  vrije_tijden_opvragen: (a) => `Vrije tijden opgezocht voor ${a.datum}`,
  boek_afspraak: (a) => `Afspraak ingepland: ${a.patient_naam} - ${a.datum} ${a.tijd}`,
  verzet_afspraak: (a) => `Afspraak verzet: ${a.patient_naam} naar ${a.nieuwe_datum} ${a.nieuwe_tijd}`,
  annuleer_afspraak: (a) => `Afspraak geannuleerd: ${a.patient_naam}`,
  // webshop
  zoek_bestelling: (a) => `Bestelling opgezocht: ${a.bestelnummer}`,
  track_pakket: (a) => `Pakket getrackt: ${a.bestelnummer}`,
  start_retour: (a) => `Retour gestart: ${a.bestelnummer} (${a.reden})`,
  wijzig_adres: (a) => `Adres gewijzigd: ${a.bestelnummer}`,
  // restaurant
  vrije_tafels: (a) => `Beschikbaarheid gecheckt: ${a.datum} ${a.tijd}, ${a.aantal_personen} pers.`,
  boek_tafel: (a) => `Tafel gereserveerd: ${a.naam} - ${a.datum} ${a.tijd}`,
  verzet_reservering: (a) => `Reservering verzet: ${a.naam}`,
  annuleer_reservering: (a) => `Reservering geannuleerd: ${a.naam}`,
  // makelaar
  zoek_woningen: (a) => `Woningen gezocht (max €${a.max_prijs?.toLocaleString('nl-NL')})`,
  plan_bezichtiging: (a) => `Bezichtiging gepland: ${a.naam} - ${a.datum} ${a.tijd}`,
  kwalificeer_lead: (a) => `Lead vastgelegd: ${a.naam}`,
  beeindig_gesprek: () => `Gesprek wordt afgesloten...`,
  verbind_medewerker: () => `Doorverbinden met medewerker...`,
};

const HANG_UP_DELAY_MS = 10000;
const TRANSFER_DELAY_MS = 10000;

function describeToolCall(name, args) {
  try {
    const fn = FRIENDLY_LABELS[name];
    return fn ? fn(args || {}) : name.replace(/_/g, ' ');
  } catch {
    return name.replace(/_/g, ' ');
  }
}

export default function VoiceDemo({ caseKey, caller, onToolCall, onSessionStart, onSessionEnd }) {
  const [state, setState] = useState('idle'); // idle | connecting | connected | transferring | error | ended
  const [error, setError] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(180);
  const [transcript, setTranscript] = useState([]);
  const [feed, setFeed] = useState([]);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [endReason, setEndReason] = useState(null); // 'transfer' | 'goodbye' | etc

  const pcRef = useRef(null);
  const dcRef = useRef(null);
  const audioRef = useRef(null);
  const micStreamRef = useRef(null);
  const timerRef = useRef(null);
  const aiBufferRef = useRef('');
  const aiItemRef = useRef(null);
  const endTimeoutRef = useRef(null);

  function appendUser(text) {
    if (!text || !text.trim()) return;
    setTranscript((t) => [...t, { id: Date.now() + Math.random(), role: 'user', text }]);
  }

  function startAiBuffer() {
    aiBufferRef.current = '';
    const id = Date.now() + Math.random();
    aiItemRef.current = id;
    setTranscript((t) => [...t, { id, role: 'ai', text: '' }]);
  }

  function appendAiDelta(delta) {
    aiBufferRef.current += delta;
    if (aiItemRef.current == null) startAiBuffer();
    setTranscript((t) =>
      t.map((it) => (it.id === aiItemRef.current ? { ...it, text: aiBufferRef.current } : it))
    );
  }

  function finalizeAi() {
    aiItemRef.current = null;
    aiBufferRef.current = '';
  }

  function pushFeed(label) {
    setFeed((f) => [...f, { id: Date.now() + Math.random(), text: label }]);
  }

  function sendEvent(obj) {
    const dc = dcRef.current;
    if (dc && dc.readyState === 'open') {
      dc.send(JSON.stringify(obj));
    }
  }

  async function handleEvent(evt) {
    switch (evt.type) {
      case 'conversation.item.input_audio_transcription.completed': {
        appendUser(evt.transcript);
        break;
      }
      case 'response.audio_transcript.delta':
      case 'response.output_audio_transcript.delta': {
        if (aiItemRef.current == null) startAiBuffer();
        appendAiDelta(evt.delta || '');
        break;
      }
      case 'response.audio_transcript.done':
      case 'response.output_audio_transcript.done': {
        finalizeAi();
        break;
      }
      case 'output_audio_buffer.started': {
        setAiSpeaking(true);
        break;
      }
      case 'output_audio_buffer.stopped': {
        setAiSpeaking(false);
        break;
      }
      case 'response.function_call_arguments.done': {
        let args = {};
        try { args = JSON.parse(evt.arguments || '{}'); } catch { args = {}; }

        // Special: end-call tool. Show "ending" UI and close the call after 10s
        // so the model has plenty of time to finish its goodbye phrase.
        if (evt.name === 'beeindig_gesprek') {
          pushFeed(describeToolCall(evt.name, args));
          sendEvent({
            type: 'conversation.item.create',
            item: {
              type: 'function_call_output',
              call_id: evt.call_id,
              output: JSON.stringify({ ok: true }),
            },
          });
          // Don't trigger a new response - the model already said its goodbye.
          setEndReason('goodbye');
          if (endTimeoutRef.current) clearTimeout(endTimeoutRef.current);
          endTimeoutRef.current = setTimeout(() => stop('ai_ended'), HANG_UP_DELAY_MS);
          break;
        }

        // Special: transfer-to-employee. Switch to the "connecting" UI and
        // close the call after 10s.
        if (evt.name === 'verbind_medewerker') {
          pushFeed(describeToolCall(evt.name, args));
          sendEvent({
            type: 'conversation.item.create',
            item: {
              type: 'function_call_output',
              call_id: evt.call_id,
              output: JSON.stringify({ ok: true, status: 'doorverbinden' }),
            },
          });
          setState('transferring');
          setEndReason('transfer');
          if (endTimeoutRef.current) clearTimeout(endTimeoutRef.current);
          endTimeoutRef.current = setTimeout(() => stop('transferred'), TRANSFER_DELAY_MS);
          break;
        }

        let result = { ok: true };
        try {
          if (typeof onToolCall === 'function') {
            const r = await onToolCall(evt.name, args);
            if (r !== undefined) result = r;
          }
        } catch (e) {
          result = { ok: false, error: String(e?.message || e) };
        }
        pushFeed(describeToolCall(evt.name, args));
        sendEvent({
          type: 'conversation.item.create',
          item: {
            type: 'function_call_output',
            call_id: evt.call_id,
            output: JSON.stringify(result),
          },
        });
        sendEvent({ type: 'response.create' });
        break;
      }
      case 'error': {
        console.error('Realtime error event', evt);
        setError(evt.error?.message || 'Onbekende fout van de spraakservice');
        break;
      }
      default:
        break;
    }
  }

  function teardown() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (endTimeoutRef.current) {
      clearTimeout(endTimeoutRef.current);
      endTimeoutRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((t) => t.stop());
      micStreamRef.current = null;
    }
    if (dcRef.current) {
      try { dcRef.current.close(); } catch {}
      dcRef.current = null;
    }
    if (pcRef.current) {
      try { pcRef.current.close(); } catch {}
      pcRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.srcObject = null;
    }
    setAiSpeaking(false);
  }

  function stop(reason) {
    teardown();
    setState(reason === 'error' ? 'error' : 'ended');
    if (typeof onSessionEnd === 'function') onSessionEnd(reason);
  }

  async function start() {
    setError(null);
    setTranscript([]);
    setFeed([]);
    setSecondsLeft(180);
    setEndReason(null);
    setState('connecting');

    try {
      const resp = await fetch('/api/voice-assistant/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ case: caseKey }),
      });
      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        throw new Error(data.message || data.error || 'Kon geen sessie starten');
      }
      const { client_secret, max_session_seconds } = await resp.json();
      if (!client_secret) throw new Error('Geen geldige sessietoken ontvangen');
      if (max_session_seconds) setSecondsLeft(max_session_seconds);

      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      pc.ontrack = (e) => {
        if (audioRef.current) {
          audioRef.current.srcObject = e.streams[0];
          audioRef.current.play().catch(() => {});
        }
      };

      const mic = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = mic;
      mic.getTracks().forEach((t) => pc.addTrack(t, mic));

      const dc = pc.createDataChannel('oai-events');
      dcRef.current = dc;
      dc.onopen = () => {
        if (typeof onSessionStart === 'function') onSessionStart();
        try { dc.send(JSON.stringify({ type: 'response.create' })); } catch {}
      };
      dc.onmessage = (e) => {
        try {
          const evt = JSON.parse(e.data);
          handleEvent(evt);
        } catch (err) {
          console.error('Failed to parse event', err);
        }
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const sdpResp = await fetch('https://api.openai.com/v1/realtime/calls', {
        method: 'POST',
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${client_secret}`,
          'Content-Type': 'application/sdp',
        },
      });
      if (!sdpResp.ok) {
        const t = await sdpResp.text();
        throw new Error('OpenAI weigerde de verbinding: ' + t.slice(0, 200));
      }
      await pc.setRemoteDescription({ type: 'answer', sdp: await sdpResp.text() });

      setState('connected');

      timerRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            setTimeout(() => stop('timeout'), 0);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } catch (err) {
      console.error(err);
      const msg = err.name === 'NotAllowedError'
        ? 'Geen toegang tot de microfoon. Sta het toe in je browser om te bellen.'
        : err.name === 'NotFoundError'
        ? 'Geen microfoon gevonden op dit apparaat.'
        : err.message || 'Er ging iets mis bij het starten van het gesprek';
      setError(msg);
      stop('error');
    }
  }

  useEffect(() => () => teardown(), []);

  // If case changes while connected, end the session
  useEffect(() => {
    if (state === 'connected' || state === 'connecting') {
      stop('case_changed');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseKey]);

  const callerName = caller?.name || 'Optivaize Demo';
  const callerSub = caller?.sub || 'Live AI assistent';

  return (
    <Wrapper>
      {(state === 'idle') && (
        <IdlePane>
          <IdleAvatar><Phone size={42} color="white" /></IdleAvatar>
          <IdleTitle>Bel direct met de AI assistent</IdleTitle>
          <IdleSub>Klik hieronder, sta de microfoon toe, en spreek Nederlands. Max 3 minuten gratis.</IdleSub>
          <StartButton onClick={start}><Mic size={18} /> Start gesprek</StartButton>
        </IdlePane>
      )}

      {state === 'connecting' && (
        <IdlePane>
          <IdleAvatar><Loader2 size={42} color="white" className="spin" /></IdleAvatar>
          <IdleTitle>Verbinding maken...</IdleTitle>
          <IdleSub>Sta de microfoon toe in je browser om te beginnen.</IdleSub>
        </IdlePane>
      )}

      {state === 'connected' && (
        <CallPane>
          <CallTopRow>
            <LiveDot /> Live gesprek
          </CallTopRow>
          <CallerRow>
            <CallerAvatar $active={aiSpeaking}>
              <Phone size={28} color="white" />
            </CallerAvatar>
            <CallerName>
              <CallerTitle>{callerName}</CallerTitle>
              <CallerSub>{callerSub}</CallerSub>
            </CallerName>
            <CallTimer $warn={secondsLeft <= 30}>{fmt(secondsLeft)}</CallTimer>
          </CallerRow>
          <SpeakerVis>
            {[0, 0.1, 0.2, 0.3, 0.4, 0.5].map((d, i) => (
              <Bar key={i} $on={aiSpeaking} $delay={`${d}s`} $dur={`${0.6 + (i % 2) * 0.2}s`} />
            ))}
          </SpeakerVis>
          <CallButtons>
            <EndButton onClick={() => stop('user')}><PhoneOff size={16} /> Ophangen</EndButton>
          </CallButtons>
        </CallPane>
      )}

      {state === 'transferring' && (
        <EndedPane>
          <IdleAvatar style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)' }}>
            <PhoneForwarded size={42} color="white" />
          </IdleAvatar>
          <IdleTitle>Doorverbinden met medewerker</IdleTitle>
          <IdleSub>Een moment geduld - we verbinden je door met een collega.</IdleSub>
        </EndedPane>
      )}

      {(state === 'ended' || state === 'error') && (
        <EndedPane>
          <EndedIcon><PhoneOff size={26} /></EndedIcon>
          <IdleTitle>{state === 'error' ? 'Gesprek mislukt' : endReason === 'transfer' ? 'Doorverbonden' : 'Gesprek beëindigd'}</IdleTitle>
          {error && <IdleSub style={{ color: '#FCA5A5' }}>{error}</IdleSub>}
          <StartButton onClick={start}><Mic size={18} /> Nieuw gesprek</StartButton>
        </EndedPane>
      )}

      {state !== 'idle' && state !== 'connecting' && (
        <Hint>Werkt het beste in Chrome of Edge. Demo: max 3 minuten per gesprek.</Hint>
      )}

      {transcript.length > 0 && (
        <TranscriptArea>
          {transcript.map((m) => (
            <Line key={m.id} $role={m.role}>
              <span className="lbl">{m.role === 'user' ? 'Jij' : 'Assistent'}</span>
              <span>{m.text || (m.role === 'ai' ? '...' : '')}</span>
            </Line>
          ))}
        </TranscriptArea>
      )}

      {feed.length > 0 && (
        <FeedArea>
          <FeedHeader><Activity size={11} /> Live acties</FeedHeader>
          {feed.slice(-6).map((f) => (
            <FeedItem key={f.id}>
              <CheckCircle2 size={14} color="#10B981" />
              <span>{f.text}</span>
            </FeedItem>
          ))}
        </FeedArea>
      )}

      <audio ref={audioRef} autoPlay playsInline style={{ display: 'none' }} />

      <style jsx global>{`
        .spin { animation: spin 0.8s linear infinite; }
        @keyframes spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }
      `}</style>
    </Wrapper>
  );
}
