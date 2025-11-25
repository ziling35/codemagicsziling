import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
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

const Container = styled.div`
  position: fixed;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  max-width: 300px;

  @media (max-width: 768px) {
    right: 15px;
    max-width: 250px;
  }
`;

const HintButton = styled.button`
  background: linear-gradient(135deg, #FFB347 0%, #FFCC33 100%);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 28px;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(255, 179, 71, 0.4);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${pulse} 2s ease-in-out infinite;
  position: relative;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(255, 179, 71, 0.6);
  }

  &:active {
    transform: scale(0.95);
  }

  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 50%;
    border: 2px solid rgba(255, 179, 71, 0.3);
    animation: ${pulse} 2s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 24px;
  }
`;

const HintPanel = styled.div`
  position: absolute;
  right: 70px;
  top: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  min-width: 280px;
  max-width: 350px;
  animation: ${slideIn} 0.3s ease-out;

  &::before {
    content: '';
    position: absolute;
    right: -10px;
    top: 20px;
    width: 0;
    height: 0;
    border-left: 10px solid #667eea;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
  }

  @media (max-width: 768px) {
    right: 60px;
    min-width: 200px;
    max-width: 250px;
    padding: 16px;
  }
`;

const HintHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const HintTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
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

const HintContent = styled.div`
  color: #fff;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const HintList = styled.ul`
  margin: 0;
  padding-left: 20px;
  
  li {
    margin-bottom: 8px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const HintCost = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding: 8px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;

  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

const HintLevelContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const HintLevelButton = styled.button`
  flex: 1;
  padding: 8px;
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  border: 2px solid ${props => props.active ? '#fff' : 'transparent'};
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export const HintSystem = ({ hints = [], onHintUsed }) => {
  const [showPanel, setShowPanel] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);

  const hintLevels = [
    { 
      id: 0, 
      label: '💡 轻提示', 
      cost: 0,
      hints: hints.filter(h => h.level === 'light')
    },
    { 
      id: 1, 
      label: '🔍 详细提示', 
      cost: 5,
      hints: hints.filter(h => h.level === 'detailed')
    },
    { 
      id: 2, 
      label: '📖 完整解答', 
      cost: 20,
      hints: hints.filter(h => h.level === 'solution')
    }
  ];

  const currentHints = hintLevels[hintLevel].hints;

  const handleHintClick = () => {
    setShowPanel(!showPanel);
    if (!showPanel && onHintUsed) {
      onHintUsed(hintLevel);
    }
  };

  const handleLevelChange = (level) => {
    setHintLevel(level);
    if (onHintUsed) {
      onHintUsed(level);
    }
  };

  return (
    <Container>
      <HintButton onClick={handleHintClick}>
        💡
      </HintButton>

      {showPanel && (
        <HintPanel>
          <HintHeader>
            <HintTitle>
              💡 智能提示
            </HintTitle>
            <CloseButton onClick={() => setShowPanel(false)}>✕</CloseButton>
          </HintHeader>

          <HintLevelContainer>
            {hintLevels.map(level => (
              <HintLevelButton
                key={level.id}
                active={hintLevel === level.id}
                onClick={() => handleLevelChange(level.id)}
              >
                {level.label}
              </HintLevelButton>
            ))}
          </HintLevelContainer>

          <HintContent>
            {currentHints.length > 0 ? (
              <HintList>
                {currentHints.map((hint, index) => (
                  <li key={index}>{hint.text}</li>
                ))}
              </HintList>
            ) : (
              <div style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.6)' }}>
                暂无此级别提示
              </div>
            )}
          </HintContent>

          {hintLevels[hintLevel].cost > 0 && (
            <HintCost>
              💎 查看此提示将消耗 {hintLevels[hintLevel].cost} 分
            </HintCost>
          )}
        </HintPanel>
      )}
    </Container>
  );
};

// 默认提示示例
export const defaultHints = [
  {
    level: 'light',
    text: '思考一下需要重复执行什么操作'
  },
  {
    level: 'light',
    text: '仔细观察角色和目标的位置关系'
  },
  {
    level: 'detailed',
    text: '尝试使用 while 循环来重复执行移动命令'
  },
  {
    level: 'detailed',
    text: '你可以先让角色向右移动，然后再向下移动'
  },
  {
    level: 'solution',
    text: 'while True: hero.move_right()'
  }
];
