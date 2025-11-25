import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translate(var(--tx), var(--ty)) rotate(var(--rotate));
    opacity: 0;
  }
`;

const Particle = styled.div`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: ${props => props.color};
  border-radius: ${props => props.shape === 'circle' ? '50%' : '0'};
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  animation: ${float} ${props => props.duration}s ease-out forwards;
  pointer-events: none;
  z-index: 1000;
  box-shadow: 0 0 10px ${props => props.color};
  
  --tx: ${props => props.vx}px;
  --ty: ${props => props.vy}px;
  --rotate: ${props => props.rotation}deg;
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
`;

export const ParticleEffect = ({ x, y, count = 20, colors = ['#FFD700', '#FFA500', '#FF6B6B'], onComplete }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: x - 5,
      y: y - 5,
      vx: (Math.random() - 0.5) * 200,
      vy: (Math.random() - 0.5) * 200 - 50,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 0.5 + 0.5,
      rotation: Math.random() * 720 - 360,
      shape: Math.random() > 0.5 ? 'circle' : 'square'
    }));

    setParticles(newParticles);

    const timer = setTimeout(() => {
      setParticles([]);
      if (onComplete) onComplete();
    }, 1000);

    return () => clearTimeout(timer);
  }, [x, y, count, colors, onComplete]);

  return (
    <Container>
      {particles.map(particle => (
        <Particle key={particle.id} {...particle} />
      ))}
    </Container>
  );
};

// 预设效果
export const GemCollectEffect = ({ x, y, onComplete }) => (
  <ParticleEffect 
    x={x} 
    y={y} 
    count={15} 
    colors={['#FFD700', '#FFA500', '#FFED4E', '#FFB347']}
    onComplete={onComplete}
  />
);

export const VictoryEffect = ({ x, y, onComplete }) => (
  <ParticleEffect 
    x={x} 
    y={y} 
    count={30} 
    colors={['#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B']}
    onComplete={onComplete}
  />
);

export const DefeatEffect = ({ x, y, onComplete }) => (
  <ParticleEffect 
    x={x} 
    y={y} 
    count={20} 
    colors={['#F44336', '#E91E63', '#9C27B0', '#673AB7']}
    onComplete={onComplete}
  />
);
