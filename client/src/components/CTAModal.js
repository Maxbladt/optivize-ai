import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Building, Mail, Users, CheckCircle } from 'lucide-react';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(10px);
  z-index: 10001;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const ModalContainer = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    padding: 2rem;
    margin: 1rem;
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #64748B;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.3s ease;

  &:hover {
    background: #F1F5F9;
  }
`;

const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const ModalTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 0.5rem;
`;

const ModalSubtitle = styled.p`
  font-size: 16px;
  color: #64748B;
  line-height: 1.5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  position: relative;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #64748B;
  z-index: 1;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #E2E8F0;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #94A3B8;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #E2E8F0;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const CheckboxItem = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background: #F8FAFC;
  }
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  border: 2px solid #E2E8F0;
  border-radius: 4px;
  cursor: pointer;
  accent-color: #3B82F6;
`;

const CheckboxLabel = styled.span`
  font-size: 14px;
  color: #1E293B;
  font-weight: 500;
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(135deg, #3B82F6, #10B981);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  position: relative;
  overflow: hidden;
  min-height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const LoadingSpinner = styled(motion.div)`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const SuccessMessage = styled(motion.div)`
  text-align: center;
  padding: 2rem;
`;

const SuccessIcon = styled(motion.div)`
  color: #10B981;
  margin: 0 auto 1rem;
`;

const SuccessTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 0.5rem;
`;

const SuccessText = styled.p`
  font-size: 16px;
  color: #64748B;
  line-height: 1.5;
`;

const Confetti = styled(motion.div)`
  position: absolute;
  width: 10px;
  height: 10px;
  background: #3B82F6;
  border-radius: 50%;
`;

function CTAModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    companySize: '',
    interests: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          onClose();
          setIsSuccess(false);
          setFormData({
            name: '',
            company: '',
            email: '',
            companySize: '',
            interests: []
          });
        }, 3000);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: { opacity: 0, scale: 0.8, y: 50 }
  };

  const confettiVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (custom) => ({
      opacity: 1,
      scale: 1,
      x: Math.cos(custom * 60) * 100,
      y: Math.sin(custom * 60) * 100,
      transition: {
        duration: 2,
        ease: "easeOut"
      }
    })
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContainer
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} />
            </CloseButton>

            {isSuccess ? (
              <SuccessMessage>
                {/* Confetti animation */}
                {[...Array(12)].map((_, i) => (
                  <Confetti
                    key={i}
                    custom={i}
                    variants={confettiVariants}
                    initial="hidden"
                    animate="visible"
                    style={{
                      top: '50%',
                      left: '50%',
                      background: i % 2 === 0 ? '#3B82F6' : '#10B981'
                    }}
                  />
                ))}

                <SuccessIcon
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <CheckCircle size={60} />
                </SuccessIcon>
                <SuccessTitle>Thank You!</SuccessTitle>
                <SuccessText>
                  Your AI Strategy Guide will be sent to your email shortly. 
                  Get ready to transform your business!
                </SuccessText>
              </SuccessMessage>
            ) : (
              <>
                <ModalHeader>
                  <ModalTitle>Unlock Your AI Potential</ModalTitle>
                  <ModalSubtitle>
                    Get our comprehensive guide to AI implementation and efficiency tips
                  </ModalSubtitle>
                </ModalHeader>

                <Form onSubmit={handleSubmit}>
                  <InputGroup>
                    <InputIcon>
                      <User size={20} />
                    </InputIcon>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>

                  <InputGroup>
                    <InputIcon>
                      <Building size={20} />
                    </InputIcon>
                    <Input
                      type="text"
                      name="company"
                      placeholder="Company Name"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>

                  <InputGroup>
                    <InputIcon>
                      <Mail size={20} />
                    </InputIcon>
                    <Input
                      type="email"
                      name="email"
                      placeholder="business@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>

                  <InputGroup>
                    <InputIcon>
                      <Users size={20} />
                    </InputIcon>
                    <Select
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select company size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="200+">200+ employees</option>
                    </Select>
                  </InputGroup>

                  <div>
                    <h4 style={{ marginBottom: '1rem', fontSize: '16px', fontWeight: '600', color: '#1E293B' }}>
                      Areas of Interest:
                    </h4>
                    <CheckboxGroup>
                      {[
                        'Process Automation',
                        'Customer Service AI',
                        'Content Generation',
                        'SEO Optimization'
                      ].map((interest) => (
                        <CheckboxItem key={interest}>
                          <Checkbox
                            type="checkbox"
                            checked={formData.interests.includes(interest)}
                            onChange={() => handleCheckboxChange(interest)}
                          />
                          <CheckboxLabel>{interest}</CheckboxLabel>
                        </CheckboxItem>
                      ))}
                    </CheckboxGroup>
                  </div>

                  <SubmitButton
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <LoadingSpinner />
                        Sending...
                      </>
                    ) : (
                      'Send Me The Free Guide'
                    )}
                  </SubmitButton>
                </Form>
              </>
            )}
          </ModalContainer>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
}

export default CTAModal;
