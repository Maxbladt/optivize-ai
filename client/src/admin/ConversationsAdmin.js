'use client';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MessageSquare, ChevronDown, ChevronUp, User, Bot, Monitor, Smartphone, Globe, MapPin } from 'lucide-react';
import { useAuth } from './useAuth';

const Title = styled.h1`
  font-size: 24px; font-weight: 700; color: #0F172A; margin-bottom: 1.5rem;
  display: flex; align-items: center; gap: 0.5rem;
`;

const Card = styled.div`
  background: white; border-radius: 12px; border: 1px solid #E2E8F0;
  margin-bottom: 0.75rem; overflow: hidden; transition: box-shadow 0.2s;
  &:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
`;

const CardHeader = styled.button`
  width: 100%; display: flex; align-items: center; justify-content: space-between;
  padding: 1rem 1.25rem; background: none; border: none; cursor: pointer;
  font-family: inherit; text-align: left; gap: 0.75rem;
  &:hover { background: #F8FAFC; }
`;

const SessionInfo = styled.div`
  display: flex; align-items: center; gap: 0.75rem; flex: 1; min-width: 0;
`;

const AgentBadge = styled.span`
  padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; flex-shrink: 0;
  background: ${p => p.$agent === 'max' ? '#EFF6FF' : '#F5F3FF'};
  color: ${p => p.$agent === 'max' ? '#3B82F6' : '#8B5CF6'};
`;

const Preview = styled.span`
  font-size: 14px; color: #475569; flex: 1;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
`;

const Meta = styled.div`
  display: flex; align-items: center; gap: 0.75rem; flex-shrink: 0;
`;

const Tag = styled.span`
  font-size: 11px; color: #94A3B8; background: #F1F5F9; padding: 2px 8px; border-radius: 10px;
  display: inline-flex; align-items: center; gap: 4px; flex-shrink: 0;
`;

const Time = styled.span`font-size: 12px; color: #94A3B8; white-space: nowrap;`;

const SessionMeta = styled.div`
  display: flex; flex-wrap: wrap; gap: 0.5rem; padding: 0.75rem 1.25rem;
  border-top: 1px solid #F1F5F9; border-bottom: 1px solid #F1F5F9; background: #FAFBFC;
`;

const MetaItem = styled.span`
  font-size: 11px; color: #64748B; background: white; border: 1px solid #E2E8F0;
  padding: 3px 10px; border-radius: 6px; display: inline-flex; align-items: center; gap: 4px;
`;

const MessagesWrap = styled.div`
  padding: 1rem 1.25rem; max-height: 500px; overflow-y: auto;
  display: flex; flex-direction: column; gap: 0.75rem; background: #FAFBFC;
`;

const MsgRow = styled.div`
  display: flex; gap: 0.75rem;
  ${p => p.$user && 'flex-direction: row-reverse;'}
`;

const MsgIcon = styled.div`
  width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  background: ${p => p.$user ? '#3B82F6' : '#F1F5F9'};
  color: ${p => p.$user ? 'white' : '#64748B'};
`;

const MsgBubble = styled.div`
  max-width: 70%; padding: 8px 12px; border-radius: 12px; font-size: 13px; line-height: 1.5;
  white-space: pre-wrap; word-break: break-word;
  ${p => p.$user ? `
    background: #3B82F6; color: white; border-bottom-right-radius: 4px;
  ` : `
    background: white; color: #1E293B; border: 1px solid #E2E8F0; border-bottom-left-radius: 4px;
  `}
`;

const MsgTime = styled.span`
  font-size: 10px; color: #CBD5E1; display: block;
  margin-top: 2px; ${p => p.$user ? 'text-align: right;' : ''}
`;

const Empty = styled.p`
  color: #94A3B8; text-align: center; padding: 3rem; font-size: 14px;
`;

function formatTime(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  const now = new Date();
  const diff = now - d;
  if (diff < 60000) return 'Zojuist';
  if (diff < 3600000) return `${Math.floor(diff/60000)}m geleden`;
  if (diff < 86400000) return `${Math.floor(diff/3600000)}u geleden`;
  return d.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

function formatFullTime(ts) {
  if (!ts) return '';
  return new Date(ts).toLocaleString('nl-NL', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export default function ConversationsAdmin() {
  const [sessions, setSessions] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [messages, setMessages] = useState({});
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;
    fetch('/api/admin/conversations', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setSessions(data); })
      .catch(() => {});
  }, [token]);

  const toggleSession = async (sessionId) => {
    if (expanded === sessionId) { setExpanded(null); return; }
    setExpanded(sessionId);
    if (!messages[sessionId]) {
      try {
        const res = await fetch(`/api/admin/conversations/${sessionId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (Array.isArray(data)) setMessages(prev => ({ ...prev, [sessionId]: data }));
      } catch {}
    }
  };

  return (
    <>
      <Title><MessageSquare size={24} /> Chat Gesprekken ({sessions.length})</Title>
      {sessions.length === 0 && <Empty>Nog geen gesprekken.</Empty>}
      {sessions.map(s => {
        const key = `${s.session_id}-${s.agent_id}`;
        const isOpen = expanded === s.session_id;
        return (
          <Card key={key}>
            <CardHeader onClick={() => toggleSession(s.session_id)}>
              <SessionInfo>
                <AgentBadge $agent={s.agent_id}>{s.agent_id === 'max' ? 'Max' : 'Geronimo'}</AgentBadge>
                <Preview>{s.first_user_message || 'Geen berichten'}</Preview>
              </SessionInfo>
              <Meta>
                {s.device && (
                  <Tag>
                    {s.device === 'mobile' ? <Smartphone size={10} /> : <Monitor size={10} />}
                    {s.device}
                  </Tag>
                )}
                {s.ip && s.ip !== 'unknown' && (
                  <Tag><MapPin size={10} />{s.ip}</Tag>
                )}
                <Tag>{s.message_count} msg</Tag>
                <Time>{formatTime(s.last_message)}</Time>
                {isOpen ? <ChevronUp size={16} color="#94A3B8" /> : <ChevronDown size={16} color="#94A3B8" />}
              </Meta>
            </CardHeader>

            {isOpen && (
              <>
                <SessionMeta>
                  {s.ip && <MetaItem><MapPin size={10} /> IP: {s.ip}</MetaItem>}
                  {s.device && <MetaItem>{s.device === 'mobile' ? <Smartphone size={10} /> : <Monitor size={10} />} {s.device} {s.screen_width && `${s.screen_width}x${s.screen_height}`}</MetaItem>}
                  {s.user_language && <MetaItem><Globe size={10} /> {s.user_language}</MetaItem>}
                  {s.page_url && <MetaItem>Pagina: {s.page_url}</MetaItem>}
                  {s.referrer && <MetaItem>Referrer: {s.referrer}</MetaItem>}
                  <MetaItem>Sessie: {s.session_id?.slice(0, 16)}...</MetaItem>
                  <MetaItem>Start: {formatFullTime(s.session_created)}</MetaItem>
                </SessionMeta>
                {messages[s.session_id] && (
                  <MessagesWrap>
                    {messages[s.session_id].map((msg, i) => (
                      <div key={i}>
                        <MsgRow $user={msg.role === 'user'}>
                          <MsgIcon $user={msg.role === 'user'}>
                            {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                          </MsgIcon>
                          <MsgBubble $user={msg.role === 'user'}>{msg.content}</MsgBubble>
                        </MsgRow>
                        <MsgTime $user={msg.role === 'user'}>{formatFullTime(msg.created_at)}</MsgTime>
                      </div>
                    ))}
                  </MessagesWrap>
                )}
              </>
            )}
          </Card>
        );
      })}
    </>
  );
}
