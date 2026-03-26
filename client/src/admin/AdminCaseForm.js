'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useNavigate } from '../hooks';
import styled from 'styled-components';
import { ArrowLeft, Save } from 'lucide-react';
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

const Form = styled.form`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const Field = styled.div`
  ${p => p.full && 'grid-column: 1 / -1;'}
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
  min-height: ${p => p.rows ? p.rows * 24 : 120}px;
  resize: vertical;
  font-family: inherit;
  &:focus { border-color: #3B82F6; }
  box-sizing: border-box;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
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
  margin-top: 1.5rem;
  &:hover { opacity: 0.9; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #0F172A;
  margin: 1.5rem 0 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid #E2E8F0;
  grid-column: 1 / -1;
`;

const HelpText = styled.p`
  font-size: 12px;
  color: #94A3B8;
  margin-top: 0.25rem;
`;

const emptyForm = {
  slug: '', company: '',
  title_nl: '', title_en: '',
  preview_nl: '', preview_en: '',
  description_nl: '', description_en: '',
  logo: '', image: '', partner_logos: '',
  published: true, sort_order: 0,
};

export default function AdminCaseForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { authFetch } = useAuth();
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit) {
      authFetch(`/api/admin/cases`).then(r => r.json()).then(cases => {
        const found = cases.find(c => c.id === parseInt(id));
        if (found) {
          setForm({
            ...found,
            partner_logos: (found.partner_logos || []).join(', '),
          });
        }
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
      const partnerLogosArr = form.partner_logos
        ? form.partner_logos.split(',').map(s => s.trim()).filter(Boolean)
        : [];
      const body = {
        ...form,
        sort_order: parseInt(form.sort_order) || 0,
        results_nl: [],
        results_en: [],
        detailed_results_nl: [],
        detailed_results_en: [],
        partner_logos: partnerLogosArr,
      };
      const url = isEdit ? `/api/admin/cases/${id}` : '/api/admin/cases';
      const method = isEdit ? 'PUT' : 'POST';
      await authFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      navigate('/admin/cases');
    } catch (err) {
      alert('Fout bij opslaan: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleUpload = async (field) => {
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
      setForm(f => ({ ...f, [field]: data.url }));
    };
    input.click();
  };

  return (
    <>
      <BackLink onClick={() => navigate('/admin/cases')}><ArrowLeft size={16} /> Terug naar cases</BackLink>
      <Title>{isEdit ? 'Case bewerken' : 'Nieuwe case'}</Title>
      <Form onSubmit={handleSubmit}>
        <Grid>
          <Field>
            <Label>Slug</Label>
            <Input value={form.slug} onChange={set('slug')} placeholder="fonteyn" required />
          </Field>
          <Field>
            <Label>Bedrijf</Label>
            <Input value={form.company} onChange={set('company')} placeholder="Fonteyn" required />
          </Field>

          <SectionTitle>Titels</SectionTitle>
          <Field>
            <Label>Titel (NL)</Label>
            <Input value={form.title_nl} onChange={set('title_nl')} required />
          </Field>
          <Field>
            <Label>Titel (EN)</Label>
            <Input value={form.title_en} onChange={set('title_en')} required />
          </Field>

          <SectionTitle>Preview</SectionTitle>
          <Field>
            <Label>Preview (NL)</Label>
            <Textarea value={form.preview_nl} onChange={set('preview_nl')} rows={4} />
          </Field>
          <Field>
            <Label>Preview (EN)</Label>
            <Textarea value={form.preview_en} onChange={set('preview_en')} rows={4} />
          </Field>

          <SectionTitle>Beschrijving (HTML ondersteund)</SectionTitle>
          <Field>
            <Label>Beschrijving (NL)</Label>
            <Textarea value={form.description_nl} onChange={set('description_nl')} rows={10} />
            <HelpText>Je kunt hier platte tekst of HTML gebruiken</HelpText>
          </Field>
          <Field>
            <Label>Beschrijving (EN)</Label>
            <Textarea value={form.description_en} onChange={set('description_en')} rows={10} />
          </Field>

          <SectionTitle>Media</SectionTitle>
          <Field>
            <Label>Logo URL</Label>
            <Row>
              <Input value={form.logo} onChange={set('logo')} style={{ flex: 1 }} />
              <SaveBtn type="button" onClick={() => handleUpload('logo')} style={{ marginTop: 0, padding: '0.5rem 1rem' }}>Upload</SaveBtn>
            </Row>
          </Field>
          <Field>
            <Label>Afbeelding URL</Label>
            <Row>
              <Input value={form.image} onChange={set('image')} style={{ flex: 1 }} />
              <SaveBtn type="button" onClick={() => handleUpload('image')} style={{ marginTop: 0, padding: '0.5rem 1rem' }}>Upload</SaveBtn>
            </Row>
          </Field>
          <Field full>
            <Label>Partner logo's (komma-gescheiden URLs)</Label>
            <Input value={form.partner_logos} onChange={set('partner_logos')} placeholder="/uploads/logo1.png, /uploads/logo2.png" />
            <HelpText>Scheid meerdere URLs met een komma</HelpText>
          </Field>

          <SectionTitle>Publicatie</SectionTitle>
          <Field>
            <Checkbox>
              <input type="checkbox" checked={form.published} onChange={set('published')} />
              Gepubliceerd
            </Checkbox>
          </Field>
          <Field>
            <Label>Volgorde</Label>
            <Input type="number" value={form.sort_order} onChange={set('sort_order')} />
          </Field>
        </Grid>

        <SaveBtn type="submit" disabled={saving}>
          <Save size={16} /> {saving ? 'Opslaan...' : 'Opslaan'}
        </SaveBtn>
      </Form>
    </>
  );
}
