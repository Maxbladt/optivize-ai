import React, { useRef, useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

const FormSection = styled.section`
  padding: 5rem 0;
  background: #ffffff;
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 42px;
  font-weight: 700;
  text-align: center;
  color: #0F172A;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const GradientText = styled.span`
  background: linear-gradient(135deg, #3B82F6, #10B981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 18px;
  color: #64748B;
  text-align: center;
  max-width: 550px;
  margin: 0 auto 3rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 2rem;
  }
`;

const IframeWrapper = styled(motion.div)`
  width: 100%;
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid #E2E8F0;
`;

function ContactForm() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const navigate = useNavigate();
  const iframeRef = useRef(null);
  const iframeLoadCount = useRef(0);

  const handleIframeLoad = useCallback(() => {
    iframeLoadCount.current += 1;
    if (iframeLoadCount.current > 1) {
      navigate('/bedankt');
    }
  }, [navigate]);

  return (
    <FormSection id="formulier" ref={ref}>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          Neem <GradientText>Contact</GradientText> Op
        </SectionTitle>

        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
        >
          Vul het formulier in en we nemen zo snel mogelijk contact met u op
        </SectionSubtitle>

        <IframeWrapper
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <iframe
            ref={iframeRef}
            title="Contact Formulier"
            src="https://meeting.teamleader.eu/embed/form/optivaize/formulier-1/"
            style={{
              width: '100%',
              height: '700px',
              border: 'none',
              display: 'block',
              background: '#ffffff'
            }}
            onLoad={handleIframeLoad}
          />
        </IframeWrapper>
      </Container>
    </FormSection>
  );
}

export default ContactForm;
