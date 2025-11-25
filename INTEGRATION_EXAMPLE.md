# 🔧 集成示例 - 如何在现有代码中使用新功能

本文档展示如何将所有新功能集成到你现有的 CodeMagics 项目中。

---

## 📋 目录

1. [Level.js 完整集成](#leveljs-完整集成)
2. [MainPage.js 完整集成](#mainpagejs-完整集成)
3. [App.js 全局配置](#appjs-全局配置)
4. [自定义配置](#自定义配置)

---

## 🎮 Level.js 完整集成

以下是在 `Level.js` 中集成所有新功能的完整示例：

```javascript
// frontend/src/components/Level/Level.js

// ============ 新增导入 ============
import { achievementManager } from '../../utils/achievementSystem';
import { challengeManager } from '../../utils/challengeSystem';
import { keyboardManager } from '../../utils/keyboardShortcuts';
import { AchievementNotification } from '../AchievementNotification/AchievementNotification';
import { ComboCounter } from '../ComboCounter/ComboCounter';
import { CountdownTimer } from '../CountdownTimer/CountdownTimer';
import { CelebrationAnimation } from '../CelebrationAnimation/CelebrationAnimation';
import { GemCollectEffect, VictoryEffect } from '../ParticleEffect/ParticleEffect';
import { HintSystem } from '../HintSystem/HintSystem';
import { ShortcutsHelp } from '../ShortcutsHelp/ShortcutsHelp';
import { Tutorial, defaultTutorialSteps } from '../Tutorial/Tutorial';

export const Level = () => {
  const { gameId, id } = useParams();
  const navigate = useNavigate();
  
  // ============ 现有状态 ============
  const [game, setGame] = useState(null);
  const [levelData, setLevelData] = useRefState(null);
  const [code, setCode] = useRefState(getInitialCodeFromStorage(gameId, id, 'python'));
  // ... 其他现有状态
  
  // ============ 新增状态 ============
  const [achievements, setAchievements] = useState([]);
  const [levelStartTime, setLevelStartTime] = useState(null);
  const [usedHints, setUsedHints] = useState(false);
  const [combo, setCombo] = useState(0);
  const [celebrate, setCelebrate] = useState(false);
  const [particleEffects, setParticleEffects] = useState([]);
  const [activeChallenge, setActiveChallenge] = useState(null);

  // ============ 关卡初始化 ============
  useEffect(() => {
    // 记录开始时间
    setLevelStartTime(Date.now());
    setUsedHints(false);
    setCombo(0);
    
    // 检查激活的挑战
    const activeChallenges = challengeManager.activeChallenges;
    if (activeChallenges.includes('time_limit_easy')) {
      setActiveChallenge('time_limit_easy');
    }
    
    // 注册快捷键
    registerKeyboardShortcuts();
    
    return () => {
      // 清理快捷键
      keyboardManager.disable();
    };
  }, [id]);

  // ============ 快捷键注册 ============
  const registerKeyboardShortcuts = () => {
    keyboardManager.register('RUN_CODE', startGame);
    keyboardManager.register('STOP_CODE', stopGame);
    keyboardManager.register('TOGGLE_GUIDE', () => setIsGuideOpen(prev => !prev));
    keyboardManager.register('RESET_LEVEL', resetData);
    keyboardManager.enable();
  };

  // ============ 宝石收集处理 ============
  const handleGemCollected = (gem) => {
    // 增加连击
    setCombo(prev => prev + 1);
    
    // 显示粒子效果
    const gemElement = document.querySelector(`[data-gem="${gem.x}-${gem.y}"]`);
    if (gemElement) {
      const rect = gemElement.getBoundingClientRect();
      const effect = {
        id: `gem-${Date.now()}`,
        component: (
          <GemCollectEffect
            x={rect.left + rect.width / 2}
            y={rect.top + rect.height / 2}
            onComplete={() => removeParticleEffect(`gem-${Date.now()}`)}
          />
        )
      };
      setParticleEffects(prev => [...prev, effect]);
    }
  };

  const removeParticleEffect = (id) => {
    setParticleEffects(prev => prev.filter(effect => effect.id !== id));
  };

  // ============ 关卡完成处理 ============
  const handleLevelComplete = async () => {
    // 计算统计数据
    const completionTime = levelStartTime ? (Date.now() - levelStartTime) / 1000 : 0;
    const codeLines = code.current.split('\n').filter(line => line.trim()).length;
    const allGemsCollected = goals.filter(g => g.type === 'gems').every(g => g.completed);
    
    // 显示庆祝动画
    setCelebrate(true);
    
    // 显示胜利粒子效果
    const heroElement = document.querySelector('.hero');
    if (heroElement) {
      const rect = heroElement.getBoundingClientRect();
      const effect = {
        id: `victory-${Date.now()}`,
        component: (
          <VictoryEffect
            x={rect.left + rect.width / 2}
            y={rect.top + rect.height / 2}
            onComplete={() => removeParticleEffect(`victory-${Date.now()}`)}
          />
        )
      };
      setParticleEffects(prev => [...prev, effect]);
    }
    
    // 等待动画
    await delay(1500);
    
    // 检查成就
    const newAchievements = achievementManager.updateStats({
      completedLevels: parseInt(id, 10),
      fastestTime: completionTime,
      minCodeLines: codeLines,
      perfectRuns: allGemsCollected ? 
        achievementManager.playerStats.perfectRuns + 1 : 
        achievementManager.playerStats.perfectRuns,
      currentStreak: achievementManager.playerStats.currentStreak + 1,
      levelsWithoutHints: !usedHints ? 
        achievementManager.playerStats.levelsWithoutHints + 1 : 
        achievementManager.playerStats.levelsWithoutHints,
    });

    // 显示成就通知
    if (newAchievements.length > 0) {
      setAchievements(newAchievements);
    }

    // 检查挑战完成
    challengeManager.activeChallenges.forEach(challengeId => {
      const completed = challengeManager.checkChallenge(challengeId, {
        levelId: parseInt(id, 10),
        completionTime,
        codeLines,
        usedHints,
        allGoalsCompleted: allGemsCollected
      });

      if (completed) {
        const challenge = challengeManager.CHALLENGES[challengeId];
        // 显示挑战完成提示
        console.log(`挑战完成：${challenge.name} +${challenge.reward}分`);
      }
    });

    // 打开分数面板
    setIsScoreOpen(true);
  };

  // ============ 提示使用处理 ============
  const handleHintUsed = (level) => {
    setUsedHints(true);
    // 如果使用了提示，重置连击
    if (level > 0) {
      setCombo(0);
    }
  };

  // ============ 挑战超时处理 ============
  const handleChallengeTimeout = () => {
    alert('时间到！挑战失败');
    stopGame();
    setActiveChallenge(null);
  };

  // ============ 渲染 ============
  return (
    <Wrapper>
      {/* 现有游戏内容 */}
      <MenuButton>
        <Button frontColor="#BD3A0F" shadowColor="#8C2B0B" onClick={openMenu}>
          菜单
        </Button>
      </MenuButton>

      <Goals
        forceOpen={gameExecution.forceShowGoals}
        goals={initialLevelData.current.goals}
        goalsResult={gameExecution.levelResult.current?.goals || []}
      />

      {/* ============ 新增：时间挑战倒计时 ============ */}
      {activeChallenge === 'time_limit_easy' && (
        <CountdownTimer
          initialTime={120}
          onComplete={handleChallengeTimeout}
          warningTime={30}
          dangerTime={10}
          label="挑战时间"
        />
      )}

      {/* ============ 新增：连击计数器 ============ */}
      <ComboCounter combo={combo} show={combo > 1} />

      {/* ============ 新增：提示系统 ============ */}
      <HintSystem
        hints={levelHints}
        onHintUsed={handleHintUsed}
      />

      {/* 现有游戏区域 */}
      <MainWrapper>
        {/* 地图和角色渲染 */}
      </MainWrapper>

      {/* 现有控制器和编辑器 */}
      <Controls {...controlProps} />
      <CodeEditor {...editorProps} />

      {/* ============ 新增：快捷键帮助 ============ */}
      <ShortcutsHelp showToggleButton={true} />

      {/* 现有弹窗 */}
      {isGuideOpen && <LevelGuide {...guideProps} />}
      {isScoreOpen && <LevelScore {...scoreProps} />}

      {/* ============ 新增：成就通知 ============ */}
      {achievements.map((achievement, index) => (
        <AchievementNotification
          key={`${achievement.id}-${index}`}
          achievement={achievement}
          onClose={() => setAchievements(prev => 
            prev.filter((_, i) => i !== index)
          )}
        />
      ))}

      {/* ============ 新增：庆祝动画 ============ */}
      <CelebrationAnimation
        show={celebrate}
        message="🎉 太棒了！"
        subMessage="关卡完成！"
        duration={5000}
      />

      {/* ============ 新增：粒子效果 ============ */}
      {particleEffects.map(effect => (
        <React.Fragment key={effect.id}>
          {effect.component}
        </React.Fragment>
      ))}

      {/* ============ 新增：新手引导（仅第一次） ============ */}
      {id === '1' && (
        <Tutorial
          steps={defaultTutorialSteps}
          onComplete={() => console.log('教程完成')}
          storageKey={`tutorial_level_${id}`}
        />
      )}
    </Wrapper>
  );
};
```

---

## 🏠 MainPage.js 完整集成

```javascript
// frontend/src/components/MainPage/MainPage.js

import React, { useMemo, useState, useEffect } from 'react';
import { AchievementsPanel } from '../AchievementsPanel/AchievementsPanel';
import { DailyChallenges } from '../DailyChallenges/DailyChallenges';
import { achievementManager } from '../../utils/achievementSystem';
import { challengeManager } from '../../utils/challengeSystem';

export const MainPage = () => {
  // 现有状态
  const { completedLevelsCount, ... } = useGameData();
  
  // ============ 新增状态 ============
  const [showAchievements, setShowAchievements] = useState(false);
  const [showDailyChallenges, setShowDailyChallenges] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [achievementProgress, setAchievementProgress] = useState({ unlocked: 0, total: 0 });

  // ============ 加载数据 ============
  useEffect(() => {
    // 更新成就数据
    setTotalPoints(achievementManager.getTotalPoints());
    setAchievementProgress(achievementManager.getProgress());

    // 检查每日挑战
    const dailyProgress = challengeManager.getDailyProgress();
    
    // 如果有未完成的每日挑战，显示提示
    if (dailyProgress.completed < dailyProgress.total) {
      // 可以显示一个小提示
      console.log(`今日挑战：${dailyProgress.completed}/${dailyProgress.total}`);
    }
  }, [completedLevelsCount]);

  return (
    <Layout isGamePage>
      <Container>
        {/* ============ 模块卡片（已修改） ============ */}
        <ModuleCard
          completedLevelsCount={completedLevelsCount}
          progressPercentage={progressPercentage}
          onAchievementsClick={() => setShowAchievements(true)}
        />

        {/* 游戏地图 */}
        <GameMap {...mapProps} />

        {/* ============ 新增：每日挑战入口 ============ */}
        <FloatingButton 
          onClick={() => setShowDailyChallenges(true)}
          style={{ bottom: '30px', left: '30px' }}
        >
          📅 每日挑战
        </FloatingButton>
      </Container>

      {/* ============ 新增：成就面板 ============ */}
      {showAchievements && (
        <AchievementsPanel onClose={() => setShowAchievements(false)} />
      )}

      {/* ============ 新增：每日挑战面板 ============ */}
      {showDailyChallenges && (
        <DailyChallenges
          show={showDailyChallenges}
          onClose={() => setShowDailyChallenges(false)}
        />
      )}

      {/* 现有登录弹窗 */}
      {showLoginModal && <LoginModal {...loginProps} />}
    </Layout>
  );
};

// ============ 新增：浮动按钮样式 ============
const FloatingButton = styled.button`
  position: fixed;
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
  transition: all 0.3s;
  z-index: 100;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
  }
`;
```

---

## 🌐 App.js 全局配置

```javascript
// frontend/src/App.js

import React, { useEffect } from 'react';
import { Router } from './Router';
import { UserProvider } from './contexts/UserContext';
import { achievementManager } from './utils/achievementSystem';
import { challengeManager } from './utils/challengeSystem';
import { LoadingAnimation } from './components/LoadingAnimation/LoadingAnimation';

function App() {
  const [isInitialized, setIsInitialized] = React.useState(false);

  useEffect(() => {
    // ============ 初始化系统 ============
    const initialize = async () => {
      try {
        // 加载成就数据
        achievementManager.loadUnlocked();
        achievementManager.loadStats();
        
        // 加载挑战数据
        challengeManager.loadDaily();
        
        // 检查是否需要生成新的每日挑战
        const dailyProgress = challengeManager.getDailyProgress();
        console.log('每日挑战进度：', dailyProgress);
        
        setIsInitialized(true);
      } catch (error) {
        console.error('初始化失败：', error);
        setIsInitialized(true); // 即使失败也继续
      }
    };

    initialize();
  }, []);

  if (!isInitialized) {
    return <LoadingAnimation message="正在初始化游戏..." />;
  }

  return (
    <UserProvider>
      <Router />
    </UserProvider>
  );
}

export default App;
```

---

## ⚙️ 自定义配置

### 创建配置文件

```javascript
// frontend/src/config/gameConfig.js

export const GAME_CONFIG = {
  // 成就配置
  achievements: {
    enabled: true,
    showNotifications: true,
    notificationDuration: 5000, // 5秒
  },

  // 挑战配置
  challenges: {
    enabled: true,
    dailyChallenges: true,
    timeChallenges: true,
  },

  // 视觉效果配置
  effects: {
    particles: {
      enabled: true,
      count: 20, // 粒子数量
      maxCount: 50, // 最大粒子数
    },
    celebrations: {
      enabled: true,
      duration: 5000,
    },
    combo: {
      enabled: true,
      minCombo: 2, // 显示连击的最小值
    },
  },

  // UI配置
  ui: {
    shortcuts: {
      enabled: true,
      showHelp: true,
    },
    hints: {
      enabled: true,
      levels: 3, // 提示级别数
    },
    tutorial: {
      enabled: true,
      showOnFirstVisit: true,
    },
  },

  // 性能配置
  performance: {
    reduceAnimations: false, // 低性能设备可设为true
    particleLimit: 100, // 同时显示的粒子上限
  },
};

// 使用示例
import { GAME_CONFIG } from './config/gameConfig';

if (GAME_CONFIG.achievements.enabled) {
  // 启用成就系统
}
```

### 环境变量配置

```env
# frontend/.env.development

# 成就系统
REACT_APP_ENABLE_ACHIEVEMENTS=true
REACT_APP_ACHIEVEMENT_NOTIFICATION_DURATION=5000

# 挑战系统
REACT_APP_ENABLE_CHALLENGES=true
REACT_APP_DAILY_CHALLENGES=true

# 视觉效果
REACT_APP_ENABLE_PARTICLES=true
REACT_APP_PARTICLE_COUNT=20
REACT_APP_ENABLE_CELEBRATIONS=true

# 性能
REACT_APP_REDUCE_ANIMATIONS=false
```

---

## 🎨 样式自定义

### 修改主题颜色

```javascript
// frontend/src/theme/colors.js

export const THEME_COLORS = {
  primary: {
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    light: '#667eea',
    dark: '#764ba2',
  },
  achievement: {
    gold: '#FFD700',
    silver: '#C0C0C0',
    bronze: '#CD7F32',
  },
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
};

// 在组件中使用
import { THEME_COLORS } from '../../theme/colors';

const StyledComponent = styled.div`
  background: ${THEME_COLORS.primary.gradient};
`;
```

---

## 📊 数据持久化

### 自定义存储键

```javascript
// frontend/src/config/storageKeys.js

export const STORAGE_KEYS = {
  // 成就相关
  ACHIEVEMENTS: 'codemagics_achievements',
  ACHIEVEMENT_STATS: 'codemagics_achievement_stats',
  
  // 挑战相关
  CHALLENGES: 'codemagics_challenges',
  DAILY_CHALLENGES: 'codemagics_daily_challenges',
  
  // 教程相关
  TUTORIAL_COMPLETED: 'codemagics_tutorial_completed',
  
  // 用户偏好
  PREFERENCES: 'codemagics_preferences',
};
```

---

## 🔍 调试工具

### 添加调试面板

```javascript
// frontend/src/components/DebugPanel/DebugPanel.js

export const DebugPanel = () => {
  const [show, setShow] = useState(false);

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <>
      <button 
        onClick={() => setShow(!show)}
        style={{ position: 'fixed', top: 10, right: 10, zIndex: 99999 }}
      >
        🐛 Debug
      </button>

      {show && (
        <div style={{
          position: 'fixed',
          top: 50,
          right: 10,
          background: 'white',
          padding: 20,
          borderRadius: 8,
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          zIndex: 99999
        }}>
          <h3>调试工具</h3>
          
          <button onClick={() => {
            achievementManager.updateStats({ completedLevels: 10 });
            console.log('解锁所有成就');
          }}>
            解锁所有成就
          </button>
          
          <button onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}>
            清除所有数据
          </button>
          
          <button onClick={() => {
            console.log('成就数据：', achievementManager.getUnlockedAchievements());
            console.log('挑战数据：', challengeManager.getDailyProgress());
          }}>
            打印数据
          </button>
        </div>
      )}
    </>
  );
};
```

---

## 📝 最佳实践总结

### 1. 性能优化
```javascript
// 使用 React.memo
export const MyComponent = React.memo(({ props }) => {
  return <div>{props.value}</div>;
});

// 使用 useMemo 缓存计算
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

// 使用 useCallback 缓存函数
const handleClick = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

### 2. 错误处理
```javascript
try {
  const achievements = achievementManager.updateStats(stats);
  setAchievements(achievements);
} catch (error) {
  console.error('成就系统错误：', error);
  // 不影响主流程
}
```

### 3. 清理副作用
```javascript
useEffect(() => {
  // 订阅
  const timer = setInterval(() => {}, 1000);
  keyboardManager.enable();

  return () => {
    // 清理
    clearInterval(timer);
    keyboardManager.disable();
  };
}, []);
```

---

## ✅ 集成检查清单

- [ ] 导入所有必要的组件和工具
- [ ] 添加必要的状态变量
- [ ] 在适当的时机记录统计数据
- [ ] 处理成就解锁通知
- [ ] 集成视觉效果
- [ ] 注册快捷键
- [ ] 添加新手引导（可选）
- [ ] 测试所有功能
- [ ] 检查性能
- [ ] 清理控制台警告

---

## 🎉 完成！

按照以上示例集成后，你的 CodeMagics 将拥有：
- ✅ 完整的成就系统
- ✅ 挑战模式
- ✅ 炫酷的视觉效果
- ✅ 智能提示系统
- ✅ 快捷键支持
- ✅ 新手引导

**现在就开始集成，让你的编程学习游戏更有趣！** 🚀
