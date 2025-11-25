import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  gap: 24px;
`;

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 5px solid rgba(45, 124, 212, 0.1);
  border-top-color: #2D7CD4;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const DotsContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  animation: ${bounce} 1.4s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
`;

const LoadingText = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #2D7CD4;
  font-family: 'Inter', sans-serif;
`;

const ProgressBarContainer = styled.div`
  width: 300px;
  height: 8px;
  background: rgba(45, 124, 212, 0.1);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  background: linear-gradient(
    90deg,
    #667eea 0%,
    #764ba2 50%,
    #667eea 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 2s linear infinite;
  width: ${props => props.progress || 0}%;
  transition: width 0.3s ease;
  border-radius: 4px;
`;

const Tips = styled.div`
  margin-top: 20px;
  padding: 16px 24px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 12px;
  max-width: 400px;
  text-align: center;
  font-size: 14px;
  color: #5C7185;
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
`;

const tips = [
  '💡 提示：使用循环可以让代码更简洁！',
  '🎯 小技巧：仔细阅读关卡目标很重要！',
  '⚡ 快捷键：Ctrl+Enter 快速运行代码',
  '🌟 挑战自己：尝试用最少的代码完成关卡',
  '🔥 坚持就是胜利：编程需要耐心和练习',
  '🎮 记得收集宝石：可以获得额外奖励',
  '📚 不懂就问：查看提示可以帮助你理解',
  '🚀 Python很有趣：你正在学习世界上最流行的语言'
];

export const LoadingAnimation = ({ message = '正在加载...', showProgress = false, progress = 0 }) => {
  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <Container>
      <Spinner />
      <LoadingText>{message}</LoadingText>
      {showProgress && (
        <ProgressBarContainer>
          <ProgressBarFill progress={progress} />
        </ProgressBarContainer>
      )}
      <DotsContainer>
        <Dot delay={0} />
        <Dot delay={0.2} />
        <Dot delay={0.4} />
      </DotsContainer>
      <Tips>{randomTip}</Tips>
    </Container>
  );
};
