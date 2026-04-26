'use client';
import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Mic, MicOff, PhoneOff, Loader2, AlertCircle } from 'lucide-react';

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.08); opacity: 0.85; }
`;

const ringWave = keyframes`
  0% { transform: scale(0.95); opacity: 0.7; }
  100% { transform: scale(1.6); opacity: 0; }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  background: linear-gradient(180deg, #0F172A, #1E293B);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(59,130,246,0.15);
  color: white;
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const StartButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: linear-gradient(135deg, #10B981, #059669);
  color: white;
  border: none;
  padding: 1rem 1.75rem;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(16,185,129,0.35);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  &:hover { transform: translateY(-1px); box-shadow: 0 14px 36px rgba(16,185,129,0.45); }
  &:disabled { opacity: 0.6; cursor: not-allowed; transform: none; box-shadow: none; }
`;

const StopButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(239,68,68,0.15);
  color: #FCA5A5;
  border: 1px solid rgba(239,68,68,0.3);
  padding: 0.85rem 1.5rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  &:hover { background: rgba(239,68,68,0.25); }
`;

const StatusPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 0.5rem 0.9rem;
  border-radius: 999px;
  font-size: 0.85rem;
  color: #CBD5E1;
`;

const Dot = styled.span`
  width: 8px; height: 8px; border-radius: 50%;
  background: ${(p) => (p.$on ? '#10B981' : '#64748B')};
  ${(p) => p.$on && css`animation: ${pulse} 1.4s infinite;`}
`;

const MicVisual = styled.div`
  position: relative;
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: ${(p) => (p.$active ? 'linear-gradient(135deg, #10B981, #059669)' : 'rgba(255,255,255,0.08)')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  &::before, &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 2px solid rgba(16,185,129,0.4);
    ${(p) => p.$active && css`animation: ${ringWave} 1.6s ease-out infinite;`}
  }
  &::after { animation-delay: 0.6s; }
`;

const Timer = styled.div`
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  font-size: 1rem;
  color: ${(p) => (p.$warn ? '#FBBF24' : '#94A3B8')};
`;

const Transcript = styled.div`
  background: rgba(0,0,0,0.25);
  border-radius: 12px;
  padding: 1rem;
  max-height: 220px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  border: 1px solid rgba(255,255,255,0.05);
`;

const Line = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 0.9rem;
  color: ${(p) => (p.$role === 'user' ? '#FDE68A' : '#A7F3D0')};
  & > span:first-child {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    opacity: 0.7;
  }
`;

const ErrorBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  background: rgba(239,68,68,0.1);
  border: 1px solid rgba(239,68,68,0.3);
  color: #FCA5A5;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  font-size: 0.9rem;
`;

const Hint = styled.div`
  font-size: 0.8rem;
  color: #64748B;
`;

function fmt(s) {
  const m = Math.floor(s / 60);
  const sec = String(s % 60).padStart(2, '0');
  return `${m}:${sec}`;
}

export default function VoiceDemo({ caseKey, onToolCall, onSessionStart, onSessionEnd }) {
  const [state, setState] = useState('idle'); // idle | connecting | connected | error | ended
  const [error, setError] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(180);
  const [transcript, setTranscript] = useState([]);

  const pcRef = useRef(null);
  const dcRef = useRef(null);
  const audioRef = useRef(null);
  const micStreamRef = useRef(null);
  const timerRef = useRef(null);
  const aiBufferRef = useRef('');
  const aiItemRef = useRef(null);

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
    const id = aiItemRef.current;
    if (id == null) startAiBuffer();
    setTranscript((t) =>
      t.map((it) => (it.id === aiItemRef.current ? { ...it, text: aiBufferRef.current } : it))
    );
  }

  function finalizeAi() {
    aiItemRef.current = null;
    aiBufferRef.current = '';
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
      case 'response.audio_transcript.delta': {
        if (aiItemRef.current == null) startAiBuffer();
        appendAiDelta(evt.delta || '');
        break;
      }
      case 'response.audio_transcript.done': {
        finalizeAi();
        break;
      }
      case 'response.output_audio_transcript.delta': {
        if (aiItemRef.current == null) startAiBuffer();
        appendAiDelta(evt.delta || '');
        break;
      }
      case 'response.output_audio_transcript.done': {
        finalizeAi();
        break;
      }
      case 'response.function_call_arguments.done': {
        let args = {};
        try { args = JSON.parse(evt.arguments || '{}'); } catch { args = {}; }
        let result = { ok: true };
        try {
          if (typeof onToolCall === 'function') {
            const r = await onToolCall(evt.name, args);
            if (r !== undefined) result = r;
          }
        } catch (e) {
          result = { ok: false, error: String(e?.message || e) };
        }
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
  }

  function stop(reason) {
    teardown();
    setState(reason === 'error' ? 'error' : 'ended');
    if (typeof onSessionEnd === 'function') onSessionEnd(reason);
  }

  async function start() {
    setError(null);
    setTranscript([]);
    setSecondsLeft(180);
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
        // Trigger the assistant to speak first (greeting from system prompt).
        // Without this, the model waits for user audio via server VAD, so a
        // visitor who stays quiet hears silence.
        try {
          dc.send(JSON.stringify({ type: 'response.create' }));
        } catch {}
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
      setError(err.message || 'Er ging iets mis bij het starten van het gesprek');
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

  return (
    <Wrapper>
      <ButtonRow>
        <MicVisual $active={state === 'connected'}>
          {state === 'connected' ? <Mic size={32} color="white" /> : <MicOff size={32} color="#94A3B8" />}
        </MicVisual>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1, minWidth: 200 }}>
          {state === 'idle' || state === 'ended' || state === 'error' ? (
            <StartButton onClick={start}>
              <Mic size={18} />
              {state === 'ended' || state === 'error' ? 'Start nieuw gesprek' : 'Start gesprek'}
            </StartButton>
          ) : state === 'connecting' ? (
            <StartButton disabled>
              <Loader2 size={18} className="spin" /> Verbinden...
            </StartButton>
          ) : (
            <StopButton onClick={() => stop('user')}>
              <PhoneOff size={16} /> Stop gesprek
            </StopButton>
          )}
          <ButtonRow>
            <StatusPill>
              <Dot $on={state === 'connected'} />
              {state === 'idle' && 'Klaar om te starten'}
              {state === 'connecting' && 'Verbinden...'}
              {state === 'connected' && 'Live'}
              {state === 'ended' && 'Gesprek beëindigd'}
              {state === 'error' && 'Fout'}
            </StatusPill>
            {(state === 'connected' || state === 'ended') && (
              <Timer $warn={secondsLeft <= 30 && state === 'connected'}>{fmt(secondsLeft)}</Timer>
            )}
          </ButtonRow>
        </div>
      </ButtonRow>

      {error && (
        <ErrorBox>
          <AlertCircle size={18} />
          <div>{error}</div>
        </ErrorBox>
      )}

      <Hint>
        Gratis demo, max 3 minuten per gesprek. Werkt het beste in Chrome of Edge. Je gaf een keer toestemming voor de microfoon.
      </Hint>

      {transcript.length > 0 && (
        <Transcript>
          {transcript.map((m) => (
            <Line key={m.id} $role={m.role}>
              <span>{m.role === 'user' ? 'Jij' : 'Assistent'}</span>
              <span>{m.text || (m.role === 'ai' ? '...' : '')}</span>
            </Line>
          ))}
        </Transcript>
      )}

      <audio ref={audioRef} autoPlay playsInline style={{ display: 'none' }} />

      <style jsx global>{`
        .spin { animation: spin 0.8s linear infinite; }
        @keyframes spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }
      `}</style>
    </Wrapper>
  );
}
