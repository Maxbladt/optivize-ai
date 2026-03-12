import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Briefcase, FileText, Presentation } from 'lucide-react';
import { useAuth } from './useAuth';

const Title = styled.h1`
  font-size: 26px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #64748B;
  font-size: 15px;
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const Card = styled(Link)`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  text-decoration: none;
  transition: all 0.2s;
  border: 1px solid #E2E8F0;
  &:hover { border-color: #3B82F6; box-shadow: 0 4px 20px rgba(59,130,246,0.1); transform: translateY(-2px); }
`;

const CardIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: ${p => p.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 17px;
  font-weight: 600;
  color: #0F172A;
  margin-bottom: 0.25rem;
`;

const CardCount = styled.p`
  font-size: 14px;
  color: #64748B;
`;

export default function AdminDashboard() {
  const { authFetch } = useAuth();
  const [counts, setCounts] = useState({ cases: 0, blogs: 0 });

  useEffect(() => {
    Promise.all([
      authFetch('/api/admin/cases').then(r => r.json()),
      authFetch('/api/admin/blogs').then(r => r.json()),
    ]).then(([cases, blogs]) => {
      setCounts({ cases: cases.length, blogs: blogs.length });
    }).catch(() => {});
  }, [authFetch]);

  return (
    <>
      <Title>Dashboard</Title>
      <Subtitle>Beheer je cases, blogs en presentatie</Subtitle>
      <Grid>
        <Card to="/admin/cases">
          <CardIcon bg="linear-gradient(135deg, #3B82F6, #2563EB)"><Briefcase size={20} /></CardIcon>
          <CardTitle>Cases</CardTitle>
          <CardCount>{counts.cases} cases</CardCount>
        </Card>
        <Card to="/admin/blogs">
          <CardIcon bg="linear-gradient(135deg, #10B981, #059669)"><FileText size={20} /></CardIcon>
          <CardTitle>Blogs</CardTitle>
          <CardCount>{counts.blogs} blogs</CardCount>
        </Card>
        <Card to="/admin/presentation">
          <CardIcon bg="linear-gradient(135deg, #8B5CF6, #7C3AED)"><Presentation size={20} /></CardIcon>
          <CardTitle>Presentatie</CardTitle>
          <CardCount>Bekijk de presentatie</CardCount>
        </Card>
      </Grid>
    </>
  );
}
