import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

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
    box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.7);
  }
  50% {
    box-shadow: 0 0 0 20px rgba(102, 126, 234, 0);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 99999;
  animation: ${fadeIn} 0.3s ease-out;
`;

const Spotlight = styled.div`
  position: fixed;
  border: 3px solid #667eea;
  border-radius: 12px;
  pointer-events: none;
  z-index: 100000;
  animation: ${pulse} 2s ease-out infinite;
  transition: all 0.3s ease;
  
  ${props => props.coords && `
    top: ${props.coords.top}px;
    left: ${props.coords.left}px;
    width: ${props.coords.width}px;
    height: ${props.coords.height}px;
  `}
`;

const Tooltip = styled.div`
  position: fixed;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 24px;
  max-width: 400px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
  z-index: 100001;
  animation: ${slideIn} 0.3s ease-out;

  ${props => props.position && `
    top: ${props.position.top}px;
    left: ${props.position.left}px;
  `}

  &::before {
    content: '';
    position: absolute;
    ${props => {
      switch(props.arrow) {
        case 'top':
          return `
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: 10px solid #667eea;
          `;
        case 'bottom':
          return `
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-top: 10px solid #764ba2;
          `;
        case 'left':
          return `
            right: 100%;
            top: 50%;
            transform: translateY(-50%);
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            border-right: 10px solid #667eea;
          `;
        case 'right':
          return `
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            border-left: 10px solid #764ba2;
          `;
        default:
          return '';
      }
    }}
  }

  @media (max-width: 768px) {
    max-width: 90%;
    padding: 20px;
  }
`;

const TooltipHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const StepIcon = styled.div`
  font-size: 32px;
`;

const StepNumber = styled.div`
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
`;

const TooltipContent = styled.div`
  color: #fff;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;

  h3 {
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 12px 0;
  }

  p {
    margin: 0 0 12px 0;
  }

  ul {
    margin: 0;
    padding-left: 20px;
  }

  li {
    margin-bottom: 8px;
  }

  @media (max-width: 768px) {
    font-size: 14px;

    h3 {
      font-size: 18px;
    }
  }
`;

const TooltipActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  ${props => props.primary ? `
    background: #fff;
    color: #667eea;

    &:hover {
      background: rgba(255, 255, 255, 0.9);
      transform: translateY(-2px);
    }
  ` : `
    background: rgba(255, 255, 255, 0.2);
    color: #fff;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ProgressDots = styled.div`
  display: flex;
  gap: 8px;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.active ? '#fff' : 'rgba(255, 255, 255, 0.3)'};
  transition: all 0.2s;
`;

const SkipButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.2s;

  &:hover {
    color: #fff;
  }
`;

export const Tutorial = ({ steps, onComplete, storageKey = 'tutorial_completed' }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [spotlight, setSpotlight] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState(null);

  useEffect(() => {
    const completed = localStorage.getItem(storageKey);
    if (!completed && steps && steps.length > 0) {
      setIsActive(true);
      updatePositions();
    }
  }, [steps, storageKey]);

  useEffect(() => {
    if (isActive) {
      updatePositions();
      window.addEventListener('resize', updatePositions);
      return () => window.removeEventListener('resize', updatePositions);
    }
  }, [currentStep, isActive]);

  const updatePositions = () => {
    if (!steps || currentStep >= steps.length) return;

    const step = steps[currentStep];
    if (step.target) {
      const element = document.querySelector(step.target);
      if (element) {
        const rect = element.getBoundingClientRect();
        setSpotlight({
          top: rect.top - 10,
          left: rect.left - 10,
          width: rect.width + 20,
          height: rect.height + 20
        });

        // 计算tooltip位置
        const tooltipPos = calculateTooltipPosition(rect, step.position || 'bottom');
        setTooltipPosition(tooltipPos);
      }
    } else {
      setSpotlight(null);
      setTooltipPosition({
        top: window.innerHeight / 2 - 200,
        left: window.innerWidth / 2 - 200
      });
    }
  };

  const calculateTooltipPosition = (rect, position) => {
    const margin = 20;
    const tooltipWidth = 400;
    const tooltipHeight = 200; // 估计值

    switch(position) {
      case 'top':
        return {
          top: rect.top - tooltipHeight - margin,
          left: rect.left + rect.width / 2 - tooltipWidth / 2
        };
      case 'bottom':
        return {
          top: rect.bottom + margin,
          left: rect.left + rect.width / 2 - tooltipWidth / 2
        };
      case 'left':
        return {
          top: rect.top + rect.height / 2 - tooltipHeight / 2,
          left: rect.left - tooltipWidth - margin
        };
      case 'right':
        return {
          top: rect.top + rect.height / 2 - tooltipHeight / 2,
          left: rect.right + margin
        };
      default:
        return {
          top: rect.bottom + margin,
          left: rect.left + rect.width / 2 - tooltipWidth / 2
        };
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    localStorage.setItem(storageKey, 'true');
    setIsActive(false);
    if (onComplete) onComplete();
  };

  if (!isActive || !steps || steps.length === 0) return null;

  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  return (
    <>
      <Overlay />
      {spotlight && <Spotlight coords={spotlight} />}
      {tooltipPosition && (
        <Tooltip position={tooltipPosition} arrow={step.position || 'bottom'}>
          <TooltipHeader>
            <StepIcon>{step.icon || '📚'}</StepIcon>
            <StepNumber>
              步骤 {currentStep + 1} / {steps.length}
            </StepNumber>
          </TooltipHeader>

          <TooltipContent>
            <h3>{step.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: step.content }} />
          </TooltipContent>

          <TooltipActions>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Button onClick={handlePrev} disabled={currentStep === 0}>
                上一步
              </Button>
              <ProgressDots>
                {steps.map((_, index) => (
                  <Dot key={index} active={index === currentStep} />
                ))}
              </ProgressDots>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <SkipButton onClick={handleSkip}>跳过教程</SkipButton>
              <Button primary onClick={handleNext}>
                {isLastStep ? '完成' : '下一步'}
              </Button>
            </div>
          </TooltipActions>
        </Tooltip>
      )}
    </>
  );
};

// 默认教程步骤示例
export const defaultTutorialSteps = [
  {
    icon: '👋',
    title: '欢迎来到 CodeMagics！',
    content: '<p>这是一个有趣的编程学习游戏。让我带你快速了解如何开始吧！</p>',
    position: 'center'
  },
  {
    icon: '🎯',
    title: '关卡目标',
    content: '<p>每个关卡都有特定的目标。完成所有必需目标即可通关！</p><ul><li>✅ 必需目标 - 必须完成</li><li>⭐ 可选目标 - 额外挑战</li></ul>',
    target: '.goals-container',
    position: 'left'
  },
  {
    icon: '💻',
    title: '代码编辑器',
    content: '<p>在这里编写Python代码来控制角色。按 <strong>Ctrl+Enter</strong> 运行代码！</p>',
    target: '.code-editor',
    position: 'left'
  },
  {
    icon: '🎮',
    title: '控制按钮',
    content: '<p>使用这些按钮来：</p><ul><li>▶️ 运行代码</li><li>⏸️ 暂停</li><li>⏹️ 停止</li></ul>',
    target: '.controls',
    position: 'top'
  },
  {
    icon: '💡',
    title: '需要帮助？',
    content: '<p>遇到困难？点击提示按钮获取帮助。但记住，独立完成会获得额外成就哦！</p>',
    target: '.hint-button',
    position: 'left'
  },
  {
    icon: '🏆',
    title: '成就系统',
    content: '<p>完成挑战解锁成就，收集积分，成为编程大师！</p><p>现在，开始你的编程之旅吧！💪</p>',
    position: 'center'
  }
];
