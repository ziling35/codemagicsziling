import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const bounceIn = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
`;

const fireAnimation = keyframes`
  0%, 100% {
    text-shadow: 0 0 10px #ff6b00, 0 0 20px #ff6b00, 0 0 30px #ff6b00;
  }
  50% {
    text-shadow: 0 0 20px #ff8800, 0 0 30px #ff8800, 0 0 40px #ff8800;
  }
`;

const Container = styled.div`
  position: fixed;
  top: 120px;
  right: 30px;
  z-index: 100;
  display: ${props => props.show ? 'flex' : 'none'};
  flex-direction: column;
  align-items: flex-end;
  animation: ${bounceIn} 0.3s ease-out;
  pointer-events: none;

  @media (max-width: 768px) {
    top: 80px;
    right: 15px;
  }
`;

const ComboNumber = styled.div`
  font-size: ${props => Math.min(80 + props.combo * 2, 120)}px;
  font-weight: 900;
  color: ${props => {
    if (props.combo >= 10) return '#ff0000';
    if (props.combo >= 5) return '#ff6b00';
    return '#FFD700';
  }};
  text-shadow: ${props => {
    if (props.combo >= 10) return '0 0 20px #ff0000, 0 0 40px #ff0000';
    if (props.combo >= 5) return '0 0 15px #ff6b00, 0 0 30px #ff6b00';
    return '0 0 10px #FFD700, 0 0 20px #FFD700';
  }};
  animation: ${props => props.combo >= 5 ? pulse : 'none'} 0.5s ease-in-out infinite,
             ${props => props.combo >= 10 ? fireAnimation : 'none'} 1s ease-in-out infinite;
  font-family: 'Impact', 'Arial Black', sans-serif;
  -webkit-text-stroke: 2px rgba(0, 0, 0, 0.3);
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5));

  @media (max-width: 768px) {
    font-size: ${props => Math.min(50 + props.combo, 80)}px;
  }
`;

const ComboText = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  margin-top: -10px;
  font-family: 'Arial', sans-serif;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const ComboMessage = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #FFD700;
  margin-top: 8px;
  font-family: 'Arial', sans-serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  animation: ${pulse} 0.5s ease-in-out;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const getComboMessage = (combo) => {
  if (combo >= 15) return '🔥 无法阻挡！';
  if (combo >= 10) return '🔥 狂暴模式！';
  if (combo >= 7) return '⚡ 超级连击！';
  if (combo >= 5) return '💪 太棒了！';
  if (combo >= 3) return '✨ 继续保持！';
  return '';
};

export const ComboCounter = ({ combo, show }) => {
  const [displayCombo, setDisplayCombo] = useState(combo);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (combo > displayCombo) {
      setDisplayCombo(combo);
      setMessage(getComboMessage(combo));
      
      const timer = setTimeout(() => setMessage(''), 2000);
      return () => clearTimeout(timer);
    } else if (combo < displayCombo) {
      setDisplayCombo(combo);
      setMessage('');
    }
  }, [combo, displayCombo]);

  if (!show || displayCombo < 2) return null;

  return (
    <Container show={show}>
      <ComboNumber combo={displayCombo}>{displayCombo}×</ComboNumber>
      <ComboText>COMBO</ComboText>
      {message && <ComboMessage>{message}</ComboMessage>}
    </Container>
  );
};
