import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const warning = keyframes`
  0%, 100% {
    background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%);
  }
  50% {
    background: linear-gradient(135deg, #FF4757 0%, #FF6348 100%);
  }
`;

const Container = styled.div`
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 12px;
  background: ${props => {
    if (props.warning) return 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)';
    if (props.danger) return 'linear-gradient(135deg, #FF4757 0%, #FF6348 100%)';
    return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  }};
  padding: 12px 24px;
  border-radius: 50px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  animation: ${props => props.danger ? warning : 'none'} 1s ease-in-out infinite;

  @media (max-width: 768px) {
    top: 20px;
    padding: 10px 20px;
  }
`;

const Icon = styled.div`
  font-size: 24px;
  animation: ${props => props.warning ? pulse : 'none'} 0.5s ease-in-out infinite;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const TimeDisplay = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
  font-family: 'Courier New', monospace;
`;

const TimeNumber = styled.span`
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  min-width: ${props => props.large ? '60px' : '30px'};
  text-align: center;

  @media (max-width: 768px) {
    font-size: 24px;
    min-width: ${props => props.large ? '45px' : '25px'};
  }
`;

const TimeUnit = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(0, 0, 0, 0.2);
  overflow: hidden;
  border-radius: 0 0 50px 50px;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${props => props.progress}%;
  background: linear-gradient(90deg, #FFD700, #FFA500);
  transition: width 0.3s linear;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
`;

const Label = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

export const CountdownTimer = ({ 
  initialTime, 
  onComplete, 
  onWarning, 
  warningTime = 30,
  dangerTime = 10,
  showProgress = true,
  label = '剩余时间'
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isWarning, setIsWarning] = useState(false);
  const [isDanger, setIsDanger] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onComplete) onComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1;

        if (newTime <= dangerTime && !isDanger) {
          setIsDanger(true);
        } else if (newTime <= warningTime && !isWarning) {
          setIsWarning(true);
          if (onWarning) onWarning();
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onComplete, onWarning, warningTime, dangerTime, isWarning, isDanger]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return { mins, secs };
  };

  const { mins, secs } = formatTime(timeLeft);
  const progress = ((initialTime - timeLeft) / initialTime) * 100;

  const getIcon = () => {
    if (isDanger) return '🔥';
    if (isWarning) return '⚠️';
    return '⏱️';
  };

  return (
    <Container warning={isWarning} danger={isDanger}>
      <Icon warning={isWarning || isDanger}>{getIcon()}</Icon>
      
      <div>
        {label && <Label>{label}</Label>}
        <TimeDisplay>
          {mins > 0 && (
            <>
              <TimeNumber large>{mins.toString().padStart(2, '0')}</TimeNumber>
              <TimeUnit>分</TimeUnit>
            </>
          )}
          <TimeNumber>{secs.toString().padStart(2, '0')}</TimeNumber>
          <TimeUnit>秒</TimeUnit>
        </TimeDisplay>
      </div>

      {showProgress && (
        <ProgressBar>
          <ProgressFill progress={progress} />
        </ProgressBar>
      )}
    </Container>
  );
};

// 简化版倒计时（仅显示秒数）
export const SimpleCountdown = ({ seconds, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onComplete) onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, onComplete]);

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: '120px',
      fontWeight: '900',
      color: '#fff',
      textShadow: '0 0 20px rgba(0,0,0,0.5), 0 0 40px rgba(102,126,234,0.8)',
      zIndex: 9999,
      animation: `${pulse} 0.5s ease-in-out`,
      fontFamily: 'Impact, sans-serif'
    }}>
      {timeLeft}
    </div>
  );
};
