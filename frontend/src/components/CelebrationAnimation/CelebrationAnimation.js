import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const confettiFall = keyframes`
  0% {
    transform: translateY(-100vh) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
`;

const starBurst = keyframes`
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: scale(1.5) rotate(180deg);
    opacity: 1;
  }
  100% {
    transform: scale(1) rotate(360deg);
    opacity: 0;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  overflow: hidden;
`;

const Confetti = styled.div`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size * 1.5}px;
  background: ${props => props.color};
  top: -10%;
  left: ${props => props.left}%;
  animation: ${confettiFall} ${props => props.duration}s linear infinite;
  animation-delay: ${props => props.delay}s;
  opacity: 0.8;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
`;

const Star = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  animation: ${starBurst} 1s ease-out forwards;
  animation-delay: ${props => props.delay}s;
  
  &::before, &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => props.color};
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  }
  
  &::after {
    transform: rotate(45deg);
  }
`;

const Message = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 72px;
  font-weight: 900;
  color: #FFD700;
  text-shadow: 
    0 0 20px rgba(255, 215, 0, 0.8),
    0 0 40px rgba(255, 215, 0, 0.6),
    0 4px 8px rgba(0, 0, 0, 0.5);
  font-family: 'Impact', 'Arial Black', sans-serif;
  -webkit-text-stroke: 2px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 0.5s ease-out;
  pointer-events: none;

  @media (max-width: 768px) {
    font-size: 48px;
  }
`;

const SubMessage = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  font-family: 'Arial', sans-serif;
  animation: ${fadeIn} 0.5s ease-out 0.3s both;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const confettiColors = [
  '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1',
  '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE',
  '#85C1E2', '#F8B500'
];

export const CelebrationAnimation = ({ show, message = '🎉 太棒了！', subMessage = '关卡完成！', duration = 5000 }) => {
  const [confetti, setConfetti] = useState([]);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    if (!show) {
      setConfetti([]);
      setStars([]);
      return;
    }

    // 生成彩纸
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 10 + 5,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      duration: Math.random() * 2 + 3,
      delay: Math.random() * 2
    }));

    // 生成星星
    const newStars = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      delay: i * 0.1,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)]
    }));

    setConfetti(newConfetti);
    setStars(newStars);

    const timer = setTimeout(() => {
      setConfetti([]);
      setStars([]);
    }, duration);

    return () => clearTimeout(timer);
  }, [show, duration]);

  if (!show) return null;

  return (
    <Container>
      {confetti.map(item => (
        <Confetti key={item.id} {...item} />
      ))}
      {stars.map(item => (
        <Star key={item.id} {...item} />
      ))}
      <Message>{message}</Message>
      {subMessage && <SubMessage>{subMessage}</SubMessage>}
    </Container>
  );
};
