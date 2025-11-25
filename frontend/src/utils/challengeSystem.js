// 挑战系统
export const CHALLENGE_TYPES = {
  TIME_LIMIT: 'time_limit',
  CODE_GOLF: 'code_golf',
  NO_HINTS: 'no_hints',
  PERFECT_RUN: 'perfect_run',
  SPEED_RUN: 'speed_run'
};

export const CHALLENGES = {
  // 时间挑战
  time_limit_easy: {
    id: 'time_limit_easy',
    type: CHALLENGE_TYPES.TIME_LIMIT,
    name: '⏰ 时间挑战：新手',
    description: '在2分钟内完成关卡',
    timeLimit: 120,
    reward: 50,
    icon: '⏰'
  },
  time_limit_medium: {
    id: 'time_limit_medium',
    type: CHALLENGE_TYPES.TIME_LIMIT,
    name: '⏰ 时间挑战：进阶',
    description: '在1分钟内完成关卡',
    timeLimit: 60,
    reward: 100,
    icon: '⏰'
  },
  time_limit_hard: {
    id: 'time_limit_hard',
    type: CHALLENGE_TYPES.TIME_LIMIT,
    name: '⏰ 时间挑战：大师',
    description: '在30秒内完成关卡',
    timeLimit: 30,
    reward: 200,
    icon: '⏰'
  },

  // 代码高尔夫挑战
  code_golf_5: {
    id: 'code_golf_5',
    type: CHALLENGE_TYPES.CODE_GOLF,
    name: '💎 代码高尔夫：5行',
    description: '用不超过5行代码完成关卡',
    maxLines: 5,
    reward: 75,
    icon: '💎'
  },
  code_golf_3: {
    id: 'code_golf_3',
    type: CHALLENGE_TYPES.CODE_GOLF,
    name: '💎 代码高尔夫：3行',
    description: '用不超过3行代码完成关卡',
    maxLines: 3,
    reward: 150,
    icon: '💎'
  },

  // 无提示挑战
  no_hints: {
    id: 'no_hints',
    type: CHALLENGE_TYPES.NO_HINTS,
    name: '🧠 独立思考',
    description: '不查看任何提示完成关卡',
    reward: 100,
    icon: '🧠'
  },

  // 完美通关
  perfect_run: {
    id: 'perfect_run',
    type: CHALLENGE_TYPES.PERFECT_RUN,
    name: '⭐ 完美通关',
    description: '完成所有目标（包括可选目标）',
    reward: 150,
    icon: '⭐'
  },

  // 速通
  speed_run: {
    id: 'speed_run',
    type: CHALLENGE_TYPES.SPEED_RUN,
    name: '🚀 极速通关',
    description: '在15秒内完成关卡',
    timeLimit: 15,
    reward: 300,
    icon: '🚀'
  }
};

export class ChallengeManager {
  constructor() {
    this.completedChallenges = this.loadCompleted();
    this.activeChallenges = this.loadActive();
    this.dailyChallenges = this.loadDaily();
  }

  loadCompleted() {
    const saved = localStorage.getItem('completedChallenges');
    return saved ? JSON.parse(saved) : {};
  }

  loadActive() {
    const saved = localStorage.getItem('activeChallenges');
    return saved ? JSON.parse(saved) : [];
  }

  loadDaily() {
    const saved = localStorage.getItem('dailyChallenges');
    const data = saved ? JSON.parse(saved) : null;
    
    // 检查是否是新的一天
    const today = new Date().toDateString();
    if (!data || data.date !== today) {
      return this.generateDailyChallenges();
    }
    
    return data.challenges;
  }

  saveCompleted() {
    localStorage.setItem('completedChallenges', JSON.stringify(this.completedChallenges));
  }

  saveActive() {
    localStorage.setItem('activeChallenges', JSON.stringify(this.activeChallenges));
  }

  saveDaily() {
    const today = new Date().toDateString();
    localStorage.setItem('dailyChallenges', JSON.stringify({
      date: today,
      challenges: this.dailyChallenges
    }));
  }

  generateDailyChallenges() {
    // 每天随机选择3个挑战
    const allChallenges = Object.values(CHALLENGES);
    const selected = [];
    
    while (selected.length < 3 && allChallenges.length > 0) {
      const index = Math.floor(Math.random() * allChallenges.length);
      selected.push(allChallenges[index]);
      allChallenges.splice(index, 1);
    }
    
    this.dailyChallenges = selected;
    this.saveDaily();
    return selected;
  }

  activateChallenge(challengeId) {
    if (!this.activeChallenges.includes(challengeId)) {
      this.activeChallenges.push(challengeId);
      this.saveActive();
    }
  }

  deactivateChallenge(challengeId) {
    this.activeChallenges = this.activeChallenges.filter(id => id !== challengeId);
    this.saveActive();
  }

  checkChallenge(challengeId, stats) {
    const challenge = CHALLENGES[challengeId];
    if (!challenge) return false;

    let completed = false;

    switch (challenge.type) {
      case CHALLENGE_TYPES.TIME_LIMIT:
      case CHALLENGE_TYPES.SPEED_RUN:
        completed = stats.completionTime <= challenge.timeLimit;
        break;
      
      case CHALLENGE_TYPES.CODE_GOLF:
        completed = stats.codeLines <= challenge.maxLines;
        break;
      
      case CHALLENGE_TYPES.NO_HINTS:
        completed = !stats.usedHints;
        break;
      
      case CHALLENGE_TYPES.PERFECT_RUN:
        completed = stats.allGoalsCompleted;
        break;
    }

    if (completed) {
      this.completeChallenge(challengeId, stats.levelId);
    }

    return completed;
  }

  completeChallenge(challengeId, levelId) {
    if (!this.completedChallenges[levelId]) {
      this.completedChallenges[levelId] = [];
    }
    
    if (!this.completedChallenges[levelId].includes(challengeId)) {
      this.completedChallenges[levelId].push(challengeId);
      this.deactivateChallenge(challengeId);
      this.saveCompleted();
      return CHALLENGES[challengeId];
    }
    
    return null;
  }

  getLevelChallenges(levelId) {
    return this.completedChallenges[levelId] || [];
  }

  getAvailableChallenges(levelId) {
    // 返回该关卡可用的挑战
    const completed = this.getLevelChallenges(levelId);
    return Object.values(CHALLENGES).filter(c => !completed.includes(c.id));
  }

  getTotalRewards() {
    let total = 0;
    Object.values(this.completedChallenges).forEach(challenges => {
      challenges.forEach(challengeId => {
        const challenge = CHALLENGES[challengeId];
        if (challenge) {
          total += challenge.reward;
        }
      });
    });
    return total;
  }

  getDailyProgress() {
    const completed = this.dailyChallenges.filter(challenge =>
      Object.values(this.completedChallenges).some(levelChallenges =>
        levelChallenges.includes(challenge.id)
      )
    );
    return {
      completed: completed.length,
      total: this.dailyChallenges.length,
      challenges: this.dailyChallenges
    };
  }
}

export const challengeManager = new ChallengeManager();
