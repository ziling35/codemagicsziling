import React, { useState, useEffect } from 'react';
import {
  Panel,
  PanelHeader,
  PanelTitle,
  CloseButton,
  PanelContent,
  StatsSection,
  StatCard,
  StatValue,
  StatLabel,
  AchievementsGrid,
  AchievementCard,
  AchievementIcon,
  AchievementInfo,
  AchievementTitle,
  AchievementDescription,
  AchievementPoints,
  LockedOverlay,
  ProgressSection,
  ProgressBar,
  ProgressText
} from './styled';
import { achievementManager, ACHIEVEMENTS } from '../../utils/achievementSystem';

export const AchievementsPanel = ({ onClose }) => {
  const [stats, setStats] = useState(achievementManager.playerStats);
  const [unlockedIds, setUnlockedIds] = useState(achievementManager.unlockedAchievements);
  const progress = achievementManager.getProgress();
  const totalPoints = achievementManager.getTotalPoints();

  useEffect(() => {
    // 刷新数据
    const interval = setInterval(() => {
      setStats({ ...achievementManager.playerStats });
      setUnlockedIds([...achievementManager.unlockedAchievements]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const isUnlocked = (achievementId) => unlockedIds.includes(achievementId);

  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>🏆 成就中心</PanelTitle>
        <CloseButton onClick={onClose}>✕</CloseButton>
      </PanelHeader>

      <PanelContent>
        <ProgressSection>
          <ProgressText>
            成就进度: {progress.unlocked} / {progress.total} ({progress.percentage}%)
          </ProgressText>
          <ProgressBar>
            <div style={{ 
              width: `${progress.percentage}%`, 
              height: '100%', 
              background: 'linear-gradient(90deg, #667eea, #764ba2)',
              borderRadius: '8px',
              transition: 'width 0.3s ease'
            }} />
          </ProgressBar>
        </ProgressSection>

        <StatsSection>
          <StatCard>
            <StatValue>{stats.completedLevels}</StatValue>
            <StatLabel>完成关卡</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{totalPoints}</StatValue>
            <StatLabel>总积分</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{stats.currentStreak}</StatValue>
            <StatLabel>连胜</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{stats.perfectRuns}</StatValue>
            <StatLabel>完美通关</StatLabel>
          </StatCard>
        </StatsSection>

        <AchievementsGrid>
          {Object.values(ACHIEVEMENTS).map(achievement => {
            const unlocked = isUnlocked(achievement.id);
            return (
              <AchievementCard key={achievement.id} unlocked={unlocked}>
                <AchievementIcon unlocked={unlocked}>
                  {achievement.icon}
                </AchievementIcon>
                <AchievementInfo>
                  <AchievementTitle unlocked={unlocked}>
                    {achievement.title}
                  </AchievementTitle>
                  <AchievementDescription unlocked={unlocked}>
                    {achievement.description}
                  </AchievementDescription>
                  <AchievementPoints unlocked={unlocked}>
                    {achievement.points} 分
                  </AchievementPoints>
                </AchievementInfo>
                {!unlocked && <LockedOverlay>🔒</LockedOverlay>}
              </AchievementCard>
            );
          })}
        </AchievementsGrid>
      </PanelContent>
    </Panel>
  );
};
