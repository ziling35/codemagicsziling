import React from 'react';
import {
  ModuleCard as StyledModuleCard,
  ModuleInfo,
  ModuleTitle,
  LevelCount,
  Description,
  Tags,
  Tag,
  ModuleProgress,
  ProgressBar,
  ProgressText,
  ModuleStatus,
  ModulePreview,
  ModuleNumber,
  AchievementButton,
} from '../styled';
import module1Preview from '../../../assets/module1-preview.webp';
import { MODULE_CONFIG, UI_TEXT } from '../constants';
import { achievementManager } from '../../../utils/achievementSystem';

export const ModuleCard = ({ completedLevelsCount, progressPercentage, onAchievementsClick }) => {
  const totalPoints = achievementManager.getTotalPoints();
  const progress = achievementManager.getProgress();
  const { title, totalLevels, description, tags, mobileHiddenTagsCount } = MODULE_CONFIG;
  const {
    moduleNumber,
    statusCompleted,
    statusInProgress,
    levelsText,
    levelsCompleted,
    moreTagsText,
    altText
  } = UI_TEXT;

  return (
    <StyledModuleCard>
      <ModulePreview>
        <img 
          src={module1Preview} 
          alt={altText}
          loading="lazy"
        />
        <ModuleNumber>{moduleNumber}</ModuleNumber>
        <ModuleStatus>
          {progressPercentage === 100 ? statusCompleted : statusInProgress}
        </ModuleStatus>
      </ModulePreview>
      
      <ModuleInfo>
        <ModuleTitle>{title}</ModuleTitle>
        <LevelCount>{totalLevels} {levelsText}</LevelCount>
        
        <ModuleProgress>
          <ProgressText>
            {completedLevelsCount} / {totalLevels} {levelsCompleted}
          </ProgressText>
          <ProgressBar>
            <div 
              style={{ width: `${progressPercentage}%` }}
              role="progressbar"
              aria-valuenow={progressPercentage}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label={`模块进度：${progressPercentage}%`}
            />
          </ProgressBar>
        </ModuleProgress>

        <Description>{description}</Description>
        
        <Tags>
          {tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
          <Tag className="mobile-more-tags">
            +{mobileHiddenTagsCount} 更多
          </Tag>
        </Tags>

        {onAchievementsClick && (
          <AchievementButton onClick={onAchievementsClick}>
            🏆 成就 ({progress.unlocked}/{progress.total}) · {totalPoints} 分
          </AchievementButton>
        )}
      </ModuleInfo>
    </StyledModuleCard>
  );
}; 