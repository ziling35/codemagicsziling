import GameplayErrorTypes from './GameplayErrorTypes';

// Centralized mapping of error types to hero messages
export const GAMEPLAY_ERROR_MESSAGES = {
  [GameplayErrorTypes.HERO_RAN_IN_WALL]: {
    value: '哎呀，这里我过不去'
  },
  
  [GameplayErrorTypes.HERO_KILLED_BY_ENEMY]: {
    value: '对这个骑士要更小心..'
  },

  [GameplayErrorTypes.HERO_ENTERED_WIZARD_ZONE]: {
    value: '邪恶的巫师给这片区域下了魔法！'
  },

  [GameplayErrorTypes.NO_FIREBALLS]: {
    value: '我已经没有施放火球的力量了！'
  },

  [GameplayErrorTypes.HERO_RAN_IN_ENEMY]: {
    value: '我不能往那边走，\n那个坏骑士会打我'
  },
  
  [GameplayErrorTypes.NO_ENEMIES_TO_ATTACK]: {
    value: '这个关卡没有敌人，\n我无处可攻'
  },
  
  [GameplayErrorTypes.NO_ENEMY_WITH_GIVEN_NAME]: {
    getValue: (error) => `这个关卡\n没有名为「${error.name}」的敌人，\n我无处可攻`
  },
  
  [GameplayErrorTypes.ENEMY_TOO_FAR]: {
    getValue: (error) => `我不能攻击「${error.name}」，\n因为它离我太远了`
  },
  
  [GameplayErrorTypes.ENEMY_IS_BIG]: {
    getValue: (error) => `我不能攻击「${error.name}」——它太强大了`
  },
  
  [GameplayErrorTypes.NO_LEVERS]: {
    value: '这个关卡没有拉杆，\n我没有可以切换的东西'
  },
  
  [GameplayErrorTypes.NO_LEVER_WITH_GIVEN_NAME]: {
    getValue: (error) => `这个关卡没有名为「${error.name}」的拉杆`
  },
  
  [GameplayErrorTypes.LEVER_TOO_FAR]: {
    getValue: (error) => `名为「${error.name}」的拉杆太远了，\n我在这里无法切换`,
    delay: 3000
  },
  
  [GameplayErrorTypes.CANT_BE_HERE]: {
    value: '我来这里做什么？这里没有宝石',
    delay: 3000
  },
  
  [GameplayErrorTypes.ENEMY_SHOULD_NOT_BE_HERE]: {
    value: '巨大的骑士跨到了我们的岸边，我们完了！',
    delay: 3000
  },
  
  [GameplayErrorTypes.INFINITE_LOOP]: {
    value: '哎呀，我好像陷入了无限循环！',
    delay: 3000
  }
};

/**
 * Gets the appropriate hero text message for a gameplay error
 * @param {Object} gameplayError - The error object with type and optional data
 * @returns {Array} Array containing hero text object with value and optional delay
 */
export const getHeroTextForError = (gameplayError) => {
  if (!gameplayError?.type) {
    return [];
  }

  const errorConfig = GAMEPLAY_ERROR_MESSAGES[gameplayError.type];
  if (!errorConfig) {
    return [];
  }

  const value = errorConfig.getValue 
    ? errorConfig.getValue(gameplayError)
    : errorConfig.value;

  const textObject = { value };
  if (errorConfig.delay) {
    textObject.delay = errorConfig.delay;
  }

  return [textObject];
};
