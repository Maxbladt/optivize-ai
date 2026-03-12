import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Lock } from 'lucide-react';
import { useAuth } from './useAuth';

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0F172A;
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
`;

const IconWrap = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #3B82F6, #10B981);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 700;
  text-align: center;
  color: #0F172A;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  text-align: center;
  color: #64748B;
  font-size: 14px;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s;
  &:focus { border-color: #3B82F6; }
`;

const Button = styled.button`
  padding: 0.75rem;
  background: linear-gradient(135deg, #3B82F6, #10B981);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
  &:hover { opacity: 0.9; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

const Error = styled.p`
  color: #EF4444;
  font-size: 14px;
  text-align: center;
`;

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(password);
      navigate('/admin');
    } catch (err) {
      setError('Onjuist wachtwoord. Probeer het opnieuw.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <Card>
        <IconWrap><Lock size={22} /></IconWrap>
        <Title>Admin Panel</Title>
        <Subtitle>Voer het wachtwoord in om door te gaan</Subtitle>
        <Form onSubmit={handleSubmit}>
          <Input
            type="password"
            placeholder="Wachtwoord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          {error && <Error>{error}</Error>}
          <Button type="submit" disabled={loading || !password}>
            {loading ? 'Bezig...' : 'Inloggen'}
          </Button>
        </Form>
      </Card>
    </Page>
  );
}
