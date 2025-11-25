// 成就系统
export const ACHIEVEMENTS = {
  FIRST_STEP: {
    id: 'first_step',
    title: '🎉 首次出击',
    description: '完成第一个关卡',
    icon: '🚀',
    condition: (stats) => stats.completedLevels >= 1,
    points: 10
  },
  SPEED_DEMON: {
    id: 'speed_demon',
    title: '⚡ 速度恶魔',
    description: '在30秒内完成一个关卡',
    icon: '⚡',
    condition: (stats) => stats.fastestTime && stats.fastestTime < 30,
    points: 20
  },
  CODE_MASTER: {
    id: 'code_master',
    title: '👨‍💻 代码大师',
    description: '用最少代码完成关卡（少于5行）',
    icon: '🎯',
    condition: (stats) => stats.minCodeLines && stats.minCodeLines < 5,
    points: 25
  },
  PERFECT_RUN: {
    id: 'perfect_run',
    title: '💎 完美通关',
    description: '完成关卡并获得所有宝石',
    icon: '💎',
    condition: (stats) => stats.perfectRuns > 0,
    points: 30
  },
  PERSISTENT: {
    id: 'persistent',
    title: '💪 坚持不懈',
    description: '完成10个关卡',
    icon: '💪',
    condition: (stats) => stats.completedLevels >= 10,
    points: 50
  },
  CHAMPION: {
    id: 'champion',
    title: '🏆 编程冠军',
    description: '完成所有关卡',
    icon: '👑',
    condition: (stats) => stats.completedLevels >= 23,
    points: 100
  },
  COMBO_MASTER: {
    id: 'combo_master',
    title: '🔥 连击大师',
    description: '连续完成5个关卡不失败',
    icon: '🔥',
    condition: (stats) => stats.currentStreak >= 5,
    points: 40
  },
  NO_HINTS: {
    id: 'no_hints',
    title: '🧠 独立思考',
    description: '不看提示完成关卡',
    icon: '🧠',
    condition: (stats) => stats.levelsWithoutHints > 0,
    points: 35
  }
};

export class AchievementManager {
  constructor() {
    this.achievements = { ...ACHIEVEMENTS };
    this.unlockedAchievements = this.loadUnlocked();
    this.playerStats = this.loadStats();
  }

  loadUnlocked() {
    const saved = localStorage.getItem('unlockedAchievements');
    return saved ? JSON.parse(saved) : [];
  }

  loadStats() {
    const saved = localStorage.getItem('playerStats');
    return saved ? JSON.parse(saved) : {
      completedLevels: 0,
      fastestTime: null,
      minCodeLines: null,
      perfectRuns: 0,
      currentStreak: 0,
      levelsWithoutHints: 0,
      totalPlayTime: 0,
      attempts: 0
    };
  }

  saveUnlocked() {
    localStorage.setItem('unlockedAchievements', JSON.stringify(this.unlockedAchievements));
  }

  saveStats() {
    localStorage.setItem('playerStats', JSON.stringify(this.playerStats));
  }

  updateStats(newStats) {
    this.playerStats = { ...this.playerStats, ...newStats };
    this.saveStats();
    return this.checkNewAchievements();
  }

  checkNewAchievements() {
    const newAchievements = [];
    
    Object.values(this.achievements).forEach(achievement => {
      if (!this.unlockedAchievements.includes(achievement.id)) {
        if (achievement.condition(this.playerStats)) {
          this.unlockedAchievements.push(achievement.id);
          newAchievements.push(achievement);
        }
      }
    });

    if (newAchievements.length > 0) {
      this.saveUnlocked();
    }

    return newAchievements;
  }

  getUnlockedAchievements() {
    return this.unlockedAchievements.map(id => 
      Object.values(this.achievements).find(a => a.id === id)
    ).filter(Boolean);
  }

  getTotalPoints() {
    return this.getUnlockedAchievements().reduce((sum, a) => sum + a.points, 0);
  }

  getProgress() {
    const total = Object.keys(this.achievements).length;
    const unlocked = this.unlockedAchievements.length;
    return {
      unlocked,
      total,
      percentage: Math.round((unlocked / total) * 100)
    };
  }
}

export const achievementManager = new AchievementManager();
