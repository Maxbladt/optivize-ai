'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useAuth } from './useAuth';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: 700;
  color: #0F172A;
`;

const AddBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.25rem;
  background: linear-gradient(135deg, #3B82F6, #10B981);
  color: white;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  &:hover { opacity: 0.9; }
`;

const Table = styled.table`
  width: 100%;
  background: white;
  border-radius: 12px;
  border-collapse: collapse;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
`;

const Th = styled.th`
  text-align: left;
  padding: 0.875rem 1.25rem;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748B;
  background: #F8FAFC;
  border-bottom: 1px solid #E2E8F0;
`;

const Td = styled.td`
  padding: 0.875rem 1.25rem;
  font-size: 14px;
  color: #334155;
  border-bottom: 1px solid #F1F5F9;
`;

const Badge = styled.span`
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  background: ${p => p.active ? '#DCFCE7' : '#FEE2E2'};
  color: ${p => p.active ? '#16A34A' : '#DC2626'};
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconBtn = styled(Link)`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748B;
  transition: all 0.15s;
  &:hover { background: #F1F5F9; color: #0F172A; }
`;

const DeleteBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748B;
  background: none;
  border: none;
  cursor: pointer;
  &:hover { background: #FEE2E2; color: #DC2626; }
`;

const Empty = styled.p`
  text-align: center;
  padding: 3rem;
  color: #94A3B8;
  font-size: 15px;
`;

export default function AdminBlogsList() {
  const { authFetch } = useAuth();
  const [blogs, setBlogs] = useState([]);

  const loadBlogs = async () => {
    const res = await authFetch('/api/admin/blogs');
    setBlogs(await res.json());
  };

  useEffect(() => { loadBlogs(); }, []);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Weet je zeker dat je "${title}" wilt verwijderen?`)) return;
    await authFetch(`/api/admin/blogs/${id}`, { method: 'DELETE' });
    loadBlogs();
  };

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('nl-NL') : '-';

  return (
    <>
      <Header>
        <Title>Blogs</Title>
        <AddBtn href="/admin/blogs/new"><Plus size={16} /> Nieuwe blog</AddBtn>
      </Header>
      {blogs.length === 0 ? (
        <Empty>Nog geen blogs. Maak je eerste blog aan.</Empty>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>Titel</Th>
              <Th>Slug</Th>
              <Th>Auteur</Th>
              <Th>Status</Th>
              <Th>Datum</Th>
              <Th></Th>
            </tr>
          </thead>
          <tbody>
            {blogs.map(b => (
              <tr key={b.id}>
                <Td style={{ fontWeight: 600 }}>{b.title}</Td>
                <Td>{b.slug}</Td>
                <Td>{b.author}</Td>
                <Td><Badge active={b.published}>{b.published ? 'Gepubliceerd' : 'Concept'}</Badge></Td>
                <Td>{formatDate(b.published_at)}</Td>
                <Td>
                  <Actions>
                    <IconBtn href={`/admin/blogs/${b.id}/edit`}><Edit2 size={15} /></IconBtn>
                    <DeleteBtn onClick={() => handleDelete(b.id, b.title)}><Trash2 size={15} /></DeleteBtn>
                  </Actions>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}
