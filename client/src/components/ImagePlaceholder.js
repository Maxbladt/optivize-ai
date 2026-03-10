import React from 'react';
import styled from 'styled-components';
import { Camera } from 'lucide-react';

const Wrapper = styled.div`
  width: ${props => props.$w || '100%'};
  height: ${props => props.$h || '400px'};
  background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
  border: 1.5px dashed #CBD5E1;
  border-radius: ${props => props.$radius || '16px'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  position: relative;
  overflow: hidden;
  cursor: default;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(45deg, #E2E8F0 25%, transparent 25%),
      linear-gradient(-45deg, #E2E8F0 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #E2E8F0 75%),
      linear-gradient(-45deg, transparent 75%, #E2E8F0 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
    opacity: 0.25;
  }
`;

const IconBox = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(59, 130, 246, 0.08);
  border: 1.5px solid rgba(59, 130, 246, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94A3B8;
  position: relative;
  z-index: 1;
`;

const DimText = styled.div`
  font-size: 11px;
  font-weight: 600;
  font-family: 'DM Mono', 'Courier New', monospace;
  color: #94A3B8;
  background: white;
  border: 1px solid #E2E8F0;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  position: relative;
  z-index: 1;
  letter-spacing: 0.04em;
`;

const LabelText = styled.p`
  font-size: 12px;
  color: #94A3B8;
  text-align: center;
  max-width: 180px;
  line-height: 1.5;
  position: relative;
  z-index: 1;
`;

function ImagePlaceholder({ label, dimensions, height, radius, style, className }) {
  return (
    <Wrapper
      $h={height}
      $radius={radius}
      style={style}
      className={className}
    >
      <IconBox>
        <Camera size={20} />
      </IconBox>
      {dimensions && <DimText>{dimensions}</DimText>}
      {label && <LabelText>{label}</LabelText>}
    </Wrapper>
  );
}

export default ImagePlaceholder;
