'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useNavigate } from '../hooks';
import styled from 'styled-components';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { useAuth } from './useAuth';

const BackLink = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #64748B;
  font-size: 14px;
  background: none;
  border: none;
  cursor: pointer;
  margin-bottom: 1rem;
  &:hover { color: #0F172A; }
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 1.5rem;
`;

const FormWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  @media (max-width: 1024px) { grid-template-columns: 1fr; }
`;

const Form = styled.form`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
`;

const PreviewPanel = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  overflow-y: auto;
  max-height: calc(100vh - 160px);
  position: sticky;
  top: 2rem;
`;

const PreviewTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 14px;
  font-weight: 600;
  color: #64748B;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #E2E8F0;
`;

const PreviewContent = styled.div`
  font-size: 16px;
  color: #334155;
  line-height: 1.8;
  h1, h2, h3 { color: #0F172A; margin: 1.5rem 0 0.75rem; }
  h1 { font-size: 28px; }
  h2 { font-size: 22px; }
  h3 { font-size: 18px; }
  p { margin-bottom: 1rem; }
  ul, ol { margin: 0.5rem 0 1rem 1.5rem; }
  li { margin-bottom: 0.4rem; }
  img { max-width: 100%; border-radius: 8px; }
  a { color: #3B82F6; }
  blockquote { border-left: 3px solid #3B82F6; padding-left: 1rem; color: #64748B; margin: 1rem 0; }
`;

const Field = styled.div`
  margin-bottom: 1.25rem;
`;

const Label = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  margin-bottom: 0.4rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.6rem 0.875rem;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  &:focus { border-color: #3B82F6; }
  box-sizing: border-box;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.6rem 0.875rem;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  resize: vertical;
  font-family: ${p => p.mono ? 'monospace' : 'inherit'};
  min-height: ${p => p.rows ? p.rows * 24 : 120}px;
  &:focus { border-color: #3B82F6; }
  box-sizing: border-box;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Checkbox = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 14px;
  color: #475569;
  cursor: pointer;
  input { width: 16px; height: 16px; }
`;

const SaveBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.5rem;
  background: linear-gradient(135deg, #3B82F6, #10B981);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  &:hover { opacity: 0.9; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

const HelpText = styled.p`
  font-size: 12px;
  color: #94A3B8;
  margin-top: 0.25rem;
`;

const SectionTitle = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: #0F172A;
  margin: 1.25rem 0 0.75rem;
  padding-top: 1.25rem;
  border-top: 1px solid #E2E8F0;
`;

const emptyForm = {
  slug: '', title: '', meta_description: '', meta_keywords: '',
  excerpt: '', content_html: '', featured_image: '', author: 'Optivaize',
  published: false, published_at: '',
};

export default function AdminBlogForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { authFetch } = useAuth();
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit) {
      authFetch(`/api/admin/blogs/${id}`).then(r => r.json()).then(blog => {
        setForm({
          ...blog,
          published_at: blog.published_at ? blog.published_at.slice(0, 16) : '',
        });
      });
    }
  }, [id, isEdit, authFetch]);

  const set = (key) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm(f => ({ ...f, [key]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = isEdit ? `/api/admin/blogs/${id}` : '/api/admin/blogs';
      const method = isEdit ? 'PUT' : 'POST';
      await authFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          published_at: form.published_at || null,
        }),
      });
      navigate('/admin/blogs');
    } catch (err) {
      alert('Fout bij opslaan: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleUpload = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const fd = new FormData();
      fd.append('file', file);
      const res = await authFetch('/api/admin/upload', { method: 'POST', body: fd });
      const data = await res.json();
      setForm(f => ({ ...f, featured_image: data.url }));
    };
    input.click();
  };

  return (
    <>
      <BackLink onClick={() => navigate('/admin/blogs')}><ArrowLeft size={16} /> Terug naar blogs</BackLink>
      <Title>{isEdit ? 'Blog bewerken' : 'Nieuwe blog'}</Title>
      <FormWrap>
        <Form onSubmit={handleSubmit}>
          <Field>
            <Label>Titel</Label>
            <Input value={form.title} onChange={set('title')} required />
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input value={form.slug} onChange={set('slug')} placeholder="mijn-blog-post" required />
          </Field>

          <SectionTitle>SEO</SectionTitle>
          <Field>
            <Label>Meta beschrijving</Label>
            <Textarea value={form.meta_description} onChange={set('meta_description')} rows={3} />
            <HelpText>Wordt getoond in zoekresultaten (max 160 tekens)</HelpText>
          </Field>
          <Field>
            <Label>Meta keywords</Label>
            <Input value={form.meta_keywords} onChange={set('meta_keywords')} placeholder="ai, automatisering, blog" />
          </Field>
          <Field>
            <Label>Excerpt</Label>
            <Textarea value={form.excerpt} onChange={set('excerpt')} rows={3} />
            <HelpText>Korte samenvatting voor de blog listing pagina</HelpText>
          </Field>

          <SectionTitle>Content (HTML)</SectionTitle>
          <Field>
            <Label>HTML Content</Label>
            <Textarea mono value={form.content_html} onChange={set('content_html')} rows={20} />
            <HelpText>Plak hier je HTML content. Dit wordt direct gerenderd op de blogpagina.</HelpText>
          </Field>

          <SectionTitle>Media</SectionTitle>
          <Field>
            <Label>Featured image URL</Label>
            <Row>
              <Input value={form.featured_image} onChange={set('featured_image')} style={{ flex: 1 }} />
              <SaveBtn type="button" onClick={handleUpload} style={{ padding: '0.5rem 1rem' }}>Upload</SaveBtn>
            </Row>
          </Field>

          <SectionTitle>Publicatie</SectionTitle>
          <Row>
            <Field>
              <Checkbox>
                <input type="checkbox" checked={form.published} onChange={set('published')} />
                Gepubliceerd
              </Checkbox>
            </Field>
            <Field style={{ flex: 1 }}>
              <Label>Auteur</Label>
              <Input value={form.author} onChange={set('author')} />
            </Field>
          </Row>
          <Field>
            <Label>Publicatiedatum</Label>
            <Input type="datetime-local" value={form.published_at} onChange={set('published_at')} />
          </Field>

          <SaveBtn type="submit" disabled={saving}>
            <Save size={16} /> {saving ? 'Opslaan...' : 'Opslaan'}
          </SaveBtn>
        </Form>

        <PreviewPanel>
          <PreviewTitle><Eye size={16} /> HTML Preview</PreviewTitle>
          {form.featured_image && (
            <img src={form.featured_image} alt="" style={{ width: '100%', borderRadius: 12, marginBottom: '1rem' }} />
          )}
          {form.title && <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>{form.title}</h1>}
          <PreviewContent dangerouslySetInnerHTML={{ __html: form.content_html || '<p style="color:#94A3B8">HTML preview verschijnt hier...</p>' }} />
        </PreviewPanel>
      </FormWrap>
    </>
  );
}
