import styled from 'styled-components';

export const Panel = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const PanelHeader = styled.div`
  padding: 24px 32px;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
`;

export const PanelTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

export const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
`;

export const PanelContent = styled.div`
  padding: 32px;
  overflow-y: auto;
  flex: 1;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.4);
    }
  }
`;

export const ProgressSection = styled.div`
  margin-bottom: 32px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(10px);
`;

export const ProgressText = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 12px;
  text-align: center;
`;

export const ProgressBar = styled.div`
  height: 16px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
`;

export const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 16px;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-4px);
  }
`;

export const StatValue = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: #ffd700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 8px;
`;

export const StatLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const AchievementsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

export const AchievementCard = styled.div`
  position: relative;
  background: ${props => props.unlocked 
    ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3))'
    : 'rgba(0, 0, 0, 0.2)'};
  padding: 20px;
  border-radius: 16px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
  border: 2px solid ${props => props.unlocked 
    ? 'rgba(255, 215, 0, 0.5)' 
    : 'rgba(255, 255, 255, 0.1)'};
  transition: all 0.3s;
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }
`;

export const AchievementIcon = styled.div`
  font-size: 48px;
  min-width: 48px;
  filter: ${props => props.unlocked ? 'none' : 'grayscale(1) opacity(0.3)'};
  transition: all 0.3s;
`;

export const AchievementInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const AchievementTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.unlocked ? '#fff' : 'rgba(255, 255, 255, 0.4)'};
  line-height: 1.2;
`;

export const AchievementDescription = styled.div`
  font-size: 14px;
  color: ${props => props.unlocked ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.3)'};
  line-height: 1.4;
`;

export const AchievementPoints = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${props => props.unlocked ? '#ffd700' : 'rgba(255, 215, 0, 0.3)'};
  margin-top: 4px;
`;

export const LockedOverlay = styled.div`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  font-size: 32px;
  opacity: 0.3;
`;
