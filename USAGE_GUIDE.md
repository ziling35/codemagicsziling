# CodeMagics 功能使用指南

本指南详细说明如何使用新添加的功能和组件，让你的编程学习游戏更有趣、更吸引人。

---

## 📚 目录

1. [成就系统](#成就系统)
2. [挑战系统](#挑战系统)
3. [视觉效果](#视觉效果)
4. [UI组件](#ui组件)
5. [快捷键系统](#快捷键系统)
6. [新手引导](#新手引导)
7. [集成示例](#集成示例)

---

## 🏆 成就系统

### 基本使用

```javascript
import { achievementManager } from './utils/achievementSystem';

// 在关卡完成时更新统计
const newAchievements = achievementManager.updateStats({
  completedLevels: currentLevel,
  fastestTime: completionTimeInSeconds,
  minCodeLines: codeLineCount,
  perfectRuns: allGemsCollected ? prevPerfectRuns + 1 : prevPerfectRuns,
  currentStreak: prevStreak + 1,
  levelsWithoutHints: !usedHints ? prevWithoutHints + 1 : prevWithoutHints
});

// 显示新解锁的成就
if (newAchievements.length > 0) {
  newAchievements.forEach(achievement => {
    showAchievementNotification(achievement);
  });
}
```

### 显示成就通知

```javascript
import { AchievementNotification } from './components/AchievementNotification';

function YourComponent() {
  const [achievements, setAchievements] = useState([]);

  return (
    <>
      {achievements.map((achievement, index) => (
        <AchievementNotification
          key={`${achievement.id}-${index}`}
          achievement={achievement}
          onClose={() => setAchievements(prev => 
            prev.filter((_, i) => i !== index)
          )}
        />
      ))}
    </>
  );
}
```

### 打开成就面板

```javascript
import { AchievementsPanel } from './components/AchievementsPanel';

function GamePage() {
  const [showAchievements, setShowAchievements] = useState(false);

  return (
    <>
      <button onClick={() => setShowAchievements(true)}>
        🏆 查看成就
      </button>

      {showAchievements && (
        <AchievementsPanel onClose={() => setShowAchievements(false)} />
      )}
    </>
  );
}
```

---

## 🎯 挑战系统

### 激活挑战

```javascript
import { challengeManager, CHALLENGES } from './utils/challengeSystem';

// 玩家选择挑战
function activateChallenge(challengeId) {
  challengeManager.activateChallenge(challengeId);
  alert(`挑战已激活：${CHALLENGES[challengeId].name}`);
}

// 示例：激活时间挑战
activateChallenge('time_limit_easy');
```

### 检查挑战完成

```javascript
// 在关卡完成时检查所有激活的挑战
const activeChallenges = challengeManager.activeChallenges;

activeChallenges.forEach(challengeId => {
  const completed = challengeManager.checkChallenge(challengeId, {
    levelId: currentLevelId,
    completionTime: timeInSeconds,
    codeLines: numberOfCodeLines,
    usedHints: playerUsedHints,
    allGoalsCompleted: allGoalsAreCompleted
  });

  if (completed) {
    const challenge = CHALLENGES[challengeId];
    showReward(challenge.reward);
  }
});
```

### 每日挑战

```javascript
import { DailyChallenges } from './components/DailyChallenges';

function MainPage() {
  const [showDailyChallenges, setShowDailyChallenges] = useState(false);

  return (
    <>
      <button onClick={() => setShowDailyChallenges(true)}>
        📅 每日挑战
      </button>

      <DailyChallenges
        show={showDailyChallenges}
        onClose={() => setShowDailyChallenges(false)}
      />
    </>
  );
}
```

---

## ✨ 视觉效果

### 粒子效果

```javascript
import { 
  GemCollectEffect, 
  VictoryEffect, 
  DefeatEffect 
} from './components/ParticleEffect';

function GameLevel() {
  const [showEffect, setShowEffect] = useState(null);

  const onGemCollected = (position) => {
    setShowEffect(
      <GemCollectEffect 
        x={position.x} 
        y={position.y} 
        onComplete={() => setShowEffect(null)}
      />
    );
  };

  return (
    <>
      {/* 游戏内容 */}
      {showEffect}
    </>
  );
}
```

### 连击计数器

```javascript
import { ComboCounter } from './components/ComboCounter';

function GameLevel() {
  const [combo, setCombo] = useState(0);
  const [showCombo, setShowCombo] = useState(false);

  useEffect(() => {
    // 成功完成动作时增加连击
    setCombo(prev => prev + 1);
    setShowCombo(true);

    // 失败时重置连击
    // setCombo(0);
  }, [/* 依赖项 */]);

  return <ComboCounter combo={combo} show={showCombo} />;
}
```

### 庆祝动画

```javascript
import { CelebrationAnimation } from './components/CelebrationAnimation';

function LevelComplete() {
  const [celebrate, setCelebrate] = useState(false);

  const onLevelComplete = () => {
    setCelebrate(true);
    // 5秒后自动关闭
    setTimeout(() => setCelebrate(false), 5000);
  };

  return (
    <CelebrationAnimation
      show={celebrate}
      message="🎉 太棒了！"
      subMessage="关卡完成！"
      duration={5000}
    />
  );
}
```

### 加载动画

```javascript
import { LoadingAnimation } from './components/LoadingAnimation';

function GameLoader() {
  const [progress, setProgress] = useState(0);

  return (
    <LoadingAnimation
      message="正在加载关卡..."
      showProgress={true}
      progress={progress}
    />
  );
}
```

---

## 🎨 UI组件

### 倒计时器

```javascript
import { CountdownTimer, SimpleCountdown } from './components/CountdownTimer';

// 完整倒计时器
function TimedChallenge() {
  return (
    <CountdownTimer
      initialTime={120} // 120秒
      onComplete={() => alert('时间到！')}
      onWarning={() => console.log('快没时间了！')}
      warningTime={30}
      dangerTime={10}
      showProgress={true}
      label="挑战时间"
    />
  );
}

// 简化倒计时（关卡开始前）
function LevelStart() {
  return (
    <SimpleCountdown
      seconds={3}
      onComplete={() => startLevel()}
    />
  );
}
```

### 提示系统

```javascript
import { HintSystem, defaultHints } from './components/HintSystem';

function LevelPage() {
  const hints = [
    { level: 'light', text: '思考如何重复执行命令' },
    { level: 'detailed', text: '尝试使用 while 循环' },
    { level: 'solution', text: 'while True: hero.move_right()' }
  ];

  return (
    <HintSystem
      hints={hints}
      onHintUsed={(level) => {
        console.log(`使用了第${level}级提示`);
        markHintAsUsed();
      }}
    />
  );
}
```

---

## ⌨️ 快捷键系统

### 注册快捷键

```javascript
import { keyboardManager } from './utils/keyboardShortcuts';
import { useEffect } from 'react';

function LevelPage() {
  useEffect(() => {
    // 注册快捷键
    keyboardManager.register('RUN_CODE', () => {
      runCode();
    });

    keyboardManager.register('STOP_CODE', () => {
      stopCode();
    });

    keyboardManager.register('TOGGLE_GUIDE', () => {
      setShowGuide(prev => !prev);
    });

    // 启用快捷键
    keyboardManager.enable();

    return () => {
      // 清理
      keyboardManager.disable();
    };
  }, []);

  return (
    // 你的组件
  );
}
```

### 使用React Hook

```javascript
import { useKeyboardShortcut } from './utils/keyboardShortcuts';

function MyComponent() {
  const runCode = () => {
    console.log('运行代码');
  };

  // 自动管理快捷键
  useKeyboardShortcut('RUN_CODE', runCode, [/* 依赖项 */]);

  return <div>按 Ctrl+Enter 运行代码</div>;
}
```

### 显示快捷键帮助

```javascript
import { ShortcutsHelp } from './components/ShortcutsHelp';

function App() {
  return (
    <>
      {/* 你的应用内容 */}
      
      {/* 显示快捷键帮助按钮 */}
      <ShortcutsHelp showToggleButton={true} />
    </>
  );
}
```

---

## 📖 新手引导

### 创建教程

```javascript
import { Tutorial, defaultTutorialSteps } from './components/Tutorial';

function GamePage() {
  const customSteps = [
    {
      icon: '👋',
      title: '欢迎！',
      content: '<p>让我们开始学习编程吧！</p>',
      position: 'center'
    },
    {
      icon: '🎯',
      title: '这是目标区域',
      content: '<p>在这里查看你的任务目标</p>',
      target: '.goals-panel', // CSS选择器
      position: 'left' // 'top', 'bottom', 'left', 'right'
    },
    {
      icon: '💻',
      title: '代码编辑器',
      content: '<p>在这里编写代码</p>',
      target: '.code-editor',
      position: 'right'
    }
  ];

  return (
    <Tutorial
      steps={customSteps}
      onComplete={() => {
        console.log('教程完成！');
      }}
      storageKey="my_tutorial_completed"
    />
  );
}
```

---

## 🎮 集成示例

### 完整的关卡页面示例

```javascript
import React, { useState, useEffect } from 'react';
import { achievementManager } from './utils/achievementSystem';
import { challengeManager } from './utils/challengeSystem';
import { keyboardManager } from './utils/keyboardShortcuts';
import { AchievementNotification } from './components/AchievementNotification';
import { ComboCounter } from './components/ComboCounter';
import { CountdownTimer } from './components/CountdownTimer';
import { CelebrationAnimation } from './components/CelebrationAnimation';
import { GemCollectEffect } from './components/ParticleEffect';
import { HintSystem } from './components/HintSystem';
import { ShortcutsHelp } from './components/ShortcutsHelp';

function LevelPage({ levelId }) {
  const [achievements, setAchievements] = useState([]);
  const [combo, setCombo] = useState(0);
  const [celebrate, setCelebrate] = useState(false);
  const [particleEffect, setParticleEffect] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [usedHints, setUsedHints] = useState(false);

  useEffect(() => {
    // 关卡开始时记录时间
    setStartTime(Date.now());

    // 注册快捷键
    keyboardManager.register('RUN_CODE', handleRunCode);
    keyboardManager.register('STOP_CODE', handleStopCode);
    keyboardManager.enable();

    return () => {
      keyboardManager.disable();
    };
  }, []);

  const handleRunCode = () => {
    // 运行代码逻辑
    console.log('运行代码');
  };

  const handleStopCode = () => {
    // 停止代码逻辑
    console.log('停止代码');
  };

  const handleGemCollected = (position) => {
    // 显示粒子效果
    setParticleEffect(
      <GemCollectEffect
        x={position.x}
        y={position.y}
        onComplete={() => setParticleEffect(null)}
      />
    );

    // 增加连击
    setCombo(prev => prev + 1);
  };

  const handleLevelComplete = () => {
    const completionTime = (Date.now() - startTime) / 1000;
    const codeLines = getCodeLineCount();
    const allGemsCollected = checkAllGemsCollected();

    // 显示庆祝动画
    setCelebrate(true);

    // 检查成就
    const newAchievements = achievementManager.updateStats({
      completedLevels: levelId,
      fastestTime: completionTime,
      minCodeLines: codeLines,
      perfectRuns: allGemsCollected ? 
        achievementManager.playerStats.perfectRuns + 1 : 
        achievementManager.playerStats.perfectRuns,
      currentStreak: achievementManager.playerStats.currentStreak + 1,
      levelsWithoutHints: !usedHints ? 
        achievementManager.playerStats.levelsWithoutHints + 1 : 
        achievementManager.playerStats.levelsWithoutHints
    });

    if (newAchievements.length > 0) {
      setAchievements(newAchievements);
    }

    // 检查挑战
    challengeManager.activeChallenges.forEach(challengeId => {
      challengeManager.checkChallenge(challengeId, {
        levelId,
        completionTime,
        codeLines,
        usedHints,
        allGoalsCompleted: allGemsCollected
      });
    });
  };

  const getCodeLineCount = () => {
    // 返回代码行数
    return 5;
  };

  const checkAllGemsCollected = () => {
    // 检查是否收集了所有宝石
    return true;
  };

  return (
    <div>
      {/* 游戏内容 */}
      
      {/* 时间挑战倒计时 */}
      {challengeManager.activeChallenges.includes('time_limit_easy') && (
        <CountdownTimer
          initialTime={120}
          onComplete={() => alert('时间到！')}
          warningTime={30}
          dangerTime={10}
        />
      )}

      {/* 连击计数器 */}
      <ComboCounter combo={combo} show={combo > 1} />

      {/* 提示系统 */}
      <HintSystem
        hints={levelHints}
        onHintUsed={() => setUsedHints(true)}
      />

      {/* 快捷键帮助 */}
      <ShortcutsHelp showToggleButton={true} />

      {/* 成就通知 */}
      {achievements.map((achievement, index) => (
        <AchievementNotification
          key={`${achievement.id}-${index}`}
          achievement={achievement}
          onClose={() => setAchievements(prev => 
            prev.filter((_, i) => i !== index)
          )}
        />
      ))}

      {/* 庆祝动画 */}
      <CelebrationAnimation
        show={celebrate}
        message="🎉 太棒了！"
        subMessage="关卡完成！"
        duration={5000}
      />

      {/* 粒子效果 */}
      {particleEffect}
    </div>
  );
}

export default LevelPage;
```

---

## 💡 最佳实践

### 1. 成就解锁时机
- ✅ 在关卡完成时检查成就
- ✅ 在重要里程碑时触发
- ❌ 不要在游戏运行中频繁检查

### 2. 粒子效果使用
- ✅ 在关键事件时触发（收集宝石、完成目标）
- ✅ 保持效果短暂（0.5-2秒）
- ❌ 避免同时触发太多效果

### 3. 快捷键设计
- ✅ 使用常见的快捷键组合
- ✅ 提供视觉提示
- ❌ 避免覆盖浏览器默认快捷键

### 4. 新手引导
- ✅ 首次访问时自动显示
- ✅ 允许用户跳过
- ✅ 使用localStorage记录完成状态
- ❌ 不要强制用户完成所有步骤

### 5. 性能优化
- ✅ 使用React.memo优化组件
- ✅ 限制粒子数量
- ✅ 及时清理定时器和事件监听
- ❌ 避免在渲染循环中创建新对象

---

## 🐛 常见问题

### Q: 成就没有保存？
A: 确保浏览器支持localStorage，并且没有在隐私模式下运行。

### Q: 快捷键不工作？
A: 检查是否调用了`keyboardManager.enable()`，并确保没有其他元素捕获了键盘事件。

### Q: 粒子效果卡顿？
A: 减少粒子数量，或者在低性能设备上禁用部分效果。

### Q: 教程不显示？
A: 确保目标元素已经渲染，可以使用延迟或检查元素存在性。

---

## 📞 技术支持

如有问题或建议，请：
1. 查看代码注释
2. 参考本文档
3. 查看组件源码中的示例

---

**祝你开发顺利！让编程学习变得更有趣！🎉**
