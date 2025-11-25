import React, { useEffect, useState } from 'react';
import {
  NotificationContainer,
  NotificationCard,
  Icon,
  Content,
  Title,
  Description,
  Points,
  ProgressBar,
  CloseButton
} from './styled';

export const AchievementNotification = ({ achievement, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 入场动画
    setTimeout(() => setIsVisible(true), 100);
    
    // 进度条动画
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // 自动关闭
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onClose]);

  if (!achievement) return null;

  return (
    <NotificationContainer>
      <NotificationCard isVisible={isVisible}>
        <CloseButton onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}>
          ✕
        </CloseButton>
        <Icon>{achievement.icon}</Icon>
        <Content>
          <Title>成就解锁！</Title>
          <Description>{achievement.title}</Description>
          <Points>+{achievement.points} 分</Points>
        </Content>
        <ProgressBar progress={progress} />
      </NotificationCard>
    </NotificationContainer>
  );
};
