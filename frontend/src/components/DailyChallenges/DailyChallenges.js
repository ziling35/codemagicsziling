import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { challengeManager } from '../../utils/challengeSystem';

const Container = styled.div`
  position: fixed;
  bottom: 30px;
  left: 30px;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  max-width: 350px;
  z-index: 50;
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    bottom: 20px;
    left: 20px;
    right: 20px;
    max-width: none;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const Progress = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 12px;
`;

const ProgressBar = styled.div`
  height: 8px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 16px;
  
  div {
    height: 100%;
    background: linear-gradient(90deg, #FFD700, #FFA500);
    width: ${props => props.progress}%;
    transition: width 0.3s ease;
    border-radius: 4px;
  }
`;

const ChallengeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ChallengeCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  border: 2px solid ${props => props.completed ? '#4CAF50' : 'transparent'};
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateX(4px);
  }
`;

const ChallengeIcon = styled.div`
  font-size: 32px;
  filter: ${props => props.completed ? 'none' : 'grayscale(0.5)'};
`;

const ChallengeInfo = styled.div`
  flex: 1;
`;

const ChallengeName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 4px;
`;

const ChallengeDesc = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
`;

const ChallengeReward = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #FFD700;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CompleteMark = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #4CAF50;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 16px;
`;

export const DailyChallenges = ({ show, onClose }) => {
  const [progress, setProgress] = useState(challengeManager.getDailyProgress());

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(challengeManager.getDailyProgress());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!show) return null;

  const progressPercent = (progress.completed / progress.total) * 100;

  return (
    <Container>
      <Header>
        <Title>
          📅 每日挑战
        </Title>
        <CloseButton onClick={onClose}>✕</CloseButton>
      </Header>
      
      <Progress>
        进度: {progress.completed} / {progress.total}
      </Progress>
      
      <ProgressBar progress={progressPercent}>
        <div />
      </ProgressBar>

      <ChallengeList>
        {progress.challenges.map((challenge, index) => {
          const isCompleted = progress.completed > index;
          return (
            <ChallengeCard key={challenge.id} completed={isCompleted}>
              <ChallengeIcon completed={isCompleted}>
                {challenge.icon}
              </ChallengeIcon>
              <ChallengeInfo>
                <ChallengeName>{challenge.name}</ChallengeName>
                <ChallengeDesc>{challenge.description}</ChallengeDesc>
              </ChallengeInfo>
              {isCompleted ? (
                <CompleteMark>✓</CompleteMark>
              ) : (
                <ChallengeReward>
                  +{challenge.reward} 💰
                </ChallengeReward>
              )}
            </ChallengeCard>
          );
        })}
      </ChallengeList>

      {progressPercent === 100 && (
        <div style={{
          marginTop: '16px',
          padding: '12px',
          background: 'rgba(76, 175, 80, 0.2)',
          borderRadius: '8px',
          color: '#4CAF50',
          fontSize: '14px',
          fontWeight: '600',
          textAlign: 'center'
        }}>
          🎉 今日挑战全部完成！
        </div>
      )}
    </Container>
  );
};
