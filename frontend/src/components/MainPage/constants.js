export const MODULE_CONFIG = {
  id: 1,
  title: '森林之路',
  description: '在穿越森林的有趣旅程中学习编程基础',
  totalLevels: 23,
  freeLevels: 3,
  tags: [
    '平台入门',
    '语法基础',
    '方法',
    '参数',
    '字符串',
    '注释',
    '变量',
    '循环',
    'if 表达式'
  ],
  mobileHiddenTagsCount: 6
};

export const MAP_CONFIG = {
  imageWidth: 1536,
  imageHeight: 889,
  
  maxMapWidth: 1200,
  maxMapHeight: 700,
  resizeDebounceMs: 150
};

export const LEVEL_POSITIONS = [
  { level: 1, bottom: 59, left: 36, scaleX: -1 },
  { level: 2, bottom: 55, left: 32, scaleX: -1 },
  { level: 3, bottom: 53, left: 27, scaleX: -1 },
  { level: 4, bottom: 47, left: 23, scaleX: 1 },
  { level: 5, bottom: 45, left: 29, scaleX: 1 },
  { level: 6, bottom: 43, left: 35, scaleX: -1 },
  { level: 7, bottom: 38, left: 30, scaleX: -1 },
  { level: 8, bottom: 34, left: 25, scaleX: 1 },
  { level: 9, bottom: 31, left: 31, scaleX: 1 },
  { level: 10, bottom: 28, left: 37, scaleX: -1 },
  { level: 11, bottom: 22, left: 33, scaleX: -1 },
  { level: 12, bottom: 17, left: 29, scaleX: -1 },
  { level: 13, bottom: 11, left: 27, scaleX: 1 },
  { level: 14, bottom: 8, left: 34, scaleX: -1 },
  { level: 15, bottom: 0, left: 34, scaleX: 1 },
  { level: 16, bottom: 3, left: 39, scaleX: 1 },
  { level: 17, bottom: 6, left: 45, scaleX: 1 },
  { level: 18, bottom: 11, left: 51, scaleX: 1 },
  { level: 19, bottom: 16, left: 55, scaleX: 1 },
  { level: 20, bottom: 22, left: 60, scaleX: 1 },
  { level: 21, bottom: 27, left: 64, scaleX: -1 },
  { level: 22, bottom: 34, left: 60, scaleX: 1 },
  { level: 23, bottom: 40, left: 65 },
];

export const ROUTES = {
  levelPattern: '/forest/level/:level',
  getLevelPath: (level) => `/forest/level/${level}`
};

export const UI_TEXT = {
  loginTitle: '登录以继续',
  moduleNumber: '模块 1',
  statusCompleted: '已完成',
  statusInProgress: '进行中',
  levelsText: '个关卡',
  levelsCompleted: '个关卡已完成',
  moreTagsText: '+6 更多',
  altText: '森林之路 预览'
}; 