import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(400px);
    opacity: 0;
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

export const NotificationContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
  pointer-events: none;
`;

export const NotificationCard = styled.div`
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 20px 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 350px;
  max-width: 400px;
  animation: ${props => props.isVisible ? slideIn : slideOut} 0.3s ease-out forwards;
  pointer-events: auto;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
    animation: ${pulse} 2s ease-in-out infinite;
  }
`;

export const Icon = styled.div`
  font-size: 48px;
  min-width: 48px;
  text-align: center;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  animation: ${pulse} 1s ease-in-out infinite;
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Title = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const Description = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  line-height: 1.2;
`;

export const Points = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #ffd700;
  margin-top: 4px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

export const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  width: ${props => props.progress}%;
  background: linear-gradient(90deg, #ffd700, #ffed4e);
  transition: width 0.1s linear;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: #fff;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: background 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;
